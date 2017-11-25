/* eslint no-param-reassign: 0 */
import marked from 'marked';
import kebabCase from 'lodash/kebabCase';
import * as contentful from '../plugins/contentful';

function ProductDetailPageDescription(entry) {
  return {
    id: entry.sys.id,
    type: 'ProductDetailPageDescription',
    data: {
      ...entry.fields,
      sections: entry.fields.sections.map(section => ({
        id: section.sys.id,
        header: section.fields.header,
        text: marked(section.fields.text, { sanitize: true, breaks: true }),
        image: section.fields.image ? {
          src: section.fields.image.fields.file.url,
          width: section.fields.image.fields.file.details.image.width,
          height: section.fields.image.fields.file.details.image.height,
        } : null,
      })),
    },
  };
}

export function url({ titel, id }) {
  return `/produkt/${kebabCase(titel)}/${id}/`;
}

export function Product(entry) {
  return {
    id: entry.sys.id,
    titel: entry.fields.titel,
    shortDescription: entry.fields.shortDescription,
    price: entry.fields.price,
    rating: entry.fields.rating,
    recommendations: entry.fields.recommendations,
    beforePrice: entry.fields.beforePrice,
    images: entry.fields.images.map(image => image.fields.file.url),
    stock: {
      level: entry.fields.stockLevel,
      status: entry.fields.stockStatus,
    },
    label: {
      text: entry.fields.labelText,
      color: entry.fields.labelColor,
    },
    keySpecifications: entry.fields.keySpecifications ?
      entry.fields.keySpecifications.map(pair => pair.fields) :
      null,
    variants: entry.fields.variants ?
      entry.fields.variants.map(variant => ({
        ...variant.fields,
        items: variant.fields.items.map(item => ({
          ...item.fields,
          images: item.fields && item.fields.images ?
            item.fields.images.map(image => image.fields.file.url) :
            null,
        })),
      })) :
      null,
  };
}

function ProductDetailPageSummary(entry) {
  return {
    id: `${entry.sys.id}-summary`,
    type: 'ProductDetailPageSummary',
    data: {
      product: Product(entry),
      departments: entry.fields.departments,
    },
  };
}

export function getProducts(query, exclude) {
  return contentful.deliveryClient.getEntries({
    ...query,
    content_type: 'product',
    include: 1,
    'sys.id[nin]': exclude,
  });
}

export function ProductSlider(entry) {
  return {
    id: entry.sys.id,
    type: 'ProductSlider',
    data: {
      header: entry.fields.header,
      query: entry.fields.query,
    },
  };
}

export function ProductModules(entry) {
  const modules = [];

  // Summary
  modules.push(ProductDetailPageSummary(entry));

  // Content sections
  if (entry.fields.content) {
    entry.fields.content.forEach((content) => {
      modules.push(ProductDetailPageDescription(content));
    });
  }

  // Related products
  if (entry.fields.relatedProducts) {
    entry.fields.relatedProducts.forEach((slider) => {
      modules.push(ProductSlider(slider));
    });
  }

  return modules;
}

export function getProduct(id, deep = false) {
  return contentful.deliveryClient
    .getEntries({ 'sys.id': id, include: deep ? 2 : 0 })
    .then((entries) => {
      if (!entries || entries.length === 0) {
        return Promise.reject();
      }
      return entries.items[0];
    });
}


export function getProductSections(id) {
  return getProduct(id, true).then((entry) => {
    const sections = [];

    sections.push({
      modules: ProductModules(entry),
      theme: 'None',
      id: entry.sys.id,
    });

    sections.push({
      modules: [{
        id: `${entry.sys.id}-LastSeenSlider-module`,
        type: 'LastSeenSlider',
        data: {
          header: 'Du har senest kigget på',
        },
      }],
      theme: 'Dark',
      id: `${entry.sys.id}-LastSeenSlider-section`,
    });

    return sections;
  });
}

export function searchProducts(query) {
  return getProducts({ query, limit: 36 })
    .then(data => data.items.map(Product));
}
