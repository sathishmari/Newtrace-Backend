let { baseController } = require("./genericController");
const { prototypeMasterService } = require("../services");
baseController = baseController(prototypeMasterService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const addPrototypeMaster = async (request, context) => {
    let { status, body } = await preInvoke(null, 'addPrototypeMaster', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await prototypeMasterService.addPrototypeMaster(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

module.exports = {
    ...baseController,
    
    addPrototypeMaster
}
