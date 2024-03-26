const { util } = require("../../helper");
const { ERROR } = require("../../helper/util");
const { preMiddleware: { preInvoke } } = require("../../middleware");

const baseController = (service) => {

    const create = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }

        try {
            let { currentUser, ...reqBody } = body;
            let result = await service.create(reqBody);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }
    };

    const createMany = async (request, context) => {

        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let { currentUser, ...reqBody } = body;
            let result = await service.createMany(reqBody);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }
    };

    const deleteById = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.deleteById(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const deleteByIds = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.deleteByIds(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const deleteAll = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.deleteAll(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const getAll = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.getAll();
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const getById = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.getById(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const getByIds = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.getByIds(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const getByObject = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let { currentUser, ...reqBody } = body;
            let result = await service.getByObject(reqBody);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const query = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.query(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const update = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let { currentUser, ...reqBody } = body;
            let result = await service.update(reqBody);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    const updateMany = async (request, context) => {
        let { status, body } = await preInvoke(null, null, request, context);
        if (status !== ERROR.OK) {
            return formatErrorResponse(status, body)
        }
        try {
            let result = await service.updateMany(body);
            return util.formatResponse(result);
        } catch (error) {
            return util.formatErrorResponse(error.body, error.status)
        }

    };

    return {
        create,
        createMany,

        deleteById,
        deleteByIds,
        deleteAll,

        getAll,
        getById,
        getByIds,
        getByObject,

        query,

        update,
        updateMany
    };
};

module.exports.baseController = baseController;