'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3030;

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'mysql',
    user: 'root',
    password: 'example',
    database: 'myapp_test'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/promotions', (req, res) => {
  knex.select('*')
    .from('promotion_rules')
    .then((data) => {
      res.send(data);
    });
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
