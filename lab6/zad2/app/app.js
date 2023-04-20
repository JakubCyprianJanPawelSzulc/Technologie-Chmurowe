const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'test_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(80, () => {
  console.log('Server running on port 80');
});
