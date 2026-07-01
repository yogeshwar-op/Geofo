/* ==========================================
   GeoFO Speech Engine
   Version 0.1
========================================== */

(() => {

"use strict";

if (!window.GeoFO) {
    console.error("GeoFO Core not found.");
    return;
}

GeoFO.speech = {};

//----------------------------------------------------
// Speech Recognition Setup
//----------------------------------------------------

let recognition = null;
let isListening = false;

//----------------------------------------------------
// Check browser support
//----------------------------------------------------

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    console.warn("[GeoFO] Speech Recognition not supported in this browser.");

    GeoFO.speech.supported = false;

} else {

    GeoFO.speech.supported = true;

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

}

//----------------------------------------------------
// Start Listening
//----------------------------------------------------

GeoFO.startListening = function () {

    if (!GeoFO.speech.supported) {

        GeoFO.log("Speech recognition not supported.");

        return;

    }

    if (isListening) return;

    isListening = true;

    GeoFO.UI.setListening(true);

    GeoFO.log("Speech recognition started.");

    recognition.start();

};

//----------------------------------------------------
// Stop Listening
//----------------------------------------------------

GeoFO.stopListening = function () {

    if (!GeoFO.speech.supported) return;

    isListening = false;

    GeoFO.UI.setListening(false);

    GeoFO.log("Speech recognition stopped.");

    recognition.stop();

};

//----------------------------------------------------
// On Result (VOICE → TEXT)
//----------------------------------------------------

recognition.onresult = function (event) {

    let transcript =
        event.results[event.results.length - 1][0].transcript;

    transcript = transcript.toLowerCase().trim();

    GeoFO.log("Heard: " + transcript);

    // Send to command engine
    if (GeoFO.Commands && GeoFO.Commands.process) {

        GeoFO.Commands.process(transcript);

    } else {

        GeoFO.log("Command engine not loaded.");

    }

};

//----------------------------------------------------
// Error handling
//----------------------------------------------------

recognition.onerror = function (event) {

    GeoFO.log("Speech error: " + event.error);

};

//----------------------------------------------------
// Auto restart (keeps listening alive)
//----------------------------------------------------

recognition.onend = function () {

    if (isListening) {

        try {

            recognition.start();

        } catch (e) {}

    }

};

//----------------------------------------------------
// Voice Output Helper (fallback safety)
//----------------------------------------------------

GeoFO.speak = GeoFO.speak || function (text) {

    const msg = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();

    msg.voice =
        voices.find(v => v.name.includes("Google")) ||
        voices[0];

    msg.rate = 1;
    msg.pitch = 1;

    speechSynthesis.speak(msg);

};

//----------------------------------------------------
// Log
//----------------------------------------------------

GeoFO.log("Speech Engine Loaded.");

})();
