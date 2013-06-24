
/*
 *
 *     CONFIRMAR SE ESTA FUNCIONANDO COMANDO DO ARDUINO (DEIXAR APENAS NO SLIDE CERTO)
 *     
 */ 

var ipaddr = "172.16.1.6";
var active = true;



var LAMPADA_CRISTO = "4";
var LAMPADA_LUMINARIA = "2";

var LAMPADA_3 = "5";
var LAMPADA_4 = "3";
var LAMPADA_5 = "1";





var dmx_controller_skip_init=true; // to avoid conflict with the ilumnichromedemo

var COLOR_UPDATE_INTERVAL=60;
var TIME_FOR_COLOR_CHANGE=2000;


var video_camera = document.getElementById("video_camera");
var video_jetsons = document.getElementById("video_jetsons");
var video_odisseia = document.getElementById("video_odisseia");
var video_halkills = document.getElementById("video_halkills");


var audio_hidrocor = new Audio();
var audio_olaluis = new Audio();
var audio_pizza = new Audio();
var audio_picadasgalaxias = new Audio();


video_jetsons.volume = 0.4;


audio_hidrocor.src = "media/hidrocor1.mp3";
audio_olaluis.src = "media/olaluis.mp3";
audio_pizza.src = "media/pizza.mp3";
audio_picadasgalaxias.src = "media/picadasgalaxias.mp3";



video_jetsons.addEventListener('ended', function(){
  this.currentTime = 0;
  this.pause();
  window.slidedeck.nextSlide();
});
video_odisseia.addEventListener('ended', function(){
  this.currentTime = 0;
  this.pause();
  window.slidedeck.nextSlide();
});
video_halkills.addEventListener('ended', function(){
  this.currentTime = 0;
  this.pause();
  window.slidedeck.nextSlide();
});




var COR_VERMELHO = [0, 255, 255]; //rgbToHsl(255, 0, 0);
var COR_VERDE = []; //rgbToHsl(0, 255, 0);
var COR_AZUL = []; //rgbToHsl(0, 0, 255);
var COR_PRETA = []; //rgbToHsl(0, 0, 0);
var COR_LARANJA = []; //rgbToHsl(255, 255, 0);
var COR_ROXA = []; //rgbToHsl(255, 0, 255);
var COR_CIANO = []; //rgbToHsl(0, 255, 255);
var COR_BRANCA = []; //rgbToHsl(255, 255, 255);
var COR_AMARELA = []; //rgbToHsl(255, 255, 125);


//olaluis.mp3
//hidrocor.mp3





//TODO: pegar mudanca de slide
//TODO: pegar 







var stop_tudo = function() {

  if (!video_jetsons.paused) video_jetsons.pause();
  if (!video_odisseia.paused) video_odisseia.pause();
  if (!video_halkills.paused) video_halkills.pause();
  if (!audio_hidrocor.paused) audio_hidrocor.pause();
  if (!audio_olaluis.paused) audio_olaluis.pause();
  if (!audio_pizza.paused) audio_pizza.pause();
  if (!audio_picadasgalaxias.paused) audio_picadasgalaxias.pause();

  //apagar cor
  chrome.socket.sendTo(SERVER_SOCKET, str2ab('color_black'), "127.0.0.1", 6000, function callback(r){console.log(r);});

}


var limpar_timers = function(){
  if (tmr_countdown_2013to1962) clearInterval(tmr_countdown_2013to1962);
  if (tmr_countdown_1962to2013) clearInterval(tmr_countdown_1962to2013);
  if (tmr_democasa) clearInterval(tmr_democasa);
  if (tmr_demoamigo) clearTimeout(tmr_demoamigo);
  if (tmr_duvidas) clearInterval(tmr_duvidas);

}


