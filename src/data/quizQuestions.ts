import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'assignment',
    categoryName: 'Atama ve İşlemli Atama',
    question: 'Aşağıdaki kod parçası çalıştırıldığında x değişkeninin son değeri ne olur?',
    codeSnippet: `let x = 12;
x += 8;
x /= 4;`,
    options: ['3', '5', '20', '8'],
    correctIndex: 1,
    explanation: 'Adım 1: x += 8 ifadesi x = x + 8 anlamına gelir (12 + 8 = 20). Adım 2: x /= 4 ifadesi x = x / 4 anlamına gelir (20 / 4 = 5). Dolayısıyla son değer 5\'tir.',
  },
  {
    id: 2,
    category: 'arithmetic',
    categoryName: 'Aritmetik Operatörler',
    question: 'Aşağıdaki JavaScript kodunda b ve c değişkenlerinin değerleri sırasıyla ne olur?',
    codeSnippet: `let a = 7;
let b = a++;
let c = ++a;`,
    options: [
      'b = 7, c = 8',
      'b = 7, c = 9',
      'b = 8, c = 8',
      'b = 8, c = 9',
    ],
    correctIndex: 1,
    explanation: 'a++ (son arttırma) operatörü a\'nın o anki değeri olan 7\'yi b\'ye atar, ardından a\'yı 8 yapar. Sonraki satırda ++a (ön arttırma) a\'yı önce 8\'den 9\'a çıkarır, ardından c\'ye 9 değerini atar. Sonuç: b = 7, c = 9.',
  },
  {
    id: 3,
    category: 'arithmetic',
    categoryName: 'Aritmetik Operatörler',
    question: 'İşlem önceliğine göre aşağıdaki aritmetik ifadenin sonucu kaçtır?',
    codeSnippet: `let sonuc = 18 - 3 * 4 + 10 % 3;`,
    options: ['7', '61', '1', '13'],
    correctIndex: 0,
    explanation: 'Çarpma (*) ve Mod (%) toplama ve çıkarmadan daha yüksek önceliğe sahiptir: 3 * 4 = 12, 10 % 3 = 1 (10\'un 3\'e bölümünden kalan 1). İfade: 18 - 12 + 1 = 6 + 1 = 7 olur.',
  },
  {
    id: 4,
    category: 'relational',
    categoryName: 'İlişkisel Operatörler',
    question: 'Aşağıdaki karşılaştırmalardan hangisinin sonucu false üretir?',
    options: [
      '15 >= 15',
      '10 != 20',
      '25 <= 18',
      '30 > 12',
    ],
    correctIndex: 2,
    explanation: '25 <= 18 ifadesinde 25 sayısı 18\'den küçük veya eşit olmadığı için sonuç FALSE\'tur. Diğer tüm seçenekler TRUE üretir.',
  },
  {
    id: 5,
    category: 'logical',
    categoryName: 'Mantıksal Operatörler',
    question: 'Aşağıdaki mantıksal ifadenin doğruluk değeri nedir?',
    codeSnippet: `let sonuc = (10 > 5 && 3 == 4) || !(8 < 2);`,
    options: ['true', 'false', 'undefined', 'Syntax Error'],
    correctIndex: 0,
    explanation: 'Parantez 1: (10 > 5 && 3 == 4) -> (true && false) -> false. Parantez 2: !(8 < 2) -> !(false) -> true. Birleştirme: false || true -> TRUE döner.',
  },
  {
    id: 6,
    category: 'assignment',
    categoryName: 'Atama ve İşlemli Atama',
    question: 'let bakiye = 100; satırından sonra "bakiye *= 2 + 3;" çalıştırılırsa bakiye ne olur?',
    options: ['203', '500', '200', '250'],
    correctIndex: 1,
    explanation: 'İşlemli atamalarda sağ taraftaki ifadenin tamamı önce hesaplanır! bakiye *= (2 + 3) -> bakiye *= 5 -> 100 * 5 = 500.',
  },
  {
    id: 7,
    category: 'logical',
    categoryName: 'Mantıksal Operatörler',
    question: 'Mantıksal operatörlerde "Kısa Devre (Short-Circuit)" değerlendirmesi ile ilgili hangisi DOĞRUDUR?',
    options: [
      '&& operatöründe ilk ifade false ise ikinci ifade çalıştırılmaz.',
      '|| operatöründe ilk ifade true olsa bile ikinci ifade mutlaka çalıştırılır.',
      '! operatörü iki değişkeni karşılaştırmak için kullanılır.',
      '&& operatöründe bir tane true olması ifadenin true olması için yeterlidir.',
    ],
    correctIndex: 0,
    explanation: '&& (VE) operatöründe ilk ifade false ise, sonucun artık kesinlikle false olacağı bilindiğinden performans ve güvenlik için sağdaki ifade hiç çalıştırılmaz (short-circuit).',
  },
  {
    id: 8,
    category: 'arithmetic',
    categoryName: 'Aritmetik Operatörler',
    question: 'Bir sayının tek mi yoksa çift mi olduğunu anlamak için hangi operatör kullanılır?',
    options: [
      '/ (Bölme)',
      '% (Mod Alma)',
      '*= (Çarp ve Ata)',
      '++ (Bir Arttırma)',
    ],
    correctIndex: 1,
    explanation: '% (Mod / Kalan) operatörü ile sayi % 2 işlemi yapılır. Kalan 0 ise sayı çift, 1 ise sayı tektir.',
  },
  {
    id: 9,
    category: 'relational',
    categoryName: 'İlişkisel Operatörler & Karar Yapıları',
    question: 'Hangi if koşulu "yaşın 18 ile 65 arasında (sınırlar dahil)" olduğunu doğru ifade eder?',
    options: [
      'if (yas >= 18 || yas <= 65)',
      'if (18 <= yas <= 65)',
      'if (yas >= 18 && yas <= 65)',
      'if (yas > 18 && yas < 65)',
    ],
    correctIndex: 2,
    explanation: 'Her iki sınırın da sağlanması ve sınırların dahil olması için "yas >= 18 && yas <= 65" ifadesi kullanılır.',
  },
  {
    id: 10,
    category: 'assignment',
    categoryName: 'Atama & Karar Yapıları',
    question: 'Aşağıdaki kod parçası çalıştırıldığında ekrana ne yazdırılır?',
    codeSnippet: `let can = 80;
let hasar = 30;
can -= hasar;
if (can > 60) {
  console.log("Mükemmel");
} else if (can >= 40) {
  console.log("İyi");
} else {
  console.log("Kritik");
}`,
    options: ['Mükemmel', 'İyi', 'Kritik', 'Hiçbiri'],
    correctIndex: 1,
    explanation: 'can -= hasar işlemiyle can = 80 - 30 = 50 olur. if (50 > 60) -> false; else if (50 >= 40) -> true olduğu için "İyi" yazdırılır.',
  },
];
