// exports.wallet = async((req, res) => {
//   /*
//  #swagger.tags = ['Wallet']
//  #swagger.summary = 'This is the wallet API.'
//  #swagger.description = 'This API response tells us service is up or down.'
//  #swagger.consumes = ['application/json']
//  #swagger.produces = ['application/json']
//  #swagger.responses[200] = {
//   description: 'Service is',
//   schema: { $ref: '#/definitions/walletResponse' }
//  }
//  #swagger.responses[500] = {
//   description: 'Server Issue',
//   schema: { $ref: '#/definitions/errorResponse.500' }
//  }
//  #swagger.responses[404] = {
//   description: 'Not found',
//   schema: { $ref: '#/definitions/errorResponse.404' }
//  }
//   */
// });

const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");

const setupWallet = async (req, res) => {
  try {
    const { balance, name } = req.body;
    const wallet = new Wallet({ balance, name });
    const savedWallet = await wallet.save();

    const transaction = new Transaction({
      walletId: savedWallet._id,
      amount: balance,
      balance: balance,
      description: "Setup",
      type: "CREDIT",
    });
    await transaction.save();

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

    const transactionType = amount >= 0 ? "CREDIT" : "DEBIT";
    const transaction = new Transaction({
      walletId: wallet._id,
      amount: Math.abs(amount),
      balance: transactionType === "CREDIT" ? wallet.balance + amount : wallet.balance - amount,
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

    const transactions = await Transaction.find({ walletId })
      .sort({ date: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getWalletDetails = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);
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
