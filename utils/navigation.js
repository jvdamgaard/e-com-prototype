/* eslint no-param-reassign: 0 */
import kebabCase from 'lodash/kebabCase';
import * as contentful from '../plugins/contentful';

function entryUrl(entry) {
  if (!entry) {
    return '/';
  }
  let type = entry.sys.contentType.sys.id;
  if (type === 'department') {
    type = 'afdeling';
  }
  if (type === 'productListPage') {
    type = 'produkter';
  }
  if (type === 'product') {
    type = 'produkt';
  }
  return `/${kebabCase(type)}/${kebabCase(entry.fields.titel)}/${entry.sys.id}/`;
}

export function NavigationLink(entry) {
  return {
    id: entry.sys.id,
    titel: entry.fields.titel,
    url: entryUrl(entry),
    imageUrl: entry.fields.image ? entry.fields.image.fields.file.url : null,
  };
}

export function NavigationLinks(entry) {
  return {
    id: entry.sys.id,
    type: 'navigationLinks',
    data: {
      header: entry.fields.header,
      links: entry.fields.links ? entry.fields.links.map(NavigationLink) : [],
    },
  };
}

export function NavigationBanner(entry) {
  return {
    id: entry.sys.id,
    header: entry.fields.header,
    headerColor: entry.fields.headerColor || 'Black',
    url: entryUrl(entry.fields.link),
    imageUrl: entry.fields.image ? entry.fields.image.fields.file.url : null,
  };
}

export function NavigationBanners(entry) {
  return {
    id: entry.sys.id,
    type: 'navigationBanners',
    data: {
      banners: entry.fields.banners.map(NavigationBanner),
    },
  };
}

function NavigationSection(entry) {
  const type = entry.sys.contentType.sys.id;

  if (type === 'navigationLinks') {
    return NavigationLinks(entry);
  }
  if (type === 'navigationBanners') {
    return NavigationBanners(entry);
  }
}

export function NavigationDepartment(entry) {
  return {
    id: entry.sys.id,
    header: entry.fields.header,
    imageUrl: entry.fields.image ? entry.fields.image.fields.file.url : null,
    sections: entry.fields.sections
      ? entry.fields.sections.map(NavigationSection).filter(section => !!section)
      : [],
  };
}

export async function getNavigationEntry(id) {
  const entries = await contentful.deliveryClient
    .getEntries({ 'sys.id': id, include: 4 });

  if (!entries || entries.length === 0) {
    return null;
  }

  return entries.items[0];
}


export async function getNavigation(id) {
  const entry = await getNavigationEntry(id);
  return {
    id: entry.sys.id,
    header: entry.fields.header,
    departments: entry.fields.departments.map(NavigationDepartment),
  };
}
