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

const standardTransactionSchema = Joi.object().keys({
  rawTransaction: hexRegex.required(),
});

const feelessTransactionSchema = Joi.object().keys({
  rawTransaction: hexRegex.required(),
  hash: Joi.string().required(),
});

const transactionIdSchema = Joi.object().keys({
  id: Joi.number().positive().required(),
});

const fundSchema = Joi.object().keys({
  from: address.required(),
  to: address.required(),
  value: Joi.number().positive().required(),
  data: hexRegex.optional(),
  type: Joi.string().valid('service', 'privileged'),
});

module.exports = {
  addressSchema,
  checkTransactionSchema,
  standardTransactionSchema,
  feelessTransactionSchema,
  transactionIdSchema,
  fundSchema,
};
