const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  verificationToken: Joi.string().allow(null).optional(),
});

module.exports = {
  emailSchema,
};
