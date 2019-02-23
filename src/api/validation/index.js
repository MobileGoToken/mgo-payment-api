
const validate = require('./validator');
const {
  addressSchema,
  checkTransactionSchema,
  standardTransactionSchema,
  feelessTransactionSchema,
  transactionIdSchema,
  fundSchema,
} = require('./schemas');

const validateAddress = async (body) => {
  return validate(body, addressSchema);
};

const validateCheckTransaction = async (body) => {
  return validate(body, checkTransactionSchema);
};

const validateStandardTransaction = async (body) => {
  return validate(body, standardTransactionSchema);
};

const validateFeelessTransaction = async (body) => {
  return validate(body, feelessTransactionSchema);
};

const validateTransactionId = async (body) => {
  return validate(body, transactionIdSchema);
};

const validateFundRegister = async (body) => {
  return validate(body, fundSchema);
};

module.exports = {
  validateAddress,
  validateCheckTransaction,
  validateStandardTransaction,
  validateFeelessTransaction,
  validateTransactionId,
  validateFundRegister,
};
