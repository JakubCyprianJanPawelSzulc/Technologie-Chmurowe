const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://mikroserwis-b-service/endpoint');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Es ist ein Fehler aufgetreten');
  }
});

app.listen(port, () => {
  console.log(`Microservice_a überwacht den Port ${port}`);
});