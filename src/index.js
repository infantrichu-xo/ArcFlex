const detectGames = require("./core/detector");

setInterval(() => {
    detectGames();
}, 3000);