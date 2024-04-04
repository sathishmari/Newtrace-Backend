const { prototypeVersionRepository, prototypeMasterRepository } = require('../repository');
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
    console.log("----------------",request)
    try {
        // const data = {
        //     prototypeId: request.prototypeId,
        //     versionName: !!request.versionName ? request.versionName : keyWords.DEFAULT_VERSION,
        //     versionStatus: prototypeStatus.DESIGN,
        //     createdTs: await getCurrentTimestamp(),
        //     updatedTs: await getCurrentTimestamp(),
        // };
        let oldVersion = await prototypeVersionRepository.getByVersionName(request.versionName, "ve");

        if (isEmptyArray(oldVersion)) {
            // let defaultVersion = await prototypeVersionRepository.create(data);
            let defaultVersion = await prototypeVersionRepository.create({...request,  prototypeId : "ve", createdTs:  getCurrentTimestamp(),updatedTs: getCurrentTimestamp(),});
            return defaultVersion;
        }
        else {
        // return { status: `${Messages.PROTOTYPE_MASTER.PROTOTYPE_ALREADY_EXISTS}`, body: request }
            return formatErrorResponse(Messages.PROTOTYPE_MASTER.VERSION_ALREADY_EXISTS, ERROR.UNAUTHORIZED);
        }
    } catch (error) {
        console.log(formatErrorResponse(error));
    }
}

const getVersionById = async (request) => {
    const { id } = request;
    let versionData = await prototypeVersionRepository.getById(id);
    if (!isEmptyObject(versionData)) {
        const prototypeDetails = await prototypeMasterRepository.getById(versionData.prototypeId);
        return {
            prototypeName: prototypeDetails.prototypeName,
            prototypeDescription: prototypeDetails.description ? prototypeDetails.description : '',
            prototypeRemarks: prototypeDetails.remarks,
            ...versionData
        };
    } else {
        throw formatErrorResponse("Version is not Found!!");
    }
}

const updateVersionById = async (request) => {
    const { id } = request;
    console.log(request)
    const versionDetails = await prototypeVersionRepository.getById(id);
    console.log("versionDetails : ", versionDetails);
    if (!isEmptyObject(versionDetails)) {
        const updateVersion = await prototypeVersionRepository.update({ ...versionDetails, ...request });
        return updateVersion;
    } else {
        throw formatErrorResponse("Version is not Found!!");
    }
}

module.exports = {
    ...baseService,

    addVersion,
    addVersionByDefault,
    getVersionById,
    updateVersionById
}
