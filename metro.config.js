const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.sourceExts.concat(['js', 'json', 'ts', 'tsx']);

module.exports = defaultConfig;