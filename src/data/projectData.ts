import type { 
  ApartmentLayout, 
  GalleryItem, 
  InfrastructureItem, 
  StatItem,
  ConstructionReportItem,
  PhilosophyQuoteItem,
  Language
} from '../types';
import { getAssetUrl } from '../utils/assets';

export const CONTACT_INFO = {
  phone: '+7 777 711 80 80',
  phoneClean: '+77777118080',
  phoneDisplay: '+7 (777) 711-80-80',
  whatsappUrl: 'https://wa.me/77777118080?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20о%20ЖК%20Bereke%20Park',
  whatsappDirect: (layoutName?: string) => 
    `https://wa.me/77777118080?text=${encodeURIComponent(
      layoutName 
        ? `Здравствуйте! Интересует планировка "${layoutName}" в ЖК Bereke Park. Подскажите актуальную стоимость и условия покупки.` 
        : 'Здравствуйте! Хочу узнать актуальную стоимость квартир и записаться на визит в ЖК Bereke Park'
    )}`,
  email: 'info@berekepark.kz',
  emailSecondary: 'berekepark@gmail.com',
  instagram: '@berekepark_aktobe',
  instagramUrl: 'https://www.instagram.com/berekepark_aktobe',
  address: 'Казахстан, г. Актобе, район Астана, ж/м Юго-Запад-2, ул. Шалкииз Жырау, дом 1 (1Б, 1Г)',
  addressShort: 'г. Актобе, район Астана, ж/м Юго-Запад-2, ул. Шалкииз Жырау, 1',
  directionHint: 'Прямой заезд с проспекта Алаш, район выше мкр. Алтын Орда (Батыс-2)',
  developer: 'Bereke Park',
  workingHours: 'Пн-Сб: 09:00 – 19:00, Вс: 10:00 – 17:00',
  coordinates: {
    lat: 50.284843,
    lng: 57.099039,
  },
  maps2gisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383',
  mapsYandexUrl: 'https://yandex.kz/maps/164/aktobe/?text=50.284843,57.099039',
  build2GisRouteUrl: (toLng: number, toLat: number) =>
    `https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C${toLng}%2C${toLat}`,
  buildYandexRouteUrl: (toLat: number, toLng: number) =>
    `https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~${toLat},${toLng}&rtt=auto`,
};

export const STATS_DATA: StatItem[] = [
  {
    value: '3.3',
    unit: 'м',
    label: 'Высота потолков',
    sublabel: 'Воздух, простор и панорамное остекление в пол',
    iconName: 'Maximize2',
  },
  {
    value: '1',
    unit: 'сосед',
    label: 'На лестничной площадке',
    sublabel: 'Бескомпромиссная приватность клубного формата',
    iconName: 'ShieldCheck',
  },
  {
    value: '10+',
    unit: 'га',
    label: 'Парк и собственное озеро',
    sublabel: 'Экосистема Green City с природным водоемом',
    iconName: 'Trees',
  },
  {
    value: '5',
    unit: 'мин',
    label: 'До всей инфраструктуры',
    sublabel: 'НИШ, ТЦ Дина, Ледовая Арена, Теннисный центр',
    iconName: 'Compass',
  },
];

export const LAYOUTS_DATA: ApartmentLayout[] = [
  {
    id: 'layout-2-comfort',
    rooms: 2,
    title: '2-комнатная «Комфорт Премиум»',
    subtitle: 'Идеальный баланс эргономики, мастер-спальни и гардеробной зоны',
    totalArea: 81.4,
    livingArea: 42.6,
    kitchenArea: 18.2,
    ceilingHeight: 3.3,
    neighborsOnFloor: 1,
    floorOptions: '2–7 этажи',
    image: 'https://berekepark.kz/wp-content/uploads/2021/09/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-11.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Просторная двухкомнатная резиденция с высокими потолками 3.3 м, глубокими окнами в пол, изолированной прачечной и собственной лаунж-зоной на этаже.',
    highlights: [
      'Потолки 3.3 метра',
      'Панорамные окна в пол с видом на парк',
      'Отдельная прачечная комната',
      'Сухая кладовая для сезонных вещей',
      'Всего 1 сосед на лестничной площадке',
      'Индивидуальный лаунж на этаже'
    ],
    roomDetails: [
      { name: 'Гостиная с панорамным окном', area: 24.8 },
      { name: 'Кухня-столовая', area: 18.2 },
      { name: 'Мастер-спальня', area: 17.8 },
      { name: 'Гардеробная комната', area: 4.5 },
      { name: 'Ванная комната', area: 5.6 },
      { name: 'Гостевой санузел', area: 2.4 },
      { name: 'Прачечная', area: 2.8 },
      { name: 'Прихожая и холл', area: 5.3 }
    ]
  },
  {
    id: 'layout-2-grand',
    rooms: 2,
    title: '2-комнатная «Гранд Резиденс»',
    subtitle: 'Увеличенная площадь 93.8 м² с двумя санузлами и террасной лоджией',
    totalArea: 93.8,
    livingArea: 49.0,
    kitchenArea: 22.4,
    ceilingHeight: 3.3,
    neighborsOnFloor: 1,
    floorOptions: '3–8 этажи',
    image: 'https://berekepark.kz/wp-content/uploads/2021/09/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-11.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Премиальная планировка с большой кухней-гостиной, просторной мастер-зоной и витражным остеклением, открывающим вид на озеро комплекса.',
    highlights: [
      'Потолки 3.3 метра',
      'Большая мастер-спальня с ванной en-suite',
      'Теплая остекленная лоджия',
      'Прачечная и встроенная кладовая',
      'Клубный формат — 1 сосед на этаже',
      'Лаунж-пространство у лифтового холла'
    ],
    roomDetails: [
      { name: 'Просторная гостиная', area: 27.5 },
      { name: 'Кухня-столовая', area: 22.4 },
      { name: 'Мастер-спальня', area: 21.5 },
      { name: 'Гардеробная при спальне', area: 5.2 },
      { name: 'Основная ванная комната', area: 6.2 },
      { name: 'Гостевой санузел', area: 2.8 },
      { name: 'Отдельная прачечная', area: 3.1 },
      { name: 'Холл', area: 5.1 }
    ]
  },
  {
    id: 'layout-3-premium',
    rooms: 3,
    title: '3-комнатная «Семейный Премиум»',
    subtitle: 'Функциональная классика 125.2 м² для семьи с двумя детьми',
    totalArea: 125.2,
    livingArea: 68.4,
    kitchenArea: 24.0,
    ceilingHeight: 3.3,
    neighborsOnFloor: 1,
    floorOptions: '2–8 этажи',
    image: 'https://berekepark.kz/wp-content/uploads/2021/09/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-11.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    description: 'Идеальное зонирование: гостевое крыло с панорамной гостиной и приватный блок спален с собственными гардеробными и санузлами.',
    highlights: [
      'Высота потолков 3.3 м',
      'Две изолированные спальни + гостиная',
      'Кухня-столовая с островом 24 м²',
      'Отдельная прачечная и сухая кладовая',
      'Один сосед на площадке',
      'Вид на природное озеро и сквер'
    ],
    roomDetails: [
      { name: 'Гостиная с панорамными окнами', area: 32.0 },
      { name: 'Кухня-столовая', area: 24.0 },
      { name: 'Мастер-спальня', area: 20.4 },
      { name: 'Детская комната', area: 16.0 },
      { name: 'Мастер-гардеробная', area: 5.8 },
      { name: 'Главная ванная', area: 7.2 },
      { name: 'Второй санузел', area: 4.2 },
      { name: 'Отдельная прачечная', area: 3.6 },
      { name: 'Холл-галерея', area: 12.0 }
    ]
  },
  {
    id: 'layout-3-lakeview',
    rooms: 3,
    title: '3-комнатная «Lake Deluxe»',
    subtitle: 'Флагманская планировка 140.6 м² с прямым видом на водную гладь',
    totalArea: 140.6,
    livingArea: 76.8,
    kitchenArea: 26.5,
    ceilingHeight: 3.3,
    neighborsOnFloor: 1,
    floorOptions: '4–8 этажи',
    image: 'https://berekepark.kz/wp-content/uploads/2021/09/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-11.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Официальная флагманская планировка ЖК Bereke Park. Огромная гостиная с витражным остеклением, премиальные спальни, раздельные гардеробные и приватный лаунж на этаже.',
    highlights: [
      'Официальная проектная площадь — 140,6 м²',
      'Высота потолков 3.3 метра',
      'Панорамные окна в гостиной с видом на озеро',
      'Отдельная изолированная прачечная',
      'Отдельная сухая кладовая внутри квартиры',
      'Индивидуальная лаунж-зона на лестничной площадке',
      'Всего 1 сосед на этаже'
    ],
    roomDetails: [
      { name: 'Панорамная гостиная', area: 36.4 },
      { name: 'Кухня-столовая с эркером', area: 26.5 },
      { name: 'Мастер-спальня', area: 22.8 },
      { name: 'Вторая спальня / Кабинет', area: 17.6 },
      { name: 'Ванная комната En-Suite', area: 8.4 },
      { name: 'Гостевой санузел с душем', area: 4.8 },
      { name: 'Изолированная прачечная', area: 4.1 },
      { name: 'Сухая кладовая комната', area: 3.8 },
      { name: 'Входной парадный холл', area: 16.2 }
    ]
  },
  {
    id: 'layout-4-residence',
    rooms: 4,
    title: '4-комнатная «Гранд Резиденция»',
    subtitle: 'Официальная проектная планировка 165.3 м² — воплощение высшего статуса',
    totalArea: 165.3,
    livingArea: 94.2,
    kitchenArea: 28.6,
    ceilingHeight: 3.3,
    neighborsOnFloor: 1,
    floorOptions: '3–8 этажи',
    image: 'https://berekepark.kz/wp-content/uploads/2021/09/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-221.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    description: 'Официальная четырехкомнатная резиденция Bereke Park площадью 165,3 м². Максимальный комфорт для большой семьи: 3 спальни, представительская гостиная, гардеробные комнаты, прачечная и сухая кладовая.',
    highlights: [
      'Официальная проектная площадь — 165,3 м²',
      'Высота потолков 3.3 метра',
      'Панорамное остекление на две стороны горизонта',
      'Отдельная прачечная комната',
      'Отдельная сухая кладовая в квартире',
      'Персональная лаунж-зона на этаже',
      'Только один сосед на всей площадке',
      'Бесшумный лифт прямо из подземного паркинга'
    ],
    roomDetails: [
      { name: 'Представительская гостиная', area: 42.5 },
      { name: 'Кухня-столовая с островом', area: 28.6 },
      { name: 'Мастер-спальня с ванной и гардеробной', area: 26.2 },
      { name: 'Детская комната №1', area: 18.4 },
      { name: 'Детская комната №2 / Кабинет', area: 17.1 },
      { name: 'Мастер-ванная', area: 8.8 },
      { name: 'Второй полноценный санузел', area: 5.2 },
      { name: 'Отдельная прачечная', area: 4.5 },
      { name: 'Сухая кладовая', area: 4.0 },
      { name: 'Прихожая и приватный холл', area: 10.0 }
    ]
  },
  {
    id: 'layout-4-penthouse',
    rooms: 4,
    title: '4-комнатный «Пентхаус Береке»',
    subtitle: 'Эксклюзивная резиденция верхнего этажа с круговой панорамой озера',
    totalArea: 188.5,
    livingArea: 112.0,
    kitchenArea: 32.0,
    ceilingHeight: 3.5,
    neighborsOnFloor: 1,
    floorOptions: 'Верхний видовой этаж',
    image: 'https://berekepark.kz/wp-content/uploads/2021/09/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-221.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Уникальное предложение верхнего уровня. Повышенная высота потолков, круговой обзор парка и озера, возможность установки дровяного камина.',
    highlights: [
      'Эксклюзивная резиденция 188.5 м²',
      'Увеличенная высота потолков 3.5 м',
      'Круговой панорамный обзор на озеро и Актобе',
      'Возможность каминной зоны в гостиной',
      'Две мастер-спальни с гардеробными',
      'Лифт с персональным чип-доступом'
    ],
    roomDetails: [
      { name: 'Гранд-гостиная с камином', area: 52.0 },
      { name: 'Кухня-столовая премиум', area: 32.0 },
      { name: 'Главная мастер-спальня', area: 28.5 },
      { name: 'Вторая мастер-спальня', area: 21.0 },
      { name: 'Кабинет / Гостевая спальня', area: 18.0 },
      { name: 'Основная СПА-ванная', area: 11.2 },
      { name: 'Второй санузел', area: 6.4 },
      { name: 'Гостевой санузел', area: 3.2 },
      { name: 'Прачечная и кладовая', area: 6.2 },
      { name: 'Парадный вестибюль', area: 10.0 }
    ]
  }
];

