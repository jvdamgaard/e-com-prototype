const path = require('path');
const scrapeIt = require('scrape-it');
const toMarkdown = require('to-markdown');
const contentfulManagement = require('contentful-management');

if (process.argv.length !== 3) {
  console.error('Provide one and only one argument, which should be the url to scrape');
  process.exit();
}

const URL = process.argv[2];

if (!URL.startsWith('https://www.bilka.dk/')) {
  console.error('Provide a bilka.dk url as parameter');
  process.exit();
}

const client = contentfulManagement
  .createClient({ accessToken: process.env.CTF_CM_ACCESS_TOKEN });

function createImageAsset({ space, url }) {
  if (!url.startsWith('http')) {
    return Promise.resolve();
  }

  const extension = path.extname(url).replace('.', '');
  const filename = path.basename(url);
  const titel = path.basename(url, `.${extension}`);

  if (extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg') {
    return Promise.resolve();
  }

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

function createContentSection({ space, data, images }) {
  const imageLink = {
    sys: {
      id: images[0].sys.id,
      linkType: 'Asset',
      type: 'Link',
    },
  };
  return space.createEntry('productDetailDescriptionSection', {
    fields: {
      header: { 'da-DK': data.titel },
      image: { 'da-DK': imageLink },
      text: { 'da-DK': toMarkdown(data.content, { gfm: true }) },
    },
  })
    .then(entry => entry.publish())
    .then((entry) => {
      console.log('Created content section');
      return entry;
    });
}

function createContent({ space, data, images }) {
  return createContentSection({ space, data, images })
    .then((section) => {
      const sectionLink = {
        sys: {
          id: section.sys.id,
          linkType: 'Entry',
          type: 'Link',
        },
      };
      return space.createEntry('productDetailDescription', {
        fields: {
          header: { 'da-DK': 'Beskrivelse' },
          buttonText: { 'da-DK': 'Læs mere' },
          sections: { 'da-DK': [sectionLink] },
        },
      });
    })
    .then(entry => entry.publish())
    .then((entry) => {
      console.log('Created content');
      return entry;
    });
}

function createProduct({
  space, data, images, content,
}) {
  const imageLinks = images.map(image => ({
    sys: {
      id: image.sys.id,
      linkType: 'Asset',
      type: 'Link',
    },
  }));
  const contentLink = {
    sys: {
      id: content.sys.id,
      linkType: 'Entry',
      type: 'Link',
    },
  };
  space.createEntry('product', {
    fields: {
      titel: { 'da-DK': data.titel },
      shortDescription: { 'da-DK': data.shortDescription.substring(0, 256) },
      price: { 'da-DK': data.price },
      beforePrice: { 'da-DK': data.beforePrice },
      departments: { 'da-DK': data.departments.map(department => department.name) },
      stockLevel: { 'da-DK': 100 },
      rating: { 'da-DK': 4.3 },
      recommendations: { 'da-DK': 0.75 },
      images: { 'da-DK': imageLinks },
      content: { 'da-DK': [contentLink] },
    },
  })
    .then(entry => entry.publish())
    .then((entry) => {
      console.log('Created product', entry.sys.id);
      return entry;
    });
}

scrapeIt(URL, {
  titel: 'h1.bilka_main_heading',
  shortDescription: '.e-description',
  content: {
    selector: '.e-description',
    how: 'html',
  },
  images: {
    listItem: '.pdp_desk_media_pager li',
    data: {
      url: {
        selector: 'img',
        attr: 'src',
        convert: url => url.split('?')[0],
      },
    },
  },
  price: {
    selector: '.product-price-wrapper .p-price',
    convert: price => parseInt(price.replace('.', ''), 10),
  },
  beforePrice: {
    selector: '.product-price-wrapper em',
    convert: price => parseInt(price.replace('.', ''), 10),
  },
  departments: {
    listItem: '.bilka_breadcrumbs li',
    data: {
      name: {
        selector: 'a',
      },
    },
  },
})
  .then((data) => {
    console.log('Scraped', URL);
    return client.getSpace(process.env.CTF_SPACE_ID).then((space) => {
      // Create images
      Promise.all(data.images.map(image => createImageAsset({ space, url: image.url })))
        .then(images => images.filter(image => !!image))
        .then(images => createContent({ space, data, images })
          .then(content => createProduct({
            space, data, images, content,
          })));
    });
  })
  .catch(e => console.error(e));
