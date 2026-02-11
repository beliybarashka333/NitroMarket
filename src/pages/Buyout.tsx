import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Search, PlusCircle, Gamepad2, User, Clock, CheckCircle2, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import CustomSelect from '../components/CustomSelect';
import { games } from '../data/data';
import { motion, AnimatePresence } from 'framer-motion';

interface BuyoutRequest {
  id: string;
  gameId: string;
  gameName: string;
  gameImage: string;
  user: string;
  budget: string;
  description: string;
  time: string;
  status: 'active' | 'completed';
}

const Buyout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'create'>('browse');
  
  const [formData, setFormData] = useState({
    gameId: '',
    budget: '',
    description: ''
  });

  const [requests] = useState<BuyoutRequest[]>([
    {
      id: '1',
      gameId: 'brawl-stars',
      gameName: 'Brawl Stars',
      gameImage: 'https://i.pinimg.com/originals/bd/48/8a/bd488a22642348db52415bbf5d1e5576.jpg?nii=t',
      user: 'DarkKnight',
      budget: '5000',
      description: 'Куплю аккаунт с Леоном и Вороном, желательно 20к+ кубков.',
      time: '15 минут назад',
      status: 'active'
    },
    {
      id: '2',
      gameId: 'roblox',
      gameName: 'Roblox',
      gameImage: 'https://i.pinimg.com/originals/83/3c/41/833c418836c10db36bded514dad7e378.jpg?nii=t',
      user: 'RobloxMaster',
      budget: '2500',
      description: 'Нужно 10,000 робуксов чистыми. Срочно!',
      time: '1 час назад',
      status: 'active'
    },
    {
      id: '3',
      gameId: 'dota-2',
      gameName: 'Dota 2',
      gameImage: 'https://i.pinimg.com/originals/5e/5e/8a/5e5e8a0f9b0b1b1b1b1b1b1b1b1b1b1b.jpg',
      user: 'PudgeMain',
      budget: '12000',
      description: 'Ищу аркану на Пуджа и плечи. Можно сетом.',
      time: '3 часа назад',
      status: 'active'
    }
  ]);

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

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    console.log('Request created:', formData);
    setActiveTab('browse');
    setFormData({ gameId: '', budget: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-bold mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            Биржа запросов
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Скупка и <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Запросы</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl max-w-2xl mx-auto font-medium"
          >
            Размещайте свои заявки на покупку или находите выгодные предложения от других пользователей.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex p-1.5 bg-white/5 border border-white/5 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'browse' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/40 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              Все заявки
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'create' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/40 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Подать заявку
            </button>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-violet-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Поиск по играм..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'browse' ? (
            <motion.div 
              key="browse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {requests.map((req) => (
                <div key={req.id} className="group relative bg-[#16161a] border border-white/5 rounded-[2rem] p-6 hover:border-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-[50px] -z-10 group-hover:bg-violet-600/10 transition-colors" />
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/5">
                        <img src={req.gameImage} alt={req.gameName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-white font-black text-lg">{req.gameName}</h3>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold uppercase tracking-wider">
                          <User className="w-3 h-3" />
                          {req.user}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">
                      Активно
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {req.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <div className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Бюджет</div>
                      <div className="text-2xl font-black text-white">{req.budget} ₽</div>
                    </div>
                    <button className="px-6 py-3 bg-white/5 hover:bg-violet-600 text-white rounded-xl font-bold text-sm transition-all active:scale-95">
                      Предложить
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {req.time}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 blur-[100px] -z-10" />
                
                <h2 className="text-3xl font-black text-white mb-8">Создать заявку</h2>
                
                <form onSubmit={handleCreateRequest} className="space-y-8">
                  <CustomSelect
                    label="Выберите игру"
                    placeholder="Какую игру ищем?"
                    options={games.map(game => ({ id: game.id, label: game.name, image: game.image }))}
                    value={formData.gameId}
                    onChange={(val) => setFormData({ ...formData, gameId: val })}
                    required
                  />

                  <div className="space-y-3">
                    <label className="block text-sm font-black text-white/40 uppercase tracking-widest ml-1">
                      Ваш бюджет (₽)
                    </label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-violet-500 transition-colors font-black">₽</div>
                      <input 
                        type="number" 
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="Например: 5000"
                        className="w-full pl-12 pr-24 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/10 outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-bold"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budget: String(Math.max(0, (parseInt(prev.budget) || 0) - 100)) }))}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budget: String((parseInt(prev.budget) || 0) + 100) }))}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-black text-white/40 uppercase tracking-widest ml-1">
                      Описание запроса
                    </label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Опишите, что именно вы ищете. Чем подробнее, тем лучше!"
                      rows={5}
                      className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/10 outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium resize-none custom-scrollbar"
                      required
                    />
                  </div>

                  <div className="p-6 rounded-2xl bg-violet-600/5 border border-violet-500/10 space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                      <p className="text-sm text-white/60 font-medium">Ваша заявка будет видна всем продавцам в течение 30 дней.</p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                      <p className="text-sm text-white/60 font-medium">Продавцы смогут предлагать свои товары под вашим запросом.</p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-violet-600/20 transition-all active:scale-[0.98]"
                  >
                    Разместить запрос
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

export default Buyout;
