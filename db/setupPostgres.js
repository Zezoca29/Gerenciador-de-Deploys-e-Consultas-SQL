const { Pool } = require('pg');

// Configurar pool do PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Verificar e criar tabelas
const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS queries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      query TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS results (
      id SERIAL PRIMARY KEY,
      query_id INT REFERENCES queries(id),
      result JSONB NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Tabelas do PostgreSQL verificadas/criadas.');
  } catch (error) {
    console.error('Erro ao criar tabelas no PostgreSQL:', error);
    throw error;
  }
};

// Exportar função para uso no index.js
module.exports = createTables;
