const Joi = require("joi");

const addSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({
      message: `Missing required ${validationResult.error.details[0].context.key} field`,
    });
  } else {
    next();
  }
};

module.exports = {
  addSchema,
};
