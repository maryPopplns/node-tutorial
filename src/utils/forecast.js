const request = require('request');

const forecast = (lat, lon, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=67470e5f32ea200548f0c1fa1f34e67b&query=' +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(lon) +
    '&units=f';

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback('unable to connect to url');
    } else if (body.error) {
      callback('location unavailable, please try another');
    } else {
      let location = body.location.region;
      let time = body.current.observation_time;
      let temp = body.current.temperature;

      callback(undefined, `${time} / ${location} / ${temp} degrees`);
    }
  });
};

module.exports = forecast;
