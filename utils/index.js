import axios from 'axios';

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

export function numberWithDots(x) {
  return x.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function resolveModulesData(res) {
  return Promise.all(res.data.modules.map((module) => {
    if (module.type === 'ProductSlider' && module.data.src) {
      return axios.get(module.data.src).then(sliderRes => ({
        ...module,
        data: {
          ...module.data,
          // Preload 6 items if slider is among top 4 moduls on page
          products: sliderRes.data,
        },
      }));
    }
    return module;
  }));
}
