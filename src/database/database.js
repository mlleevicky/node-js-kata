require('dotenv').config();
const { MongoClient } = require('mongodb');

// using useNewUrlParser and useUnifiedTopology options to avoid DeprecationWarning
const dbContext = () => MongoClient.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db(process.env.DATABASE_NAME));

module.exports = dbContext;