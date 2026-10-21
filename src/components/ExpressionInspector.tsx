import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { evaluateExpression } from '../utils/evaluateExpression';

interface PresetExpr {
  label: string;
  expression: string;
  description: string;
}

const PRESETS: PresetExpr[] = [
  {
    label: 'Aritmetik Öncelik Karması',
    expression: '20 - 4 * 3 + 18 / 2',
    description: 'Çarpma ve bölme toplama/çıkarmadan önce yapılır: 4*3=12, 18/2=9 -> 20 - 12 + 9 = 17',
  },
  {
    label: 'Mantıksal & İlişkisel Birleşimi',
    expression: '(15 >= 10 && 7 % 2 === 1) || !(4 < 2)',
    description: 'Parantezler ve mod: 15>=10 (true), 7%2===1 (true) -> (true && true) || !false -> true || true -> true',
  },
  {
    label: 'Bileşik Karar Koşulu',
    expression: '100 > 50 && (25 / 5 === 5 || false)',
    description: '100>50 (true) && (5===5 (true) || false) -> true && true -> true',
  },
  {
    label: 'Mod ve Tek/Çift Kontrolü',
    expression: '42 % 2 === 0 && 43 % 2 !== 0',
    description: '42 çift (kalan 0) ve 43 tek (kalan 1) olduğu için her iki koşul da doğru.',
  },
];

export const ExpressionInspector: React.FC = () => {
  const [expression, setExpression] = useState<string>('(15 >= 10 && 7 % 2 === 1) || !(4 < 2)');
  const [result, setResult] = useState<unknown>(true);
  const [resultType, setResultType] = useState<string>('boolean');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const evaluateExpression = (exprToEval: string) => {
    try {
      setErrorMsg(null);
      const val = evaluateExpression(exprToEval.trim());
      setResult(val);
      setResultType(typeof val);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Geçersiz sözdizimi');
      setResult(null);
      setResultType('error');
    }
  };

  const handleRun = () => {
    evaluateExpression(expression);
  };

  const handleSelectPreset = (preset: PresetExpr) => {
    setExpression(preset.expression);
    evaluateExpression(preset.expression);
  };

  return (
    <section id="evaluator" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Canlı Kod Laboratuvarı</span>
            <span aria-hidden="true">·</span>
            <span>İfade Çözücü &amp; REPL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Canlı İfade Çözücü (Expression Evaluator)
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            Sayı, boolean, parantez ve desteklenen operatörleri içeren ifadeleri girerek anlık sonucu görün. İfadeler sınırlı bir çözücüyle değerlendirilir; JavaScript kodu çalıştırılmaz.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Örnek Test İfadeleri:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors cursor-pointer text-left"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input & Evaluation Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                İfadeyi Yazın veya Düzenleyin:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRun();
                  }}
                  placeholder="Örn: (10 + 5) * 2 > 25 && !(3 === 4)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono text-sm sm:text-base focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleRun}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30 whitespace-nowrap"
                >
                  <Play className="w-4 h-4" />
                  <span>Çözümle &amp; Çalıştır</span>
                </button>
              </div>
            </div>

            {/* Error or Success Result */}
            {errorMsg ? (
              <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/60 flex items-start gap-3 text-rose-300 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Sözdizimi Hatası:</strong>
                  <span>{errorMsg}</span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Hesaplanan Nihai Çıktı:</span>
                  <span className="font-mono text-indigo-400">Tip: {resultType}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm sm:text-base text-slate-300 truncate max-w-[70%]">
                    {expression}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono">=</span>
                    <span
                      className={`font-mono text-xl sm:text-2xl font-black tabular-nums px-3 py-1 rounded ${
                        typeof result === 'boolean'
                          ? result
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                          : 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/60'
                      }`}
                    >
                      {String(result)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Operator Insertion Bar */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Hızlı Operatör Ekle:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['+', '-', '*', '/', '%', '==', '!=', '===', '!==', '<', '>', '<=', '>=', '&&', '||', '!', '(', ')'].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => {
                      setExpression((prev) => `${prev} ${sym} `);
                    }}
                    className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded font-mono text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Reference Box */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>İşlem Önceliği Hiyerarşisi</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programlama dillerinde bir ifadede birden fazla operatör varsa şu sırayla çözümlenir:
            </p>

            <ol className="space-y-2 text-xs font-mono text-slate-300 list-decimal list-inside">
              <li><span className="text-indigo-300 font-bold">( )</span> Parantezler</li>
              <li><span className="text-indigo-300 font-bold">!, +, -</span> Mantıksal Değil / Tekli İşlemler</li>
              <li><span className="text-indigo-300 font-bold">*, /, %</span> Çarpma, Bölme, Mod</li>
              <li><span className="text-indigo-300 font-bold">+, -</span> Toplama, Çıkarma</li>
              <li><span className="text-indigo-300 font-bold">&lt;, &gt;, &lt;=, &gt;=</span> Karşılaştırma</li>
              <li><span className="text-indigo-300 font-bold">==, !=, ===, !==</span> Eşitlik / Farklılık</li>
              <li><span className="text-indigo-300 font-bold">&amp;&amp;</span> Mantıksal VE</li>
              <li><span className="text-indigo-300 font-bold">||</span> Mantıksal VEYA</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
