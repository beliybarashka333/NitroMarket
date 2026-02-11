export interface Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: 'games' | 'apps' | 'ai';
  itemCount: number;
  isPopular?: boolean;
  allowedCategories: { id: string; label: string }[];
}

export interface Item {
  id: string;
  gameId: string;
  title: string;
  price: number;
  category: string; // Dynamic based on game
  image: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    sales: number;
    isOnline: boolean;
  };
  description: string;
  createdAt: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

const getIcon = (domain: string) => `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`;

export const games: Game[] = [
  // Популярные игры
  {
    id: '1',
    name: 'Roblox',
    slug: 'roblox',
    image: 'https://i.pinimg.com/originals/83/3c/41/833c418836c10db36bded514dad7e378.jpg?nii=t',
    category: 'games',
    itemCount: 15420,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Робуксы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Предметы' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '2',
    name: 'Brawl Stars',
    slug: 'brawl-stars',
    image: 'https://avatars.mds.yandex.net/i?id=a48fcd43789192ae20c015f4be952508_l-4766550-images-thumbs&n=13',
    category: 'games',
    itemCount: 8900,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Гемы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Предметы/Бойцы' },
      { id: 'services', label: 'Буст/Услуги' }
    ]
  },
  {
    id: '3',
    name: 'Standoff 2',
    slug: 'standoff-2',
    image: 'https://cdn-www.bluestacks.com/bs-images/41d363c25951bd7b6a775873500e06e3.png',
    category: 'games',
    itemCount: 6700,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Голда' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Скины' },
      { id: 'services', label: 'Буст/Услуги' }
    ]
  },
  {
    id: '4',
    name: 'CS2',
    slug: 'cs2',
    image: getIcon('counter-strike.net'),
    category: 'games',
    itemCount: 23400,
    isPopular: true,
    allowedCategories: [
      { id: 'skins', label: 'Скины' },
      { id: 'knives', label: 'Ножи/Перчатки' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'boosting', label: 'Буст' }
    ]
  },
  {
    id: '5',
    name: 'Genshin Impact',
    slug: 'genshin-impact',
    image: getIcon('genshin.hoyoverse.com'),
    category: 'games',
    itemCount: 14500,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Кристаллы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Предметы' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '6',
    name: 'Dota 2',
    slug: 'dota-2',
    image: 'https://avatars.mds.yandex.net/i?id=5704f64f895407676ce1bed5a9320c4999a25f60-4298620-images-thumbs&n=13',    category: 'games',
    itemCount: 18200,
    isPopular: true,
    allowedCategories: [
      { id: 'items', label: 'Предметы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '7',
    name: 'ChatGPT',
    slug: 'chatgpt',
    image: getIcon('openai.com'),
    category: 'ai',
    itemCount: 1200,
    isPopular: false,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки (Plus)' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'keys', label: 'Ключи/API' }
    ]
  },
  {
    id: '8',
    name: 'Midjourney',
    slug: 'midjourney',
    image: getIcon('midjourney.com'),
    category: 'ai',
    itemCount: 800,
    isPopular: false,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '9',
    name: 'Fortnite',
    slug: 'fortnite',
    image: 'https://i.pinimg.com/originals/19/a7/a9/19a7a92b1c586cd62019b3e2066d8e18.jpg?nii=t',
    category: 'games',
    itemCount: 12300,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'В-баксы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Скины/Коды' }
    ]
  },
  {
    id: '11',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/7e/PlayerUnknown%27s_Battlegrounds_Mobile.jpg/960px-PlayerUnknown%27s_Battlegrounds_Mobile.jpg',
    category: 'games',
    itemCount: 15600,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'UC' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Скины' }
    ]
  },
  {
    id: '12',
    name: 'League of Legends',
    slug: 'league-of-legends',
    image: 'https://lastfm.freetls.fastly.net/i/u/ar0/878d2971c47e77e91c8324d1ef2b0b6f.jpg',
    category: 'games',
    itemCount: 7800,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'RP' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Буст' }
    ]
  },
  {
    id: '19',
    name: 'Apex Legends',
    slug: 'apex-legends',
    image: getIcon('ea.com/games/apex-legends'),
    category: 'games',
    itemCount: 3400,
    allowedCategories: [
      { id: 'currency', label: 'Apex Coins' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Скины' }
    ]
  },
  {
    id: '20',
    name: 'Rust',
    slug: 'rust',
    image: getIcon('facepunch.com'),
    category: 'games',
    itemCount: 2100,
    allowedCategories: [
      { id: 'items', label: 'Скины' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '21',
    name: 'Grand Theft Auto V',
    slug: 'gta-v',
    image: getIcon('rockstargames.com/gta-v'),
    category: 'games',
    itemCount: 15200,
    allowedCategories: [
      { id: 'currency', label: 'Деньги' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Прокачка' }
    ]
  },
  {
    id: '22',
    name: 'Counter-Strike 1.6',
    slug: 'cs-1-6',
    image: getIcon('steampowered.com'),
    category: 'games',
    itemCount: 800,
    allowedCategories: [
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Сервера' }
    ]
  },
  {
    id: '23',
    name: 'World of Warcraft',
    slug: 'world-of-warcraft',
    image: getIcon('worldofwarcraft.com'),
    category: 'games',
    itemCount: 11000,
    allowedCategories: [
      { id: 'currency', label: 'Золото' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '24',
    name: 'Free Fire',
    slug: 'free-fire',
    image: getIcon('ff.garena.com'),
    category: 'games',
    itemCount: 19400,
    allowedCategories: [
      { id: 'currency', label: 'Алмазы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Предметы' }
    ]
  },
  {
    id: '25',
    name: 'Elden Ring',
    slug: 'elden-ring',
    image: getIcon('eldenring.com'),
    category: 'games',
    itemCount: 1200,
    allowedCategories: [
      { id: 'items', label: 'Предметы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Помощь' }
    ]
  },
  {
    id: '26',
    name: 'Call of Duty: Warzone',
    slug: 'warzone',
    image: getIcon('callofduty.com'),
    category: 'games',
    itemCount: 5600,
    allowedCategories: [
      { id: 'currency', label: 'CP' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Прокачка' }
    ]
  },
  {
    id: '13',
    name: 'World of Tanks',
    slug: 'world-of-tanks',
    image: getIcon('worldoftanks.ru'),
    category: 'games',
    itemCount: 12400,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Золото' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Техника' }
    ]
  },
  {
    id: '14',
    name: 'War Thunder',
    slug: 'war-thunder',
    image: getIcon('warthunder.ru'),
    category: 'games',
    itemCount: 5200,
    allowedCategories: [
      { id: 'currency', label: 'Золотые орлы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Техника' }
    ]
  },
  {
    id: '17',
    name: 'Escape from Tarkov',
    slug: 'escape-from-tarkov',
    image: getIcon('escapefromtarkov.com'),
    category: 'games',
    itemCount: 4800,
    isPopular: false,
    allowedCategories: [
      { id: 'currency', label: 'Рубли' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Предметы' }
    ]
  },
  {
    id: '18',
    name: 'Honkai: Star Rail',
    slug: 'honkai-star-rail',
    image: 'https://avatars.mds.yandex.net/i?id=1676156cfbf31b823be9ccb92d8866f1_l-10384273-images-thumbs&n=13',
    category: 'games',
    itemCount: 9200,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Сущность' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '30',
    name: 'Valorant',
    slug: 'valorant',
    image: getIcon('playvalorant.com'),
    category: 'games',
    itemCount: 8400,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'VP' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'boosting', label: 'Буст' }
    ]
  },
  {
    id: '31',
    name: 'Minecraft',
    slug: 'minecraft',
    image: getIcon('minecraft.net'),
    category: 'games',
    itemCount: 5200,
    allowedCategories: [
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'items', label: 'Ключи' },
      { id: 'services', label: 'Сервера' }
    ]
  },
  {
    id: '32',
    name: 'Clash of Clans',
    slug: 'clash-of-clans',
    image: getIcon('supercell.com/en/games/clashofclans'),
    category: 'games',
    itemCount: 12800,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Гемы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Прокачка' }
    ]
  },
  {
    id: '33',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    image: getIcon('mobilelegends.com'),
    category: 'games',
    itemCount: 15600,
    isPopular: true,
    allowedCategories: [
      { id: 'currency', label: 'Алмазы' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Буст' }
    ]
  },
  {
    id: '34',
    name: 'Path of Exile',
    slug: 'path-of-exile',
    image: getIcon('pathofexile.com'),
    category: 'games',
    itemCount: 24500,
    allowedCategories: [
      { id: 'currency', label: 'Сфера' },
      { id: 'items', label: 'Предметы' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '35',
    name: 'Warframe',
    slug: 'warframe',
    image: getIcon('warframe.com'),
    category: 'games',
    itemCount: 9300,
    allowedCategories: [
      { id: 'currency', label: 'Платина' },
      { id: 'items', label: 'Прайм вещи' },
      { id: 'services', label: 'Услуги' }
    ]
  },
  {
    id: '36',
    name: 'Overwatch 2',
    slug: 'overwatch-2',
    image: getIcon('overwatch.blizzard.com'),
    category: 'games',
    itemCount: 4200,
    allowedCategories: [
      { id: 'currency', label: 'Монеты' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'boosting', label: 'Буст' }
    ]
  },
  
  // Приложения и сервисы
  {
    id: '101',
    name: 'Telegram',
    slug: 'telegram',
    image: getIcon('telegram.org'),
    category: 'apps',
    itemCount: 3400,
    isPopular: true,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '102',
    name: 'Discord',
    slug: 'discord',
    image: getIcon('discord.com'),
    category: 'apps',
    itemCount: 1200,
    isPopular: true,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'keys', label: 'Ключи' }
    ]
  },
  {
    id: '103',
    name: 'Spotify Premium',
    slug: 'spotify',
    image: getIcon('spotify.com'),
    category: 'apps',
    itemCount: 2800,
    isPopular: true,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '104',
    name: 'Steam',
    slug: 'steam',
    image: getIcon('store.steampowered.com'),
    category: 'apps',
    itemCount: 9100,
    isPopular: true,
    allowedCategories: [
      { id: 'topup', label: 'Пополнение' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'keys', label: 'Ключи/Гифты' }
    ]
  },
  {
    id: '105',
    name: 'YouTube Premium',
    slug: 'youtube',
    image: getIcon('youtube.com'),
    category: 'apps',
    itemCount: 1500,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '106',
    name: 'PS Plus / PSN',
    slug: 'playstation',
    image: getIcon('playstation.com'),
    category: 'apps',
    itemCount: 4200,
    isPopular: true,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'topup', label: 'Пополнение' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '107',
    name: 'Xbox Game Pass',
    slug: 'xbox',
    image: getIcon('xbox.com'),
    category: 'apps',
    itemCount: 3100,
    isPopular: true,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'keys', label: 'Ключи' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '108',
    name: 'Netflix',
    slug: 'netflix',
    image: getIcon('netflix.com'),
    category: 'apps',
    itemCount: 800,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '109',
    name: 'Faceit Premium',
    slug: 'faceit',
    image: getIcon('faceit.com'),
    category: 'apps',
    itemCount: 1400,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'services', label: 'Услуги' }
    ]
  },

  // Искусственный интеллект
  {
    id: '201',
    name: 'ChatGPT Plus',
    slug: 'chatgpt-ai',
    image: getIcon('openai.com'),
    category: 'ai',
    itemCount: 1500,
    isPopular: false,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' },
      { id: 'keys', label: 'API Ключи' }
    ]
  },
  {
    id: '202',
    name: 'Midjourney',
    slug: 'midjourney-ai',
    image: getIcon('midjourney.com'),
    category: 'ai',
    itemCount: 450,
    isPopular: false,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '203',
    name: 'Claude AI',
    slug: 'claude',
    image: getIcon('claude.ai'),
    category: 'ai',
    itemCount: 280,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  },
  {
    id: '204',
    name: 'Canva Pro',
    slug: 'canva',
    image: getIcon('canva.com'),
    category: 'ai',
    itemCount: 600,
    allowedCategories: [
      { id: 'subscriptions', label: 'Подписки' },
      { id: 'accounts', label: 'Аккаунты' }
    ]
  }
];

