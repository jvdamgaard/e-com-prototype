/* eslint no-param-reassign: 0 */
const contentful = require('../utils/contentful');

function getProducts() {
  return contentful.client.getEntries({
    content_type: 'product',
    limit: 1000,
    include: 2,
  })
    .then(response => response.items.map(item => ({
      id: item.sys.id,
      contentType: item.sys.contentType.id,
      titel: item.fields.titel,
      price: item.fields.price,
      departments: item.fields.departments,
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
    })));
}

function getBrands() {
  return contentful.client.getEntries({
    content_type: 'brand',
    limit: 1000,
    include: 2,
  })
    .then(response => response.items.map(item => ({
      id: item.sys.id,
      contentType: item.sys.contentType.id,
      titel: item.fields.titel,
      sections: !item.fields.sections ? [] : item.fields.sections.map(section => ({
        titel: section.fields.titel,
        modules: !section.fields.modules ? [] : section.fields.modules
          .filter(module => (module.sys.contentType.sys.id === 'text'))
          .map(module => ({ titel: module.fields.titel, content: module.fields.content })),
      })),
    })));
}

function getDepartments() {
  return contentful.client.getEntries({
    content_type: 'department',
    limit: 1000,
    include: 2,
  })
    .then(response => response.items.map(item => ({
      id: item.sys.id,
      contentType: item.sys.contentType.id,
      titel: item.fields.titel,
      sections: !item.fields.sections ? [] : item.fields.sections.map(section => ({
        titel: section.fields.titel,
        modules: !section.fields.modules ? [] : section.fields.modules
          .filter(module => (module.sys.contentType.sys.id === 'text'))
          .map(module => ({ titel: module.fields.titel, content: module.fields.content })),
      })),
    })));
}

exports.handler = (event, context, callback) => {
  const fetch = Promise.all([
    getProducts(),
    getBrands(),
    getDepartments(),
  ]);

  fetch
    .then(([products, brands, departments]) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify([
          ...departments,
          ...brands,
          ...products,
        ], null, 2),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })
    .catch(e => callback(e));
};
