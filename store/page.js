import shuffle from 'lodash/shuffle';
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
      id: 'content-1',
      type: 'Content',
      data: {
        modules: [{
          id: 'image-1',
          type: 'Images',
          data: {
            fullWidth: true,
            images: [{
              url: '/images/nofu.jpg',
              width: 1146,
              height: 380,
            }],
          },
        }, {
          id: 'text-1',
          type: 'BodyText',
          data: {
            content: '<h2 class="is-h1">NOFU</h2><h2>Dansk design, som alle har råd til</h2><p>Danske NOFU skaber smukke, tidløse møbler, som alle har råd til. Produkterne vidner om designer Bertil Stams kærlighed til rene linjer og den høje kvalitet, der kendetegner dansk design. Bertil har tegnet på NOFU-kollektionen siden 2014, men det er først nu, de smukke produkter lanceres i Norden.</p>',
          },
        }, {
          id: 'image-1',
          type: 'Images',
          data: {
            fullWidth: true,
            images: [{
              url: 'http://nofu.shop/media/inspiration/inspiration/4.jpg',
              width: 1146,
              height: 664,
            }, {
              url: 'http://nofu.shop/media/inspiration/inspiration/5.jpg',
              width: 1146,
              height: 664,
            }, {
              url: 'http://nofu.shop/media/inspiration/inspiration/7.jpg',
              width: 1146,
              height: 664,
            }, {
              url: 'http://nofu.shop/media/inspiration/inspiration/9.jpg',
              width: 1146,
              height: 664,
            }],
          },
        }],
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
