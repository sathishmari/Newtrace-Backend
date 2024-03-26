const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const validateOTPSchema = Joi.object({
    email: Joi.string().email().lowercase().required().label(keyWords.EMAIL),
    otp: Joi.number().min(1000).min(9999).required().label(keyWords.OTP),
});

module.exports = validateOTPSchema;
