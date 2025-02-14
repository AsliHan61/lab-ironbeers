const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/beers', (req, res) =>{
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', {beers:beersFromApi});
  })
  .catch(error =>{
    console.log(error);
    res.status(500).send('Error fetching beers from the database.')
  });
})
// Register the location for handlebars partials here:
app.get('/random-beer', (req, res) =>{
  punkAPI
  .getRandom()
  .then(responseFromAPI =>{
    const randomBeer = responseFromAPI[0];
    res.render('random-beer', {beer: randomBeer});
  })
  .catch(error => {
    console.log(error);
    res.status(500).send('Error fetching random beer from the database');
  });
})
// ...

// Add the route handlers here:

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
