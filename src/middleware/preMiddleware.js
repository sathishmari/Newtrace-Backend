const auth = require('./auth')
const validator = require('./validator')
const { util: { ERROR } } = require("../helper")

const preInvoke = async (allowedRoles = [], validatorName, req, context) => {
    // 1. Auth Middleware
    var authRes = await auth(allowedRoles, req, context)
    if (authRes.status !== ERROR.OK) {
        return { status: authRes.status, body: authRes.body }
    }

    // 2. Validator Middleware
    var validatorRes = await validator(validatorName, authRes.body, context);
    return { status: validatorRes.status, body: validatorRes.body };
}

module.exports = {
    preInvoke
}