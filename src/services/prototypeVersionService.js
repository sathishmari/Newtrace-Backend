const { prototypeVersionRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { prototypeStatus, keyWords, Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');

baseService = baseService(prototypeVersionRepository);

const addVersionByDefault = async (request) => {
    const data = {
        prototypeId: request.id,
        versionName: keyWords.DEFAULT_VERSION,
        versionStatus: prototypeStatus.DESIGN,
        createdTs: await getCurrentTimestamp(),
        updatedTs: await getCurrentTimestamp(),
    };

    let defaultVersion = await prototypeVersionRepository.create(data);
    return defaultVersion;
}

const updateVersionDetails = async (request) => {
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

    addVersionByDefault,
    updateVersionDetails
}
