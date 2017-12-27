const contentfulManagement = require('contentful-management');
const contentful = require('contentful');

module.exports.managementClient = contentfulManagement.createClient({
  accessToken: 'netlify',
  host: 'employme.at',
  basePath: 'api/contentful-management',
});

module.exports.deliveryClient = contentful.createClient({
  space: 'n8ckv2qtuzei',
  accessToken: 'netlify',
  host: 'employme.at',
  basePath: 'api/contentful-delivery',
});
