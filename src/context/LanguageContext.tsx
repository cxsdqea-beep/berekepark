import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'kz' | 'en';

export interface Translations {
  nav: {
    tour3d: string;
    concept: string;
    advantages: string;
    layouts: string;
    gallery: string;
    construction: string;
    location: string;
    contacts: string;
    consultation: string;
    siteNavigation: string;
    salesOffice: string;
    callNow: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleSub: string;
    desc: string;
    btnLayouts: string;
    btn3D: string;
    btnVisit: string;
    stats: {
      ceiling: string;
      ceilingSub: string;
      neighbors: string;
      neighborsSub: string;
      park: string;
      parkSub: string;
      infra: string;
      infraSub: string;
    };
  };
  model3d: {
    badge: string;
    title: string;
    subtitle: string;
    btnSkip: string;
    hintGesture: string;
    hintInteracting: string;
    statusDynamic: string;
    statusDone: string;
    btnAutoStart: string;
    btnAutoStop: string;
    btnContinue: string;
    btnBookVisit: string;
    scrollHint: string;
    scrollHintDone: string;
    scrollHintMobile: string;
    phases: {
      badge: string;
      title: string;
      desc: string;
      focusPoint: string;
    }[];
  };
  concept: {
    badge: string;
    title: string;
    desc: string;
    quoteTitle: string;
    quoteSub: string;
    specHeader: string;
    specSub: string;
  };
  layouts: {
    badge: string;
    title: string;
    desc: string;
    tabAll: string;
    tab2Rooms: string;
    tab3Rooms: string;
    tab4Rooms: string;
    tabPenthouses: string;
    totalArea: string;
    livingArea: string;
    kitchenArea: string;
    ceiling: string;
    neighbors: string;
    floors: string;
    sqm: string;
    meters: string;
    btnDetails: string;
    btnReserve: string;
    btnDownloadCatalog: string;
    roomDetailsTitle: string;
  };
  gallery: {
    badge: string;
    title: string;
    desc: string;
    tabAll: string;
    tabArchitecture: string;
    tabLake: string;
    tabInterior: string;
    tabConstruction: string;
    zoomHint: string;
  };
  construction: {
    badge: string;
    title: string;
    desc: string;
    inProgress: string;
    readReport: string;
    slideCounter: string;
  };
  infrastructure: {
    badge: string;
    title: string;
    desc: string;
    tabAll: string;
    tabEducation: string;
    tabShopping: string;
    tabSports: string;
    tabNature: string;
    tabTransport: string;
    exactAddress: string;
    addressText: string;
    directionHint: string;
    btnBuildRoute: string;
    btnYandex: string;
    btnGisComplex: string;
    btnYandexComplex: string;
    routeHint: string;
    routeFromBereke: string;
    routeStart: string;
    destination: string;
    byCar: string;
    walking: string;
    selectedForRoute: string;
    items: Record<string, { title: string; badge: string; desc: string; routeTip: string }>;
  };
  leadForm: {
    badge: string;
    title: string;
    desc: string;
    inputName: string;
    inputPhone: string;
    selectLayout: string;
    inputComment: string;
    btnSubmit: string;
    successTitle: string;
    successDesc: string;
    securityNotice: string;
    directCall: string;
    preferredContact: string;
    viaWhatsapp: string;
    phoneCall: string;
    chatWhatsappNow: string;
    fillForm: string;
    fillFormDesc: string;
    workingHoursTitle: string;
    workingHoursValue: string;
    directWhatsapp: string;
    privacyNote: string;
    errorName: string;
    errorPhone: string;
    namePlaceholder: string;
    options: {
      comfort81: string;
      grand93: string;
      premium125: string;
      lakeDeluxe140: string;
      grandRes165: string;
      penthouse188: string;
      commercial: string;
    };
  };
  floating: {
    quickContact: string;
    callSales: string;
    scrollToTop: string;
    salesOffice: string;
    whatsappOnline: string;
    closeContacts: string;
    openContacts: string;
  };
  footer: {
    developerBadge: string;
    aboutText: string;
    quickLinks: string;
    contacts: string;
    addressLabel: string;
    workingHoursLabel: string;
    allRightsReserved: string;
    privacyPolicy: string;
    disclaimer: string;
  };
  modals: {
    consultationTitle: string;
    consultationSubtitle: string;
    layoutTitle: string;
    bookVisit: string;
    mortgageCalc: string;
    close: string;
    send: string;
    zoomIn: string;
    zoomOut: string;
    resetZoom: string;
    zoomHint: string;
    ceilingHeight: string;
    neighbors: string;
    oneNeighbor: string;
    roomBreakdown: string;
    lotFeatures: string;
    priceInWhatsapp: string;
    bookTourOnSite: string;
    prevPhoto: string;
    nextPhoto: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    nav: {
      tour3d: '3D-Обзор',
      concept: 'Концепция',
      advantages: 'Преимущества',
      layouts: 'Планировки',
      gallery: 'Галерея',
      construction: 'Ход строительства',
      location: 'Инфраструктура',
      contacts: 'Контакты',
      consultation: 'Консультация',
      siteNavigation: 'Навигация по сайту',
      salesOffice: 'Отдел продаж (г. Актобе)',
      callNow: 'Позвонить в офис',
    },
    hero: {
      badge: 'Клубный жилой массив в Актобе • Готов к заселению',
      titleMain: 'Клубный жилой массив Bereke Park',
      titleSub: 'с собственным озером',
      desc: 'Архитектурный ансамбль переменной этажности (6–8 этажей) в тихом экологичном районе Актобе. Панорамные витражи 3.3 м, приватность и благоустроенный парк у дома.',
      btnLayouts: 'Выбрать планировку',
      btn3D: 'Интерактивный 3D-макет',
      btnVisit: 'Забронировать визит',
      stats: {
        ceiling: 'Высота потолков',
        ceilingSub: 'Воздух, простор и панорамное остекление в пол',
        neighbors: 'На лестничной площадке',
        neighborsSub: 'Бескомпромиссная приватность клубного формата',
        park: 'Парк и собственное озеро',
        parkSub: 'Экосистема Green City с природным водоемом',
        infra: 'До всей инфраструктуры',
        infraSub: 'НИШ, ТЦ Дина, Ледовая Арена, Теннисный центр',
      },
    },
    model3d: {
      badge: 'Архитектурный макет • Bereke Park',
      title: 'Интерактивная 3D-модель комплекса',
      subtitle: 'Крутите колесико мыши: макет плавно приблизится из дали, облетит фасад и откроет набережную.',
      btnSkip: 'К планировкам',
      hintGesture: 'Вращайте макет мышью 360°',
      hintInteracting: 'Интерактивный обзор 360°',
      statusDynamic: 'Скролл-облет в динамике',
      statusDone: '3D-тур завершен • Листайте дальше',
      btnAutoStart: 'Авто 360°',
      btnAutoStop: 'Стоп',
      btnContinue: 'Продолжить листать сайт',
      btnBookVisit: 'Забронировать визит',
      scrollHint: 'Крутите колесико мыши вниз для облета макета со всех ракурсов',
      scrollHintDone: 'Тур завершен — листайте вниз к концепции и планировкам квартир',
      scrollHintMobile: 'Круговой 3D-обзор 360° • Листайте страницу дальше',
      phases: [
        {
          badge: '01 / Панорама комплекса',
          title: 'Клубный жилой массив Bereke Park',
          desc: 'Архитектурный ансамбль переменной этажности (6–8 этажей) в окружении ландшафтного парка и природного озера в Актобе.',
          focusPoint: 'Панорамный обзор издали',
        },
        {
          badge: '02 / Парадный вход & Витражи',
          title: 'Двусветное лобби, витражи и портал из термодерева',
          desc: 'Камера опускается к парадной группе: входной портал с подсветкой, панорамное остекление 3.3 м и консольные балконы.',
          focusPoint: 'Входные группы и остекление',
        },
        {
          badge: '03 / Пентхаусы & Перголы',
          title: 'Видовые резиденции с лаунж-террасами на крыше',
          desc: 'Верхние этажи с открытыми террасами, деревянными перголами, потолками 3.5 м и живописным видом на парковую акваторию.',
          focusPoint: 'Верхние этажи и перголы',
        },
        {
          badge: '04 / Озеро & Набережная',
          title: 'Природное озеро и собственный прогулочный пирс',
          desc: 'Естественный водоем с деревянной набережной, вечерними парковыми фонарями и зонами отдыха прямо во дворе дома.',
          focusPoint: 'Озеро и прогулочный пирс',
        },
        {
          badge: '05 / Финал тура',
          title: 'Bereke Park • Готов к заселению',
          desc: '3D-обзор завершен. Продолжайте листать вниз — колесико свободно переведет вас к планировкам и деталям проекта.',
          focusPoint: 'Генеральный ракурс комплекса',
        },
      ],
    },
    concept: {
      badge: 'Философия пространства',
      title: 'Архитектура, созданная для жизни',
      desc: 'Bereke Park сочетает монументальный монолитный каркас, вентилируемый керамогранитный фасад и природный оазис с озером в черте города.',
      quoteTitle: 'Экология и тишина в центре активной жизни',
      quoteSub: 'Природный водоем, пешеходные аллеи и закрытый безопасный двор без машин.',
      specHeader: 'Инженерные стандарты De Luxe',
      specSub: 'Только долговечные экологичные материалы и передовые технологии энергоэффективности.',
    },
    layouts: {
      badge: 'Коллекция квартир',
      title: 'Продуманные планировки de luxe',
      desc: 'Квартиры площадью от 81 до 184 м² с высокими потолками 3.3 м, панорамными витражами и мастер-спальнями.',
      tabAll: 'Все варианты',
      tab2Rooms: '2-комнатные',
      tab3Rooms: '3-комнатные',
      tab4Rooms: '4-комнатные / Пентхаусы',
      tabPenthouses: 'Пентхаусы',
      totalArea: 'Общая площадь',
      livingArea: 'Жилая',
      kitchenArea: 'Кухня',
      ceiling: 'Потолки',
      neighbors: 'Соседей на площадке',
      floors: 'Этажи',
      sqm: 'м²',
      meters: 'м',
      btnDetails: 'Открыть планировку',
      btnReserve: 'Узнать актуальную цену',
      btnDownloadCatalog: 'Скачать каталог планировок (PDF)',
      roomDetailsTitle: 'Экспликация помещений',
    },
    gallery: {
      badge: 'Фотогалерея',
      title: 'Атмосфера клубного массива',
      desc: 'Взгляните на панорамы озера, архитектурные фасады, интерьеры лобби и приватную территорию.',
      tabAll: 'Все фото',
      tabArchitecture: 'Архитектура и фасады',
      tabLake: 'Озеро и набережная',
      tabInterior: 'Интерьеры и лобби',
      tabConstruction: 'Ход строительства',
      zoomHint: 'Нажмите для увеличения фото',
    },
    construction: {
      badge: 'Официальный отчет застройщика',
      title: 'Ход строительства вживую',
      desc: 'Регулярная фиксация строительных этапов ЖК Bereke Park. Честный фотоотчет со стройплощадки в Актобе.',
      inProgress: 'В процессе',
      readReport: 'Посмотреть фотоотчет',
      slideCounter: 'Отчет',
    },
    infrastructure: {
      badge: 'Локация & Окружение',
      title: 'Все для жизни в радиусе 5–10 минут',
      desc: 'Престижный район Астана (Юго-Запад-2, выше мкр. Батыс-2). Прямой выезд на проспект Алаш без пробок.',
      tabAll: 'Все объекты',
      tabEducation: 'Образование',
      tabShopping: 'Покупки и ТРЦ',
      tabSports: 'Спорт и отдых',
      tabNature: 'Парки и природа',
      tabTransport: 'Транспорт',
      exactAddress: 'Точный адрес комплекса',
      addressText: 'Казахстан, г. Актобе, район Астана, ж/м Юго-Запад-2, ул. Шалкииз Жырау, дом 1 (1Б, 1Г)',
      directionHint: 'Прямой заезд с проспекта Алаш, район выше мкр. Алтын Орда (Батыс-2)',
      btnBuildRoute: 'Маршрут в 2ГИС',
      btnYandex: 'Маршрут в Яндекс Карты',
      btnGisComplex: 'ЖК в 2ГИС',
      btnYandexComplex: 'ЖК в Яндекс Картах',
      routeHint: 'Построить быстрый маршрут от вашего местоположения',
      routeFromBereke: 'Маршрут от ЖК «Bereke Park»',
      routeStart: 'Старт маршрута',
      destination: 'Точка назначения',
      byCar: 'На авто',
      walking: 'Пешком',
      selectedForRoute: 'Выбрано для маршрута',
      items: {
        'infra-nish': {
          title: 'НИШ (Назарбаев Интеллектуальная Школа)',
          badge: 'Топ-образование',
          desc: 'Ведущее среднее учебное заведение международного уровня естественно-математического направления.',
          routeTip: 'Прямой маршрут: ул. Шалкииз Жырау -> пр. Алаш -> поворот на ул. Мәңгілік Ел, 8',
        },
        'infra-ice-arena': {
          title: 'Ледовая Арена «Актобе-Арена»',
          badge: 'Спорт для семьи',
          desc: 'Крупнейший ледовый дворец города: профессиональная хоккейная арена, фигурное катание и массовые катания.',
          routeTip: 'Быстрый проезд: ул. Шалкииз Жырау -> ул. Ораза Татеулы, дом 1',
        },
        'infra-zhekpe': {
          title: 'Дворец единоборств «Жекпе-Жек»',
          badge: 'Единоборства',
          desc: 'Многофункциональная арена международного класса для единоборств, бокса, гимнастики и турниров.',
          routeTip: 'Прямо по ул. Ораза Татеулы, 5 — современный дворец спорта рядом с «Актобе-Ареной»',
        },
        'infra-tennis': {
          title: 'Теннисный центр ACE',
          badge: 'Теннис',
          desc: 'Профессиональный теннисный клуб: сертифицированные покрытия Hard, детская академия и персональные тренеры.',
          routeTip: 'По пр. Алаш на ул. Мәңгілік Ел, 2 — крытые и открытые корты европейского стандарта',
        },
        'infra-dostyk': {
          title: 'Спортивный комплекс / бассейн «Достык»',
          badge: 'Плавание',
          desc: 'Современный 50-метровый бассейн, детские секции водного поло и плавания, восстановительные сауны.',
          routeTip: 'По пр. Алаш на ул. Мәңгілік Ел, 6 (рядом со школой НИШ) — олимпийский плавательный бассейн',
        },
        'infra-dina': {
          title: 'Гипермаркет «Дина» и Торговый Квартал',
          badge: 'Шопинг & Еда',
          desc: 'Крупнейший продуктовый гипермаркет, свежие фермерские ряды, аптеки, банки и кафе.',
          routeTip: 'Выезд по пр. Алаш на пр. Санкибай Батыра, 366В/1 — гипермаркет с обширным паркингом',
        },
        'infra-lake-self': {
          title: 'Природное озеро Береке & Экопарк',
          badge: 'Сердце комплекса',
          desc: 'Естественный водоем, деревянный прогулочный пирс, вечернее освещение, сосны и клены с автополивом.',
          routeTip: 'Находится в центре комплекса: пеший выход из подъезда прямо к благоустроенному пирсу и аллее',
        },
        'infra-road': {
          title: 'Проспект Алаш — транспортная артерия',
          badge: 'Быстрый выезд',
          desc: 'Быстрый трафик в любую точку города без пробок: 10 мин до центрального проспекта Абилкайыр хана.',
          routeTip: 'Прямой асфальтированный заезд на 6-полосный проспект Алаш, связывающий Юго-Запад, Батыс-2 и центр',
        },
      },
    },
    leadForm: {
      badge: 'Персональный сервис',
      title: 'Запишитесь на индивидуальный визит',
      desc: 'Менеджер отдела продаж проведет для вас персональную экскурсию по территории, набережной и покажет готовые планировки.',
      inputName: 'Ваше имя',
      inputPhone: 'Номер телефона',
      selectLayout: 'Интересующая планировка',
      inputComment: 'Удобное время для звонка или визита',
      btnSubmit: 'Записаться на консультацию',
      successTitle: 'Заявка успешно отправлена!',
      successDesc: 'Менеджер отдела продаж свяжется с вами в течение 10 минут.',
      securityNotice: 'Конфиденциальность гарантирована. Ваши данные защищены.',
      directCall: 'Или позвоните нам прямо сейчас:',
      preferredContact: 'Удобный способ связи',
      viaWhatsapp: 'Через WhatsApp',
      phoneCall: 'Телефонный звонок',
      chatWhatsappNow: 'Перейти в чат WhatsApp сейчас',
      fillForm: 'Заполните форму',
      fillFormDesc: 'Менеджер проекта свяжется с вами и пришлет актуальный прайс-лист в WhatsApp.',
      workingHoursTitle: 'Режим работы офиса',
      workingHoursValue: 'Пн-Сб: 09:00 – 19:00, Вс: 10:00 – 17:00',
      directWhatsapp: 'Прямой WhatsApp',
      privacyNote: 'Конфиденциальность 100%. Без навязчивых звонков и посредников.',
      errorName: 'Пожалуйста, введите ваше имя',
      errorPhone: 'Пожалуйста, введите полный номер телефона (11 цифр)',
      namePlaceholder: 'Например, Азамат',
      options: {
        comfort81: '2-комнатная «Комфорт» (81.4 м²)',
        grand93: '2-комнатная «Гранд» (93.8 м²)',
        premium125: '3-комнатная «Премиум» (125.2 м²)',
        lakeDeluxe140: '3-комнатная «Lake Deluxe» (140.6 м²)',
        grandRes165: '4-комнатная «Гранд Резиденция» (165.3 м²)',
        penthouse188: '4-комнатный «Пентхаус Береке» (188.5 м²)',
        commercial: 'Коммерческая недвижимость',
      },
    },
    floating: {
      quickContact: 'Быстрая связь',
      callSales: 'Позвонить в отдел продаж',
      scrollToTop: 'Наверх страницы',
      salesOffice: 'Отдел продаж',
      whatsappOnline: 'WhatsApp онлайн',
      closeContacts: 'Закрыть контакты',
      openContacts: 'Открыть контакты',
    },
    footer: {
      developerBadge: 'Клубный жилой массив • Актобе',
      aboutText: 'Премиальный жилой массив с собственным озером и ландшафтным парком. Высокое качество строительства, монолитная надежность и клубный комфорт.',
      quickLinks: 'Разделы сайта',
      contacts: 'Контакты отдела продаж',
      addressLabel: 'Адрес комплекса:',
      workingHoursLabel: 'График работы:',
      allRightsReserved: 'Все права защищены.',
      privacyPolicy: 'Политика конфиденциальности',
      disclaimer: 'Информация на сайте носит ознакомительный характер и не является публичной офертой.',
    },
    modals: {
      consultationTitle: 'Запись на консультацию и просмотр',
      consultationSubtitle: 'Оставьте контакты для подбора планировки и бронирования индивидуального визита в Bereke Park',
      layoutTitle: 'Детальный план резиденции',
      bookVisit: 'Забронировать визит на объект',
      mortgageCalc: 'Ипотечные программы и рассрочка',
      close: 'Закрыть',
      send: 'Отправить заявку',
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
      resetZoom: 'Сброс',
      zoomHint: 'Используйте кнопки зума для детального осмотра схемы комнат',
      ceilingHeight: 'Высота потолков',
      neighbors: 'Соседи на этаже',
      oneNeighbor: '1 сосед',
      roomBreakdown: 'Экспликация помещений',
      lotFeatures: 'Особенности лота',
      priceInWhatsapp: 'Узнать цену в WhatsApp',
      bookTourOnSite: 'Забронировать просмотр на объекте',
      prevPhoto: 'Предыдущее фото',
      nextPhoto: 'Следующее фото',
    },
  },