export const items: Item[] = [
  // ChatGPT
  {
    id: 'ai-1',
    gameId: '201',
    title: 'ChatGPT Plus (1 месяц) - Личный аккаунт',
    price: 1850,
    category: 'subscriptions',
    image: 'https://images.unsplash.com/photo-1673172493283-49aa17468cec?w=800&q=80',
    seller: {
      name: 'AI_Master',
      avatar: 'https://i.pravatar.cc/150?u=ai1',
      rating: 5.0,
      sales: 1240,
      isOnline: true
    },
    description: 'Официальная подписка ChatGPT Plus на 30 дней. Полный доступ к GPT-4, DALL-E 3 и плагинам.',
    createdAt: '2024-02-10T12:00:00Z',
    stats: [
      { label: 'Срок', value: '30 дней' },
      { label: 'Тип', value: 'Личный' }
    ]
  },
  {
    id: 'ai-2',
    gameId: '201',
    title: 'OpenAI API Credits $120',
    price: 4500,
    category: 'items',
    image: 'https://images.unsplash.com/photo-1673172493283-49aa17468cec?w=800&q=80',
    seller: {
      name: 'DevHelper',
      avatar: 'https://i.pravatar.cc/150?u=ai2',
      rating: 4.9,
      sales: 850,
      isOnline: false
    },
    description: 'Аккаунт с балансом API $120. Подходит для разработчиков.',
    createdAt: '2024-02-09T10:00:00Z',
  },

  // Telegram
  {
    id: 'tg-1',
    gameId: '101',
    title: 'Telegram Premium (1 год) - Подарок',
    price: 2400,
    category: 'subscriptions',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cc0d41?w=800&q=80',
    seller: {
      name: 'PremiumStore',
      avatar: 'https://i.pravatar.cc/150?u=tg1',
      rating: 4.9,
      sales: 3500,
      isOnline: true
    },
    description: 'Активация Telegram Premium на ваш аккаунт через подарок. Гарантия на весь срок.',
    createdAt: '2024-02-08T15:30:00Z',
  },

  // CS2
  {
    id: 'cs-1',
    gameId: '4',
    title: '★ Нож-бабочка | Гамма-волны (Изумруд)',
    price: 850000,
    category: 'items',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    seller: {
      name: 'SkinEmpire',
      avatar: 'https://i.pravatar.cc/150?u=cs1',
      rating: 5.0,
      sales: 15600,
      isOnline: true
    },
    description: 'Редчайший скин в идеальном состоянии. Float: 0.001',
    createdAt: '2024-02-07T09:15:00Z',
    stats: [
      { label: 'Износ', value: 'Прямо с завода' },
      { label: 'Float', value: '0.001' }
    ]
  },

  // Dota 2
  {
    id: 'dota-1',
    gameId: '6',
    title: '7000 MMR | Почта | Первая почта',
    price: 12000,
    category: 'accounts',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    seller: {
      name: 'BoostService',
      avatar: 'https://i.pravatar.cc/150?u=dota1',
      rating: 4.8,
      sales: 420,
      isOnline: true
    },
    description: 'Чистый аккаунт с высоким рейтингом. Без банов и привязок.',
    createdAt: '2024-02-06T21:45:00Z',
  },

  // Roblox
  {
    id: 'rbx-1',
    gameId: '1',
    title: '10,000 Robux (Метод Трансфер)',
    price: 4200,
    category: 'currency',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    seller: {
      name: 'RbxDealer',
      avatar: 'https://i.pravatar.cc/150?u=rbx1',
      rating: 4.7,
      sales: 8900,
      isOnline: true
    },
    description: 'Быстрая доставка робуксов на ваш аккаунт. Комиссия на нас!',
    createdAt: '2024-02-05T14:20:00Z',
  },
  {
    id: 'ps-1',
    gameId: '106',
    title: 'Пополнение кошелька PSN (Турция) - 1000 TL',
    price: 3800,
    category: 'currency',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
    seller: {
      name: 'SonyExpert',
      avatar: 'https://i.pravatar.cc/150?u=ps1',
      rating: 4.9,
      sales: 2100,
      isOnline: true
    },
    description: 'Быстрое пополнение вашего турецкого аккаунта PSN. Нужен логин и пароль.',
    createdAt: '2024-02-04T11:10:00Z',
  },
  {
    id: 'br-1',
    gameId: '2',
    title: 'Brawl Pass Plus (Текущий сезон)',
    price: 1200,
    category: 'subscriptions',
    image: 'https://images.unsplash.com/photo-1627373683623-462f4af01554?w=800&q=80',
    seller: {
      name: 'Supercell_Gifts',
      avatar: 'https://i.pravatar.cc/150?u=br1',
      rating: 5.0,
      sales: 4500,
      isOnline: true
    },
    description: 'Активация Brawl Pass Plus через Supercell ID. Моментально!',
    createdAt: '2024-02-03T18:50:00Z',
  },
  {
    id: 'st-1',
    gameId: '3',
    title: '3000 Gold | Быстрая передача',
    price: 2400,
    category: 'currency',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    seller: {
      name: 'GoldSeller_SO2',
      avatar: 'https://i.pravatar.cc/150?u=st1',
      rating: 4.8,
      sales: 3200,
      isOnline: true
    },
    description: 'Передача золота через рынок. Комиссия 20% не покрывается.',
    createdAt: '2024-02-02T13:40:00Z',
  }
];
