const Joi = require('joi');

const updateProfileSchema = Joi.object({
    id: Joi.string().required(),
    dob: Joi.string().required(),
    code: Joi.number().required(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
    linkedin: Joi.string().optional(),
    facebook: Joi.string().optional(),
});

module.exports = updateProfileSchema;