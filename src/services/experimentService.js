const { experimentRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { prototypeStatus, keyWords, Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');

baseService = baseService(experimentRepository);

const addExperiment = async (request) => {
    console.log("--------request--------",request)
    try {
        
        // let oldVersion = await experimentRepository.getByVersionName(request.versionName, "ve");
        const defaultVersion = await experimentRepository.create({...request, createdTs:  getCurrentTimestamp(),updatedTs: getCurrentTimestamp()});
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

const fetchAllExperiments = async (request) =>
{
    try {
        
        const allExperiments = await experimentRepository.getAll();
        return allExperiments;
    } catch (error) {
        console.log(formatErrorResponse(error));
    }
}

const getExperimentById = async (request) =>
{
    const { id } = request;
    let experimentData = await experimentRepository.getById(id);
    if (!isEmptyObject(experimentData)) {
        
        return experimentData;
    } else {
        throw formatErrorResponse("Experiment is not Found!!",401);
    }
}

const updateExperimentById = async (request) => {
    const { id } = request;
    const experimentDetails = await experimentRepository.getById(id);
    if (!isEmptyObject(experimentDetails)) {
        const updateVersion = await experimentRepository.update({ ...experimentDetails, ...request });
        return updateVersion;
    } else {
        throw formatErrorResponse("Version is not Found!!");
    }
}


module.exports = {
    ...baseService,

    addExperiment,
    fetchAllExperiments,
    getExperimentById,
    updateExperimentById
    

}
