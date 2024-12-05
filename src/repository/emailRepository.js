require(`dotenv`).config();
const nodemailer = require(`nodemailer`);
const sgTransport = require(`nodemailer-sendgrid-transport`);
const { Messages } = require("../constants/constant");

const sgoptions = {
    auth: {
        api_key: process.env.API_KEY
    }
};

const transporter = nodemailer.createTransport(sgTransport(sgoptions));

exports.sendMail = async function (request) {
    let client_email = request.clientEmail;
    let email_subject = request.emailSubject;
    let email_content = request.emailContent;

    var mailOptions = {
        to: client_email,
        from: process.env.SENDER_MAIL_ID,
        subject: email_subject,
        html: email_content,
    }

    try {
        let result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log("error is here : ", error);
        return Messages.EMAIL_ERROR;
    }
}