const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const changePasswordSchema = Joi.object({
    id: Joi.string().uuid().required().label(keyWords.USER_ID),
    oldPassword: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required().label(keyWords.OLD_PASSWORD),
        newPassword: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required().label(keyWords.NEW_PASSWORD),
});

module.exports = changePasswordSchema;
