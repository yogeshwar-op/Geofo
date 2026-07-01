/* ==========================================
   GeoFO Flight Data Engine v3
   Repository Build (Clean Architecture)
========================================== */

(() => {

"use strict";

if (!window.GeoFO) {
    console.error("GeoFO Core not found.");
    return;
}

GeoFO.flight = GeoFO.flight || {};

//----------------------------------------------------
// Get GeoFS aircraft safely
//----------------------------------------------------

function getAircraft() {
    try {
        return window.geofs?.aircraft?.instance || null;
    } catch (e) {
        return null;
    }
}

//----------------------------------------------------
// Convert velocity vector → yaw (heading)
//----------------------------------------------------

function calculateYaw(a) {

    const v = a?.velocityDirection || a?.airVelocityDirection;

    if (!v) return GeoFO.flight.heading || 0;

    const x = v.x || 0;
    const z = v.z || 0;

    let yaw = Math.atan2(x, z) * (180 / Math.PI);

    if (yaw < 0) yaw += 360;

    return Math.round(yaw);
}

//----------------------------------------------------
// Normalize GeoFS → GeoFO format
//----------------------------------------------------

function mapData(a) {

    if (!a) return null;

    return {

        speedKt: a.trueAirSpeed || a.velocityScalar || 0,

        groundSpeedKt: a.groundSpeed || 0,

        altitudeFt: a.relativeAltitude || 0,

        aoaDeg: a.angleOfAttackDeg || 0,

        thrust: a.totalThrust || 0,

        onGround: a.groundContact || false,

        crashed: a.crashed || false,

        yaw: calculateYaw(a)

    };
}

//----------------------------------------------------
// Push data to UI
//----------------------------------------------------

function updateUI(data) {

    if (!GeoFO.UI || !data) return;

    GeoFO.UI.setIAS(Math.round(data.speedKt));

    GeoFO.UI.setAltitude(Math.round(data.altitudeFt));

    GeoFO.UI.setHeading(data.yaw);

}

//----------------------------------------------------
// Flight phase detection
//----------------------------------------------------

function getPhase(data) {

    if (!data) return "UNKNOWN";

    if (data.onGround && data.speedKt < 5) return "PARKED";

    if (data.onGround && data.speedKt >= 5) return "TAXI";

    if (!data.onGround && data.speedKt < 80) return "TAKEOFF";

    if (!data.onGround && data.altitudeFt < 5000) return "CLIMB";

    if (!data.onGround && data.altitudeFt >= 5000) return "CRUISE";

    return "UNKNOWN";
}

//----------------------------------------------------
// Main loop
//----------------------------------------------------

GeoFO.flight.start = function () {

    if (GeoFO.flight._running) return;

    GeoFO.flight._running = true;

    GeoFO.log("Flight Data Engine v3 loaded.");

    setInterval(() => {

        const aircraft = getAircraft();

        const data = mapData(aircraft);

        if (!data) return;

        // Store globally
        GeoFO.flight.speedKt = data.speedKt;
        GeoFO.flight.groundSpeedKt = data.groundSpeedKt;
        GeoFO.flight.altitudeFt = data.altitudeFt;
        GeoFO.flight.aoaDeg = data.aoaDeg;
        GeoFO.flight.thrust = data.thrust;
        GeoFO.flight.onGround = data.onGround;
        GeoFO.flight.yaw = data.yaw;

        GeoFO.flight.phase = getPhase(data);

        // Update UI
        updateUI(data);

    }, 1000);

};

//----------------------------------------------------
// Public getters (for ETA, callouts later)
//----------------------------------------------------

GeoFO.flight.getSpeed = () => GeoFO.flight.speedKt || 0;

GeoFO.flight.getAltitude = () => GeoFO.flight.altitudeFt || 0;

GeoFO.flight.getHeading = () => GeoFO.flight.yaw || 0;

GeoFO.flight.getPhase = () => GeoFO.flight.phase || "UNKNOWN";

//----------------------------------------------------
// Boot
//----------------------------------------------------

GeoFO.flight.start();

GeoFO.log("FlightData v3 initialized.");

})();
