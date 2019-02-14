const httpStatus = require('http-status');

module.exports = [
  // General Errors
  {
    name: 'InternalServerError',
    message: httpStatus['500_MESSAGE'],
    status: httpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 1000,
  }, {
    name: 'NotFoundError',
    message: httpStatus['404_MESSAGE'],
    status: httpStatus.NOT_FOUND,
    errorCode: 1001,
  },

  // Transaction Errors
  {
    name: 'TransactionExistsError',
    message: 'Sent transaction already exists on blockchain',
    status: httpStatus.CONFLICT,
    errorCode: 3000,
  }, {
    name: 'InvalidContractAddressError',
    message: 'Sent transaction already exists on blockchain',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3001,
  }, {
    name: 'MissingTransactionDataError',
    message: 'Sent transaction already exists on blockchain',
    status: 409,
    errorCode: 3001,
  }, {
    name: 'InvalidTransactionError',
    message: 'Sent transaction already exists on blockchain',
    status: 409,
    errorCode: 3001,
  }, {
    name: 'GasPriceLowError',
    message: 'Gas Price too low or transaction with the same nonce already exists',
    status: 400,
    errorCode: 32010,
  },
];
