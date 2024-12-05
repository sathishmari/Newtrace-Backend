const {getAPICall, postAPICall, putAPICall, deleteAPICall} = require('./httpCommon'); 
const {googlePostApiCall, googleGetApiCall} = require('./googleOAuthApi'); 

module.exports = {
    getAPICall,
    postAPICall,
    putAPICall,
    deleteAPICall, 
    googlePostApiCall, 
    googleGetApiCall
}
