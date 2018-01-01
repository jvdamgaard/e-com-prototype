const contentfulManagement = require('contentful-management');
const contentful = require('contentful');

module.exports.managementClient = contentfulManagement.createClient({
  accessToken: 'CFPAT-802737470517e9206951077be900c1fa1dcac09d26c9d282a5ecc3d78047eb78',
});

const settings = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CD_ACCESS_TOKEN,
};

// if (process.env.DOMAIN) {
//   settings.host = process.env.DOMAIN;
//   settings.basePath = 'api/contentful';
// }

module.exports.deliveryClient = contentful.createClient(settings);
