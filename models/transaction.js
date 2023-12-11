// // Wherever you need to use the Transaction model
// const Transaction = require("../models/transaction");

// // // Now you can use the Transaction model to perform CRUD operations on the "Transaction" collection.
// // // For example:
// // const newTransaction = new Transaction({
// //   walletId: "some_wallet_id", // Replace with a valid wallet ID
// //   amount: 20,
// //   balance: 100,
// //   description: "Purchase",
// //   type: "DEBIT",
// // });

// // Save the new transaction to the database
// newTransaction
//   .save()
//   .then((savedTransaction) => {
//     console.log("Transaction saved:", savedTransaction);
//   })
//   .catch((error) => {
//     console.error("Error saving transaction:", error);
//   });

// // You can perform other operations such as find, update, delete using the Transaction model.
// models/Transaction.js
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
