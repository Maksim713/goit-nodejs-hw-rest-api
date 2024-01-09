const Joi = require("joi");
const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const compiledSchema = Joi.compile(schema);

  const func = (req, res, next) => {
    const { error } = compiledSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
