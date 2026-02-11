import React, { useState, useEffect } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home';
import Catalog from './src/pages/Catalog';
import ItemDetail from './src/pages/ItemDetail';
import Profile from './src/pages/Profile';
import Sell from './src/pages/Sell';
import Buyout from './src/pages/Buyout';
import Auctions from './src/pages/Auctions';
import NotFound from './src/pages/NotFound';
import SupportChat from './src/components/SupportChat';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      setTheme(e.detail);
    };
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  return (
    <Theme appearance={theme} radius="large" scaling="100%">
      <Router>
        <main className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-[#0a0a0c] text-white' : 'bg-white text-black'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/:gameSlug" element={<Catalog />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/buyout" element={<Buyout />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SupportChat />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    </Theme>
  );
}

export default App;