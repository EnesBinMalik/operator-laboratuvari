import React, { useState } from 'react';
import { Search, BookOpen, Copy, Check, Code, Layers } from 'lucide-react';
import { ALL_OPERATORS, PRECEDENCE_TABLE } from '../data/operatorsData';
import { OperatorCategory } from '../types';

export const OperatorCheatsheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | OperatorCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [snippetLang, setSnippetLang] = useState<'javascript' | 'csharp' | 'python'>('javascript');

  const filtered = ALL_OPERATORS.filter((op) => {
    const matchesFilter = selectedFilter === 'all' || op.category === selectedFilter;
    const matchesQuery =
      op.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="cheatsheet" className="py-12 bg-slate-950/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Ders Materyali</span>
            <span aria-hidden="true">·</span>
            <span>Eksiksiz Operatör Dokümantasyonu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Operatör Rehberi &amp; Kod Kütüphanesi
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            Tüm aritmetik, ilişkisel, mantıksal ve atama operatörlerinin sözdizimini, işlem önceliklerini
            ve JavaScript, C#, Python dil örneklerini inceleyin.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Operatör veya açıklama ara (örn: %, &&, +=)..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'arithmetic', label: 'Aritmetik' },
              { id: 'relational', label: 'İlişkisel' },
              { id: 'logical', label: 'Mantıksal' },
              { id: 'assignment', label: 'Atama' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}

            <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block" />

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              {(['javascript', 'csharp', 'python'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSnippetLang(lang)}
                  className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer capitalize ${
                    snippetLang === lang ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'csharp' ? 'C#' : lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Operator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filtered.map((op, idx) => {
            const snippet = op.codeSnippets[snippetLang];
            const copyKey = `${op.symbol}-${idx}`;

            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xl font-black text-indigo-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                        {op.symbol}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">{op.name}</h3>
                        <span className="text-[11px] text-slate-400">{op.categoryName}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Öncelik: #{op.precedence}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{op.description}</p>

                  <div className="space-y-2 mb-4 font-mono text-xs">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block font-sans">Sözdizimi (Syntax):</span>
                      <span className="text-slate-200">{op.syntax}</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block font-sans">Örnek &amp; Sonuç:</span>
                      <span className="text-amber-300">{op.example}</span>
                      <div className="text-emerald-400 text-[11px] mt-1">=&gt; {op.output}</div>
                    </div>
                  </div>

                  {op.tips && (
                    <div className="text-[11px] text-slate-400 bg-indigo-950/20 border border-indigo-900/40 p-2.5 rounded mb-3">
                      <strong className="text-indigo-300 font-semibold block mb-0.5">İpucu:</strong>
                      {op.tips}
                    </div>
                  )}
                </div>

                {/* Code Snippet Box with Copy */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span className="font-semibold uppercase tracking-wider">{snippetLang} Örneği:</span>
                    <button
                      onClick={() => copyCode(snippet, copyKey)}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedId === copyKey ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                    <code>{snippet}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* Precedence Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Operatör İşlem Önceliği (Precedence) Tablosu</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Yukarıdan aşağıya doğru öncelik derecesi azalmaktadır (1 = En yüksek öncelik)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3 w-16">Seviye</th>
                  <th className="p-3 w-48">Operatör Grubu</th>
                  <th className="p-3 w-36 font-mono">Semboller</th>
                  <th className="p-3 w-36">Yön (Associativity)</th>
                  <th className="p-3">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans text-slate-300">
                {PRECEDENCE_TABLE.map((row) => (
                  <tr key={row.level} className="hover:bg-slate-950/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-indigo-400 tabular-nums">#{row.level}</td>
                    <td className="p-3 font-semibold text-white">{row.name}</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">{row.symbols}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{row.associativity}</td>
                    <td className="p-3 text-slate-400">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
