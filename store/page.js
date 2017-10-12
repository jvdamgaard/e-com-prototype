export function state() {
  return {
    layout: 'default',
    modules: [{
      id: 'frontpage-top-modul',
      type: 'FrontpageTop',
      data: {},
    }, {
      id: 'productslide-2',
      type: 'ProductSlider',
      data: {
        header: 'Vores mest populære varer',
        src: 'https://jvdamgaard.github.io/e-com-prototype/json/most-popular.json',
      },
    }, {
      id: 'uniquesellingpoints-1',
      type: 'UniqueSellingPoints',
    }, {
      id: 'productslider-1',
      type: 'ProductSlider',
      data: {
        header: '<span class="is-red">Spottilbud</span> de næste 7t 47min',
        src: 'https://jvdamgaard.github.io/e-com-prototype/json/offers.json',
      },
    }, {
      id: 'content-1',
      type: 'ContentContainer',
      data: {
        modules: [{
          type: 'Images',
          data: {
            fullWidth: true,
            images: [{
              url: 'https://f.nordiskemedier.dk/22mv6249df3c014b.jpg',
              width: 1200,
              height: 628,
            }, {
              url: 'https://jvdamgaard.github.io/e-com-prototype/images/nofu.jpg',
              width: 1200,
              height: 628,
            }],
          },
        }, {
          id: 'text-1',
          type: 'BodyText',
          data: {
            content: '<h2 class="is-h1">NOFU</h2><h2>Dansk design, som alle har råd til</h2><p>Danske NOFU skaber smukke, tidløse møbler, som alle har råd til. Produkterne vidner om designer Bertil Stams kærlighed til rene linjer og den høje kvalitet, der kendetegner dansk design. Bertil har tegnet på NOFU-kollektionen siden 2014, men det er først nu, de smukke produkter lanceres i Norden. <a href="/">Se hele NOFU serien</a></p>',
          },
        }, {
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
      id: 'productslider-nofu',
      type: 'ProductSlider',
      data: {
        header: 'Bedst sælgende i NOFU serien',
        src: 'https://jvdamgaard.github.io/e-com-prototype/json/nofu.json',
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
      id: 'productslider-3',
      type: 'ProductSlider',
      data: {
        header: 'Du kan måske også lide',
        src: 'https://jvdamgaard.github.io/e-com-prototype/json/recommendations.json',
      },
    }, {
      id: 'productslide-4',
      type: 'ProductSlider',
      data: {
        header: 'Anbefalinger til dig i cykler',
        src: 'https://jvdamgaard.github.io/e-com-prototype/json/recommended-bicycles.json',
      },
    }, {
      id: 'content-1',
      type: 'ContentContainer',
      data: {
        modules: [{
          id: 'text-1',
          type: 'BodyText',
          data: {
            content: '<h2 class="is-h1">VRS</h2><h2>Med på de nyeste tendenser</h2><p>VRS er lækkert modetøj til dig, som gerne vil være med på de seneste tendenser uden at betale for meget. Vi tilbyder et stort udvalg af modetøj, sko, tilbehør, undertøj og basistøj til hele familien. Og med op mod 100 nye styles hver uge, så der altid er noget nyt at komme efter i butikkerne. Alt sammen skabt af vore egne designere i gode materialer, med en god pasform og til en rigtig god pris. <a href="/">Se hele VRS kollektionen</a></p>',
          },
        }, {
          type: 'Images',
          data: {
            fullWidth: true,
            images: [{
              url: 'https://instagram.fcph3-1.fna.fbcdn.net/t51.2885-15/e35/21984919_619150525141625_6075077089520779264_n.jpg',
              width: 1080,
              height: 1080,
            }, {
              url: 'https://instagram.fcph3-1.fna.fbcdn.net/t51.2885-15/e35/17495071_407230232983531_2887631479469244416_n.jpg',
              width: 1080,
              height: 1080,
            }, {
              url: 'https://instagram.fcph3-1.fna.fbcdn.net/t51.2885-15/e35/18013921_1469721036411458_6034307331506831360_n.jpg',
              width: 1080,
              height: 1080,
            }, {
              url: 'https://instagram.fcph3-1.fna.fbcdn.net/t51.2885-15/e35/17934674_1440940599261171_630216790613426176_n.jpg',
              width: 1080,
              height: 1080,
            }],
          },
        }],
      },
    }, {
      id: 'productslider-5',
      type: 'ProductSlider',
      data: {
        header: 'Det trender lige nu',
        src: 'https://jvdamgaard.github.io/e-com-prototype/json/trending.json',
      },
    }],
  };
}

export function mutations() {}
