const express = require('express')
const app = express()
// using pg : a node client library for connecting and querying a postgres db
const { Client } = require('pg');
// using a UUID library for generating unique ID's
const uuid = require('node-uuid');

//SERVER STARTUP:
// 1.db configuration with properties (from pg docs)
const dbClient = new Client({
  user: 'serverapp', // created with psql
  host: 'localhost', //url
  database: 'pets', // db name
  password: 'edioh39034pjo^*&0JLKNMIF', // created with psql
  port: 5432,
})
dbClient.connect();

// parsing request bodies as json:
app.use(express.json());

// allowing cors for all origins (<<<NOT SAFE!!! FIX ME!!!>>> worked for postman, but not client-side)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// setting routes
// 1. validate data(create) >> create data >> save data (store)
app.post('/pets', (req, res) => {
  let newPet = {
    id: uuid.v4(),
    owner: req.body.ownerId,
    petName: req.body.petName,
    petType: req.body.petType
  }

  let query = 'INSERT INTO pets (id, owner, petName, petType) VALUES ($1, $2, $3, $4)';
  let values = [newPet.id, newPet.owner, newPet.petName, newPet.petType]
  dbClient.query(query, values, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    } else {
      res.status(201).json(newPet); // 201: created
    }
  })
})

// get all pets
app.get('/pets', (request, response) => {
  response.json({name: 'dog'})
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
