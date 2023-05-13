const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hallo das Welt!');
});

app.get('/health', (req, res) => {
  res.send("Alles gut!");
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});