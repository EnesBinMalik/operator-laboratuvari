import React, { useState } from 'react';
import { GitBranch, CheckCircle2, ArrowRight, Code, Sparkles, Terminal } from 'lucide-react';
import { DECISION_SCENARIOS } from '../data/decisionScenarios';

export const DecisionStructures: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('ecommerce');
  const scenario = DECISION_SCENARIOS.find((s) => s.id === selectedScenarioId) || DECISION_SCENARIOS[0];

  // Variables state mapping
  const [variableValues, setVariableValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    scenario.variables.forEach((v) => {
      initial[v.id] = v.defaultValue;
    });
    return initial;
  });

  // Target programming language view
  const [language, setLanguage] = useState<'javascript' | 'csharp' | 'python'>('javascript');

  // When scenario changes, reset variables
  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    const target = DECISION_SCENARIOS.find((s) => s.id === id);
    if (target) {
      const initial: Record<string, any> = {};
      target.variables.forEach((v) => {
        initial[v.id] = v.defaultValue;
      });
      setVariableValues(initial);
    }
  };

  const handleUpdateVariable = (id: string, value: any) => {
    setVariableValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const evalResult = scenario.evaluate(variableValues);

  return (
    <section id="decisions" className="py-12 bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Algoritma &amp; Akış Kontrolü</span>
            <span aria-hidden="true">·</span>
            <span>Koşullara Bağlı Kod Blokları</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-400 font-semibold">Enes Öztürk Özel Bölümü</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Karar Yapıları &amp; Koşullu Kod Blokları
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            Bazen koşullara bağlı olarak çalıştırılacak kod bloğunun değişmesi gerekir.
            İlişkisel ve mantıksal operatörler karar yapılarıyla (<code className="text-indigo-300 font-mono">if / else</code>)
            birlikte kullanılarak programın akıllı kararlar vermesi sağlanır.
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {DECISION_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Gerçek Hayat Senaryosu</span>
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
                  </div>
                  <h3 className="text-sm font-bold text-white">{sc.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{sc.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 2-Zone Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Scenario Controls */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Senaryo Değişkenleri</h3>
              <span className="text-xs text-slate-400">Canlı Girişleri Ayarlayın</span>
            </div>

            <div className="space-y-4">
              {scenario.variables.map((v) => {
                const val = variableValues[v.id];
                if (v.type === 'boolean') {
                  return (
                    <div
                      key={v.id}
                      className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">{v.label}</span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {v.id} = {val ? 'true' : 'false'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleUpdateVariable(v.id, !val)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                          val
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {val ? 'EVET (true)' : 'HAYIR (false)'}
                      </button>
                    </div>
                  );
                }

                // Number slider
                return (
                  <div key={v.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">{v.label}</span>
                      <span className="font-mono text-sm font-bold text-indigo-300">
                        {val} {v.unit || ''}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={v.min ?? 0}
                      max={v.max ?? 100}
                      step={v.step ?? 1}
                      value={val}
                      onChange={(e) => handleUpdateVariable(v.id, Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{v.min ?? 0}</span>
                      <span>Orta: {Math.round(((v.min ?? 0) + (v.max ?? 100)) / 2)}</span>
                      <span>{v.max ?? 100}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Execution Trace Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Koşul Değerlendirme Analizi</span>
                </span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {evalResult.logDetails.map((log, idx) => (
                  <div key={idx} className="text-slate-300 flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Flowchart & Active Branch Visualizer */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Karar Dallanması &amp; Çalışan Kod Bloğu</h3>
                <p className="text-xs text-slate-400">Yeşil ile işaretlenen blok şu an yürütülmektedir</p>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {(['javascript', 'csharp', 'python'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer capitalize ${
                      language === lang
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'csharp' ? 'C#' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Banner */}
            <div className="p-4 rounded-lg bg-indigo-950/40 border border-indigo-800/60 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-indigo-300 block">Karar Yapısı Çıktısı</span>
                <span className="text-sm font-bold text-white">{evalResult.summaryText}</span>
              </div>
            </div>

            {/* Visual Branches */}
            <div className="space-y-3">
              {evalResult.branches.map((branch, idx) => {
                const isActive = evalResult.activeBranchIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                      isActive
                        ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 flex items-center justify-between border-b ${
                        isActive
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono text-xs font-semibold">
                        <span>{branch.conditionText}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {isActive ? (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>ÇALIŞTIRILAN BLOK</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Atlandı</span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-xs text-slate-300 font-medium">
                        <span className="text-slate-400 mr-2">Eylem:</span>
                        <span className={isActive ? 'text-white font-semibold' : 'text-slate-400'}>
                          {branch.actionText}
                        </span>
                      </div>

                      <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                        <code>{branch.codeBlock}</code>
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
