import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Item } from '../data/data';

interface ItemCardProps {
  item: Item;
  index?: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, index = 0 }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`/item/${item.id}`, '_blank');
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'currency': return 'Валюта';
      case 'accounts': return 'Аккаунт';
      case 'items': return 'Предмет';
      case 'subscriptions': return 'Подписка';
      case 'services': return 'Услуга';
      default: return category;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={handleClick}
      className="group cursor-pointer"
    >
      <div className={`relative p-5 rounded-[2.5rem] ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10' : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-violet-200'} border transition-all duration-300 h-full flex flex-col`}>
        {/* Image & Badge */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-wider border border-white/10">
              {getCategoryLabel(item.category)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-2 line-clamp-2 leading-tight group-hover:text-violet-400 transition-colors`}>
            {item.title}
          </h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.price.toLocaleString()}</span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>₽</span>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-100'} border group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-all`}>
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className={`text-xs font-black ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}>{item.seller.rating}</span>
            </div>
          </div>
        </div>

        {/* Seller Minimal Info */}
        <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'} flex items-center gap-3`}>
          <div className="relative">
            <img
              src={item.seller.avatar}
              alt={item.seller.name}
              className="w-6 h-6 rounded-lg object-cover"
            />
            {item.seller.isOnline && (
              <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 ${theme === 'dark' ? 'border-[#16161a]' : 'border-white'}`} />
            )}
          </div>
          <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} truncate`}>{item.seller.name}</span>
          <div className={`ml-auto text-[10px] font-black ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'} uppercase tracking-widest`}>
            {item.seller.sales.toLocaleString()} сделок
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;