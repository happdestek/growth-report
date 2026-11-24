import { AlertTriangle, BarChart2 } from 'lucide-react';

const SUMMARY_CARDS = [
  {
    title: 'Genel Tablo',
    value: '-%27',
    subtitle: 'Kasım 2026 · 1–24 Kasım vs 1–24 Ekim',
    detail: '11,4K tıklama (Ekim: 15,7K). Gösterim 2,39M → 1,32M (-%45), CTR %0,7 → %0,9, ortalama konum 9,9 → 10,3.',
    color: 'blue',
  },
  {
    title: 'Site Geneli Hariç',
    value: '-%13',
    subtitle: 'TR Nöbetçi Eczane hariç',
    detail: "Ekim'de TR Nöbetçi Eczane hariç site +%18 büyümüştü. Kasım'da aynı kesim 10,4K → 9,0K'ya geriledi.",
    color: 'emerald',
  },
  {
    title: 'Teknik Sinyal',
    value: 'TR ilçe sayfaları',
    subtitle: 'Görünürlük kaybı + sıralama kararsızlığı',
    detail: 'TR nöbetçi eczane gösterimi 1,76M → 820K. Jenerik sorgularda rastgele şehir sayfaları dönüyor.',
    color: 'amber',
  },
] as const;

const WEEKLY_TREND = [
  { label: '27 Eki–2 Kas', value: 4779 },
  { label: '3–9 Kas', value: 3935 },
  { label: '10–16 Kas', value: 3476 },
  { label: '17–23 Kas', value: 2621 },
];

const CATEGORY_ROWS = [
  ['TR Nöbetçi Eczane', '5.260', '2.360', '-%55', '820K (-%53)', '9,5 → 9,6'],
  ['AR Nöbetçi Eczane', '5.860', '4.900', '-%16', '55,7K (-%14)', '5,3 → 5,2'],
  ['Online Doctor', '2.250', '2.050', '-%9', '138K (+%28)', '9,8 → 9,4'],
  ['RU Nöbetçi Eczane', '912', '657', '-%28', '9,8K (-%40)', '6,3 → 5,8'],
  ['/tr Blog', '451', '557', '+%24', '232K (+%60)', '12,7 → 12,7'],
  ['EN Duty Pharmacy', '255', '146', '-%43', '32,2K (-%58)', '7,8 → 7,8'],
  ['/tr Homepage', '248', '157', '-%37', '2,3K (-%29)', '4,2 → 5,4'],
  ['Check-Up', '128', '109', '-%15', '4,1K (+%7)', '8,5 → 8,8'],
  ['Evde Sağlık', '91', '97', '+%7', '6,1K (+%36)', '10,4 → 13,2'],
];

const CRITICAL_PAGES = [
  ['Sarıyer', '72 → 18', '13,4K → 8,1K', '7,2 → 8,0'],
  ['Elmalı', '78 → 20', '4,0K → 2,5K', '5,5 → 7,0'],
  ['Kahta', '141 → 62', '4,2K → 3,8K', '5,5 → 5,1'],
  ['Arabic Osmangazi', '138 → 72', '1,3K → 1,0K', '3,9 → 4,0'],
];

const DISTRICT_QUERIES = [
  ['nöbetçi eczane istanbul', '16.841 → 1.391', '9 → 1'],
  ['beylikdüzü nöbetçi eczane', '12.153 → 1.700', '33 → 0'],
  ['sultangazi nöbetçi eczane', '10.399 → 1.811', '10 → 1'],
  ['esenyurt nöbetçi eczane', '5.827 → 439', '6 → 0'],
  ['sarıyer nöbetçi eczane', '4.722 → 1.510', '21 → 1'],
  ['pendik nöbetçi eczane', '887 → 6.296', '1 → 2'],
  ['sultanbeyli nöbetçi eczane', '534 → 2.794', '0 → 1'],
];

