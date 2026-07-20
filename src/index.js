const detectProcesses = require("./core/detector");
const findGame = require("./core/manager");
const { getCurrentGame } = require("./core/roblox")
const { getExperience } = require("./core/experience");

const { 
    connectRPC,
    updatePresence,
    clearPresence,
} = require("./core/rpc");

connectRPC();

setInterval(async () => {
    console.clear();

    const processes = await detectProcesses();
    const game = findGame(processes);

    if (!game) {
        clearPresence();
        console.log("❌ No supported game detected.");
        return;
    }

    const currentGame = getCurrentGame();

    let experience = null;

    if (currentGame) {

        experience = await getExperience(currentGame.universeId);

        console.log("Inside Experience");
        console.log(currentGame);
        console.log(experience);

    } else {

        console.log("Browsing Roblox")
    }

    updatePresence(game, experience);

    console.log("\n🎮 Game Detected!\n");
    console.log(`Game: ${game.name}`);

    if (currentGame && experience && !experience.error) {
        console.log(`Experience: ${experience.name}`);
        console.log(`Players: ${experience.playing.toLocaleString()}`);
    } else {
        console.log("Browsing Roblox")
    }

}, 3000);