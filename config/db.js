const { Pool } = require('pg');
const mongoose = require('mongoose');

// Configuração do pool de conexões com o PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER,      // Usuário
  host: process.env.POSTGRES_HOST,      // Host do container
  database: process.env.POSTGRES_DB,    // Nome do banco
  password: process.env.POSTGRES_PASSWORD, // Senha
  port: process.env.POSTGRES_PORT,      // Porta
});

module.exports.pool = pool;

// Função para conectar ao MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Finaliza o processo se a conexão falhar
  }
};

module.exports.connectMongoDB = connectMongoDB;
