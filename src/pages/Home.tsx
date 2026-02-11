import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import PromoBanners from '../components/PromoBanners';
import ActionCards from '../components/ActionCards';
import GameGrid from '../components/GameGrid';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

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
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'}`}>
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogin={openLoginModal} 
        onLogout={handleLogout} 
      />
      <main>
        <CategoryBar theme={theme} />
        <PromoBanners theme={theme} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
          <ActionCards theme={theme} />
          <GameGrid />
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

export default Home;