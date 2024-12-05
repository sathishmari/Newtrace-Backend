const Validators = require('../validators')
const { util: { ERROR } } = require('../helper');

const validator = async (validatorName, request, context) => {
    if (validatorName === null) {
        return { status: ERROR.OK, body: request }
    }

    if (!Validators.hasOwnProperty(validatorName))
        return { status: ERROR.UNPROCESSABLE_ENTITY, body: `'${validatorName}' validator is not exist` }

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const validateInput = async function (request) {
        try {
            let sanitizedData = await Validators[validatorName].validateAsync(request, options);
            request = request.currentUser !== undefined ? { ...sanitizedData, ...{ currentUser: request.currentUser } } : sanitizedData;
            return { status: ERROR.OK, body: request }
        } catch (err) {
            return {
                status: ERROR.UNPROCESSABLE_ENTITY, body: err.isJoi ?
                    `Validation error: ${err.details.map(x => x.message).join(', ')}`
                    : (err.message || "Invalid request data. Please review request and try again.")
            };
        }
    }
    return await validateInput(request)
}

module.exports = validator;