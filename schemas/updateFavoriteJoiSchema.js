const Joi = require("joi");

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": "Missing field favorite",
    "boolean.base": "Field favorite must be a boolean",
  }),
});

module.exports = updateFavoriteJoiSchema;
