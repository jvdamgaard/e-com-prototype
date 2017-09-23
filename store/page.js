import shuffle from 'lodash.shuffle';
import products from '../mock/products';

export function state() {
  return {
    layout: 'frontpage',
    modules: [{
      id: 'productslider-1',
      type: 'ProductSlider',
      data: {
        header: '<span class="is-red">Spottilbud</span> de næste 7t 47min',
        products: shuffle(products).slice(0, 36),
      },
    }, {
      id: 'uniquesellingpoints-1',
      type: 'UniqueSellingPoints',
    }, {
      id: 'productslide-2',
      type: 'ProductSlider',
      data: {
        header: 'Vores mest populære varer',
        products: shuffle(products).slice(0, 36),
      },
    }, {
      id: 'productslider-3',
      type: 'ProductSlider',
      data: {
        header: 'Du kan måske også lide',
        products: shuffle(products).slice(0, 36),
      },
    }, {
      id: 'banner-1',
      type: 'Banner',
      data: {
        banners: [{
          id: 1,
          url: '/',
          image: {
            url: 'https://assets.booztcdn.com/cdn/campaigns/1505207753-w33_m_1e_da.gif',
            width: 2338,
            height: 1110,
          },
        }, {
          id: 2,
          url: '/',
          image: {
            url: 'https://assets.booztcdn.com/cdn/campaigns/1504786219-w37_m_1a_da.jpg',
            width: 2338,
            height: 1110,
          },
        }],
      },
    }, {
      id: 'productslide-4',
      type: 'ProductSlider',
      data: {
        header: 'Anbefalinger til dig i cykler',
        products: shuffle(products).slice(0, 36),
      },
    }, {
      id: 'productslider-5',
      type: 'ProductSlider',
      data: {
        header: 'Det trender lige nu',
        products: shuffle(products).slice(0, 36),
      },
    }],
  };
}

export function mutations() {}
