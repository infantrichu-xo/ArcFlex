const psList  = require("ps-list").default;

async function detectProcesses() {
    return await psList();

}

module.exports = detectProcesses;