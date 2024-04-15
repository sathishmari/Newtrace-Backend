const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const updateEcDetailsSchema = Joi.object({
    id: Joi.string().required().label(keyWords.ID),
    application : Joi.string(),
    description : Joi.string(),
    electroChemId: Joi.string(),
    electrodePorosity: Joi.string(),
    electrodeStructure: Joi.string(),
    maxPoreDiameter: Joi.string(),
    electrodeSubstrate: Joi.string(),
    electrodePermeability: Joi.string(),
    electrodeMechanicalParams: Joi.string(),
    electrodeSurfaceArea: Joi.string(),
    temperature: Joi.string(),
    electrodeThickness: Joi.string(),
    composition: Joi.string(),
    pH: Joi.string(),
    solution: Joi.string(),
    solutionBathLife: Joi.string(),
    platingTime : Joi.string(), 
    density : Joi.string(), 
    cellActivity :  Joi.string(), 
    attributes : Joi.array(), 
    remarks : Joi.string()
});

module.exports = updateEcDetailsSchema;