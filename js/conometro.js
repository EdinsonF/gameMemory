window.onload = function() {
  pantalla = document.getElementById("screen");
}
var isMarch = false; 
var acumularTime = 0; 
function IniciarCronometro () {
        if (isMarch == false) { 
           timeInicial = new Date();
           control = setInterval(cronometro,10);
           isMarch = true;
           }
        }

        let result;
function cronometro () { 
        timeActual = new Date();
        acumularTime = timeActual - timeInicial;
        acumularTime2 = new Date();
        acumularTime2.setTime(acumularTime); 
        cc = Math.round(acumularTime2.getMilliseconds()/10);
       
        ss = acumularTime2.getSeconds();
        mm = acumularTime2.getMinutes();
  
        if (cc < 10) {cc = "0"+cc;}
        if (ss < 10) {ss = "0"+ss;} 
        if (mm < 10) {mm = "0"+mm;}
        result = mm+" : "+ss+" : "+cc;
        pantalla.innerHTML = mm+" : "+ss+" : "+cc;
        }

function detenerCronometro () { 
        if (isMarch == true) {
           clearInterval(control);
           isMarch = false;
           return result;
           }     
        }      

function resume () {
        if (isMarch == false) {
           timeActu2 = new Date();
           timeActu2 = timeActu2.getTime();
           acumularResume = timeActu2-acumularTime;
           
           timeInicial.setTime(acumularResume);
           control = setInterval(cronometro,10);
           isMarch = true;
           }     
        }

function reset () {
        if (isMarch == true) {
           clearInterval(control);
           isMarch = false;
           }
        acumularTime = 0;
        pantalla.innerHTML = " 00 : 00 : 00";
        }