import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, User, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CertificateModal } from './CertificateModal';

export const QuizArena: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (index: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const correctCount = calculateCorrectCount();
    if (correctCount >= 6) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti error
      }
    }
  };

  const calculateCorrectCount = () => {
    return QUIZ_QUESTIONS.reduce((acc, q) => {
      return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  const correctCount = calculateCorrectCount();
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  return (
    <section id="quiz" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
            <span>Ölçme ve Değerlendirme</span>
            <span aria-hidden="true">·</span>
            <span>10 Soruluk Öz Değerlendirme Testi</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-semibold">Öz değerlendirme testi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Operatörler &amp; Karar Yapıları Sınavı
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Öğrendiğiniz atama, mantıksal, ilişkisel ve aritmetik operatörleri test edin. %60 ve üzeri başarıda yazdırılabilir kurs tamamlama belgesi oluşturun.
          </p>
        </div>

        {/* Student Name Input Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-200 block">Belgede Görünecek İsim</span>
              <span className="text-[11px] text-slate-400">Bu ad yalnızca yazdırılabilir öz değerlendirme belgesinde kullanılır.</span>
            </div>
          </div>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Adınızı ve Soyadınızı yazın..."
            className="w-full sm:w-72 bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
          />
        </div>

        {!isFinished ? (
          /* Question Active Card */
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Progress Top Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Soru {currentQuestionIndex + 1}</span>
                <span className="text-slate-500">/ {totalQuestions}</span>
                <span aria-hidden="true">·</span>
                <span className="text-indigo-400">{currentQ.categoryName}</span>
              </div>
              <span className="tabular-nums font-mono text-slate-300">
                Puan: {correctCount * 10} / {totalQuestions * 10}
              </span>
            </div>

            {/* Progress Bar Line */}
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                className="h-full bg-indigo-500 transition-all duration-300"
              />
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentQ.question}
              </h3>

              {currentQ.codeSnippet && (
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const showFeedback = isAnswered;

                let optionStyle = 'bg-slate-950 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300';
                if (showFeedback) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  } else {
                    optionStyle = 'bg-slate-950 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm">{option}</span>
                    </div>

                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Callout */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/60 text-xs text-indigo-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                  <HelpCircle className="w-4 h-4" />
                  <span>Ayrıntılı Çözüm &amp; Açıklama:</span>
                </div>
                <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                {isAnswered ? 'Cevabınız kaydedildi.' : 'Bir şık seçin.'}
              </span>

              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow transition-colors"
                >
                  <span>{currentQuestionIndex === totalQuestions - 1 ? 'Sınavı Tamamla' : 'Sonraki Soru'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Card */
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest block mb-1">
                Sınav Değerlendirmesi
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {percentage >= 60 ? 'Tebrikler! Testi Tamamladınız' : 'Test Tamamlandı'}
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                {percentage >= 60
                  ? 'Programlama operatörleri ve karar yapıları öz değerlendirme testini başarıyla tamamladınız.'
                  : 'Bazı konularda pratik yapmaya devam edebilirsiniz. Laboratuvarı tekrar inceleyip testi yeniden deneyin.'}
              </p>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-4 border-y border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 block">Doğru Sayısı</span>
                <span className="font-mono text-2xl font-bold text-emerald-400">{correctCount}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Yanlış Sayısı</span>
                <span className="font-mono text-2xl font-bold text-rose-400">
                  {totalQuestions - correctCount}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Başarı Yüzdesi</span>
                <span className="font-mono text-2xl font-bold text-indigo-400">%{percentage}</span>
              </div>
            </div>

            {/* Certificate Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Kurs Tamamlama Belgesini Görüntüle</span>
              </button>

              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Başla</span>
              </button>
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          studentName={studentName}
          score={correctCount}
          totalQuestions={totalQuestions}
          percentage={percentage}
        />
      </div>
    </section>
  );
};
