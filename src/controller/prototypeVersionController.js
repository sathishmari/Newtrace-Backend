let { baseController } = require("./genericController");
const { prototypeVersionService } = require("../services");
baseController = baseController(prototypeVersionService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const addVersionByDefault = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await prototypeVersionService.addVersionByDefault(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const updateVersionDetails = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await prototypeVersionService.updateVersionDetails(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};



module.exports = {
    ...baseController,

    addVersionByDefault,
    updateVersionDetails
}
