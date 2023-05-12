const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3000;

app.use(express.json());

const url = "mongodb://database:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("test");
  dbo.createCollection("users", function (err, res) {
    if (err) throw err;
    console.log("created collection users");
    db.close();
  });
});

app.get("/users", async (req, res) => {
  await client.connect();
  const users = await client.db("test").collection("users").find().toArray();
  console.log(users);
  res.send(users);
});

app.post("/users", async (req, res) => {
  await client.connect();
  const { name, surname } = req.body;
  const result = await client
    .db("test")
    .collection("users")
    .insertOne({ name: name, surname: surname });
  console.log(result);
  res.send(result);
});

app.delete("/users", async (req, res) => {
  await client.connect();
  const { name, surname } = req.body;
  const result = await client
    .db("test")
    .collection("users")
    .deleteOne({ name: name, surname: surname });
  console.log(result);
  res.send(result);
});

app.put("/users", async (req, res) => {
  await client.connect();
  const { name, surname, newName, newSurname } = req.body;
  const result = await client
    .db("test")
    .collection("users")
    .updateOne(
      { name: name, surname: surname },
      { $set: { name: newName, surname: newSurname } }
    );
  console.log(result);
  res.send(result);
});

app.get("/live", (req, res) => {
  res.status(200).send("Status: Live");
});

app.get("/ready", async (req, res) => {
  try {
    await client.connect();
    res.status(200).send("Status: Ready");
  } catch (error) {
    res.status(500).send("Status: Not Ready");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});