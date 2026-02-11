import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, Zap, Moon, Cpu, Layout, Percent, Gamepad2 } from 'lucide-react';

interface CategoryBarProps {
  theme: 'light' | 'dark';
}

const categories = [
  { id: 'topup', label: 'Пополнение баланса', icon: Zap, color: 'text-yellow-400' },
  { id: 'ai', label: 'ИИ от Nitro', icon: Cpu, color: 'text-purple-400' },
  { id: 'ps', label: 'PlayStation', icon: Monitor, color: 'text-blue-500', slug: 'playstation' },
  { id: 'discounts', label: 'Скидки 90%', icon: Percent, color: 'text-green-400' },
  { id: 'games', label: 'Игры', icon: Gamepad2, color: 'text-indigo-400' },
];

const CategoryBar: React.FC<CategoryBarProps> = ({ theme }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat: typeof categories[0]) => {
    if (cat.slug) {
      navigate(`/catalog/${cat.slug}`);
    } else if (cat.id === 'games') {
      const catalogSection = document.getElementById('catalog');
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (cat.id === 'ai') {
      const aiSection = document.getElementById('ai-section');
      if (aiSection) {
        aiSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/catalog/chatgpt');
      }
    } else if (cat.id === 'discounts') {
      navigate('/catalog/cs2?sort=price-asc');
    } else if (cat.id === 'topup') {
      navigate('/profile?tab=transactions');
    }
  };

  return (
    <div className={`w-full py-4 overflow-x-auto no-scrollbar transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-white'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-6 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className={`group flex items-center gap-3 px-4 py-2 rounded-2xl transition-all hover:scale-105 ${
              theme === 'dark' 
                ? 'hover:bg-white/5 text-white/70 hover:text-white' 
                : 'hover:bg-black/5 text-black/70 hover:text-black'
            }`}
          >
            <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} group-hover:bg-violet-500/20 transition-colors`}>
              <cat.icon className={`w-5 h-5 ${cat.color}`} />
            </div>
            <span className="text-sm font-bold whitespace-nowrap">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
