const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().required().label(keyWords.EMAIL),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required().label(keyWords.PASSWORD)
});

module.exports = resetPasswordSchema;
