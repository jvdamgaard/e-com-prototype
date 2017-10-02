/* eslint no-param-reassign: 0 */

export function state() {
  return [{
    titel: 'Elektronik',
    description: 'Telfon, Computer, TV, Husholding',
    iconSrc: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'http://static1.businessinsider.com/image/59b8459838d20d3c098b509c-2400/gettyimages-846148982.jpg',
      btnLabel: 'Bestil iPhone X nu',
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
    titel: 'Bolig & indretning',
    description: 'Bord, Stol, Sofa, Seng',
    iconSrc: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://f.nordiskemedier.dk/22mv6249df3c014b.jpg',
      btnLabel: 'NOFU - dansk design',
    },
    brands: [
      { imgSrc: 'https://foetexdk.imgix.net/medias/sys_master/root/h4d/hb9/9651273531422/Karup-logo.jpg' },
      { imgSrc: 'http://nofugroup.com/wp-content/uploads/2016/11/NOFU-LOGO-300x300.png' },
      { imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/61WG0fFONaL._SX466_.jpg' },
    ],
    subDepartments: [{
      titel: 'Rum',
      subDepartments: [
        { titel: 'Badeværelse' },
        { titel: 'Børneværelse' },
        { titel: 'Dagligstue' },
        { titel: 'Entre' },
        { titel: 'Kontor' },
        { titel: 'Køkken' },
        { titel: 'Soveværelse' },
        { titel: 'Spisestue' },
        { titel: 'Teenageværelse' },
      ],
    }, {
      titel: 'Møbler',
      subDepartments: [
        { titel: 'Borde' },
        { titel: 'Børnemøbler' },
        { titel: 'Entremøbler' },
        { titel: 'Møbelpleje' },
        { titel: 'Opbevaring' },
        { titel: 'Senge og madrasser' },
        { titel: 'Sofaer' },
        { titel: 'Spisebordssæt' },
        { titel: 'Stole' },
        { titel: 'Alle møbler' },
      ],
    }, {
      titel: 'Boligindretning og tekstil',
      subDepartments: [
        { titel: 'Bademåtter' },
        { titel: 'Belysning' },
        { titel: 'Galleri og brugskunst' },
        { titel: 'Duge og dækkeservietter' },
        { titel: 'Dyner og puder' },
        { titel: 'Gardiner og alupersienner' },
        { titel: 'Glastavler og whiteboards' },
        { titel: 'Håndklæder' },
        { titel: 'Indendørsmaling' },
        { titel: 'Køkkentekstiler' },
        { titel: 'Pyntepuder' },
        { titel: 'Sengetøj og lagner' },
        { titel: 'Sy, strik & hækle' },
        { titel: 'Tæpper, skind og plaider' },
      ],
    }, {
      titel: 'Køkkenudstyr og bad',
      subDepartments: [
        { titel: 'Badeværelsestilbehør' },
        { titel: 'Bagning og skåle' },
        { titel: 'Bestik og service' },
        { titel: 'Elapparater' },
        { titel: 'Glas, skåle og porcelæn' },
        { titel: 'Gryder og pander' },
        { titel: 'Køkkenbeholdere' },
        { titel: 'Køkkenredskaber' },
      ],
    }, {
      titel: 'Inspiration',
      subDepartments: [
        { titel: 'Bolig brands' },
        { titel: 'Tilbud på bolig' },
        { titel: 'Shop efter boligstil' },
        { titel: 'Strikkeopskrifter' },
        { titel: 'Skarpe tilbud på elapparater' },
      ],
    }],
  }, {
    titel: 'Have',
    description: 'Grill, Havemøbel, Haveredskaber',
    iconSrc: 'https://images.unsplash.com/photo-1481402665672-0a280f0e9845?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://bilkadk.imgix.net/medias/sys_master/root/he5/hc4/9721975210014.jpg?w=1050&h=1050&auto=format&fm=jpg',
      btnLabel: 'Kun 2.999,-',
    },
    brands: [
      { imgSrc: 'https://cdn.worx.com/skin/frontend/positec/default/images/positec/worx-small-logo.1504715396.png' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/en/b/bf/Bosch-brand.svg' },
    ],
    subDepartments: [{
      titel: 'Havemaskiner og redskaber',
      subDepartments: [
        { titel: 'Plæneklippere' },
        { titel: 'Robotplæneklippere' },
        { titel: 'Græstrimmere' },
        { titel: 'Hækkeklippere' },
        { titel: 'Havetraktorer' },
        { titel: 'Vertikalskærer' },
        { titel: 'Havefræsere' },
        { titel: 'Fejemaskiner og sneslynger' },
        { titel: 'Motorsave' },
        { titel: 'Brændekløvere' },
        { titel: 'Løvsugere' },
        { titel: 'Kompostkværne' },
        { titel: 'Pumper' },
        { titel: 'Haveredskaber' },
        { titel: 'Tilbehør til havemaskine' },
      ],
    }, {
      titel: 'Haveindretning og planter',
      subDepartments: [
        { titel: 'Bigbags' },
        { titel: 'Blomsterløg og frø' },
        { titel: 'Diverse haveindretning' },
        { titel: 'Drivhuse og tilbehør' },
        { titel: 'Flag og flagstænger' },
        { titel: 'Hegn og afskærmning' },
        { titel: 'Højbede og blomsterkasser' },
        { titel: 'Planter og træer' },
        { titel: 'Udendørslamper' },
        { titel: 'Vandspil' },
      ],
    }, {
      titel: 'Havemøbler og grill',
      subDepartments: [
        { titel: 'Bord-bænkesæt' },
        { titel: 'Grill og grilltilbehør' },
        { titel: 'Havehynder og hyndebokse' },
        { titel: 'Havemøbler' },
        { titel: 'Hængekøjer' },
        { titel: 'Markiser og tilbehør' },
        { titel: 'Parasoller og -fødder' },
        { titel: 'Pavilloner' },
        { titel: 'Terrassevarmere' },
        { titel: 'Terrasseoverdækning' },
        { titel: 'Udendørs møbelpleje' },
      ],
    }, {
      titel: 'Inspiration',
      subDepartments: [
        { titel: 'Claus Dalby' },
        { titel: 'Black and Decker konkurrence' },
        { titel: 'Shop looket med PLUS' },
        { titel: 'Året i haven' },
        { titel: 'Havemaskine- og elværktøj batterifamilier' },
      ],
    }],
  }, {
    titel: 'Leg',
    description: 'Legetøj, Trampolin, Lønehjul, Legehus',
    iconSrc: 'https://images.unsplash.com/photo-1503739171234-327ce271626f?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1485783522162-1dbb8ffcbe5b?dpr=2&auto=format&fit=crop&w=500&h=994&q=80&cs=tinysrgb&crop=',
      btnLabel: '25% på LEGO lige nu',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Nerf_logo.svg' },
      { imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/c/ce/Disney.svg/revision/latest/scale-to-width-down/640?cb=20170506132802' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Brio_Logo.svg' },
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Playmobil_logo.svg' },
    ],
    subDepartments: [{
      titel: 'Legetøj',
      subDepartments: [
        { titel: 'Babylegetøj' },
        { titel: 'Bamser' },
        { titel: 'Dukker og tilbehør' },
        { titel: 'Fjernstyret legetøj' },
        { titel: 'Familiespil' },
        { titel: 'Kreativt legetøj' },
        { titel: 'Legetøjsbiler og legetøjstog' },
        { titel: 'Legetøjsfigurer' },
        { titel: 'LEGO' },
        { titel: 'Rolleleg' },
        { titel: 'Spilleborde og dart' },
      ],
    }, {
      titel: 'Udendørs leg',
      subDepartments: [
        { titel: 'Børne bord-bænkesæt' },
        { titel: 'Børnecykler' },
        { titel: 'Børnekøretøjer' },
        { titel: 'Fodboldmål' },
        { titel: 'Hoppeborge' },
        { titel: 'Gynger og rutsjebaner' },
        { titel: 'Legehuse' },
        { titel: 'Legepladser til institutioner' },
        { titel: 'Legetårne' },
        { titel: 'Løbehjul' },
        { titel: 'Sandkasser og strandlegetøj' },
        { titel: 'Trampoliner' },
        { titel: 'Udendørsspil' },
        { titel: 'Vandleg og pools' },
      ],
    }, {
      titel: 'Alder',
      subDepartments: [
        { titel: 'Alder' },
        { titel: '0-6 måneder' },
        { titel: '7-12 måneder' },
        { titel: '1-2 år' },
        { titel: '3-4 år' },
        { titel: '5-6 år' },
        { titel: '7-8 år' },
        { titel: '9-10 år' },
        { titel: '10+ år' },
      ],
    }, {
      titel: 'Inspiration',
      subDepartments: [
        { titel: 'Børnebøger' },
        { titel: 'Dåbsgaver' },
        { titel: 'Mærker' },
        { titel: 'Tilbud på legetøj' },
        { titel: 'Julekalendere' },
      ],
    }],
  }, {
    titel: 'Fritid og skødhed',
    description: 'Cykel, Makeup, Tasker',
    iconSrc: 'https://images.unsplash.com/photo-1452727229762-7380dd7ba044?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?dpr=2&auto=format&fit=crop&w=500&h=1000&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/29/HP_New_Logo_2D.svg' },
    ],
    subDepartments: [{
      titel: 'Cykler og motion',
      subDepartments: [
        { titel: 'Cykler' },
        { titel: 'Cykeludstyr' },
        { titel: 'Personlige hjælpemidler' },
        { titel: 'Træningsudstyr' },
      ],
    }, {
      titel: 'Sundhed og velvære',
      subDepartments: [
        { titel: 'Blodtryk og blodsukker' },
        { titel: 'Kosttilskud' },
        { titel: 'Massageapparater' },
        { titel: 'Nupo' },
        { titel: 'Prævention' },
        { titel: 'Sportsernæring' },
        { titel: 'Varmetæpper og varmepuder' },
        { titel: 'Vitaminer og mineraler' },
        { titel: 'Vægte' },
      ],
    }, {
      titel: 'Familie og udeliv',
      subDepartments: [
        { titel: 'Autostole' },
        { titel: 'Campingudstyr' },
        { titel: 'Dyremad og -artikler' },
        { titel: 'Fiskeudstyr' },
        { titel: 'Jagt' },
        { titel: 'Klap- og barnevogne' },
        { titel: 'Soveposer' },
        { titel: 'Telte' },
        { titel: 'Babyudstyr' },
      ],
    }, {
      titel: 'Personlig pleje',
      subDepartments: [
        { titel: 'Ansigtspleje' },
        { titel: 'Hårpleje' },
        { titel: 'Kropspleje' },
        { titel: 'Makeup' },
        { titel: 'Parfume og deodorant' },
        { titel: 'Solpleje' },
        { titel: 'Tandpleje' },
        { titel: 'Toilettasker og beautybokse' },
        { titel: 'Øvrige apparater' },
        { titel: 'Alt til mænd' },
      ],
    }, {
      titel: 'Tasker og accessories',
      subDepartments: [
        { titel: 'Kufferter og trolleys' },
        { titel: 'Paraplyer' },
        { titel: 'Rygsække og skoletasker' },
        { titel: 'Sportstasker' },
        { titel: 'Toilettasker og beautybokse' },
        { titel: 'Ure' },
      ],
    }],
  }, {
    titel: 'Vin og spiritus',
    description: 'Rødvin, Champagne, Rom, Cognac',
    iconSrc: 'https://images.unsplash.com/photo-1485828052706-d62c6a23905f?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?dpr=1&auto=compress,format&fit=crop&w=500&h=&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Vin',
      subDepartments: [
        { titel: 'Dessertvin' },
        { titel: 'Hedvin' },
        { titel: 'Hvidvin' },
        { titel: 'Mousserende vin' },
        { titel: 'Rosévin' },
        { titel: 'Rødvin' },
        { titel: 'Anmeldte vine' },
        { titel: 'Eksklusive vine' },
        { titel: 'Bag in box' },
        { titel: 'Vin gaveæsker' },
        { titel: 'Restsalg - Spar min. 25%' },
      ],
    }, {
      titel: 'Spiritus',
      subDepartments: [
        { titel: 'Absinth' },
        { titel: 'Armagnac' },
        { titel: 'Bitter' },
        { titel: 'Brandy' },
        { titel: 'Calvados' },
        { titel: 'Cognac' },
        { titel: 'Gin' },
        { titel: 'Grappa' },
        { titel: 'Likør' },
        { titel: 'Rom' },
        { titel: 'Shots' },
        { titel: 'Sirup og mixer' },
        { titel: 'Snaps' },
        { titel: 'Tequila' },
        { titel: 'Vodka' },
        { titel: 'Whiskey' },
      ],
    }, {
      titel: 'Inspiration',
      subDepartments: [
        { titel: 'Den store drue-guide' },
        { titel: 'Vin & mad' },
        { titel: 'Se udvalget af Amarone' },
        { titel: 'Se udvalget af Champagne' },
        { titel: 'Se udvalget af økologiske vine' },
        { titel: '8 vinglas du skal kende' },
        { titel: '5 min. guide til mousserende vin' },
        { titel: 'Alle vinguides' },
        { titel: 'Tilbehør til vin og spiritus' },
        { titel: 'Tilbud på vin & spiritus' },
      ],
    }],
  }, {
    titel: 'Hvidevarer',
    description: 'Vaskemaskine, Komfur, Køleskab',
    iconSrc: 'https://images.unsplash.com/photo-1502849394214-c4b6352145ee?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1476055439777-977cdf3a5699?dpr=1&auto=compress,format&fit=crop&w=500&h=&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Vaskemaskiner og tumblere',
      subDepartments: [
        { titel: 'Frontbetjente vaskemaskiner' },
        { titel: 'Topbetjente vaskemaskiner' },
        { titel: 'Vaske/tørremaskiner' },
        { titel: 'Aftrækstumblere' },
        { titel: 'Kondenstumblere' },
        { titel: 'Tørreskabe' },
      ],
    }, {
      titel: 'Komfurer og emhætter',
      subDepartments: [
        { titel: 'Glaskeramiske komfurer' },
        { titel: 'Induktionskomfurer' },
        { titel: 'Gaskomfurer' },
        { titel: 'Frithængende emhætter' },
        { titel: 'Væghængt emhætte' },
        { titel: 'Indbygningsemhætte' },
      ],
    }, {
      titel: 'Opvaskemaskiner',
      subDepartments: [
        { titel: 'Indbygningsopvasker' },
        { titel: 'Integrerbar opvasker' },
        { titel: 'Smalle opvaskere' },
        { titel: 'Bordopvaskere' },
        { titel: 'Fritstående opvaskere' },
      ],
    }, {
      titel: 'Køl og frys',
      subDepartments: [
        { titel: 'Køleskabe' },
        { titel: 'Køle/fryseskabe' },
        { titel: 'Fryseskabe' },
        { titel: 'Kummefrysere' },
        { titel: 'Vinkøleskabe' },
        { titel: 'Amerikanerskabe' },
      ],
    }, {
      titel: 'Ovne og kogeplader',
      subDepartments: [
        { titel: 'Indbygningsovne' },
        { titel: 'Kombiovne' },
        { titel: 'Dampovne' },
        { titel: 'Induktionskogeplader' },
        { titel: 'Glaskeramiske kogeplader' },
        { titel: 'Gaskogeplader' },
      ],
    }],
  }, {
    titel: 'Byggemarked',
    description: 'Værktøj, Maling, Big bag, VVS',
    iconSrc: 'https://images.unsplash.com/photo-1480090962546-e96bb84f6021?dpr=1&auto=compress,format&fit=crop&w=200&h=&q=80&cs=tinysrgb&crop=',
    promotion: {
      imageSrc: 'https://images.unsplash.com/photo-1454694220579-9d6672b1ec2a?dpr=1&auto=compress,format&fit=crop&w=500&h=&q=80&cs=tinysrgb&crop=',
    },
    brands: [
      { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    ],
    subDepartments: [{
      titel: 'Byg',
      subDepartments: [
        { titel: 'Vinduer og døre' },
        { titel: 'Belægningssten og fliser' },
        { titel: 'Redskabsskure og tilbehør' },
        { titel: 'Facadebeklædning' },
        { titel: 'Porte og garage' },
        { titel: 'Stiger' },
        { titel: 'Trailere og autoudstyr' },
        { titel: 'Lofter' },
        { titel: 'Hytter' },
        { titel: 'Alarmer og sikkerhed' },
        { titel: 'Postkasser' },
        { titel: 'Vildmarksbade' },
        { titel: 'Isolering og tilbehør' },
      ],
    }, {
      titel: 'Vandforsyning',
      subDepartments: [
        { titel: 'Rør og fittings' },
        { titel: 'Vandmålere og målerbrønde' },
        { titel: 'Ventiler og pumper' },
      ],
    }, {
      titel: 'Maling og træbeskyttelse',
      subDepartments: [
        { titel: 'Træbeskyttelse og facademaling' },
        { titel: 'Indendørsmaling' },
        { titel: 'Maleudstyr' },
        { titel: 'Rengøringsprodukter' },
      ],
    }, {
      titel: 'VVS',
      subDepartments: [
        { titel: 'Afløb og gulvafløb' },
        { titel: 'Rør og fittings' },
        { titel: 'Armaturer' },
        { titel: 'Brusekabiner og vægge' },
        { titel: 'Brus' },
        { titel: 'Håndklæderadiatorer' },
        { titel: 'Indbygningscisterner og tilbehør' },
        { titel: 'Spa og badekar' },
        { titel: 'Toiletter, sæder og cisterner' },
        { titel: 'Vaske' },
        { titel: 'Tag og facade' },
        { titel: 'Badeværelsesmøbler' },
      ],
    }, {
      titel: 'Værktøj og værksted',
      subDepartments: [
        { titel: 'Beskyttelsesudstyr' },
        { titel: 'Dørklokker' },
        { titel: 'Generatorer' },
        { titel: 'Ledninger og stik' },
        { titel: 'Låse og værdiskabe' },
        { titel: 'Væg og tapet' },
        { titel: 'Værkstedsinventar' },
        { titel: 'Værktøj' },
      ],
    }],
  }, {
    titel: 'Tilbud',
    description: 'Fra alle afdelinger',
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
