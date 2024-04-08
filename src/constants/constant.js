const dotenv = require("dotenv");
dotenv.config();

exports.UserStatus = {
    Active: `Active`,
    InActive: `InActive`
}

exports.Messages = {
    DATABASE_ERROR: "Database Error",
    INVALID_REQUEST: "Invalid Request",
    ACCOUNT_USER_DATABASE_ERROR: "Account User Database Error",
    USER_ALREADY_EXISTS: "User Already Exists. Please Login",
    SOCIAL_USER_ALREADY_EXISTS: "User already exists. Please use respective Social platform",
    GOOGLE_USER_ALREADY_EXISTS: "User already exists. Please use Google Login!",
    FACEBOOK_USER_ALREADY_EXISTS: "User already exists. Please use Facebook Login!",
    TWITTER_USER_ALREADY_EXISTS: "User already exists. Please use Twitter Login!",
    INVALID_SOCIAL_USER: "Invalid Social User",
    NORMAL_USER_ALREADY_EXISTS: "User already exists. Please Login with email and password",
    INVALID_PASSWORD: "Invalid password",
    USER_EMAIL_DOESNOT_EXISTS: "User Email Does Not Exists",
    INVALID_CREDENTIALS: "Invalid Credentials",
    USER_DELETED: "User Deleted",
    USER_DOESNOT_EXISTS: "User  Does Not Exists",
    SEND_OTP_ERROR: "OTP not sent",
    INVALID_OTP: "Invalid OTP",
    INVALID_TOKEN: "INVALID_TOKEN",
    TOKEN_REQUIRED: "A token is required for authentication",
    OTP_SENT: "Previously sent mail was less than 5 minutes ago",
    EMAIL_SENT: "Otp has been sent to mail",
    EMAIL_ERROR: "Error in Sending Mail",
    OTP_ERROR: "Error sending OTP",
    PROFILE_PIC_UPDATED: "Profile Photo updated Successfully!",
    ERROR_IN_PIC_UPDATION: "Error in Profile photo updation!",
    ERROR_IN_LOGO_UPDATION: "Error in Logo updation!",
    ERROR_IN_AD_IMAGE_UPDATION: "Error in Image updation!",
    RESUME_UPDATED: "Attachment updated Successfully!",
    ERROR_IN_RESUME_UPDATION: "Error in Attachment updation!",
    DATA_WAS_NOT_THERE: "Data was not there",
    ACCESS_DENIED: "Access Denied",
    ERROR_DELETING_ATTACHMENT: "Error in deleteing Attachment!",
    FILE_DELETED: "File Deleted Successfully!",
    FILE_NOT_FOUND: "Attachment not found!",
    APPLICATION_ERROR: "Something wrong while sending invitation request",
    UPDATE_APPLICATION_ERROR: "Error while updating application status",
    QR_CODE_ERROR: `Error in QR Code`,
    USER_NOT_VERIFIED: "Your account is not verified",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    PASSWORD_UPDATED: "Password updated Successfully!",
    SUCCESS: "Success",
    IS_SOCIAL_LOGIN: "Your account is registered from social login",
    VERIFY_WITH_NORMAL_LOGIN: "Account already exists, login with the dAcademy login",
    ERROR_IN_SOCIAL_LOGIN: "Error in Social Login",
    VAT_NUMBER_EXISTS: "Vat number already exists with different user",
    INVALID_COMPANY: "No Company details found!",
    INVALID_JOB: "No Job details found!",
    ALREADY_APPLIED: "Already applied for this job",
    ERROR_IN_USER_AUTH: "Google User can't reset password!",
    PDF_UPLOADED: "Pdf uploaded Successfully!",
    PDF_UPLOADED_ERROR: "Error in Pdf uploaded!",
    INVALID_USER_DATA: "Invalid User Data",
    PDF_CREATE_ERROR: "Error in Pdf creation!",

    PROTOTYPE_MASTER : {
        PROTOTYPE_ALREADY_EXISTS: "Prototype name already exists!",
        VERSION_ALREADY_EXISTS: "version ID already exists!",
        ERROR_IN_CREATING_DEFAULT_VERSION: "Error in generating default version!",
    }
}

exports.JoiMessages = {
    INDUSTRY_NAME_ERROR: "Payload key has be name and value has be 'Industry'",
    JOB_CATEGORY_BY_INDUSTRY_ERROR: "Payload Key has be name and value has be String",
    COMPANY_LOGO_ERROR: "Logo has be a String",
    ID_ERROR: "ID has be uuid",
    COMPANY_NAME_ERROR: "Company name has be String with min 2 and max 100 charachters",
    VAT_ERROR: "VAT no has to start with 2 alphabets, continue with 9 numbers and 11 as complete length",
    WEBSITE_URL_ERROR: "Website URL can be optional/empty or has to start with https:// or http://",
    COMPANY_ADDRESS_ERROR: "Company address has be String with min 2 charachters",
    COMPANY_COUNTRY_ERROR: "Country has to be selected",
    COMPANY_STATE_ERROR: "State has to be selected",
    COMPANY_CITY_ERROR: "City has to be selected",
    COMPANY_COUNTRYCODE_ERROR: "Country code is missing",
    COMPANY_STATECODE_ERROR: "State code is missing",
    COMPANY_DESCRIPTION: "Description is optional and has to be a string",
    COMPANY_PRIVACY_STATEMENT: "Privacy statement is optional and has to be a string",
    CATEGORY_BY_NAME_ERROR: "Category name is mandatory with name as key and value has to be out of hardSkill, humanSkill, jobTitles, WhereDidYouHearAboutUs ,feedbackSubject",
    ATTACHMENT_FILENAME_ERROR: "fileName is a mandatory String with extension .pdf",
    ATTACHMENT_PASSPORTID_ERROR: "passportId is a mandatory uuid",
    JOB_ID_ERROR: "id is a mandatory uuid",
    ATTACHMENT_UPDATEDTS_ERROR: "updatedTs has be in the format dd.mm.yyyy",
    ATTACHMENT_KEY_ERROR: "Key is a mandatory String with extension .png, .jpg, .jpeg, .svg",
    AD_IMAGE_ERROR: "adImageName is a mandatory String with extension .png, .jpg, .jpeg, .svg",
    FILENAME_ERROR: "fileName is a mandatory String with extension .png, .jpg, .jpeg, .svg",
    FILENAME_PDF_ERROR: "fileName is a mandatory String with extension .pdf",
    JOB_ADD_IMAGE_ERROR: "Key is a mandatory String with extension .png, .jpg, .jpeg, .svg",
    JOB_ID: "Job ID",
    CONTAINER_NAME_ERROR: "Container name is mandatory and value has to be out of attachment, staticuploads, upload, profileimage ,companylogo, jobadimage",

}
exports.Roles = {
    None: 0,
    User: 1,
    Admin: 2,
    SuperAdmin: 4 
};

