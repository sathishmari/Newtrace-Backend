const { preMiddleware: { preInvoke } } = require("../middleware");
const { auth } = require('../middleware');
let { baseController } = require('./genericController');
const { blobService } = require('../services');
const { ERROR } = require('../helper/util');
const { passportService } = require('../services')
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");

baseController = baseController(blobService);

const getSASUrltoPutPdf = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'getSASUrltoPutPdf', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
        try {
            let { currentUser, ...reqBody } = body;
            let result = await blobService.getSASUrltoPutPdf(reqBody);
            return formatResponse(result);
        } catch (error) {
            return formatErrorResponse(error.body, error.status)
        }
}

const getSASUrltoPut = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'getSASUrltoPut', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
        try {
            let { currentUser, ...reqBody } = body;
            let result = await blobService.getSASUrltoPut(reqBody);
            return formatResponse(result);
        } catch (error) {
            return formatErrorResponse(error.body, error.status)
        }
}

const getSASUrltoAccess = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'getSASUrltoAccess', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let { currentUser, ...reqBody } = body;
        let result = await blobService.getSASUrltoAccess(reqBody);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

const getSASUrltoAccessPdf = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'getSASUrltoAccessPdf', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let { currentUser, ...reqBody } = body;
        let result = await blobService.getSASUrltoAccessPdf(reqBody);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

const addAttachment = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'addAttachment', request, context);

    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let { currentUser, ...reqBody } = body;
        let result = await blobService.addAttachment(reqBody);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

const deleteBlobFile = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'deleteBlobFile', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let { currentUser, ...reqBody } = body;
        let result = await blobService.deleteBlobFile(reqBody);

        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

module.exports = {
    ...baseController,

    addAttachment,
    deleteBlobFile,
    getSASUrltoPut,
    getSASUrltoPutPdf, 
    getSASUrltoAccess,
    getSASUrltoAccessPdf
}
