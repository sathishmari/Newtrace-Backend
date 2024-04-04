const { prototypeVersionRepository, prototypeMasterRepository, manufacturingRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { prototypeStatus, keyWords, Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');

baseService = baseService(prototypeVersionRepository);

const addVersionByDefault = async (request) => {
    try {
        let defaultVersion = await prototypeVersionRepository.create({ ...request, versionName: keyWords.DEFAULT_VERSION, versionStatus: prototypeStatus.DESIGN, });
        return defaultVersion;
    } catch (error) {
        console.log(formatErrorResponse(error));
    }
}

const addVersion = async (request) => {
    let oldVersion = await prototypeVersionRepository.getByVersionName(request.versionName);
    if (isEmptyArray(oldVersion)) {
        let defaultVersion = await prototypeVersionRepository.create({ ...request, prototypeId: request.prototypeId, createdTs: getCurrentTimestamp(), updatedTs: getCurrentTimestamp(), });
        return defaultVersion;
    }
    throw formatErrorResponse(Messages.PROTOTYPE_MASTER.VERSION_ALREADY_EXISTS, ERROR.UNAUTHORIZED);
}

const getVersionById = async (request) => {
    const { id } = request;
    let versionData = await prototypeVersionRepository.getById(id);
    if (!isEmptyObject(versionData)) {
        const prototypeDetails = await prototypeMasterRepository.getById(versionData?.prototypeId);
        return {
            prototypeName: prototypeDetails?.prototypeName,
            prototypeDescription: prototypeDetails?.description ? prototypeDetails?.description : '',
            prototypeRemarks: prototypeDetails?.remarks ? prototypeDetails?.remarks : '',
            ...versionData
        };
    }
    throw formatErrorResponse("Version is not Found!!", 400);
}

const fetchVersionDetails = async (request) => {
    const { id } = request;
    let versionData = await prototypeVersionRepository.getById(id);
    if (!isEmptyObject(versionData)) {
        const prototypeDetails = await prototypeMasterRepository.getById(versionData?.prototypeId);
        const versionDetails = {
            prototypeName: prototypeDetails?.prototypeName,
            prototypeDescription: prototypeDetails?.description ? prototypeDetails?.description : '',
            prototypeRemarks: prototypeDetails?.remarks ? prototypeDetails?.remarks : '',
            ...versionData
        };
        let manufactureData = await manufacturingRepository.getByObject({ versionId: id });
        let manufactureDetails = manufactureData.sort((a, b) => b._ts - a._ts);
        return { versionDetails, manufactureDetails };
    }
    throw formatErrorResponse("Version is not Found!!", 400);
}

const updateVersionById = async (request) => {
    const { id } = request;
    console.log(request)
    const versionDetails = await prototypeVersionRepository.getById(id);
    console.log("versionDetails : ", versionDetails);
    if (!isEmptyObject(versionDetails)) {
        const updateVersion = await prototypeVersionRepository.update({ ...versionDetails, ...request });
        const prototypeDetails = await prototypeMasterRepository.getById(updateVersion?.prototypeId);
        return {
            prototypeName: prototypeDetails?.prototypeName,
            prototypeDescription: prototypeDetails?.description ? prototypeDetails?.description : '',
            prototypeRemarks: prototypeDetails?.remarks ? prototypeDetails?.remarks : '',
            ...updateVersion
        };
    } else {
        throw formatErrorResponse("Version is not Found!!");
    }
}

module.exports = {
    ...baseService,

    addVersion,
    addVersionByDefault,
    getVersionById,
    updateVersionById,
    fetchVersionDetails
}
