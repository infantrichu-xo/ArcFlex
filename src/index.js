const detectProcesses = require("./core/detector");
const findGame = require("./core/manager");

setInterval(async () => {
    const processes = await detectProcesses();

    const game = findGame(processes);

    console.clear();

    if (game) {
        console.log("🎮 Game Detected!\n");
        console.log(`Game: ${game.name}`);
        console.log(`Details: ${game.details}`);
        console.log(`State: ${game.state}`);
    } else {
        console.log("❌ No supported game detected.");
    }
}, 3000);