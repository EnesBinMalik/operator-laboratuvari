import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, XCircle, Info, Calculator, Binary, ToggleLeft, ToggleRight, ArrowDownRight } from 'lucide-react';
import { ALL_OPERATORS, OPERATOR_CATEGORIES } from '../data/operatorsData';
import { OperatorCategory } from '../types';

interface OperatorSandboxProps {
  initialCategory?: OperatorCategory;
}

export const OperatorSandbox: React.FC<OperatorSandboxProps> = ({ initialCategory = 'arithmetic' }) => {
  const [selectedCategory, setSelectedCategory] = useState<OperatorCategory>(initialCategory);

  // Arithmetic state
  const [arithA, setArithA] = useState<number>(17);
  const [arithB, setArithB] = useState<number>(5);
  const [arithOp, setArithOp] = useState<string>('%');
  const [incrementMode, setIncrementMode] = useState<'post' | 'pre'>('post');
  const [incrementVar, setIncrementVar] = useState<number>(10);
  const [incrementHistory, setIncrementHistory] = useState<string[]>([]);

  // Relational state
  const [relA, setRelA] = useState<number>(24);
  const [relB, setRelB] = useState<number>(18);
  const [relOp, setRelOp] = useState<string>('>=');

  // Logical state
  const [logA, setLogA] = useState<boolean>(true);
  const [logB, setLogB] = useState<boolean>(false);
  const [logOp, setLogOp] = useState<string>('&&');

  // Assignment state
  const [assignInitial, setAssignInitial] = useState<number>(20);
  const [currentAssignVal, setCurrentAssignVal] = useState<number>(20);
  const [assignAmount, setAssignAmount] = useState<number>(5);
  const [assignLogs, setAssignLogs] = useState<{ op: string; prev: number; amount: number; next: number; code: string }[]>([
    { op: '=', prev: 0, amount: 20, next: 20, code: 'let x = 20;' },
  ]);

  // Compute arithmetic result
  const computeArithmetic = () => {
    switch (arithOp) {
      case '+':
        return { val: arithA + arithB, desc: `${arithA} + ${arithB} = ${arithA + arithB}` };
      case '-':
        return { val: arithA - arithB, desc: `${arithA} - ${arithB} = ${arithA - arithB}` };
      case '*':
        return { val: arithA * arithB, desc: `${arithA} * ${arithB} = ${arithA * arithB}` };
      case '/':
        return {
          val: arithB === 0 ? 'Hata (Sıfıra Bölünemez)' : Number((arithA / arithB).toFixed(3)),
          desc: arithB === 0 ? 'Matematiksel olarak sıfıra bölme tanımsızdır.' : `${arithA} / ${arithB} = ${(arithA / arithB).toFixed(3)}`,
        };
      case '%':
        return {
          val: arithB === 0 ? 'Hata' : arithA % arithB,
          desc: arithB === 0 ? 'Sıfıra göre mod alınamaz.' : `${arithA}'nın ${arithB}'ye bölümünden kalan: ${arithA % arithB} (${arithA} = ${Math.floor(arithA / arithB)} × ${arithB} + ${arithA % arithB})`,
        };
      default:
        return { val: 0, desc: '' };
    }
  };

  // Compute relational result
  const computeRelational = () => {
    let result = false;
    let verbal = '';
    switch (relOp) {
      case '==':
        result = relA === relB;
        verbal = result ? `${relA} ile ${relB} birbirine eşittir.` : `${relA} ile ${relB} birbirine eşit değildir.`;
        break;
      case '!=':
        result = relA !== relB;
        verbal = result ? `${relA} ile ${relB} birbirinden farklıdır (eşit değildir).` : `${relA} ile ${relB} aynı değerdedir.`;
        break;
      case '<':
        result = relA < relB;
        verbal = result ? `${relA} sayısı ${relB} sayısından küçüktür.` : `${relA} sayısı ${relB} sayısından küçük değildir.`;
        break;
      case '>':
        result = relA > relB;
        verbal = result ? `${relA} sayısı ${relB} sayısından büyüktür.` : `${relA} sayısı ${relB} sayısından büyük değildir.`;
        break;
      case '>=':
        result = relA >= relB;
        verbal = result ? `${relA} sayısı ${relB} sayısından büyük veya ona eşittir.` : `${relA} sayısı ${relB} sayısından küçüktür.`;
        break;
      case '<=':
        result = relA <= relB;
        verbal = result ? `${relA} sayısı ${relB} sayısından küçük veya ona eşittir.` : `${relA} sayısı ${relB} sayısından büyüktür.`;
        break;
    }
    return { result, verbal };
  };

  // Compute logical result
  const computeLogical = () => {
    let result = false;
    let explanation = '';
    switch (logOp) {
      case '&&':
        result = logA && logB;
        explanation = result
          ? 'Her iki koşul da doğru (true) olduğu için sonuç DOĞRU (true).'
          : 'Koşullardan en az biri yanlış (false) olduğu için VE (&&) işlemi YANLIŞ (false) üretti.';
        break;
      case '||':
        result = logA || logB;
        explanation = result
          ? 'Koşullardan en az biri doğru (true) olduğu için VEYA (||) işlemi DOĞRU (true) üretti.'
          : 'Her iki koşul da yanlış (false) olduğu için sonuç YANLIŞ (false).';
        break;
      case '!A':
        result = !logA;
        explanation = `A değeri ${logA} olduğu için !A tersi olan ${result} değerini alır.`;
        break;
      case '!B':
        result = !logB;
        explanation = `B değeri ${logB} olduğu için !B tersi olan ${result} değerini alır.`;
        break;
    }
    return { result, explanation };
  };

  // Run assignment operation
  const applyAssignment = (op: '=' | '+=' | '-=' | '*=' | '/=') => {
    let next = currentAssignVal;
    let codeStr = '';
    if (op === '=') {
      next = assignAmount;
      codeStr = `x = ${assignAmount};`;
    } else if (op === '+=') {
      next = currentAssignVal + assignAmount;
      codeStr = `x += ${assignAmount}; // x = ${currentAssignVal} + ${assignAmount}`;
    } else if (op === '-=') {
      next = currentAssignVal - assignAmount;
      codeStr = `x -= ${assignAmount}; // x = ${currentAssignVal} - ${assignAmount}`;
    } else if (op === '*=') {
      next = currentAssignVal * assignAmount;
      codeStr = `x *= ${assignAmount}; // x = ${currentAssignVal} * ${assignAmount}`;
    } else if (op === '/=') {
      if (assignAmount === 0) return;
      next = Number((currentAssignVal / assignAmount).toFixed(2));
      codeStr = `x /= ${assignAmount}; // x = ${currentAssignVal} / ${assignAmount}`;
    }

    setAssignLogs((prev) => [
      ...prev,
      {
        op,
        prev: currentAssignVal,
        amount: assignAmount,
        next,
        code: codeStr,
      },
    ]);
    setCurrentAssignVal(next);
  };

  const resetAssignment = () => {
    setCurrentAssignVal(assignInitial);
    setAssignLogs([{ op: '=', prev: 0, amount: assignInitial, next: assignInitial, code: `let x = ${assignInitial};` }]);
  };

  const arithResult = computeArithmetic();
  const relResult = computeRelational();
  const logResult = computeLogical();

  return (
    <section id="sandbox" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>İnteraktif Deney Alanı</span>
            <span aria-hidden="true">·</span>
            <span>Canlı Değişken Hesaplayıcı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Operatör Laboratuvarı &amp; Çalışma Alanı
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            Aşağıdaki sekmelerden dilediğiniz operatör kategorisini seçerek değişken değerlerini değiştirin,
            hafıza durumunu ve kodun nasıl değerlendirildiğini anlık olarak gözlemleyin.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl mb-8">
          {OPERATOR_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as OperatorCategory)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat.label} ({cat.symbols})
              </button>
            );
          })}
        </div>

        {/* 1. ARİTMETİK OPERATÖRLER SANDBOX */}
        {selectedCategory === 'arithmetic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Aritmetik Hesaplayıcı</h3>
                  <p className="text-xs text-slate-400">+, -, *, /, % Operatörlerini test edin</p>
                </div>
                <Calculator className="w-5 h-5 text-indigo-400" />
              </div>

              {/* Variable Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Değişken A Değeri
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={arithA}
                      onChange={(e) => setArithA(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-base focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setArithA((p) => p + 1)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded cursor-pointer"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => setArithA((p) => p - 1)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded cursor-pointer"
                      >
                        -1
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Değişken B Değeri
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={arithB}
                      onChange={(e) => setArithB(Number(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono text-base focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setArithB((p) => p + 1)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded cursor-pointer"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => setArithB((p) => p - 1)}
                        className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded cursor-pointer"
                      >
                        -1
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operator Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Çalıştırılacak Aritmetik Operatör
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { op: '+', label: 'Toplama' },
                    { op: '-', label: 'Çıkarma' },
                    { op: '*', label: 'Çarpma' },
                    { op: '/', label: 'Bölme' },
                    { op: '%', label: 'Mod (Kalan)' },
                  ].map((item) => (
                    <button
                      key={item.op}
                      onClick={() => setArithOp(item.op)}
                      className={`py-3 px-2 rounded-lg font-mono text-base font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        arithOp === item.op
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-lg">{item.op}</span>
                      <span className="text-[10px] font-sans font-normal text-slate-400">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Preview Box */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Hesaplama İfadesi:</span>
                  <span className="font-mono text-indigo-300">let sonuc = a {arithOp} b;</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-mono text-sm text-slate-300">
                    <span className="text-indigo-400 font-bold">{arithA}</span>
                    <span className="text-amber-400 mx-2 font-bold">{arithOp}</span>
                    <span className="text-sky-400 font-bold">{arithB}</span>
                    <span className="text-slate-400 mx-2">=</span>
                  </div>
                  <div className="font-mono text-2xl font-extrabold text-emerald-400 tabular-nums">
                    {arithResult.val}
                  </div>
                </div>
                <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <Info className="w-3.5 h-3.5 inline mr-1 text-indigo-400" />
                  {arithResult.desc}
                </p>
              </div>

              {/* Special Focus: ++ and -- Increment Demonstration */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-200">
                    Özel İnceleme: Ön Arttırma (++x) vs Son Arttırma (x++)
                  </h4>
                  <span className="text-[11px] text-indigo-400 font-mono">Çok Karıştırılan Konu</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIncrementMode('post')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                          incrementMode === 'post'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Son Arttırma (x++)
                      </button>
                      <button
                        onClick={() => setIncrementMode('pre')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                          incrementMode === 'pre'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Ön Arttırma (++x)
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">x değeri:</span>
                      <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {incrementVar}
                      </span>
                      <button
                        onClick={() => {
                          setIncrementVar(10);
                          setIncrementHistory([]);
                        }}
                        className="text-xs text-slate-400 hover:text-white underline ml-2 cursor-pointer"
                      >
                        Sıfırla
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const current = incrementVar;
                        if (incrementMode === 'post') {
                          const assigned = current;
                          const nextVal = current + 1;
                          setIncrementVar(nextVal);
                          setIncrementHistory((prev) => [
                            `let y = x++; -> y = ${assigned} aldı, ardından x = ${nextVal} oldu`,
                            ...prev.slice(0, 3),
                          ]);
                        } else {
                          const nextVal = current + 1;
                          const assigned = nextVal;
                          setIncrementVar(nextVal);
                          setIncrementHistory((prev) => [
                            `let y = ++x; -> x önce ${nextVal} oldu, y = ${assigned} aldı`,
                            ...prev.slice(0, 3),
                          ]);
                        }
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{incrementMode === 'post' ? 'let y = x++ Çalıştır' : 'let y = ++x Çalıştır'}</span>
                    </button>
                  </div>

                  {incrementHistory.length > 0 && (
                    <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-slate-300 space-y-1">
                      {incrementHistory.map((line, i) => (
                        <div key={i} className="flex items-center gap-2 text-indigo-300">
                          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Information & Precedence */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Aritmetik İşlem Kuralları</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <strong className="text-indigo-400 block mb-1">1. İşlem Önceliği Sırası</strong>
                  <p className="text-slate-400">
                    Parantez içi <span className="font-mono text-slate-300">( )</span> → Arttırma/Azaltma{' '}
                    <span className="font-mono text-slate-300">++, --</span> → Çarpma/Bölme/Mod{' '}
                    <span className="font-mono text-slate-300">*, /, %</span> → Toplama/Çıkarma{' '}
                    <span className="font-mono text-slate-300">+, -</span>
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <strong className="text-sky-400 block mb-1">2. Mod (%) Operatörünün Gücü</strong>
                  <p className="text-slate-400">
                    Mod operatörü bölme sonrası kalan tam sayıyı verir. Döngülerde her N adımda bir işlem yapmak veya sayının tek/çift olduğunu anlamak için vazgeçilmezdir.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <strong className="text-amber-400 block mb-1">3. Metin Birleştirme (+)</strong>
                  <p className="text-slate-400">
                    Toplama operatörü (+) hem sayıları toplar hem de metinleri uç uca ekler (concatenation). Eğer bir sayı ile metin toplanırsa sonuç metin (string) olur.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-indigo-950/30 border border-indigo-900/50 rounded-lg text-xs text-indigo-200">
                <strong className="block font-semibold mb-1 text-indigo-300">İpucu (Enes Öztürk Notu):</strong>
                Her zaman karmaşık aritmetik ifadelerde parantez <code className="bg-slate-900 px-1 py-0.5 rounded text-white font-mono">( )</code> kullanarak niyetinizi açıkça belirtin. Bu, hem hataları önler hem de kodun okunabilirliğini artırır.
              </div>
            </div>
          </div>
        )}

        {/* 2. İLİŞKİSEL OPERATÖRLER SANDBOX */}
        {selectedCategory === 'relational' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">İlişkisel (Karşılaştırma) Karşılaştırıcı</h3>
                  <p className="text-xs text-slate-400">==, !=, &lt;, &gt;, &gt;=, &lt;= Operatörlerini test edin</p>
                </div>
                <Binary className="w-5 h-5 text-sky-400" />
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Sol Değer (sayi1)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={relA}
                    onChange={(e) => setRelA(Number(e.target.value))}
                    className="w-full accent-indigo-500 mb-2 cursor-pointer"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Değer:</span>
                    <input
                      type="number"
                      value={relA}
                      onChange={(e) => setRelA(Number(e.target.value) || 0)}
                      className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Sağ Değer (sayi2)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={relB}
                    onChange={(e) => setRelB(Number(e.target.value))}
                    className="w-full accent-sky-500 mb-2 cursor-pointer"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Değer:</span>
                    <input
                      type="number"
                      value={relB}
                      onChange={(e) => setRelB(Number(e.target.value) || 0)}
                      className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-white font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Relational Operators Grid */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Karşılaştırma Operatörü Seçin
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { op: '==', label: 'Eşit mi' },
                    { op: '!=', label: 'Farklı mı' },
                    { op: '<', label: 'Küçük mü' },
                    { op: '>', label: 'Büyük mü' },
                    { op: '>=', label: 'Büyük/Eşit' },
                    { op: '<=', label: 'Küçük/Eşit' },
                  ].map((item) => (
                    <button
                      key={item.op}
                      onClick={() => setRelOp(item.op)}
                      className={`p-3 rounded-lg font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        relOp === item.op
                          ? 'bg-sky-600 text-white ring-2 ring-sky-400'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{item.op}</span>
                      <span className="text-[10px] font-sans font-normal text-slate-400">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Outcome Box */}
              <div
                className={`border p-5 rounded-lg transition-colors ${
                  relResult.result
                    ? 'bg-emerald-950/20 border-emerald-800/80'
                    : 'bg-rose-950/20 border-rose-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400 font-mono">
                    if ({relA} {relOp} {relB})
                  </span>
                  <div
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded ${
                      relResult.result
                        ? 'bg-emerald-900/60 text-emerald-300'
                        : 'bg-rose-900/60 text-rose-300'
                    }`}
                  >
                    {relResult.result ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>DOĞRU (true)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>YANLIŞ (false)</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-sm font-semibold text-white mb-2">
                  {relResult.verbal}
                </div>

                {/* Visual Comparative Bar */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Görsel Karşılaştırma Ölçeği (0-100)</span>
                    <span className="tabular-nums">Fark: {Math.abs(relA - relB)}</span>
                  </div>
                  <div className="h-4 bg-slate-950 rounded-full relative overflow-hidden border border-slate-800">
                    <div
                      style={{ left: `${Math.min(relA, 100)}%` }}
                      className="absolute top-0 bottom-0 w-2 bg-indigo-500 rounded -translate-x-1/2"
                      title={`Sol Değer (A): ${relA}`}
                    />
                    <div
                      style={{ left: `${Math.min(relB, 100)}%` }}
                      className="absolute top-0 bottom-0 w-2 bg-sky-400 rounded -translate-x-1/2"
                      title={`Sağ Değer (B): ${relB}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-indigo-400 font-mono">Sol (A): {relA}</span>
                    <span className="text-sky-400 font-mono">Sağ (B): {relB}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white">İlişkisel Operatörler Rehberi</h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-sky-400 font-bold mb-1">== vs === (Katı Eşitlik)</div>
                  <p className="text-slate-400">
                    JavaScript&apos;te <code className="text-slate-200">5 == &quot;5&quot;</code> true üretir çünkü otomatik tür dönüşümü yapar.
                    Ancak tip güvenliği için <code className="text-slate-200">5 === &quot;5&quot;</code> kontrolü kullanılır (false döner).
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-sky-400 font-bold mb-1">!= vs !== (Katı Eşitsizlik)</div>
                  <p className="text-slate-400">
                    İki değerin eşit olmaması durumunu sorgular. Değerler farklıysa true, birbirine eşitse false sonucu üretir.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-sky-400 font-bold mb-1">&gt;= ve &lt;= Sınır Kontrolleri</div>
                  <p className="text-slate-400">
                    &quot;18 yaş ve üzeri&quot; gibi sınırlayıcı koşullarda eşitlik sembolü her zaman sağda yer alır (<code className="text-slate-200">&gt;=</code>).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MANTIKSAL OPERATÖRLER SANDBOX */}
        {selectedCategory === 'logical' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Mantıksal Kapılar &amp; Doğruluk Tablosu</h3>
                  <p className="text-xs text-slate-400">&amp;&amp; (VE), || (VEYA), ! (DEĞİL) Operatörleri</p>
                </div>
                <ToggleRight className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Boolean Switches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block">Koşul A (Durum 1)</span>
                    <span className="text-[11px] text-slate-400">Örn: Kullanıcı Giriş Yaptı</span>
                  </div>
                  <button
                    onClick={() => setLogA(!logA)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all ${
                      logA
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {logA ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    <span>{logA ? 'TRUE (Doğru)' : 'FALSE (Yanlış)'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block">Koşul B (Durum 2)</span>
                    <span className="text-[11px] text-slate-400">Örn: E-Posta Onaylı</span>
                  </div>
                  <button
                    onClick={() => setLogB(!logB)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all ${
                      logB
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {logB ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    <span>{logB ? 'TRUE (Doğru)' : 'FALSE (Yanlış)'}</span>
                  </button>
                </div>
              </div>

              {/* Operator Tabs */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Mantıksal Operatör
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { op: '&&', label: 'VE (AND)', sub: 'A && B' },
                    { op: '||', label: 'VEYA (OR)', sub: 'A || B' },
                    { op: '!A', label: 'A DEĞİL', sub: '!A' },
                    { op: '!B', label: 'B DEĞİL', sub: '!B' },
                  ].map((item) => (
                    <button
                      key={item.op}
                      onClick={() => setLogOp(item.op)}
                      className={`p-3 rounded-lg font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        logOp === item.op
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{item.op}</span>
                      <span className="text-[10px] font-sans font-normal text-slate-400">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logical Outcome */}
              <div
                className={`border p-5 rounded-lg transition-colors ${
                  logResult.result
                    ? 'bg-emerald-950/20 border-emerald-800/80'
                    : 'bg-rose-950/20 border-rose-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-slate-300">
                    {logOp === '&&' && `(${logA ? 'true' : 'false'} && ${logB ? 'true' : 'false'})`}
                    {logOp === '||' && `(${logA ? 'true' : 'false'} || ${logB ? 'true' : 'false'})`}
                    {logOp === '!A' && `!(${logA ? 'true' : 'false'})`}
                    {logOp === '!B' && `!(${logB ? 'true' : 'false'})`}
                  </span>
                  <div
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded ${
                      logResult.result
                        ? 'bg-emerald-900/60 text-emerald-300'
                        : 'bg-rose-900/60 text-rose-300'
                    }`}
                  >
                    {logResult.result ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{logResult.result ? 'DOĞRU (true)' : 'YANLIŞ (false)'}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{logResult.explanation}</p>
              </div>

              {/* Interactive Truth Table */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  {logOp.includes('!') ? '! (DEĞİL) Doğruluk Tablosu' : `${logOp} Operatörü Doğruluk Tablosu`}
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-left border border-slate-800 rounded-lg overflow-hidden">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Girdi A</th>
                        <th className="p-2.5">Girdi B</th>
                        <th className="p-2.5">İfade</th>
                        <th className="p-2.5">Sonuç</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                      {[
                        { a: true, b: true },
                        { a: true, b: false },
                        { a: false, b: true },
                        { a: false, b: false },
                      ].map((row, idx) => {
                        let evalRes = false;
                        let expr = '';
                        if (logOp === '&&') {
                          evalRes = row.a && row.b;
                          expr = 'A && B';
                        } else if (logOp === '||') {
                          evalRes = row.a || row.b;
                          expr = 'A || B';
                        } else if (logOp === '!A') {
                          evalRes = !row.a;
                          expr = '!A';
                        } else {
                          evalRes = !row.b;
                          expr = '!B';
                        }

                        const isCurrentActive = row.a === logA && row.b === logB;

                        return (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              isCurrentActive ? 'bg-indigo-950/40 text-white font-bold' : 'text-slate-400'
                            }`}
                          >
                            <td className="p-2.5">{row.a ? 'true' : 'false'}</td>
                            <td className="p-2.5">{row.b ? 'true' : 'false'}</td>
                            <td className="p-2.5 text-slate-300">{expr}</td>
                            <td className="p-2.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] ${
                                  evalRes
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                                    : 'bg-rose-950 text-rose-300 border border-rose-800/50'
                                }`}
                              >
                                {evalRes ? 'true' : 'false'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white">Mantıksal Operatör Kuralları</h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-emerald-400 font-bold mb-1">&amp;&amp; (Mantıksal VE)</div>
                  <p className="text-slate-400">
                    Tüm koşulların kesinlikle doğru olmasını şart koşar. Tek bir yanlış varsa tüm blok iptal olur.
                    <br />
                    <span className="text-slate-300">Örnek:</span> <code className="text-slate-200">yas &gt;= 18 &amp;&amp; ehliyetVar</code>
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-emerald-400 font-bold mb-1">|| (Mantıksal VEYA)</div>
                  <p className="text-slate-400">
                    Koşullardan herhangi birinin sağlanması yeterlidir. Yalnızca her iki koşul da false ise sonuç false olur.
                    <br />
                    <span className="text-slate-300">Örnek:</span> <code className="text-slate-200">isAdmin || isEditor</code>
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-emerald-400 font-bold mb-1">Kısa Devre (Short-Circuit) Değerlendirmesi</div>
                  <p className="text-slate-400">
                    JavaScript ve C# gibi dillerde <code className="text-slate-200">false &amp;&amp; fonksiyon()</code> durumunda
                    sağdaki fonksiyon hiç çalıştırılmaz! Çünkü ilk değer false olduğunda sonucun kesin false olacağı bellidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ATAMA VE İŞLEMLİ ATAMA SANDBOX */}
        {selectedCategory === 'assignment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Değişken Hafıza &amp; İşlemli Atama Simülatörü</h3>
                  <p className="text-xs text-slate-400">=, +=, -=, *=, /= Operatörlerini hafıza üzerinde adım adım test edin</p>
                </div>
                <ArrowDownRight className="w-5 h-5 text-amber-400" />
              </div>

              {/* Memory Register Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Hafıza Hücresi (RAM / Memory)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-slate-400">let x =</span>
                    <span className="font-mono text-3xl font-extrabold text-amber-400 tabular-nums">
                      {currentAssignVal}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block mb-1">İşlem Değeri (Adım)</span>
                    <input
                      type="number"
                      value={assignAmount}
                      onChange={(e) => setAssignAmount(Number(e.target.value) || 0)}
                      className="w-24 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white font-mono text-sm text-right"
                    />
                  </div>
                  <button
                    onClick={resetAssignment}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                    title="Hafızayı Sıfırla"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Assignment Operator Action Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  İşlemli Atama Uygula:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    onClick={() => applyAssignment('=')}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left cursor-pointer transition-all hover:border-amber-500/50"
                  >
                    <span className="font-mono text-base font-bold text-amber-400 block">= (Ata)</span>
                    <span className="text-[11px] text-slate-400">x = {assignAmount}</span>
                  </button>

                  <button
                    onClick={() => applyAssignment('+=')}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left cursor-pointer transition-all hover:border-amber-500/50"
                  >
                    <span className="font-mono text-base font-bold text-emerald-400 block">+= (Topla)</span>
                    <span className="text-[11px] text-slate-400">x = x + {assignAmount}</span>
                  </button>

                  <button
                    onClick={() => applyAssignment('-=')}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left cursor-pointer transition-all hover:border-amber-500/50"
                  >
                    <span className="font-mono text-base font-bold text-rose-400 block">-= (Çıkar)</span>
                    <span className="text-[11px] text-slate-400">x = x - {assignAmount}</span>
                  </button>

                  <button
                    onClick={() => applyAssignment('*=')}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left cursor-pointer transition-all hover:border-amber-500/50"
                  >
                    <span className="font-mono text-base font-bold text-sky-400 block">*= (Çarp)</span>
                    <span className="text-[11px] text-slate-400">x = x * {assignAmount}</span>
                  </button>

                  <button
                    onClick={() => applyAssignment('/=')}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left cursor-pointer transition-all hover:border-amber-500/50"
                  >
                    <span className="font-mono text-base font-bold text-indigo-400 block">/= (Böl)</span>
                    <span className="text-[11px] text-slate-400">x = x / {assignAmount}</span>
                  </button>
                </div>
              </div>

              {/* Execution History */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">İşlem ve Hafıza Geçmişi:</span>
                  <span className="text-[11px] text-slate-400">{assignLogs.length} Adım Kaydedildi</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2 font-mono text-xs">
                  {assignLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/40 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[10px]">#{idx + 1}</span>
                        <span className="text-amber-300">{log.code}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Yeni Değer: </span>
                        <span className="text-emerald-400 font-bold">{log.next}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
              <h3 className="text-base font-bold text-white">İşlemli Atama Mantığı</h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-amber-400 font-bold mb-1">x += y Neden Kullanılır?</div>
                  <p className="text-slate-400">
                    <code className="text-slate-200">x = x + y</code> yazmak yerine <code className="text-slate-200">x += y</code> yazmak hem kod kalabalığını önler hem de derleyiciler tarafından optimize edilebilir.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-amber-400 font-bold mb-1">İşlem Önceliği Uyarısı</div>
                  <p className="text-slate-400">
                    <code className="text-slate-200">x *= 2 + 3</code> ifadesinde önce sağ taraf hesaplanır: <code className="text-slate-200">2 + 3 = 5</code>, ardından çarpma ataması yapılır: <code className="text-slate-200">x = x * 5</code>.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="font-mono text-amber-400 font-bold mb-1">Oyun ve Finans Uygulamalarında</div>
                  <p className="text-slate-400">
                    Can eksilme (<code className="text-slate-200">can -= hasar</code>), bakiye yükleme (<code className="text-slate-200">bakiye += tutar</code>) gibi tüm sayaç mantıklarında bu operatörler kullanılır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
