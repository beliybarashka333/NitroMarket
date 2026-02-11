import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, User, ArrowLeft, Headphones } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: string;
}

const FAQ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Как купить товар?",
    answer: "Для покупки товара выберите интересующую игру в каталоге, найдите подходящее предложение и нажмите кнопку 'Купить'. После оплаты вы получите данные товара или инструкции по получению."
  },
  {
    id: 2,
    question: "Какие гарантии?",
    answer: "Мы гарантируем безопасность сделок. Деньги переводятся продавцу только после того, как вы подтвердите получение товара. В случае проблем наша поддержка поможет вернуть средства."
  },
  {
    id: 3,
    question: "Как стать продавцом?",
    answer: "Чтобы продавать товары, нажмите кнопку 'Продать' в шапке сайта, заполните информацию о товаре и опубликуйте его. После первой продажи вам потребуется подтвердить профиль."
  },
  {
    id: 4,
    question: "Как вывести деньги?",
    answer: "Вывод средств доступен в личном кабинете. Мы поддерживаем вывод на банковские карты, электронные кошельки и криптовалюту. Срок обработки — от 15 минут до 24 часов."
  }
];

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isOperatorMode, setIsOperatorMode] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);
    return () => window.removeEventListener('change-theme', handleThemeChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY < 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Слушаем событие открытия чата из других компонентов
  useEffect(() => {
    const handleOpenSupport = (e: any) => {
      setIsOpen(true);
      if (e.detail?.fullPage) {
        setIsFullPage(true);
      } else {
        setIsFullPage(false);
      }
    };
    window.addEventListener('open-support-chat', handleOpenSupport);
    return () => window.removeEventListener('open-support-chat', handleOpenSupport);
  }, []);

  const handleCallOperator = () => {
    setIsOperatorMode(true);
    setSelectedQuestion(null);
  };

  const resetChat = () => {
    setSelectedQuestion(null);
    setIsOperatorMode(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsFullPage(false);
    resetChat();
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-[60] w-16 h-16 rounded-2xl shadow-2xl overflow-hidden hover:scale-110 transition-transform group"
          >
            <img 
              src="https://i.postimg.cc/7LvZdsmD/photo-2026-02-11-22-17-52.jpg" 
              alt="Support" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/20 group-hover:bg-transparent' : 'bg-transparent'} transition-colors`} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isFullPage ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={isFullPage ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed z-[100] ${theme === 'dark' ? 'bg-[#0f0f12]' : 'bg-white'} shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              isFullPage 
                ? 'inset-0 w-full h-full' 
                : `bottom-8 right-8 w-[400px] max-w-[calc(100vw-40px)] rounded-[2.5rem] ${theme === 'dark' ? 'border border-white/10' : 'border border-slate-200'}`
            }`}
          >
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-between ${isFullPage ? '' : 'rounded-t-[2.5rem]'}`}>
              <div className="flex items-center gap-4">
                {isFullPage && (
                  <button 
                    onClick={closeChat}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Поддержка NitroMarket</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Онлайн</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={closeChat}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className={`flex-1 overflow-y-auto p-6 custom-scrollbar flex flex-col gap-4 ${isFullPage ? 'max-w-4xl mx-auto w-full' : 'h-[450px]'}`}>
              <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} rounded-2xl rounded-tl-none p-6 max-w-[85%] border`}>
                <p className={`${theme === 'dark' ? 'text-white/80' : 'text-slate-700'} text-base leading-relaxed`}>
                  Здравствуйте! 👋 Чем я могу вам помочь сегодня? Выберите интересующий вопрос или позовите оператора.
                </p>
              </div>

              {!selectedQuestion && !isOperatorMode && (
                <div className={`grid gap-3 mt-4 ${isFullPage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {FAQ_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuestion(q)}
                      className={`w-full text-left p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 text-white/60 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm'} border hover:border-violet-500/30 text-sm font-bold transition-all`}
                    >
                      {q.question}
                    </button>
                  ))}
                  <button
                    onClick={handleCallOperator}
                    className={`w-full p-4 rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20 text-sm font-black transition-all flex items-center justify-center gap-2 hover:bg-violet-700 active:scale-95 ${isFullPage ? 'md:col-span-2' : ''}`}
                  >
                    <User className="w-4 h-4" />
                    Вызвать оператора
                  </button>
                </div>
              )}

              {selectedQuestion && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-end">
                    <div className="bg-violet-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[85%] shadow-lg">
                      <p className="text-sm font-bold">{selectedQuestion.question}</p>
                    </div>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} rounded-2xl rounded-tl-none p-4 max-w-[85%] border`}>
                    <p className={`${theme === 'dark' ? 'text-white/80' : 'text-slate-700'} text-sm leading-relaxed`}>{selectedQuestion.answer}</p>
                  </div>
                  <button 
                    onClick={resetChat}
                    className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-xs font-bold uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Назад к вопросам
                  </button>
                </motion.div>
              )}

              {isOperatorMode && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-end">
                    <div className="bg-violet-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[85%] shadow-lg">
                      <p className="text-sm font-bold">Вызвать оператора</p>
                    </div>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'} rounded-2xl rounded-tl-none p-4 max-w-[85%] border`}>
                    <p className={`${theme === 'dark' ? 'text-white/80' : 'text-slate-700'} text-sm leading-relaxed italic`}>
                      Соединяем с оператором... Пожалуйста, подождите. Среднее время ожидания: 2 минуты.
                    </p>
                  </div>
                  <button 
                    onClick={resetChat}
                    className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-xs font-bold uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Вернуться к FAQ
                  </button>
                </motion.div>
              )}
            </div>

            {/* Input Area (Disabled for now as it's a demo/FAQ system) */}
            <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50'}`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Напишите сообщение..."
                  className={`w-full pl-4 pr-12 py-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all`}
                  disabled={!isOperatorMode}
                />
                <button 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${isOperatorMode ? 'text-violet-400 hover:text-violet-300' : (theme === 'dark' ? 'text-white/10' : 'text-slate-200')}`}
                  disabled={!isOperatorMode}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportChat;
