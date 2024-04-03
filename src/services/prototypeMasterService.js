
const { prototypeMasterRepository, prototypeVersionRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { Messages } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const prototypeVersionService = require('./prototypeVersionService');

baseService = baseService(prototypeMasterRepository);

const addPrototypeMaster = async (request) => {
    let prototypeMaster = await prototypeMasterRepository.getByLcPrototypeName(request.prototypeName);
    console.log("prototypeMaster : ", prototypeMaster);
    if (!isEmptyArray(prototypeMaster)) {
        // return {status : Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS,code  : 401 };
        return formatErrorResponse(Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS, ERROR.UNAUTHORIZED)
        // throw new Error(`${Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS}`, ERROR.UNAUTHORIZED);
        // return formatErrorResponse(Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS ,  ERROR.UNAUTHORIZED);
        // return { status: `${Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS}`, body: request }
    } else {
        const data = {
            prototypeName : request.prototypeName,
            description : request.description,
            lcPrototypeName: await makeLcWithoutSpace(request.prototypeName),
            createdBy: null,
            updatedBy: null,
            remarks: null,
            createdTs: await getCurrentTimestamp(),
            updatedTs: await getCurrentTimestamp(),
        };

        let newUser = await prototypeMasterRepository.create(data);

        const  versionData = {
            prototypeId : request.prototypeName,
            projectedDesignCompletionDate : request.projectedDesignCompletionDate ,
            projectedAssemblyCompletionDate : request.projectedAssemblyCompletionDate,
            ProjectedTestingCompletionDate :request.ProjectedTestingCompletionDate ,
            createdTs: await getCurrentTimestamp(),
            updatedTs: await getCurrentTimestamp(),
        }
        let defaultVersion = await prototypeVersionService.addVersionByDefault(versionData);
        console.log("defaultVersion------------",defaultVersion);
        return newUser
    }
}

const fetchPrototypeDetails = async (request) => {
    let allPrototype = await prototypeMasterRepository.getAll();
    if (!isEmptyArray(allPrototype)) {
        let prototypeDetails = await Promise.all(allPrototype.map(async (prototype) => {
            const versions = await prototypeVersionRepository.getByObject({ prototypeId: prototype.id });
            prototype.versions = versions.length > 1 ? versions.sort((a, b) => b._ts - a._ts) : versions;
            return prototype.length > 1 ? prototype.sort((a, b) => b._ts - a._ts) : prototype;
        }))
        return prototypeDetails;
    } else {
        return [];
    }
}

const updatePrototypeDetails = async (request) => {
    const { id } = request;
    const dbPrototypeDetail = await prototypeMasterRepository.getById(id);
    if (!isEmptyObject(dbPrototypeDetail)) {
        const prototypeDetails = await prototypeMasterRepository.update({ ...dbPrototypeDetail, ...request });
        return prototypeDetails;
    } else {
        throw formatErrorResponse("Prototype is not found");
    }
}

module.exports = {
    ...baseService,

    addPrototypeMaster,
    fetchPrototypeDetails,
    updatePrototypeDetails
}
