const express = require('express');
const router = express.Router();
const connectToMongo = require('../db/mongodb');

let db;
connectToMongo().then(database => db = database);

// Buscar documentos no MongoDB
router.post('/query', async (req, res) => {
  const { collection, filter } = req.body;
  if (!collection) return res.status(400).send('Collection não fornecida');

  try {
    const results = await db.collection(collection).find(filter || {}).toArray();
    res.send(results);
  } catch (err) {
    console.error('Erro ao buscar documentos no MongoDB:', err);
    res.status(500).send('Erro ao buscar documentos');
  }
});

module.exports = router;