export const PHILOSOPHY_QUOTES: PhilosophyQuoteItem[] = [
  {
    id: 'phil-1',
    quote: 'Не подгоняйте жизнь под квартиру — выбирайте квартиру под свою жизнь.',
    highlightText: 'Жизнь под вашу семью',
    subtext: 'Лучше сразу жить так, как хочется, чем потом снова искать больше.',
    tag: 'Философия Bereke Park',
    image: '/interior/living_room.jpg',
  },
  {
    id: 'phil-2',
    quote: 'Не думайте только о цене квартиры. Думайте о цене следующего переезда.',
    highlightText: 'Инвестиция на поколения',
    subtext: 'Хорошая квартира оставляет место не только для вещей, но и для жизни.',
    tag: 'Ценность и статус',
    image: '/official/LG-I-2-scaled-1.jpg',
  },
  {
    id: 'phil-3',
    quote: 'Семья меняется. Привычки меняются. Квартира должна это выдерживать.',
    highlightText: 'Эргономика и простор',
    subtext: 'Потолки 3.3 м, изолированные прачечные, гардеробные en-suite и сухие кладовые комнаты.',
    tag: 'Комфорт De Luxe',
    image: '/interior/master_bedroom.jpg',
  },
  {
    id: 'phil-4',
    quote: 'Не покупайте квадратные метры — выбирайте пространство для своей жизни.',
    highlightText: 'Правильный выбор на годы',
    subtext: 'Квартира — это выбор на годы. Пусть она будет правильной.',
    tag: 'Пространство для жизни',
    image: '/official/Lakeside-Promenade_1080.jpg',
  },
  {
    id: 'phil-5',
    quote: 'Bereke Store: мысли, меняющие твой взгляд на недвижимость.',
    highlightText: 'Город в городе',
    subtext: 'Торговая галерея, уютные кофейни, маркеты фермерских продуктов и детские центры прямо у порога.',
    tag: 'Инфраструктура дома',
    image: '/interior/dining_kitchen.jpg',
  },
  {
    id: 'phil-6',
    quote: 'Дом начинается не с порога квартиры, а с атмосферы всего квартала.',
    highlightText: 'Приватность и статус',
    subtext: 'Дизайнерские парадные холлы, бесшумные лифты, архитектурная вечерняя подсветка и закрытый двор.',
    tag: 'Сервис и атмосфера',
    image: '/official/LG-I-N-7-scaled-1.jpg',
  },
];

