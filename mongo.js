require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = function(app) {
  MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(connection => {
      const db = connection.db('respon');
      app.brothers = db.collection('brothers');
      console.log('Database connection established');
    })
    .catch(err => console.error(err));
};
