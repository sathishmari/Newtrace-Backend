const Joi = require('joi');
const { constant: { containerNames, keyWords } } = require('../constants');

const getSASUrltoAccessSchema = Joi.object({
    fileName: Joi.string().required().regex(/\.(png|jpg|jpeg|svg)$/i).label(keyWords.FILE_NAME),
    container: Joi.string().required().valid(containerNames.ATTACHMENT, containerNames.PROFILE_PIC, containerNames.COMPANY_LOGO, containerNames.JOB_AD_IMAGE, containerNames.PROFILE_DOC).label(keyWords.CONTAINER),
});

module.exports = getSASUrltoAccessSchema;
