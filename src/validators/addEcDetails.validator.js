const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const addEcDetailsSchema = Joi.object({
    ecName: Joi.string().required().label(keyWords.ECDETAIL_NAME),
    remarks : Joi.string()
});

module.exports = addEcDetailsSchema;