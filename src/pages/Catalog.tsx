import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter, SortAsc, SortDesc, Search, LayoutGrid, List, SlidersHorizontal, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import LoginModal from '../components/LoginModal';
import { games, items } from '../data/data';

const Catalog: React.FC = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>(
    (searchParams.get('sort') as any) || 'newest'
  );
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const game = games.find(g => g.slug === gameSlug);
  const gameItems = items.filter(item => item.gameId === game?.id);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dealType, setDealType] = useState<'all' | 'sale' | 'rent'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameSlug]);

  const categories = useMemo(() => {
    if (!game) return [];
    return [
      { id: 'all', label: 'Все товары' },
      ...game.allowedCategories
    ];
  }, [game]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = gameItems.filter(item => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
      const onlineMatch = !onlyOnline || item.seller.isOnline;
      const dealTypeMatch = dealType === 'all' || 
        (dealType === 'sale' && !item.title.toLowerCase().includes('аренда')) || 
        (dealType === 'rent' && item.title.toLowerCase().includes('аренда'));
      const searchMatch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && priceMatch && onlineMatch && searchMatch && dealTypeMatch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [gameItems, selectedCategory, priceRange, sortBy, onlyOnline]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  if (!game) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'}`}>
        <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Игра не найдена</h1>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} mb-8 text-lg`}>Похоже, эта игра еще не добавлена в наш каталог.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-bold transition-all">
            <ArrowLeft className="w-5 h-5" />
            Вернуться на главную
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'}`}>
      <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
      
      {/* Page Header */}
      <div className={`relative h-64 overflow-hidden border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
        <div className={`absolute inset-0 z-10 ${theme === 'dark' ? 'bg-gradient-to-t from-[#0a0a0c] to-transparent' : 'bg-gradient-to-t from-white to-transparent'}`} />
        <div className={`absolute inset-0 blur-[100px] -z-10 ${theme === 'dark' ? 'bg-violet-600/10' : 'bg-violet-600/5'}`} />
        <div className="max-w-[1400px] mx-auto px-4 h-full flex flex-col justify-end pb-10 relative z-20">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-3xl backdrop-blur-xl border overflow-hidden flex items-center justify-center shadow-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/50 border-white/20'}`}>
              <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link to="/" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors text-sm font-bold`}>Главная</Link>
                <span className={theme === 'dark' ? 'text-white/20' : 'text-slate-200'}>/</span>
                <span className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-400'} text-sm font-bold`}>Каталог</span>
              </div>
              <h1 className={`text-5xl font-black mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{game.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  {gameItems.length.toLocaleString()} предложений
                </div>
                <div className="flex items-center gap-2 text-violet-400 text-sm font-bold bg-violet-400/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  Проверенные продавцы
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-lg font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <SlidersHorizontal className="w-5 h-5 text-violet-400" />
                  Фильтры
                </h3>
                <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange([0, 100000]);
                      setOnlyOnline(false);
                      setDealType('all');
                    }}
                    className={`text-xs font-bold transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    Сбросить
                  </button>
              </div>
              
              <div className="space-y-8">
                {/* Sale/Rent Filter */}
                {selectedCategory === 'accounts' && (
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>Тип сделки</label>
                    <div className="flex gap-2 p-1 bg-black/5 rounded-xl">
                      <button
                        onClick={() => setDealType('all')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${dealType === 'all' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        Все
                      </button>
                      <button
                        onClick={() => setDealType('sale')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${dealType === 'sale' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        Продажа
                      </button>
                      <button
                        onClick={() => setDealType('rent')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${dealType === 'rent' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        Аренда
                      </button>
                    </div>
                  </div>
                )}

                {/* Category Filter */}
                <div>
                  <label className={`block text-xs font-black uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>Категория</label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                          selectedCategory === cat.id 
                            ? 'bg-violet-500/10 border-violet-500/50 text-violet-400' 
                            : theme === 'dark' 
                              ? 'bg-white/5 border-transparent text-white/40 hover:bg-white/10 hover:text-white'
                              : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="text-sm font-bold">{cat.label}</span>
                        {selectedCategory === cat.id && <CheckCircle2 className="w-4 h-4 text-violet-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Support Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700">
              <h4 className="text-lg font-black text-white mb-2">Нужна помощь?</h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">Наши специалисты помогут вам с любым вопросом 24/7</p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-support-chat'))}
                className="w-full py-3 bg-white text-violet-600 rounded-xl font-bold hover:bg-white/90 transition-all"
              >
                Написать в поддержку
              </button>
            </div>
          </aside>

          {/* Items Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className={`flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-3xl border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                  <input 
                    type="text" 
                    placeholder="Поиск внутри раздела..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-11 pr-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all w-48 sm:w-64 ${
                      theme === 'dark' ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                
                <div className="h-8 w-px bg-white/5 hidden sm:block" />
                
                {/* New Integrated Filters */}
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-black text-slate-400 uppercase">Цена</span>
                    <input 
                      type="number" 
                      placeholder="От"
                      value={priceRange[0] || ''} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="bg-transparent border-none p-0 w-12 text-violet-400 font-bold text-xs focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <div className="w-2 h-px bg-slate-400" />
                    <input 
                      type="number" 
                      placeholder="До"
                      value={priceRange[1] || ''} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="bg-transparent border-none p-0 w-12 text-violet-400 font-bold text-xs focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                  </div>

                  <label className={`flex items-center gap-2 px-4 py-2 rounded-2xl border cursor-pointer group transition-all ${
                    onlyOnline 
                      ? 'bg-green-400/10 border-green-400/30 text-green-400' 
                      : theme === 'dark' ? 'bg-white/5 border-white/5 text-white/40' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={onlyOnline}
                      onChange={(e) => setOnlyOnline(e.target.checked)}
                    />
                    <div className={`w-2 h-2 rounded-full ${onlyOnline ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`} />
                    <span className="text-xs font-bold">Онлайн</span>
                  </label>
                </div>

                <div className="h-8 w-px bg-white/5 hidden sm:block" />

                <div className={`flex items-center gap-1 p-1 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-white border border-slate-200'}`}>
                  <button 
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative" ref={sortRef}>
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold transition-all group ${
                      theme === 'dark' ? 'bg-white/5 border-white/5 text-white/40 hover:text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <span>
                      {sortBy === 'newest' ? 'Сначала новые' : 
                       sortBy === 'price-asc' ? 'Дешевле' : 'Дороже'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-violet-400' : ''}`} />
                  </button>

                  {isSortOpen && (
                    <div className={`absolute right-0 mt-2 w-48 border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 ${
                      theme === 'dark' ? 'bg-[#16161a] border-white/10' : 'bg-white border-slate-100'
                    }`}>
                      <div className="p-1">
                        {[
                          { id: 'newest', label: 'Сначала новые' },
                          { id: 'price-asc', label: 'Дешевле' },
                          { id: 'price-desc', label: 'Дороже' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              sortBy === option.id 
                                ? 'bg-violet-500/10 text-violet-400' 
                                : theme === 'dark' ? 'text-white/40 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            {option.label}
                            {sortBy === option.id && <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {filteredAndSortedItems.length > 0 ? (
              <div className={viewType === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredAndSortedItems.map((item, index) => (
                  <ItemCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className={`text-center py-32 rounded-3xl border border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <Search className={`w-10 h-10 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Товары не найдены</h3>
                <p className={theme === 'dark' ? 'text-white/40' : 'text-slate-500'}>Попробуйте изменить фильтры или выбрать другую категорию</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
};

export default Catalog;