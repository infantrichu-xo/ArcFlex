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

function parseRobloxLog() {
    const latestLog = getLatestLog();

    if (!latestLog) return null;

    const log = fs.readFileSync(latestLog, "utf8");

    const placeMatches = [...log.matchAll(/placeid:(\d+)/gi)];
    const universeMatches = [...log.matchAll(/universeid:(\d+)/gi)];

    if (!placeMatches.length || !universeMatches.length) {
        return {
            inExperience: false,
            placeId: null,
            universeId: null,
        };
    }

    return {
        inExperience: true,
        placeId: placeMatches.at(-1)[1],
        universeId: universeMatches.at(-1)[1],
    };
}

module.exports = {
    parseRobloxLog,
};