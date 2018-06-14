const express = require('express')
const app = express()
// using pg : a node client library for connecting and querying a postgres db
const { Client } = require('pg');
// using a UUID library for generating unique ID's
const uuid = require('node-uuid');

//SERVER STARTUP:
// 1.db configuration with properties (from pg docs)
const dbClient = new Client({
  user: '', // created with psql
  host: 'localhost', //url
  database: 'pets', // db name
  password: '', // created with psql
  port: 5432,
})
dbClient.connect();

// parsing request bodies as json:
app.use(express.json());

// allowing cors for all origins (<<<FIX ME!>>>)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// setting routes
// 1. validate data(create) >> create data >> save data (store)
app.post('/pets', (request, response) => {

})

// get all pets
app.get('/', (request, response) => {

})

// get single pet (id)
app.get('/pets/:id', (request, response) => {

})

// update single pet
app.put('/pets/:id', (request, response) => {

})

// delete single pet
app.delete('/pets/:id', (request, response) => {

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