const SEMRUSH_ROWS = [
  ['nöbetçi eczaneler', '86', '14', '+72'],
  ['açık eczane', '65', '15', '+50'],
  ['en yakın eczane', '30', '13', '+17'],
  ['nöbetçi eczane (1,8M)', '—', '31', 'giriş'],
  ['istanbul nöbetçi eczane', '10', '11', '-1'],
  ['bursa nöbetçi eczane', '11', '26', '-15'],
  ['ankara nöbetçi eczane', '18', '36', '-18'],
  ['adana nöbetçi eczane', '13', '33', '-20'],
  ['antalya nöbetçi eczane', '11', '43', '-32'],
];

const SERVICE_ROWS = [
  ['check up (22K)', '79', '16', '+63'],
  ['online psikolog (14,8K)', '79', '42', '+37'],
  ['online doktor', '69', '28', '+41'],
  ['evde kan tahlili', '91', '14', '+77'],
  ['nöbetçi eczane esenyurt (22K)', '—', '13', 'giriş'],
  ['online diyetisyen', '—', '24', 'giriş'],
  ['evde hemşire', '17', '31', '-14'],
  ['evde serum (3,6K)', '22', '—', 'çıktı'],
  ['grip aşısı (8,1K)', '52', '—', 'çıktı'],
];

const ACTIONS = [
  {
    title: 'Blog İçerik Üretimi',
    status: 'ACTIVE · ÇALIŞIYOR',
    text: '/tr Blog gösterimi 145K → 232K (+%60), tıklama 451 → 557 (+%24). Kasım\'ın tek büyüyen Türkçe alanı.',
    detail: 'Sonraki adım: CTR %0,2 — gösterim kazanan yazıların başlık/meta\'sını sorguya göre yeniden yaz.',
  },
  {
    title: 'Nöbetçi Eczane — App Conversion',
    status: 'LIVE',
    text: "Happ uygulamasına yönlendiren pop-up canlı. Ekim'de yaklaşık 1,1K request alındı.",
    detail: 'Kasım pop-up request sayısı güncellenecek. Organik TR nöbetçi eczane tıklaması %55 düştüğü için beslenen trafik de daraldı.',
  },
  {
    title: 'Nöbetçi Eczane — Paid SEO Support',
    status: 'ACTIVE',
    text: 'Esenyurt, Pendik, Sultanbeyli ve Kartal\'da Google Ads desteği sürüyor.',
    detail: 'Gösterim artan ilçelerde organik tık hâlâ 1–2. Ads\'in organik görünürlüğe etkisi şimdilik gösterim düzeyinde.',
  },
  {
    title: 'TR İlçe Sayfaları Teknik İnceleme',
    status: 'YENİ · ARALIK',
    text: 'GSC sayfa dizine ekleme ve tarama istatistikleriyle Kasım\'daki tarama/indeks değişimi incelenecek.',
    detail: 'Canonical, hreflang, iç link yapısı ve jenerik sorgular için tek hedef sayfa kontrol edilecek.',
  },
  {
    title: 'Check-Up Yamyamlaşması',
    status: 'YENİ · ARALIK',
    text: '“check up” 16. sıraya blog yazısıyla çıktı; /tr/check-up ürün sayfası 80. sırada.',
    detail: 'Blogdan ürün sayfasına güçlü iç link ve ürün sayfasında içerik derinliği artırılacak.',
  },
];

const NEXT_ACTIONS = [
  'TR Nöbetçi Eczane sayfalarında canonical, noindex, template ve internal linking kontrollerini tamamla.',
  'Organik görünürlük kaybeden şehir ve ilçe sayfalarını önceliklendirerek içerik ve teknik iyileştirme yap.',
  'Blog agent üzerinden yüksek impression ve yüksek potansiyelli konularda içerik üretimini ölçekle.',
  'Yüksek impression ancak düşük CTR alan bloglarda title ve meta optimizasyonu yap.',
  'Nöbetçi Eczane popup funnelını request → store → download → signup bazında ölç.',
  'Paid ile desteklenen bölgelerde organik sıralama toparlanmasını takip et.',
];

