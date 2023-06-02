const express = require('express');
const app = express();
const port = 3000;

app.get('/endpoint_b', (req, res) => res.send('Dies ist die Antwort von Microservice B'));
app.listen(port, () => console.log(`Microservice-Server B überwacht den Port ${port}`));
