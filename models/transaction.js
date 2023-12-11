const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  walletId: mongoose.Types.ObjectId,
  amount: Number,
  balance: Number,
  description: String,
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["CREDIT", "DEBIT"] },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
