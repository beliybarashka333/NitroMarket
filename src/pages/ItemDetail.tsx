import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, MessageCircle, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import { items, games } from '../data/data';

const ItemDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const item = items.find(i => i.id === itemId);
  const game = item ? games.find(g => g.id === item.gameId) : null;

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

  const handlePurchase = () => {
    setShowPaymentModal(true);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'currency':
        return 'Валюта';
      case 'accounts':
        return 'Аккаунты';
      case 'items':
        return 'Предметы';
      default:
        return category;
    }
  };

  if (!item || !game) {
    return (
      <div className="min-h-screen">
        <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <Link to="/" className="text-violet-400 hover:text-violet-300">
              Вернуться на главную
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
      
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 mb-8 text-sm font-bold">
          <Link to="/" className="text-white/40 hover:text-white transition-colors">Главная</Link>
          <span className="text-white/20">/</span>
          <Link to={`/catalog/${game.slug}`} className="text-white/40 hover:text-white transition-colors">{game.name}</Link>
          <span className="text-white/20">/</span>
          <span className="text-white/70 truncate max-w-[200px]">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image & Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-xl bg-violet-600/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider shadow-xl">
                  {getCategoryLabel(item.category)}
                </span>
              </div>
            </div>
            
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 blur-[100px] -z-10" />
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-violet-500 rounded-full" />
                Описание товара
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/60 leading-relaxed text-lg whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {item.stats && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                  {item.stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="text-white font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews Section Placeholder */}
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-green-500 rounded-full" />
                  Отзывы о продавце
                </h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-black text-white">{item.seller.rating}</span>
                  <span className="text-white/20">/ 5.0</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white">Пользователь #{i + 1242}</div>
                        <div className="text-xs text-white/20">2 дня назад</div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                      </div>
                      <p className="text-sm text-white/40">Все отлично, товар получил моментально. Рекомендую продавца!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Buy Box & Seller Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/20 blur-[80px] -z-10" />
                
                <h1 className="text-3xl font-black text-white mb-6 leading-tight">
                  {item.title}
                </h1>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {item.price.toLocaleString('ru-RU')}
                  </span>
                  <span className="text-2xl font-bold text-white/40">₽</span>
                </div>

                <div className="space-y-3 mb-8">
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 px-8 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-violet-600/20 active:scale-[0.98] group"
                  >
                    <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>КУПИТЬ СЕЙЧАС</span>
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 px-8 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                    <MessageCircle className="w-5 h-5" />
                    <span>Написать продавцу</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center">Защита сделки</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center">Гарантия возврата</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={item.seller.avatar}
                      alt={item.seller.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                    />
                    {item.seller.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#16161a]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-white text-lg">{item.seller.name}</span>
                      {item.seller.rating > 4.8 && (
                        <div className="w-5 h-5 bg-violet-500 rounded-md flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-white">{item.seller.rating}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-sm font-bold text-white/40">{item.seller.sales.toLocaleString()} сделок</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40 font-bold">На сайте</span>
                    <span className="text-white font-bold">2 года</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40 font-bold">Отзывов</span>
                    <span className="text-white font-bold">452</span>
                  </div>
                  <button className="w-full mt-4 text-xs font-black text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest py-2">
                    Посмотреть все товары
                  </button>
                </div>
              </div>

              {/* Support info */}
              <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-violet-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-600/20">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white mb-0.5">Безопасная сделка</div>
                    <p className="text-xs text-white/40 font-medium">Продавец получит деньги только после того, как вы подтвердите получение товара.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLogin} 
      />

      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowPaymentModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#16161a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-[80px]" />
              
              <div className="w-24 h-24 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-500/20">
                <Shield className="w-12 h-12 text-green-500" />
              </div>
              
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Заказ оформлен!</h2>
              <p className="text-white/40 text-lg mb-10 font-medium leading-relaxed">
                Ваш заказ на <span className="text-white font-bold">"{item.title}"</span> успешно создан. 
                Продавец уведомлен и скоро свяжется с вами для передачи данных.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    navigate('/profile');
                  }}
                  className="w-full bg-white text-black py-5 px-8 rounded-2xl font-black text-lg hover:bg-white/90 transition-all active:scale-[0.98]"
                >
                  ПЕРЕЙТИ К ЗАКАЗУ
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-white/5 text-white/40 py-4 px-8 rounded-2xl font-bold hover:text-white transition-all"
                >
                  Продолжить покупки
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemDetail;