const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const userRegisterSchema = Joi.object({
    prototypeName: Joi.string().required().label(keyWords.PROTOTYPE_NAME),
    description : Joi.string().required().label(keyWords.DESCRIPTION),
    projectedDesignCompletionDate: Joi.string().required().label(keyWords.projectedDesignCompletionDate),
    projectedAssemblyCompletionDate : Joi.string().required().label(keyWords.projectedAssemblyCompletionDate),
    ProjectedTestingCompletionDate: Joi.string().required().label(keyWords.ProjectedTestingCompletionDate)

});

module.exports = userRegisterSchema;