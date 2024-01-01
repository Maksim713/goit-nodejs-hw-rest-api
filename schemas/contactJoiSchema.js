const Joi = require("joi");

const contactJoiSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": "Name must be a string",
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string",
    "any.required": "Missing required phone field",
  }),
  favorite: Joi.bool(),
});

module.exports = contactJoiSchema;
