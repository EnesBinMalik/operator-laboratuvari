import { DecisionScenario } from '../types';

export const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 'ecommerce',
    title: 'E-Ticaret İndirim ve Kargo Karar Motoru',
    description: 'Sepet tutarı, VIP üyelik ve kupon durumuna göre dinamik indirim ve kargo ücreti karar algoritması.',
    variables: [
      { id: 'sepetTutari', label: 'Sepet Tutarı (TL)', type: 'number', min: 0, max: 1500, step: 25, defaultValue: 450, unit: 'TL' },
      { id: 'isVip', label: 'VIP Üyelik Aktif', type: 'boolean', defaultValue: false },
      { id: 'kuponVar', label: 'İndirim Kuponu Var', type: 'boolean', defaultValue: true },
    ],
    evaluate: (val) => {
      const sepet = Number(val.sepetTutari) || 0;
      const vip = Boolean(val.isVip);
      const kupon = Boolean(val.kuponVar);

      const cond1 = sepet >= 750 || (vip && sepet >= 400);
      const cond2 = sepet >= 350 && (kupon || vip);
      const cond3 = sepet >= 250;

      const branches = [
        {
          conditionText: 'if (sepet >= 750 || (isVip && sepet >= 400))',
          isMet: cond1,
          actionText: '%20 Süper İndirim + Ücretsiz Kargo + Hediye Kupon',
          codeBlock: `if (sepet >= 750 || (isVip && sepet >= 400)) {
  odenecekTutar = sepet * 0.80; // %20 indirim
  kargoUcreti = 0;              // Ücretsiz kargo
  hediyeVer = true;
}`,
        },
        {
          conditionText: 'else if (sepet >= 350 && (kuponVar || isVip))',
          isMet: !cond1 && cond2,
          actionText: '%10 İndirim + Ücretsiz Kargo',
          codeBlock: `else if (sepet >= 350 && (kuponVar || isVip)) {
  odenecekTutar = sepet * 0.90; // %10 indirim
  kargoUcreti = 0;              // Ücretsiz kargo
}`,
        },
        {
          conditionText: 'else if (sepet >= 250)',
          isMet: !cond1 && !cond2 && cond3,
          actionText: 'Ücretsiz Kargo (İndirimsiz Tutar)',
          codeBlock: `else if (sepet >= 250) {
  odenecekTutar = sepet;
  kargoUcreti = 0; // 250 TL barajı aşıldı
}`,
        },
        {
          conditionText: 'else',
          isMet: !cond1 && !cond2 && !cond3,
          actionText: 'Standart Sipariş + 49.90 TL Kargo Ücreti',
          codeBlock: `else {
  odenecekTutar = sepet;
  kargoUcreti = 49.90; // Alt limitin altında
}`,
        },
      ];

      let activeIndex = branches.findIndex((b) => b.isMet);
      if (activeIndex === -1) activeIndex = 3;

      let odenecek = sepet;
      let kargo = 0;
      if (activeIndex === 0) {
        odenecek = sepet * 0.8;
      } else if (activeIndex === 1) {
        odenecek = sepet * 0.9;
      } else if (activeIndex === 2) {
        odenecek = sepet;
      } else {
        odenecek = sepet;
        kargo = 49.9;
      }

      return {
        activeBranchIndex: activeIndex,
        branches,
        summaryText: `Sonuç: ${branches[activeIndex].actionText} | Toplam Tahsilat: ${(odenecek + kargo).toFixed(2)} TL`,
        logDetails: [
          `Sepet: ${sepet} TL, VIP: ${vip ? 'Evet' : 'Hayır'}, Kupon: ${kupon ? 'Var' : 'Yok'}`,
          `Koşul 1 Kontrolü (sepet >= 750 || (isVip && sepet >= 400)): ${cond1 ? 'SAĞLANDI (TRUE)' : 'SAĞLANMADI (FALSE)'}`,
          cond1 ? `Dallanma Tamamlandı: 1. Kod Bloğu çalıştırıldı.` : `Koşul 2 Kontrolü (sepet >= 350 && (kupon || vip)): ${cond2 ? 'SAĞLANDI (TRUE)' : 'SAĞLANMADI (FALSE)'}`,
          !cond1 && !cond2 ? `Koşul 3 Kontrolü (sepet >= 250): ${cond3 ? 'SAĞLANDI (TRUE)' : 'SAĞLANMADI (FALSE) -> Else çalıştı.'}` : '',
        ].filter(Boolean),
      };
    },
  },
  {
    id: 'grades',
    title: 'Akademik Başarı & Geçme Durumu',
    description: 'Vize, final notları ve devam zorunluluğu kullanılarak karar yapısıyla harf ve geçme kararı verilir.',
    variables: [
      { id: 'vize', label: 'Vize Notu (0-100)', type: 'number', min: 0, max: 100, step: 1, defaultValue: 65, unit: 'Puan' },
      { id: 'final', label: 'Final Notu (0-100)', type: 'number', min: 0, max: 100, step: 1, defaultValue: 55, unit: 'Puan' },
      { id: 'devam', label: 'Derse Devam Oranı (%)', type: 'number', min: 0, max: 100, step: 5, defaultValue: 80, unit: '%' },
    ],
    evaluate: (val) => {
      const vize = Number(val.vize) || 0;
      const finalNot = Number(val.final) || 0;
      const devam = Number(val.devam) || 0;
      const ortalama = Number((vize * 0.4 + finalNot * 0.6).toFixed(1));

      const devamsiz = devam < 70;
      const basarili = !devamsiz && ortalama >= 60 && finalNot >= 50;
      const sartli = !devamsiz && !basarili && ortalama >= 45 && finalNot >= 50;
      const finalBarajiKalamayan = !devamsiz && finalNot < 50;

      const branches = [
        {
          conditionText: 'if (devam < 70)',
          isMet: devamsiz,
          actionText: 'Devamsızlıktan Kaldı (DZ)',
          codeBlock: `if (devam < 70) {
  durum = "DZ - Devamsızlıktan Kaldı";
  harfNotu = "FF";
}`,
        },
        {
          conditionText: 'else if (ortalama >= 60 && final >= 50)',
          isMet: basarili,
          actionText: `Doğrudan Başarılı ile Geçti (Ortalama: ${ortalama})`,
          codeBlock: `else if (ortalama >= 60 && final >= 50) {
  durum = "Başarılı ile Geçti";
  harfNotu = ortalama >= 85 ? "AA" : (ortalama >= 70 ? "BA" : "CB");
}`,
        },
        {
          conditionText: 'else if (ortalama >= 45 && final >= 50)',
          isMet: sartli,
          actionText: `Şartlı Başarılı (DC) (Ortalama: ${ortalama})`,
          codeBlock: `else if (ortalama >= 45 && final >= 50) {
  durum = "Şartlı Geçti (Genel Not Ortalamasına Bağlı)";
  harfNotu = "DC";
}`,
        },
        {
          conditionText: 'else',
          isMet: !devamsiz && !basarili && !sartli,
          actionText: finalBarajiKalamayan ? 'Final Barajı (50) Aşılamadığı İçin Kaldı (FF)' : `Ortalama Yetersiz Kaldı (FF, Ort: ${ortalama})`,
          codeBlock: `else {
  durum = "Kaldı (Bütünleme Sınavına Girecek)";
  harfNotu = "FF";
}`,
        },
      ];

      const activeIndex = branches.findIndex((b) => b.isMet);

      return {
        activeBranchIndex: activeIndex !== -1 ? activeIndex : 3,
        branches,
        summaryText: `Ağırlıklı Ortalama: ${ortalama} | ${branches[activeIndex].actionText}`,
        logDetails: [
          `Hesaplama: (Vize * 0.40) + (Final * 0.60) = (${vize * 0.4} + ${finalNot * 0.6}) = ${ortalama}`,
          `Devam Kontrolü (devam < 70): ${devamsiz ? 'DEVAMSIZLIK VAR (TRUE)' : 'Yeterli Devam (FALSE)'}`,
          !devamsiz ? `Baraj Kontrolleri: Ortalama ${ortalama >= 60 ? '>= 60 (TRUE)' : '< 60 (FALSE)'} && Final ${finalNot >= 50 ? '>= 50 (TRUE)' : '< 50 (FALSE)'}` : 'Öğrenci devamsız olduğu için not şartları incelenmedi.',
        ],
      };
    },
  },
  {
    id: 'game',
    title: 'Oyun Karakteri Savaş Karar Motoru',
    description: 'Can puanı, mana seviyesi ve özel yetenek durumuna göre karakterin yapabileceği hamleler belirlenir.',
    variables: [
      { id: 'can', label: 'Sağlık Puanı (HP)', type: 'number', min: 0, max: 100, step: 5, defaultValue: 75, unit: 'HP' },
      { id: 'mana', label: 'Büyü Gücü (Mana)', type: 'number', min: 0, max: 100, step: 5, defaultValue: 45, unit: 'MP' },
      { id: 'superGuc', label: 'Süper Güç / Ultimate Hazır', type: 'boolean', defaultValue: false },
    ],
    evaluate: (val) => {
      const can = Number(val.can) || 0;
      const mana = Number(val.mana) || 0;
      const superGuc = Boolean(val.superGuc);

      const oldumu = can <= 0;
      const ultimateSaldiri = !oldumu && superGuc && can > 20;
      const buyuSaldirisi = !oldumu && !ultimateSaldiri && mana >= 30;
      const fizikselSaldiri = !oldumu && !ultimateSaldiri && !buyuSaldirisi;

      const branches = [
        {
          conditionText: 'if (can <= 0)',
          isMet: oldumu,
          actionText: 'Karakter Öldü! Yeniden Doğma Bekleniyor',
          codeBlock: `if (can <= 0) {
  durum = "GAME OVER / Respawn Bekleniyor";
  hareketEdebilir = false;
}`,
        },
        {
          conditionText: 'else if (superGuc && can > 20)',
          isMet: ultimateSaldiri,
          actionText: 'YIKICI ULTIMATE SALDIRI HAZIR! (%300 Alan Hasarı)',
          codeBlock: `else if (superGuc && can > 20) {
  eylem = "Ejderha Nefesi Ultimate Aktif";
  hasar = 350;
}`,
        },
        {
          conditionText: 'else if (mana >= 30)',
          isMet: buyuSaldirisi,
          actionText: 'Büyülü Ateş Topu Fırlat (30 Mana Harcar)',
          codeBlock: `else if (mana >= 30) {
  mana -= 30; // İşlemli atama ile mana eksiltilir
  hasar = 120;
  eylem = "Ateş Topu Büyüsü";
}`,
        },
        {
          conditionText: 'else',
          isMet: fizikselSaldiri,
          actionText: 'Yetersiz Mana! Standart Kılıç Darbesi (Mana Gerektirmez)',
          codeBlock: `else {
  hasar = 40;
  eylem = "Fiziksel Kılıç Vuruşu";
}`,
        },
      ];

      const activeIndex = branches.findIndex((b) => b.isMet);

      return {
        activeBranchIndex: activeIndex !== -1 ? activeIndex : 3,
        branches,
        summaryText: `Aktif Eylem: ${branches[activeIndex].actionText}`,
        logDetails: [
          `HP: ${can}, MP: ${mana}, Ultimate: ${superGuc ? 'Hazır' : 'Beklemede'}`,
          `Hayatta Olma Kontrolü (can <= 0): ${oldumu ? 'ÖLDÜ' : 'YAŞIYOR'}`,
          !oldumu ? `Kombinasyon: superGuc (${superGuc}) && can > 20 (${can > 20}) -> ${ultimateSaldiri ? 'ULTIMATE AKTİF' : 'Büyü/Fiziksel kontrol ediliyor'}` : '',
        ].filter(Boolean),
      };
    },
  },
];
