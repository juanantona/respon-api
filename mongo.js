require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

const dbConnection = async () => {
  try {
    const connection = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connection established');
    return connection.db('respon');
  } catch (error) {
    console.error(error);
  }
};

module.exports = dbConnection;
