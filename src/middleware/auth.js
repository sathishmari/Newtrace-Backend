const { constant: { Messages } } = require("../constants");
const { jwt: { jwtVerify }, util: { isEmptyArray, isEmptyObject, ERROR }, enumHelper: { hasAny } } = require("../helper")

const auth = async (allowedRoles = [], req, context) => {

    console.log('COSMOS_DB_NAME : ', process.env.COSMOS_DB_NAME);
    console.log('DB_PREFIX : ', process.env.DB_PREFIX);
    console.log('Blob name : ', process.env.Azure_Storage_AccountName);
    
    
    let request = await req.text() || {};
    typeof request === "string" && ( request = JSON.parse(request) ); 

    // Step 1: No Auth, Ex: Login
    if (allowedRoles === null) {
        return { status: ERROR.OK, body: request }
    }

    /** ================== AUTH AND JWT ===================================== **/

    // // Step 2: Verify Token Present in Authorization Header or not
    // const token = req.headers.get('authorization');

    // if (!token) {
    //     return { status: ERROR.UNAUTHORIZED, body: Messages.TOKEN_REQUIRED }
    // }

    // try {

    //     // Step 3: Synchronously verify given token using a secret or a public key to get a decoded token
    //     const decoded = jwtVerify(token);

    //     if (isEmptyObject(request)) {
    //         request = {};
    //     }
    //     request.currentUser = decoded;
    //     if (isEmptyArray(allowedRoles)) {
    //         return { status: ERROR.OK, body: request }
    //     }
    //     // Step 4: Authorization checks whether a user is allowed to perform an action or has access to some functionality
    //     if (hasAny(request.currentUser.type, allowedRoles)) {
    //         return { status: ERROR.OK, body: request }
    //     }
    //     else {
    //         return { status: ERROR.UNAUTHORIZED, body: Messages.ACCESS_DENIED }
    //     }

    // } catch (err) {
    //     return { status: ERROR.UNAUTHORIZED, body: Messages.INVALID_TOKEN }
    // }

    /** ================== END AUTH AND JWT ===================================== **/
}

module.exports = auth;