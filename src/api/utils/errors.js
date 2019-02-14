const httpStatus = require('http-status');
const errorGroup = require('./error_group');

class ExtendableError extends Error {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, stack, errorCode = 1000) {
    super({ stack });
    this.message = message;
    this.status = status;
    this.stack = stack;
    this.errorCode = errorCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends ExtendableError {
  constructor(message, status, stack, errors) {
    super({ message, stack });
    this.errorCode = 2000;
    this.status = status;
    this.errors = errors;
  }

  mapped() {
    return this.errors.map((err) => {
      return {
        message: err.message,
        type: err.type,
        field: err.context.key,
        given: err.context.value,
      };
    });
  }
}


const errorClasses = {
  ExtendableError,
  ValidationError,
};

errorGroup.forEach((err) => {
  class CustomError extends ExtendableError {
    constructor(
      message = err.message,
      status = err.status,
      errorCode = err.errorCode,
    ) {
      super();
      this.message = message;
      this.name = err.name;
      this.status = status;
      this.errorCode = errorCode;
    }
  }

  errorClasses[err.name] = CustomError;
});

module.exports = errorClasses;
