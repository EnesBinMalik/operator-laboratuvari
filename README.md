# Operatör Laboratuvarı

Enes Öztürk tarafından hazırlanan Türkçe programlama eğitimi uygulaması. Etkileşimli örneklerle aritmetik, ilişkisel, mantıksal ve atama operatörlerini; karar yapılarını ve işlem önceliğini keşfedin.

## İçerik

- Değişkenlerle çalışan operatör simülatörü
- Koşulları değiştirilip incelenebilen karar yapıları
- Sayılar, boolean değerler, parantezler ve sınırlandırılmış operatör kümesiyle çalışan ifade çözücü
- İşlem önceliği rehberi ve JavaScript, C# ve Python örnekleri
- Çoktan seçmeli bilgi testi ve yazdırılabilir kurs tamamlama belgesi

## Teknolojiler

- React 19, TypeScript ve Vite
- Tailwind CSS
- Lucide React ve Canvas Confetti

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm

## Kurulum ve geliştirme

```bash
npm install
npm run dev
```

Vite geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde açılır.

## Denetim ve üretim derlemesi

```bash
npm run lint
npm run build
npm run preview
```

`npm run lint`, TypeScript denetimini; `npm run build`, üretim derlemesini çalıştırır. `npm run preview`, derleme çıktısını yerel olarak sunar.

## Çalıştırma ve kapsam

Operatör simülatörleri ve karar senaryoları eğitim amaçlı örneklerdir. C# veya Python kodunu derleyip çalıştırmazlar. İfade çözücü yalnızca sayı/boolean sabitlerini, parantezleri ve aritmetik, karşılaştırma, eşitlik ve mantıksal operatörleri destekler; girilen JavaScript kodunu çalıştırmaz. `==`/`!=` dahil eşitlik ve tür dönüşümü davranışları eğitim amacıyla sınırlı biçimde uygulanır, hedef programlama diline göre değişebilir. Gerçek sistemlerde kullanılacak kodları ve güvenlik kararlarını bu demoya dayandırmayın.

Sınav sonunda oluşturulan çıktı, yalnızca bu sayfadaki öz değerlendirme testini tamamladığınızı gösteren yazdırılabilir bir belgedir; resmi yeterlilik, akreditasyon veya doğrulanabilir sertifika değildir.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
