import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PromoBannersProps {
  theme: 'light' | 'dark';
}

const banners = [
  {
    id: 1,
    title: 'Brawl Stars',
    badge: 'Лунный Новый год',
    image: 'https://avatars.mds.yandex.net/i?id=b09a4282573d538a98b2d161b6655363_l-4839279-images-thumbs&n=13',
    color: 'bg-green-500',
    slug: 'brawl-stars',
  },
  {
    id: 2,
    title: 'Standoff 2',
    badge: 'Обновление Winter Tale',
    image: 'https://cdn-www.bluestacks.com/bs-images/Гайд-по-обновлению-Winter-Tale-в-Standoff-2-новый-временный-режим-игры-скины-и-особые-подарки.webp',
    color: 'bg-red-500',
    slug: 'standoff-2',
  },
  {
    id: 3,
    title: 'Steam',
    badge: 'Пополнение баланса',
    image: 'https://www.notebookcheck-ru.com/fileadmin/Notebooks/News/_nc4/New-free-games-spotted-on-Steam-right-before-the-end-of-April-2025.jpg',
    color: 'bg-blue-500',
    slug: 'steam',
  },
  {
    id: 4,
    title: 'Apex Legends',
    badge: 'Новый сезон',
    image: 'https://i.ytimg.com/vi/qD7NlSwEGd0/maxresdefault.jpg',
    color: 'bg-yellow-500',
    slug: 'apex-legends',
  },
  {
    id: 5,
    title: 'Pubg Mobile',
    badge: 'Популярно',
    image: 'https://images.stopgame.ru/blogs/2018/01/14/IkQ2duC.jpg',
    color: 'bg-emerald-500',
    slug: 'pubg-mobile',
  },
];

// Double the items for seamless infinite scroll
const infiniteBanners = [...banners, ...banners, ...banners];

const PromoBanners: React.FC<PromoBannersProps> = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <section className={`py-8 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'}`}>
      <div className="relative">
        <motion.div 
          className="flex gap-4 px-4"
          animate={{
            x: [0, -1400], // Adjust based on total width of one set of banners (5 * 280)
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "fit-content" }}
        >
          {infiniteBanners.map((banner, index) => (
            <div
              key={`${banner.id}-${index}`}
              onClick={() => navigate(`/catalog/${banner.slug}`)}
              className="relative flex-shrink-0 w-[280px] h-[160px] rounded-3xl overflow-hidden cursor-pointer group/banner"
            >
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/banner:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg text-white ${banner.color}`}>
                  {banner.badge}
                </span>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-black text-lg leading-tight group-hover/banner:translate-x-1 transition-transform">
                  {banner.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth fading at edges */}
        <div className={`absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r ${theme === 'dark' ? 'from-[#0a0a0c] to-transparent' : 'from-white to-transparent'}`} />
        <div className={`absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l ${theme === 'dark' ? 'from-[#0a0a0c] to-transparent' : 'from-white to-transparent'}`} />
      </div>
    </section>
  );
};

export default PromoBanners;
