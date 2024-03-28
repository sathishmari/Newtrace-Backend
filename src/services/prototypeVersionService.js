const { prototypeVersionRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { prototypeStatus, keyWords, Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');

baseService = baseService(prototypeVersionRepository);

    const addVersion = async (request) => {
    const data = {
        prototypeId: request.id,
        versionName: !!request.versionName ? request.versionName : keyWords.DEFAULT_VERSION,
        versionStatus: prototypeStatus.DESIGN,
        createdTs: await getCurrentTimestamp(),
        updatedTs: await getCurrentTimestamp(),
    };
    console.log("----------------------------------------------------------------------------------------");
    console.log({firsttt:request})
    let defaultVersion = await prototypeVersionRepository.create(data);
    return defaultVersion;
}

const getVersionById = async (request) => {
    console.log("======================",request.id);

    let VersionData = await prototypeVersionRepository.getById(request.id);
    return VersionData;

}

const updateVersionById = async (request) => {

    let defaultVersion = await prototypeVersionRepository.update(request);
    return defaultVersion;
}

module.exports = {
    ...baseService,

    addVersion,
    getVersionById,
    updateVersionById
}
