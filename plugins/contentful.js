const contentfulManagement = require('contentful-management');
const contentful = require('contentful');

module.exports.managementClient = contentfulManagement.createClient({
  accessToken: 'CFPAT-802737470517e9206951077be900c1fa1dcac09d26c9d282a5ecc3d78047eb78',
});

const settings = {
  space: 'n8ckv2qtuzei',
  accessToken: '3cbf6e53e87bef10a885bb99f46c31398f4808a4aa458887b629725294943d9d',
};

if (window.location.hostname !== 'localhost') {
  settings.host = window.location.hostname;
  settings.basePath = 'api/contentful';
}

module.exports.deliveryClient = contentful.createClient(settings);
