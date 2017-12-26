const contentfulManagement = require('contentful-management');
const contentful = require('contentful');

module.exports.managementClient = contentfulManagement.createClient({
  accessToken: process.env.CTF_CM_ACCESS_TOKEN || 'netlify',
  host: process.env.DEPLOY_PRIME_URL,
  basePath: process.env.DEPLOY_PRIME_URL ? 'api/contentful-management' : '',
});

module.exports.deliveryClient = contentful.createClient({
  space: 'n8ckv2qtuzei',
  accessToken: process.env.CTF_CD_ACCESS_TOKEN || 'netlify',
  host: process.env.DEPLOY_PRIME_URL,
  basePath: process.env.DEPLOY_PRIME_URL ? 'api/contentful-delivery' : '',
});
