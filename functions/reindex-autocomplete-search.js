/* eslint no-param-reassign: 0 */
const contentful = require('../utils/contentful');
const algoliasearch = require('algoliasearch');

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_ADMIN_KEY,
);
const index = client.initIndex('autocomplete');

function clear() {
  return new Promise((resolve, reject) => {
    index.clearIndex((err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

function indexAutocomplete(objects) {
  return new Promise((resolve, reject) => {
    index.addObjects(objects, (err, content) => {
      if (err) return reject(err);
      return resolve(content);
    });
  });
}

function splitTitel(titel) {
  return titel.split(' ').filter(string => string !== '&');
}

// { hits: 1, query }

function getBrands() {
  return contentful.client.getEntries({
    content_type: 'brand',
    limit: 1000,
  })
    .then((response) => {
      const allQueries = [];
      response.items.forEach((item) => {
        const queries = splitTitel(item.fields.titel);
        queries.forEach(query => allQueries.push({
          hits: 1,
          query: query.toLowerCase(),
        }));
      });
      return allQueries;
    });
}

function getDepartments() {
  return contentful.client.getEntries({
    content_type: 'department',
    limit: 1000,
  })
    .then((response) => {
      const allQueries = [];
      response.items.forEach((item) => {
        const queries = splitTitel(item.fields.titel);
        queries.forEach(query => allQueries.push({
          hits: 1,
          query: query.toLowerCase(),
        }));
      });
      return allQueries;
    });
}

exports.handler = (event, context, callback) => {
  const fetchAndClear = Promise.all([
    getBrands(),
    getDepartments(),
    clear(),
  ]);

  fetchAndClear
    .then(([brands, departments]) => indexAutocomplete(brands.concat(departments)))
    .then(response => callback(null, {
      statusCode: 200,
      body: JSON.stringify(response, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    .catch(callback);
};
