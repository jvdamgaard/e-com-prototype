/* eslint no-param-reassign: 0 */
import marked from 'marked';
import kebabCase from 'lodash/kebabCase';
import contentful from './contentful';
import { ProductSlider } from './product';

function entryUrl(entry) {
  let type = entry.sys.contentType.sys.id;
  if (type === 'department') {
    type = 'afdeling';
  }
  if (type === 'productListPage') {
    type = 'produkter';
  }
  return `/${kebabCase(type)}/${kebabCase(entry.fields.titel)}/${entry.sys.id}/`;
}

export async function getPageEntry(id, deep = false) {
  const entries = await contentful.client
    .getEntries({ 'sys.id': id, include: deep ? 3 : 0 });

  if (!entries || entries.length === 0) {
    return null;
  }

  return entries.items[0];
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
      buttonLabel: entry.fields.buttonLabel,
      text: entry.fields.text,
      link: entry.fields.link,
      header: entry.fields.header,
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
      links: entry.fields.links ? entry.fields.links.map(link => ({
        titel: link.fields.titel,
        image: link.fields.image.fields.file.url,
        url: entryUrl(link),
        hasEnvironmentImage: !!link.fields.hasEnvironmentImage,
      })) : [],
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
      fullWidth: !!entry.fields.fullWidth,
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

export async function Module(entry) {
  let module = null;
  if (entry.sys.contentType.sys.id === 'productSlider') { module = await ProductSlider(entry); }
  if (entry.sys.contentType.sys.id === 'images') { module = await Images(entry); }
  if (entry.sys.contentType.sys.id === 'text') { module = await Text(entry); }
  if (entry.sys.contentType.sys.id === 'banner') { module = await Banner(entry); }
  if (entry.sys.contentType.sys.id === 'departments') { module = await Departments(entry); }
  if (entry.sys.contentType.sys.id === 'contentBoxes') { module = await ContentBoxes(entry); }
  if (entry.sys.contentType.sys.id === 'lastSeenSlider') { module = await LastSeenSlider(entry); }
  if (entry.sys.contentType.sys.id === 'login') { module = await Login(entry); }
  if (entry.sys.contentType.sys.id === 'uniqueSellingPoint') { module = await UniqueSellingPoint(entry); }
  return module;
}

export async function Section(entry) {
  const promises = entry.fields.modules.map(Module);
  const modules = await Promise.all(promises);
  return {
    modules: modules.filter(module => !!module),
    theme: entry.fields.theme || 'None',
    noTopPadding: !!entry.fields.noTopPadding,
    noBottomPadding: !!entry.fields.noBottomPadding,
    id: entry.sys.id,
  };
}

function Department(entry) {
  return {
    titel: entry.fields.titel,
    url: entryUrl(entry),
  };
}

export async function getPage(id) {
  const page = await getPageEntry(id, true);
  const promises = page.fields.sections ? page.fields.sections.map(Section) : [];
  const sections = await Promise.all(promises);
  const departments = page.fields.parents ? page.fields.parents.map(Department) : [];
  departments.unshift({
    titel: 'Forside',
    url: '/',
  });
  return {
    sections,
    departments,
    titel: page.fields.titel,
  };
}
