const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");

const createWallet = async ({ balance, name }) => {
  const wallet = new Wallet({ balance, name });
  return await wallet.save();
};

const createTransaction = async ({ walletId, amount, description, type }) => {
  const transaction = new Transaction({
    walletId,
    amount,
    balance: amount,
    description,
    type,
  });
  return await transaction.save();
};

const getTransactionsByWalletId = async (walletId, skip, limit) => {
  return await Transaction.find({ walletId })
    .sort({ date: -1 })
    .skip(Number(skip))
    .limit(Number(limit));
};

const getWalletById = async (walletId) => {
  return await Wallet.findById(walletId);
};

module.exports = {
  createWallet,
  createTransaction,
  getTransactionsByWalletId,
  getWalletById,
};
