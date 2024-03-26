const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const deleteUserSchema = Joi.object({
    id: Joi.string().uuid().required().label(keyWords.USER_ID),
    status: Joi.string().required().valid(false).label(keyWords.USER_STATUS),
});

module.exports = deleteUserSchema;
