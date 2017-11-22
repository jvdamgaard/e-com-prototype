/* eslint no-param-reassign: 0 */
import marked from 'marked';
import * as contentful from '../plugins/contentful';
import { ProductSlider } from './product';

export function getPage(id, deep = false) {
  return contentful.deliveryClient
    .getEntries({ 'sys.id': id, include: deep ? 2 : 0 })
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
    type: 'Images',
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
    type: 'Text',
    data: {
      content: marked(entry.fields.content, { gfm: true }),
    },
  };
}

export function Content(entry) {
  return {
    id: entry.sys.id,
    type: 'ContentContainer',
    data: {
      modules: entry.fields.sections.map((section) => {
        if (section.sys.contentType.sys.id === 'images') {
          return Images(section);
        }
        if (section.sys.contentType.sys.id === 'text') {
          return Text(section);
        }
        return null;
      }).filter(module => !!module),
    },
  };
}

export function getPageModules(id) {
  return getPage(id, true).then(page => page.fields.modules.map((module) => {
    if (module.sys.contentType.sys.id === 'productSlider') { return ProductSlider(module); }
    if (module.sys.contentType.sys.id === 'content') { return Content(module); }
    if (module.sys.contentType.sys.id === 'banner') { return Banner(module); }
    if (module.sys.contentType.sys.id === 'departments') { return Departments(module); }
    if (module.sys.contentType.sys.id === 'lastSeenSlider') { return LastSeenSlider(module); }
    if (module.sys.contentType.sys.id === 'login') { return Login(module); }
    return null;
  }))
    .then(modules => modules.filter(module => !!module));
}
