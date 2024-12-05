
let { baseService } = require("./genericService");
const { constant: { Messages } } = require('../constants');
const { util: { isEmptyArray, makeLcWithoutSpace, getCurrentTimestamp, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const { manufacturingRepository } = require("../repository");

baseService = baseService(manufacturingRepository);

const addManufacturingDetails = async (request) => {
    const { versionId, componentName } = request;
    const manufactureData = await manufacturingRepository.getManufacturingDetailsByVersionId(versionId, componentName);
    if (isEmptyArray(manufactureData)) {
        return await manufacturingRepository.create({ ...request, createdOn: getCurrentTimestamp(), modifiedOn: getCurrentTimestamp() });
    }
    throw formatErrorResponse("Component Name is already Exists, Try different name", 401);
}

const fetchManufacturingDetailsByVersionId = async (request) => {
    const { versionId } = request;
    const manufacturingDetails = await manufacturingRepository.getByObject({ versionId: versionId });
    if (!isEmptyArray(manufacturingDetails)) {
        return manufacturingDetails.length > 1 ? manufacturingDetails.sort((a, b) => b._ts - a._ts) : manufacturingDetails;
    } else {
        return [];
    }
}

const fetchComponentDetailById = async (request) => {
    const { id } = request;
    const componentDetails = await manufacturingRepository.getById(id);
    if (!isEmptyObject(componentDetails)) {
        return componentDetails;
    }
    throw formatErrorResponse("there is no component details", 404)
}

const updateManufacturingDetails = async (request) => {
    const { id, componentName } = request;
    const isUniquesName = await manufacturingRepository.getByObject({ componentName });
    const manufactureData = isUniquesName ? isUniquesName.filter((detail) => detail.id != id) : isUniquesName;
    if (isEmptyArray(manufactureData)) {
        const manufactureDetails = await manufacturingRepository.getById(id);
        if (!isEmptyObject(manufactureDetails)) {
            return await manufacturingRepository.update({ ...manufactureDetails, ...request, modifiedOn: getCurrentTimestamp() });
        }
        throw formatErrorResponse("Manufacturing component is not found!", 401)
    }
    throw formatErrorResponse("component name is already exists, Try different name!", 401)

}


module.exports = {
    ...baseService,

    addManufacturingDetails,
    fetchManufacturingDetailsByVersionId,
    fetchComponentDetailById,
    updateManufacturingDetails
}
