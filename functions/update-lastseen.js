// const contentfulManagement = require('contentful-management');

// function createUser() {
//   const client = contentfulManagement.createClient({
//     accessToken: process.env.CTF_CM_ACCESS_TOKEN,
//   });
//   return client.getSpace(process.env.CTF_SPACE_ID)
//     .then(space => space.createEntry('user', {}))
//     .then(user => user.publish());
// }

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ event, context }, null, 2),
  });

  // createUser()
  //   .then((user) => {
  //     callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify({ id: user.sys.id }, null, 2),
  //     });
  //   })
  //   .catch(e => callback(e));
};
