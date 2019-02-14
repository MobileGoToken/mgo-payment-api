
const Joi = require('joi');
const { BAD_REQUEST } = require('http-status');
const { ValidationError } = require('../utils/errors');

module.exports = async (body, validationSchema) => {
  return Joi.validate(body, validationSchema, { abortEarly: false })
    .catch((err) => {
      throw new ValidationError(err.message, BAD_REQUEST, err.stack, err.details);
    });
};
