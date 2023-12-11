const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbUrl = process.env.DB_CONNECTION_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
