// MongoDB connection. Change MONGO_URI in .env to use Atlas or any other database.
const mongoose = require('mongoose');
module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set. Copy server/.env.example to server/.env and set the MongoDB connection string.');
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};
