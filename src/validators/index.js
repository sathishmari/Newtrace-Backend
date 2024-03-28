const changePassword = require('./changePassword.validator')
const deleteBlobFile = require('./deleteBlobFile.validator')
const deleteUser = require('./deleteUser.validator')
const fetchUserById = require('./fetchUserById.validator')
const getSASUrltoPut = require('./getSASUrltoPut.validator')
const getSASUrltoPutPdf = require('./getSASUrltoPutPdf.validator')
const getSASUrltoAccess = require('./getSASUrltoAccess.validator')
const getSASUrltoAccessPdf = require('./getSASUrltoAccessPdf.validator')
const otpForResetPassword = require('./otpForResetPassword.validator')
const resetPassword = require('./resetPassword.validator');
const userLogin = require('./userLogin.validator');
const userRegister = require('./userRegister.validator');

const addPrototypeMaster = require('./addPrototypeMaster.validator');
const addVersion = require('./addVersion.validator');
const fetchVersion = require('./fetchVersion.validator')
const updateVersion = require('./updateVersion.validator');

module.exports = {

    changePassword,
    deleteBlobFile,
    deleteUser, 
    fetchUserById,
    getSASUrltoPut,
    getSASUrltoPutPdf,
    getSASUrltoAccess,
    getSASUrltoAccessPdf,
    otpForResetPassword,
    resetPassword,
    userLogin,
    userRegister,
    
    addPrototypeMaster,
    addVersion,
    fetchVersion,
    updateVersion,

}
