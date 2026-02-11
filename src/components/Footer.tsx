import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageCircle, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  return (
    <footer className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white border-t border-slate-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-6 hover:opacity-80 transition-opacity">
              <img 
                src="https://i.postimg.cc/NjMhdsQJ/output-onlinepngtools-(1).png" 
                alt="NitroMarket Logo" 
                className={`h-12 w-auto transition-all ${theme === 'dark' ? 'brightness-110' : 'brightness-0 grayscale opacity-90 hover:opacity-100'}`}
              />
            </Link>
            <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} mb-4`}>
              Надёжный маркетплейс игровых товаров с гарантией безопасности и быстрыми выплатами
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/nitromarket"
                className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors`}
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@nitromarket.ru"
                className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors`}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+78001234567"
                className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors`}
                aria-label="Телефон"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-to-buy" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Как купить
                </Link>
              </li>
              <li>
                <Link to="/guarantees" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Гарантии
                </Link>
              </li>
              <li>
                <Link to="/payment" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Способы оплаты
                </Link>
              </li>
              <li>
                <Link to="/support" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Поддержка
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Продавцам</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sell" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Продать товар
                </Link>
              </li>
              <li>
                <Link to="/seller-guide" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Гид продавца
                </Link>
              </li>
              <li>
                <Link to="/commission" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Комиссии
                </Link>
              </li>
              <li>
                <Link to="/verification" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Верификация
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/terms" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Пользовательское соглашение
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/contacts" className={`${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'} mt-8 pt-8 text-center`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
            © 2026 NitroMarket. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;