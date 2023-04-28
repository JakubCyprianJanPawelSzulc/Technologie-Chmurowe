const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const url = 'mongodb://db:27017';
const dbName = 'mydb';
const collectionName = 'users';

app.get('/users', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const users = await collection.find().toArray();
    res.json(users);
    client.close();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3003, () => {
  console.log('Server listening on port 3003');
});
