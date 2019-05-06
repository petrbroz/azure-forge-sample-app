const { DataManagementClient } = require('forge-nodejs-utils');

const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET } = process.env;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a bucket list request.');
    if (!FORGE_CLIENT_ID || !FORGE_CLIENT_SECRET) {
        const msg = 'FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables are missing.';
        console.error(msg);
        context.res = { status: 400, body: msg }; 
    } else {
        try {
            const client = new DataManagementClient();
            const buckets = await client.listBuckets();
            context.res = {
                body: buckets.map(bucket => bucket.bucketKey)
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
