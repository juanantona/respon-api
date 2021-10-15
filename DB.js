const { MongoClient, ObjectID } = require('mongodb');
require('dotenv').config();

const DB = async () => {
  if (!DB.instance) {
    try {
      const dbConnection = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connection established');
      DB.instance = dbConnection.db(process.env.DB_NAME);
    } catch (error) {
      console.error(error);
    }
  }

  DB.getMany = async collection => {
    const cursor = await DB.instance.collection(collection).find();
    if ((await cursor.count()) === 0) {
      return [];
    }
    return cursor.toArray();
  };

  DB.getOne = async (collection, id) => {
    const query = { _id: ObjectID(id) };
    return await DB.instance.collection(collection).findOne(query);
  };

  DB.createOne = async (collection, data) => {
    try {
      await DB.instance.collection(collection).insertOne(data);
    } catch (error) {
      console.error(error);
      return 0;
    }
    return 1;
  };

  DB.deleteOne = async (collection, id) => {
    const query = { _id: ObjectID(id) };
    try {
      await DB.instance.collection(collection).deleteOne(query);
    } catch (error) {
      console.error(error);
      return 0;
    }
    return 1;
  };

  DB.updateOne = async (collection, id, data) => {
    const filter = { _id: ObjectID(id) };
    const updateData = { $set: data };
    try {
      await DB.instance.collection(collection).updateOne(filter, updateData);
    } catch (error) {
      console.error(error);
      return 0;
    }
    return 1;
  };

  return DB.instance;
};

module.exports = DB;
