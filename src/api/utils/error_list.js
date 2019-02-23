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
  }, {
    name: 'AuthorizationError',
    message: 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    errorCode: 1002,
  },

  // Transaction Errors
  {
    name: 'TransactionExistsError',
    message: 'Sent transaction already exists on blockchain',
    status: httpStatus.CONFLICT,
    errorCode: 3000,
  }, {
    name: 'InvalidContractAddressError',
    message: 'Invalid Contract Address',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3001,
  }, {
    name: 'MissingTransactionDataError',
    message: 'Missing Token Transfer Data',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3002,
  }, {
    name: 'InvalidTransactionError',
    message: 'Transaction Not Valid',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3003,
  }, {
    name: 'InvalidTxValueError',
    message: 'Invalid transaction value. Shoud be at least to cover sent value and transaction fee',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3004,
  }, {
    name: 'InsufficientFundsError',
    message: 'Insufficient Funds',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3005,
  }, {
    name: 'InvalidReceiverAddressError',
    message: 'Tokens shoud be sent to given address',
    status: httpStatus.BAD_REQUEST,
    errorCode: 3006,
  }, {
    name: 'FundNotExistError',
    message: 'Service transaction should be registered before sending',
    status: httpStatus.NOT_FOUND,
    errorCode: 3007,
  }, {
    name: 'GasPriceLowError',
    message: 'Gas Price too low or transaction with the same nonce already exists',
    status: httpStatus.BAD_REQUEST,
    errorCode: 32010,
  },
];
