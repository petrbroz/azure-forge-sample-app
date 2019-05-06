const { AuthenticationClient } = require('forge-nodejs-utils');

const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET } = process.env;
const SCOPES = ['viewables:read'];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed an access token request.');
    if (!FORGE_CLIENT_ID || !FORGE_CLIENT_SECRET) {
        const msg = 'FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables are missing.';
        console.error(msg);
        context.res = { status: 400, body: msg };
    } else {
        try {
            const client = new AuthenticationClient(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET);
            const authentication = await client.authenticate(SCOPES);
            context.res = {
                body: authentication
            };
        } catch(err) {
            console.error(err);
            context.res = {
                status: 500,
                body: JSON.stringify(err)
            };
        }
    }
};
