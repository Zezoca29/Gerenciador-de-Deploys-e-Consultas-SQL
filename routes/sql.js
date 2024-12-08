const express = require('express');
const router = express.Router();
const pool = require('../db/postgres');

// Testar conexão com PostgreSQL
router.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows);
  } catch (err) {
    console.error('Erro ao testar conexão SQL:', err);
    res.status(500).send('Erro no banco de dados');
  }
});

// Executar consulta SQL
router.post('/query', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).send('Query não fornecida');

  try {
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (err) {
    console.error('Erro ao executar consulta SQL:', err);
    res.status(500).send('Erro ao executar consulta');
  }
});

module.exports = router;
