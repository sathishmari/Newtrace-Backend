
const { prototypeMasterRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { Messages } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const prototypeVersionService = require('./prototypeVersionService');

baseService = baseService(prototypeMasterRepository);

const addPrototypeMaster = async (request) => {
    let prototypeMaster = await prototypeMasterRepository.getByLcPrototypeName(request.prototypeName);
    console.log("prototypeMaster : ", prototypeMaster);
    if (!isEmptyArray(prototypeMaster)) {
        throw new Error(`${Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS}`);
    } else {
        const data = {
            ...request,
            lcPrototypeName: await makeLcWithoutSpace(request.prototypeName),
            createdBy: null,
            updatedBy: null,
            remarks: null,
            createdTs: await getCurrentTimestamp(),
            updatedTs: await getCurrentTimestamp(),
        };

        let newUser = await prototypeMasterRepository.create(data);
        let defaultVersion = await prototypeVersionService.addVersionByDefault(newUser);
        return newUser
    }
}

module.exports = {
    ...baseService,

    addPrototypeMaster
}
