import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      // useUnifiedTopology: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  mongoose.connection.db.dropDatabase(function(err, result) {
    // console.log("Database deleted");
  });
    // const collections = mongoose.connection.collections;

    // for (const key in collections) {
    //     const collection = collections[key];
    //     await collection.deleteMany();
    // }
};
