/* eslint no-param-reassign: 0 */
const algoliasearch = require('algoliasearch');

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_ADMIN_KEY);
const index = client.initIndex('SearchQueries');

function queryExists(query) {
  return new Promise((resolve, reject) => {
    index.search({ query }, (err, content) => {
      if (err) {
        return reject(err);
      }
      return resolve(content.hits.find(hit => hit.query === query));
    });
  });
}

function newQuery(query) {
  return new Promise((resolve, reject) => {
    index.addObjects([{ hits: 1, query }], (err, content) => {
      if (err) {
        return reject(err);
      }
      return resolve(content);
    });
  });
}

function updateQuery({ objectID }) {
  return new Promise((resolve, reject) => {
    index.partialUpdateObject({
      hits: {
        value: 1,
        _operation: 'Increment',
      },
      objectID,
    }, (err, content) => {
      if (err) {
        return reject(err);
      }
      return resolve(content);
    });
  });
}

exports.handler = ({ queryStringParameters }, context, callback) => {
  const query = queryStringParameters.query.toLowerCase();
  queryExists(query)
    .then((existing) => {
      if (!existing) {
        return newQuery(query);
      }
      return updateQuery(existing);
    })
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response, null, 2),
      });
    })
    .catch(callback);
};
