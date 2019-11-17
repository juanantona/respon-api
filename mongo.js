const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017';

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