export const CONSTRUCTION_REPORTS: ConstructionReportItem[] = [
  {
    id: 'const-house-3-insulation',
    title: 'Дом №3 — Монтаж минераловатного утепления фасада',
    stage: 'Теплоизоляция и каркас',
    progressPercent: 92,
    date: 'Сентябрь 2026',
    badge: 'Фасадные работы',
    description: 'Полностью завершён монтаж двухслойных негорючих минераловатных плит утепления фасада (100 мм), монтаж ветровлагозащитной мембраны и коррозионностойкой подсистемы.',
    image: '/yapx/ePyaT.png',
  },
  {
    id: 'const-house-3-subsystem',
    title: 'Дом №3 — Ветрозащитная плёнка и направляющие',
    stage: 'Вентилируемый фасад',
    progressPercent: 90,
    date: 'Сентябрь 2026',
    badge: 'Инженерия фасада',
    description: 'Монтаж сертифицированной диффузионной мембраны и усиленной алюминиевой подсистемы под панорамное остекление и навесные керамические панели.',
    image: '/yapx/ePyaU.png',
  },
  {
    id: 'const-house-3-ceramics',
    title: 'Дом №3 — Облицовка фасада керамической плиткой',
    stage: 'Чистовая отделка фасадов',
    progressPercent: 78,
    date: 'Сентябрь 2026',
    badge: 'Керамогранит & Витражи',
    description: 'Начата укладка широкоформатной фасадной керамической плитки на главном фасаде, левом торце и дворовой стороне здания. Монтаж панорамных стеклопакетов.',
    image: '/yapx/ePyaV.png',
  },
  {
    id: 'const-courtyard-sports',
    title: 'Благоустройство двора и спортивной зоны',
    stage: 'Территория & Экопарк',
    progressPercent: 70,
    date: 'Сентябрь 2026',
    badge: 'Двор и Спортивная зона',
    description: 'Завершена планировка и зонирование дворовой территории. Забетонирована чаша многофункциональной футбольной площадки. Подготовка к установке МАФов, детских городков и озеленению.',
    image: '/yapx/ePyaW.png',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-yapx-masterplan',
    title: 'Генеральный план и озеро — Жайлы өмірге бір қадам жақын',
    category: 'lake',
    categoryLabel: 'Озеро & Мастерплан',
    image: '/yapx/ePvSV.png',
    fallbackImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Масштабный проект жилого массива с собственным природным озером, набережной и парковыми зонами.',
    statusBadge: 'Официальный буклет',
  },
  {
    id: 'gal-yapx-city',
    title: 'Концепция «Город в городе» — Элитный жилой массив',
    category: 'architecture',
    categoryLabel: 'Архитектура',
    image: '/facade_luxury.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Многоэтажные дома премиум-класса, скверы, прогулочные аллеи и социальная инфраструктура нового формата в Актобе.',
    statusBadge: 'Презентация проекта',
  },
  {
    id: 'gal-yapx-facade-concept',
    title: 'Архитектура фасадов и клубный формат',
    category: 'architecture',
    categoryLabel: 'Архитектура',
    image: '/official/LG-I-N-6-scaled.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Современные линии, консольные балконы, панорамные витражи и вентилируемые фасады благородных оттенков.',
    statusBadge: 'Архитектура',
  },
  {
    id: 'gal-yapx-courtyard-eco',
    title: 'Экосистема двора и парковые перголы',
    category: 'eco',
    categoryLabel: 'Экопарк & Двор',
    image: '/yapx/ePvSc.png',
    fallbackImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    description: 'Сочетание экологически чистой природы и современных технологий умного города для комфортной жизни.',
    statusBadge: 'Экосистема',
  },
  {
    id: 'gal-interior-living',
    title: 'Дизайн гостиной с угловым панорамным остеклением',
    category: 'interior',
    categoryLabel: 'Интерьеры квартир',
    image: '/interior/living_room.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'Интерьер просторной гостиной в резиденциях Bereke Park: потолки 3.3 м, панорамные витражи с видом на озеро и парковую аллею, отделка из натурального дуба и мрамора.',
    statusBadge: 'Дизайн интерьера',
  },
  {
    id: 'gal-interior-bedroom',
    title: 'Мастер-спальня с панорамным видом на закат над озером',
    category: 'interior',
    categoryLabel: 'Интерьеры квартир',
    image: '/interior/master_bedroom.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    description: 'Приватная спальная зона с гардеробной en-suite, камином, акцентной деревянной панелью и панорамным окном во всю стену.',
    statusBadge: 'Дизайн интерьера',
  },
  {
    id: 'gal-interior-dining',
    title: 'Кухня-столовая с мраморным островом и окнами в пол',
    category: 'interior',
    categoryLabel: 'Интерьеры квартир',
    image: '/interior/dining_kitchen.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Эргономичная кухня-гостиная с островом Calacatta, винным шкафом, обеденной зоной на 8 персон и прямым выходом на террасу.',
    statusBadge: 'Дизайн интерьера',
  },
  {
    id: 'gal-official-promenade',
    title: 'Набережная озера и прогулочный пирс с террасами',
    category: 'lake',
    categoryLabel: 'Озеро & Мастерплан',
    image: '/official/Lakeside-Promenade_1080.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Благоустроенная береговая линия жилого комплекса Bereke Park: деревянный настил, перголы для отдыха, приватные лужайки резидентов первых этажей.',
    statusBadge: 'Официальный рендер',
  },
  {
    id: 'gal-official-courtyard',
    title: 'Архитектурный ансамбль и благоустроенный двор',
    category: 'architecture',
    categoryLabel: 'Архитектура',
    image: '/official/LG-I-2-scaled-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'Концепция закрытого двора без машин, современные вентилируемые фасады благородных песочных тонов, детские и спортивные зоны.',
    statusBadge: 'Официальный рендер',
  },
  {
    id: 'gal-yapx-lobby-lounge',
    title: 'Дизайнерские лобби из экологически чистых материалов',
    category: 'interior',
    categoryLabel: 'Интерьеры & Лобби',
    image: '/lobby_luxury.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'Уникальный дизайн каждого холла: натуральный мрамор, лаунж-мебель, панорамный свет и консьерж-сервис.',
    statusBadge: 'Интерьер De Luxe',
  },
  {
    id: 'gal-yapx-stairs',
    title: 'Лаконичный стиль и мраморные лестничные холлы',
    category: 'interior',
    categoryLabel: 'Интерьеры & Лобби',
    image: '/yapx/ePvSf.png',
    fallbackImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Атмосфера простора и гармонии сопровождает резидента от входных дверей до порога собственной квартиры.',
    statusBadge: 'Интерьер De Luxe',
  },
  {
    id: 'gal-yapx-wood-panels',
    title: 'Теплые классические оттенки и декоративные панели',
    category: 'interior',
    categoryLabel: 'Интерьеры & Лобби',
    image: '/yapx/ePvSi.png',
    fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Деревянные рейки, световые акценты и авторские светильники в зонах общего пользования.',
    statusBadge: 'Интерьер De Luxe',
  },
  {
    id: 'gal-yapx-store',
    title: 'Bereke Store — торговая галерея и сервисы',
    category: 'architecture',
    categoryLabel: 'Архитектура',
    image: '/bereke_store_luxury.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    description: 'Коммерческая линия комплекса: кофейни, маркеты, пекарни и бутики в шаговой доступности.',
    statusBadge: 'Инфраструктура',
  },
  {
    id: 'gal-yapx-const-1',
    title: 'Ход строительства: Дом №3 — монтаж фасадов',
    category: 'construction',
    categoryLabel: 'Ход строительства',
    image: '/yapx/ePyaT.png',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Реальный снимок со стройплощадки: монтаж панорамных стеклопакетов и фасадных керамических плит.',
    statusBadge: 'Стройка вживую',
    date: 'Сентябрь 2026',
  },
  {
    id: 'gal-yapx-const-2',
    title: 'Ход строительства: Дом №3 — ветрозащита и подсистема',
    category: 'construction',
    categoryLabel: 'Ход строительства',
    image: '/yapx/ePyaU.png',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Монтаж металлической подсистемы и минераловатного утеплителя 100 мм на фасадах здания.',
    statusBadge: 'Стройка вживую',
    date: 'Сентябрь 2026',
  },
  {
    id: 'gal-yapx-const-3',
    title: 'Ход строительства: Дом №3 — укладка керамической плитки',
    category: 'construction',
    categoryLabel: 'Ход строительства',
    image: '/yapx/ePyaV.png',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Чистовая облицовка главного и торцевого фасадов керамогранитными панелями и стеклом.',
    statusBadge: 'Стройка вживую',
    date: 'Сентябрь 2026',
  },
  {
    id: 'gal-yapx-const-4',
    title: 'Ход строительства: Благоустройство двора и спортплощадки',
    category: 'construction',
    categoryLabel: 'Ход строительства',
    image: '/yapx/ePyaW.png',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Бетонирование футбольного поля, планировка пешеходных дорожек и подготовка зон отдыха.',
    statusBadge: 'Стройка вживую',
    date: 'Сентябрь 2026',
  },
];

