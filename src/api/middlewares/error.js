const httpStatus = require('http-status');

const {
  ExtendableError,
  InternalError,
  NotFoundError,
  ValidationError,
} = require('../utils/errors');
const { nodeEnv } = require('../../config');

const normalizer = (err, req, res, next) => {
  if (!(err instanceof ExtendableError)) {
    console.log(err);
    return handler(new InternalError('Internal server Error', httpStatus.INTERNAL_SERVER_ERROR, err.stack), req, res);
  }
  return handler(err, req, res);
};

const notFound = (req, res, next) => {
  return handler(new NotFoundError('Not Found', httpStatus.NOT_FOUND), req, res);
};

const handler = (err, req, res, next) => {
  const resp = {
    statusCode: err.status,
    errorCode: err.errorCode,
    message: err.message || httpStatus[err.status],
    stack: err.stack,
  };

  if (err instanceof ValidationError) {
    delete resp.message;
    resp.errors = err.mapped();
  }

  if (nodeEnv !== 'development') {
    delete resp.stack;
  }

  res.status(err.status).json(resp);
};

module.exports = {
  normalizer,
  notFound,
  handler,
};
