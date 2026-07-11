require("dotenv").config();

const RPC = require("discord-rpc");

const clientId = process.env.CLIENT_ID;

RPC.register(clientId);

const rpc = new RPC.Client({ transport: "ipc"});

const startTimestamp = new Date();

rpc.on("ready", () => {
    console.log("✅ Connected to Discord!");

    rpc.setActivity({
        details: "🚀 Building Arcflex",
        state: "Discord Rich Presence",
        startTimestamp,

        largeImageKey: "arcflex",
        largeImageText: "Arcflex",
    
        instance: false,
    });

    console.log("🎉 Rich Presence is now active!");
});

rpc.login({ clientId }).catch(console.error);