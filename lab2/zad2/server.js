const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.status(200).json({ date: new Date() });
});

app.listen(8080, () => {
  console.log(`Server running at http://localhost:8080/`);
});