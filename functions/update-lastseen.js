/* eslint no-param-reassign: 0 */
const contentfulManagement = require('contentful-management');

function getUser(id) {
  const client = contentfulManagement.createClient({
    accessToken: process.env.CTF_CM_ACCESS_TOKEN,
  });
  return client
    .getSpace(process.env.CTF_SPACE_ID)
    .then(space => space.getEntry(id));
}

function updateLastSeen(user, event) {
  user.fields.lastSeen = {
    'da-DK': JSON.parse(event.body).map(item => ({
      sys: {
        id: item.id,
        linkType: 'Entry',
        type: 'Link',
      },
    })),
  };
  return user;
}

exports.handler = (event, context, callback) => {
  getUser(event.queryStringParameters.cf_user_id)
    .then(user => updateLastSeen(user, event))
    .then(user => user.update())
    .then(user => user.publish())
    .then(user => callback(null, { statusCode: 200, body: JSON.stringify(user, null, 2) }))
    .catch(e => callback(e));
};
