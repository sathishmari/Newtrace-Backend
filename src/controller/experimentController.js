let { baseController } = require("./genericController");
const { experimentService } = require("../services");
baseController = baseController(experimentService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const addExperiment = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await experimentService.addExperiment(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const fetchAllExperiments = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await experimentService.fetchAllExperiments(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
}

const getExperimentById = async (request, context) => {
    let { status, body } = await preInvoke(null, null , request, context);

    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await experimentService.getExperimentById(body);
        console.log("-------------------------------------");
        console.log(result);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
}


const updateExperimentById = async (request, context) => {
    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await experimentService.updateExperimentById(body);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
};



module.exports = {
    ...baseController,

    addExperiment,
    fetchAllExperiments,
    getExperimentById,
    updateExperimentById
}
