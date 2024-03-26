const { util: {  getEmailContent }, jwt } = require('../helper');
const { emailRepository } = require('../repository')
const { constant: { emailSubjects, keyWords } } = require('../constants');

const sendOtpMail = async (userData, otpMailTemplatePath) => {
    let otpMailHtml = await getEmailContent(otpMailTemplatePath)
    const abodooMailOptionTemplate = {
        'clientEmail': userData.email,
        'emailSubject': emailSubjects.otp,
        'emailContent': otpMailHtml.replace("[UserName]", userData.firstName).replace("[OTP]", userData.otp).replace("[userEmail]", userData.email)
    }
    const response = await emailRepository.sendMail(abodooMailOptionTemplate);
    if (response.message === keyWords.SUCCESS) {
        return 200;
    } else {
        console.log("error ---: ", response);
        return 200; //Since the action is complete and only mail sending is failing, hence sending back success. Because UI completion depends on success response and failure of email is not a blocker for that. 
    }
}

const sendWelcomeMail = async (userData, mailTemplatePath) => {
    let welcomeMailHtml = await getEmailContent(mailTemplatePath)
    const abodooMailOptionTemplate = {
        'clientEmail': userData.email,
        'emailSubject': emailSubjects.welcomeUser,
        'emailContent': welcomeMailHtml.replace("[UserName]", userData.firstName).replace("[userEmail]", userData.email)
    }

    const response = await emailRepository.sendMail(abodooMailOptionTemplate);
    if (response.message === keyWords.SUCCESS) {
        return 200;
    } else {
        console.log("error ---: ", response);
        return 200; //Since the action is complete and only mail sending is failing, hence sending back success. Because UI completion depends on success response and failure of email is not a blocker for that. 
    }
}

module.exports = {

    sendOtpMail,
    sendWelcomeMail
}
