const { prototypeVersionRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { prototypeStatus, keyWords, Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');

baseService = baseService(prototypeVersionRepository);

const addVersionByDefault = async (request) => {
    try {
        const data = {
            prototypeId: request.prototypeId,
            versionName: keyWords.DEFAULT_VERSION,
            versionStatus: prototypeStatus.DESIGN,
            createdTs: await getCurrentTimestamp(),
            updatedTs: await getCurrentTimestamp(),
        };

        let defaultVersion = await prototypeVersionRepository.create(data);
        return defaultVersion;
    } catch (error) {
        console.log(formatErrorResponse(error));
    }
}

const addVersion = async (request) => {
    try {
        const data = {
            prototypeId: request.prototypeId,
            versionName: !!request.versionName ? request.versionName : keyWords.DEFAULT_VERSION,
            versionStatus: prototypeStatus.DESIGN,
            createdTs: await getCurrentTimestamp(),
            updatedTs: await getCurrentTimestamp(),
        };
        let oldVersion = await prototypeVersionRepository.getByVersionName(request.versionName, request.prototypeId);

        if (isEmptyArray(oldVersion)) {
            let defaultVersion = await prototypeVersionRepository.create(data);
            return defaultVersion;
        }
        else {
            return formatErrorResponse("VersionName already exist", 500);
        }
    } catch (error) {
        console.log(formatErrorResponse(error));
    }
}

const getVersionById = async (request) => {
    let VersionData = await prototypeVersionRepository.getById(request.id);
    return VersionData;
}

const updateVersionById = async (request) => {
    const { id, ...value } = request;
    const versionDetails = await prototypeVersionRepository.getById(id);
    if (!isEmptyObject(versionDetails)) {
        const updateVersion = await prototypeVersionRepository.update({ id: id, ...value });
        return updateVersion;
    } else {
        throw formatErrorResponse("Data was not Found!!");
    }
}

module.exports = {
    ...baseService,

    addVersion,
    addVersionByDefault,
    getVersionById,
    updateVersionById
}