const cardColors = {
  blue: { border: 'border-blue-100', value: 'text-blue-700', bg: 'bg-blue-50' },
  emerald: { border: 'border-emerald-100', value: 'text-emerald-700', bg: 'bg-emerald-50' },
  amber: { border: 'border-amber-100', value: 'text-amber-700', bg: 'bg-amber-50' },
};

function SectionTitle({ children }: { children: string }) {
  return <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{children}</p>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map(header => <th key={header} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
              {row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className={`px-3 py-2.5 ${cellIndex === 0 ? 'font-semibold text-gray-700' : 'text-gray-600'} ${cellIndex > 0 ? 'text-right tabular-nums' : ''}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SeptemberAnalysis() {
  const maxWeeklyClicks = Math.max(...WEEKLY_TREND.map(item => item.value));

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0"><BarChart2 size={18} className="text-white" /></div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">Kasım 2026 SEO Durumu</h2>
            <p className="text-sm text-gray-400 mt-0.5">1–24 Kasım 2026 — Canlı Sonrası İkinci Ay</p>
            <p className="text-[11px] text-gray-400 mt-1.5">Ekim'de görülen “TR Nöbetçi Eczane dışında büyüme” sinyali Kasım'da durdu. Site geneli organik tıklama Ekim'in aynı 24 gününe göre %27 geriledi; kaybın merkezi yine Türkçe Nöbetçi Eczane sayfaları (-%55), ancak bu kez AR/RU sayfaları, ana sayfa ve Online Doktor da geriledi. Geçen yıl aynı dönemde site %7 gerilemişti; düşüş mevsimsel değil.</p>
            <p className="text-[10px] text-gray-300 mt-1">Kaynak: Google Search Console (1–24 Kasım vs 1–24 Ekim 2026; 24 Kasım verisi henüz işlenmedi) · Semrush Position Tracking</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUMMARY_CARDS.map(card => {
          const colors = cardColors[card.color];
          return <div key={card.title} className={`bg-white rounded-2xl border ${colors.border} shadow-sm p-5 flex flex-col gap-3`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.title}</p>
            <div className="flex flex-col gap-1"><span className={`text-2xl font-bold ${colors.value}`}>{card.value}</span><span className="text-sm font-semibold text-gray-500">{card.subtitle}</span></div>
            <p className="text-[11px] text-gray-500 leading-relaxed">{card.detail}</p>
          </div>;
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionTitle>Haftalık Trend · organik tıklama</SectionTitle>
          <div className="flex flex-col gap-3">
            {WEEKLY_TREND.map(week => <div key={week.label} className="flex items-center gap-3">
              <span className="text-[11px] font-semibold w-24 shrink-0 text-gray-500">{week.label}</span>
              <div className="flex-1 h-7 bg-gray-50 rounded-lg overflow-hidden"><div className="h-full rounded-lg bg-blue-500 flex items-center justify-end pr-2" style={{ width: `${(week.value / maxWeeklyClicks) * 100}%` }}><span className="text-[10px] font-bold text-white">{week.value.toLocaleString('tr-TR')}</span></div></div>
            </div>)}
          </div>
          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2"><p className="text-[11px] text-gray-600 leading-relaxed">Dört haftada kesintisiz düşüş: -%18, -%12, -%25. Hafta sonu zirveleri de her hafta küçülüyor.</p></div>
          <div className="mt-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2"><p className="text-[11px] text-blue-700 leading-relaxed">Günlük gösterim 1 Kasım'da 84,6K, 23 Kasım'da 27,8K. Ekim'deki “stabil hale geldi” okuması Kasım'da geçerli değil.</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionTitle>Mevsimsellik Doğrulaması — Ekim → Kasım</SectionTitle>
          <DataTable headers={['Segment', '2025', '2026', 'Yorum']} rows={[
            ['Total Site Clicks', '-%6,7', '-%27,4', 'Mevsimsellikten 4× kötü'],
            ['Total Site Impressions', '-%3,5', '-%44,8', 'Gerçek görünürlük kaybı'],
            ['TR Nöbetçi Eczane', '-%9,9', '-%55,1', 'Mevsimsel değil'],
            ['Arabic Duty Pharmacy', '+%11,3', '-%16,4', '2025’te büyürken geriledi'],
          ]} />
          <p className="text-[11px] text-gray-500 leading-relaxed mt-3">2025: 43,4K → 40,5K tıklama. 2026: 15,7K → 11,4K tıklama. Yıllık bazda Kasım tıklaması -%72.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionTitle>Kategori Performansı · tıklama, 1–24 Ekim → 1–24 Kasım</SectionTitle>
        <DataTable headers={['Section', 'Ekim', 'Kasım', 'Change', 'Gösterim Kas', 'Konum Eki → Kas']} rows={CATEGORY_ROWS} />
        <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2"><p className="text-[11px] text-emerald-700 leading-relaxed">/tr Blog gösterimi +%60, tıklaması +%24. Evde Sağlık tıklaması +%7. Blog ve Evde Sağlık gösterim kazanıyor ancak tıklamaya düşük oranda dönüyor.</p></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionTitle>Gerçek Kayıp — Kritik İlçe Sayfaları</SectionTitle>
        <DataTable headers={['Page', 'Click', 'Impressions', 'Position']} rows={CRITICAL_PAGES} />
        <div className="mt-4"><DataTable headers={['İstanbul ilçe sorguları (TR)', 'Gösterim Eki → Kas', 'Tık Eki → Kas']} rows={DISTRICT_QUERIES} /></div>
        <p className="text-[11px] text-gray-500 leading-relaxed mt-3">Sarıyer ve Elmalı Kasım'da da kaybetmeye devam etti. Pendik ve Sultanbeyli gösterim kazandı ancak organik tık getirmedi.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"><SectionTitle>Semrush Sıralama · 1 → 23 Kasım (TR)</SectionTitle><DataTable headers={['Kelime', '1 Kas', '23 Kas', 'Δ']} rows={SEMRUSH_ROWS} /></div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"><SectionTitle>Hizmet seti · mobil</SectionTitle><DataTable headers={['Kelime', '1 Kas', '23 Kas', 'Δ']} rows={SERVICE_ROWS} /><p className="text-[11px] text-gray-500 leading-relaxed mt-3">Check-up, online psikolog ve online doktor ilk 50'ye girdi. Büyük şehir kelimelerinde gerileme sürerken jenerik sorgularda yükseliş var.</p></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionTitle>5 — Aksiyon Takibi · Kasım durumu</SectionTitle>
        <div className="flex flex-col gap-2.5">
          {ACTIONS.map(action => <div key={action.title} className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
            <div className="flex items-center justify-between gap-3 mb-1.5"><p className="text-xs font-bold text-gray-800">{action.title}</p><span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">{action.status}</span></div>
            <p className="text-[11px] text-gray-600 leading-relaxed">{action.text}</p><p className="text-[10px] text-gray-400 leading-relaxed mt-1">{action.detail}</p>
          </div>)}
        </div>
        <div className="mt-5"><p className="text-xs font-bold text-gray-700 mb-3">Sıradaki Aksiyonlar</p><div className="flex flex-col gap-2">{NEXT_ACTIONS.map((action, index) => <div key={action} className="flex items-start gap-2.5 rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5"><span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-600 shrink-0">{index + 1}</span><p className="text-[11px] text-gray-700 leading-relaxed">{action}</p></div>)}</div></div>
      </div>

      <div className="rounded-2xl bg-slate-800 px-5 py-4 flex items-start gap-3"><AlertTriangle size={15} className="text-amber-300 shrink-0 mt-0.5" /><p className="text-[11px] text-slate-300 leading-relaxed">Kaynaklar: Google Search Console — www.happ.health, 1–24 Kasım 2026 vs 1–24 Ekim 2026. 24 Kasım verisi henüz işlenmedi; fiilen 23 gün. Mevsimsellik için 2025 karşılaştırması ve Semrush Position Tracking kullanıldı.</p></div>
    </div>
  );
}
