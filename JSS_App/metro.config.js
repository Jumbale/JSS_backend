const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Remove the withNativeWind wrapper completely
module.exports = config;