let { baseController } = require("./genericController");
const { prototypeMasterService, ecService } = require("../services");
baseController = baseController(prototypeMasterService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const addEcDetails = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await ecService.addEcDetails(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const fetchEcDetails = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await ecService.fetchEcDetails(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const updateEcDetails = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await ecService.updateEcDetails(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};


module.exports = {
    ...baseController,

    addEcDetails,
    fetchEcDetails,
    updateEcDetails
}
