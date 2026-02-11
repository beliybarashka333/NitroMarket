import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login/register process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      onClose();
      setEmail('');
      setPassword('');
      setUsername('');
      setMode('login');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative ${theme === 'dark' ? 'bg-[#16161a] border-white/5' : 'bg-white border-slate-200'} border rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md mx-4 overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-64 h-64 ${theme === 'dark' ? 'bg-violet-600/5' : 'bg-violet-600/10'} blur-[100px] -z-10`} />
            
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 ${theme === 'dark' ? 'text-white/20 hover:text-white hover:bg-white/5' : 'text-slate-300 hover:text-slate-900 hover:bg-slate-100'} transition-all p-2 rounded-full`}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-10">
              <h2 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-3`}>
                {mode === 'login' ? 'Вход в аккаунт' : 'Создание профиля'}
              </h2>
              <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} font-medium`}>
                {mode === 'login' 
                  ? 'Войдите, чтобы получить доступ ко всем функциям' 
                  : 'Зарегистрируйтесь, чтобы начать торговать'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
                <div>
                  <label htmlFor="username" className={`block text-sm font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} mb-2 ml-1`}>
                    Никнейм
                  </label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'} group-focus-within:text-violet-500 transition-colors h-5 w-5`} />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ваш никнейм"
                      className={`w-full pl-12 pr-4 py-3.5 ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white placeholder:text-white/10' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300'} border rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all`}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className={`block text-sm font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} mb-2 ml-1`}>
                  Email
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'} group-focus-within:text-violet-500 transition-colors h-5 w-5`} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full pl-12 pr-4 py-3.5 ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white placeholder:text-white/10' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300'} border rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all`}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} mb-2 ml-1`}>
                  Пароль
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'} group-focus-within:text-violet-500 transition-colors h-5 w-5`} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className={`w-full pl-12 pr-12 py-3.5 ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white placeholder:text-white/10' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300'} border rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-slate-300 hover:text-slate-900'} transition-colors`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-violet-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{mode === 'login' ? 'Входим...' : 'Создаем...'}</span>
                    </>
                  ) : (
                    mode === 'login' ? 'Войти' : 'Создать профиль'
                  )}
                </button>
              </div>

              <div className="text-center pt-4">
                <p className={`text-sm ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'} font-bold`}>
                  {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'} 
                  <button 
                    type="button" 
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="text-violet-400 hover:text-violet-300 transition-colors ml-2"
                  >
                    {mode === 'login' ? 'Создать профиль' : 'Войти'}
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;