// Constants - Fonts : 
exports.fontsPath = {

    TrebuchetMS: {
        normal: './src/fonts/trebuchet-ms/trebuc.ttf',
        italics: './src/fonts/trebuchet-ms/Trebuchet-MS-Italic.ttf',
    },
    TimesNewRoman: {
        normal: './src/fonts/TimesNewRoman/times new roman.ttf',
        bold: './src/fonts/TimesNewRoman/times new roman italic.ttf',
        italics: './src/fonts/TimesNewRoman/times new roman bold.ttf',
        bolditalics: './src/fonts/TimesNewRoman/times new roman bold italic.ttf'
    },
    Roboto: {
        normal: './src/fonts/Roboto/Roboto-Regular.ttf',
        bold: './src/fonts/Roboto/Roboto-Medium.ttf',
        italics: './src/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: './src/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
}

exports.emailTemplatePaths = {
    basePath: "./src/mailTemplates/",
    welcomePath: "welcomeTemplate.html",
    mainTemplate: "mainTemplate.html",
    employeeWelcomeTemplate: "employeeRegisterTemplate.html",
    employerWelcomeTemplate: "employerRegisterTemplate.html",
    otpForAccountRegisterTemplate: "otpForAccountRegisterTemplate.html",
    otpForResetPasswordTemplate: "otpForResettingPasswordTemplate.html",
    jobStatusUpdateTemplate: "jobStatusUpdateTemplate.html",
    jobStatusUpdateForEmployee: "jobStatusUpdateForEmployee.html",
    applyForJobTemplate: "applyForJobTemplate.html",
}

exports.emailSubjects = {
    welcome: "Welcome to your SmartWorker account",
    otp: "Rhibhus - OTP",
    accepted: "Candidate Accept Notification",
    invited: "Employer Invitation Notification",
    withdrawn: "Candidate Withdrawn Notification",
    rejected: "Candidate Reject Notification",
    applyJob: "Candidate Apply Notification",
    welcomeUser: "Welcome to Rhibhus!",
}

exports.containerNames = {
    TEST: "test",
    ATTACHMENT: "attachment",
    STATICUPLOADS: "staticuploads",
    UPLOAD: 'upload',
    PROFILE_PIC: 'profileimage',
    COMPANY_LOGO: 'companylogo',
    JOB_AD_IMAGE: 'jobadimage',
    PROFILE_DOC: 'profiledoc'
}
exports.permissions = {
    WRITE: 'w',
    READ: 'r'
}
exports.keyWords = {
    FIRST_NAME: "First Name", 
    LAST_NAME: "Last Name", 
    EMAIL: "User Email",
    JOB_ID: "Job Id",
    PASSWORD: "User Password",
    OLD_PASSWORD: "Old Password",
    NEW_PASSWORD: "New Password",
    PASSPORT_ID: "Passport Id",
    RESUME: "resume",
    STATUS: "Status",
    USER_ID: 'User ID',
    SUCCESS: 'success',
    OTP: "otp", 
    FILE_NAME: "Filename", 
    CONTAINER: "container", 
    USER_STATUS: "User Status", 
    KEY: "Key", 

    VERIFIED: "verified",
    NOT_VERIFIED: "notVerified",
    FACEBOOK_USER: "facebookUser",
    TWITTER_USER: "twitterUser",
    NEW_USER: "newUser",
    INVALID_USER: "invalidUser",
    NORMAL_USER: "normalUser",
    WEBSITE_ADDRESS: "Website Address",

    NAME: "name",
    ASCENDING: "ascending", 
    TS: '_ts', 

    DESCRIPTION: "description",
    PROTOTYPE_NAME: "prototype name",
    VERSION_NAME: "Version Name",
    VERSION_ID: "Version ID",
    ECDETAIL_NAME: "EC name",
    ELECTROCHEM_ID: "ElectroChem Id",
    DEFAULT_VERSION: "Version 1",
    projectedDesignCompletionDate : "projectedDesignCompletionDate",
    projectedAssemblyCompletionDate : "projectedAssemblyCompletionDate" ,
    ProjectedTestingCompletionDate : "ProjectedTestingCompletionDate",
    ID : "id",
    APPLICATION : "Application",
    ELECTRODE_POROSITY : "Electrode Porosity",
    ELECTRODE_STRUCTURE : "Electrode Structure"
}
exports.validNames = {
    INDUSTRY: "Industry",
}

exports.prototypeStatus = {
    PLANNED: "Planned",
    DESIGN: "Design",
    MANUFACTURING: "Manufacturing",
    TESTING: "Testing",
    ARCHIVED: "Archived"
}