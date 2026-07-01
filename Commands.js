/* ==========================================
   GeoFO Command Engine
   Version 0.1
========================================== */

(() => {

"use strict";

if(!window.GeoFO){

    console.error("GeoFO Core not found.");

    return;

}

GeoFO.Commands={};

GeoFO.Commands.process=function(command){

command=command.toLowerCase().trim();

GeoFO.log("Captain: "+command);

if(GeoFO.UI){

GeoFO.UI.addCaptainMessage(command);

}

//------------------------------------------------
// Greetings
//------------------------------------------------

const greetings=[

"hello",

"hi",

"hey",

"good morning",

"good afternoon",

"good evening",

"greetings"

];

if(greetings.some(g=>command.includes(g))){

return GeoFO.Commands.reply(

"Good day, Captain."

);

}

//------------------------------------------------
// How are you
//------------------------------------------------

if(

command.includes("how are you")||

command.includes("how are things")||

command.includes("everything alright")

){

return GeoFO.Commands.reply(

"I'm doing well, Captain."

);

}

//------------------------------------------------
// Ready
//------------------------------------------------

if(

command.includes("ready")||

command.includes("are you ready")||

command.includes("prepared")

){

return GeoFO.Commands.reply(

"Ready when you are, Captain."

);

}

//------------------------------------------------
// Thanks
//------------------------------------------------

if(

command.includes("thank")||

command.includes("good job")||

command.includes("nice work")

){

return GeoFO.Commands.reply(

"You're welcome, Captain."

);

}

//------------------------------------------------
// Goodbye
//------------------------------------------------

if(

command.includes("bye")||

command.includes("goodbye")||

command.includes("see you")

){

return GeoFO.Commands.reply(

"Have a pleasant flight, Captain."

);

}

//------------------------------------------------
// Weather
//------------------------------------------------

if(

command.includes("weather")||

command.includes("wind")||

command.includes("winds")

){

return GeoFO.Commands.reply(

"Weather data is currently unavailable."

);

}

//------------------------------------------------
// ETA
//------------------------------------------------

if(

command.includes("eta")||

command.includes("arrival")||

command.includes("time remaining")||

command.includes("how long")

){

return GeoFO.Commands.reply(

"ETA is unavailable until navigation is connected."

);

}
//------------------------------------------------
// Altitude
//------------------------------------------------

if(

command.includes("altitude")||

command.includes("flight level")||

command.includes("current altitude")

){

if(GeoFO.flight){

return GeoFO.Commands.reply(

`Current altitude is ${GeoFO.flight.altitude || "unknown"} feet.`

);

}

}

//------------------------------------------------
// Airspeed
//------------------------------------------------

if(

command.includes("speed")||

command.includes("airspeed")||

command.includes("current speed")

){

if(GeoFO.flight){

return GeoFO.Commands.reply(

`Current airspeed is ${GeoFO.flight.airspeed || "unknown"} knots.`

);

}

}

//------------------------------------------------
// Heading
//------------------------------------------------

if(

command.includes("heading")||

command.includes("current heading")

){

if(GeoFO.flight){

return GeoFO.Commands.reply(

`Current heading is ${GeoFO.flight.heading || "unknown"} degrees.`

);

}

}

//------------------------------------------------
// Flight Phase
//------------------------------------------------

if(

command.includes("flight phase")||

command.includes("phase")

){

return GeoFO.Commands.reply(

`Current flight phase is ${document.getElementById("gf-phase").textContent}.`

);

}

//------------------------------------------------
// Unknown Command
//------------------------------------------------

return GeoFO.Commands.reply(

"Sorry Captain, I didn't understand that command."

);

};

//================================================
// Reply Function
//================================================

GeoFO.Commands.reply=function(text){

GeoFO.log("FO: "+text);

if(GeoFO.UI){

GeoFO.UI.addFOMessage(text);

}

if(GeoFO.speak){

GeoFO.speak(text);

}

};

//================================================
// Finish
//================================================

GeoFO.log("Command Engine Loaded.");

})();
