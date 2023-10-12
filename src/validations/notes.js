const Joi = require("joi");

/**
 * Structure of request body to be validated
 */
module.exports = {
  notesSchema: Joi.object({
    title: Joi.string().required(),
    content: Joi.string(),
  }),
};
