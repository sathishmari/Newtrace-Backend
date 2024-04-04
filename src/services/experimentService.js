const { experimentRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { prototypeStatus, keyWords, Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');

baseService = baseService(experimentRepository);

const addExperiment = async (request) => {
    console.log("--------request--------",request)
    try {
        
        // let oldVersion = await experimentRepository.getByVersionName(request.versionName, "ve");
        let defaultVersion = await experimentRepository.create({...request, createdTs:  getCurrentTimestamp(),updatedTs: getCurrentTimestamp()});
        return defaultVersion;

        // if (isEmptyArray(oldVersion)) {
        //     // let defaultVersion = await prototypeVersionRepository.create(data);
        // }
        // else {
        //     return formatErrorResponse(Messages.PROTOTYPE_MASTER.VERSION_ALREADY_EXISTS, ERROR.UNAUTHORIZED);
        // }
    } catch (error) {
        console.log(formatErrorResponse(error));
    }
}


module.exports = {
    ...baseService,

    addExperiment,

}
