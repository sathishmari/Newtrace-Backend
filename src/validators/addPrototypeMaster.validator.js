const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const userRegisterSchema = Joi.object({
    prototypeName: Joi.string().required().label(keyWords.PROTOTYPE_NAME),
});

module.exports = userRegisterSchema;