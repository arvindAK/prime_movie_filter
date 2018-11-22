var express = require('express');
var router = express.Router();
const { Client } = require('pg');
const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool();
let limit = 40;

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.connect()
  .then(client => {
    return client.query(`SELECT * FROM movies WHERE imdb IS NOT NULL ORDER BY imdb DESC LIMIT ${limit};`)
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

router.get('/filter', function(req, res) {
  const params = {
    imdb:         req.query.imdb,
    year:         req.query.year,
    star_rating:  req.query.star_rating,
    star_count:   req.query.star_count,
    genre:        req.query.genre,
  };

  if (typeof req.query.limit !== 'undefined') limit = req.query.limit;
  let offset = typeof req.query.offset !== 'undefined' ? req.query.offset : 0
  let payload = 'SELECT * FROM movies WHERE imdb IS NOT NULL';
  let query = Object.keys(params)
    .filter(a => typeof params[a] !== 'undefined' && params[a] !== '')
    .map(k => k == 'genre' ? `'${params[k]}' = ANY(${k})` :`${k} >= ${params[k]}`)
    .join(' AND ');

  if (query.length > 0) payload += ` AND ${query}`;
  payload += ` ORDER BY imdb DESC LIMIT ${limit} OFFSET ${offset};`
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

module.exports = router;
