const axios = require("axios");
const cache = require("./cache");

async function getExperience(universeId) {

    if (!universeId) {
        return null;
    }

    const cached = cache.get(universeId);

    if (cached) {
        console.log("📦 Using cached experience.");
        return cached;
    }

    try {
        console.log("🌐 Fetching experience from ArcFlex API:", universeId);

        const response = await axios.get(
            `http://localhost:3000/roblox/${universeId}`
        );

    
        cache.set(universeId, response.data);

        return response.data;

    } catch (err) {
        console.error("❌ Failed to fetch experience from ArcFlex API.");
        console.error(err.response?.data || err.message);

        return null;
    }
}

module.exports = {
    getExperience,
};