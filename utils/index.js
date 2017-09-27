export function noop() {}

export function getDataFromCss(attribute, fallback = null) {
  try {
    const content = window
      .getComputedStyle(document.body, ':before')
      .getPropertyValue('content');
    const parsedContent = JSON.parse(JSON.parse(content));

    return parsedContent[attribute] || fallback;
  } catch (e) {
    return fallback;
  }
}

export function loadImage(src) {
  return new Promise((resolve) => {
    const downloadingImage = new Image();
    downloadingImage.onload = resolve;
    downloadingImage.src = src;
  });
}