export const INFRASTRUCTURE_DATA: InfrastructureItem[] = [
  {
    id: 'infra-nish',
    title: 'НИШ (Назарбаев Интеллектуальная Школа)',
    category: 'education',
    distanceTime: '5 мин',
    distanceKm: '3.2 км',
    walkTime: '30 мин',
    routeTip: 'Прямой маршрут: ул. Шалкииз Жырау -> выезд на пр. Алаш -> поворот на ул. Мәңгілік Ел, 8',
    lat: 50.276649,
    lng: 57.131424,
    image: '/nish_school.jpg',
    iconName: 'GraduationCap',
    description: 'Ведущее среднее учебное заведение международного уровня естественно-математического направления.',
    badge: 'Топ-образование',
    custom2GisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C57.131424%2C50.276649%3B70000001031854810?m=57.118409%2C50.28401%2F15.47',
    customYandexUrl: 'https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~50.276649,57.131424&rtt=auto',
  },
  {
    id: 'infra-ice-arena',
    title: 'Ледовая Арена «Актобе-Арена»',
    category: 'sports',
    distanceTime: '3 мин',
    distanceKm: '1.2 км',
    walkTime: '14 мин',
    routeTip: 'Быстрый проезд: ул. Шалкииз Жырау -> ул. Ораза Татеулы, дом 1 (всего 1.2 км от ЖК)',
    lat: 50.277183,
    lng: 57.141718,
    image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80',
    iconName: 'Activity',
    description: 'Крупнейший ледовый дворец города: профессиональная хоккейная арена, фигурное катание и массовые катания.',
    badge: 'Спорт для семьи',
    custom2GisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C57.141718%2C50.277183%3B70000001035175168?m=57.120367%2C50.283675%2F15.33',
    customYandexUrl: 'https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~50.277183,57.141718&rtt=auto',
  },
  {
    id: 'infra-zhekpe',
    title: 'Дворец единоборств «Жекпе-Жек»',
    category: 'sports',
    distanceTime: '3 мин',
    distanceKm: '1.5 км',
    walkTime: '16 мин',
    routeTip: 'Прямо по ул. Ораза Татеулы, 5 — современный дворец спорта рядом с «Актобе-Ареной»',
    lat: 50.276477,
    lng: 57.138718,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    iconName: 'Medal',
    description: 'Многофункциональная арена международного класса для единоборств, бокса, гимнастики и турниров.',
    badge: 'Единоборства',
    custom2GisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C57.138718%2C50.276477%3B70000001032903788?m=57.120367%2C50.283675%2F15.33',
    customYandexUrl: 'https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~50.276477,57.138718&rtt=auto',
  },
  {
    id: 'infra-tennis',
    title: 'Теннисный центр ACE',
    category: 'sports',
    distanceTime: '4 мин',
    distanceKm: '2.3 км',
    walkTime: '22 мин',
    routeTip: 'По пр. Алаш на ул. Мәңгілік Ел, 2 — крытые и открытые корты европейского стандарта',
    lat: 50.279545,
    lng: 57.131143,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
    iconName: 'Trophy',
    description: 'Профессиональный теннисный клуб: сертифицированные покрытия Hard, детская академия и персональные тренеры.',
    badge: 'Теннис',
    custom2GisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C57.131143%2C50.279545%3B70000001034435689?m=57.115266%2C50.285331%2F15.71',
    customYandexUrl: 'https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~50.279545,57.131143&rtt=auto',
  },
  {
    id: 'infra-dostyk',
    title: 'Спортивный комплекс / бассейн «Достык»',
    category: 'sports',
    distanceTime: '5 мин',
    distanceKm: '3.0 км',
    walkTime: '28 мин',
    routeTip: 'По пр. Алаш на ул. Мәңгілік Ел, 6 (рядом со школой НИШ) — олимпийский плавательный бассейн',
    lat: 50.278127,
    lng: 57.132931,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    iconName: 'Waves',
    description: 'Современный 50-метровый бассейн, детские секции водного поло и плавания, восстановительные сауны.',
    badge: 'Плавание',
    custom2GisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C57.132931%2C50.278127%3B70000001032457613?m=57.118409%2C50.284748%2F15.47',
    customYandexUrl: 'https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~50.278127,57.132931&rtt=auto',
  },
  {
    id: 'infra-dina',
    title: 'Гипермаркет «Дина» и Торговый Квартал',
    category: 'shopping',
    distanceTime: '6 мин',
    distanceKm: '3.8 км',
    walkTime: '35 мин',
    routeTip: 'Выезд по пр. Алаш на пр. Санкибай Батыра, 366В/1 — гипермаркет с обширным паркингом',
    lat: 50.283495,
    lng: 57.14528,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShoppingBag',
    description: 'Крупнейший продуктовый гипермаркет, свежие фермерские ряды, аптеки, банки и кафе.',
    badge: 'Шопинг & Еда',
    custom2GisUrl: 'https://2gis.kz/aktobe/directions/points/57.099039%2C50.284843%3B70030076857509383%7C57.14528%2C50.283495%3B70000001031946334?m=57.12194%2C50.288741%2F15.24',
    customYandexUrl: 'https://yandex.kz/maps/164/aktobe/?rtext=50.284843,57.099039~50.283495,57.14528&rtt=auto',
  },
];

export const KEY_ADVANTAGES = [
  {
    title: 'Собственное природное озеро',
    desc: 'Единственный жилой комплекс в Актобе с естественным водоемом и благоустроенным пирсом в центре парка.',
    icon: 'Droplets'
  },
  {
    title: 'Потолки 3.3 метра и панорама в пол',
    desc: 'Огромное воздушное пространство, наполненное естественным светом. Окна открывают панораму на озеро и сквер.',
    icon: 'Maximize2'
  },
  {
    title: 'Приватность: 1 сосед на площадке',
    desc: 'Клубный формат премиального жилья. Никаких многолюдных коридоров — только тишина, безопасность и статус.',
    icon: 'Users'
  },
  {
    title: 'Индивидуальные лаунж-зоны',
    desc: 'Каждый этаж оборудован мягкой лаунж-зоной для отдыха, бесед и ожидания курьеров или гостей.',
    icon: 'Armchair'
  },
  {
    title: 'Прачечные и сухие кладовые',
    desc: 'Функциональный бытовой комфорт: белье и сушка не занимают жилое пространство, а сезонные вещи хранятся в сухости.',
    icon: 'Boxes'
  },
  {
    title: 'Концепция Green City & Smart City',
    desc: 'Круглосуточный консьерж, IP-домофония, видеонаблюдение без слепых зон и автополив для сосен, кленов и роз.',
    icon: 'ShieldCheck'
  }
];

export const LAYOUTS_TRANSLATIONS: Record<
  Language,
  Record<
    string,
    {
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
      floorOptions: string;
      roomDetails: { name: string; area: number }[];
    }
  >
