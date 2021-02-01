const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibWFyeXAwcHBpbnMiLCJhIjoiY2trZm1maXRuMHcxbTJvcWJpbGR3ZTlobCJ9.0wjRU8JQ-s74BI5txlxptQ&limit=1';

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback('unable to connect to location services');
    } else if (body.features.length === 0) {
      callback('please enter a valid location. try another search');
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
