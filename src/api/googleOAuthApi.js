const apiClient = require('./httpCommon');

const googlePostApiCall = async (data) => await apiClient.postAPICall(data).then(res => res.data);
const googleGetApiCall = async (data) => await apiClient.getAPICall(data).then(res => res.data);

module.exports = {
    googlePostApiCall,
    googleGetApiCall
}