> = {
  ru: {
    'layout-2-comfort': {
      title: '2-комнатная «Комфорт»',
      subtitle: 'Официальная проектная планировка 81.4 м² с мастер-спальней и лаунж-зоной',
      description: 'Просторная двухкомнатная резиденция с высокими потолками 3.3 м, глубокими окнами в пол, изолированной прачечной и собственной лаунж-зоной на этаже.',
      highlights: [
        'Потолки 3.3 метра',
        'Панорамные окна в пол с видом на парк',
        'Отдельная прачечная комната',
        'Сухая кладовая для сезонных вещей',
        'Всего 1 сосед на лестничной площадке',
        'Индивидуальный лаунж на этаже'
      ],
      floorOptions: '2–7 этажи',
      roomDetails: [
        { name: 'Гостиная с панорамным окном', area: 24.8 },
        { name: 'Кухня-столовая', area: 18.2 },
        { name: 'Мастер-спальня', area: 17.8 },
        { name: 'Гардеробная комната', area: 4.5 },
        { name: 'Ванная комната', area: 5.6 },
        { name: 'Гостевой санузел', area: 2.4 },
        { name: 'Прачечная', area: 2.8 },
        { name: 'Прихожая и холл', area: 5.3 }
      ]
    },
    'layout-2-grand': {
      title: '2-комнатная «Гранд Резиденс»',
      subtitle: 'Увеличенная площадь 93.8 м² с двумя санузлами и террасной лоджией',
      description: 'Премиальная планировка с большой кухней-гостиной, просторной мастер-зоной и витражным остеклением, открывающим вид на озеро комплекса.',
      highlights: [
        'Потолки 3.3 метра',
        'Большая мастер-спальня с ванной en-suite',
        'Теплая остекленная лоджия',
        'Прачечная и встроенная кладовая',
        'Клубный формат — 1 сосед на этаже',
        'Лаунж-пространство у лифтового холла'
      ],
      floorOptions: '3–8 этажи',
      roomDetails: [
        { name: 'Просторная гостиная', area: 27.5 },
        { name: 'Кухня-столовая', area: 22.4 },
        { name: 'Мастер-спальня', area: 21.5 },
        { name: 'Гардеробная при спальне', area: 5.2 },
        { name: 'Основная ванная комната', area: 6.2 },
        { name: 'Гостевой санузел', area: 2.8 },
        { name: 'Отдельная прачечная', area: 3.1 },
        { name: 'Холл', area: 5.1 }
      ]
    },
    'layout-3-premium': {
      title: '3-комнатная «Семейный Премиум»',
      subtitle: 'Функциональная классика 125.2 м² для семьи с двумя детьми',
      description: 'Идеальное зонирование: гостевое крыло с панорамной гостиной и приватный блок спален с собственными гардеробными и санузлами.',
      highlights: [
        'Высота потолков 3.3 м',
        'Две изолированные спальни + гостиная',
        'Кухня-столовая с островом 24 м²',
        'Отдельная прачечная и сухая кладовая',
        'Один сосед на площадке',
        'Вид на природное озеро и сквер'
      ],
      floorOptions: '2–8 этажи',
      roomDetails: [
        { name: 'Гостиная с панорамными окнами', area: 32.0 },
        { name: 'Кухня-столовая', area: 24.0 },
        { name: 'Мастер-спальня', area: 20.4 },
        { name: 'Детская комната', area: 16.0 },
        { name: 'Мастер-гардеробная', area: 5.8 },
        { name: 'Главная ванная', area: 7.2 },
        { name: 'Второй санузел', area: 4.2 },
        { name: 'Отдельная прачечная', area: 3.6 },
        { name: 'Холл-галерея', area: 12.0 }
      ]
    },
    'layout-3-lakeview': {
      title: '3-комнатная «Lake Deluxe»',
      subtitle: 'Флагманская планировка 140.6 м² с прямым видом на водную гладь',
      description: 'Официальная флагманская планировка ЖК Bereke Park. Огромная гостиная с витражным остеклением, премиальные спальни, раздельные гардеробные и приватный лаунж на этаже.',
      highlights: [
        'Официальная проектная площадь — 140,6 м²',
        'Высота потолков 3.3 метра',
        'Панорамные окна в гостиной с видом на озеро',
        'Отдельная изолированная прачечная',
        'Отдельная сухая кладовая внутри квартиры',
        'Индивидуальная лаунж-зона на лестничной площадке',
        'Всего 1 сосед на этаже'
      ],
      floorOptions: '4–8 этажи',
      roomDetails: [
        { name: 'Панорамная гостиная', area: 36.4 },
        { name: 'Кухня-столовая с эркером', area: 26.5 },
        { name: 'Мастер-спальня', area: 22.8 },
        { name: 'Вторая спальня / Кабинет', area: 17.6 },
        { name: 'Ванная комната En-Suite', area: 8.4 },
        { name: 'Гостевой санузел с душем', area: 4.8 },
        { name: 'Изолированная прачечная', area: 4.1 },
        { name: 'Сухая кладовая комната', area: 3.8 },
        { name: 'Входной парадный холл', area: 16.2 }
      ]
    },
    'layout-4-residence': {
      title: '4-комнатная «Гранд Резиденция»',
      subtitle: 'Официальная проектная планировка 165.3 м² — воплощение высшего статуса',
      description: 'Официальная четырехкомнатная резиденция Bereke Park площадью 165,3 м². Максимальный комфорт для большой семьи: 3 спальни, представительская гостиная, гардеробные комнаты, прачечная и сухая кладовая.',
      highlights: [
        'Официальная проектная площадь — 165,3 м²',
        'Высота потолков 3.3 метра',
        'Панорамное остекление на две стороны горизонта',
        'Отдельная прачечная комната',
        'Отдельная сухая кладовая в квартире',
        'Персональная лаунж-зона на этаже',
        'Только один сосед на всей площадке',
        'Бесшумный лифт прямо из подземного паркинга'
      ],
      floorOptions: '3–8 этажи',
      roomDetails: [
        { name: 'Представительская гостиная', area: 42.5 },
        { name: 'Кухня-столовая с островом', area: 28.6 },
        { name: 'Мастер-спальня с ванной и гардеробной', area: 26.2 },
        { name: 'Детская комната №1', area: 18.4 },
        { name: 'Детская комната №2 / Кабинет', area: 17.1 },
        { name: 'Мастер-ванная', area: 8.8 },
        { name: 'Второй полноценный санузел', area: 5.2 },
        { name: 'Отдельная прачечная', area: 4.5 },
        { name: 'Сухая кладовая', area: 4.0 },
        { name: 'Прихожая и приватный холл', area: 10.0 }
      ]
    },
    'layout-4-penthouse': {
      title: '4-комнатный «Пентхаус Береке»',
      subtitle: 'Эксклюзивная резиденция верхнего этажа с круговой панорамой озера',
      description: 'Уникальное предложение верхнего уровня. Повышенная высота потолков, круговой обзор парка и озера, возможность установки дровяного камина.',
      highlights: [
        'Эксклюзивная резиденция 188.5 м²',
        'Увеличенная высота потолков 3.5 м',
        'Круговой панорамный обзор на озеро и Актобе',
        'Возможность каминной зоны в гостиной',
        'Две мастер-спальни с гардеробными',
        'Лифт с персональным чип-доступом'
      ],
      floorOptions: 'Верхний видовой этаж',
      roomDetails: [
        { name: 'Гранд-гостиная с камином', area: 52.0 },
        { name: 'Кухня-столовая премиум', area: 32.0 },
        { name: 'Главная мастер-спальня', area: 28.5 },
        { name: 'Вторая мастер-спальня', area: 21.0 },
        { name: 'Кабинет / Гостевая спальня', area: 18.0 },
        { name: 'Основная СПА-ванная', area: 11.2 },
        { name: 'Второй санузел', area: 6.4 },
        { name: 'Гостевой санузел', area: 3.2 },
        { name: 'Прачечная и кладовая', area: 6.2 },
        { name: 'Парадный вестибюль', area: 10.0 }
      ]
    }
  },
  kz: {
    'layout-2-comfort': {
      title: '2 бөлмелі «Комфорт»',
      subtitle: 'Мастер-жатын бөлмесі және демалыс аймағы бар ресми 81.4 м² жобалық жоспары',
      description: 'Төбесі 3.3 м биік, еденнен төбеге дейінгі панорамалық терезелері, жеке кір жуатын бөлмесі және қабаттағы жеке лаунж-аймағы бар кең екі бөлмелі резиденция.',
      highlights: [
        'Төбенің биіктігі 3.3 метр',
        'Саябаққа қарайтын еденнен төбеге дейінгі панорамалық терезелер',
        'Бөлек кір жуатын бөлме',
        'Маусымдық заттарға арналған құрғақ қойма',
        'Баспалдақ алаңында бар болғаны 1 көрші',
        'Қабаттағы жеке лаунж-кеңістік'
      ],
      floorOptions: '2–7 қабаттар',
      roomDetails: [
        { name: 'Панорамалық терезесі бар қонақ бөлме', area: 24.8 },
        { name: 'Асүй-асхана', area: 18.2 },
        { name: 'Мастер-жатын бөлме', area: 17.8 },
        { name: 'Киім шешетін бөлме', area: 4.5 },
        { name: 'Жуынатын бөлме', area: 5.6 },
        { name: 'Қонақтарға арналған жуынатын бөлме', area: 2.4 },
        { name: 'Кір жуатын бөлме', area: 2.8 },
        { name: 'Кіреберіс пен дәліз', area: 5.3 }
      ]
    },
    'layout-2-grand': {
      title: '2 бөлмелі «Гранд Резиденс»',
      subtitle: 'Екі жуынатын бөлмесі және террасалық лоджиясы бар ұлғайтылған 93.8 м² ауданы',
      description: 'Үлкен асүй-қонақ бөлмесі, кең мастер-аймағы және кешен көліне көрініс ашатын витражды әйнектері бар премиум жоспарлау.',
      highlights: [
        'Төбенің биіктігі 3.3 метр',
        'En-suite жуынатын бөлмесі бар үлкен мастер-жатын бөлме',
        'Жылытылған әйнекті лоджия',
        'Кір жуатын бөлме және кіріктірілген қойма',
        'Клубтық формат — қабатта бар болғаны 1 көрші',
        'Лифт холлының жанындағы лаунж-кеңістік'
      ],
      floorOptions: '3–8 қабаттар',
      roomDetails: [
        { name: 'Кең қонақ бөлме', area: 27.5 },
        { name: 'Асүй-асхана', area: 22.4 },
        { name: 'Мастер-жатын бөлме', area: 21.5 },
        { name: 'Жатын бөлме жанындағы киім шешетін бөлме', area: 5.2 },
        { name: 'Негізгі жуынатын бөлме', area: 6.2 },
        { name: 'Қонақтарға арналған жуынатын бөлме', area: 2.8 },
        { name: 'Бөлек кір жуатын бөлме', area: 3.1 },
        { name: 'Дәліз', area: 5.1 }
      ]
    },
    'layout-3-premium': {
      title: '3 бөлмелі «Отбасылық Премиум»',
      subtitle: 'Екі баласы бар отбасына арналған функционалды классикалық 125.2 м²',
      description: 'Мінсіз аймақтарға бөлу: панорамалық қонақ бөлмесі бар қонақ қанаты және жеке киім шешетін және жуынатын бөлмелері бар жатын бөлмелер блогы.',
      highlights: [
        'Төбенің биіктігі 3.3 м',
        'Екі оқшауланған жатын бөлме + қонақ бөлме',
        '24 м² аралы бар асүй-асхана',
        'Бөлек кір жуатын бөлме және құрғақ қойма',
        'Алаңда жалғыз көрші',
        'Табиғи көлге және гүлзарға көрініс'
      ],
      floorOptions: '2–8 қабаттар',
      roomDetails: [
        { name: 'Панорамалық терезелері бар қонақ бөлме', area: 32.0 },
        { name: 'Асүй-асхана', area: 24.0 },
        { name: 'Мастер-жатын бөлме', area: 20.4 },
        { name: 'Балалар бөлмесі', area: 16.0 },
        { name: 'Мастер-киім шешетін бөлме', area: 5.8 },
        { name: 'Басты жуынатын бөлме', area: 7.2 },
        { name: 'Екінші жуынатын бөлме', area: 4.2 },
        { name: 'Бөлек кір жуатын бөлме', area: 3.6 },
        { name: 'Галерея-дәліз', area: 12.0 }
      ]
    },
    'layout-3-lakeview': {
      title: '3 бөлмелі «Lake Deluxe»',
      subtitle: 'Су айдынына тікелей көрінісі бар 140.6 м² флагмандық жоспар',
      description: 'Bereke Park ТК ресми флагмандық жоспарлауы. Витражды әйнекті алып қонақ бөлмесі, премиум жатын бөлмелер, бөлек киім шешетін бөлмелер және қабаттағы жеке лаунж.',
      highlights: [
        'Ресми жобалық ауданы — 140,6 м²',
        'Төбенің биіктігі 3.3 метр',
        'Қонақ бөлмедегі көлге қарайтын панорамалық терезелер',
        'Бөлек оқшауланған кір жуатын бөлме',
        'Пәтер ішіндегі бөлек құрғақ қойма',
        'Баспалдақ алаңындағы жеке лаунж-аймақ',
        'Қабатта бар болғаны 1 көрші'
      ],
      floorOptions: '4–8 қабаттар',
      roomDetails: [
        { name: 'Панорамалық қонақ бөлме', area: 36.4 },
        { name: 'Эркері бар асүй-асхана', area: 26.5 },
        { name: 'Мастер-жатын бөлме', area: 22.8 },
        { name: 'Екінші жатын бөлме / Жұмыс бөлмесі', area: 17.6 },
        { name: 'En-Suite жуынатын бөлмесі', area: 8.4 },
        { name: 'Душы бар қонақтарға арналған жуынатын бөлме', area: 4.8 },
        { name: 'Оқшауланған кір жуатын бөлме', area: 4.1 },
        { name: 'Құрғақ қойма бөлмесі', area: 3.8 },
        { name: 'Парадтық кіреберіс холлы', area: 16.2 }
      ]
    },
    'layout-4-residence': {
      title: '4 бөлмелі «Гранд Резиденция»',
      subtitle: 'Ресми жобалық 165.3 м² жоспары — жоғары мәртебенің көрінісі',
      description: 'Bereke Park кешенінің 165,3 м² ауданы бар ресми төрт бөлмелі резиденциясы. Үлкен отбасы үшін барынша жайлылық: 3 жатын бөлме, өкілдік қонақ бөлмесі, киім шешетін бөлмелер, кір жуатын бөлме және құрғақ қойма.',
      highlights: [
        'Ресми жобалық ауданы — 165,3 м²',
        'Төбенің биіктігі 3.3 метр',
        'Көкжиектің екі жағына панорамалық әйнектеу',
        'Бөлек кір жуатын бөлме',
        'Пәтер ішіндегі бөлек құрғақ қойма',
        'Қабаттағы жеке лаунж-аймақ',
        'Бүкіл алаңда тек бір ғана көрші',
        'Жерасты автотұрағынан тікелей тыныш лифт'
      ],
      floorOptions: '3–8 қабаттар',
      roomDetails: [
        { name: 'Өкілдік қонақ бөлмесі', area: 42.5 },
        { name: 'Аралы бар асүй-асхана', area: 28.6 },
        { name: 'Ваннасы мен киім шешетін бөлмесі бар мастер-жатын бөлме', area: 26.2 },
        { name: '№1 балалар бөлмесі', area: 18.4 },
        { name: '№2 балалар бөлмесі / Жұмыс бөлмесі', area: 17.1 },
        { name: 'Мастер-ванна', area: 8.8 },
        { name: 'Екінші толыққанды жуынатын бөлме', area: 5.2 },
        { name: 'Бөлек кір жуатын бөлме', area: 4.5 },
        { name: 'Құрғақ қойма', area: 4.0 },
        { name: 'Кіреберіс және жеке дәліз', area: 10.0 }
      ]
    },
    'layout-4-penthouse': {
      title: '4 бөлмелі «Береке Пентхаусы»',
      subtitle: 'Көлдің айналмалы панорамасы бар жоғарғы қабаттағы эксклюзивті резиденция',
      description: 'Жоғарғы деңгейдегі бірегей ұсыныс. Төбенің ұлғайтылған биіктігі, саябақ пен көлге айналмалы шолу, ағаш жағатын камин орнату мүмкіндігі.',
      highlights: [
        'Эксклюзивті резиденция 188.5 м²',
        'Төбенің ұлғайтылған биіктігі 3.5 м',
        'Көлге және Ақтөбеге айналмалы панорамалық шолу',
        'Қонақ бөлмеде камин аймағын жасау мүмкіндігі',
        'Киім шешетін бөлмелері бар екі мастер-жатын бөлме',
        'Жеке чип-рұқсаты бар лифт'
      ],
      floorOptions: 'Жоғарғы видовой қабат',
      roomDetails: [
        { name: 'Камині бар гранд-қонақ бөлме', area: 52.0 },
        { name: 'Премиум асүй-асхана', area: 32.0 },
        { name: 'Басты мастер-жатын бөлме', area: 28.5 },
        { name: 'Екінші мастер-жатын бөлме', area: 21.0 },
        { name: 'Жұмыс бөлмесі / Қонақтар бөлмесі', area: 18.0 },
        { name: 'Негізгі СПА-ванна', area: 11.2 },
        { name: 'Екінші жуынатын бөлме', area: 6.4 },
        { name: 'Қонақтарға арналған жуынатын бөлме', area: 3.2 },
        { name: 'Кір жуатын бөлме және қойма', area: 6.2 },
        { name: 'Парадтық вестибюль', area: 10.0 }
      ]
    }
  },
  en: {
    'layout-2-comfort': {
      title: '2-Room “Comfort”',
      subtitle: 'Official 81.4 sq.m architectural layout with master bedroom & floor lounge',
      description: 'Spacious two-room residence with 3.3m high ceilings, floor-to-ceiling panoramic windows, isolated laundry room, and private floor lounge area.',
      highlights: [
        'Ceiling height 3.3 meters',
        'Floor-to-ceiling panoramic windows overlooking the park',
        'Dedicated laundry room',
        'Dry storage room for seasonal items',
        'Only 1 neighbor per floor landing',
        'Private floor lounge space'
      ],
      floorOptions: 'Floors 2–7',
      roomDetails: [
        { name: 'Living room with panoramic window', area: 24.8 },
        { name: 'Kitchen & dining room', area: 18.2 },
        { name: 'Master bedroom', area: 17.8 },
        { name: 'Walk-in closet', area: 4.5 },
        { name: 'Bathroom', area: 5.6 },
        { name: 'Guest powder room', area: 2.4 },
        { name: 'Laundry room', area: 2.8 },
        { name: 'Entryway & hallway', area: 5.3 }
      ]
    },
    'layout-2-grand': {
      title: '2-Room “Grand Residence”',
      subtitle: 'Expanded 93.8 sq.m layout with two bathrooms & terrace loggia',
      description: 'Premium layout with a spacious kitchen-living area, large master suite, and stained-glass panoramic windows overlooking the private lake.',
      highlights: [
        'Ceiling height 3.3 meters',
        'Large master bedroom with en-suite bath',
        'Insulated glass loggia',
        'Laundry & built-in storage',
        'Club format — 1 neighbor per floor',
        'Lounge area by the elevator hall'
      ],
      floorOptions: 'Floors 3–8',
      roomDetails: [
        { name: 'Spacious living room', area: 27.5 },
        { name: 'Kitchen & dining room', area: 22.4 },
        { name: 'Master bedroom', area: 21.5 },
        { name: 'Walk-in closet', area: 5.2 },
        { name: 'Main bathroom', area: 6.2 },
        { name: 'Guest powder room', area: 2.8 },
        { name: 'Dedicated laundry', area: 3.1 },
        { name: 'Hallway', area: 5.1 }
      ]
    },
    'layout-3-premium': {
      title: '3-Room “Family Premium”',
      subtitle: 'Functional 125.2 sq.m classic for families with two children',
      description: 'Ideal zoning: guest wing with panoramic living area and private bedroom quarter with walk-in wardrobes and bathrooms.',
      highlights: [
        'Ceiling height 3.3m',
        'Two isolated bedrooms + living room',
        'Kitchen-dining with island (24 sq.m)',
        'Dedicated laundry and dry storage',
        'Only 1 neighbor per floor',
        'Views of natural lake and square'
      ],
      floorOptions: 'Floors 2–8',
      roomDetails: [
        { name: 'Living room with panoramic windows', area: 32.0 },
        { name: 'Kitchen & dining room', area: 24.0 },
        { name: 'Master bedroom', area: 20.4 },
        { name: 'Children’s bedroom', area: 16.0 },
        { name: 'Master walk-in wardrobe', area: 5.8 },
        { name: 'Main bathroom', area: 7.2 },
        { name: 'Second bathroom', area: 4.2 },
        { name: 'Dedicated laundry', area: 3.6 },
        { name: 'Gallery hallway', area: 12.0 }
      ]
    },
    'layout-3-lakeview': {
      title: '3-Room “Lake Deluxe”',
      subtitle: 'Flagship 140.6 sq.m layout with direct lakefront view',
      description: 'Official flagship layout of Bereke Park RC. Grand living room with stained-glass glazing, premium bedrooms, separate dressing rooms, and private floor lounge.',
      highlights: [
        'Official project area — 140.6 sq.m',
        'Ceiling height 3.3 meters',
        'Panoramic lakeview windows in living room',
        'Separate enclosed laundry room',
        'Private dry storage within the apartment',
        'Dedicated lounge area on floor landing',
        'Only 1 neighbor per floor'
      ],
      floorOptions: 'Floors 4–8',
      roomDetails: [
        { name: 'Panoramic living room', area: 36.4 },
        { name: 'Kitchen-dining with bay window', area: 26.5 },
        { name: 'Master bedroom', area: 22.8 },
        { name: 'Second bedroom / Study', area: 17.6 },
        { name: 'En-Suite bathroom', area: 8.4 },
        { name: 'Guest bathroom with shower', area: 4.8 },
        { name: 'Isolated laundry room', area: 4.1 },
        { name: 'Dry storage room', area: 3.8 },
        { name: 'Grand entrance hall', area: 16.2 }
      ]
    },
    'layout-4-residence': {
      title: '4-Room “Grand Residence”',
      subtitle: 'Official 165.3 sq.m architectural plan — the pinnacle of prestige',
      description: 'Official four-room residence in Bereke Park with 165.3 sq.m. Maximum comfort for a large family: 3 bedrooms, executive living room, walk-in closets, laundry room, and dry pantry.',
      highlights: [
        'Official project area — 165.3 sq.m',
        'Ceiling height 3.3 meters',
        'Panoramic glazing on two horizons',
        'Dedicated laundry room',
        'Dedicated dry pantry in the apartment',
        'Personal lounge area on floor',
        'Only one neighbor on the entire floor',
        'Silent elevator directly from underground parking'
      ],
      floorOptions: 'Floors 3–8',
      roomDetails: [
        { name: 'Executive living room', area: 42.5 },
        { name: 'Kitchen-dining with island', area: 28.6 },
        { name: 'Master suite with bath & walk-in closet', area: 26.2 },
        { name: 'Children’s bedroom #1', area: 18.4 },
        { name: 'Children’s bedroom #2 / Study', area: 17.1 },
        { name: 'Master bathroom', area: 8.8 },
        { name: 'Second full bathroom', area: 5.2 },
        { name: 'Dedicated laundry', area: 4.5 },
        { name: 'Dry storage room', area: 4.0 },
        { name: 'Entryway & private hallway', area: 10.0 }
      ]
    },
    'layout-4-penthouse': {
      title: '4-Room “Bereke Penthouse”',
      subtitle: 'Exclusive top-floor residence with 360° lake panorama',
      description: 'Unique top-level offering. Soaring 3.5m ceilings, 360-degree views of park and lake, wood-burning fireplace installation ready.',
      highlights: [
        'Exclusive residence 188.5 sq.m',
        'Increased ceiling height 3.5 m',
        '360° panoramic views over lake & Aktobe',
        'Fireplace lounge possibility in living room',
        'Two master bedrooms with walk-in wardrobes',
        'Elevator with private chip-card access'
      ],
      floorOptions: 'Top panoramic floor',
      roomDetails: [
        { name: 'Grand living room with fireplace', area: 52.0 },
        { name: 'Premium kitchen-dining room', area: 32.0 },
        { name: 'Principal master bedroom', area: 28.5 },
        { name: 'Second master bedroom', area: 21.0 },
        { name: 'Study / Guest bedroom', area: 18.0 },
        { name: 'Primary SPA-bathroom', area: 11.2 },
        { name: 'Second bathroom', area: 6.4 },
        { name: 'Guest powder room', area: 3.2 },
        { name: 'Laundry and storage room', area: 6.2 },
        { name: 'Grand reception foyer', area: 10.0 }
      ]
    }
  }
};

