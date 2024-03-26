const { OAuth2Client } = require('google-auth-library');

exports.googleSignIn = async (request) => {

    const oAuth2Client = new OAuth2Client(
        process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
        process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
        process.env.SERVER_URL + request.redirectionEndpoint
    );

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const authorizeUrl = await oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    return authorizeUrl;
}
