let { baseController } = require("./genericController");
const { userService } = require("../services");
baseController = baseController(userService);
const { ERROR } = require('../helper/util');
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { constant: { Roles } } = require("../constants");
const { preMiddleware: { preInvoke } } = require("../middleware");

const changePassword = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], "changePassword", request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await userService.changePassword(body);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
};

const fetchUserById = async (request, context) => {
    let { status, body } = await preInvoke([Roles.Employer, Roles.Worker], 'fetchUserById', request, context);

    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await userService.fetchUserById(body);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

const otpForResetPassword = async (request, context) => {
    let { status, body } = await preInvoke(null, "otpForResetPassword", request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await userService.otpForResettingPassword(body);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

const resetPassword = async (request, context) => {
    let { status, body } = await preInvoke(null, 'resetPassword', request, context);
    if (status !== ERROR.OK) {
        console.log(status, body);
        return formatErrorResponse(status, body)
    }
    try {
        let result = await userService.resetPassword(body);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

const userLogin = async (request, context) => {

    let { status, body } = await preInvoke(null, 'userLogin', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await userService.login(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const userRegister = async (request, context) => {
    let { status, body } = await preInvoke(null, 'userRegister', request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await userService.register(body);
        return formatResponse(result);
    } catch (error) {
        console.log({ error });
        return formatErrorResponse(error.body, error.status)
    }
};

const validateOTP = async (request, context) => {
 let { status, body } = await preInvoke(null, "validateOTP", request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await userService.validateOTP(body);
        return formatResponse(result);
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
}

module.exports = {
    ...baseController,

    changePassword,
    fetchUserById,
    otpForResetPassword,
    resetPassword, 
    userLogin,
    userRegister,
    validateOTP
}