export const getLocalizedLayout = (layout: ApartmentLayout, lang: Language): ApartmentLayout => {
  const tr = LAYOUTS_TRANSLATIONS[lang]?.[layout.id] || LAYOUTS_TRANSLATIONS.ru[layout.id];
  if (!tr) return layout;

  return {
    ...layout,
    title: tr.title || layout.title,
    subtitle: tr.subtitle || layout.subtitle,
    description: tr.description || layout.description,
    highlights: tr.highlights || layout.highlights,
    floorOptions: tr.floorOptions || layout.floorOptions,
    roomDetails: tr.roomDetails || layout.roomDetails,
  };
};

export const CONSTRUCTION_TRANSLATIONS: Record<
  Language,
  Record<
    string,
    {
      title: string;
      stage: string;
      date: string;
      badge: string;
      description: string;
    }
  >
> = {
  ru: {
    'const-house-3-insulation': {
      title: 'Дом №3 — Монтаж минераловатного утепления фасада',
      stage: 'Теплоизоляция и каркас',
      date: 'Сентябрь 2026',
      badge: 'Фасадные работы',
      description: 'Полностью завершён монтаж двухслойных негорючих минераловатных плит утепления фасада (100 мм), монтаж ветровлагозащитной мембраны и коррозионностойкой подсистемы.',
    },
    'const-house-3-subsystem': {
      title: 'Дом №3 — Ветрозащитная плёнка и направляющие',
      stage: 'Вентилируемый фасад',
      date: 'Сентябрь 2026',
      badge: 'Инженерия фасада',
      description: 'Монтаж сертифицированной диффузионной мембраны и усиленной алюминиевой подсистемы под панорамное остекление и навесные керамические панели.',
    },
    'const-house-3-ceramics': {
      title: 'Дом №3 — Облицовка фасада керамической плиткой',
      stage: 'Чистовая отделка фасадов',
      date: 'Сентябрь 2026',
      badge: 'Керамогранит & Витражи',
      description: 'Начата укладка широкоформатной фасадной керамической плитки на главном фасаде, левом торце и дворовой стороне здания. Монтаж панорамных стеклопакетов.',
    },
    'const-courtyard-sports': {
      title: 'Благоустройство двора и спортивной зоны',
      stage: 'Территория & Экопарк',
      date: 'Сентябрь 2026',
      badge: 'Двор и Спортивная зона',
      description: 'Завершена планировка и зонирование дворовой территории. Забетонирована чаша многофункциональной футбольной площадки. Подготовка к установке МАФов, детских городков и озеленению.',
    },
  },
  kz: {
    'const-house-3-insulation': {
      title: '№3 үй — Қасбетті минералды мақтамен жылытуды монтаждау',
      stage: 'Жылу оқшаулау және қаңқа',
      date: 'Қыркүйек 2026',
      badge: 'Қасбеттік жұмыстар',
      description: 'Қасбетті жылытуға арналған екі қабатты жанбайтын минералды мақта тақталарын (100 мм), жел-ылғалдан қорғайтын мембрананы және коррозияға төзімді ішкі жүйені монтаждау толық аяқталды.',
    },
    'const-house-3-subsystem': {
      title: '№3 үй — Желден қорғайтын қабықша және бағыттауыштар',
      stage: 'Желдетілетін қасбет',
      date: 'Қыркүйек 2026',
      badge: 'Қасбет инженериясы',
      description: 'Панорамалық шынылау мен аспалы керамикалық панельдерге арналған сертификатталған диффузиялық мембрана мен күшейтілген алюминий ішкі жүйесін монтаждау.',
    },
    'const-house-3-ceramics': {
      title: '№3 үй — Қасбетті керамикалық плиткамен қаптау',
      stage: 'Қасбеттерді әрлеу',
      date: 'Қыркүйек 2026',
      badge: 'Керамогранит & Витраждар',
      description: 'Ғимараттың бас қасбетінде, сол жақ бүйірінде және аула жағында кең форматты қасбеттік керамикалық плиткаларды қалау басталды. Панорамалық шыны пакеттерді монтаждау.',
    },
    'const-courtyard-sports': {
      title: 'Аула мен спорт аймағын абаттандыру',
      stage: 'Аумақ & Экопарк',
      date: 'Қыркүйек 2026',
      badge: 'Аула және спорт аймағы',
      description: 'Аула аумағын жоспарлау және аймақтарға бөлу аяқталды. Көпфункционалды футбол алаңының табаны бетондалды. Шағын сәулет нысандарын, балалар қалашықтарын орнатуға және көгалдандыруға дайындық.',
    },
  },
  en: {
    'const-house-3-insulation': {
      title: 'Building #3 — Mineral Wool Facade Insulation',
      stage: 'Thermal Insulation & Framework',
      date: 'September 2026',
      badge: 'Facade Works',
      description: 'Completed installation of dual-layer non-combustible mineral wool insulation panels (100 mm), wind and moisture barrier membrane, and corrosion-resistant sub-structure.',
    },
    'const-house-3-subsystem': {
      title: 'Building #3 — Weather Barrier & Mounting Guides',
      stage: 'Ventilated Facade',
      date: 'September 2026',
      badge: 'Facade Engineering',
      description: 'Installation of certified vapor-permeable membrane and reinforced aluminum substructure for panoramic glazing and ceramic cladding.',
    },
    'const-house-3-ceramics': {
      title: 'Building #3 — Exterior Ceramic Tile Cladding',
      stage: 'Exterior Finishing',
      date: 'September 2026',
      badge: 'Porcelain & Stained Glass',
      description: 'Started mounting large-format ceramic facade panels on main elevation, side wing, and courtyard facade. Panoramic energy-efficient double-glazing installation.',
    },
    'const-courtyard-sports': {
      title: 'Courtyard & Sports Zone Landscaping',
      stage: 'Landscape & Ecopark',
      date: 'September 2026',
      badge: 'Courtyard & Sports Zone',
      description: 'Courtyard layout and functional zoning completed. Concrete foundation poured for multi-sport football court. Ground preparation for children playgrounds and tree planting.',
    },
  },
};

