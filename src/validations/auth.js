const Joi = require("joi");

/**
 * Structure of request body to be validated
 */
module.exports = {
  signinSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  }),

  signupSchema: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    tenant_id: Joi.number(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().alphanum(),
  }),

  reqResetPasswordSchema: Joi.object({
    email: Joi.string().email().required(),
  }),

  resetPasswordSchema: Joi.object({
    password: Joi.string().min(8).max(30).required(),
    confirmPassword: Joi.string().min(8).max(30).required(),
    token: Joi.string().required(),
  }),
};
