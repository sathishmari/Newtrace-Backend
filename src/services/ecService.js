
const { prototypeMasterRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { Messages } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const prototypeVersionService = require('./prototypeVersionService');
const ecRepository = require('../repository/ecRepository');

baseService = baseService(ecRepository);

const addEcDetails = async (request) => {
    const { electroChemId } = request;
    const dbElectroChem = await ecRepository.getByObject({ electroChemId });
    if (isEmptyArray(dbElectroChem)) {
        return ecRepository.create({ ...request, createdOn: getCurrentTimestamp() });
    }
    throw formatErrorResponse("ElectroChem Id is already present, Try different Id", 400);
}

const updateEcDetails = async (request) => {
    const { id, electroChemId } = request;
    const ecDetails = await ecRepository.getById(id);
    if (!isEmptyObject(ecDetails)) {
        // const dbElectroChem = await ecRepository.getByObject({ electroChemId });
        // if (isEmptyArray(dbElectroChem)) {
        return await ecRepository.update({ ...ecDetails, modifiedOn: getCurrentTimestamp(), ...request });
        // }
        // throw formatErrorResponse("ElectroChem Id is already present, Try different Id", 400);
    }
    throw formatErrorResponse("Ec Details is not found", 400);
}

const fetchEcDetails = async (request) => {
    return ecRepository.getAll();
}


module.exports = {
    ...baseService,

    addEcDetails,
    fetchEcDetails,
    updateEcDetails
}
