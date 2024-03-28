const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const addVersionSchema = Joi.object({
    versionName: Joi.string().required().label(keyWords.VERSION_NAME),
});

module.exports = addVersionSchema;