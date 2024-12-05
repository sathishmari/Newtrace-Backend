const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const userRegisterSchema = Joi.object({
    first_name: Joi.string().required().label(keyWords.FIRST_NAME),
    last_name: Joi.string().required().label(keyWords.LAST_NAME),
    email: Joi.string().email().lowercase().required().label(keyWords.EMAIL),
    password: Joi.string().min(6).required().label(keyWords.PASSWORD),
});

module.exports = userRegisterSchema;