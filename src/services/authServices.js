const dotenv = require("dotenv");
dotenv.config();
const {googlePostApiCall, googleGetApiCall} = require('../api')
const { apiHelper, jwt, util: {getRandomOtp, getCurrentTimestamp, ERROR, isEmptyArray } } = require('../helper')
const { constant: { Messages, Roles, emailTemplatePaths }, constant } = require('../constants');
const { userRepository } = require('../repository');
const { userService } = require('../services');

const googleSignInforMobile = async (request) => {

    request[`redirectionEndpoint`] = '/v1/googleSignInforMobileRedirect';
    let url = await apiHelper.googleSignIn(request)
    return { redirectUrl: url };
}

const googleSignInforMobileRedirect = async function (request, context) {

    let payLoadData = {
        url: 'https://www.googleapis.com/oauth2/v4/token',
        data: 'code=' + request.code + '&redirect_uri=' + process.env.SERVER_URL + '/v1/googleSignInforMobileRedirect' + '&client_id=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY + '&client_secret=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET + '&scope=&grant_type=authorization_code',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    try {

        let axiosPost_res = await googlePostApiCall(payLoadData)

        try {
            let axiosGet_res = await googleGetApiCall(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${axiosPost_res.access_token}`); 

            // Add user data
            let userRequest = {
                "firstName": axiosGet_res.given_name,
                "lastName": axiosGet_res.family_name,
                "email": axiosGet_res.email.toLowerCase(),
                "subId": axiosGet_res.sub,
                "type": Roles.Worker,
                "isSocial": true,
                "provider": "google", 
                "createdAt": await getCurrentTimestamp(), 
                "updatedAt": await getCurrentTimestamp()
            }
            const dbUser = await userRepository.getByEmail(axiosGet_res.email);
            if (!isEmptyArray(dbUser)) {
                if (dbUser[0].isSocial) {
                    if (dbUser[0].provider === "google") {
                        if (dbUser[0].isVerified) {

                            return [{ redirect: true, response: { token: await jwt.jwtSign(dbUser[0]), userId: dbUser[0].id, type: dbUser[0].type }, param: "verified" }]

                        } else {
                            dbUser[0].otp = await getRandomOtp();
                            dbUser[0].updatedAt = await getCurrentTimestamp();

                            const newUser = await userRepository.update(dbUser[0]);
                            const emailSentSuccessfully = await userService.sendOtpMail(newUser, emailTemplatePaths.otpForAccountRegisterTemplate)

                            if (emailSentSuccessfully) {
                                return [{ redirect: true, response: { userId: newUser.id, email: newUser.email }, param: "notVerified" }]
                            } else {
                                return [{ redirect: false, response: { userId: newUser.id, email: newUser.email, error: Messages.OTP_ERROR }, param: "notVerified" }]
                            }
                        }
                    } else {
                        if (dbUser[0].provider = "facebook") {
                            return [{ redirect: true, response: Messages.FACEBOOK_USER_ALREADY_EXISTS, param: "facebookUser" }]
                        } else if (dbUser[0].provider = "twitter") {
                            return [{ redirect: true, response: Messages.TWITTER_USER_ALREADY_EXISTS, param: "twitterUser" }]
                        } else {
                            return [{ redirect: false, response: Messages.INVALID_PROVIDER, param: "invalidUser" }]
                        }
                    }
                } else {
                    return [{ redirect: false, response: Messages.NORMAL_USER_ALREADY_EXISTS, param: "normalUser" }];
                }
            } else {
                const newUser = await userRepository.create(userRequest);
                return [{ redirect: true, response: newUser, param: "newUser" }];
            }
        } catch (error) {
            console.log("error :--", error);
            return error
        }
    } catch (error) {
        console.log("error is here : ", error);
        return error;
    }
}

const googleSignInforWeb = async (request) => {

    request[`redirectionEndpoint`] = '/v1/googleSignInforWebRedirect';
    let url = await apiHelper.googleSignIn(request)
    return { redirectUrl: url };
}

const googleSignInforWebRedirect = async function (request, context) {

    let payLoadData = {
        url: 'https://www.googleapis.com/oauth2/v4/token',
        data: 'code=' + request.code + '&redirect_uri=' + process.env.SERVER_URL + '/v1/googleSignInforWebRedirect' + '&client_id=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY + '&client_secret=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET + '&scope=&grant_type=authorization_code',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    try {
        let axiosPost_res = await googlePostApiCall(payLoadData)

        try {
            let axiosGet_res = await googleGetApiCall(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${axiosPost_res.access_token}`); 

            // Add user data
            let userRequest = {
                "firstName": axiosGet_res.given_name,
                "lastName": axiosGet_res.family_name,
                "email": axiosGet_res.email.toLowerCase(),
                "subId": axiosGet_res.sub,
                "type": Roles.Worker,
                "isSocial": true,
                "provider": "google"
            }
            const dbUser = await userRepository.getByEmail(axiosGet_res.email);
            if (!isEmptyArray(dbUser)) {
                if (dbUser[0].isSocial) {
                    if (dbUser[0].provider === "google") {
                        if (dbUser[0].isVerified) {

                            return  [{ redirect: true, response: { token: await jwt.jwtSign(dbUser[0]), userId: dbUser[0].id, type: dbUser[0].type }, param: "verified" }]

                        } else {
                            dbUser[0].otp = getRandomOtp();

                            const newUser = await userRepository.update(dbUser[0]);
                            const emailSentSuccessfully = await userService.sendOtpMail(newUser, emailTemplatePaths.otpForAccountRegisterTemplate)

                            if (emailSentSuccessfully) {
                                return [{ redirect: true, response: { userId: newUser.id, email: newUser.email }, param: "notVerified" }]
                            } else {
                                return [{ redirect: false, response: { userId: newUser.id, email: newUser.email, error: Messages.OTP_ERROR }, param: "notVerified" }]
                            }
                        }
                    } else {
                        if (dbUser[0].provider = "facebook") {
                            return [{ redirect: true, response: Messages.FACEBOOK_USER_ALREADY_EXISTS, param: "facebookUser" }]
                        } else if (dbUser[0].provider = "twitter") {
                            return [{ redirect: true, response: Messages.TWITTER_USER_ALREADY_EXISTS, param: "twitterUser" }]
                        } else {
                            return [{ redirect: false, response: Messages.INVALID_PROVIDER, param: "invalidUser" }]
                        }
                    }
                } else {
                    return [{ redirect: false, response: Messages.NORMAL_USER_ALREADY_EXISTS, param: "normalUser" }];
                }
            } else {
                const newUser = await userRepository.create(userRequest);
                return [{ redirect: true, response: newUser, param: "newUser" }];
            }
        } catch (error) {
            console.log("error : ", error);
            return error
        }

    } catch (error) {
        console.log("error is here : ", error);
        return error;
    }
}

module.exports = {

    googleSignInforMobile,
    googleSignInforMobileRedirect,
    googleSignInforWeb, 
    googleSignInforWebRedirect
}
