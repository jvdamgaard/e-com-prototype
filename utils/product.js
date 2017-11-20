/* eslint no-param-reassign: 0 */
import marked from 'marked';
import kebabCase from 'lodash/kebabCase';
import * as contentful from '../plugins/contentful';

function ProductDetailPageDescription(content) {
  return {
    id: content.sys.id,
    type: 'ProductDetailPageDescription',
    data: {
      ...content.fields,
      sections: content.fields.sections.map(section => ({
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

export function Product(product) {
  return {
    id: product.sys.id,
    titel: product.fields.titel,
    shortDescription: product.fields.shortDescription,
    price: product.fields.price,
    rating: product.fields.rating,
    recommendations: product.fields.recommendations,
    beforePrice: product.fields.beforePrice,
    images: product.fields.images.map(image => image.fields.file.url),
    stock: {
      level: product.fields.stockLevel,
      status: product.fields.stockStatus,
    },
    label: {
      text: product.fields.labelText,
      color: product.fields.labelColor,
    },
    keySpecifications: product.fields.keySpecifications ?
      product.fields.keySpecifications.map(pair => pair.fields) :
      null,
    variants: product.fields.variants ?
      product.fields.variants.map(variant => ({
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

function ProductDetailPageSummary(product) {
  return {
    id: 'product-summary',
    type: 'ProductDetailPageSummary',
    data: {
      product: Product(product),
      departments: product.fields.departments,
    },
  };
}

export function getProducts(query, exclude) {
  return contentful.deliveryClient
    .getEntries({
      ...query,
      content_type: 'product',
      include: 1,
      'sys.id[nin]': exclude,
    });
}

export function ProductSlider(slider) {
  return {
    id: slider.sys.id,
    type: 'ProductSlider',
    data: {
      header: slider.fields.header,
      query: slider.fields.query,
    },
  };
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

export function getProductModules(id) {
  return getProduct(id, true).then((product) => {
    const modules = [];

    // Summary
    modules.push(ProductDetailPageSummary(product));

    // Content sections
    if (product.fields.content) {
      product.fields.content.forEach((content) => {
        modules.push(ProductDetailPageDescription(content));
      });
    }

    // Related products
    if (product.fields.relatedProducts) {
      product.fields.relatedProducts.forEach((slider) => {
        modules.push(ProductSlider(slider));
      });
    }

    return modules;
  });
}

export function searchProducts(query) {
  return getProducts({ query, limit: 36 })
    .then(data => data.items.map(Product));
}
