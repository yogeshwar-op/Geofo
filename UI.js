/* ============================================================
   GeoFO UI
   Version 0.1.0
============================================================ */

(() => {
    "use strict";

    if (!window.GeoFO) {
        console.error("GeoFO Core not found.");
        return;
    }

    const UI = {};

    //----------------------------------------------------------
    // Create Styles
    //----------------------------------------------------------

    const style = document.createElement("style");

    style.textContent = `

#geofo-window{

position:fixed;

top:80px;

right:30px;

width:420px;

height:650px;

background:#1B1B1B;

color:#F2F2F2;

font-family:"Segoe UI",sans-serif;

border-radius:12px;

box-shadow:0 10px 30px rgba(0,0,0,.55);

overflow:hidden;

z-index:999999;

user-select:none;

border:1px solid #3B3B3B;

}

#geofo-header{

height:55px;

background:#252525;

display:flex;

justify-content:space-between;

align-items:center;

padding:0 18px;

font-size:20px;

font-weight:600;

cursor:move;

border-bottom:1px solid #444;

}

#geofo-status{

color:#42D46A;

font-size:13px;

font-weight:bold;

}

.geofo-section{

padding:15px;

border-bottom:1px solid #333;

}

.geofo-title{

font-size:13px;

color:#AAAAAA;

letter-spacing:1px;

margin-bottom:10px;

}

.geofo-grid{

display:grid;

grid-template-columns:1fr auto;

row-gap:8px;

column-gap:20px;

font-size:14px;

}

.geofo-value{

font-weight:bold;

color:white;

}

#geofo-log{

height:180px;

background:#111;

border-radius:8px;

padding:10px;

overflow-y:auto;

font-size:14px;

line-height:1.5;

}

.geofo-msg{

margin-bottom:8px;

}

.geofo-captain{

color:#6EC6FF;

}

.geofo-fo{

color:#7CFF95;

}

#geofo-buttons{

display:flex;

gap:10px;

margin-top:12px;

}

.geofo-btn{

flex:1;

background:#2E2E2E;

border:none;

color:white;

padding:10px;

border-radius:8px;

cursor:pointer;

transition:.2s;

font-size:14px;

}

.geofo-btn:hover{

background:#3E3E3E;

}

`;

    document.head.appendChild(style);

    //----------------------------------------------------------
    // Create Window
    //----------------------------------------------------------

    const panel = document.createElement("div");

    panel.id = "geofo-window";

    panel.innerHTML = `

<div id="geofo-header">

<div>✈ GeoFO</div>

<div id="geofo-status">● ONLINE</div>

</div>

<div class="geofo-section">

<div class="geofo-title">

CREW STATUS

</div>

<div class="geofo-grid">

<div>Listening</div>
<div id="gf-listening" class="geofo-value">OFF</div>

<div>Flight Phase</div>
<div id="gf-phase" class="geofo-value">PREFLIGHT</div>

<div>Voice</div>
<div id="gf-voice" class="geofo-value">AUTO</div>

</div>

</div>

<div class="geofo-section">

<div class="geofo-title">

AIRCRAFT

</div>

<div class="geofo-grid">

<div>IAS</div>
<div id="gf-ias" class="geofo-value">---</div>

<div>Altitude</div>
<div id="gf-alt" class="geofo-value">----- ft</div>

<div>Heading</div>
<div id="gf-hdg" class="geofo-value">---</div>

<div>ETA</div>
<div id="gf-eta" class="geofo-value">--:--</div>

<div>Wind</div>
<div id="gf-wind" class="geofo-value">---</div>

</div>

</div>

<div class="geofo-section">

<div class="geofo-title">

COMMUNICATION

</div>

<div id="geofo-log"></div>

<div id="geofo-buttons">

<button id="gf-start" class="geofo-btn">

Start

</button>

<button id="gf-stop" class="geofo-btn">

Stop

</button>

<button id="gf-clear" class="geofo-btn">

Clear

</button>

</div>

</div>

`;

    document.body.appendChild(panel);

    //----------------------------------------------------------
    // UI Functions
    //----------------------------------------------------------

    UI.log = function(sender, text){

        const log = document.getElementById("geofo-log");

        const msg = document.createElement("div");

        msg.className = "geofo-msg";

        if(sender==="Captain"){

            msg.innerHTML=`<span class="geofo-captain"><b>Captain:</b></span> ${text}`;

        }else{

            msg.innerHTML=`<span class="geofo-fo"><b>First Officer:</b></span> ${text}`;

        }

        log.appendChild(msg);

        log.scrollTop = log.scrollHeight;

    };

    UI.setListening=function(state){

        document.getElementById("gf-listening").textContent=
        state?"ON":"OFF";

    };

    UI.setVoice=function(name){

        document.getElementById("gf-voice").textContent=name;

    };

    UI.setPhase=function(name){

        document.getElementById("gf-phase").textContent=name;

    };

    UI.setIAS=function(speed){

        document.getElementById("gf-ias").textContent=
        speed+" kt";

    };

    UI.setAltitude=function(alt){

        document.getElementById("gf-alt").textContent=
        alt+" ft";

    };

    UI.setHeading=function(hdg){

        document.getElementById("gf-hdg").textContent=
        hdg+"°";

    };

    UI.setETA=function(time){

        document.getElementById("gf-eta").textContent=time;

    };

    UI.setWind=function(text){

        document.getElementById("gf-wind").textContent=text;

    };

    GeoFO.UI = UI;
    //----------------------------------------------------------
    // Default Conversation
    //----------------------------------------------------------

    UI.log(
        "First Officer",
        "GeoFO online. Ready when you are, Captain."
    );

    //----------------------------------------------------------
    // Button Events
    //----------------------------------------------------------

    document
        .getElementById("gf-start")
        .addEventListener("click", () => {

            UI.setListening(true);

            UI.log(
                "First Officer",
                "Voice recognition started."
            );

            if (GeoFO.startListening) {
                GeoFO.startListening();
            }

        });

    document
        .getElementById("gf-stop")
        .addEventListener("click", () => {

            UI.setListening(false);

            UI.log(
                "First Officer",
                "Voice recognition stopped."
            );

            if (GeoFO.stopListening) {
                GeoFO.stopListening();
            }

        });

    document
        .getElementById("gf-clear")
        .addEventListener("click", () => {

            document.getElementById("geofo-log").innerHTML = "";

        });

    //----------------------------------------------------------
    // Draggable Window
    //----------------------------------------------------------

    const header = document.getElementById("geofo-header");

    let dragging = false;

    let offsetX = 0;

    let offsetY = 0;

    header.addEventListener("mousedown", e => {

        dragging = true;

        offsetX = e.clientX - panel.offsetLeft;

        offsetY = e.clientY - panel.offsetTop;

    });

    document.addEventListener("mouseup", () => {

        dragging = false;

    });

    document.addEventListener("mousemove", e => {

        if (!dragging) return;

        panel.style.left = (e.clientX - offsetX) + "px";

        panel.style.top = (e.clientY - offsetY) + "px";

        panel.style.right = "auto";

    });

    //----------------------------------------------------------
    // Helper Methods
    //----------------------------------------------------------

    UI.setOnline = function (online) {

        const status = document.getElementById("geofo-status");

        if (online) {

            status.textContent = "● ONLINE";
            status.style.color = "#42D46A";

        } else {

            status.textContent = "● OFFLINE";
            status.style.color = "#FF5C5C";

        }

    };

    UI.addCaptainMessage = function (text) {

        UI.log("Captain", text);

    };

    UI.addFOMessage = function (text) {

        UI.log("First Officer", text);

    };

    //----------------------------------------------------------
    // Demo Flight Data
    // (Removed later when GeoFS is connected)
    //----------------------------------------------------------

    let demoIAS = 0;

    let demoALT = 0;

    setInterval(() => {

        demoIAS += 2;

        if (demoIAS > 145)
            demoIAS = 0;

        demoALT += 50;

        if (demoALT > 38000)
            demoALT = 0;

        UI.setIAS(demoIAS);

        UI.setAltitude(demoALT);

        UI.setHeading(Math.floor(Math.random() * 360));

    }, 1000);

    //----------------------------------------------------------
    // Welcome
    //----------------------------------------------------------

    setTimeout(() => {

        UI.addFOMessage(
            "Welcome aboard, Captain."
        );

    }, 1200);

    setTimeout(() => {

        UI.addFOMessage(
            "All systems are operating normally."
        );

    }, 2500);

    //----------------------------------------------------------
    // Finished
    //----------------------------------------------------------

    GeoFO.log("UI Loaded.");

})();
