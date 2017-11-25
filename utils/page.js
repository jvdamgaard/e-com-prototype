/* eslint no-param-reassign: 0 */
import marked from 'marked';
import * as contentful from '../plugins/contentful';
import { ProductSlider } from './product';

export function getPage(id, deep = false) {
  return contentful.deliveryClient
    .getEntries({ 'sys.id': id, include: deep ? 3 : 0 })
    .then((entries) => {
      if (!entries || entries.length === 0) {
        return Promise.reject();
      }
      return entries.items[0];
    });
}

export function Images(entry) {
  return {
    id: entry.sys.id,
    type: 'ContentImages',
    data: {
      fullWidth: entry.fields.fullWidth,
      images: entry.fields.images.map(image => ({
        url: image.fields.file.url,
      })),
    },
  };
}

export function Banner(entry) {
  return {
    id: entry.sys.id,
    type: 'Banner',
    noSpacingTop: !!entry.fields.noSpacingTop,
    noSpacingBottom: !!entry.fields.noSpacingBottom,
    data: {
      banners: entry.fields.images.map(image => ({
        id: image.sys.id,
        url: '/',
        image: {
          url: image.fields.file.url,
        },
      })),
    },
  };
}

export function UniqueSellingPoint(entry) {
  return {
    id: entry.sys.id,
    type: 'UniqueSellingPoints',
    data: {},
  };
}

export function Departments(entry) {
  return {
    id: entry.sys.id,
    type: 'Departments',
    data: {
      header: entry.fields.header,
    },
  };
}

export function LastSeenSlider(entry) {
  return {
    id: entry.sys.id,
    type: 'LastSeenSlider',
    data: {
      header: entry.fields.header,
    },
  };
}

export function Login(entry) {
  return {
    id: entry.sys.id,
    type: 'Login',
    data: {
      label: entry.fields.label,
      sublabel: entry.fields.sublabel,
    },
  };
}

export function Text(entry) {
  return {
    id: entry.sys.id,
    type: 'ContentText',
    data: {
      content: marked(entry.fields.content, { gfm: true }),
    },
  };
}

export function ContentBox(entry) {
  return {
    id: entry.sys.id,
    type: 'ContentBox',
    data: {
      header: entry.fields.header,
      text: entry.fields.text,
      buttonLabel: entry.fields.buttonLabel,
      link: entry.fields.link,
      imgSrc: entry.fields.image.fields.file.url,
    },
  };
}

export function ContentBoxes(entry) {
  return {
    id: entry.sys.id,
    type: 'ContentBoxes',
    data: {
      contentBoxes: entry.fields.contentBoxes.map(ContentBox),
    },
  };
}

export function Module(entry) {
  if (entry.sys.contentType.sys.id === 'productSlider') { return ProductSlider(entry); }
  if (entry.sys.contentType.sys.id === 'images') { return Images(entry); }
  if (entry.sys.contentType.sys.id === 'text') { return Text(entry); }
  if (entry.sys.contentType.sys.id === 'banner') { return Banner(entry); }
  if (entry.sys.contentType.sys.id === 'departments') { return Departments(entry); }
  if (entry.sys.contentType.sys.id === 'contentBoxes') { return ContentBoxes(entry); }
  if (entry.sys.contentType.sys.id === 'lastSeenSlider') { return LastSeenSlider(entry); }
  if (entry.sys.contentType.sys.id === 'login') { return Login(entry); }
  if (entry.sys.contentType.sys.id === 'uniqueSellingPoint') { return UniqueSellingPoint(entry); }
  return null;
}

export function Section(entry) {
  return {
    modules: entry.fields.modules.map(Module).filter(module => !!module),
    theme: entry.fields.theme || 'None',
    id: entry.sys.id,
  };
}

export function getPageSections(id) {
  return getPage(id, true)
    .then(page => page.fields.sections.map(Section));
}
