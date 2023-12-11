const Joi = require("joi");

const validateSetupWalletRequest = (req, res, next) => {
  const schema = Joi.object({
    balance: Joi.number().required(),
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const transactionRequest = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const getWalletByIdRequest = (req, res, next) => {
  const schema = Joi.object({
    walletId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const getTransactions = (req, res, next) => {
  const schema = Joi.object({
    walletId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = {
  validateSetupWalletRequest,
  transactionRequest,
  getWalletByIdRequest,
  getTransactions,
};
