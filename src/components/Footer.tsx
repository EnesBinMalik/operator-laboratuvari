import React from 'react';
import { Terminal, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2.5 text-white font-bold text-base mb-1">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span>Operatör Laboratuvarı</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Programlama dillerinde atama, aritmetik, ilişkisel ve mantıksal operatörler ile karar yapılarını keşfeden interaktif eğitim platformu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('sandbox')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Laboratuvar
            </button>
            <button
              onClick={() => onNavigate('decisions')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Karar Yapıları
            </button>
            <button
              onClick={() => onNavigate('evaluator')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              İfade Çözücü
            </button>
            <button
              onClick={() => onNavigate('cheatsheet')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Rehber
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Bilgi Testi
            </button>
          </div>
        </div>

        {/* Bottom Attribution Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>Tüm Hakları Saklıdır</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Tasarım ve Geliştirme: <strong className="text-white font-semibold">Enes Öztürk</strong> İmzalı</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
