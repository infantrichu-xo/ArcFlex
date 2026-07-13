const fs = require("fs");
const path = require("path");

const games = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../../database/games.json"),
        "utf8"
    )
);

function findGame(processes) {
    for (const process of processes) {
        if (games[process.name]) {
            return games[process.name];
        }
    }

    return null;
}

module.exports = findGame;