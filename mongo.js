const Mongo = require('mongodb');
require('dotenv').config();

const Brother = require('./Brothers');

class MongoConnection {
  constructor() {
    this.client = Mongo.MongoClient;
  }

  async init() {
    try {
      this.connecttion = await this.client.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connection established');
    } catch (error) {
      console.error(error);
    }
    this.db = this.connecttion.db('respon');
    this.Brothers = new Brother(this.db);
  }
}

module.exports = new MongoConnection();
