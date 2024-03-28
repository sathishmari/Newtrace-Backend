
const { prototypeMasterRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { Messages } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const prototypeVersionService = require('./prototypeVersionService');
const ecRepository = require('../repository/ecRepository');

baseService = baseService(ecRepository);

const addEcDetails = async (request) => {
    return ecRepository.create(request);
}

const fetchEcDetails = async (request) => {
    return ecRepository.getAll();
}


module.exports = {
    ...baseService,

    addEcDetails,
    fetchEcDetails
}
