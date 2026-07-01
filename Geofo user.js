// ==UserScript==
// @name         GeoFO
// @namespace    https://github.com/yogeshwar-op/GeoFO
// @version      0.1.0
// @description  A virtual First Officer for GeoFS
// @author       Yogeshear Shrikant Deshmukh
// @match        https://www.geo-fs.com/*
// @match        https://geo-fs.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    //////////////////////////////////////////////////////
    //                 GEOFO CORE
    //////////////////////////////////////////////////////

    const GeoFO = {

        version: "0.1.0",

        status: "BOOTING",

        listening: false,

        recognition: null,

        currentVoice: null,

        settings: {

            speechRate: 1,

            speechPitch: 1,

            speechVolume: 1,

            autoListen: false

        },

        ui: {},

        flight: {},

        weather: {},

        eta: {},

        log(message) {

            console.log(`[GeoFO] ${message}`);

        }

    };

    window.GeoFO = GeoFO;

    //////////////////////////////////////////////////////
    //                  BOOT
    //////////////////////////////////////////////////////

    GeoFO.boot = function () {

        this.log("--------------------------------");

        this.log("GeoFO v" + this.version);

        this.log("Booting...");

        this.status = "ONLINE";

        this.log("Status: " + this.status);

        this.log("--------------------------------");

    };

    //////////////////////////////////////////////////////
    //              VOICE SELECTION
    //////////////////////////////////////////////////////

    GeoFO.getBestVoice = function () {

        const voices = speechSynthesis.getVoices();

        let voice =

            voices.find(v => v.name.includes("Aria")) ||

            voices.find(v => v.name.includes("Ryan")) ||

            voices.find(v => v.name.includes("Guy")) ||

            voices.find(v => v.name.includes("Google")) ||

            voices.find(v => v.name.includes("Microsoft")) ||

            voices[0];

        this.currentVoice = voice;

        if (voice)

            this.log("Voice: " + voice.name);

    };

    //////////////////////////////////////////////////////
    //                SPEAK
    //////////////////////////////////////////////////////

    GeoFO.speak = function (text) {

        speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance(text);

        msg.rate = this.settings.speechRate;

        msg.pitch = this.settings.speechPitch;

        msg.volume = this.settings.speechVolume;

        if (this.currentVoice)

            msg.voice = this.currentVoice;

        speechSynthesis.speak(msg);

        this.log("FO: " + text);

    };

    //////////////////////////////////////////////////////
    //               STARTUP
    //////////////////////////////////////////////////////

    speechSynthesis.onvoiceschanged = () => {

        GeoFO.getBestVoice();

    };

    GeoFO.boot();

    setTimeout(() => {

        GeoFO.getBestVoice();

        GeoFO.speak(
            "Geo Fo online. Systems initialized. Ready when you are, Captain."
        );

    }, 1000);

})();
