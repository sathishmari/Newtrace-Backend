const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const userRegisterSchema = Joi.object({
    prototypeName: Joi.string().required().label(keyWords.PROTOTYPE_NAME),
    description: Joi.string().required().label(keyWords.DESCRIPTION),
});

module.exports = userRegisterSchema;