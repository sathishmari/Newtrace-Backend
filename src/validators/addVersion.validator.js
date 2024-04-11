const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const addVersionSchema = Joi.object({
    versionName: Joi.string().required().label(keyWords.VERSION_NAME),
    prototypeId : Joi.string().required(),
    projectedDesignCompletionDate: Joi.string().required().label(keyWords.projectedDesignCompletionDate),
    projectedAssemblyCompletionDate : Joi.string().required().label(keyWords.projectedAssemblyCompletionDate),
    ProjectedTestingCompletionDate: Joi.string().required().label(keyWords.ProjectedTestingCompletionDate),
    remarks : Joi.string()
});

module.exports = addVersionSchema;