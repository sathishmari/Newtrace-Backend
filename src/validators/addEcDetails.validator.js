const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const addEcDetailsSchema = Joi.object({
    name: Joi.string().required().label(keyWords.EcDetail_NAME),
});

module.exports = addEcDetailsSchema;