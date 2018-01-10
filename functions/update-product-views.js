/* eslint no-param-reassign: 0 */
const algoliasearch = require('algoliasearch');

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_ADMIN_KEY,
);
const index = client.initIndex('products');

function getProduct(query) {
  return new Promise((resolve, reject) => {
    index.search({ query }, (err, content) => {
      if (err) return reject(err);
      console.log(JSON.stringify(content, null, 2));
      const product = content.hits.find(hit => hit.sys.id === query);

      if (!product) return reject(new Error('Not found'));
      return resolve(product);
    });
  });
}

function updateProduct({ objectID }) {
  return new Promise((resolve, reject) => {
    index.partialUpdateObject({
      views: {
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
  const query = queryStringParameters.id;
  getProduct(query)
    .then(updateProduct)
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response, null, 2),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })
    .catch(callback);
};
