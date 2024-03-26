const bcrypt = require('bcryptjs');

const { userRepository } = require('../repository');
let { baseService } = require("./genericService");
const { constant: { Messages, emailTemplatePaths } } = require('../constants');
const { util: { isEmptyArray, formatErrorResponse, formatResponse, isEmptyObject, ERROR, getRandomOtp }, jwt } = require('../helper');
const emailService = require("./emailService");
const blobService = require('./blobService');

baseService = baseService(userRepository);

const changePassword = async (request) => {
    let result = await userRepository.getById(request.id);
    if (!isEmptyObject(result) && await bcrypt.compare(request.oldPassword, result.password)) {
        await userRepository.update({
            id: request.id,
            password: await bcrypt.hash(request.newPassword, 10)
        });
        return Messages.PASSWORD_UPDATED; 
    } else {
        throw formatErrorResponse(Messages.INVALID_PASSWORD, ERROR.BAD_REQUEST);
    }
}

const fetchUserById = async (request) => {
    let { userId } = request;
    let userData = await userRepository.getById(userId);

    userData.profileImage = (userData.profileImage && userData.profileImage !== "") ? await blobService.createSASUrl(userData.profileImage, containerNames.PROFILE_PIC, permissions.READ) : 'N.A.';
    return userData;
}

const login = async (request) => {
    const { email, password } = request;
    console.log( email, password );
    let dbUser = await userRepository.getByEmail(email);
    console.log(dbUser[0].password, await bcrypt.compare(password, dbUser[0].password));
    if (!isEmptyArray(dbUser) && (await bcrypt.compare(password, dbUser[0].password))) {
        let user = {};
        user.userId = dbUser[0].id; 
        let token = jwt.jwtSign(dbUser[0]); // Create token.
        user.token = token; // save user token

        // Sample code to send mail

        // let htmlString = await readFile("./src/mailTemplates/otpTemplate.html");
        // let beamMailOptionTemplate = {
        //     'clientEmail': dbUpdate.email,
        //     'emailSubject': 'Account OTP',
        //     'emailContent': htmlString.replace("***user_otp***", dbUpdate.otp),
        // }
        // let dataEmail = await sendMail.process(beamMailOptionTemplate)

        // if (dataEmail.httpStatusCode == 200) {
        //     return Messages.EMAIL_SENT;
        // }

        return user;
    } else {
        throw formatErrorResponse(Messages.INVALID_CREDENTIALS, ERROR.UNAUTHORIZED);
    }
}

const otpForResettingPassword = async (request) => {
    let dbUser = await userRepository.getByEmail(request.email)
    try {
        if (!isEmptyArray(dbUser)) {
            dbUser[0].otp = getRandomOtp()
            await userRepository.update(dbUser[0])
            const emailSentSuccessfully = await emailService.sendOtpMail(dbUser[0], emailTemplatePaths.otpForResetPasswordTemplate)
            return emailSentSuccessfully ? { email: dbUser[0].email, message: Messages.EMAIL_SENT } : formatErrorResponse(Messages.OTP_ERROR, ERROR.INTERNAL_SERVER_ERROR)
        } else {
            throw formatErrorResponse(Messages.USER_DOESNOT_EXISTS, ERROR.BAD_REQUEST);
        }        
    } catch (error) {
        console.log("error : ", error);
    }
}

const resetPassword = async (request) => {
    let dbUser = await userRepository.getByEmail(request.email);
    console.log({dbUser});

    if(!isEmptyArray(dbUser)){
        if (!dbUser[0]?.isSocial) {
            dbUser[0].password = await bcrypt.hash(request.password, 10);
            await userRepository.update(dbUser[0])
            return { message: Messages.PASSWORD_UPDATED, type: dbUser[0].type }
        } else {
            throw formatErrorResponse(ERROR.UNAUTHORIZED, Messages.IS_SOCIAL_LOGIN )
        }
    }else{
        throw formatErrorResponse(Messages.INVALID_CREDENTIALS, ERROR.UNAUTHORIZED );
    }
}

const register = async (request) => {
    let dbUser = await userRepository.getByEmail(request.email);
    if (!isEmptyArray(dbUser)) {
        throw new Error(`${Messages.USER_ALREADY_EXISTS}`);
    } else {
        let encryptedPassword = await bcrypt.hash(password, 10);
        const data = {
            ...request,
            email: request.email.toLowerCase(),
            password: encryptedPassword,
        };

        let newUser = await userRepository.create(data);
        let token = jwt.jwtSign(newUser); // Create token. [Note: Do we need to create token at time of registration? Mostly not required. Check??]

        newUser.token = token; // save user token
        const emailSentSuccessfully = await emailService.sendOtpMail(newUser, emailTemplatePaths.otpForAccountRegisterTemplate)
        return emailSentSuccessfully ? newUser : formatErrorResponse(Messages.OTP_ERROR, ERROR.INTERNAL_SERVER_ERROR)
    }
}

const validateOTP = async (request) => {
    let dbUser = await userRepository.getByEmail(request.email);
    if (isEmptyArray(dbUser)) {
        throw formatErrorResponse(Messages.USER_DOESNOT_EXISTS, ERROR.BAD_REQUEST)
    } else {
        if (dbUser[0].otp === request.otp) {
            dbUser[0].otp = getRandomOtp()
            dbUser[0].isVerified = true

            await userRepository.update(dbUser[0])
            let token = await jwt.jwtSign(dbUser[0])

            let emailSentSuccessfully = await emailService.sendWelcomeMail(dbUser[0], dbUser[0].type === Roles.Employer ? emailTemplatePaths.employerWelcomeTemplate : emailTemplatePaths.employeeWelcomeTemplate)

            return emailSentSuccessfully ? { token, userId: dbUser[0].id, type: dbUser[0].type } : formatErrorResponse(Messages.OTP_ERROR, ERROR.INTERNAL_SERVER_ERROR)
        } else {
            throw formatErrorResponse(Messages.INVALID_OTP, ERROR.BAD_REQUEST)
        }
    }
}

module.exports = {
    ...baseService,

    changePassword, 
    fetchUserById,
    login,
    otpForResettingPassword, 
    resetPassword, 
    register, 
    validateOTP
}