var slides = [
  "start",
  "me",
  "okglass",
  "2013to1962",
  "jetsons",
  "previsao100anos",
  "passaram50anos",
  "1962to2013",
  "ipad",
  "homeautomation",
  "catfeeder",
  "5anos",
  "10anos",
  "50anos",
  "100anos",
  "demo",
  "democasa",
  "demosaiu",
  "demoalmoco",
  "demotrabalho",
  "demovoltacasa",
  "demoporta",
  "democasanoite",
  "demoamigo",
  "demoamigopergunta",
  "democasanoite2",
  "demomusica",
  "demomusicaespera",
  "demofilme",
  "demofilmeespera",
  "democasanoite3",
  "demofim",
  "comofaz",
  "oportunidade",
  "hallkills",
  "duvidas"
];





var tmr_countdown_2013to1962 = null;
var tmr_countdown_1962to2013 = null;
var tmr_audio_hidrocor = null;
var tmr_democasa = null;
var tmr_duvidas = null;
var tmr_demoamigo = null;






/* * * * * * * * * * * * * * * * * * * *  TROCA DE SLIDES  * * * * * * * * * * * * * * * * * * * */

document.addEventListener('slideenter', function(e) {

  stop_tudo();
  limpar_timers();



  console.log("troca de slides", slides[e.slideNumber - 1]);

  var slide_name = slides[e.slideNumber - 1];

  switch(slide_name) {
    case "start":
      set_group_state(false);
      set_lamp_state(LAMPADA_CRISTO, true, 50000, 255, 255, "none");
      //set_lamp_state(LAMPADA_CRISTO, true, COR_ROXA[0], COR_ROXA[1], COR_ROXA[2], "none");
      break;

    case "me":
      //ativa com "ligar luz"
      set_lamp_state(LAMPADA_CRISTO, true, COR_VERMELHO[0], COR_VERMELHO[1], COR_VERMELHO[2], "none");
      set_lamp_state(LAMPADA_LUMINARIA, true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");
      set_lamp_state(LAMPADA_3, true, COR_LARANJA[0], COR_VERDE[1], COR_VERDE[2], "none");
      set_lamp_state(LAMPADA_4, true, COR_VERMELHO[0], COR_VERDE[1], COR_VERDE[2], "none");
      set_lamp_state(LAMPADA_5, true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");

      break;

    case "okglass":
      //ativa com "MENSAGEM"
      set_group_state(true, 0, 255, 255);
      break;

    case "2013to1962":
      $("#2013to1962 .texto_grande").text("2013");
      if (tmr_countdown_2013to1962) clearInterval(tmr_countdown_2013to1962);

      tmr_countdown_2013to1962 = setInterval(function(){
        var numero = parseInt($("#2013to1962 .texto_grande").text());
        if (numero > 1962) {
          numero--;
          $("#2013to1962 .texto_grande").text(numero);
        } else {
          clearInterval(tmr_countdown_2013to1962);
        }

      }, 50);

      break;

    case "jetsons":
      set_group_state(false);
      video_jetsons.currentTime = 0;
      video_jetsons.play();
      break;

    case "previsao100anos":
      set_group_state(true, 0, 0, 0, "colorloop");
      break;

    case "passaram50anos":
      set_group_state(true, 0, 255, 255, "none");
      break;

    case "1962to2013":
      set_group_state(true, 50000, 255, 255, "none");
      //set_group_state(true, COR_ROXA[0], COR_ROXA[1], COR_ROXA[2], "none");

      $("#1962to2013 .texto_grande").text("1962");
      if (tmr_countdown_1962to2013) clearInterval(tmr_countdown_1962to2013);

      tmr_countdown_1962to2013 = setInterval(function(){
        var numero = parseInt($("#1962to2013 .texto_grande").text());
        if (numero < 2013) {

          //TODO: TESTAR!!! mudar uma cor de cada vez (subtrair 2013 do valor e dividir por 5);
          var current_lamp = parseInt((numero - 1962) / 51 * 5);
          set_lamp_state("" + current_lamp, true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");

          numero++;
          $("#1962to2013 .texto_grande").text(numero);
        } else {
          set_group_state(true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");

          clearInterval(tmr_countdown_1962to2013);
        }

      }, 50);
      break;

    case "ipad":
      set_group_state(true, COR_LARANJA[0], COR_LARANJA[1], COR_LARANJA[2], "none");
      break;

    case "homeautomation":
      set_group_state(true, COR_AZUL[0], COR_AZUL[1], COR_AZUL[2], "none");
      break;

    case "catfeeder":
      set_group_state(true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");
      break;

    case "5anos":
      set_group_state(false);
      break;
    case "10anos":
      set_group_state(false);
      break;
    case "50anos":
      set_group_state(false);
      break;
    case "100anos":
      set_group_state(true, COR_CIANO[0], COR_CIANO[1], COR_CIANO[2]);
      break;


    case "demo":
      set_group_state(true, COR_LARANJA[0], COR_LARANJA[1], COR_LARANJA[2], "none");
      break;

    case "democasa":
      set_group_state(false);
      if (tmr_democasa) clearInterval(tmr_democasa);
      var count_democasa = 0;

      tmr_democasa = setInterval(function(){
        count_democasa++;
        if (count_democasa < 5) {
          set_lamp_state(count_democasa, true, COR_BRANCA[0], COR_BRANCA[1], COR_BRANCA[2], "none");
        } else {
          clearInterval(tmr_democasa);
        }

      }, 2000);


      //TODO: DEFINIR HORA
      /*
      tmr_democasa_hora = setInterval(function(){
        count_democasa++;
        if (count_democasa < 5) {
          set_lamp_state(count_democasa, true, COR_BRANCA[0], COR_BRANCA[1], COR_BRANCA[2], "none");
        } else {
          clearInterval(tmr_democasa);
        }

      }, 2000);
      */


      break;

    case "demosaiu":
      set_group_state(false);
      break;

    case "demoalmoco":
      break;

    case "demotrabalho":
      break;

    case "demovoltacasa":
      set_group_state(true, COR_AMARELA[0], COR_AMARELA[1], 50, "none");
      break;

    case "demoporta":
      set_lamp_state(LAMPADA_5, true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");
      chrome.socket.sendTo(SERVER_SOCKET, str2ab('door_open'), "127.0.0.1", 6000, function callback(){});
      chrome.socket.sendTo(SERVER_SOCKET, str2ab('color_green'), "127.0.0.1", 6000, function callback(){});
      setTimeout(function(){
        chrome.socket.sendTo(SERVER_SOCKET, str2ab('door_close'), "127.0.0.1", 6000, function callback(){});
        chrome.socket.sendTo(SERVER_SOCKET, str2ab('color_black'), "127.0.0.1", 6000, function callback(){});
      }, 3000);
      break;

    case "democasanoite":
      set_group_state(true, COR_AMARELA[0], COR_AMARELA[1], COR_AMARELA[2], "none");
      set_lamp_state(LAMPADA_CRISTO, true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");
      break;

    case "demoamigo":
      set_group_state(true, COR_AMARELA[0], COR_AMARELA[1], COR_AMARELA[2], "none");
      set_lamp_state(LAMPADA_5, true, COR_BRANCA[0], COR_BRANCA[1], COR_BRANCA[2], "none");
      

      if (tmr_demoamigo) clearTimeout(tmr_demoamigo);
      tmr_demoamigo = setTimeout(function(){window.slidedeck.nextSlide()}, 10000);
      break;

    case "demoamigopergunta":
      break;

    case "democasanoite2":
      set_lamp_state(LAMPADA_LUMINARIA, false);
      break;

    case "demomusica":
      set_group_state(true, null, null, null, "colorloop");
      audio_hidrocor.currentTime = 0;
      audio_hidrocor.play();
      break;

    case "demomusicaespera":
      set_group_state(false);
      break;

    case "demofilme":
      set_group_state(false);
      video_odisseia.currentTime = 0;
      video_odisseia.play();
      break;

    case "demofilmeespera":
      set_group_state(false);
      break;

    case "democasanoite3":
      set_group_state(true, COR_AMARELA[0], COR_AMARELA[1], COR_AMARELA[2], "none");
      set_lamp_state(LAMPADA_CRISTO, true, COR_VERDE[0], COR_VERDE[1], COR_VERDE[2], "none");
      break;

    case "demofim":
      set_lamp_state(LAMPADA_CRISTO, true, 50000, 255, 255, "none");
      //set_lamp_state(LAMPADA_CRISTO, true, COR_ROXA[0], COR_ROXA[1], COR_ROXA[2], "none");
      break;

    case "comofaz":
      set_group_state(true, COR_CIANO[0], COR_CIANO[1], COR_CIANO[2], "none");
      break;

    case "oportunidade":
      set_group_state(true, COR_LARANJA[0], COR_LARANJA[1], COR_LARANJA[2], "none");
      break;

    case "hallkills":
      set_group_state(false);
      video_halkills.currentTime = 0;
      video_halkills.play();
      break;

    case "duvidas":

      if (tmr_duvidas) clearInterval(tmr_duvidas);
      var count_duvidas = 0;

      tmr_duvidas = setInterval(function(){
        count_duvidas++;
        if (count_duvidas < 5) {
          set_lamp_state(count_duvidas, true, null, null, null, "colorloop");
        } else {
          clearInterval(tmr_duvidas);
        }

      }, 3000);
      //set_group_state(true, 255, 255, 255, "colorloop");
      break;

  }


}, false);

/* * * * * * * * * * * * * * * * * * * *  /ROCA DE SLIDES  * * * * * * * * * * * * * * * * * * * */











current_slide = 0;



SLIDE_CAMERA = 1;
SLIDE_ODISSEIA = 2;
SLIDE_HALLKILLS = 3;
SLIDE_HIDROCOR = 4;



function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO RELOGIOS  * * * * * * * * * * * * * * * * * * * */


var set_relogio = function(){
  var d = new Date();
  var data_hora = d.getHours() + ":" + pad(d.getMinutes(), 2);
  $(".relogio.current").text(data_hora);
};


setInterval(set_relogio, 1000);
  




/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO WEBSPEECH  * * * * * * * * * * * * * * * * * * * */

lang = "pt-BR";




  var comandos = [

    "oi casa",
    "olá casa",
    "ok casa",
    "okey casa",

    "quem sou eu",
    "quem só eu",

    "carnaval",

    "acender luz",
    "acender a luz",
    "acender luzes",
    "acenda as luzes",

    "apagar luz",
    "apagar a luz",
    "apagar luzes",

    "desligar luz",
    "desligar a luz",
    "desligar luzes",

    "modo balada",

    "abrir porta",

    "fechar porta",

    "ligar música",
    "tocar música",
    "começar música",

    "parar música",

    "tocar filme",
    "começar filme",
    "começar o filme",

    "parar filme",
    "parar o filme",

    "voltar para início",
    "voltar para o início",
    "recomeçar apresentação",

    "próximo slide",
    "avançar slide",
    "mike jagger",
    "vai jegue",
    "próxima tela",
    "avançar tela",
    "passar tela",

    "slide anterior",
    "voltar slide",
    "tela anterior",

    "pedir pizza",
    "pedi pizza",

    "como está o evento",
    "está achando do evento"


  ];


function executar_comando(comando) {

    stop_tudo();

    switch(comando) {

      case "oi casa":
      case "olá casa":
      case "ok casa":
      case "okey casa":
        audio_olaluis.currentTime = 0;
        audio_olaluis.play();
        break;


      case "quem sou eu":
      case "quem só eu":
        window.slidedeck.loadSlide(slides.indexOf("me")+1);
        break;


      case "acender luz":
      case "acender a luz":
      case "acender luzes":
      case "acenda as luzes":
        set_group_state(true, COR_BRANCA[0], COR_BRANCA[1], COR_BRANCA[2], "none");
        break;

      case "apagar luz":
      case "apagar a luz":
      case "apagar luzes":
      case "desligar luz":
      case "desligar a luz":
      case "desligar luzes":
        set_group_state(false, 0, 255, 255, "none");
        break;

      case "modo balada":
        set_group_state(true, 0, 255, 255, "colorloop");
        break;

      case "abrir porta":
        chrome.socket.sendTo(SERVER_SOCKET, str2ab('door_open'), "127.0.0.1", 6000, function callback(r){console.log(r);});
        break;

      case "fechar porta":
        chrome.socket.sendTo(SERVER_SOCKET, str2ab('door_close'), "127.0.0.1", 6000, function callback(r){console.log(r);});
        break;

      case "ligar música":
      case "tocar música":
      case "começar música":
        window.slidedeck.loadSlide(slides.indexOf("demomusica")+1);
        break;

      case "parar música":
        window.slidedeck.loadSlide(1);
        break;

      case "tocar filme":
      case "começar filme":
      case "começar o filme":
        window.slidedeck.loadSlide(slides.indexOf("demofilme")+1);
        break;

      case "parar filme":
      case "parar o filme":
        window.slidedeck.loadSlide(1);
        break;

      case "voltar para início":
      case "voltar para o início":
      case "recomeçar apresentação":
        window.slidedeck.loadSlide(1);
        break;

      case "próximo slide":
      case "avançar slide":
      case "mike jagger":
      case "vai jegue":
      case "próxima tela":
      case "avançar tela":
      case "passar tela":
        window.slidedeck.nextSlide();
        break;
    
      case "slide anterior":
      case "voltar slide":
      case "tela anterior":
        window.slidedeck.prevSlide();
        break;

      case "pedir pizza":
      case "pedi pizza":
        audio_pizza.currentTime = 0;
        audio_pizza.play();
        break;

      case "como está o evento":
      case "está achando do evento":
        audio_picadasgalaxias.currentTime = 0;
        audio_picadasgalaxias.play();
        break;

    }

}



  var recognizing = false;
  var ignore_onend = false;



  var recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "pt-BR";
  recognition.maxAlternatives = 3;


  recognition.onstart = function() {
    recognizing = true;
    console.log("reconhecendo...");
  };

  recognition.onerror = function(event) {
    console.log("ERRO!", event.error);
    
    /*
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
    */

  };

  recognition.onend = function() {
    console.log("onEND!");


    recognizing = false;
    if (ignore_onend) {
      return;
    }

    recognition.start();

  };

  recognition.onresult = function(event) {

    //TODO: verificar comandos aqui
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      var r = event.results[i];
      for (var j = 0; j< r.length; j++) {
        console.log(i, j, r[j])

        for (indice in comandos) {
          var comando = comandos[indice];

          if (r[j].transcript.indexOf(comando)!= -1) {
            console.log("COMANDO: " + comando);
            executar_comando(comando);
            return;





          }

        }

/*
        if (r[j].transcript.indexOf("oi casa")!= -1) {
          console.log("COMANDO ATIVO");
          return;
        }
*/

      }

    }

/*
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
    */
  };


  recognition.start();






/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO UDP  * * * * * * * * * * * * * * * * * * * */

var socket = chrome.socket;


// From https://developer.chrome.com/trunk/apps/app_hardware.html
var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};




function getCamera() {
  navigator.webkitGetUserMedia({audio: false, video: true}, function(stream) {
    video_camera.src = webkitURL.createObjectURL(stream);
  }, function(e) {
    console.error(e);
  });
}

getCamera();


// >>>>>> USAR PROXY EM PROCESSING! <<<<<<<





var SERVER_SOCKET = 0;

chrome.socket.create('udp', null, function(createInfo){
    SERVER_SOCKET = createInfo.socketId;


    chrome.socket.bind(SERVER_SOCKET, "127.0.0.1", 6001, function(result){
      console.log('chrome.socket.bind: result = ' + result.toString());

      chrome.socket.sendTo(SERVER_SOCKET, str2ab('door_open'), "127.0.0.1", 6000, function callback(r){console.log(r);});
      setTimeout(function(){
        
        chrome.socket.sendTo(SERVER_SOCKET, str2ab('door_close'), "127.0.0.1", 6000, function callback(r){console.log(r);});

      }, 3000);
    });


    function read()
    {
        chrome.socket.recvFrom(SERVER_SOCKET, 1024, function(recvFromInfo){
            //console.log('Server: recvFromInfo: ', recvFromInfo, 'Message: ', 
            //    ab2str(recvFromInfo.data));

            if(recvFromInfo.resultCode >= 0)
            {

              var comando = "";

              console.log(ab2str(recvFromInfo.data).replace("\n", ""));

              switch(ab2str(recvFromInfo.data).replace("\n", "")) {
                case "sensor_high":

                  console.log("eh slide certo? ", window.slidedeck.curSlide_ == slides.indexOf("demoamigo"));
                  
                  if (window.slidedeck.curSlide_ == slides.indexOf("demoamigo"))
                  {

                  }
                  //comando = "door_open";
                  //set_lamp_state("1", true, 255, 0, 0, "none", null, null);

                  //window.slidedeck.loadSlide(SLIDE_CAMERA);
                  break;

                case "sensor_low":
                  //comando = "door_close";
                  //set_lamp_state("1", false);
                  //TODO: incluir timer de 10 SEGUNDOS para apagar!!!!
                  break;

                case "hidrocor":
                  window.slidedeck.loadSlide(slides.indexOf("demomusica")+1);
                  break;


                case "2001odisseia":
                  window.slidedeck.loadSlide(slides.indexOf("demofilme")+1);
                  break;

                default:
                  comando = "FAIL";
              }

              if (comando != "")
                chrome.socket.sendTo(SERVER_SOCKET, str2ab(comando), "127.0.0.1", 6000, function callback(r){console.log(r);});
              
              read();
            }
            else
                console.error('Server read error!');


        });
    }

    read();    


});










/*


    chrome.socket.bind(serverSocket, "255.255.255.255", 6000, function(result){
        console.log('chrome.socket.bind: result = ' + result.toString());

                

    });

    function read()
    {
        chrome.socket.recvFrom(serverSocket, 1024, function(recvFromInfo){
            console.log('Server: recvFromInfo: ', recvFromInfo, 'Message: ', 
                ab2str(recvFromInfo.data));
            if(recvFromInfo.resultCode >= 0)
            {
                chrome.socket.sendTo(serverSocket, 
                    str2ab('Received message from client ' + recvFromInfo.address + 
                    ':' + recvFromInfo.port.toString() + ': ' + 
                    ab2str(recvFromInfo.data)), 
                    recvFromInfo.address, recvFromInfo.port, function(){});
                read();
            }
            else
                console.error('Server read error!');
        });
    }

    read();


});
*/



















/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO HUE  * * * * * * * * * * * * * * * * * * * */

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h*255, s*255, l&255];
}




var config_data = {
  "devicetype": "frontinrio",
  "username": "frontinrio"
};

var lights = null;


var get_hue_ip = function() {
  $.getJSON("https://www.meethue.com/api/nupnp", function(data) {
    if (data.length > 0) {
      console.log("RECEBEU HUE " + data[0].id + " IP: " + data[0].internalipaddress);
      ipaddr = data[0].internalipaddress;
      active = true;
    }
  });
};
//get_hue_ip();

var set_group_state = function(onOff, hue, sat, bri, effect, transitionTime, lamp_alert) {
  set_state("/groups/0/action", onOff, bri, hue, sat, effect, transitionTime, lamp_alert);
}



var set_lamp_state = function(lamp_id, onOff, hue, sat, bri, effect, transitionTime, lamp_alert) {
  set_state("/lights/" + lamp_id + "/state", onOff, bri, hue, sat, effect, transitionTime, lamp_alert);
}


//var set_lamp_state = function(lamp_id, onOff, bri, hue, sat, effect, transitionTime, lamp_alert) {
//  set_state("/lights/" + lamp_id + "/state", onOff, bri, hue, sat, effect, transitionTime, lamp_alert);
//}



var set_state = function(addr, onOff, bri, hue, sat, effect, transitionTime, lamp_alert) {
  if (!ipaddr || !active) {
    //get_hue_ip();
    return;
  }

  var lamp_state = {};
  if (onOff != undefined)           lamp_state.on = onOff;
  if (bri != undefined)             lamp_state.bri = bri;
  if (hue != undefined)             lamp_state.hue = hue;
  if (sat != undefined)             lamp_state.sat = sat; 
  if (effect != undefined)          lamp_state.effect = effect;
  if (transitionTime != undefined)  lamp_state.transitiontime = transitionTime;
  if (lamp_alert != undefined)      lamp_state.alert = lamp_alert;

  var change_url = "http://"+ipaddr+"/api/" + config_data.username + addr;

  console.log(change_url, lamp_state);
  $.ajax({
    url: change_url,
    type: "PUT",
    data: JSON.stringify(lamp_state),
    success: function(result) {

      console.log(result);
      // Do something with the result
    }
  });
}





/* * * * * * * * * * * * * * * * * * * *  /CONFIGURANDO HUE  * * * * * * * * * * * * * * * * * * * */















var addVisibilityChangeListener=function(slides, callback) {

  var observer=new WebKitMutationObserver(function(changes) {
    for (var i=0; i<changes.length; i++) {
      var target=changes[i].target;
      callback(target);
    }
  });

  for (var i=0; i<slides.length; i++) {
    observer.observe(slides[i], 
      {attributes: true, attributeFilter: ['class']});
  }

}

var desiredColor=[255,255,255];
var currentColor=[0,0,0];

var msUntilChange=TIME_FOR_COLOR_CHANGE;

var requestColorChange=function(colorHex, transitionMs) {
  // ///////////////// geral.acende();


/*
  var hsbColor = rgbToHsl(color[0], color[1], color[1]);

  //set_lamp_state(lamp_id, onOff, bri, hue, sat, effect, transitionTime, lamp_alert)
  set_group_state(true, 255, Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), "none", null, null);
  set_lamp_state("2", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  set_lamp_state("3", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  set_lamp_state("4", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  set_lamp_state("5", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);

*/


  if (color[0]===desiredColor[0] &&
      color[1]===desiredColor[1] &&
      color[2]===desiredColor[2]
    ) {
    return;
  }

  desiredColor=color;
  msUntilChange=transitionMs;





}

var convertColor=function(str) {
  var n=window.parseInt(str, 16);
  return [
    n>>16 & 0xff,
    n>>8 & 0xff,
    n & 0xff
  ];
};

(function() {

  var moveDelta=function(c, percent) {
    var delta=desiredColor[c]-currentColor[c];
    var newColor=Math.round(currentColor[c]+delta*percent);
    if (delta>0 && newColor<currentColor[c] ||
        delta<0 && newColor>currentColor[c]) { // should move up but some calculation went wrong
      newColor=desiredColor[c];
    }
    currentColor[c]=Math.min(Math.max(newColor, 0), 255);
  }

  var lastTime=Date.now();

  window.setInterval(function() {
    var now=Date.now();
    var deltaTime=now-lastTime;
    lastTime=now;
    if (desiredColor[0]===currentColor[0] && 
        desiredColor[1]===currentColor[1] &&
        desiredColor[2]===currentColor[2]) {
      msUntilChange=0;
      return;
    }
    msUntilChange-=deltaTime;
    if (msUntilChange<=0) {
      msUntilChange=0;
      currentColor[0]=desiredColor[0];
      currentColor[1]=desiredColor[1];
      currentColor[2]=desiredColor[2];
    } else {
      var percent=(deltaTime/msUntilChange);
      moveDelta(0, percent);
      moveDelta(1, percent);
      moveDelta(2, percent);
    }
    changeColor(currentColor[0], currentColor[1], currentColor[2]);

  }, COLOR_UPDATE_INTERVAL);
})();

var changeColor=function(r, g, b) {
  // ///////////////// geral.setColor(r, g, b);
  /// REMOVI DAQUI!!!!


  var hsbColor = rgbToHsl(r, g, b);

  //set_lamp_state(lamp_id, onOff, bri, hue, sat, effect, transitionTime, lamp_alert)
  //set_lamp_state("1", null, 255, Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  //set_group_state(true, 255, Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]));

  //set_lamp_state("1", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);



  var el=document.getElementById("colortester");
  if (!el) {
    el=document.createElement('div');
    el.id='colortester';
    el.style.position='absolute';
    el.style.bottom='60px';
    el.style.right='60px';
    el.style.width='10px';
    el.style.height='10px';
    el.style.borderRadius='5px';
    document.body.appendChild(el);
  }
  var color='#'+
  (r<16?'0':'')+r.toString(16)+
  (g<16?'0':'')+g.toString(16)+
  (b<16?'0':'')+b.toString(16);
  el.style.backgroundColor=color;
}

var colorMap={
  greenlights: "00FF00",
  yellowlights: "FFFF00",
  bluelights: "0000FF",
  redlights: "FF0000",
  nolights: "000000"
};


var spotControl={
  spot_on: true,
  spot_off: false
};

addVisibilityChangeListener(document.querySelectorAll("slide"), 
  function(element) {
      var visible=element.className.indexOf("current")>=0;
      if (visible) {
        var classes=element.className.split(' ');
        for (var i=0; i<classes.length; i++) {
          var cl=classes[i];
          if (colorMap[cl]) {


            //requestColorChange(colorMap[cl], TIME_FOR_COLOR_CHANGE);
            
            var color = convertColor(colorMap[cl]);
            var hsbColor = rgbToHsl(color[0], color[1], color[2]);

            console.log(color, hsbColor);

            //             onOff, bri, hue, sat, effect, transitionTime, lamp_alert
            set_group_state(true, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), "none", null, null);


          } else if (typeof(spotControl[cl])==='boolean') {
            if (spotControl[cl]) {

              //pulpito.setBrightness(150);
              //pernas.acende();
              //logo.setBrightness(80);
            
            } else {
              //pulpito.apaga();
              //logo.acende();
              //pernas.apaga();
            
            }
          }
        }
      }
  });


/*

addVisibilityChangeListener([document.getElementById('move_icons')], 
  function(element) {
      var current=element.className.indexOf("build-current")>=0;
      var p=element.parentElement;
      var i1=p.querySelector("#icon1");
      if (current && i1.style.position!='absolute') {
        document.getElementById('offline_title').innerText="Chrome Apps: offline first"
        p.style.position='relative';
        var i3=p.querySelector("#icon3");
        var i2=p.querySelector("#icon2");
        var i_appcache=p.querySelector("#icon_appcache");
        i1.style.position=i2.style.position=i3.style.position=i_appcache.style.position='absolute';
        i1.style.left='142px';
        i_appcache.style.left='349px';
        i2.style.left='524px';
        i3.style.left='699px';
        i_appcache.style.top='100px';
        i1.style.webkitTransition=
        i2.style.webkitTransition=
        i3.style.webkitTransition=
        i_appcache.style.webkitTransition=
        '1s';
        setTimeout(function() {
          i1.style.left='630px';
          i2.style.left='420px';
          i3.style.left='160px';
          i_appcache.style.top='2000px';
          i1.offsetWidth=i1.offsetWidth;  
        }, 5);
      }
  });
*/






