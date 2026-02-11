import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, ShoppingBag, DollarSign, Settings, Star, Camera, Lock, Mail, Shield, CreditCard, Send, Smartphone, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const Profile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'purchases' | 'sales' | 'transactions'>('profile');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();

  useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'settings') setActiveTab('settings');
    else if (tab === 'purchases') setActiveTab('purchases');
    else if (tab === 'sales') setActiveTab('sales');
    else if (tab === 'transactions') setActiveTab('transactions');
    else setActiveTab('profile');
  }, [location]);

  const transactions = [
    { id: 1, type: 'purchase', title: 'Аккаунт Brawl Stars', date: '12 февраля 2026, 14:30', amount: 2500, status: 'completed' },
    { id: 2, type: 'sale', title: '1000 Gold Standoff 2', date: '11 февраля 2026, 18:15', amount: 850, status: 'completed' },
    { id: 3, type: 'deposit', title: 'Пополнение баланса', date: '10 февраля 2026, 09:45', amount: 5000, status: 'completed' },
    { id: 4, type: 'purchase', title: 'Скин AK-47 | Redline', date: '09 февраля 2026, 21:00', amount: 1200, status: 'completed' },
  ];

  const mySales = [
    { id: 1, title: 'Аккаунт CS2 Prime', price: 1500, category: 'Аккаунты', status: 'active', views: 142 },
    { id: 2, title: 'Нож-бабочка | Градиент', price: 45000, category: 'Скины', status: 'sold', views: 890 },
  ];

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Необходима авторизация</h1>
            <p className="text-muted-foreground mb-6">Войдите в аккаунт, чтобы просмотреть профиль</p>
            <button
              onClick={openLoginModal}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-violet-700 hover:to-indigo-700 transition-all"
            >
              Войти в аккаунт
            </button>
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
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-gray-50'}`}>
      <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <div className={`rounded-3xl p-8 border transition-all duration-300 ${
              theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face"
                    alt="Profile"
                    className="w-24 h-24 rounded-[2rem] mx-auto border-4 border-violet-500/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#0a0a0c] rounded-full" />
                </div>
                <h2 className={`text-xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Александр Иванов</h2>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>ID: 458293</p>
                
                <div className={`flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                }`}>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>4.8</span>
                  <span className={theme === 'dark' ? 'text-white/30' : 'text-black/30'}>• 127 отзывов</span>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'profile', label: 'Обзор', icon: User },
                    { id: 'purchases', label: 'Мои покупки', icon: ShoppingBag },
                    { id: 'sales', label: 'Мои продажи', icon: DollarSign },
                    { id: 'transactions', label: 'Транзакции', icon: CreditCard },
                    { id: 'settings', label: 'Настройки', icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20 scale-[1.02]'
                          : theme === 'dark'
                            ? 'text-white/40 hover:text-white hover:bg-white/5'
                            : 'text-black/40 hover:text-black hover:bg-black/5'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Wallet Balance */}
            <div className={`rounded-3xl p-8 border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border-violet-500/20' 
                : 'bg-gradient-to-br from-violet-600 to-indigo-600 border-none shadow-lg'
            }`}>
              <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-violet-300' : 'text-white/70'}`}>Баланс</div>
              <div className="text-3xl font-black text-white mb-6">12,450.00 ₽</div>
              <button className={`w-full py-4 rounded-2xl font-black transition-all active:scale-95 ${
                theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}>
                Пополнить
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Всего покупок', value: '23', icon: ShoppingBag, color: 'violet' },
                    { label: 'Всего продаж', value: '12', icon: DollarSign, color: 'green' },
                    { label: 'Средний чек', value: '1,200 ₽', icon: Star, color: 'orange' },
                  ].map((stat, i) => (
                    <div key={i} className={`rounded-3xl p-8 border transition-all ${
                      theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
                    }`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                        stat.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                        stat.color === 'green' ? 'bg-green-500/10 text-green-400' :
                        'bg-orange-500/10 text-orange-400'
                      }`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={`text-sm font-bold uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                        {stat.label}
                      </div>
                      <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`rounded-3xl p-8 border transition-all ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Последние операции</h3>
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="text-violet-500 font-bold hover:underline"
                    >
                      Все операции
                    </button>
                  </div>
                  <div className="space-y-4">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                        theme === 'dark' ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]' : 'bg-gray-50 border-black/5 hover:bg-gray-100'
                      }`}>
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            tx.type === 'purchase' ? 'bg-red-500/10 text-red-400' :
                            tx.type === 'sale' ? 'bg-green-500/10 text-green-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}>
                            {tx.type === 'purchase' ? <ShoppingBag className="w-6 h-6" /> :
                             tx.type === 'sale' ? <DollarSign className="w-6 h-6" /> :
                             <CreditCard className="w-6 h-6" />}
                          </div>
                          <div>
                            <div className={`font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{tx.title}</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{tx.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-black ${
                            tx.type === 'purchase' ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {tx.type === 'purchase' ? '-' : '+'}{tx.amount} ₽
                          </div>
                          <div className="text-xs font-bold uppercase tracking-widest text-white/20">Выполнено</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className={`rounded-3xl p-8 border transition-all ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
              }`}>
                <h3 className={`text-2xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Мои покупки</h3>
                <div className="space-y-4">
                  {transactions.filter(t => t.type === 'purchase').map(purchase => (
                    <div key={purchase.id} className={`p-6 rounded-2xl border ${
                      theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 font-black text-xl">
                            {purchase.title[0]}
                          </div>
                          <div>
                            <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{purchase.title}</h4>
                            <p className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>Дата покупки: {purchase.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all">
                            Чек
                          </button>
                          <button className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10'
                          }`}>
                            Помощь
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className={`rounded-3xl p-8 border transition-all ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Мои продажи</h3>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-black transition-all">
                    Выставить товар
                  </button>
                </div>
                <div className="space-y-4">
                  {mySales.map(sale => (
                    <div key={sale.id} className={`p-6 rounded-2xl border ${
                      theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 font-black text-xl">
                            {sale.title[0]}
                          </div>
                          <div>
                            <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{sale.title}</h4>
                            <p className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>{sale.category} • {sale.views} просмотров</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-8">
                          <div>
                            <div className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{sale.price} ₽</div>
                            <div className={`text-sm font-bold uppercase ${sale.status === 'active' ? 'text-green-400' : 'text-white/20'}`}>
                              {sale.status === 'active' ? 'Активно' : 'Продано'}
                            </div>
                          </div>
                          <button className={`p-3 rounded-xl transition-all ${
                            theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10'
                          }`}>
                            <Settings className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className={`rounded-3xl p-8 border transition-all ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
              }`}>
                <h3 className={`text-2xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>История транзакций</h3>
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.id} className={`flex items-center justify-between p-6 rounded-2xl border ${
                      theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
                    }`}>
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          tx.type === 'purchase' ? 'bg-red-500/10 text-red-400' :
                          tx.type === 'sale' ? 'bg-green-500/10 text-green-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {tx.type === 'purchase' ? <ShoppingBag className="w-6 h-6" /> :
                           tx.type === 'sale' ? <DollarSign className="w-6 h-6" /> :
                           <CreditCard className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className={`font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{tx.title}</div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{tx.date}</div>
                        </div>
                      </div>
                      <div className={`text-xl font-black ${
                        tx.type === 'purchase' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {tx.type === 'purchase' ? '-' : '+'}{tx.amount} ₽
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className={`rounded-3xl p-8 border transition-all ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
                }`}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-violet-500 rounded-full" />
                    <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Личные данные</h3>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="relative group">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face"
                        alt="Profile"
                        className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-violet-500/20 group-hover:border-violet-500 transition-all duration-500"
                      />
                      <button className="absolute -bottom-2 -right-2 p-3 bg-violet-600 rounded-2xl text-white shadow-xl hover:scale-110 transition-all">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      {[
                        { icon: Lock, label: 'Изменить пароль' },
                        { icon: Mail, label: 'Привязать почту' },
                        { icon: Shield, label: 'Настроить 2FA' },
                        { icon: CreditCard, label: 'Способы оплаты' },
                        { icon: Smartphone, label: 'Номер телефона' },
                        { icon: Globe, label: 'Язык интерфейса' }
                      ].map((item, i) => (
                        <button key={i} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all group ${
                          theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-black/5 hover:bg-gray-100'
                        }`}>
                          <item.icon className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                          <span className={`font-bold transition-colors ${theme === 'dark' ? 'text-white/70 group-hover:text-white' : 'text-black/70 group-hover:text-black'}`}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`rounded-3xl p-8 border transition-all ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-sm'
                }`}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-green-500 rounded-full" />
                    <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Торговля</h3>
                  </div>
                  <div className="space-y-4">
                    <label className={`flex items-center gap-4 p-6 rounded-2xl border cursor-pointer transition-all group ${
                      theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/[0.07]' : 'bg-gray-50 border-black/5 hover:bg-gray-100'
                    }`}>
                      <div className="w-6 h-6 rounded-full border-2 border-violet-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-violet-500" />
                      </div>
                      <div>
                        <div className={`font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Показывать мои предложения</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Стандартная настройка. Все пользователи видят ваши предложения.</div>
                      </div>
                    </label>
                  </div>
                </div>
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

export default Profile;