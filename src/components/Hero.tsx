import React from 'react';
import { ArrowRight, Code2, Cpu, GitBranch, Layers, Award } from 'lucide-react';
import { OPERATOR_CATEGORIES } from '../data/operatorsData';

interface HeroProps {
  onSelectCategory: (categoryId: string) => void;
  onExploreDecisions: () => void;
  onTakeQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onExploreDecisions,
  onTakeQuiz,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-24 left-1/4 w-80 h-40 bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Author signature line */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-indigo-400">Programlama Temelleri</span>
            <span aria-hidden="true">·</span>
            <span>İnteraktif Algoritma & Kodlama Laboratuvarı</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Enes Öztürk İmzalı</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>İçerik hazırlayan: <strong className="font-semibold text-white">Enes Öztürk</strong></span>
          </div>
        </div>

        {/* Main Grid: Headline & Interactive Code Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight mb-5">
              Programlamada <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">Operatörler</span> ve Karar Yapıları
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Uygulama içerisinden bir atama işlemi ya da durum karşılaştırması yapmak istediğimizde
              operatörleri kullanırız. Bazen koşullara bağlı olarak çalıştırılacak kod bloğunun değişmesi gerekir;
              karar yapıları ve operatörler birlikte kullanılarak bu esneklik sağlanır.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => onSelectCategory('arithmetic')}
                className="px-5 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <span>Operatörleri Canlı Dene</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDecisions}
                className="px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <GitBranch className="w-4 h-4 text-sky-400" />
                <span>Karar Yapıları Simülatörü</span>
              </button>

              <button
                onClick={onTakeQuiz}
                className="px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Bilgi Testine Katıl →
              </button>
            </div>
          </div>

          {/* Right Column: Code & Execution Box */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-mono text-slate-300">operator_ornekleri.js</span>
                </div>
                <span className="text-[11px] text-slate-400">Enes Öztürk Çalışma Alanı</span>
              </div>

              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-3 overflow-x-auto flex-1">
                <div>
                  <span className="text-slate-400">// 1. Aritmetik ve Ön Arttırma</span>
                  <div className="text-sky-300">let sayi = 10;</div>
                  <div className="text-slate-300">let sonuc = sayi++ * 2; <span className="text-slate-400">// sonuc: 20, sayi: 11</span></div>
                </div>

                <div className="pt-1">
                  <span className="text-slate-400">// 2. İlişkisel ve Mantıksal Karar</span>
                  <div className="text-emerald-400">if (sayi &gt;= 10 &amp;&amp; sonuc === 20) &#123;</div>
                  <div className="pl-4 text-amber-300">sayi += 5; <span className="text-slate-400">// sayi = 11 + 5 = 16</span></div>
                  <div className="text-emerald-400">&#125;</div>
                </div>

                <div className="pt-1">
                  <span className="text-slate-400">// 3. Kalan ve Eşitsizlik Testi</span>
                  <div className="text-indigo-300">let ciftMi = (sayi % 2 === 0); <span className="text-slate-400">// 16 % 2 === 0 -&gt; true</span></div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Hafıza Durumu:</span>
                  <span className="tabular-nums font-semibold text-emerald-400">sayi: 16 · sonuc: 20 · ciftMi: true</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Categorized Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OPERATOR_CATEGORIES.map((cat, idx) => {
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group text-left p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-300">
                      0{idx + 1}. Kategori
                    </span>
                    <Cpu className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                    {cat.label}
                  </h3>
                  <div className="font-mono text-xs text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/60 mt-2">
                    {cat.symbols}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-white">
                  <span>Simülatörü Aç</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
