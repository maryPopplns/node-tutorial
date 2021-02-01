const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const chalk = require('chalk');

const app = express();

//defined paths
const public = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static directory
app.use(express.static(public));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Spencer Knight',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me',
    name: 'Spencer Knight',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'this is the message I was instructed to insert into this page',
    name: 'spencer',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'help page not found',
    errorMessage: 'please try another help page',
    name: 'spencer',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'please include an address',
    });
  }

  geocode(req.query.address, (err, { lat, lon, name } = {}) => {
    if (err) {
      res.send({
        error: 'please enter a valid location',
      });
    }

    forecast(lat, lon, (err, forecastData) => {
      if (err) {
        return console.log(chalk.inverse('Error :', err));
      }
      res.send({
        location: name,
        forecastData,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (req.query.search) {
    res.send({
      products: [],
    });
  } else {
    res.send({
      error: 'please priviude search term',
    });
  }
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    errorMessage: 'page not found, please try another',
    name: 'spencer',
  });
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
