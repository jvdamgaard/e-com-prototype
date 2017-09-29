/* eslint no-param-reassign: 0 */

export function state() {
  return [{
    titel: 'Elektronik',
    description: 'Bærbare, PC’er, Kabler',
    iconSrc: '/icons/electronic.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1483388147740-e5c70536042e?dpr=2&auto=format&fit=crop&w=500&h=1000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/29/HP_New_Logo_2D.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Canon_wordmark.svg' },
    ],
    subDepartments: [{
      titel: 'TV, foto og lyd',
      subDepartments: [
        { titel: 'Anlæg og højtalere' },
        { titel: 'DVD og Blu-Ray afspillere' },
        { titel: 'Film og TV-serier' },
        { titel: 'Fotoservice' },
        { titel: 'Høretelefoner' },
        { titel: 'Kamera og tilbehør' },
        { titel: 'Musik' },
        { titel: 'TV' },
        { titel: 'TV-ophæng' },
        { titel: 'TV-tilbehør' },
      ],
    }, {
      titel: 'Computere og gaming',
      subDepartments: [
        { titel: 'Computere' },
        { titel: 'Computertilbehør' },
        { titel: 'Harddiske og hardware' },
        { titel: 'iPad og tablets' },
        { titel: 'Konsoller og spil' },
        { titel: 'Printere og blæk' },
        { titel: 'Routere og netværk' },
      ],
    }, {
      titel: 'Husholdning',
      subDepartments: [
        { titel: 'Babyalarmer' },
        { titel: 'Batterier' },
        { titel: 'Elartikler' },
        { titel: 'Hårde hvidevarer' },
        { titel: 'Kaffe- og espressomaskiner' },
        { titel: 'Kombi- og mikrobølgeovne' },
        { titel: 'Køkkenapparater' },
        { titel: 'Strygning og rengøring' },
        { titel: 'Støvsugere' },
        { titel: 'Ure og vejrstationer' },
      ],
    }, {
      titel: 'Telefon og GPS',
      subDepartments: [
        { titel: 'GPS og løbeure' },
        { titel: 'Mobiltelefoner' },
        { titel: 'Telefontilbehør' },
        { titel: 'Powerbanks' },
      ],
    }, {
      titel: 'Inspiration',
      subDepartments: [
        { titel: 'Tilbud på elektronik' },
        { titel: 'Apple' },
      ],
    }],
  }, {
    titel: 'Mobil & tablet',
    description: 'Smartphones, Power banks',
    iconSrc: '/icons/mobile.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1439219970881-3727d2e3402a?dpr=2&auto=format&fit=crop&w=500&h=1000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    ],
    subDepartments: [{
      titel: 'TV, foto og lyd',
      subDepartments: [
        { titel: 'Anlæg og højtalere' },
        { titel: 'DVD og Blu-Ray afspillere' },
        { titel: 'Film og TV-serier' },
        { titel: 'Fotoservice' },
        { titel: 'Høretelefoner' },
        { titel: 'Kamera og tilbehør' },
        { titel: 'Musik' },
        { titel: 'TV' },
        { titel: 'TV-ophæng' },
        { titel: 'TV-tilbehør' },
      ],
    }],
  }, {
    titel: 'Bøger, Film & Musik',
    description: 'Literatur, Biografier',
    iconSrc: '/icons/books.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1499332251574-a76a01d733fc?dpr=2&auto=format&fit=crop&w=500&h=1634&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Computere og gaming',
      subDepartments: [
        { titel: 'Computere' },
        { titel: 'Computertilbehør' },
        { titel: 'Harddiske og hardware' },
        { titel: 'iPad og tablets' },
        { titel: 'Konsoller og spil' },
        { titel: 'Printere og blæk' },
        { titel: 'Routere og netværk' },
      ],
    }],
  }, {
    titel: 'Dagligvarer',
    description: 'Skønhed, Helbred',
    iconSrc: '/icons/food.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?dpr=2&auto=format&fit=crop&w=500&h=1000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/29/HP_New_Logo_2D.svg' },
    ],
    subDepartments: [{
      titel: 'Husholdning',
      subDepartments: [
        { titel: 'Babyalarmer' },
        { titel: 'Batterier' },
        { titel: 'Elartikler' },
        { titel: 'Hårde hvidevarer' },
        { titel: 'Kaffe- og espressomaskiner' },
        { titel: 'Kombi- og mikrobølgeovne' },
        { titel: 'Køkkenapparater' },
        { titel: 'Strygning og rengøring' },
        { titel: 'Støvsugere' },
        { titel: 'Ure og vejrstationer' },
      ],
    }],
  }, {
    titel: 'Mode',
    description: 'Tøj, Sko, Ure, Smykker',
    iconSrc: '/icons/fashion.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?dpr=2&auto=format&fit=crop&w=500&h=1000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Telefon og GPS',
      subDepartments: [
        { titel: 'GPS og løbeure' },
        { titel: 'Mobiltelefoner' },
        { titel: 'Telefontilbehør' },
        { titel: 'Powerbanks' },
      ],
    }],
  }, {
    titel: 'Bolig & indretning',
    description: 'Køkken, Møbler',
    iconSrc: '/icons/home.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1470274038469-958113db2384?dpr=2&auto=format&fit=crop&w=500&h=2000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Telefon og GPS',
      subDepartments: [
        { titel: 'GPS og løbeure' },
        { titel: 'Mobiltelefoner' },
        { titel: 'Telefontilbehør' },
        { titel: 'Powerbanks' },
      ],
    }],
  }, {
    titel: 'Børn',
    description: 'Legetøj, Tøj, Spil, Sko',
    iconSrc: '/icons/children.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1485783522162-1dbb8ffcbe5b?dpr=2&auto=format&fit=crop&w=500&h=994&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Telefon og GPS',
      subDepartments: [
        { titel: 'GPS og løbeure' },
        { titel: 'Mobiltelefoner' },
        { titel: 'Telefontilbehør' },
        { titel: 'Powerbanks' },
      ],
    }],
  }, {
    titel: 'Køretøjer',
    description: 'Cykler, Biltilbehør',
    iconSrc: '/icons/vehicles.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1452687459977-921193bf89b2?dpr=2&auto=format&fit=crop&w=500&h=1594&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Telefon og GPS',
      subDepartments: [
        { titel: 'GPS og løbeure' },
        { titel: 'Mobiltelefoner' },
        { titel: 'Telefontilbehør' },
        { titel: 'Powerbanks' },
      ],
    }],
  }, {
    titel: 'Tilbud',
    description: 'I alle afdelinger',
    iconSrc: '/icons/offers.png',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1459257831348-f0cdd359235f?dpr=2&auto=format&fit=crop&w=500&h=1000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Telefon og GPS',
      subDepartments: [
        { titel: 'GPS og løbeure' },
        { titel: 'Mobiltelefoner' },
        { titel: 'Telefontilbehør' },
        { titel: 'Powerbanks' },
      ],
    }],
  }];
}

export const mutations = {};
export const actions = {};
