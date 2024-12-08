const express = require('express');
const router = express.Router();
const connectToMongo = require('../db/mongodb');

let db;
connectToMongo().then(database => db = database);

// Salvar consulta frequente
router.post('/save', async (req, res) => {
  const { name, query } = req.body;
  if (!name || !query) return res.status(400).send('Nome e query são obrigatórios');

  try {
    const result = await db.collection('queries').insertOne({ name, query });
    res.send({ message: 'Consulta salva', id: result.insertedId });
  } catch (err) {
    console.error('Erro ao salvar consulta:', err);
    res.status(500).send('Erro ao salvar consulta');
  }
});

// Salvar resultados
router.post('/results', async (req, res) => {
  const { queryId, results } = req.body;
  if (!queryId || !results) return res.status(400).send('Query ID e resultados são obrigatórios');

  try {
    const result = await db.collection('results').insertOne({ queryId, results });
    res.send({ message: 'Resultados armazenados', id: result.insertedId });
  } catch (err) {
    console.error('Erro ao salvar resultados:', err);
    res.status(500).send('Erro ao salvar resultados');
  }
});

module.exports = router;