  kz: {
    nav: {
      tour3d: '3D-Шолу',
      concept: 'Тұжырымдама',
      advantages: 'Артықшылықтар',
      layouts: 'Жоспарлаулар',
      gallery: 'Галерея',
      construction: 'Құрылыс барысы',
      location: 'Инфрақұрылым',
      contacts: 'Байланыс',
      consultation: 'Кеңес алу',
      siteNavigation: 'Сайт навигациясы',
      salesOffice: 'Сату бөлімі (Ақтөбе қ.)',
      callNow: 'Кеңсеге қоңырау шалу',
    },
    hero: {
      badge: 'Ақтөбедегі клубтық тұрғын үй кешені • Қоныстануға дайын',
      titleMain: 'Bereke Park клубтық тұрғын үй кешені',
      titleSub: 'жеке көлімен',
      desc: 'Ақтөбе қаласының тыныш әрі экологиялық таза ауданындағы айнымалы қабатты (6–8 қабат) архитектуралық ансамбль. 3.3 м панорамалық витраждар, жеке аумақ және үй жанындағы абаттандырылған саябақ.',
      btnLayouts: 'Пәтер таңдау',
      btn3D: 'Интерактивті 3D-макет',
      btnVisit: 'Кездесуге жазылу',
      stats: {
        ceiling: 'Төбе биіктігі',
        ceilingSub: 'Ауа кеңістігі және еденнен төбеге дейінгі панорамалық терезелер',
        neighbors: 'Әр қабаттағы көршілер',
        neighborsSub: 'Клубтық форматтағы шынайы жеке кеңістік',
        park: 'Саябақ және жеке көл',
        parkSub: 'Табиғи су айдыны бар Green City экожүйесі',
        infra: 'Барлық инфрақұрылымға дейін',
        infraSub: 'НЗМ, Дина СО, Мұз айдыны, Теннис орталығы',
      },
    },
    model3d: {
      badge: 'Архитектуралық макет • Bereke Park',
      title: 'Кешеннің интерактивті 3D-моделі',
      subtitle: 'Тінтуір дөңгелегін айналдырыңыз: макет алыстан жақындап, қасбетті айналып өтіп, набережнаяны көрсетеді.',
      btnSkip: 'Жоспарлауларға',
      hintGesture: 'Макетті 360° тінтуірмен бұрыңыз',
      hintInteracting: 'Интерактивті 360° шолу',
      statusDynamic: 'Динамикалық шолу барысы',
      statusDone: '3D-тур аяқталды • Төмен қарай парақтаңыз',
      btnAutoStart: 'Авто 360°',
      btnAutoStop: 'Тоқтату',
      btnContinue: 'Сайтты ары қарай көру',
      btnBookVisit: 'Кездесуге жазылу',
      scrollHint: 'Кешенді жан-жақты көру үшін тінтуір дөңгелегін төмен қарай айналдырыңыз',
      scrollHintDone: 'Тур аяқталды — тұжырымдама мен пәтер жоспарлауларына төмен қарай өтіңіз',
      scrollHintMobile: '360° айналмалы 3D шолу • Бетті әрі қарай парақтаңыз',
      phases: [
        {
          badge: '01 / Кешен панорамасы',
          title: 'Bereke Park клубтық тұрғын үй кешені',
          desc: 'Ақтөбедегі ландшафтық саябақ пен табиғи көл ортасындағы айнымалы қабатты (6–8 қабат) архитектуралық ансамбль.',
          focusPoint: 'Алыстан панорамалық шолу',
        },
        {
          badge: '02 / Басты кіреберіс & Витраждар',
          title: 'Екі жарықты лобби, витраждар және термоағаш порталы',
          desc: 'Камера басты кіреберіске төмендейді: жарықтандырылған портал, 3.3 м панорамалық әйнектеу және консольді балкондар.',
          focusPoint: 'Кіреберіс топтары мен витраждар',
        },
        {
          badge: '03 / Пентхаустар & Перголалар',
          title: 'Шатырдағы лаунж-террасалары бар көріністі резиденциялар',
          desc: 'Ашық террасалары, ағаш перголалары, 3.5 м төбелері және саябақ көрінісі бар жоғарғы қабаттар.',
          focusPoint: 'Жоғарғы қабаттар мен перголалар',
        },
        {
          badge: '04 / Көл & Жағалау',
          title: 'Табиғи көл және жеке серуендейтін пирс',
          desc: 'Үйдің тура ауласында ағаш жағалауы, кешкі саябақ шамдары мен демалыс аймақтары бар табиғи су қоймасы.',
          focusPoint: 'Көл және серуендейтін пирс',
        },
        {
          badge: '05 / Турдың соңы',
          title: 'Bereke Park • Қоныстануға дайын',
          desc: '3D-шолу аяқталды. Төмен қарай парақтауды жалғастырыңыз — сайт жоспарлаулар мен кешен ақпаратына өтеді.',
          focusPoint: 'Кешеннің бас көрінісі',
        },
      ],
    },
    concept: {
      badge: 'Кеңістік философиясы',
      title: 'Өмір сүру үшін жасалған сәулет',
      desc: 'Bereke Park монументалды монолитті қаңқаны, желдетілетін керамогранит қасбетті және қала ішіндегі табиғи көл оазисін үйлестіреді.',
      quoteTitle: 'Белсенді қала ортасындағы тыныштық пен таза ауа',
      quoteSub: 'Табиғи су айдыны, жаяу жүргіншілер аллеялары және көліксіз қауіпсіз жабық аула.',
      specHeader: 'De Luxe инженерлік стандарттары',
      specSub: 'Тек ұзақ мерзімді экологиялық таза материалдар мен заманауи энергия тиімділігі.',
    },
    layouts: {
      badge: 'Пәтерлер топтамасы',
      title: 'Тыңғылықты ойластырылған de luxe жоспарлары',
      desc: 'Төбесі 3.3 м, панорамалық витраждары мен мастер-жатын бөлмелері бар 81-ден 184 м²-ге дейінгі резиденциялар.',
      tabAll: 'Барлық нұсқалар',
      tab2Rooms: '2 бөлмелі',
      tab3Rooms: '3 бөлмелі',
      tab4Rooms: '4 бөлмелі / Пентхаустар',
      tabPenthouses: 'Пентхаустар',
      totalArea: 'Жалпы ауданы',
      livingArea: 'Тұрғын үй',
      kitchenArea: 'Ас үй',
      ceiling: 'Төбелер',
      neighbors: 'Әр қабаттағы көршілер',
      floors: 'Қабаттар',
      sqm: 'м²',
      meters: 'м',
      btnDetails: 'Жоспарлауды көру',
      btnReserve: 'Қазіргі бағасын білу',
      btnDownloadCatalog: 'Жоспарлаулар каталогын жүктеп алу (PDF)',
      roomDetailsTitle: 'Бөлмелердің экспликациясы',
    },
    gallery: {
      badge: 'Фотогалерея',
      title: 'Клубтық кешен атмосферасы',
      desc: 'Көл панорамаларын, сәулеттік қасбеттерді, лобби интерьерлерін және жеке аумақты тамашалаңыз.',
      tabAll: 'Барлық фотолар',
      tabArchitecture: 'Сәулет және қасбеттер',
      tabLake: 'Көл және жағалау',
      tabInterior: 'Интерьерлер мен лобби',
      tabConstruction: 'Құрылыс барысы',
      zoomHint: 'Үлкейту үшін басыңыз',
    },
    construction: {
      badge: 'Құрылыс салушының ресми есебі',
      title: 'Құрылыс барысы',
      desc: 'Bereke Park ТК құрылыс кезеңдерін жүйелі түрде тіркеу. Ақтөбедегі құрылыс алаңынан шынайы фотоесеп.',
      inProgress: 'Орындалуда',
      readReport: 'Фотоесепті көру',
      slideCounter: 'Есеп',
    },
    infrastructure: {
      badge: 'Орналасуы & Айналасы',
      title: '5–10 минуттық қашықтықтағы барлық нысандар',
      desc: 'Беделді Астана ауданы (Оңтүстік-Батыс-2, Батыс-2 үстінде). Алаш даңғылына кептеліссіз тікелей шығу жолы.',
      tabAll: 'Барлық нысандар',
      tabEducation: 'Білім беру',
      tabShopping: 'Сауда орталықтары',
      tabSports: 'Спорт және демалыс',
      tabNature: 'Саябақтар мен табиғат',
      tabTransport: 'Көлік қатынасы',
      exactAddress: 'Кешеннің нақты мекенжайы',
      addressText: 'Қазақстан, Ақтөбе қ., Астана ауданы, Оңтүстік-Батыс-2 т/м, Шалкиіз Жырау к-сі, 1 үй (1Б, 1Г)',
      directionHint: 'Алаш даңғылынан тікелей кіру жолы, Алтын Орда (Батыс-2) м/а үстінде',
      btnBuildRoute: '2ГИС бағытын құру',
      btnYandex: 'Яндекс Карталар',
      btnGisComplex: 'Кешен 2ГИС-те',
      btnYandexComplex: 'Кешен Яндекс Картада',
      routeHint: 'Сіздің орналасқан жеріңізден бағыт құру',
      routeFromBereke: '«Bereke Park» ТК басталатын бағыт',
      routeStart: 'Бағыттың басы',
      destination: 'Тағайындалған орын',
      byCar: 'Көлікпен',
      walking: 'Жаяу',
      selectedForRoute: 'Бағыт үшін таңдалды',
      items: {
        'infra-nish': {
          title: 'НЗМ (Назарбаев Зияткерлік Мектебі)',
          badge: 'Үздік білім беру',
          desc: 'Жаратылыстану-математикалық бағытындағы халықаралық деңгейдегі жетекші орта білім беру мекемесі.',
          routeTip: 'Тікелей бағыт: Шалкиіз Жырау к-сі -> Алаш даңғ. шығу -> Мәңгілік Ел к-сі, 8',
        },
        'infra-ice-arena': {
          title: '«Ақтөбе-Арена» Мұз сарайы',
          badge: 'Отбасылық спорт',
          desc: 'Қаланың ең ірі мұз сарайы: кәсіби хоккей аренасы, мәнерлеп сырғанау және бұқаралық сырғанау.',
          routeTip: 'Жылдам жол: Шалкиіз Жырау к-сі -> Ораз Тәтеұлы к-сі, 1',
        },
        'infra-zhekpe': {
          title: '«Жекпе-Жек» жекпе-жек сарайы',
          badge: 'Жекпе-жек',
          desc: 'Жекпе-жек, бокс, гимнастика және турнирлерге арналған халықаралық дәрежедегі көпсалалы арена.',
          routeTip: 'Ораз Тәтеұлы к-сі, 5 бойымен тікелей — «Ақтөбе-Арена» жанындағы спорт сарайы',
        },
        'infra-tennis': {
          title: 'ACE теннис орталығы',
          badge: 'Теннис',
          desc: 'Кәсіби теннис клубы: сертификатталған Hard жабындары, балалар академиясы және жеке жаттықтырушылар.',
          routeTip: 'Алаш даңғ. бойымен Мәңгілік Ел к-сі, 2 — еуропалық стандарттағы жабық және ашық корттар',
        },
        'infra-dostyk': {
          title: '«Достық» спорт кешені / бассейні',
          badge: 'Жүзу',
          desc: 'Заманауи 50 метрлік бассейн, балалар су добы және жүзу үйірмелері, сауықтыру сауналары.',
          routeTip: 'Алаш даңғ. бойымен Мәңгілік Ел к-сі, 6 (НЗМ жанында) — олимпиадалық жүзу бассейні',
        },
        'infra-dina': {
          title: '«Дина» гипермаркеті және Сауда орамы',
          badge: 'Сауда & Тағам',
          desc: 'Қаланың ең ірі азық-түлік гипермаркеті, жаңа фермерлік өнімдер, дәріханалар, банктер және кафелер.',
          routeTip: 'Алаш даңғ. бойымен Сәңкібай батыр даңғ., 366В/1 — кең тұрағы бар гипермаркет',
        },
        'infra-lake-self': {
          title: 'Береке табиғи көлі & Экосаябақ',
          badge: 'Кешеннің жүрегі',
          desc: 'Табиғи су айдыны, ағаш серуендеу пирсі, кешкі жарықтандыру, автосуарғышы бар қарағайлар мен үйеңкілер.',
          routeTip: 'Кешен орталығында: кіреберістен жағалауға және аллеяға тікелей шығу жолы',
        },
        'infra-road': {
          title: 'Алаш даңғылы — басты көлік күретамыры',
          badge: 'Жылдам шығу',
          desc: 'Кептеліссіз қаланың кез келген жеріне жылдам жету: Әбілқайыр хан орталық даңғылына дейін 10 минут.',
          routeTip: 'Оңтүстік-Батыс, Батыс-2 және қала орталығын байланыстыратын 6 жолақты Алаш даңғылына тікелей шығу',
        },
      },
    },
    leadForm: {
      badge: 'Жеке қызмет көрсету',
      title: 'Жеке кездесуге жазылыңыз',
      desc: 'Сату бөлімінің менеджері сізге аумақ пен көл бойынша жеке экскурсия өткізіп, дайын пәтерлерді көрсетеді.',
      inputName: 'Сіздің атыңыз',
      inputPhone: 'Телефон нөмірі',
      selectLayout: 'Қызықтырған пәтер түрі',
      inputComment: 'Қоңырау шалуға немесе келуге ыңғайлы уақыт',
      btnSubmit: 'Кеңес алуға жазылу',
      successTitle: 'Өтінім сәтті жіберілді!',
      successDesc: 'Сату бөлімінің менеджері сізбен 10 минут ішінде хабарласады.',
      securityNotice: 'Құпиялылыққа кепілдік беріледі. Деректеріңіз қорғалған.',
      directCall: 'Немесе бізге дәл қазір қоңырау шалыңыз:',
      preferredContact: 'Байланысудың қолайлы түрі',
      viaWhatsapp: 'WhatsApp арқылы',
      phoneCall: 'Телефон қоңырауы',
      chatWhatsappNow: 'WhatsApp чатына дәл қазір өту',
      fillForm: 'Форманы толтырыңыз',
      fillFormDesc: 'Жоба менеджері сізбен хабарласып, өзекті прайс-парақты WhatsApp арқылы жібереді.',
      workingHoursTitle: 'Кеңсенің жұмыс кестесі',
      workingHoursValue: 'Дс-Сб: 09:00 – 19:00, Жс: 10:00 – 17:00',
      directWhatsapp: 'Тікелей WhatsApp',
      privacyNote: '100% құпиялылық. Мазасыз қоңырауларсыз және делдалсыз.',
      errorName: 'Атыңызды енгізіңіз',
      errorPhone: 'Толық телефон нөмірін енгізіңіз (11 сан)',
      namePlaceholder: 'Мысалы, Азамат',
      options: {
        comfort81: '2 бөлмелі «Комфорт» (81.4 м²)',
        grand93: '2 бөлмелі «Гранд» (93.8 м²)',
        premium125: '3 бөлмелі «Премиум» (125.2 м²)',
        lakeDeluxe140: '3 бөлмелі «Lake Deluxe» (140.6 м²)',
        grandRes165: '4 бөлмелі «Гранд Резиденция» (165.3 м²)',
        penthouse188: '4 бөлмелі «Пентхаус Береке» (188.5 м²)',
        commercial: 'Коммерциялық жылжымайтын мүлік',
      },
    },
    floating: {
      quickContact: 'Жылдам байланыс',
      callSales: 'Сату бөліміне қоңырау шалу',
      scrollToTop: 'Жоғарыға көтерілу',
      salesOffice: 'Сату бөлімі',
      whatsappOnline: 'WhatsApp онлайн',
      closeContacts: 'Байланысты жабу',
      openContacts: 'Байланысты ашу',
    },
    footer: {
      developerBadge: 'Клубтық тұрғын үй кешені • Ақтөбе',
      aboutText: 'Жеке көлі мен ландшафтық саябағы бар премиум тұрғын үй кешені. Жоғары сапалы құрылыс, монолитті сенімділік және клубтық жайлылық.',
      quickLinks: 'Сайт бөлімдері',
      contacts: 'Сату бөлімінің байланысы',
      addressLabel: 'Кешен мекенжайы:',
      workingHoursLabel: 'Жұмыс уақыты:',
      allRightsReserved: 'Барлық құқықтар қорғалған.',
      privacyPolicy: 'Құпиялылық саясаты',
      disclaimer: 'Сайттағы ақпарат танысу сипатына ие және жария оферта болып табылмайды.',
    },
    modals: {
      consultationTitle: 'Кеңес алуға және қарауға жазылу',
      consultationSubtitle: 'Пәтер таңдау және Bereke Park кешеніне жеке сапарды брондау үшін байланыс мәліметтерін қалдырыңыз',
      layoutTitle: 'Резиденцияның егжей-тегжейлі жоспары',
      bookVisit: 'Нысанға баруға жазылу',
      mortgageCalc: 'Ипотекалық бағдарламалар мен бөліп төлеу',
      close: 'Жабу',
      send: 'Өтінім жіберу',
      zoomIn: 'Үлкейту',
      zoomOut: 'Кішірейту',
      resetZoom: 'Қалпына келтіру',
      zoomHint: 'Бөлмелер сызбасын егжей-тегжейлі көру үшін масштабтау батырмаларын пайдаланыңыз',
      ceilingHeight: 'Төбе биіктігі',
      neighbors: 'Әр қабаттағы көршілер',
      oneNeighbor: '1 көрші',
      roomBreakdown: 'Бөлмелердің экспликациясы',
      lotFeatures: 'Лоттың ерекшеліктері',
      priceInWhatsapp: 'Бағаны WhatsApp арқылы білу',
      bookTourOnSite: 'Нысанға келіп көруге жазылу',
      prevPhoto: 'Алдыңғы фото',
      nextPhoto: 'Келесі фото',
    },
  },

