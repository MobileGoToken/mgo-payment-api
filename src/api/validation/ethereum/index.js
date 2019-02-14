
const validate = require('../validator');
const {
  addressSchema,
  checkTransactionSchema,
  standardTransactionsSchema,
  transactionIdSchema,
} = require('./schemas');

const validateAddress = async (body) => {
  return validate(body, addressSchema);
};

const validateCheckTransaction = async (body) => {
  return validate(body, checkTransactionSchema);
};

const validateStandardTransaction = async (body) => {
  return validate(body, standardTransactionsSchema);
};

const validateTransactionId = async (body) => {
  return validate(body, transactionIdSchema);
};

module.exports = {
  validateAddress,
  validateCheckTransaction,
  validateStandardTransaction,
  validateTransactionId,
};
