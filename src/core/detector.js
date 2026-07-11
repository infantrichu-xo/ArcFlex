const psList  = require("ps-list").default;

async function detectGames() {
    const processes = await psList();

    console.clear();

    console.log("Running Applications:\n");

    processes.forEach(process => {
        console.log(process.name);
    });
}

module.exports = detectGames;