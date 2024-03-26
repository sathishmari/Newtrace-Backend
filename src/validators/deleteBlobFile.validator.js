const Joi = require('joi');
const { keyWords, containerNames } = require('../constants/constant');

const deleteBlobFileSchema = Joi.object({

    Key: Joi.string().required().regex(/\.(png|jpg|jpeg|svg|pdf)$/i).label(keyWords.KEY),
    container: Joi.string().required().valid(containerNames.ATTACHMENT, containerNames.PROFILE_PIC, containerNames.COMPANY_LOGO, containerNames.JOB_AD_IMAGE, containerNames.PROFILE_DOC).label(keyWords.CONTAINER),
});

module.exports = deleteBlobFileSchema;
