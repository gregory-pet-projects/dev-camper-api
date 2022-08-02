const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER || 'mapquest',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY || 'A00rUcZ31AMPGrPva8FaWVG4z17BG7mn',
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
