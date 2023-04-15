const mysql = require('mysql');
const express = require('express');

const app = express();
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'mysecretpassword',
    database: 'myapp'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(80, () => {
  console.log('App listening on port 80');
});
