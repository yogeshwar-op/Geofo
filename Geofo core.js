/* ============================================
   GeoFO Core
   Version: 0.1.0
============================================ */

(() => {
    "use strict";

    if (window.GeoFO) {
        console.warn("[GeoFO] Already running.");
        return;
    }

    const GeoFO = {

        //======================================
        // General
        //======================================

        version: "0.1.0",

        name: "GeoFO",

        status: "BOOTING",

        started: Date.now(),

        modules: {},

        //======================================
        // Settings
        //======================================

        settings: {

            speechRate: 1.0,

            speechPitch: 1.0,

            speechVolume: 1.0,

            autoListen: false,

            debug: true

        },

        //======================================
        // Flight Data
        //======================================

        flight: {

            altitude: 0,

            airspeed: 0,

            groundspeed: 0,

            heading: 0,

            verticalSpeed: 0,

            latitude: 0,

            longitude: 0,

            gear: 0,

            flaps: 0,

            throttle: 0

        },

        //======================================
        // Weather
        //======================================

        weather: {

            windSpeed: 0,

            windDirection: 0

        },

        //======================================
        // Navigation
        //======================================

        navigation: {

            eta: null,

            distanceRemaining: null

        },

        //======================================
        // Voice
        //======================================

        voice: {

            recognition: null,

            currentVoice: null,

            listening: false

        },

        //======================================
        // Logging
        //======================================

        log(message) {

            console.log(`[GeoFO] ${message}`);

        },

        warn(message) {

            console.warn(`[GeoFO] ${message}`);

        },

        error(message) {

            console.error(`[GeoFO] ${message}`);

        },

        //======================================
        // Module System
        //======================================

        registerModule(name, module) {

            this.modules[name] = module;

            this.log(`Loaded module: ${name}`);

        },

        getModule(name) {

            return this.modules[name];

        },

        //======================================
        // Boot
        //======================================

        boot() {

            this.status = "ONLINE";

            this.log("--------------------------------");

            this.log("GeoFO Version " + this.version);

            this.log("System Online");

            this.log("--------------------------------");

        }

    };

    window.GeoFO = GeoFO;

    GeoFO.boot();

})();
