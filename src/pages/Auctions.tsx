import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gavel } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const Auctions: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Назад на главную</span>
          </Link>
        </div>

        <div className="rounded-xl p-8 card-surface text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gavel className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Аукционы</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Участвуйте в торгах за редкие игровые предметы и аккаунты. Выигрывайте лоты по лучшим ценам!
          </p>

          <div className="rounded-lg p-6 mb-8 bg-[rgba(255,255,255,0.02)]">
            <h2 className="text-xl font-semibold mb-4">В разработке</h2>
            <p className="text-muted-foreground mb-4">
              Система аукционов находится в стадии разработки. 
              Скоро вы сможете участвовать в захватывающих торгах за уникальные игровые товары.
            </p>
            <div className="text-sm text-muted-foreground">
              Используйте Meku для генерации контента этой страницы
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold mb-2">Редкие товары</h3>
              <p className="text-sm text-muted-foreground">Уникальные предметы и аккаунты</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold mb-2">Живые торги</h3>
              <p className="text-sm text-muted-foreground">Торги в реальном времени</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-semibold mb-2">Лучшие цены</h3>
              <p className="text-sm text-muted-foreground">Выгодные покупки на аукционе</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all"
          >
            <span>Перейти к покупкам</span>
          </Link>
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

export default Auctions;