  en: {
    nav: {
      tour3d: '3D Tour',
      concept: 'Concept',
      advantages: 'Advantages',
      layouts: 'Floor Plans',
      gallery: 'Gallery',
      construction: 'Construction',
      location: 'Location',
      contacts: 'Contacts',
      consultation: 'Consultation',
      siteNavigation: 'Site Navigation',
      salesOffice: 'Sales Gallery (Aktobe)',
      callNow: 'Call Sales Office',
    },
    hero: {
      badge: 'Club Residential Complex in Aktobe • Ready to move in',
      titleMain: 'Bereke Park Club Residential Estate',
      titleSub: 'with a Private Lake',
      desc: 'An architectural ensemble of 6–8 floors in a serene, eco-friendly district of Aktobe. 3.3m panoramic windows, total privacy, and a landscaped park at your doorstep.',
      btnLayouts: 'Explore Floor Plans',
      btn3D: 'Interactive 3D Tour',
      btnVisit: 'Book a Private Tour',
      stats: {
        ceiling: 'Ceiling Height',
        ceilingSub: 'Airy space with floor-to-ceiling panoramic glass',
        neighbors: 'Per Floor Landing',
        neighborsSub: 'Uncompromised club-level residential privacy',
        park: 'Park & Private Lake',
        parkSub: 'Green City ecosystem with natural body of water',
        infra: 'To Key Infrastructure',
        infraSub: 'NIS, Dina Mall, Ice Arena, Tennis Center',
      },
    },
    model3d: {
      badge: 'Architectural Model • Bereke Park',
      title: 'Interactive 3D Architectural Model',
      subtitle: 'Scroll your mouse wheel: the model gracefully glides in from afar, circles the facade, and showcases the lake.',
      btnSkip: 'To Floor Plans',
      hintGesture: 'Rotate model 360° with mouse',
      hintInteracting: 'Interactive 360° View',
      statusDynamic: 'Dynamic scroll flight',
      statusDone: '3D tour complete • Scroll down',
      btnAutoStart: 'Auto 360°',
      btnAutoStop: 'Stop',
      btnContinue: 'Continue exploring site',
      btnBookVisit: 'Book a Private Tour',
      scrollHint: 'Scroll mouse wheel down to tour the residence from all angles',
      scrollHintDone: 'Tour complete — scroll down to explore concept & floor plans',
      scrollHintMobile: '360° Auto-Tour • Continue scrolling page',
      phases: [
        {
          badge: '01 / Complex Panorama',
          title: 'Bereke Park Club Residential Estate',
          desc: 'An architectural ensemble of 6–8 floors surrounded by a landscaped park and natural lake in Aktobe.',
          focusPoint: 'Panoramic view from afar',
        },
        {
          badge: '02 / Grand Entrance & Windows',
          title: 'Double-height lobby, glass facades, and thermo-wood portal',
          desc: 'The camera descends to the grand entrance: illuminated portal, 3.3m panoramic glazing, and cantilevered balconies.',
          focusPoint: 'Entrance portico & glazing',
        },
        {
          badge: '03 / Penthouses & Pergolas',
          title: 'Scenic residences with rooftop lounge terraces',
          desc: 'Top floors featuring open-air sky terraces, wooden pergolas, 3.5m ceilings, and sweeping views over the lake.',
          focusPoint: 'Upper terraces & pergolas',
        },
        {
          badge: '04 / Lake & Promenade Pier',
          title: 'Natural lake and private walking pier',
          desc: 'Natural body of water with a wooden boardwalk, evening park lighting, and relaxation zones in the courtyard.',
          focusPoint: 'Lake & promenade pier',
        },
        {
          badge: '05 / Tour Complete',
          title: 'Bereke Park • Ready for Occupancy',
          desc: '3D overview is complete. Continue scrolling down — your mouse wheel smoothly transitions to floor plans and details.',
          focusPoint: 'Master perspective of the estate',
        },
      ],
    },
    concept: {
      badge: 'Philosophy of Space',
      title: 'Architecture Crafted for Living',
      desc: 'Bereke Park unites a solid monolithic reinforced frame, ventilated porcelain stone facade, and an urban natural lake oasis.',
      quoteTitle: 'Clean ecology and tranquility in the center of active life',
      quoteSub: 'Natural lake, pedestrian tree-lined alleys, and a secure gated courtyard free of vehicles.',
      specHeader: 'De Luxe Engineering Standards',
      specSub: 'Durable eco-friendly materials and cutting-edge energy efficiency technologies.',
    },
    layouts: {
      badge: 'Apartment Collection',
      title: 'Refined De Luxe Floor Plans',
      desc: 'Residences from 81 to 184 m² with 3.3m high ceilings, panoramic floor-to-ceiling windows, and master suites.',
      tabAll: 'All Residences',
      tab2Rooms: '2-Room',
      tab3Rooms: '3-Room',
      tab4Rooms: '4-Room / Penthouses',
      tabPenthouses: 'Penthouses',
      totalArea: 'Total Area',
      livingArea: 'Living',
      kitchenArea: 'Kitchen',
      ceiling: 'Ceilings',
      neighbors: 'Neighbors per floor',
      floors: 'Floors',
      sqm: 'sq.m',
      meters: 'm',
      btnDetails: 'View Floor Plan',
      btnReserve: 'Inquire Current Price',
      btnDownloadCatalog: 'Download Floor Plans Catalog (PDF)',
      roomDetailsTitle: 'Room Specifications',
    },
    gallery: {
      badge: 'Photo Gallery',
      title: 'Atmosphere of the Residence',
      desc: 'Discover panoramic lake views, architectural facades, lobby interiors, and private grounds.',
      tabAll: 'All Photos',
      tabArchitecture: 'Architecture & Facades',
      tabLake: 'Lake & Promenade',
      tabInterior: 'Interiors & Lobby',
      tabConstruction: 'Construction Progress',
      zoomHint: 'Click to enlarge photo',
    },
    construction: {
      badge: 'Official Developer Progress Report',
      title: 'Live Construction Progress',
      desc: 'Regular documented stages of Bereke Park in Aktobe. Transparent on-site photo reports.',
      inProgress: 'In Progress',
      readReport: 'View Photo Report',
      slideCounter: 'Report',
    },
    infrastructure: {
      badge: 'Location & Surroundings',
      title: 'Everything within 5–10 Minutes',
      desc: 'Prestigious Astana district (South-West-2, above Batys-2). Direct highway access to Alash Avenue without traffic.',
      tabAll: 'All Points',
      tabEducation: 'Education',
      tabShopping: 'Shopping & Malls',
      tabSports: 'Sports & Wellness',
      tabNature: 'Parks & Nature',
      tabTransport: 'Transportation',
      exactAddress: 'Complex Exact Address',
      addressText: 'Kazakhstan, Aktobe city, Astana district, South-West-2, Shalkiiz Zhyrau st., 1 (1B, 1G)',
      directionHint: 'Direct highway access from Alash Avenue, district located above Batys-2 (Altyn Orda)',
      btnBuildRoute: 'Directions in 2GIS',
      btnYandex: 'Yandex Maps Route',
      btnGisComplex: 'Complex in 2GIS',
      btnYandexComplex: 'Complex in Yandex Maps',
      routeHint: 'Get fastest driving directions from your location',
      routeFromBereke: 'Route from Bereke Park',
      routeStart: 'Route Start',
      destination: 'Destination Point',
      byCar: 'By Car',
      walking: 'Walking',
      selectedForRoute: 'Selected for Route',
      items: {
        'infra-nish': {
          title: 'NIS (Nazarbayev Intellectual School)',
          badge: 'Top Education',
          desc: 'Leading international-standard secondary school focused on science and mathematics.',
          routeTip: 'Direct route: Shalkiiz Zhyrau st. -> Alash ave. -> Mangilik El st., 8',
        },
        'infra-ice-arena': {
          title: 'Aktobe Ice Arena',
          badge: 'Family Sports',
          desc: 'The city\'s premier ice palace: professional hockey rink, figure skating, and public ice sessions.',
          routeTip: 'Quick route: Shalkiiz Zhyrau st. -> Oraz Tateuly st., 1',
        },
        'infra-zhekpe': {
          title: 'Zhekpe-Zhek Martial Arts Palace',
          badge: 'Martial Arts',
          desc: 'International-class multifunctional arena for martial arts, boxing, gymnastics, and championships.',
          routeTip: 'Directly along Oraz Tateuly st., 5 — modern sports arena next to Aktobe Arena',
        },
        'infra-tennis': {
          title: 'ACE Tennis Center',
          badge: 'Tennis',
          desc: 'Professional tennis club: certified Hard courts, junior academy, and personal coaching.',
          routeTip: 'Via Alash ave. to Mangilik El st., 2 — indoor and outdoor European standard courts',
        },
        'infra-dostyk': {
          title: 'Dostyk Sports Complex & Olympic Pool',
          badge: 'Swimming',
          desc: 'Modern 50-meter Olympic swimming pool, youth water polo classes, and wellness saunas.',
          routeTip: 'Via Alash ave. to Mangilik El st., 6 (next to NIS) — Olympic swimming pool',
        },
        'infra-dina': {
          title: 'Dina Hypermarket & Retail Quarter',
          badge: 'Shopping & Dining',
          desc: 'The region\'s largest food hypermarket, farm-fresh produce rows, pharmacies, banks, and cafes.',
          routeTip: 'Via Alash ave. to Sankibay Batyr ave., 366V/1 — hypermarket with expansive parking',
        },
        'infra-lake-self': {
          title: 'Bereke Natural Lake & Eco Park',
          badge: 'Heart of the Estate',
          desc: 'Natural lake, wooden promenade pier, evening illumination, pine & maple trees with automated irrigation.',
          routeTip: 'Located at the heart of the estate: direct walking access from entrance to the pier and park',
        },
        'infra-road': {
          title: 'Alash Avenue — Primary Highway Arterial',
          badge: 'Fast Highway Access',
          desc: 'Effortless traffic to any city district without congestion: 10 min to central Abilkayir Khan Avenue.',
          routeTip: 'Direct paved highway access to the 6-lane Alash Avenue connecting South-West, Batys-2, and City Center',
        },
      },
    },
    leadForm: {
      badge: 'Personal Service',
      title: 'Schedule a Private Viewing',
      desc: 'Our sales advisor will arrange a private guided tour of the estate, lake promenade, and available model residences.',
      inputName: 'Your Name',
      inputPhone: 'Phone Number',
      selectLayout: 'Preferred Residence Layout',
      inputComment: 'Preferred date and time for visit or call',
      btnSubmit: 'Request a Consultation',
      successTitle: 'Request successfully submitted!',
      successDesc: 'Our sales gallery advisor will contact you within 10 minutes.',
      securityNotice: 'Confidentiality guaranteed. Your details are safe with us.',
      directCall: 'Or call our sales team directly:',
      preferredContact: 'Preferred Contact Method',
      viaWhatsapp: 'Via WhatsApp',
      phoneCall: 'Phone Call',
      chatWhatsappNow: 'Open WhatsApp Chat Now',
      fillForm: 'Request Consultation',
      fillFormDesc: 'Our project advisor will get in touch with you and send the price list on WhatsApp.',
      workingHoursTitle: 'Office Hours',
      workingHoursValue: 'Mon-Sat: 09:00 – 19:00, Sun: 10:00 – 17:00',
      directWhatsapp: 'Direct WhatsApp',
      privacyNote: '100% Confidential. No spam calls or external brokers.',
      errorName: 'Please enter your name',
      errorPhone: 'Please enter a valid phone number (11 digits)',
      namePlaceholder: 'E.g., Azamat',
      options: {
        comfort81: '2-Room «Comfort» (81.4 sq.m)',
        grand93: '2-Room «Grand» (93.8 sq.m)',
        premium125: '3-Room «Premium» (125.2 sq.m)',
        lakeDeluxe140: '3-Room «Lake Deluxe» (140.6 sq.m)',
        grandRes165: '4-Room «Grand Residence» (165.3 sq.m)',
        penthouse188: '4-Room «Bereke Penthouse» (188.5 sq.m)',
        commercial: 'Commercial Real Estate',
      },
    },
    floating: {
      quickContact: 'Quick Contact',
      callSales: 'Call Sales Gallery',
      scrollToTop: 'Back to Top',
      salesOffice: 'Sales Gallery',
      whatsappOnline: 'WhatsApp Online',
      closeContacts: 'Close contacts',
      openContacts: 'Open contacts',
    },
    footer: {
      developerBadge: 'Club Residential Estate • Aktobe',
      aboutText: 'Premium residential estate featuring a private lake and landscaped park. Exceptional craftsmanship and club-level comfort.',
      quickLinks: 'Navigation',
      contacts: 'Sales Gallery Contacts',
      addressLabel: 'Location Address:',
      workingHoursLabel: 'Working Hours:',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      disclaimer: 'The information on this website is for informational purposes and does not constitute a public offer.',
    },
    modals: {
      consultationTitle: 'Schedule a Visit & Consultation',
      consultationSubtitle: 'Leave your contact information to receive floor plans and reserve a private tour of Bereke Park',
      layoutTitle: 'Residence Architectural Floor Plan',
      bookVisit: 'Schedule an On-Site Tour',
      mortgageCalc: 'Mortgage Programs & Installments',
      close: 'Close',
      send: 'Submit Request',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetZoom: 'Reset',
      zoomHint: 'Use zoom controls to inspect room dimensions in detail',
      ceilingHeight: 'Ceiling Height',
      neighbors: 'Neighbors per Floor',
      oneNeighbor: '1 neighbor',
      roomBreakdown: 'Room Breakdown',
      lotFeatures: 'Residence Features',
      priceInWhatsapp: 'Inquire Price in WhatsApp',
      bookTourOnSite: 'Book On-Site Viewing',
      prevPhoto: 'Previous Photo',
      nextPhoto: 'Next Photo',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('bereke_lang') as Language;
      if (saved && (saved === 'ru' || saved === 'kz' || saved === 'en')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'ru';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('bereke_lang', newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'kz' ? 'kk' : lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
