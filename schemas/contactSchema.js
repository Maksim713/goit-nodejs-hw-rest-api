const Joi = require("joi");

const addJoiSchema = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const schema = Joi.object({
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

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = addJoiSchema;
