const Joi = require("joi");

const userSchemaValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number(),
});

module.exports = userSchemaValidator;
