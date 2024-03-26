const Joi = require('joi');

const userDeleteSchema = Joi.object({
    active:Joi.boolean().required()

});


module.exports = userDeleteSchema;