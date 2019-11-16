const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017';

module.exports = function(app) {
  MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
    .then(connection => {
      const db = connection.db('respon');
      app.brothers = db.collection('brothers');
      console.log('Database connection established');
    })
    .catch(err => console.error(err));
};
