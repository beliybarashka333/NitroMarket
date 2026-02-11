import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { games } from '../data/data';
import { ChevronRight, Sparkles, Gamepad2, LayoutGrid } from 'lucide-react';

interface GameGridProps {
  searchQuery?: string;
}

const GameGrid: React.FC<GameGridProps> = ({ searchQuery = '' }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gamesByCategory = {
    popular: filteredGames.filter(game => game.isPopular),
    games: filteredGames.filter(game => game.category === 'games'),
    apps: filteredGames.filter(game => game.category === 'apps'),
    ai: filteredGames.filter(game => game.category === 'ai')
  };

  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    popular: false,
    games: false,
    apps: false,
    ai: false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleGameClick = (gameSlug: string) => {
    navigate(`/catalog/${gameSlug}`);
  };

  const SectionTitle = ({ title, icon: Icon, badge, categoryId, isExpanded }: { 
    title: string; 
    icon: any; 
    badge?: string;
    categoryId: string;
    isExpanded: boolean;
  }) => (
    <div id={categoryId === 'popular' ? 'catalog' : categoryId === 'ai' ? 'ai-section' : undefined} className="flex items-center justify-between mb-8 group">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-violet-500/10' : 'bg-violet-500/5'} text-violet-400`}>
          <Icon className="w-6 h-6" />
        </div>
        <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>{title}</h2>
        {badge && (
          <span className="px-2 py-1 rounded-md bg-violet-500 text-[10px] font-black uppercase tracking-wider text-white">
            {badge}
          </span>
        )}
      </div>
      <button 
        onClick={() => toggleCategory(categoryId)}
        className={`text-sm font-bold ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors flex items-center gap-1 group`}
      >
        {isExpanded ? 'Свернуть' : 'Смотреть все'} <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div id="catalog" className="transition-colors duration-300">
      
      {/* Popular Section */}
      {gamesByCategory.popular.length > 0 && (
        <div className="mb-20">
          <SectionTitle 
            title="Хиты продаж" 
            icon={Sparkles} 
            badge="Hot" 
            categoryId="popular"
            isExpanded={expandedCategories.popular}
          />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(expandedCategories.popular ? gamesByCategory.popular : gamesByCategory.popular.slice(0, 12)).map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => handleGameClick(game.slug)}
                  className={`group relative aspect-[3/4] rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-md hover:shadow-xl'} border hover:border-violet-500/50 transition-all duration-500`}
                >
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-[#0a0a0c]' : 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'} z-10 opacity-80 group-hover:opacity-60 transition-opacity`} />
                  <img
                    src={game.image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-bold text-white text-lg leading-tight mb-1">{game.name}</h4>
                    <p className="text-white/80 text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                      {game.itemCount.toLocaleString()} товаров
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Games Section */}
        {gamesByCategory.games.length > 0 && (
          <div className="mb-20">
            <SectionTitle 
              title="Игры" 
              icon={Gamepad2} 
              categoryId="games"
              isExpanded={expandedCategories.games}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(expandedCategories.games ? gamesByCategory.games : gamesByCategory.games.slice(0, 12)).map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => handleGameClick(game.slug)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-violet-500/5 to-transparent border-violet-500/10' : 'bg-white border-slate-200 shadow-sm'} border hover:border-violet-500/30 transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-violet-500/10 group-hover:bg-violet-500/20' : 'bg-slate-100 group-hover:bg-slate-200'} flex items-center justify-center transition-colors`}>
                      <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`font-bold ${theme === 'dark' ? 'text-white group-hover:text-violet-400' : 'text-slate-900 group-hover:text-violet-600'} transition-colors`}>{game.name}</span>
                  </div>
                  <span className="text-xs font-bold text-violet-400">
                    {game.itemCount.toLocaleString()} предл.
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Apps Section */}
        {gamesByCategory.apps.length > 0 && (
          <div className="mb-20">
            <SectionTitle 
              title="Приложения и сервисы" 
              icon={LayoutGrid} 
              categoryId="apps"
              isExpanded={expandedCategories.apps}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(expandedCategories.apps ? gamesByCategory.apps : gamesByCategory.apps.slice(0, 8)).map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => handleGameClick(game.slug)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-violet-500/5 to-transparent border-violet-500/10' : 'bg-white border-slate-200 shadow-sm'} border hover:border-violet-500/30 transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-violet-500/10 group-hover:bg-violet-500/20' : 'bg-slate-100 group-hover:bg-slate-200'} flex items-center justify-center transition-colors`}>
                      <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`font-bold ${theme === 'dark' ? 'text-white group-hover:text-violet-400' : 'text-slate-900 group-hover:text-violet-600'} transition-colors`}>{game.name}</span>
                  </div>
                  <span className="text-xs font-bold text-violet-400">
                    {game.itemCount.toLocaleString()} предл.
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* AI Section */}
        {gamesByCategory.ai.length > 0 && (
          <div>
            <SectionTitle 
              title="Искусственный интеллект" 
              icon={Sparkles} 
              categoryId="ai"
              isExpanded={expandedCategories.ai}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(expandedCategories.ai ? gamesByCategory.ai : gamesByCategory.ai.slice(0, 4)).map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => handleGameClick(game.slug)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-violet-500/5 to-transparent border-violet-500/10' : 'bg-white border-slate-200 shadow-sm'} border hover:border-violet-500/30 transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-violet-500/10 group-hover:bg-violet-500/20' : 'bg-slate-100 group-hover:bg-slate-200'} flex items-center justify-center transition-colors`}>
                      <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`font-bold ${theme === 'dark' ? 'text-white group-hover:text-violet-400' : 'text-slate-900 group-hover:text-violet-600'} transition-colors`}>{game.name}</span>
                  </div>
                  <span className="text-xs font-bold text-violet-400">
                    {game.itemCount.toLocaleString()} предл.
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

      {filteredGames.length === 0 && searchQuery && (
        <div className={`text-center py-32 rounded-3xl border border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-300'}`}>
          <div className={`w-20 h-20 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Gamepad2 className={`w-10 h-10 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
          </div>
          <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-2`}>Ничего не найдено</h3>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Попробуйте изменить запрос или поискать в других категориях</p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;