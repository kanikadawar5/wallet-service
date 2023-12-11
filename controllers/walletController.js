const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");
const { WALLET_ACTIONS, WALLET_TRANSACTION_TYPES } = require("../constants");
const walletService = require("../services/walletService");

const setupWallet = async (req, res) => {
  try {
    const { balance, name } = req.body;
    const savedWallet = await walletService.createWallet({ balance, name });

    await walletService.createTransaction({
      walletId: savedWallet._id,
      amount: balance,
      description: WALLET_ACTIONS.SETUP,
      type: WALLET_TRANSACTION_TYPES.CREDIT,
    });

    res.status(200).json({
      id: savedWallet._id,
      balance: savedWallet.balance,
      name: savedWallet.name,
      date: savedWallet.date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const transactAmount = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;

    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).send("Wallet not found");
    }

    const transactionType =
      amount >= 0 ? WALLET_TRANSACTION_TYPES.CREDIT : WALLET_TRANSACTION_TYPES.DEBIT;
    const transaction = new Transaction({
      walletId: wallet._id,
      amount: Math.abs(amount),
      balance:
        transactionType === WALLET_TRANSACTION_TYPES.CREDIT
          ? wallet.balance + amount
          : wallet.balance - amount,
      description,
      type: transactionType,
    });

    await transaction.save();

    wallet.balance = transaction.balance;
    await wallet.save();

    res.status(200).json({
      balance: wallet.balance,
      transactionId: transaction._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getTransactions = async (req, res) => {
  try {
    const { walletId, skip = 0, limit = 10 } = req.query;
    const transactions = await walletService.getTransactionsByWalletId(walletId, skip, limit);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getWalletDetails = async (req, res) => {
  try {
    const wallet = await walletService.getWalletById(req.params.id);
    if (!wallet) {
      return res.status(404).send("Wallet not found");
    }

    res.status(200).json({
      id: wallet._id,
      balance: wallet.balance,
      name: wallet.name,
      date: wallet.date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  setupWallet,
  transactAmount,
  getTransactions,
  getWalletDetails,
};
