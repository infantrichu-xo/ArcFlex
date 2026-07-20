const fs = require("fs");
const path = require("path");
const os = require("os");

const logsDir = path.join(os.homedir(), "Library", "Logs", "Roblox");

function getLatestLog() {
    const files = fs.readdirSync(logsDir)
       .filter(file => file.endsWith("_last.log"))
       .map(file => ({
           name: file,
           time: fs.statSync(path.join(logsDir, file)).mtimeMs,
       }))
       .sort((a, b) => b.time - a.time);
    if (!files.length) return null;

    return path.join(logsDir, files[0].name);
}

function getCurrentGame() {
    const latestLog = getLatestLog();

    if (!latestLog) return null;

    const log = fs.readFileSync(latestLog, "utf8");

    const disconnected =
        log.includes("Client:Disconnect") ||
        log.includes("DisconnectClientInitiated") ||
        log.includes("Disconnected from server");

    const placeMatches = [...log.matchAll(/placeid:(\d+)/gi)];
    const universeMatches = [...log.matchAll(/universeid:(\d+)/gi)];

    console.log("Place matches:", placeMatches.map(x => x[1]));
    console.log("Universe matches:", universeMatches.map(x => x[1]));
    console.log("Disconnected:", disconnected);

    if (!placeMatches.length || !universeMatches.length) {
        return null;
    }

    const placeId = placeMatches.at(-1)[1];
    const universeId = universeMatches.at(-1)[1];

    if (disconnected) {
        return null;
    }

    return {
        placeId,
        universeId,
    };
}

module.exports = {
    getCurrentGame,
};