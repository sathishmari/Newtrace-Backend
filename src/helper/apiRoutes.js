// require('dotenv').config();

const Url = {
    baseApiUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    chatUrl: process.env.NEXT_PUBLIC_CHAT_URL,
}
const apiRoutes = {

    //common
    addJobApplicationStatus: "/addJobApplicationStatus",
    addAttachment: "/addAttachment",
    addProfilePic: '/addProfilePic',
   
}

export { Url, apiRoutes };

