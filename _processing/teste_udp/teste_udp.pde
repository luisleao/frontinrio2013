 
 
 import hypermedia.net.*;
 
 UDP udp;  // define the UDP object
 
 
 void setup() {
   udp = new UDP(this, 6000);  // create a new datagram connection on port 6000
   udp.log( false );     // <-- printout the connection activity
   udp.listen( true );           // and wait for incoming message  
 }
 
 void draw()
 {
   
 }
 
 void keyPressed() {
   
 }
 
 void receive( byte[] data, String ip, int port ) {       // <-- default handler
   //void receive( byte[] data, String ip, int port ) {  // <-- extended handler
   /*
   for(int i=0; i < data.length; i++) 
     print(char(data[i]));  
   println();   
   */
   
   String dataStr = new String(data);
   
   
   if (ip.equals("127.0.0.1")){
     udp.send(dataStr, "255.255.255.255", 8888);
     print("> ");
     
   } else {
     
     //print(ip);
     //print(":");
     //print(port);

     udp.send(dataStr, "127.0.0.1", 6001 );

     print("< ");
   }
   
   
   println(dataStr);   
   
   /*
   if (dataStr.equals("sensor_high")) {
     udp.send("color_green", "255.255.255.255", 8888 );
     udp.send("door_open", "255.255.255.255", 8888);
     
   } else if (dataStr.equals("sensor_low")) {
     
     udp.send("color_blue", "255.255.255.255", 8888 );
     udp.send("door_close", "255.255.255.255", 8888 );

   } else if (dataStr.equals("\nhidrocor")) {
     udp.send("color_blue", "255.255.255.255", 8888 );
     udp.send("door_open", "255.255.255.255", 8888 );
     delay(500);
     udp.send("color_black", "255.255.255.255", 8888 );
     udp.send("door_close", "255.255.255.255", 8888 );

   } else if (dataStr.equals("\n2001odisseia")) {
     
     udp.send("color_red", "255.255.255.255", 8888 );
     udp.send("door_open", "255.255.255.255", 8888 );
     delay(500);
     udp.send("color_black", "255.255.255.255", 8888 );
     udp.send("door_close", "255.255.255.255", 8888 );

   } else {
     
     println("nao entendi comando");
   }
   
   //udp.send("\tcolor1\n", "255.255.255.255", 8888 );   // the message to send
   
   */
   
   
 }
 
 
