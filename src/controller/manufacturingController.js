let { baseController } = require("./genericController");
const { manufacturingService } = require("../services");
baseController = baseController(manufacturingService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");



module.exports = {
    ...baseController,

}
