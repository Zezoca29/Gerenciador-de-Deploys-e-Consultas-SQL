const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI; // Certifique-se de que a variável está no .env

if (!uri) {
  throw new Error('MONGO_URI não configurado no .env');
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToMongo = async () => {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB com sucesso!');
    return client.db(); // Retorna o banco de dados para operações
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    throw err;
  }
};

module.exports = connectToMongo;
