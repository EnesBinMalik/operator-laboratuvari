import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCertificatePrompt?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Terminal className="w-4 h-4" />
          </div>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('sandbox');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            Operatör Laboratuvarı
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'sandbox' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Operatör Laboratuvarı
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'decisions' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Karar Yapıları
          </button>
          <button
            onClick={() => setActiveTab('evaluator')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'evaluator' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            İfade Çözücü
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'cheatsheet' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Operatör Rehberi
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quiz' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Bilgi Testi
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm shadow-indigo-600/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bilgi Testi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
