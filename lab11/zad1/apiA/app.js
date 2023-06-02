const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const mikroserwisBUrl = 'http://mikroserwis-b-service:3000';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${mikroserwisBUrl}/endpoint_b`);
    res.send(response.data);
  } catch (error) {
    console.error('Fehler beim Abfragen von Microservice B:', error);
    res.status(500).send('Beim Abfragen von Microservice B ist ein Fehler aufgetreten.');
  }
});

app.listen(port, () => {
  console.log(`Microservice-Server A lauscht an einem Port ${port}`);
});