export const getLocalizedConstructionReport = (
  report: ConstructionReportItem,
  lang: Language
): ConstructionReportItem => {
  const tr = CONSTRUCTION_TRANSLATIONS[lang]?.[report.id] || CONSTRUCTION_TRANSLATIONS.ru[report.id];
  if (!tr) return report;

  return {
    ...report,
    title: tr.title || report.title,
    stage: tr.stage || report.stage,
    date: tr.date || report.date,
    badge: tr.badge || report.badge,
    description: tr.description || report.description,
  };
};

export const PHILOSOPHY_TRANSLATIONS: Record<
  Language,
  Record<
    string,
    {
      quote: string;
      highlightText: string;
      subtext: string;
      tag: string;
    }
  >
> = {
  ru: {
    'phil-1': {
      quote: 'Не подгоняйте жизнь под квартиру — выбирайте квартиру под свою жизнь.',
      highlightText: 'Жизнь под вашу семью',
      subtext: 'Лучше сразу жить так, как хочется, чем потом снова искать больше.',
      tag: 'Философия Bereke Park',
    },
    'phil-2': {
      quote: 'Не думайте только о цене квартиры. Думайте о цене следующего переезда.',
      highlightText: 'Инвестиция на поколения',
      subtext: 'Хорошая квартира оставляет место не только для вещей, но и для жизни.',
      tag: 'Ценность и статус',
    },
    'phil-3': {
      quote: 'Семья меняется. Привычки меняются. Квартира должна это выдерживать.',
      highlightText: 'Эргономика и простор',
      subtext: 'Потолки 3.3 м, изолированные прачечные, гардеробные en-suite и сухие кладовые комнаты.',
      tag: 'Комфорт De Luxe',
    },
    'phil-4': {
      quote: 'Не покупайте квадратные метры — выбирайте пространство для своей жизни.',
      highlightText: 'Правильный выбор на годы',
      subtext: 'Квартира — это выбор на годы. Пусть она будет правильной.',
      tag: 'Пространство для жизни',
    },
    'phil-5': {
      quote: 'Bereke Store: мысли, меняющие твой взгляд на недвижимость.',
      highlightText: 'Город в городе',
      subtext: 'Торговая галерея, уютные кофейни, маркеты фермерских продуктов и детские центры прямо у порога.',
      tag: 'Инфраструктура дома',
    },
    'phil-6': {
      quote: 'Дом начинается не с порога квартиры, а с атмосферы всего квартала.',
      highlightText: 'Приватность и статус',
      subtext: 'Дизайнерские парадные холлы, бесшумные лифты, архитектурная вечерняя подсветка и закрытый двор.',
      tag: 'Сервис и атмосфера',
    },
  },
  kz: {
    'phil-1': {
      quote: 'Өміріңізді пәтерге бейімдемеңіз — пәтерді өз өміріңізге сай таңдаңыз.',
      highlightText: 'Отбасыңызға сай өмір',
      subtext: 'Кейін қайта үлкен пәтер іздегенше, бірден қалағаныңыздай өмір сүрген дұрыс.',
      tag: 'Bereke Park философиясы',
    },
    'phil-2': {
      quote: 'Тек пәтердің бағасын ғана ойламаңыз. Келесі көшудің шығынын ойлаңыз.',
      highlightText: 'Ұрпақтарға арналған инвестиция',
      subtext: 'Жақсы пәтер тек заттарға ғана емес, шынайы өмірге де орын қалдырады.',
      tag: 'Құндылық пен мәртебе',
    },
    'phil-3': {
      quote: 'Отбасы өзгереді. Әдеттер өзгереді. Пәтер осыған сай болуы тиіс.',
      highlightText: 'Эргономика және кеңістік',
      subtext: 'Төбесі 3.3 м, бөлек кір жуатын бөлмелер, en-suite киім шешетін бөлмелер және құрғақ қоймалар.',
      tag: 'De Luxe жайлылығы',
    },
    'phil-4': {
      quote: 'Шаршы метрлерді ғана сатып алмаңыз — өз өміріңіз үшін кеңістік таңдаңыз.',
      highlightText: 'Жылдарға жасалған дұрыс таңдау',
      subtext: 'Пәтер — көп жылдарға жасалатын таңдау. Ол мінсіз болсын.',
      tag: 'Өмір сүруге арналған кеңістік',
    },
    'phil-5': {
      quote: 'Bereke Store: жылжымайтын мүлікке деген көзқарасыңызды өзгертетін идеялар.',
      highlightText: 'Қала ішіндегі қала',
      subtext: 'Сауда галереясы, жайлы кофейнялар, фермерлік дүкендер және балалар орталықтары тура табалдырықта.',
      tag: 'Үй инфрақұрылымы',
    },
    'phil-6': {
      quote: 'Үй пәтердің есігінен емес, бүкіл орамның атмосферасынан басталады.',
      highlightText: 'Құпиялылық және мәртебе',
      subtext: 'Дизайнерлік парадтық холлдар, дыбыссыз лифттер, кешкі сәулеттік жарықтандыру және жабық аула.',
      tag: 'Сервис және атмосфера',
    },
  },
  en: {
    'phil-1': {
      quote: 'Do not adapt your life to an apartment — choose an apartment built for your life.',
      highlightText: 'Living for your family',
      subtext: 'Live the way you truly desire right from the start, rather than searching for more later.',
      tag: 'Bereke Park Philosophy',
    },
    'phil-2': {
      quote: 'Do not just evaluate the price today. Consider the true cost of your next relocation.',
      highlightText: 'Generational Investment',
      subtext: 'A great residence creates generous room not merely for possessions, but for meaningful living.',
      tag: 'Value & Prestige',
    },
    'phil-3': {
      quote: 'Families evolve. Daily habits change. Your residence must effortlessly accommodate both.',
      highlightText: 'Ergonomics & Space',
      subtext: '3.3m high ceilings, isolated laundry rooms, en-suite dressing rooms, and dry pantries.',
      tag: 'De Luxe Comfort',
    },
    'phil-4': {
      quote: 'Do not just purchase square meters — select a sanctuary for your future.',
      highlightText: 'The Right Choice for Years',
      subtext: 'A home is a lifetime commitment. Make sure it is the right one.',
      tag: 'Space for Living',
    },
    'phil-5': {
      quote: 'Bereke Store: perspectives transforming how you experience modern real estate.',
      highlightText: 'City Within a City',
      subtext: 'Boutique shopping promenade, cozy cafes, farm-to-table grocers, and kids centers at your doorstep.',
      tag: 'Residential Infrastructure',
    },
    'phil-6': {
      quote: 'A home does not begin at the doorway, but with the ambiance of the entire quarter.',
      highlightText: 'Privacy & Status',
      subtext: 'Designer entrance foyers, whisper-quiet elevators, architectural night lighting, and private gated court.',
      tag: 'Service & Atmosphere',
    },
  },
};

export const getLocalizedQuote = (
  quote: PhilosophyQuoteItem,
  lang: Language
): PhilosophyQuoteItem => {
  const tr = PHILOSOPHY_TRANSLATIONS[lang]?.[quote.id] || PHILOSOPHY_TRANSLATIONS.ru[quote.id];
  if (!tr) return quote;

  return {
    ...quote,
    quote: tr.quote || quote.quote,
    highlightText: tr.highlightText || quote.highlightText,
    subtext: tr.subtext || quote.subtext,
    tag: tr.tag || quote.tag,
  };
};

// Normalize asset paths for root & subpath deployments (e.g. GitHub Pages)
[GALLERY_DATA, PHILOSOPHY_QUOTES, INFRASTRUCTURE_DATA, LAYOUTS_DATA, CONSTRUCTION_REPORTS].forEach((list: Array<{ image?: string }>) => {
  list.forEach((item) => {
    if (item.image) item.image = getAssetUrl(item.image);
  });
});

