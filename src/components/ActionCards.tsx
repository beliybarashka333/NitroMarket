import React from 'react';
import { ShoppingCart, Tag, Coins, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ActionCardsProps {
  theme: 'light' | 'dark';
}

const ActionCards: React.FC<ActionCardsProps> = ({ theme }) => {
  const navigate = useNavigate();

  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cards = [
    {
      title: 'Купить',
      description: 'Игры, валюта и скины',
      icon: ShoppingCart,
      color: 'violet',
      stats: '1.2M+ товаров',
      onClick: scrollToCatalog
    },
    {
      title: 'Продать',
      description: 'Выставить свой товар',
      icon: Tag,
      color: 'emerald',
      stats: 'Выплаты 5 мин',
      onClick: () => navigate('/sell')
    },
    {
      title: 'Скупка',
      description: 'Моментальный выкуп',
      icon: Coins,
      color: 'orange',
      stats: 'Лучшая цена',
      onClick: () => navigate('/buyout')
    },
    {
      title: 'Аукцион',
      description: 'Торги за редкие вещи',
      icon: Hammer,
      color: 'pink',
      stats: 'Live торги',
      onClick: () => navigate('/auctions')
    }
  ];

  const getColorClasses = (color: string) => {
    const isDark = theme === 'dark';
    switch (color) {
      case 'violet':
        return isDark 
          ? 'bg-violet-500/5 border-violet-500/10 hover:border-violet-500/40 text-violet-400' 
          : 'bg-violet-50 border-violet-100 hover:border-violet-300 text-violet-600';
      case 'emerald':
        return isDark 
          ? 'bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/40 text-emerald-400' 
          : 'bg-emerald-50 border-emerald-100 hover:border-emerald-300 text-emerald-600';
      case 'orange':
        return isDark 
          ? 'bg-orange-500/5 border-orange-500/10 hover:border-orange-500/40 text-orange-400' 
          : 'bg-orange-50 border-orange-100 hover:border-orange-300 text-orange-600';
      case 'pink':
        return isDark 
          ? 'bg-pink-500/5 border-pink-500/10 hover:border-pink-500/40 text-pink-400' 
          : 'bg-pink-50 border-pink-100 hover:border-pink-300 text-pink-600';
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {cards.map((card, index) => (
        <motion.button
          key={card.title}
          onClick={card.onClick}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex flex-col p-6 rounded-[1.75rem] border transition-all duration-300 text-left ${getColorClasses(card.color)} ${
            theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-white shadow-sm hover:shadow-xl hover:shadow-black/5'
          }`}
        >
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} group-hover:scale-110 transition-transform duration-500`}>
              <card.icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
              theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'
            }`}>
              {card.stats}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className={`text-lg font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {card.title}
            </h3>
            <p className={`text-sm font-medium leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
              {card.description}
            </p>
          </div>

          {/* Subtle bottom accent line */}
          <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-current opacity-30" />
        </motion.button>
      ))}
    </div>
  );
};

export default ActionCards;
