let { baseController } = require("./genericController");
const { prototypeVersionService } = require("../services");
baseController = baseController(prototypeVersionService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const addVersion = async (request, context) => {
    let { status, body } = await preInvoke(null, 'addVersion', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await prototypeVersionService.addVersion(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const getVersionById = async (request, context) => {
    let { status, body } = await preInvoke(null, 'fetchVersion', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await prototypeVersionService.getVersionById(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};


const updateVersionById = async (request, context) => {
    let { status, body } = await preInvoke(null, 'updateVersion', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await prototypeVersionService.updateVersionById(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};


module.exports = {
    ...baseController,

    addVersion,
    getVersionById,
    updateVersionById
}
