const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const updateVersionSchema = Joi.object({
    id: Joi.string().required().label(keyWords.VERSION_ID),
});

module.exports = updateVersionSchema;