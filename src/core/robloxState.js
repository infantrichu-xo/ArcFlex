let currentUniverse = null;
let lastSeen = 0;

function setUniverse(universeId) {
    currentUniverse = universerId;
    lastSeen = Date.now();

}

function getUniverse() {
    return currentUniverse;
}

function getLastSeen() {
    return lastSeen;
}

function clearUniverse() {
    currentUniverse = null;
}

module.exports = {
    setUniverse,
    getUniverse,
    getLastSeen,
    clearUniverse,
};