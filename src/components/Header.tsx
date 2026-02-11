import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, User, Menu, ChevronDown, Settings, Sun, Moon } from 'lucide-react';
import { games } from '../data/data';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    window.dispatchEvent(new CustomEvent('change-theme', { detail: newTheme }));
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredGames.length > 0) {
      navigate(`/catalog/${filteredGames[0].slug}`);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleGameSelect = (gameSlug: string) => {
    navigate(`/catalog/${gameSlug}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark' ? 'bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 py-2' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-2'
          : theme === 'dark' ? 'bg-[#0a0a0c] py-4' : 'bg-white py-4'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://i.postimg.cc/NjMhdsQJ/output-onlinepngtools-(1).png" 
              alt="NitroMarket Logo" 
              className={`h-14 w-auto brightness-110 hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'invert' : ''}`}
            />
          </Link>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link to="/catalog" className={`${theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Маркет</Link>
            <Link to="/auctions" className={`${theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Аукционы</Link>
            <Link to="/buyout" className={`${theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Скупка</Link>
            <div className="relative group cursor-pointer py-2">
              <span className={`${theme === 'dark' ? 'text-white/70 group-hover:text-white' : 'text-gray-600 group-hover:text-black'} transition-colors flex items-center gap-1`}>
                Ещё <ChevronDown className="w-4 h-4" />
              </span>
              <div className={`absolute top-full left-0 mt-1 w-48 ${theme === 'dark' ? 'bg-[#16161a] border-white/5' : 'bg-white border-gray-100'} border rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl overflow-hidden`}>
                <Link to="/reviews" className={`block px-4 py-3 text-sm ${theme === 'dark' ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-50'} transition-colors`}>Отзывы</Link>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-support-chat', { detail: { fullPage: true } }))}
                  className={`w-full text-left block px-4 py-3 text-sm ${theme === 'dark' ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-50'} transition-colors`}
                >
                  Помощь
                </button>
                <Link to="/guarantees" className={`block px-4 py-3 text-sm ${theme === 'dark' ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-50'} transition-colors`}>Гарантии</Link>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${theme === 'dark' ? 'text-white/30' : 'text-gray-400'} group-focus-within:text-violet-500 transition-colors`} />
              </div>
              <input
                type="text"
                placeholder="Поиск игры"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className={`w-full pl-12 pr-24 py-2.5 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.05]' 
                    : 'bg-gray-100 border-gray-100 text-black placeholder:text-gray-400 focus:bg-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-violet-600/20 active:scale-95"
                >
                  Найти
                </button>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className={`absolute top-full left-0 right-0 mt-3 ${theme === 'dark' ? 'bg-[#16161a] border-white/10' : 'bg-white border-slate-200 shadow-2xl'} border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
                <div className="p-2">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => handleGameSelect(game.slug)}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl ${theme === 'dark' ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-50 text-slate-900'} text-left transition-colors`}
                      >
                        <div className={`w-10 h-10 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center`}>
                          <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{game.name}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{game.itemCount.toLocaleString()} предложений</div>
                        </div>
                        <div className="text-[10px] font-bold text-violet-400 bg-violet-400/10 px-2 py-1 rounded uppercase">
                          {game.category === 'ai' ? 'AI' : game.category === 'apps' ? 'App' : 'Game'}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Search className={`w-8 h-8 ${theme === 'dark' ? 'text-white/10' : 'text-slate-300'} mx-auto mb-2`} />
                      <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Ничего не нашли...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Link 
              to="/sell" 
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white transition-all active:scale-95 shadow-lg shadow-violet-600/20"
            >
              Продать
            </Link>
            
            <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'} transition-all`}
                  title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="relative group">
                   <button 
                     onClick={() => navigate('/profile?tab=settings')}
                     className={`p-2.5 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'} transition-all`}
                   >
                     <Settings className="w-5 h-5" />
                   </button>
                </div>
                <button className={`p-2.5 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'} transition-all relative group`}>
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border-2 border-[#0a0a0c]" />
                </button>
                <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-white/10 group">
                  <div className="text-right hidden sm:block">
                    <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>NitroUser</div>
                    <div className="text-[10px] font-black text-violet-400 uppercase tracking-widest">1,250.00 ₽</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-violet-500/20 group-hover:ring-violet-500 transition-all">
                    <img src="https://i.postimg.cc/NjMhdsQJ/output-onlinepngtools-(1).png" alt="Avatar" className={`w-full h-full object-cover ${theme === 'dark' ? 'invert' : ''}`} />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'} transition-all`}
                  title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <div className="relative group">
                    <button 
                      onClick={() => navigate('/profile?tab=settings')}
                      className={`p-2.5 rounded-full ${theme === 'dark' ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'} transition-all`}
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                 </div>
                <button
                  onClick={onLogin}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-black hover:bg-gray-100'} transition-all`}
                >
                  <User className="w-4 h-4" />
                  Войти
                </button>
              </div>
            )}
            
            <button className="lg:hidden p-2.5 rounded-xl bg-white/5 text-white/70">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;