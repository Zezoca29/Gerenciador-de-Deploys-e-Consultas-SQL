require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Configurar middlewares
app.use(express.json());

// Importar rotas
const sqlRoutes = require('./routes/sql');
const nosqlRoutes = require('./routes/nosql');
const queriesRoutes = require('./routes/queries');

// Verificar e criar estrutura do banco
const checkAndSetupDatabases = async () => {
  const setupPostgres = require('./db/setupPostgres');
  const setupMongo = require('./db/setupMongo');
  try {
    console.log('Verificando estrutura do PostgreSQL...');
    await setupPostgres(); // Função para verificar/criar tabelas no PostgreSQL

    console.log('Verificando estrutura do MongoDB...');
    await setupMongo(); // Função para verificar/criar coleções no MongoDB

    console.log('Estrutura do banco verificada e pronta!');
  } catch (error) {
    console.error('Erro ao configurar bancos de dados:', error);
    process.exit(1); // Finaliza o processo em caso de erro
  }
};

// Verificar bancos antes de iniciar o servidor
checkAndSetupDatabases().then(() => {
  // Usar rotas
  app.use('/sql', sqlRoutes);
  app.use('/nosql', nosqlRoutes);
  app.use('/queries', queriesRoutes);

  // Iniciar servidor
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
