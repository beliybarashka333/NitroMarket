import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, DollarSign, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import CustomSelect from '../components/CustomSelect';
import { games } from '../data/data';

const Sell: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    gameId: '',
    title: '',
    category: '',
    price: '',
    description: ''
  });

  const selectedGame = games.find(g => g.id === formData.gameId);
  const categoryOptions = selectedGame?.allowedCategories || [];

  const handleGameChange = (gameId: string) => {
    setFormData({
      ...formData,
      gameId,
      category: '' // Reset category when game changes
    });
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogin={openLoginModal} onLogout={handleLogout} />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Назад на главную</span>
          </Link>
        </div>

        <div className="rounded-xl p-8 card-surface">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Продать товар</h1>
            <p className="text-muted-foreground">Заполните форму, чтобы выставить товар на продажу</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomSelect
                label="Игра/Приложение"
                placeholder="Выберите игру"
                options={games.map(game => ({ id: game.id, label: game.name, image: game.image }))}
                value={formData.gameId}
                onChange={handleGameChange}
                required
              />

              <CustomSelect
                label="Категория"
                placeholder={formData.gameId ? "Выберите категорию" : "Сначала выберите игру"}
                options={categoryOptions}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
                disabled={!formData.gameId}
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">Название товара *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Например: 500 Robux или Аккаунт с редкими скинами"
                className="w-full rounded-lg px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">Цена (₽) *</label>
              <div className="relative group">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="1"
                  className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                  required
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, price: String(Math.max(0, (parseInt(prev.price) || 0) - 10)) }))}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, price: String((parseInt(prev.price) || 0) + 10) }))}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Описание товара *</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none resize-none custom-scrollbar"
                placeholder="Опишите ваш товар максимально подробно..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Изображения товара</label>
              <div className="rounded-lg p-6 text-center border-dashed border-2 border-[rgba(255,255,255,0.03)] hover:border-[rgba(99,102,241,0.12)] transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground mb-2">Перетащите изображения сюда или</p>
                <button
                  type="button"
                  className="text-violet-400 hover:text-violet-300 font-medium"
                >
                  выберите файлы
                </button>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG до 5MB</p>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-[rgba(255,255,255,0.02)]">
              <h3 className="font-semibold mb-2">Комиссия маркетплейса</h3>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Цена товара:</span>
                <span className="font-medium">{formData.price || '0'} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Комиссия (5%):</span>
                <span className="font-medium">{Math.round((parseInt(formData.price) || 0) * 0.05)} ₽</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-t border-[rgba(255,255,255,0.03)] pt-2 mt-2">
                <span>Вы получите:</span>
                <span>{Math.round((parseInt(formData.price) || 0) * 0.95)} ₽</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all"
            >
              Выставить на продажу
            </button>
          </form>
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

export default Sell;