const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Połączono z bazą danych MongoDB');
  })
  .catch((err) => {
    console.error('Błąd połączenia z bazą danych MongoDB:', err);
  });


const DataSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  productId: String,
  quantity: Number,
});

const DataModel = mongoose.model('Data', DataSchema);

app.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    console.error('Błąd podczas pobierania danych:', err);
    res.status(500).send('Wystąpił błąd podczas pobierania danych.');
  }
});

app.delete('/data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await DataModel.findByIdAndDelete(id);
    res.send(`Usunięto dane o ID ${id}`);
  } catch (err) {
    console.error('Błąd podczas usuwania danych:', err);
    res.status(500).send('Wystąpił błąd podczas usuwania danych.');
  }
});

function loadInitialData() {
  fs.readFile('data.json', 'utf8', async (err, data) => {
    if (err) {
      console.error('Błąd odczytu pliku JSON:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      await DataModel.insertMany(jsonData.data);
      console.log('Dane wczytane i zapisane w bazie danych.');
    } catch (err) {
      console.error('Błąd parsowania pliku JSON lub zapisywania danych:', err);
    }
  });
}

loadInitialData();

app.listen(PORT, () => {
  console.log(`Serwer API działa na porcie ${PORT}`);
});
