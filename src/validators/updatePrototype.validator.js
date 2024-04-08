const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const updatePrototypeSchema = Joi.object({
    id: Joi.string().required().label(keyWords.ID),
});

module.exports = updatePrototypeSchema;