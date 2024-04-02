
const authServices = require(`../services/authServices.js`);
const { auth } = require("../middleware");
const { Messages, Roles, keyWords } = require("../constants/constant");
const { util: { formatErrorResponse, formatResponse, ERROR } } = require("../helper");
const { preMiddleware: { preInvoke } } = require("../middleware");

const googleSignInforMobile = async (request, context) => {

    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }
    try {
        let result = await authServices.googleSignInforMobile(body);
        return formatResponse(result)
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
};

const googleSignInforMobileRedirect = async (request, context) => {
    let reqBody = { code: await request.query.get('code') }

    try {
        let socialSignInRedirectGoogleMobile_res = await authServices.googleSignInforMobileRedirect(reqBody, context);

        let response = JSON.stringify(socialSignInRedirectGoogleMobile_res[0].response);

        if (socialSignInRedirectGoogleMobile_res[0].redirect === true) {
            switch (socialSignInRedirectGoogleMobile_res[0].param) {
                case keyWords.VERIFIED:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/HomeScreen?response=${response}` } };
                case keyWords.NOT_VERIFIED:
                    console.log("notVerified : ", context);
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/OtpVerification?response=${response}` } };
                case keyWords.FACEBOOK_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/LoginPage?response=${response}` } };
                case keyWords.TWITTER_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/LoginPage?response=${response}` } };
                case keyWords.NEW_USER:
                    console.log("new User ---: ", response);
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/SocialRegistration?response=${response}` } };

                default:
            }
            context.log(`C :: Signed In Via Google successful...`);
        } else {
            context.log(`C :: Signed In Via Google failed...`);

            switch (socialSignInRedirectGoogleMobile_res[0].param) {
                case keyWords.NOT_VERIFIED:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/OtpVerification?response=${response}` } };
                case keyWords.INVALID_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/LoginPage?response=${response}` } };
                case keyWords.NORMAL_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/LoginPage?response=${response}` } };
                default:
            }
        }
    } catch (error) {
        console.log("error: ", error);
        return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/LoginPage?response=${{ response: Messages.ERROR_IN_SOCIAL_LOGIN }}` } };
    }
};

const googleSignInforWeb = async (request, context) => {

    let { status, body } = await preInvoke(null, null, request, context);
    if (status !== ERROR.OK) {
        return formatErrorResponse(status, body)
    }

    try {
        let result = await authServices.googleSignInforWeb(body);
        return formatResponse(result)
    } catch (error) {
        return formatErrorResponse(error.body, error.status)
    }
};

const googleSignInforWebRedirect = async (request, context) => {
    let reqBody = { code: await request.query.get('code') }

    try {
        let socialSignInRedirectGoogleMobile_res = await authServices.googleSignInforWebRedirect(reqBody, context);

        let response = JSON.stringify(socialSignInRedirectGoogleMobile_res[0].response);

        if (socialSignInRedirectGoogleMobile_res[0].redirect === true) {
            switch (socialSignInRedirectGoogleMobile_res[0].param) {
                case keyWords.VERIFIED:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/home?response=${response}` } };
                case keyWords.NOT_VERIFIED:
                    console.log("notVerified : ", context);
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/otpPage?response=${response}` } };
                case keyWords.FACEBOOK_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/candidateLogin?response=${response}` } };
                case keyWords.TWITTER_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/candidateLogin?response=${response}` } };
                case keyWords.NEW_USER:
                    console.log("new User ---: ", response);
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/socialLogin?response=${response}` } };

                default:
            }
            context.log(`C :: Signed In Via Google successful...`);
        } else {
            context.log(`C :: Signed In Via Google failed...`);

            switch (socialSignInRedirectGoogleMobile_res[0].param) {
                case keyWords.NOT_VERIFIED:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/otpPage?response=${response}` } };
                case keyWords.INVALID_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/candidateLogin?response=${response}` } };
                case keyWords.NORMAL_USER:
                    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/candidateLogin?response=${response}` } };
                default:
            }
        }
    } catch (error) {
        console.log("error : ", error);
        return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/candidateLogin?response=${{ response: Messages.ERROR_IN_SOCIAL_LOGIN }}` } };
    }
};

module.exports = {

    googleSignInforMobile,
    googleSignInforMobileRedirect,
    googleSignInforWeb,
    googleSignInforWebRedirect

}
