import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  image?: string;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  required = false,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.id === value);

  useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener('change-theme', handleThemeChange);

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('change-theme', handleThemeChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
          {label} {required && <span className="text-violet-500">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        } ${
          theme === 'dark' 
            ? `bg-white/[0.02] border-white/5 ${isOpen ? 'border-violet-500/50 ring-2 ring-violet-500/20' : 'hover:border-white/10'}`
            : `bg-white border-slate-200 shadow-sm ${isOpen ? 'border-violet-500/50 ring-2 ring-violet-500/20' : 'hover:border-slate-300'}`
        }`}
      >
        <div className="flex items-center gap-3">
          {selectedOption?.image && (
            <div className={`w-6 h-6 rounded-md overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center`}>
              <img src={selectedOption.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <span className={`text-sm font-bold ${selectedOption ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : (theme === 'dark' ? 'text-white/40' : 'text-slate-400')}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronsUpDown className={`w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'} transition-colors duration-300 ${isOpen ? 'text-violet-400' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-[100] w-full mt-2 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${
          theme === 'dark' ? 'bg-[#16161a] border border-white/10' : 'bg-white border border-slate-200 shadow-xl'
        }`}>
          <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  value === option.id 
                    ? 'bg-violet-500/10 text-violet-400' 
                    : theme === 'dark'
                      ? 'text-white/40 hover:bg-white/5 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {option.image && (
                  <div className={`w-8 h-8 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} flex items-center justify-center`}>
                    <img src={option.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-bold">{option.label}</div>
                </div>
                {value === option.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
