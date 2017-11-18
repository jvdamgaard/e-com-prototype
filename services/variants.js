/* eslint no-param-reassign: 0 */
const path = require('path');
const scrapeIt = require('scrape-it');
const contentfulManagement = require('contentful-management');

if (process.argv.length < 6) {
  console.error('Wrong number of args. Should be "node variants {productId} {variantName} [{urls}]"');
  process.exit();
}

const PRODUCT_ID = process.argv[2];
const VARIANT_NAME = process.argv[3];
const VARIANT_URLS = process.argv.splice(4);

const client = contentfulManagement
  .createClient({ accessToken: process.env.CTF_CM_ACCESS_TOKEN });

function createImageAsset({ space, url }) {
  const extension = path.extname(url).replace('.', '');
  const filename = path.basename(url);
  const titel = path.basename(url, `.${extension}`);

  return space.createAsset({
    fields: {
      title: {
        'da-DK': titel,
      },
      file: {
        'da-DK': {
          contentType: 'image/jpeg',
          fileName: filename,
          upload: `${url}?fm=jpeg&w=2000`,
        },
      },
    },
  })
    .then(asset => asset.processForAllLocales({ processingCheckRetries: 15 }))
    .then(asset => asset.publish())
    .then((asset) => {
      console.log('Created image', url);
      return asset;
    });
}

function createVariantGroup({ space, variants }) {
  const variantLinks = variants.map(variant => ({
    sys: {
      id: variant.sys.id,
      linkType: 'Entry',
      type: 'Link',
    },
  }));
  return space.createEntry('variantGroup', {
    fields: {
      header: { 'da-DK': VARIANT_NAME },
      changePrice: { 'da-DK': false },
      default: { 'da-DK': 0 },
      items: { 'da-DK': variantLinks },
    },
  })
    .then(entry => entry.publish())
    .then((entry) => {
      console.log('Created variant group "', VARIANT_NAME, '" with', variants.length, 'variants');
      return entry;
    });
}

function createVariant({ space, url }) {
  return scrapeIt(url, {
    description: {
      selector: '.variantSelector select option:selected',
      attr: 'value',
    },
    images: {
      listItem: '.pdp_desk_media_pager li',
      data: {
        url: {
          selector: 'img',
          attr: 'src',
          convert: src => src.split('?')[0],
        },
      },
    },
  })
    .then(data => Promise.all(data.images.map(image => createImageAsset({ space, url: image.url })))
      .then((images) => {
        const imageLinks = images.map(image => ({
          sys: {
            id: image.sys.id,
            linkType: 'Asset',
            type: 'Link',
          },
        }));
        return space.createEntry('variant', {
          fields: {
            description: { 'da-DK': data.description },
            images: { 'da-DK': imageLinks },
          },
        });
      }))
    .then(entry => entry.publish())
    .then((entry) => {
      console.log('Created variant group');
      return entry;
    });
}

function updateProduct({
  space, variantGroup,
}) {
  const variantGroupLink = {
    sys: {
      id: variantGroup.sys.id,
      linkType: 'Entry',
      type: 'Link',
    },
  };
  space.getEntry(PRODUCT_ID)
    .then((entry) => {
      entry.fields.variants = { 'da-DK': [variantGroupLink] };
      return entry.update();
    })
    .then(entry => entry.publish())
    .then((entry) => {
      console.log('Update product with variants', entry.sys.id);
      return entry;
    });
}

client.getSpace(process.env.CTF_SPACE_ID).then((space) => {
  // Create images
  Promise.all(VARIANT_URLS.map(url => createVariant({ space, url })))
    .then(variants => createVariantGroup({ space, variants })
      .then(variantGroup => updateProduct({
        space, variantGroup,
      })));
})
  .catch(e => console.error(e));
