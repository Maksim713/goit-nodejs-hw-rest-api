const Joi = require("joi");

const updateFavoriteJoiSchema = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const updateFavoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required().messages({
      "any.required": "Missing field favorite",
      "boolean.base": "Field favorite must be a boolean",
    }),
  });
  const validationFavoriteResult = updateFavoriteJoiSchema.validate(req.body);
  if (validationFavoriteResult.error) {
    res.status(400).json({
      message: validationFavoriteResult.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = updateFavoriteJoiSchema;
