import React, { useRef } from 'react';
import { X, Award, Printer, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  score,
  totalQuestions,
  percentage,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [certNumber] = React.useState(
    () => `EO-OPR-${Math.floor(100000 + Math.random() * 900000)}`
  );

  if (!isOpen) return null;

  const issueDate = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Tebrikler! Sınavı Başarıyla Tamamladınız</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div
          ref={certRef}
          className="bg-slate-950 border-4 border-double border-indigo-500/40 rounded-xl p-8 sm:p-12 relative overflow-hidden text-center"
        >
          {/* Subtle Decorative Background Lines */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase block mb-1">
            KURS TAMAMLAMA BELGESİ · RESMİ AKREDİTASYON DEĞİLDİR
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Programlama Operatörleri ve Karar Yapıları
          </h3>

          <p className="text-xs text-slate-400 max-w-lg mx-auto mb-6">
            Aritmetik, İlişkisel, Mantıksal, Atama ve İşlemli Atama Operatörleri ile Algoritmik Karar Yapıları Eğitim Modülü
          </p>

          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Bu Belge Sayın</div>
          <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-sky-200 mb-4 pb-2 border-b border-slate-800 max-w-md mx-auto">
            {studentName || 'Katılımcı Öğrenci'}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
            Bu belge, yukarıda adı geçen katılımcının Operatör Laboratuvarı'ndaki öz değerlendirme testini{' '}
            <strong className="text-emerald-400">%{percentage} Başarı Puanı</strong> ({score}/{totalQuestions} doğru) ile
            tamamladığını gösterir. Resmi yeterlilik, akreditasyon veya doğrulanabilir sertifika değildir.
          </p>

          {/* Certificate Footer Signature Block */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-slate-800/80 text-left">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Veriliş Tarihi</span>
              <span className="text-xs font-mono font-medium text-slate-300">{issueDate}</span>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Yerel belge no: {certNumber}</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[9px] uppercase tracking-widest text-indigo-300 font-semibold">
                Öz değerlendirme
              </span>
            </div>

            {/* Prominent Author Signature */}
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">İçerik hazırlayan</span>
              <div className="font-serif italic text-lg sm:text-xl font-bold text-indigo-300 tracking-wide font-['Caveat',cursive,serif]">
                Enes Öztürk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
