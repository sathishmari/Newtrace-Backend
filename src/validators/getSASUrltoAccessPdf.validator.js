const Joi = require('joi');
const { constant: { containerNames, JoiMessages, keyWords } } = require('../constants');

const getSASUrltoAccessPdfSchema = Joi.object({
    fileName: Joi.string().required().regex(/\.(pdf)$/i).error(new Error(JoiMessages.FILENAME_PDF_ERROR)),
    container: Joi.string().required().valid(containerNames.ATTACHMENT, containerNames.PROFILE_PIC, containerNames.COMPANY_LOGO, containerNames.JOB_AD_IMAGE, containerNames.PROFILE_DOC).label(keyWords.CONTAINER),
});

module.exports = getSASUrltoAccessPdfSchema;
