const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbUrl = process.env.CONNECTIONSTRING;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if unable to connect
  }
};

module.exports = connectDB;
