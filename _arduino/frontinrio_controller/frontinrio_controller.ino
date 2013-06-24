
/*

#include <NewPing.h>

#define TRIGGER_PIN 2
#define ECHO_PIN 3
#define MAX_DISTANCE 400
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

*/


#include <SPI.h>         // needed for Arduino versions later than 0018
#include <Ethernet.h>
#include <EthernetUdp.h>         // UDP library from: bjoern@cs.stanford.edu 12/30/2008
#include <Servo.h> 


Servo door_servo;
int pos = 0;



byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };


int pir_state;



int datapin  = 3; //10; // DI
int latchpin = 4; //11; // LI
int enablepin = 5; //12; // EI
int clockpin = 6; //13; // CI


unsigned long SB_CommandPacket;
int SB_CommandMode;
int SB_BlueCommand;
int SB_RedCommand;
int SB_GreenCommand;






unsigned int localPort = 8888;      // local port to listen on
unsigned int REMOTE_PORT = 6000;

unsigned int DOOR_OPEN = 150;
unsigned int DOOR_CLOSE = 60;






// buffers for receiving and sending data
char packetBuffer[UDP_TX_PACKET_MAX_SIZE]; //buffer to hold incoming packet,

char  ReplyBuffer[] = "acknowledged";       // a string to send back

char  COMMAND_SENSOR_HIGH[] = "sensor_high";
char  COMMAND_SENSOR_LOW[] = "sensor_low";



// An EthernetUDP instance to let us send and receive packets over UDP
EthernetUDP Udp;

IPAddress broadcast(255, 255, 255, 255);





void setup(){
  Ethernet.begin(mac);
  Udp.begin(localPort);
  Serial.begin(9600);
  
  
  
  pinMode(2, INPUT);
  pir_state = digitalRead(2); 
  
  
  setup_megabrite();

  door_servo.attach(9);
  door_servo.write(DOOR_CLOSE);

  //TODO: setup de rede
  //TODO: conectar servidor UDP
  //TODO: receber estado UDP
  //TODO: controlar megabrite
  
}

void loop(){

  delay(10);

  loop_udp();

  // verificar mudanca do PIR  
  if (pir_state != digitalRead(2)) {
    pir_state = digitalRead(2);
    send_pir_state();
  }


/*  
  delay(10);
  unsigned int uS = sonar.ping();
  Serial.print("Ping: ");
  Serial.print(uS / US_ROUNDTRIP_CM);
  Serial.println(" cm.");
*/

}



void loop_udp() {
  // if there's data available, read a packet
  int packetSize = Udp.parsePacket();
  if(packetSize)
  {
    
    /*
    Serial.print("Received packet of size ");
    Serial.println(packetSize);
    Serial.print("From ");
    IPAddress remote = Udp.remoteIP();
    for (int i =0; i < 4; i++)
    {
      Serial.print(remote[i], DEC);
      if (i < 3)
      {
        Serial.print(".");
      }
    }
    Serial.print(", port ");
    Serial.println(Udp.remotePort());
    */

    // read the packet into packetBufffer
    Udp.read(packetBuffer, UDP_TX_PACKET_MAX_SIZE);
    packetBuffer[packetSize] = '\0';
    
    //Serial.println("Contents:");
    //Serial.println(packetBuffer);
    
    String retorno = String(packetBuffer);
    if (retorno == "color_red") {
      setRGBColor(255, 0, 0);
    } else if (retorno == "color_green") {
      setRGBColor(0, 255, 0);
    } else if (retorno == "color_blue") {
      setRGBColor(0, 0, 255);
    } else if (retorno == "color_black") {
      setRGBColor(0, 0, 0);
    } else if (retorno == "door_open") {
      door_servo.write(DOOR_OPEN);
    } else if (retorno == "door_close") {
      door_servo.write(DOOR_CLOSE);
    }
    
    // send a reply, to the IP address and port that sent us the packet we received
    //Udp.beginPacket(Udp.remoteIP(), Udp.remotePort());
    //Udp.write(ReplyBuffer);
    //Udp.endPacket();
    
  }
  delay(10);
}





void send_udp_command(char command_char[]) {
  Udp.beginPacket(broadcast, REMOTE_PORT);
  Udp.write(command_char);
  Udp.endPacket();
}



void send_pir_state() {
  //TODO: enviar para servidor mudanca de estado do PIN
  if (pir_state == HIGH) {
    setRGBColor(255, 0, 0); //delay(150);
    send_udp_command(COMMAND_SENSOR_HIGH);

  }
  if (pir_state == LOW) {
    //setRGBColor(0, 0, 0); //delay(150);
    send_udp_command(COMMAND_SENSOR_LOW);
  }

}

















void setup_megabrite() {
   pinMode(datapin, OUTPUT);
   pinMode(latchpin, OUTPUT);
   pinMode(enablepin, OUTPUT);
   pinMode(clockpin, OUTPUT);

   digitalWrite(latchpin, LOW);
   digitalWrite(enablepin, LOW);

   SB_CommandMode = B01; // Write to current control registers
   SB_RedCommand = 127; // Full current
   SB_GreenCommand = 127; // Full current
   SB_BlueCommand = 127; // Full current
   SB_SendPacket();


   SB_CommandMode = B00; // Write to PWM control registers
   SB_RedCommand = 0; // Maximum red
   SB_GreenCommand = 0; // Minimum green
   SB_BlueCommand = 0; // Minimum blue
   SB_SendPacket();

}


void SB_SendPacket() {
   SB_CommandPacket = SB_CommandMode & B11;
   SB_CommandPacket = (SB_CommandPacket << 10)  | (SB_BlueCommand & 1023);
   SB_CommandPacket = (SB_CommandPacket << 10)  | (SB_RedCommand & 1023);
   SB_CommandPacket = (SB_CommandPacket << 10)  | (SB_GreenCommand & 1023);

   shiftOut(datapin, clockpin, MSBFIRST, SB_CommandPacket >> 24);
   shiftOut(datapin, clockpin, MSBFIRST, SB_CommandPacket >> 16);
   shiftOut(datapin, clockpin, MSBFIRST, SB_CommandPacket >> 8);
   shiftOut(datapin, clockpin, MSBFIRST, SB_CommandPacket);

   delay(1); // adjustment may be necessary depending on chain length
   digitalWrite(latchpin,HIGH); // latch data into registers
   delay(1); // adjustment may be necessary depending on chain length
   digitalWrite(latchpin,LOW);

}

void setRGBColor(int r, int g, int b) {
   SB_CommandMode = B00; // Write to PWM control registers
   SB_RedCommand = map(r, 0, 255, 0, 1023); // Minimum red
   SB_GreenCommand = map(g, 0, 255, 0, 1023); // Minimum green
   SB_BlueCommand = map(b, 0, 255, 0, 1023); // Maximum blue
   SB_SendPacket();
}
