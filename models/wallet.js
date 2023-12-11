const mongoose = require("mongoose");

// Define Wallet schema
const walletSchema = new mongoose.Schema({
  balance: Number,
  name: String,
  date: { type: Date, default: Date.now },
});

// Create a Mongoose model for the 'Wallet' collection
const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
