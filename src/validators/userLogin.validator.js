const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const userLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required().label(keyWords.EMAIL),
    password: Joi.string().min(6).required().label(keyWords.PASSWORD),
});

module.exports = userLoginSchema;