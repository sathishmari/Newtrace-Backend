const Joi = require('joi');
const { keyWords } = require('../constants/constant');

const fetchUserBySchema = Joi.object({
    userId: Joi.string().required().label(keyWords.USER_ID)
});

module.exports = fetchUserBySchema;