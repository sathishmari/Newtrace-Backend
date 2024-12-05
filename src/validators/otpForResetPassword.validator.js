const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const otpValidation = Joi.object({
    email: Joi.string().email().required().label(keyWords.EMAIL) 
});

module.exports = otpValidation;