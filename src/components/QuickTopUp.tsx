import React, { useState } from 'react';
import { ChevronDown, Star, CheckCircle2 } from 'lucide-react';

interface QuickTopUpProps {
  theme: 'light' | 'dark';
}

const QuickTopUp: React.FC<QuickTopUpProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'steam' | 'ps'>('steam');
  const [amount, setAmount] = useState('1000');
  const [login, setLogin] = useState('');

  const presets = ['200', '500', '1000'];

  return (
    <section className={`py-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className={`rounded-[2.5rem] p-8 md:p-12 border transition-all duration-300 ${
          theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5 shadow-xl shadow-black/5'
        }`}>
          <h2 className={`text-4xl font-black mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Пополнение {activeTab === 'steam' ? 'Steam' : 'PlayStation'}
          </h2>

          {/* Tabs */}
          <div className="flex gap-8 mb-10 border-b border-white/5">
            <button 
              onClick={() => setActiveTab('steam')}
              className={`pb-4 text-xl font-black transition-all relative ${
                activeTab === 'steam' 
                  ? 'text-violet-500' 
                  : theme === 'dark' ? 'text-white/20 hover:text-white/40' : 'text-black/20 hover:text-black/40'
              }`}
            >
              Steam
              {activeTab === 'steam' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('ps')}
              className={`pb-4 text-xl font-black transition-all relative ${
                activeTab === 'ps' 
                  ? 'text-violet-500' 
                  : theme === 'dark' ? 'text-white/20 hover:text-white/40' : 'text-black/20 hover:text-black/40'
              }`}
            >
              Playstation
              {activeTab === 'ps' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500 rounded-full" />}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Amount Input */}
                <div className="flex-1 relative">
                  <div className={`absolute top-3 left-4 text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>Получите</div>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full pt-8 pb-3 px-4 rounded-2xl font-bold text-lg outline-none transition-all ${
                      theme === 'dark' ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-black/5 focus:bg-black/10 text-black'
                    }`}
                  />
                  <div className={`absolute right-4 bottom-3 font-bold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>₽</div>
                </div>

                {/* Region Selector */}
                <button className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
                }`}>
                  RU, ₽ <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Presets */}
              <div className="flex gap-3">
                {presets.map((p) => (
                  <button 
                    key={p}
                    onClick={() => setAmount(p)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      amount === p 
                        ? 'bg-violet-600 text-white' 
                        : theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/60' : 'bg-black/5 hover:bg-black/10 text-black/60'
                    }`}
                  >
                    {p} ₽
                  </button>
                ))}
              </div>

              {/* Login Input */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder={`Логин ${activeTab === 'steam' ? 'Steam' : 'PSN'}`}
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className={`w-full py-5 px-6 rounded-2xl font-bold text-lg outline-none transition-all ${
                    theme === 'dark' ? 'bg-white/5 focus:bg-white/10 text-white' : 'bg-black/5 focus:bg-black/10 text-black'
                  }`}
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-violet-500 hover:underline">
                  Как узнать логин?
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <button className="w-full py-6 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-2xl font-black transition-all shadow-xl shadow-green-500/20 active:scale-95">
                Купить за {amount || 0} ₽
              </button>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                    579 434 продажи от
                  </span>
                  <span className="text-sm font-black text-violet-500 cursor-pointer hover:underline">
                    Nitro Market
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>4.9</span>
                  <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>(4114)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickTopUp;
