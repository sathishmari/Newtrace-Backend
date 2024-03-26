const Joi = require('joi');
const { constant: { containerNames, JoiMessages } } = require('../constants');
const { keyWords } = require('../constants/constant');

const getSASUrltoPutPdfSchema = Joi.object({
    fileName: Joi.string().required().regex(/\.(pdf)$/i).label(keyWords.FILE_NAME),
    container: Joi.string().required().valid(containerNames.ATTACHMENT, containerNames.PROFILE_PIC, containerNames.COMPANY_LOGO, containerNames.JOB_AD_IMAGE, containerNames.PROFILE_DOC).label(keyWords.CONTAINER),
})

module.exports = getSASUrltoPutPdfSchema;
