const RPC = require("discord-rpc");
require("dotenv").config();

const client = new RPC.Client({ transport: "ipc" });

let connected = false;
let startTime = null;

async function connectRPC() {
    if (connected) return;

    client.on("ready", () => {
        connected = true;
        console.log("✅ Connected to Discord!");
    });

    try {
        await client.login({
            clientId: process.env.CLIENT_ID,
        });
    } catch (err) {
        console.error("❌ Failed To connect to Discord");
        console.error(err.message);
    }
}

function updatePresence(game, experience) {

    if(!connected) return;

    if (!startTime) {
        startTime = new Date();
    }

    console.log("📡 Sending Presence..");

    const validExperience =
    experience &&
    !experience.error &&
    experience.name &&
    experience.playing != null;

    console.log({
        details: "Flexing ROBLOX",

        state: validExperience
           ? experience.name
           : "Browsing Experiences",
        largeImageKey: "roblox",

        smallImageKey: "arcflex",

        largeImageText: validExperience
        ? `${experience.playing.toLocaleString()} players online`
        : "Roblox",

        smallImageText: "ArcFlex",
    });

    client.setActivity({
        details: "Flexing ROBLOX",

        state: validExperience
            ? experience.name: 
            "Browsing Experiences",
        
        largeImageKey: "roblox",
        smallImageKey: "aarcflex",

        largeImageText: validExperience
        ? `${experience.playing.toLocaleString()} players online`
        : "Roblox",

        smallImageText: "Arcflex",

        startTimestamp: startTime,

        instance: false,

    });

    console.log("✅ Sent Presence!");

}

function clearPresence() {
    if (!connected) return;

    startTime = null;
    client.clearActivity();
}

module.exports = {
    client,
    connectRPC,
    updatePresence,
    clearPresence,
}