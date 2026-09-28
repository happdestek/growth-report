import { TrendingUp, TrendingDown, Minus, Search, FileText, Activity, AlertTriangle, CheckCircle, Clock, ExternalLink, BarChart2, Lightbulb, Wrench, Target, Info, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const SEO_KPI = [
  {
    label: 'Clicks',
    current: 27600,
    prev: 28400,
    format: (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toLocaleString('tr-TR'),
    color: 'blue',
  },
  {
    label: 'Impressions',
    current: 4550000,
    prev: 4740000,
    format: (n: number) => (n / 1000000).toFixed(2) + 'M',
    color: 'emerald',
  },
  {
    label: 'CTR',
    current: 0.6,
    prev: 0.6,
    format: (n: number) => n.toFixed(1) + '%',
    color: 'amber',
  },
  {
    label: 'Average Position',
    current: 9.3,
    prev: 9.0,
    format: (n: number) => n.toFixed(1),
    color: 'slate',
    lowerIsBetter: true,
  },
];

const MONTHLY_TREND = [
  { month: 'Ekim',  clicks: 56566,  impressions: 8599623,  ctr: 0.66, position: 7.8,  note: 'Baz değer' },
  { month: 'Kasım', clicks: 49613,  impressions: 7879672,  ctr: 0.63, position: 7.8,  note: 'Mevsimsel düşüş' },
  { month: 'Aralık',clicks: 50430,  impressions: 8358377,  ctr: 0.60, position: 8.1,  note: 'Yeni içerikler indeksleniyor' },
  { month: 'Ocak',  clicks: 61199,  impressions: 9576143,  ctr: 0.64, position: 8.1,  note: 'En yüksek click' },
  { month: 'Şubat', clicks: 48567,  impressions: 7864568,  ctr: 0.62, position: 8.0,  note: 'Kısa ay + altyapı geçişi + 500 hataları' },
  { month: 'Mart',  clicks: 58953,  impressions: 9899527,  ctr: 0.60, position: 8.1,  note: 'En yüksek impression' },
  { month: 'Nisan', clicks: 44100,  impressions: 8140000,  ctr: 0.53, position: 8.3,  note: '' },
  { month: 'Mayıs',   clicks: 54900,  impressions: 9470000, ctr: 0.60, position: 8.6,  note: 'Tıklama ve gösterim artışı' },
  { month: 'Haziran', clicks: 34500,  impressions: 6060000, ctr: 0.60, position: 8.8,  note: 'Mevsimsel düşüş' },
  { month: 'Temmuz',  clicks: 28400,  impressions: 4740000, ctr: 0.60, position: 9.0,  note: 'Görünürlük hacminde daralma' },
  { month: 'Ağustos', clicks: 27600,  impressions: 4550000, ctr: 0.60, position: 9.3,  note: 'Stabilizasyon sinyali' },
];

const catColorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' },
};

interface NobetciRow {
  month: string;
  trClicks: number;
  arClicks: number;
  totalClicks: number;
  totalImpressions: number;
  partial?: boolean;
}

const NOBETCI_MONTHLY: NobetciRow[] = [
  { month: 'Ekim 2025',  trClicks: 41769, arClicks: 10808, totalClicks: 52577, totalImpressions: 7771411 },
  { month: 'Kasım 2025', trClicks: 35619, arClicks: 10260, totalClicks: 45879, totalImpressions: 6982662 },
  { month: 'Aralık 2025',trClicks: 35216, arClicks: 11025, totalClicks: 46241, totalImpressions: 7273224 },
  { month: 'Ocak 2026',  trClicks: 45229, arClicks: 11517, totalClicks: 56746, totalImpressions: 8357113 },
  { month: 'Şubat 2026', trClicks: 36349, arClicks: 8352,  totalClicks: 44701, totalImpressions: 6680766 },
  { month: 'Mart 2026',  trClicks: 44150, arClicks: 11747, totalClicks: 55897, totalImpressions: 8779400 },
  { month: 'Nisan 2026', trClicks: 27445, arClicks: 7421,  totalClicks: 30558, totalImpressions: 6468901 },
  { month: 'Mayıs 2026', trClicks: 26500, arClicks: 4400,  totalClicks: 30900, totalImpressions: 6750000 },
  { month: 'Haziran 2026', trClicks: 0, arClicks: 0, totalClicks: 28390, totalImpressions: 3540000, partial: true },
  { month: 'Temmuz 2026',  trClicks: 0, arClicks: 0, totalClicks: 16400, totalImpressions: 3670000, partial: true },
  { month: 'Ağustos 2026', trClicks: 0, arClicks: 0, totalClicks: 15700, totalImpressions: 3530000, partial: true },
];

const CATEGORY_MONTHLY: Record<string, { month: string; clicks: number; impressions: number; ctr: string; position?: number; note?: string; highlight?: 'warn' | 'peak' }[]> = {
  'Blog İçerikleri': [
    { month: 'Ağustos 2026', clicks: 472, impressions: 190000, ctr: '0.20%', position: 16.6, note: '' },
    { month: 'Temmuz 2026', clicks: 416, impressions: 160000, ctr: '0.30%', position: 17.0, note: '' },
    { month: 'Haziran 2026', clicks: 402, impressions: 175000, ctr: '0.20%', note: '' },
    { month: 'Mayıs 2026', clicks: 386, impressions: 156000, ctr: '0.25%', position: 15.6, note: '' },
    { month: 'Nisan 2026', clicks: 432, impressions: 201000, ctr: '0.21%', note: 'En yüksek impression' },
    { month: 'Mart 2026', clicks: 436, impressions: 171564, ctr: '0.25%', note: 'En yüksek gösterim' },
    { month: 'Şubat 2026', clicks: 694, impressions: 161396, ctr: '0.43%' },
    { month: 'Ocak 2026', clicks: 723, impressions: 160503, ctr: '0.45%', note: '70 yeni blog eklendi' },
    { month: 'Aralık 2025', clicks: 688, impressions: 143294, ctr: '0.48%', note: 'Yeni içerikler indeksleniyor' },
    { month: 'Kasım 2025', clicks: 655, impressions: 106774, ctr: '0.61%' },
    { month: 'Ekim 2025', clicks: 642, impressions: 100524, ctr: '0.64%', note: 'Baz değer' },
  ],
  'Check-up': [
    { month: 'Ağustos 2026', clicks: 119, impressions: 5990, ctr: '2.00%', position: 12.4, note: '' },
    { month: 'Temmuz 2026', clicks: 127, impressions: 4270, ctr: '3.00%', position: 10.6, note: '' },
    { month: 'Haziran 2026', clicks: 134, impressions: 5100, ctr: '2.65%', position: 12.1, note: '' },
    { month: 'Mayıs 2026', clicks: 118, impressions: 4350,  ctr: '2.71%', position: 10.7, note: '' },
    { month: 'Nisan 2026', clicks: 159, impressions: 5996,  ctr: '2.65%', position: 7.21, note: '' },
    { month: 'Mart 2026',  clicks: 152, impressions: 6253,  ctr: '2.43%', position: 9.6, highlight: 'warn', note: 'Ramazan Bayramı etkisi' },
    { month: 'Şubat 2026', clicks: 197, impressions: 5660,  ctr: '3.48%', position: 7.9 },
    { month: 'Ocak 2026',  clicks: 282, impressions: 6940,  ctr: '4.06%', position: 8.6, highlight: 'peak' },
    { month: 'Aralık 2025',clicks: 201, impressions: 10340, ctr: '1.94%', position: 7.7 },
    { month: 'Kasım 2025', clicks: 179, impressions: 9046,  ctr: '1.98%', position: 6.5 },
    { month: 'Ekim 2025',  clicks: 224, impressions: 9711,  ctr: '2.31%', position: 7.1 },
  ],
  'Evde Sağlık': [
    { month: 'Ağustos 2026', clicks: 92, impressions: 5440, ctr: '1.70%', position: 14.0, note: '' },
    { month: 'Temmuz 2026', clicks: 113, impressions: 5130, ctr: '2.20%', position: 11.4, note: '' },
    { month: 'Haziran 2026', clicks: 106, impressions: 4600, ctr: '2.30%', position: 10.4, note: '' },
    { month: 'Mayıs 2026', clicks: 100, impressions: 4490, ctr: '2.23%', position: 10.6, note: '' },
    { month: 'Nisan 2026', clicks: 137, impressions: 6289, ctr: '2.18%', position: 7.65, note: '' },
    { month: 'Mart 2026',  clicks: 132, impressions: 6179, ctr: '2.14%', position: 7.7, highlight: 'warn', note: 'Ramazan Bayramı etkisi' },
    { month: 'Şubat 2026', clicks: 165, impressions: 4994, ctr: '3.30%', position: 9.1 },
    { month: 'Ocak 2026',  clicks: 184, impressions: 6177, ctr: '2.98%', position: 8.6, highlight: 'peak' },
    { month: 'Aralık 2025',clicks: 136, impressions: 8088, ctr: '1.68%', position: 7.4 },
    { month: 'Kasım 2025', clicks: 152, impressions: 6130, ctr: '2.48%', position: 7.0 },
    { month: 'Ekim 2025',  clicks: 125, impressions: 4825, ctr: '2.59%', position: 6.8 },
  ],
};

interface CategoryModalProps {
  cat: typeof CATEGORIES[0];
  onClose: () => void;
}

function CategoryModal({ cat, onClose }: CategoryModalProps) {
  const rows = CATEGORY_MONTHLY[cat.name];
  const isNobetci = cat.name === 'Nöbetçi Eczane';
  const c = catColorMap[cat.color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{cat.icon}</span>
            <div>
              <p className="text-sm font-bold text-gray-900">{cat.name}</p>
              <p className="text-xs text-gray-400">{isNobetci ? 'Türkçe + Arapça + Rusça + İngilizce' : cat.name === 'Check-up' ? 'Hizmet sayfaları + doktor sayfaları — branded sorgulara dayanmaktadır' : cat.name === 'Evde Sağlık' ? 'Evde hemşire, serum, radyoloji, yoğun bakım hizmetleri' : 'Aylık performans verisi'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        {isNobetci ? (
          <div className="p-5 space-y-4">
            <div className={`rounded-xl px-4 py-3 border ${c.border} ${c.bg}`}>
              <p className={`text-xs font-semibold ${c.text}`}>Site trafiğinin ana kaynağı — toplam tıklamaların %75'inden fazlasını oluşturur</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Ay</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">TR Click</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">AR Click</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Toplam Click</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Toplam Imp.</th>
                  </tr>
                </thead>
                <tbody>
                  {[...NOBETCI_MONTHLY].reverse().map((row, i) => {
                    const isMax = row.totalClicks === Math.max(...NOBETCI_MONTHLY.map(r => r.totalClicks));
                    return (
                      <tr key={i} className={`border-t border-gray-100 ${isMax ? 'bg-blue-50/40' : 'hover:bg-gray-50/60'} transition-colors`}>
                        <td className="px-3 py-2.5 font-semibold text-gray-700">
                          <div className="flex items-center gap-1.5">
                            {row.month}
                            {isMax && <span className="text-[9px] bg-blue-100 text-blue-600 font-bold px-1.5 py-0.5 rounded-full">EN YÜKSEK</span>}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-gray-700 font-medium">{row.partial ? <span className="text-gray-300">—</span> : row.trClicks.toLocaleString('tr-TR')}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-blue-600 font-medium">{row.partial ? <span className="text-gray-300">—</span> : row.arClicks.toLocaleString('tr-TR')}</td>
                        <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${c.text}`}>{row.totalClicks.toLocaleString('tr-TR')}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.totalImpressions.toLocaleString('tr-TR')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">Ağustos 2026 Değerlendirmesi</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Ağustos ayında Nöbetçi Eczane organik performansı Temmuz’a göre sınırlı geriledi. Click hacmi %4,3, impression hacmi %3,8 azalırken CTR %0,4 seviyesinde korundu. Ortalama pozisyon 8,7’den 8,9’a sınırlı şekilde geriledi.
              </p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 space-y-2">
              <p className="text-xs text-blue-700 leading-relaxed">
                Düşüşün CTR kaynaklı olmaması, kaybın daha çok görünürlük ve sıralama hacmindeki sınırlı gerilemeden kaynaklandığını gösteriyor.
              </p>
            </div>
          </div>
        ) : rows ? (
          <div className="p-5 space-y-4">
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Ay</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Tıklamalar</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Gösterimler</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
                    {rows.some(r => r.position != null) && (
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Ort. Pos.</th>
                    )}
                    {!rows.some(r => r.position != null) && (
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Not</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className={`border-t border-gray-100 ${row.highlight === 'warn' ? 'bg-amber-50/40' : row.highlight === 'peak' ? 'bg-blue-50/40' : 'hover:bg-gray-50/60'} transition-colors`}>
                      <td className="px-3 py-2.5 font-semibold text-gray-700">
                        <div className="flex items-center gap-1.5">
                          {row.month}
                          {row.highlight === 'peak' && <span className="text-[9px] bg-blue-100 text-blue-600 font-bold px-1.5 py-0.5 rounded-full">EN YÜKSEK</span>}
                          {row.highlight === 'warn' && <span className="text-[9px] bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded-full">DÜŞÜŞ</span>}
                        </div>
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums font-semibold ${c.text}`}>{row.clicks.toLocaleString('tr-TR')}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.impressions.toLocaleString('tr-TR')}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.ctr}</td>
                      {row.position != null
                        ? <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.position.toFixed(1)}</td>
                        : <td className="px-3 py-2.5 text-gray-400 italic">{row.note ?? '—'}</td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {cat.name === 'Check-up' && (
              <div className="space-y-2">
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Ağustos 2026 Değerlendirmesi</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Ağustos ayında Check-Up aramalarında görünürlük güçlü şekilde arttı; impression hacmi Temmuz’a göre %40,3 yükselerek 5,99 bine ulaştı. Buna karşın click hacmi %6,3 geriledi ve CTR %3,0’dan %2,0’ye düştü. Ortalama pozisyonun 10,6’dan 12,4’e gerilemesi de artan görünürlüğün aynı oranda trafiğe dönüşmemesinde etkili oldu.
                  </p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3 space-y-2">
                  <p className="text-xs text-amber-600 leading-relaxed">
                    Check-Up tarafında ana fırsat yeni impression hacmini click’e çevirmek. Yüksek impression alan ancak düşük CTR / daha zayıf pozisyon üreten sorgular incelenerek title-meta optimizasyonu, landing page eşleşmesi ve query bazlı sıralama iyileştirmeleri yapılmalı.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                  <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Yönetim Yorumu</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Check-Up Ağustos’ta daha geniş bir arama görünürlüğüne ulaştı ancak trafik verimliliği zayıfladı. Impression artışı pozitif; CTR ve average position tarafındaki gerileme ise visibility artışının henüz click büyümesine dönüşmediğini gösteriyor.
                  </p>
                </div>
              </div>
            )}
            {cat.name === 'Evde Sağlık' && (
              <div className="space-y-2">
                <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3">
                  <p className="text-xs font-semibold text-teal-700 mb-1">Ağustos 2026 Değerlendirmesi</p>
                  <p className="text-xs text-teal-700 leading-relaxed">
                    Ağustos ayında Evde Sağlık kategorisi 5,44 bin impression ve 92 click üretti. CTR %1,7 seviyesinde kalırken average position 14,0 olarak gerçekleşti. Kategori görünürlük üretmeye devam etse de trafik verimliliğini artırmak için hem sıralama hem de CTR tarafında ek optimizasyon alanı bulunuyor.
                  </p>
                </div>
                <div className="rounded-xl border border-teal-100 bg-teal-50/50 px-4 py-3 space-y-2">
                  <p className="text-xs text-teal-600 leading-relaxed">
                    Evde Sağlık tarafında bir sonraki odak, yüksek impression alan sorgularda click kazanımını artırmak olmalı. Query bazlı içerik optimizasyonu, title/meta iyileştirmeleri ve landing page eşleşmesi CTR ve organik trafik performansını destekleyebilir.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                  <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Yönetim Yorumu</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Evde Sağlık kategorisi Ağustos ayında organik görünürlüğünü korurken click verimliliği tarafında geliştirme alanı bıraktı. Bu kategori, görünürlüğü daha yüksek kaliteli trafiğe çevirmek için SEO optimizasyonu gerektiren başlıklardan biri olarak değerlendirilebilir.
                  </p>
                </div>
              </div>
            )}
            {cat.name === 'Blog İçerikleri' && (
              <div className="space-y-2">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <p className="text-xs font-semibold text-emerald-700 mb-1">Ağustos 2026 Değerlendirmesi</p>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Ağustos ayında Blog organik görünürlüğü Temmuz’a göre güçlendi. Impression hacmi %18,8 artarak 190 bine, click hacmi ise %13,5 artarak 472’ye ulaştı. Ortalama pozisyon 17,0’dan 16,6’ya iyileşirken CTR %0,3’ten %0,2’ye geriledi.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3">
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Blog içerikleri daha fazla arama görünürlüğü ve trafik üretmeye başladı; ancak impression artışı click artışından daha hızlı olduğu için CTR tarafında optimizasyon ihtiyacı oluştu. Özellikle yüksek impression alan sorgularda title / meta description ve arama niyeti uyumu incelenmeli.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                  <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Yönetim Yorumu</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Blog tarafında Ağustos görünürlük açısından pozitif geçti. Impression ve click hacmi birlikte büyürken ortalama pozisyon da iyileşti. Ana geliştirme alanı, artan görünürlüğü daha yüksek CTR ile trafiğe çevirmek.
                  </p>
                </div>
              </div>
            )}
            {cat.name !== 'Check-up' && cat.name !== 'Evde Sağlık' && cat.name !== 'Blog İçerikleri' && (
              <div className={`rounded-xl p-3 border ${c.border} ${c.bg}`}>
                <p className={`text-xs leading-relaxed ${c.text}`}>{cat.comment}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-5">
            <div className={`rounded-xl p-4 border ${c.border} ${c.bg}`}>
              <p className={`text-xs leading-relaxed ${c.text}`}>{cat.comment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const CATEGORIES = [
  {
    name: 'Nöbetçi Eczane',
    clicks: 15700,
    impressions: 3530000,
    ctr: 0.40,
    avgPosition: 8.9,
    query: 80270,
    landingPage: 22787,
    changes: { clicks: -4.3, impressions: -3.8, ctr: 0, avgPosition: +2.3, query: 0, landingPage: 0 },
    period: 'Ağustos 2026',
    color: 'blue',
    comment: 'Ağustos ayında Nöbetçi Eczane organik performansı Temmuz’a göre sınırlı geriledi. Click hacmi %4,3, impression hacmi %3,8 azalırken CTR %0,4 seviyesinde korundu. Ortalama pozisyon 8,7’den 8,9’a sınırlı şekilde geriledi.',
    comment2: 'Düşüşün CTR kaynaklı olmaması, kaybın daha çok görünürlük ve sıralama hacmindeki sınırlı gerilemeden kaynaklandığını gösteriyor.',
    icon: '💊',
  },
  {
    name: 'Blog İçerikleri',
    clicks: 472,
    impressions: 190000,
    ctr: 0.20,
    period: 'Ağustos 2026',
    prevPeriod: 'Temmuz 2026',
    prev: { clicks: 416, impressions: 160000, ctr: 0.30 },
    color: 'emerald',
    comment: 'Ağustos ayında Blog organik görünürlüğü Temmuz’a göre güçlendi. Impression hacmi %18,8 artarak 190 bine, click hacmi ise %13,5 artarak 472’ye ulaştı. Ortalama pozisyon 17,0’dan 16,6’ya iyileşirken CTR %0,3’ten %0,2’ye geriledi.',
    icon: '📝',
  },
  {
    name: 'Check-up',
    clicks: 119,
    impressions: 5990,
    ctr: 2.0,
    period: 'Ağustos 2026',
    prevPeriod: 'Temmuz 2026',
    prev: { clicks: 127, impressions: 4270, ctr: 3.0 },
    color: 'amber',
    comment: 'Ağustos ayında Check-Up aramalarında görünürlük güçlü şekilde arttı; impression hacmi Temmuz’a göre %40,3 yükselerek 5,99 bine ulaştı. Buna karşın click hacmi %6,3 geriledi ve CTR %3,0’dan %2,0’ye düştü. Ortalama pozisyonun 10,6’dan 12,4’e gerilemesi de artan görünürlüğün aynı oranda trafiğe dönüşmemesinde etkili oldu.',
    icon: '🩺',
  },
  {
    name: 'Evde Sağlık',
    clicks: 92,
    impressions: 5440,
    ctr: 1.70,
    period: 'Ağustos 2026',
    prevPeriod: 'Temmuz 2026',
    prev: { clicks: 113, impressions: 5130, ctr: 2.20 },
    color: 'teal',
    comment: 'Ağustos ayında Evde Sağlık kategorisi 5,44 bin impression ve 92 click üretti. CTR %1,7 seviyesinde kalırken average position 14,0 olarak gerçekleşti. Kategori görünürlük üretmeye devam etse de trafik verimliliğini artırmak için hem sıralama hem de CTR tarafında ek optimizasyon alanı bulunuyor.',
    icon: '🏠',
  },
];

const TECHNICAL_ISSUES = [
  { label: 'Cache sistemine geçiş / yapılandırma (yanıt süresi ~600ms)', madde: 'Teknik', durum: 'Başlanmadı', status: 'open', severity: 'high' },
  { label: 'Blog kategorilerinin oluşturulması', madde: 'Teknik', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: 'Kullanılan görsellerin WebP formatına getirilmesi', madde: 'Görsel', durum: 'Devam ediyor (~%70)', status: 'partial', severity: 'medium' },
  { label: 'İhtiyaç dışı yüksek çözünürlüklü görsellerin küçültülmesi', madde: 'Görsel', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: 'Blog yazılarında çift ana başlığın kaldırılması', madde: 'Blog', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: 'Blog yazılarında ilk paragrafın görselin üzerine alınması', madde: 'Blog', durum: 'Başlanmadı', status: 'open', severity: 'low' },
  { label: 'İçeriklerde AI kullanım oranının düşürülmesi', madde: 'Blog', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: 'İçeriklerde H1–H4 başlık hiyerarşisinin doğru kullanılması', madde: 'Blog', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: 'Nöbetçi eczane sayfalarında "i" → "İ" karakter düzeltmesi', madde: 'Nöbetçi', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: '"Sepete ekle" → "Hemen randevu al" (alt kategori kartları)', madde: 'Genel', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: '"Sepete ekle" → "Hizmet al / Hizmeti incele" (evde sağlık kartları)', madde: 'Genel', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
  { label: 'Check-up paket URL\'lerine paket isimleri + 301 yönlendirme', madde: 'Genel', durum: 'Başlanmadı', status: 'open', severity: 'high' },
  { label: 'Sayfa SSS sayısının maks. 4–5 soruya indirilmesi', madde: 'Genel', durum: 'Başlanmadı', status: 'open', severity: 'low' },
  { label: 'Doktor sayfalarında randevu saatlerinin kullanıcı aksiyonuyla yüklenmesi', madde: 'Brick', durum: 'Başlanmadı', status: 'open', severity: 'medium' },
];

const RECOMMENDATIONS = [
  { label: 'Canonical + hreflang üçlüsünü kapat (#44–45–46)', priority: 'Yüksek', icon: <Wrench size={14} /> },
  { label: 'Mobil Core Web Vitals — LCP & CLS düşürme', priority: 'Yüksek', icon: <Activity size={14} /> },
  { label: 'İstanbul ilçe nöbetçi eczane pozisyonlarını geri kazan', priority: 'Yüksek', icon: <Target size={14} /> },
  { label: 'Quick win avı — 11–20. pozisyon kelime tespiti', priority: 'Orta', icon: <Search size={14} /> },
  { label: 'Cache yapılandırması & yanıt süresini 400ms altına indir', priority: 'Orta', icon: <Wrench size={14} /> },
];

function pctChange(curr: number, prev: number) {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

function KPICard({ kpi }: { kpi: typeof SEO_KPI[0] }) {
  const change = pctChange(kpi.current, kpi.prev);
  const lowerBetter = 'lowerIsBetter' in kpi && kpi.lowerIsBetter;
  const isPositive = change !== null && (lowerBetter ? change < 0 : change > 0);
  const isNegative = change !== null && (lowerBetter ? change > 0 : change < 0);

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{kpi.label}</span>
        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${colorMap[kpi.color]}`}>Ağustos</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 tabular-nums">{kpi.format(kpi.current)}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Temmuz: <span className="text-gray-600 font-medium">{kpi.format(kpi.prev)}</span></span>
        {change !== null && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
            isPositive ? 'bg-emerald-50 text-emerald-600' :
            isNegative ? 'bg-red-50 text-red-500' :
            'bg-gray-50 text-gray-400'
          }`}>
            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  );
}

function MiniLineChart() {
  const maxImp = Math.max(...MONTHLY_TREND.map(d => d.impressions));
  const maxClk = Math.max(...MONTHLY_TREND.map(d => d.clicks));
  const W = 100;
  const H = 60;
  const pad = 4;

  const impPoints = MONTHLY_TREND.map((d, i) => {
    const x = pad + (i / (MONTHLY_TREND.length - 1)) * (W - 2 * pad);
    const y = H - pad - ((d.impressions / maxImp) * (H - 2 * pad));
    return `${x},${y}`;
  }).join(' ');

  const clkPoints = MONTHLY_TREND.map((d, i) => {
    const x = pad + (i / (MONTHLY_TREND.length - 1)) * (W - 2 * pad);
    const y = H - pad - ((d.clicks / maxClk) * (H - 2 * pad));
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <polyline points={impPoints} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={clkPoints} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {MONTHLY_TREND.map((d, i) => {
        const x = pad + (i / (MONTHLY_TREND.length - 1)) * (W - 2 * pad);
        const y = H - pad - ((d.impressions / maxImp) * (H - 2 * pad));
        return <circle key={i} cx={x} cy={y} r="1.5" fill="#10b981" />;
      })}
      {MONTHLY_TREND.map((d, i) => {
        const x = pad + (i / (MONTHLY_TREND.length - 1)) * (W - 2 * pad);
        const y = H - pad - ((d.clicks / maxClk) * (H - 2 * pad));
        return <circle key={i} cx={x} cy={y} r="1.5" fill="#3b82f6" />;
      })}
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'resolved') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
      <CheckCircle size={10} /> Tamamlandı
    </span>
  );
  if (status === 'in-progress') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">
      <Clock size={10} /> Hâlâ Açık
    </span>
  );
  if (status === 'partial') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full whitespace-nowrap">
      <Clock size={10} /> Kısmen
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">
      <AlertTriangle size={10} /> Açık
    </span>
  );
}

export default function SEODashboard() {
  const totalActions = 80;
  const resolved = 59;
  const inProgress = 15;
  const [activeModal, setActiveModal] = useState<typeof CATEGORIES[0] | null>(null);
  const [paradoksOpen, setParadoksOpen] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      {activeModal && <CategoryModal cat={activeModal} onClose={() => setActiveModal(null)} />}

      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SEO 10 Aylık Performans Analizi</h1>
        <p className="text-sm text-gray-400">Ekim 2025 — Ağustos 2026 · Google Search Console verileri</p>
      </div>

      {/* KPI Section */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SEO_KPI.map(kpi => <KPICard key={kpi.label} kpi={kpi} />)}
        </div>
        {/* 28-Day Search Visibility Comparison */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Search size={15} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Generative AI Görünürlüğü</p>
                <p className="text-xs text-gray-400">Önceki 28 gün ile karşılaştırma</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* KPI values */}
            <div className="flex flex-row gap-6 lg:flex-col lg:gap-3 shrink-0">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Son 28 Gün</span>
                <span className="text-2xl font-bold text-gray-900 tabular-nums">38,8K</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Önceki 28 Gün</span>
                <span className="text-xl font-semibold text-gray-500 tabular-nums">32,1K</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <TrendingUp size={13} />
                  +20,9%
                </span>
              </div>
            </div>

            {/* Mini comparison chart */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-24 relative">
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                  {/* Previous 28 days — dashed line */}
                  <polyline
                    points={(() => {
                      const pts: string[] = [];
                      for (let i = 0; i < 28; i++) {
                        const x = 2 + (i / 27) * 96;
                        const base = 32 + Math.sin(i * 0.4) * 1.2;
                        const y = 48 - ((base - 30) / 12) * 44;
                        pts.push(`${x},${y}`);
                      }
                      return pts.join(' ');
                    })()}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3,2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* Last 28 days — solid line */}
                  <polyline
                    points={(() => {
                      const pts: string[] = [];
                      for (let i = 0; i < 28; i++) {
                        const x = 2 + (i / 27) * 96;
                        let val = 32 + Math.sin(i * 0.35) * 1.0;
                        if (i > 14) val += (i - 14) * 0.35;
                        if (i > 22) val += (i - 22) * 0.25;
                        const y = 48 - ((val - 30) / 12) * 44;
                        pts.push(`${x},${y}`);
                      }
                      return pts.join(' ');
                    })()}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                  <span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> Son 28 Gün
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                  <span className="w-3 h-0.5 border-t border-dashed border-gray-400 inline-block" /> Önceki 28 Gün
                </span>
              </div>
            </div>
          </div>

          {/* Generative AI blog visibility */}
          <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between gap-3 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-slate-700">Generative AI'da impressionlarda öne çıkan bloglar</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Google Search Console — Top pages</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-full whitespace-nowrap">En yüksek impression</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                ['Eczane Kaçta Kapanır ve Açılır?', 'https://www.happ.health/blog/eczane-kacta-kapanir-ve-acilir', '4.684'],
                ['Hazır Salgam Suyunun Zararları Nelerdir?', 'https://www.happ.health/blog/hazir-salgam-suyunun-zararlari-nelerdir', '3.013'],
                ['Renkli Reçete Sistemi: Yeşil, Sarı, Kırmızı Reçeteler', 'https://www.happ.health/blog/renkli-recete-sistemi-yesil-sari-kirmizi-receteler', '2.197'],
                ['Duty Pharmacy / Ar', 'https://www.happ.health/duty-pharmacy/ar', '2.045'],
                ['Kan Grubu', 'https://www.happ.health/blog/kan-grubu', '2.020'],
                ['Göz Rengi Değiştirme Ameliyatı Mümkün mü?', 'https://www.happ.health/blog/goz-rengi-degistirme-ameliyati-mumkun-mu', '1.692'],
                ['Deniz Kestanesi Batmasına Nasıl Müdahale Edilmeli?', 'https://www.happ.health/blog/deniz-kestanesi-batmasina-nasil-mudahale-edilmeli', '1.594'],
                ['Nikotin Zehirlenmesi Nedir? Belirtileri ve Tedavisi', 'https://www.happ.health/blog/nikotin-zehirlenmesi-nedir-belirtileri-ve-tedavisi', '1.561'],
                ['Happ Health Ana Sayfa', 'https://www.happ.health/', '1.208'],
                ['Nöbetçi Eczane İstanbul / Bağcılar', 'https://www.happ.health/nobetci-eczane/istanbul/bagcilar', '1.191'],
                ['Açılmış İlaçların Kullanım Süreleri', 'https://www.happ.health/blog/acilmis-ilaclarin-kullanim-sureleri', '1.188'],
              ].map(([title, url, impressions], index) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                >
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">{index + 1}</span>
                  <span className="text-xs text-slate-600 group-hover:text-emerald-700 transition-colors truncate">{title}</span>
                  <span className="ml-auto text-xs font-semibold text-fuchsia-700 tabular-nums shrink-0">{impressions}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            <p className="text-xs text-emerald-700 leading-relaxed">
              Google Search görünürlüğü son 28 günde güçlendi. Toplam impression 32,1K'dan 38,8K'ya yükselerek önceki 28 günlük döneme göre yaklaşık %20,9 artış gösterdi. Özellikle dönemin son günlerinde görünürlük artışının hızlandığı görülüyor.
            </p>
            <p className="text-xs text-emerald-600/80 leading-relaxed mt-1.5">
              Bu gelişim organik görünürlük açısından pozitif bir sinyal; click ve CTR değişimiyle birlikte değerlendirilerek artan impression hacminin trafiğe ne ölçüde yansıdığı takip edilmeli.
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              <span className="font-semibold">Not:</span> SEO performansı yalnızca ortalama pozisyona göre değil, gösterim (impression) ve tıklama (click) artışı üzerinden değerlendirilmelidir.
            </p>
          </div>
        </div>
      </section>

      {/* Trend + Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Monthly Trend Table + Chart */}
        <div className="xl:col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                <BarChart2 size={15} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Aylık Trend</p>
                <p className="text-xs text-gray-400">Ekim — Ağustos performans özeti</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-16 mb-4 relative">
              <MiniLineChart />
              <div className="absolute top-0 right-0 flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> Impressions</span>
                <span className="flex items-center gap-1 text-[10px] text-blue-600 font-medium"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> Clicks</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Ay</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Impressions</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">CTR</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Avg. Pos.</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[...MONTHLY_TREND].reverse().map((row, i) => {
                    const isMart = row.month === 'Mart';
                    const isOcak = row.month === 'Ocak';
                    const isSubat = row.month === 'Şubat';
                    const isAgustos = row.month === 'Ağustos';
                    const isTemmuz = row.month === 'Temmuz';
                    return (
                      <tr key={i} className={`border-t border-gray-100 ${isAgustos ? 'bg-blue-50/60' : isMart ? 'bg-emerald-50/40' : isOcak ? 'bg-blue-50/40' : isSubat ? 'bg-amber-50/40' : 'hover:bg-gray-50/60'} transition-colors`}>
                        <td className="px-3 py-2.5 font-semibold text-gray-700">
                          <div className="flex items-center gap-1.5">
                            {row.month}
                            {isAgustos && <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-full">SON AY</span>}
                            {isMart && !isAgustos && <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">EN YÜKSEK IMP.</span>}
                            {isOcak && <span className="text-[9px] bg-blue-100 text-blue-600 font-bold px-1.5 py-0.5 rounded-full">EN YÜKSEK CLICK</span>}
                            {isSubat && <span className="text-[9px] bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded-full">GEÇİCİ DÜŞÜŞ</span>}
                          </div>
                        </td>
                        <td className={`px-3 py-2.5 text-right tabular-nums font-semibold ${isAgustos ? 'text-blue-700' : isOcak ? 'text-blue-600' : 'text-gray-700'}`}>{row.clicks.toLocaleString('tr-TR')}</td>
                        <td className={`px-3 py-2.5 text-right tabular-nums font-semibold ${isMart ? 'text-emerald-600' : 'text-gray-700'}`}>{row.impressions.toLocaleString('tr-TR')}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-gray-700">{row.ctr.toFixed(2)}%</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-gray-700">{row.position.toFixed(2)}</td>
                        <td className="px-3 py-2.5 text-left tabular-nums text-gray-400 text-[11px]">{row.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights + Drop Analysis */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          {/* SEO Insights */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                <Lightbulb size={15} className="text-amber-500" />
              </div>
              <p className="text-sm font-semibold text-gray-800">SEO İçgörüleri</p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                'SEO görünürlüğü artıyor',
                'Mart ayında en yüksek impression değerine ulaşıldı',
                'CTR düşüşü SEO performans düşüşü anlamına gelmez',
                'Yeni içerik üretimi sayesinde daha fazla sorguda görünürlük artıyor',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[9px]">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-1">Ağustos 2026 Değerlendirmesi</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Ağustos ayında organik arama performansı Temmuz'a kıyasla büyük ölçüde stabil kaldı. Click hacmi %2,8, impression hacmi ise %4,0 gerilerken CTR %0,6 seviyesini korudu. Ortalama pozisyon 9,0'dan 9,3'e sınırlı şekilde geriledi.
              </p>
            </div>
            <div className="mt-2 bg-blue-50 rounded-xl p-3 border border-blue-100">
              <p className="text-xs text-blue-700 leading-relaxed">
                Temmuz'daki daha sert görünürlük kaybının ardından Ağustos'ta düşüş hızının belirgin şekilde yavaşlaması olumlu bir stabilizasyon sinyali. Bununla birlikte impression ve average position tarafındaki sınırlı gerileme nedeniyle organik görünürlüğün henüz tam olarak toparlandığı söylenemez.
              </p>
            </div>
            <div className="mt-2 bg-slate-800 rounded-xl p-3 border border-slate-700">
              <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Yönetim Özeti</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Ağustos SEO performansı Temmuz'a göre stabilizasyon gösterdi. Click ve impression kaybı düşük tek haneli seviyelere inerken CTR korundu. Ortalama pozisyondaki 0,3 puanlık gerileme ise görünürlük tarafında hâlâ optimizasyon alanı bulunduğunu gösteriyor.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Category Performance */}
      <section>
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileText size={14} className="text-gray-400" />
          Kategori Performansı
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => {
            const c = catColorMap[cat.color];
            const isNobetci = cat.name === 'Nöbetçi Eczane';
            const nobetci = isNobetci ? (cat as typeof cat & { avgPosition: number; query: number; landingPage: number; changes: Record<string, number>; comment2: string }) : null;
            const fmtChange = (v: number) => {
              const sign = v > 0 ? '+' : '';
              return `${sign}${v.toFixed(1)}%`;
            };
            return (
              <div key={cat.name} className={`bg-white rounded-2xl border ${c.border} shadow-sm p-5 flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {'period' in cat && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>{cat.period}</span>
                    )}
                    <button
                      onClick={() => setActiveModal(cat)}
                      className={`w-7 h-7 rounded-lg ${c.bg} ${c.text} flex items-center justify-center hover:opacity-80 transition-opacity`}
                      title="Detayları Gör"
                    >
                      <Info size={13} />
                    </button>
                  </div>
                </div>
                {isNobetci && nobetci ? (
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Clicks</span>
                        <span className={`text-sm font-bold ${c.text}`}>{cat.clicks.toLocaleString('tr-TR')}</span>
                        <span className={`text-[10px] font-semibold ${nobetci.changes.clicks >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{fmtChange(nobetci.changes.clicks)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Impr.</span>
                        <span className={`text-sm font-bold ${c.text}`}>{(cat.impressions / 1000000).toFixed(1)}M</span>
                        <span className={`text-[10px] font-semibold ${nobetci.changes.impressions >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{fmtChange(nobetci.changes.impressions)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">CTR</span>
                        <span className={`text-sm font-bold ${c.text}`}>{cat.ctr.toFixed(2)}%</span>
                        <span className={`text-[10px] font-semibold ${nobetci.changes.ctr >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{fmtChange(nobetci.changes.ctr)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Avg. Pos.</span>
                        <span className={`text-sm font-bold ${c.text}`}>{nobetci.avgPosition.toFixed(2)}</span>
                        <span className={`text-[10px] font-semibold ${nobetci.changes.avgPosition <= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>{fmtChange(nobetci.changes.avgPosition)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Query</span>
                        <span className={`text-sm font-bold ${c.text}`}>{nobetci.query.toLocaleString('tr-TR')}</span>
                        <span className="text-[10px] text-emerald-500 font-semibold">{fmtChange(nobetci.changes.query)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Land. Page</span>
                        <span className={`text-sm font-bold ${c.text}`}>{nobetci.landingPage.toLocaleString('tr-TR')}</span>
                        <span className="text-[10px] text-red-500 font-semibold">{fmtChange(nobetci.changes.landingPage)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className={`grid gap-2 ${'extra' in cat && cat.extra ? 'grid-cols-4' : 'grid-cols-3'}`}>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Clicks</span>
                        <span className={`text-sm font-bold ${c.text}`}>{cat.clicks.toLocaleString('tr-TR')}</span>
                        {'prev' in cat && cat.prev && (() => {
                          const chg = Math.round(((cat.clicks - cat.prev.clicks) / cat.prev.clicks) * 100);
                          return <span className={`text-[10px] font-semibold ${chg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{chg > 0 ? '+' : ''}{chg}%</span>;
                        })()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Impr.</span>
                        <span className={`text-sm font-bold ${c.text}`}>{cat.impressions >= 1000 ? (cat.impressions / 1000).toFixed(0) + 'K' : cat.impressions}</span>
                        {'prev' in cat && cat.prev && (() => {
                          const chg = Math.round(((cat.impressions - cat.prev.impressions) / cat.prev.impressions) * 100);
                          return <span className={`text-[10px] font-semibold ${chg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{chg > 0 ? '+' : ''}{chg}%</span>;
                        })()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">CTR</span>
                        <span className={`text-sm font-bold ${c.text}`}>{cat.ctr.toFixed(2)}%</span>
                        {'prev' in cat && cat.prev && (() => {
                          const chg = Math.round(((cat.ctr - cat.prev.ctr) / cat.prev.ctr) * 100);
                          return <span className={`text-[10px] font-semibold ${chg >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{chg > 0 ? '+' : ''}{chg}%</span>;
                        })()}
                      </div>
                      {'extra' in cat && cat.extra && (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{cat.extra.label}</span>
                          <span className={`text-sm font-bold ${c.text}`}>{cat.extra.value}</span>
                        </div>
                      )}
                    </div>
                    {'prev' in cat && cat.prev && 'prevPeriod' in cat && (
                      <p className="text-[10px] text-gray-400">Önceki ay: <span className="font-medium text-gray-500">{String(cat.prevPeriod)}</span> · Clicks {cat.prev.clicks.toLocaleString('tr-TR')} · Impr. {cat.prev.impressions >= 1000 ? (cat.prev.impressions / 1000).toFixed(0) + 'K' : cat.prev.impressions} · CTR {cat.prev.ctr.toFixed(2)}%</p>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{cat.comment}</p>
                {isNobetci && nobetci?.comment2 && (
                  <p className="text-xs text-gray-400 leading-relaxed">{nobetci.comment2}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Nobetci Eczane Note */}
        <div className="mt-4 bg-slate-800 rounded-2xl px-5 py-4 flex gap-3 items-start">
          <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
            <Search size={13} className="text-slate-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Nöbetçi Eczane — Google Değişikliği</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Google, nöbetçi eczane sorgularında harita ve doğrudan sonuçları öne çıkarmaktadır. Bu durum organik sonuçların daha aşağıda görünmesine neden olur ve CTR düşüşü yaratır. Bu durum siteye özel değil, global bir değişimdir.
            </p>
          </div>
        </div>
      </section>

      {/* Ortalama Pozisyon Paradoksu */}
      <section>
        <button
          onClick={() => setParadoksOpen(o => !o)}
          className="w-full text-left"
        >
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2 hover:text-gray-900 transition-colors">
            <TrendingUp size={14} className="text-gray-400" />
            Ortalama Pozisyon Paradoksu
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${paradoksOpen ? 'rotate-180' : ''}`} />
          </h2>
        </button>

        {paradoksOpen && (
        <div className="flex flex-col gap-4">

          {/* Subtitle */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                <TrendingDown size={15} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Ağustos 2026 SEO Düşüşü — Kök Neden Analizi</p>
                <p className="text-xs text-gray-400 mt-0.5">Organik trafik, sıralama ve görünürlük kaybının çok boyutlu incelenmesi</p>
              </div>
            </div>
          </div>

          {/* 1 — Trend Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">1 — Trend Summary</p>
            <div className="overflow-x-auto rounded-xl border border-gray-100 mb-3">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Ay</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Organik Trafik</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">SEMrush Rank</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Top 3 Keyword</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Top 4–10 Keyword</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { month: 'Şubat 2026', traffic: '444.091', rank: '1.218', top3: '1.469', top410: '13.572', highlight: false },
                    { month: 'Mart 2026', traffic: '337.584', rank: '1.335', top3: '1.324', top410: '12.930', highlight: false },
                    { month: 'Nisan 2026', traffic: '346.877', rank: '1.331', top3: '1.095', top410: '11.806', highlight: false },
                    { month: 'Mayıs 2026', traffic: '304.488', rank: '1.425', top3: '1.034', top410: '11.709', highlight: false },
                    { month: 'Haziran 2026', traffic: '301.335', rank: '1.419', top3: '822', top410: '11.148', highlight: false },
                    { month: 'Temmuz 2026', traffic: '330.941', rank: '1.348', top3: '586', top410: '9.096', highlight: false },
                    { month: 'Ağustos 2026', traffic: '229.961', rank: '1.855', top3: '418', top410: '8.284', highlight: true },
                  ].map((row, i) => (
                    <tr key={i} className={`border-t border-gray-100 ${row.highlight ? 'bg-red-50/50' : 'hover:bg-gray-50/60'} transition-colors`}>
                      <td className="px-3 py-2.5 font-semibold text-gray-700">
                        <div className="flex items-center gap-1.5">
                          {row.month}
                          {row.highlight && <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">DÜŞÜŞ</span>}
                        </div>
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums font-semibold ${row.highlight ? 'text-red-600' : 'text-gray-700'}`}>{row.traffic}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.rank}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.top3}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-gray-600">{row.top410}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Şubat → Ağustos Organik Trafik', value: '~-%48', color: 'bg-red-50 text-red-700 border-red-100' },
                { label: 'Temmuz → Ağustos Organik Trafik', value: '~-%30', color: 'bg-red-50 text-red-700 border-red-100' },
                { label: 'Şubat → Ağustos Top 3 Keyword', value: '~-%72', color: 'bg-red-50 text-red-700 border-red-100' },
                { label: 'SEMrush Rank', value: '1.348 → 1.855', color: 'bg-amber-50 text-amber-700 border-amber-100' },
              ].map((c, i) => (
                <span key={i} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${c.color}`}>
                  {c.label}: <span className="font-bold">{c.value}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 2 — Ana Nedenler */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">2 — Ana Nedenler</p>

            {/* Neden 1 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <p className="text-xs font-bold text-gray-800">Nöbetçi Eczane Sayfalarında Sıralama Kaybı</p>
                <span className="text-[9px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">En yüksek trafik etkisi</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100 mb-2">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Keyword</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Search Volume</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Previous Rank</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Current Rank / Movement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { kw: 'nöbetçi eczane antalya', vol: '74.000', prev: '8', curr: '9 / 19 / 33' },
                      { kw: 'ankara nöbetçi eczane', vol: '60.500', prev: '10', curr: '16' },
                      { kw: 'nöbetçi eczane şanlıurfa', vol: '33.100', prev: '8', curr: '12' },
                      { kw: 'bağcılar nöbetçi eczane', vol: '22.200', prev: '4', curr: '8' },
                      { kw: 'pendik nöbetçi eczaneler', vol: '5.400', prev: '5', curr: '13' },
                      { kw: 'nöbetçi eczane ısparta', vol: '12.100', prev: '14', curr: '23' },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                        <td className="px-3 py-2 font-medium text-gray-700">{row.kw}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-600">{row.vol}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-500">{row.prev}</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-red-600">{row.curr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 mb-2">
                <p className="text-[10px] font-bold text-amber-700 mb-0.5 flex items-center gap-1.5"><AlertTriangle size={11} /> Keyword Cannibalization Riski</p>
                <p className="text-[10px] text-amber-700 leading-relaxed">Özellikle 'nöbetçi eczane antalya' sorgusunda aynı domain'e ait birden fazla URL'nin aynı anda sıralanması, canonical / targeting tarafında sinyal çakışması olabileceğini gösteriyor.</p>
              </div>
            </div>

            {/* Neden 2 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <p className="text-xs font-bold text-gray-800">Tamamen / Belirgin Şekilde Kaybedilen Keyword'ler</p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100 mb-2">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Keyword</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Volume</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Previous Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { kw: 'eczaneler saat kaçta kapanıyor', vol: '12.100', prev: '14' },
                      { kw: 'istasyon eczanesi', vol: '3.600', prev: '10' },
                      { kw: 'eczane beyaz', vol: '1.000', prev: '10' },
                      { kw: 'tavşanlı nöbetçi eczane', vol: '6.600', prev: '62' },
                      { kw: 'psikolog instagram', vol: '260', prev: '28' },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                        <td className="px-3 py-2 font-medium text-gray-700">{row.kw}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-600">{row.vol}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-500">{row.prev}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                <p className="text-[10px] text-gray-600 leading-relaxed">Bu sorgulardaki görünürlük kaybı hem yüksek hacimli hem long-tail trafik potansiyelini aşağı çekiyor.</p>
              </div>
            </div>

            {/* Neden 3 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <p className="text-xs font-bold text-gray-800">Şubat'tan Beri Süren Genel Görünürlük Kaybı</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">Top 3 Keyword: 1.469 → 418 ≈ -%72</span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">Top 4–10 Keyword: 13.572 → 8.284 ≈ -%39</span>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 mb-2">
                <p className="text-[10px] text-gray-600 leading-relaxed">Bu eğilim Ağustos'a özgü ani bir kayıptan çok, site genelinde aylardır süren görünürlük erimesine işaret ediyor.</p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                <p className="text-[10px] text-amber-700 leading-relaxed">Olası algoritmik etki / site-wide quality reevaluation ayrıca Google update tarihleri ve Search Console verileriyle doğrulanmalı.</p>
              </div>
            </div>
          </div>

          {/* 3 — SEO Kurtarma ve Büyüme Planı */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">3 — SEO Kurtarma ve Büyüme Planı</p>

            {/* Bu Hafta */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">BU HAFTA</span>
                <p className="text-xs font-bold text-gray-800">Canonical & Cannibalization Temizliği</p>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full">Etki: Çok yüksek</span>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 mb-2">
                <ul className="flex flex-col gap-1">
                  {['Her şehir / ilçe için ana canonical URL\'yi belirle', 'Duplicate URL\'leri tespit et', 'Uygun yerlerde rel=canonical kullan', 'Birleştirilebilen duplicate sayfaları 301 ile konsolide et', 'Internal linkleri canonical sayfaya yönlendir'].map((a, i) => (
                    <li key={i} className="text-[10px] text-gray-600 flex items-start gap-1.5">
                      <CheckCircle size={10} className="text-gray-400 shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="text-[9px] text-gray-500 font-medium">Öncelikli keywordler:</span>
                {['nöbetçi eczane antalya', 'nöbetçi eczane mersin', 'nöbetçi eczane erzurum', 'nöbetçi eczane esenyurt'].map((k, i) => (
                  <span key={i} className="text-[9px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full">{k}</span>
                ))}
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                <p className="text-[10px] text-emerald-700 leading-relaxed"><span className="font-semibold">Tahmini potansiyel trafik etkisi: +40–60K</span> <span className="text-emerald-500">(tahmin, garanti değil)</span></p>
              </div>
            </div>

            {/* Bu Ay — İçerik */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">BU AY</span>
                <p className="text-xs font-bold text-gray-800">Nöbetçi Eczane İçeriklerini Güçlendir</p>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 mb-2">
                <p className="text-[10px] text-gray-600 leading-relaxed mb-1.5">Her şehir sayfasına özgün, sabit editoryal içerik eklenmeli. <span className="font-semibold">200–300 kelime</span></p>
                <div className="flex flex-wrap gap-1.5">
                  {['şehirde nöbet sistemi', '24 saat çalışma yapısı', 'ilçe bazlı erişim', 'kullanıcıların bilmesi gerekenler', 'güncellik / veri kaynağı bilgisi'].map((f, i) => (
                    <span key={i} className="text-[9px] text-gray-600 bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                <p className="text-[10px] text-gray-600 leading-relaxed">Hedef: <span className="font-semibold">Thin-content riskini azaltmak ve local intent sinyallerini güçlendirmek.</span></p>
              </div>
            </div>

            {/* Bu Ay — Blog Keyword */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">BU AY</span>
                <p className="text-xs font-bold text-gray-800">Kaybedilen Blog Keyword'lerini Kurtar</p>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 mb-2">
                <p className="text-[10px] text-gray-600 mb-1"><span className="font-semibold text-gray-700">"eczaneler saat kaçta kapanıyor"</span> — Volume: 12.100, Previous Rank: 14</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Title', 'H1', 'Meta description', 'Content refresh', 'Last updated date', 'Internal linking'].map((a, i) => (
                    <span key={i} className="text-[9px] text-gray-600 bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                <p className="text-[10px] text-emerald-700 leading-relaxed"><span className="font-semibold">+10–15K potansiyel trafik</span> <span className="text-emerald-500">(tahmin)</span></p>
              </div>
            </div>

            {/* Top Pozisyonları Koru */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">BU AY</span>
                <p className="text-xs font-bold text-gray-800">Top Pozisyonları Koru</p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100 mb-2">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Keyword</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Current Rank</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Volume</th>
                      <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { kw: 'nöbetçi eczane kadıköy', rank: '#2', vol: '12.100', pri: 'Koru', priColor: 'text-emerald-700 bg-emerald-50' },
                      { kw: 'beylikdüzü nöbetçi eczane', rank: '#5', vol: '27.100', pri: 'Koru', priColor: 'text-emerald-700 bg-emerald-50' },
                      { kw: 'ataşehir nöbetçi eczane', rank: '#5', vol: '22.200', pri: 'Koru', priColor: 'text-emerald-700 bg-emerald-50' },
                      { kw: 'esenyurt nöbetçi eczane', rank: '#6', vol: '40.500', pri: 'Koru', priColor: 'text-emerald-700 bg-emerald-50' },
                      { kw: 'nöbetçi eczane istanbul', rank: '#7', vol: '60.500', pri: 'Kritik', priColor: 'text-red-700 bg-red-50' },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                        <td className="px-3 py-2 font-medium text-gray-700">{row.kw}</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-gray-700">{row.rank}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-600">{row.vol}</td>
                        <td className="px-3 py-2 text-right"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${row.priColor}`}>{row.pri}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Internal link güçlendirme', 'Mobile performance', 'Core Web Vitals', 'Canonical', 'Content freshness', 'Structured data kontrolü'].map((a, i) => (
                  <span key={i} className="text-[9px] text-gray-600 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 — Cloudflare / Teknik Kontroller */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">4 — Cloudflare / Teknik Kontroller</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* WAF / Bot Access */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                <p className="text-[11px] font-bold text-gray-700 mb-2">WAF / Bot Access</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'].map((b, i) => (
                    <span key={i} className="text-[9px] text-gray-600 bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">{b}</span>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">Cloudflare WAF tarafında bloklanıp bloklanmadıkları kontrol edilmeli.</p>
              </div>
              {/* Cache Rules */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                <p className="text-[11px] font-bold text-gray-700 mb-2">Cache Rules</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {['Dynamic page cache', 'TTL', 'Stale content', 'Freshness'].map((c, i) => (
                    <span key={i} className="text-[9px] text-gray-600 bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">Dinamik nöbetçi eczane verisinin Google'a eski içerik olarak sunulmadığı doğrulanmalı.</p>
              </div>
              {/* Speed / CWV */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                <p className="text-[11px] font-bold text-gray-700 mb-2">Speed / Core Web Vitals</p>
                <div className="flex flex-wrap gap-1.5">
                  {['LCP', 'INP', 'CLS', 'Mobile perf.', 'Origin latency'].map((s, i) => (
                    <span key={i} className="text-[9px] text-gray-600 bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5 — Priority Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">5 — Priority Summary</p>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Expected Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pri: 'Bu hafta', priColor: 'bg-red-100 text-red-700', action: 'Canonical / cannibalization temizliği', impact: 'Çok yüksek', impactColor: 'text-red-600 font-semibold' },
                    { pri: 'Bu ay', priColor: 'bg-amber-100 text-amber-700', action: 'Nöbetçi Eczane şehir içeriklerinin güçlendirilmesi', impact: 'Yüksek', impactColor: 'text-amber-600 font-semibold' },
                    { pri: 'Bu ay', priColor: 'bg-amber-100 text-amber-700', action: 'Kaybedilen blog keyword\'lerinin güncellenmesi', impact: 'Orta–Yüksek', impactColor: 'text-amber-600 font-semibold' },
                    { pri: 'Sonraki adım', priColor: 'bg-emerald-100 text-emerald-700', action: 'Cloudflare bot / cache / CWV kontrolleri', impact: 'Teknik risk azaltma', impactColor: 'text-gray-600' },
                    { pri: 'Sonraki adım', priColor: 'bg-emerald-100 text-emerald-700', action: 'Şehir landing page structured-data iyileştirmeleri', impact: 'SEO görünürlüğü desteği', impactColor: 'text-gray-600' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                      <td className="px-3 py-2.5"><span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${row.priColor}`}>{row.pri}</span></td>
                      <td className="px-3 py-2.5 text-gray-700 font-medium">{row.action}</td>
                      <td className={`px-3 py-2.5 text-right tabular-nums ${row.impactColor}`}>{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6 — Final Management Summary */}
          <div className="rounded-2xl bg-slate-800 p-5">
            <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-2">Final Management Summary</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Ağustos'taki SEO kaybı tek bir metriğe bağlı görünmüyor. En büyük kısa vadeli risk, yüksek trafik taşıyan Nöbetçi Eczane sorgularındaki sıralama kayıpları ve aynı sorguda birden fazla URL'nin görünmesi. Bunun yanında Şubat'tan beri Top 3 ve Top 10 görünürlüğündeki sürekli erime, site genelinde daha geniş kapsamlı bir SEO kalite / otorite problemi olabileceğine işaret ediyor.
            </p>
            <div className="pt-3 border-t border-slate-700">
              <p className="text-xs text-slate-400 leading-relaxed">
                Öncelik sırası; cannibalization ve canonical problemlerinin çözülmesi, Nöbetçi Eczane şehir sayfalarının içerik açısından güçlendirilmesi ve kaybedilen yüksek hacimli keyword'lerin geri kazanılması olmalı. Teknik tarafta Cloudflare, caching ve Core Web Vitals kontrolleri paralel yürütülmeli.
              </p>
            </div>
          </div>

        </div>
        )}
      </section>

    </div>
  );
}
