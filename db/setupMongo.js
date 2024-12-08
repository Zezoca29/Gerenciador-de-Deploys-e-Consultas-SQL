const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGO_URI;

const createCollections = async () => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    console.log('Conectado ao MongoDB.');

    const db = client.db(); // Usa o database configurado na URI

    // Verifica ou cria coleções
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    if (!collectionNames.includes('queries')) {
      await db.createCollection('queries');
      console.log('Coleção "queries" criada no MongoDB.');
    } else {
      console.log('Coleção "queries" já existe no MongoDB.');
    }

    if (!collectionNames.includes('results')) {
      await db.createCollection('results');
      console.log('Coleção "results" criada no MongoDB.');
    } else {
      console.log('Coleção "results" já existe no MongoDB.');
    }
  } catch (error) {
    console.error('Erro ao criar coleções no MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
};

// Exportar função para uso no index.js
module.exports = createCollections;
