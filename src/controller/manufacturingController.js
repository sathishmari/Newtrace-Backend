let { baseController } = require("./genericController");
const { manufacturingService } = require("../services");
baseController = baseController(manufacturingService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const fetchManufacturingDetailsByVersionId = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await manufacturingService.fetchManufacturingDetailsByVersionId(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
}

const fetchComponentDetailById = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await manufacturingService.fetchComponentDetailById(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
}

const addManufacturingDetails = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await manufacturingService.addManufacturingDetails(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
}

const updateManufacturingDetails = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await manufacturingService.updateManufacturingDetails(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
}

module.exports = {
    ...baseController,

    fetchManufacturingDetailsByVersionId,
    fetchComponentDetailById,
    addManufacturingDetails,
    updateManufacturingDetails
}
