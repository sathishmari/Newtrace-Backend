const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const addEcDetailsSchema = Joi.object({
    application : Joi.string().required().label(keyWords.APPLICATION),
    description : Joi.string().required().label(keyWords.DESCRIPTION),
    electroChemId: Joi.string().required().label(keyWords.ELECTROCHEM_ID),
    electrodePorosity: Joi.string().required().label(keyWords.ELECTRODE_POROSITY),
    electrodeStructure: Joi.string().required().label(keyWords.ELECTRODE_STRUCTURE),
    remarks : Joi.string()
});

module.exports = addEcDetailsSchema;

application
: 
"Cathode"
description
: 
"dessssssssssssssss"
electroChemId
: 
"ec1"
electrodePorosity
: 
"ghjkjh"
electrodeStructure
: 
"Solid"