
let { baseService } = require("./genericService");
const { constant: { Messages } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const { manufacturingRepository } = require("../repository");

baseService = baseService(manufacturingRepository);


module.exports = {
    ...baseService,


}
