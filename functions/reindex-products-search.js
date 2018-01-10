/* eslint no-param-reassign: 0 */
const contentful = require('../utils/contentful');
const algoliasearch = require('algoliasearch');

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_ADMIN_KEY,
);
const index = client.initIndex('products');

function clear() {
  return new Promise((resolve, reject) => {
    index.clearIndex((err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

function indexProducts(products) {
  return new Promise((resolve, reject) => {
    index.addObjects(products, (err, content) => {
      if (err) return reject(err);
      return resolve(content);
    });
  });
}

function getProducts() {
  return contentful.client.getEntries({
    content_type: 'product',
    limit: 1000,
    include: 2,
  })
    .then(response => response.items.map(item => ({
      sys: {
        id: item.sys.id,
      },
      fields: {
        views: 1,
        titel: item.fields.titel,
        images: !item.fields.images ? [] : item.fields.images.map(image => ({
          fields: image.fields,
        })),
        shortDescription: item.shortDescription,
        price: item.price,
        beforePrice: item.beforePrice,
        departments: item.departments,
        stockLevel: item.fields.stockLevel,
        rating: item.fields.rating,
        recommendations: item.fields.recommendations,
        content: !item.fields.content ? [] : item.fields.content.map(contentBlock => ({
          header: contentBlock.fields.header,
          sections: !contentBlock.fields.sections ? [] : contentBlock.fields.sections
            .map(section => ({
              header: section.fields.header,
              text: section.fields.text,
            })),
        })),
      },
    })));
}


exports.handler = (event, context, callback) => {
  const fetchAndClear = Promise.all([
    getProducts(),
    clear(),
  ]);
  fetchAndClear
    .then(([products]) => indexProducts(products))
    .then(response => callback(null, {
      statusCode: 200,
      body: JSON.stringify(response, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    .catch(callback);
};
