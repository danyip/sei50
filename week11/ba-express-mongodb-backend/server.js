
const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use( cors() ); // get this package to set the cors header for us

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} ...`);
});

// MongoDB initialisation section //////////////////

const mongoose = require('mongoose');

// Load our Flight model file (and any others?)
const Flight = require('./models/Flight');

// Connect to DB server; note the DB selection: 'ba', like a path
mongoose.connect('mongodb://127.0.0.1/ba');

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connection error', err);
  process.exit( 1 ); // quit the server
  // TODO: handle gracefully instead? Keep server running?
});

///////////////////////////////////////////////////




// get '/' do
//   # params
//  'response'
// end

app.get('/',  (req, res) => {
  res.send('Welcome to the BA backend!');
}); // GET /


// // Set up a generic handler that runs first for ANY route
// app.use( (req, res, next) => {
//   console.log('request: ', req.url);
//
//   // set header here once so we don't have to do it
//   // separately inside each specific router handler
//   res.header('Access-Control-Allow-Origin', '*');
//
//   next(); // move on to the next route handler below in the middleware stack
// });

app.get('/flights/search/:origin/:destination', async (req, res) => {

  console.log('params', req.params);

  // Fake flights response

  // res.json([
  //   { flight_number: 'BA123' },
  //   { flight_number: 'BA456'}
  // ]);

  try {
    // const query = { origin: req.params.origin, destination: req.params.destination }; // like strong params
    const {origin, destination} = req.params;
    const flights = await Flight.find( {origin, destination} );
    res.json( flights );
  } catch( err ){
    console.log('Error searching for flights', err);
    res.sendStatus( 422 ); // 'Unprocessable entity'
  }

}); // GET /flights/search/:origin/:destination


app.get('/flights/:id', async (req, res) => {

  const flight = await Flight.findOne({ _id: req.params.id });
  res.json( flight );

}); // GET /flights/:id
