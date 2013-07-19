 
 
 import hypermedia.net.*;
 
 UDP udp;  // define the UDP object
 
 
 String ARDUINO = "172.16.1.11";
 String CHROME1 = "127.0.0.1";
 String CHROME2 = "172.16.1.8";
 
 
 
 void setup() {
   udp = new UDP(this, 6000);  // create a new datagram connection on port 6000
   udp.log( false );     // <-- printout the connection activity
   udp.listen( true );           // and wait for incoming message  
 }
 
 void draw()
 {
   
 }
 
 void keyPressed() {
   println("pressionei");
   
  udp.send("color_green", ARDUINO, 8888);
  delay(1000);
  udp.send("color_black", ARDUINO, 8888);

 }
 
 void receive( byte[] data, String ip, int port ) {       // <-- default handler
   //void receive( byte[] data, String ip, int port ) {  // <-- extended handler
   /*
   for(int i=0; i < data.length; i++) 
     print(char(data[i]));  
   println();   
   */
   
   String dataStr = new String(data);
   
   print(ip);
   
   if (ip.equals(CHROME1) || ip.equals(CHROME2)){
     udp.send(dataStr, ARDUINO, 8888); //255.255.255.255
     print(" > ");
     
   } else {
     
     //print(ip);
     //print(":");
     //print(port);

     udp.send(dataStr, CHROME1, 6001 ); //127.0.0.1
     udp.send(dataStr, CHROME2, 6001 ); //127.0.0.1

     print(" < ");
   }
   
   println(dataStr);   
   
   /*
   if (dataStr.equals("sensor_high")) {
     udp.send("color_green", ARDUINO, 8888 );
     udp.send("door_open", ARDUINO, 8888);
     
   } else if (dataStr.equals("sensor_low")) {
     
     udp.send("color_blue", ARDUINO, 8888 );
     udp.send("door_close", ARDUINO, 8888 );

   } else if (dataStr.equals("\nhidrocor")) {
     udp.send("color_blue", ARDUINO, 8888 );
     udp.send("door_open", ARDUINO, 8888 );
     delay(500);
     udp.send("color_black", ARDUINO, 8888 );
     udp.send("door_close", ARDUINO, 8888 );

   } else if (dataStr.equals("\n2001odisseia")) {
     
     udp.send("color_red", ARDUINO, 8888 );
     udp.send("door_open", ARDUINO, 8888 );
     delay(500);
     udp.send("color_black", ARDUINO, 8888 );
     udp.send("door_close", ARDUINO, 8888 );

   } else {
     
     println("nao entendi comando");
   }
   
   //udp.send("\tcolor1\n", "255.255.255.255", 8888 );   // the message to send
   */
   
   
   
   
 }
 
 
