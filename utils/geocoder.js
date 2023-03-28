const NodeGeocoder = require('node-geocoder');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env'});
const options = {
  provider: process.env.GEOCODER_PROVIDER,

  // Optional depending on the providers
//   fetch: customFetchImplementation,
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// Using callback
// const res = await geocoder.geocode('29 champs elysée paris');

module.exports = geocoder;