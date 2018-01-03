const contentful = require('contentful');

const settings = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CD_ACCESS_TOKEN,
};

if (process.browser && window.location.hostname !== 'localhost') {
  settings.host = window.location.hostname;
  settings.basePath = 'api/contentful';
}

module.exports.client = contentful.createClient(settings);
