const Joi = require('joi');


const hexRegex = Joi.string().regex(/^0x[a-zA-Z0-9]*/);

const address = hexRegex.length(42);
const transaction = hexRegex.length(64);


const addressSchema = Joi.object().keys({
  address: address.required(),
});

const checkTransactionSchema = Joi.object().keys({
  transaction: transaction.required(),
});

const standardTransactionsSchema = Joi.object().keys({
  rawTransaction: hexRegex.required(),
});

const transactionIdSchema = Joi.object().keys({
  id: Joi.number().positive().required(),
});

module.exports = {
  addressSchema,
  checkTransactionSchema,
  standardTransactionsSchema,
  transactionIdSchema,
};
