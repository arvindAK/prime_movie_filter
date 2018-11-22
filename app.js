var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Client } = require('pg');
const { Pool } = require('pg')
require('dotenv').config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

app.get('/api/movies', function(req, res) {
  const params = {
    imdb:         req.query.imdb,
    year:         req.query.year,
    star_rating:  req.query.star_rating,
    star_count:   req.query.star_count,
    genre:        req.query.genre,
  };

  let offset = typeof req.query.offset !== 'undefined' ? req.query.offset : 0
  let payload = 'SELECT * FROM movies WHERE imdb IS NOT NULL';
  let query = Object.keys(params)
    .filter(a => typeof params[a] !== 'undefined' && params[a] !== '')
    .map(k => k == 'genre' ? `'${params[k]}' = ANY(${k})` :`${k} >= ${params[k]}`)
    .join(' AND ');

  if (query.length > 0) payload += ` AND ${query}`;
  payload += ` ORDER BY imdb DESC LIMIT 40 OFFSET ${offset};`
  console.log('payload', payload);
  pool.connect()
  .then(client => {
    return client.query(payload)
      .then(result => {
        client.release()
        res.json(result)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
