import {
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Clock,
  Info, Target, Wrench, Search, BarChart2, ArrowRight, ArrowDown,
} from 'lucide-react';

// ─── Data ───

const EXEC_CARDS = [
  { title: 'Genel Tablo', main: '-%28', secondary: 'Ekim 2026 · ilk tam ay', text: 'Ekim, 7 Eylül’deki canlıya çıkış sonrası ilk tam ay oldu. Toplam organik click canlı öncesi eşit 31 günlük döneme göre %28 geriledi. Ancak kaybın neredeyse tamamı Türkçe Nöbetçi Eczane sayfalarından geliyor.', color: 'blue' },
  { title: 'Site Geneli Hariç', main: '+%18', secondary: 'TR Nöbetçi Eczane hariç', status: 'Büyüme sinyali', text: 'TR Nöbetçi Eczane hariç tutulduğunda sitenin geri kalan organik trafiği canlı öncesine göre %18 büyüdü.', color: 'emerald' },
  { title: 'Teknik Sinyal', main: 'TR template', secondary: 'Strong technical / template signal', districts: ['/nobetci-eczane/', '/tr', 'Blog', 'Check-Up'], text: 'Düşüş Türkçe yapı üzerinde yoğunlaşırken yeni /tr yapı, Online Doktor, Blog, Check-Up ve yabancı dil alanlarında büyüme görüldü.', color: 'red' },
];

const KPI_COMPARISON = [
  { label: 'Tıklama', before: '25.100', after: '20.3K', raw: '-%17', adjusted: '-%28 vs pre-live', status: 'raw' },
  { label: 'Gösterim', before: '4,14M', after: '2,9M', raw: '-%30', adjusted: '-%37 vs pre-live', status: 'raw' },
  { label: 'CTR', before: '%0,6', after: '%0,7', raw: '+0,1 pp', adjusted: '+0,1 pp', status: 'stable' },
  { label: 'Avg. Position', before: '9,5', after: '10,0', raw: '+0,5 worse', adjusted: '+0,7 worse vs pre-live', status: 'slight' },
];

const WEEKLY_TREND = [
  { week: '24–30 Aug', clicks: 5625, highlight: false },
  { week: '31 Aug–6 Sep', clicks: 6191, highlight: false },
  { week: '7–13 Sep', clicks: 6332, highlight: true },
  { week: '14–20 Sep', clicks: 5354, highlight: false },
  { week: '21–26 Sep', clicks: 4261, highlight: false, partial: true },
];

const SEASONALITY = [
  { segment: 'Total Site Clicks', y2025: '-25,9%', y2026: '-10,8%', interp: 'Mevsimselden daha iyi', interpType: 'good' },
  { segment: 'Total Site Impressions', y2025: '-14,7%', y2026: '-10,0%', interp: 'Mevsimselden daha iyi', interpType: 'good' },
  { segment: 'TR Nöbetçi Eczane', y2025: '-29,6%', y2026: '-30,1%', interp: 'Büyük ölçüde mevsimsel', interpType: 'neutral' },
  { segment: 'Arabic Duty Pharmacy', y2025: '-21,2%', y2026: '-6,1%', interp: 'Belirgin şekilde daha iyi', interpType: 'good' },
  { segment: 'Dikili / Sarıyer / Tirebolu', y2025: '—', y2026: '—', interp: 'Mostly seasonal', interpType: 'neutral' },
  { segment: 'Ümraniye / Kaş / Silivri / Eyüp', y2025: '—', y2026: '—', interp: 'Gerçek kayıp', interpType: 'bad' },
  { segment: 'Beylikdüzü / Gürsu / Akçakale', y2025: '—', y2026: '—', interp: 'Gerçek kayıp', interpType: 'bad' },
];

const POSITIVE_SIGNALS = [
  { group: 'Online Doctor', change: '+77%' },
  { group: '/tr Blog', change: 'NEW · 638' },
  { group: 'Check-Up', change: '+76%' },
  { group: '/tr Homepage', change: '+6000%' },
  { group: 'AR / RU / EN Nöbetçi Eczane', change: '+3% click' },
];

const GROWING_SECTIONS = [
  ['TR Nöbetçi Eczane', '16.100', '6.280', '-61%'], ['AR Nöbetçi Eczane', '7.960', '8.180', '+3%'], ['Online Doctor', '1.550', '2.740', '+77%'], ['RU Nöbetçi Eczane', '935', '1.310', '+40%'], ['/tr Blog', '0', '638', 'NEW'], ['/tr Homepage', '5', '305', '+6000%'], ['Check-Up', '92', '162', '+76%'],
];

const WINNING_PAGES = [
  { page: '/tr', click: '5 → 305', imp: '—', pos: '4,9 → 4,2' },
  { page: '/duty-pharmacy/ar', click: '64 → 187', imp: '—', pos: '—' },
  { page: 'Arabic Şanlıurfa', click: '188 → 294', imp: '—', pos: '—' },
  { page: 'Arabic Bursa', click: '173 → 271', imp: '—', pos: '—' },
  { page: 'Nöbetçi Eczane İstanbul hub', click: '22 → 102', imp: '—', pos: '—' },
  { page: '/tr/check-up/medicalpark', click: '0 → 92', imp: '—', pos: '6,9' },
];

const LOSING_PAGES = [
  { page: 'Sarıyer', click: '316 → 81', pos: '5,8 → 7,5' },
  { page: 'Elmalı', click: '244 → 91', pos: '4,9 → 5,8' },
  { page: 'Kahta', click: '286 → 160', pos: '5,2 → 5,5' },
  { page: 'Arabic Osmangazi', click: '320 → 181', pos: '2,2 → 3,8' },
];

const OPPORTUNITIES = [
  { page: 'Istanbul hub', imp: '24,0K → 37,3K', clicks: '15 → 27', pos: '11,6 → 10,4', action: 'Title/meta + district internal linking' },
  { page: 'Gaziantep hub', imp: '1,2K → 7,7K', clicks: '0 → 15', pos: '21,6 → 11,7', action: 'Content depth / first-page push' },
  { page: 'Gaziantep Şahinbey', imp: '1,3K → 7,4K', clicks: '8 → 12', pos: '11,7 → 11,0', action: 'Hub internal linking' },
  { page: 'Bursa Osmangazi', imp: '5,1K → 10,1K', clicks: '11 → 15', pos: '10,9 → 10,8', action: 'First-page optimization' },
  { page: 'Idrar Yolu Enfeksiyonu blog', imp: '0 → 5,5K', clicks: '0 → 4', pos: '→ 4,8', action: 'CTR / title optimization' },
];

const TASKS = [
  { title: 'PRIORITY 1 — TR NÖBETÇİ ECZANE TECHNICAL REVIEW', status: 'CRITICAL / IN PROGRESS', statusType: 'progress' as const, badges: ['noindex', 'canonical', 'internal linking', 'SSR'], detail: '/nobetci-eczane/izmir/urkmez noindex örnekleri arasında görünüyor. Eski ve yeni template farkları karşılaştırılmalı.' },
  { title: 'PRIORITY 2 — URL MIGRATION / REDIRECT VALIDATION', status: 'CRITICAL / IN PROGRESS', statusType: 'progress' as const, badges: ['check-up-listesi → check-up', '301', '404'], detail: '301 redirect, final destination, 404 listesi ve eski migrate URL’ler doğrulanmalı.' },
  { title: 'PRIORITY 3 — EN / RU CONTENT CLEANUP', status: 'IN PROGRESS', statusType: 'progress' as const, badges: ['/en/', '/ru/', 'hreflang'], detail: 'Türkçe içerik ve slug kalan sayfalar çevrilmeli veya noindex / hreflang ile yönetilmeli.' },
  { title: 'PRIORITY 4 — BLOG CTR OPTIMIZATION', status: 'IN PROGRESS', statusType: 'progress' as const, badges: ['title', 'meta description', 'content depth'], detail: 'Yüksek impression alan “eczane kaçta kapanır” gibi sayfalarda snippet ve içerik optimizasyonu yapılmalı.' },
  { title: 'PRIORITY 5 — SUPPORT GROWING AREAS', status: 'NEXT', statusType: 'review' as const, badges: ['doctor profile links', 'Blog', 'Check-Up'], detail: 'Doktor profil sayfalarından Blog, Check-Up ve ilgili hizmetlere internal link vererek Online Doctor, /tr homepage ve brand search büyümesi desteklenmeli.' },
  {
    title: 'Mobile Core Web Vitals',
    status: 'TAMAMLANDI',
    statusType: 'done' as const,
    badges: ['818 → 47', '3.236 → 4.016 Good URLs', 'Desktop %100 Good'],
    detail: 'Previously: 818 URLs "Needs Improvement". Now: 47 URLs "Needs Improvement", 4.016 URLs Good, 0 Poor. Desktop: 4.063 URLs, 100% Good.',
  },
  {
    title: '/ → /tr AND /blog → /tr/blog Migration',
    status: 'TAMAMLANDI',
    statusType: 'done' as const,
    badges: ['/tr 5 → 116 clicks', 'Blog +27% clicks'],
    detail: 'Migrated blog articles: 0 → 43 clicks, 0 → 33 clicks. Old root homepage: 113 → 34 clicks. Remaining: 15 x 4xx, 1 x 403, 3 redirect errors.',
    label: 'Migration tamamlandı · küçük teknik kalıntılar temizlenecek',
  },
  {
    title: 'Russian Antalya / Taşucu Monitoring',
    status: 'TAMAMLANDI · İZLEME KAPANDI',
    statusType: 'done' as const,
    badges: ['Russian pages +15% clicks', 'Russian queries +7%'],
    detail: 'Core queries still around #1. Previous weekly decline was seasonal demand fluctuation; no specific intervention required.',
  },
  {
    title: 'Noindex Increase',
    status: 'İNCELEME YAPILDI · KARAR BEKLİYOR',
    statusType: 'review' as const,
    badges: ['Excluded: 7 → 2.389'],
    detail: 'Affected: /duty-pharmacy/pharmacy/{ru,en,ar}/.../{id} and /nobetci-eczane/eczane/undefined/{id}. City / district listing pages are not affected.',
    warning: "'undefined' URL production is a template issue and must be stopped.",
  },
  {
    title: 'District Content / Internal Linking',
    status: 'DEVAM EDİYOR',
    statusType: 'progress' as const,
    badges: ['Canonical conflicts: 2.293 → 2.211 (-82)'],
    detail: 'Priority: Ümraniye, Kaş, Silivri, Eyüp, Beylikdüzü, Gürsu, Akçakale. Positive early signals: Istanbul hub impressions +55%, Gaziantep / Bursa hubs growing.',
  },
];

const INDEXING = [
  { label: 'Indexed Pages', value: '58.536', type: 'normal' as const },
  { label: 'Not Indexed', value: '62.667', type: 'normal' as const },
  { label: 'Excluded by noindex', value: '26.103', type: 'warn' as const },
  { label: 'Crawled – currently not indexed', value: '21.036', type: 'warn' as const, sub: '2. büyük sorun' },
  { label: 'Alternate page with proper canonical', value: '11.430', type: 'normal' as const },
  { label: 'Duplicate — Google chose different canonical', value: '1.522', type: 'normal' as const },
  { label: 'Page with redirect', value: '1.482', type: 'normal' as const },
  { label: 'Not found 404', value: '673', type: 'normal' as const },
  { label: 'Discovered – currently not indexed', value: '365', type: 'normal' as const },
  { label: 'Blocked by robots.txt', value: '44', type: 'normal' as const },
  { label: 'Server error 5xx', value: '5', type: 'normal' as const },
];

const NEXT_ACTIONS_TECH = [
  'TR Nöbetçi Eczane template logicini incele: noindex, canonical, internal linking, pharmacy list SSR ve eski/yeni template farkları. Örnek: /nobetci-eczane/izmir/urkmez.',
  'URL migrationı doğrula: check-up-listesi → check-up, 301 redirect, final destination, 404 listesi ve eski URL’ler.',
  'EN / RU sayfalarında Türkçe içerik ve slug kalan URL’leri çevir veya noindex / hreflang ile yönet.',
];

const NEXT_ACTIONS_CONTENT = [
  'Blog CTR optimizasyonu: title, meta description, content depth ve yüksek impression alan “eczane kaçta kapanır” sayfası.',
  'Doktor profil sayfalarından Blog, Check-Up ve ilgili hizmetlere internal link vererek Online Doctor, /tr homepage ve brand search büyümesini destekle.',
];

// ─── Helpers ───

function statusBadge(type: string) {
  switch (type) {
    case 'done':
      return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap"><CheckCircle size={10} /> Tamamlandı</span>;
    case 'progress':
      return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap"><Clock size={10} /> Devam Ediyor</span>;
    case 'review':
      return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full whitespace-nowrap"><AlertTriangle size={10} /> Karar Bekliyor</span>;
    default:
      return null;
  }
}

const colorMap: Record<string, { bg: string; text: string; border: string; main: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', main: 'text-blue-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', main: 'text-emerald-700' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', main: 'text-red-600' },
};

// ─── Component ───

export default function SeptemberAnalysis() {
  return (
    <div className="flex flex-col gap-5">
      {/* Section header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <BarChart2 size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">7 Eylül Sonrası SEO Durumu</h2>
            <p className="text-sm text-gray-400 mt-0.5">Ekim 2026 — Canlı Sonrası İlk Tam Ay</p>
            <p className="text-[11px] text-gray-400 mt-1.5">Yeni tam-ay verisi, önceki kısa dönem analizini daha net hale getiriyor. Site genelindeki negatif görünüm esas olarak TR Nöbetçi Eczane kaybından kaynaklanıyor; yeni /tr yapısı, Online Doktor, Blog, Check-Up ve yabancı dil Nöbetçi Eczane alanlarında büyüme görülüyor.</p>
            <p className="text-[10px] text-gray-300 mt-1">Kaynak: Google Search Console</p>
          </div>
        </div>
      </div>

      {/* 2 — Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EXEC_CARDS.map((card) => {
          const c = colorMap[card.color];
          return (
            <div key={card.title} className={`bg-white rounded-2xl border ${c.border} shadow-sm p-5 flex flex-col gap-3`}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{card.title}</p>
              <div className="flex flex-col gap-1">
                <span className={`text-2xl font-bold ${c.main}`}>{card.main}</span>
                {card.secondary && <span className="text-sm font-semibold text-gray-500">{card.secondary}</span>}
                {card.status && <span className={`text-[11px] font-semibold ${c.text} ${c.bg} px-2 py-1 rounded-lg w-fit`}>{card.status}</span>}
                {card.districts && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {card.districts.map((d) => (
                      <span key={d} className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">{d}</span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{card.text}</p>
            </div>
          );
        })}
      </div>

      {/* 12 — Generative AI Visibility (moved up) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-fuchsia-50 rounded-xl flex items-center justify-center">
            <Search size={15} className="text-fuchsia-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Generative AI Görünürlüğü — Güncel</p>
            <p className="text-xs text-gray-400">Search AI yüzeylerinde görünürlük trendi</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl border border-gray-100 p-3 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Önceki 28 Gün</span>
            <span className="text-xl font-bold text-gray-500 tabular-nums">32,1K</span>
          </div>
          <div className="rounded-xl border border-gray-100 p-3 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Son 28 Gün</span>
            <span className="text-xl font-bold text-gray-900 tabular-nums">38,8K</span>
            <span className="text-[10px] font-bold text-emerald-600">+20,9%</span>
          </div>
          <div className="rounded-xl border border-fuchsia-100 bg-fuchsia-50/50 p-3 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-fuchsia-400 uppercase tracking-wider">30 Aug – 26 Sep</span>
            <span className="text-xl font-bold text-fuchsia-700 tabular-nums">51,1K</span>
            <span className="text-[10px] font-bold text-fuchsia-600">+31,7%</span>
          </div>
        </div>
        <div className="rounded-lg bg-fuchsia-50 border border-fuchsia-100 px-3 py-2 mb-3">
          <p className="text-[11px] text-fuchsia-700 leading-relaxed">
            Organik trafik mevsimsel olarak gerilerken AI yüzeylerindeki görünürlük büyümeye devam ediyor.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            '/duty-pharmacy/ar',
            'eczane kaçta kapanır ve açılır',
            'açılmış ilaçların kullanım süreleri',
            'kan grubu',
            'tiroid hastası zayıflama iğnesi',
          ].map((c, i) => (
            <span key={i} className="text-[10px] font-medium text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-100 px-2 py-1 rounded-full">{c}</span>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-2">Bu görünürlük doğrudan trafik veya dönüşüm olarak yorumlanmamalıdır.</p>
      </div>

      {/* 3 — Before / After KPI Comparison */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Before / After KPI Karşılaştırması</p>
          <div className="flex items-center gap-2 text-[10px] font-semibold">
            <span className="text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Pre-live: 7 Ağu – 6 Eyl</span>
            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Ekim: 1 – 31 Eki</span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_COMPARISON.map((k) => (
            <div key={k.label} className="rounded-xl border border-gray-100 p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{k.label}</span>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-300 font-medium">7 Ağu – 6 Eyl</span>
                  <span className="text-sm font-semibold text-gray-400 line-through">{k.before}</span>
                </div>
                <ArrowRight size={12} className="text-gray-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-blue-400 font-medium">Ekim 2026</span>
                  <span className="text-lg font-bold text-gray-900 tabular-nums">{k.after}</span>
                </div>
              </div>
              {k.raw && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">Raw:</span>
                  <span className="text-xs font-bold text-red-500">{k.raw}</span>
                  <span className="text-[10px] text-gray-400">·</span>
                  <span className="text-[10px] text-gray-400">Adj:</span>
                  <span className="text-xs font-bold text-amber-600">{k.adjusted}</span>
                </div>
              )}
              {k.status === 'stable' && <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full w-fit">Stabil</span>}
              {k.status === 'slight' && <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full w-fit">Hafif gerileme</span>}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-3">Ekim tam-ay verisi, canlı öncesi eşit 31 günlük dönemle karşılaştırılmıştır. Average position’da yüksek sayı daha kötü performans anlamına gelir.</p>
      </div>

      {/* 4 — Weekly Trend + 5 — Seasonality */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Weekly Trend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Haftalık Trend</p>
          <div className="flex flex-col gap-3">
            {WEEKLY_TREND.map((w) => {
              const maxVal = Math.max(...WEEKLY_TREND.map((x) => x.clicks));
              const pct = (w.clicks / maxVal) * 100;
              return (
                <div key={w.week} className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold w-28 shrink-0 ${w.highlight ? 'text-blue-700' : 'text-gray-500'}`}>{w.week}</span>
                  <div className="flex-1 h-7 bg-gray-50 rounded-lg relative overflow-hidden">
                    <div
                      className={`h-full rounded-lg flex items-center justify-end pr-2 ${w.highlight ? 'bg-blue-500' : 'bg-blue-200'}`}
                      style={{ width: `${pct}%` }}
                    >
                      <span className={`text-[10px] font-bold ${w.highlight ? 'text-white' : 'text-blue-700'}`}>{w.clicks.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                  {w.partial && <span className="text-[9px] text-amber-600 font-semibold shrink-0">6-day</span>}
                </div>
              );
            })}
          </div>
          <div className="mt-4 space-y-2">
            <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
              <p className="text-[11px] text-blue-700 leading-relaxed">7–13 Eylül lansman haftası dönem içindeki en yüksek organik tıklama seviyesini üretti.</p>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
              <p className="text-[11px] text-gray-600 leading-relaxed">21–26 Eylül'ün 6 günü 4.261 tıklama; önceki haftanın aynı 6 günü 4.221 (+%0,9).</p>
            </div>
            <div className="rounded-lg bg-slate-800 px-3 py-2">
              <p className="text-[11px] text-slate-300 leading-relaxed">7 Eylül tarihinde ani bir SEO kırılması görülmedi. Düşüş ikinci haftada başladı ve sonraki dönemde stabil hale geldi.</p>
            </div>
          </div>
        </div>

        {/* Seasonality */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Mevsimsellik Doğrulaması — 2025 vs 2026</p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Segment</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">2025</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">2026</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Yorum</th>
                </tr>
              </thead>
              <tbody>
                {SEASONALITY.map((s, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                    <td className="px-3 py-2 font-medium text-gray-700">{s.segment}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-500">{s.y2025}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold text-gray-700">{s.y2026}</td>
                    <td className="px-3 py-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        s.interpType === 'good' ? 'text-emerald-700 bg-emerald-50' :
                        s.interpType === 'bad' ? 'text-red-600 bg-red-50' :
                        'text-gray-500 bg-gray-50'
                      }`}>{s.interp}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Ekim tam-ay verisi, TR Nöbetçi Eczane düşüşünün yalnızca mevsimsellikle açıklanmaması gerektiğini gösteriyor. Düşüş Türkçe yapı üzerinde yoğunlaşırken AR / RU / EN sayfalarında aynı negatif hareket görülmüyor. Bu nedenle yeni sürümle gelen template, noindex, canonical, internal linking ve server-side rendering farklılıkları öncelikli olarak incelenmeli. Bu, strong technical / template signal olarak ele alınmalı; proven migration penalty olarak yorumlanmamalı.
            </p>
          </div>
        </div>
      </div>

      {/* 6 — Positive Signals + 8 — Losing Pages */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Positive Signals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <TrendingUp size={12} className="text-emerald-500" /> Pozitif Sinyaller
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Page Group</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Click Change</th>
                </tr>
              </thead>
              <tbody>
                {POSITIVE_SIGNALS.map((p, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                    <td className="px-3 py-2 font-medium text-gray-700">{p.group}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-bold text-emerald-600">{p.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100 mb-3">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-gray-50"><th className="text-left px-3 py-2 font-semibold text-gray-500">Section</th><th className="text-right px-3 py-2 font-semibold text-gray-500">Pre-live</th><th className="text-right px-3 py-2 font-semibold text-gray-500">October</th><th className="text-right px-3 py-2 font-semibold text-gray-500">Change</th></tr></thead>
              <tbody>{GROWING_SECTIONS.map((row, i) => <tr key={i} className="border-t border-gray-100"><td className="px-3 py-2 font-medium text-gray-700">{row[0]}</td><td className="px-3 py-2 text-right text-gray-500">{row[1]}</td><td className="px-3 py-2 text-right font-semibold text-gray-700">{row[2]}</td><td className="px-3 py-2 text-right font-bold text-emerald-600">{row[3]}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[10px] text-gray-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">Arabic pages: Impressions +27%</span>
            <span className="text-[10px] text-gray-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">Istanbul / Gaziantep / Bursa hubs: 1,5x–6x impression growth</span>
          </div>
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Yeni site yapısının tamamı zayıflamıyor. Online Doktor, Blog, Check-Up, /tr homepage ve yabancı dil Nöbetçi Eczane alanları canlı sonrası büyüme gösteriyor.
            </p>
          </div>
        </div>

        {/* Losing Pages */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <AlertTriangle size={12} className="text-red-500" /> Gerçek Kayıp — Kritik İlçe Sayfaları
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-100 mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Click</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                </tr>
              </thead>
              <tbody>
                {LOSING_PAGES.map((p, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-red-50/30 transition-colors">
                    <td className="px-3 py-2 font-medium text-gray-700">{p.page}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold text-red-600">{p.click}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-500">{p.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2">
            <p className="text-[11px] text-red-700 leading-relaxed font-medium">
              Losers: Sarıyer, Elmalı, Kahta ve Arabic Osmangazi. Kazananlar: /tr, /duty-pharmacy/ar, Arabic Şanlıurfa, Arabic Bursa, İstanbul hub ve /tr/check-up/medicalpark.
            </p>
          </div>
        </div>
      </div>

      {/* 7 — Winning Pages + 9 — Opportunities */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Winning Pages */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <TrendingUp size={12} className="text-emerald-500" /> Kazanan Sayfalar
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Click</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Impression</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                </tr>
              </thead>
              <tbody>
                {WINNING_PAGES.map((p, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                    <td className="px-3 py-2 font-medium text-gray-700 text-[11px]">{p.page}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold text-emerald-600">{p.click}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-600">{p.imp}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-gray-500">{p.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Target size={12} className="text-amber-500" /> Fırsatlar — Hızlı Büyüyen Impressionlar
          </p>
          <div className="flex flex-col gap-3">
            {OPPORTUNITIES.map((o, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800">{o.page}</span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{o.pos}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-500">
                  <span>Imp: <span className="font-semibold text-gray-700">{o.imp}</span></span>
                  <span>Clicks: <span className="font-semibold text-gray-700">{o.clicks}</span></span>
                </div>
                <p className="text-[10px] text-blue-600 font-medium flex items-center gap-1">
                  <Wrench size={10} /> {o.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10 — Task Status */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">SEO Task Status — Güncel Durum</p>
        <div className="flex flex-col gap-3">
          {TASKS.map((t) => (
            <div key={t.title} className="rounded-xl border border-gray-100 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-sm font-semibold text-gray-800">{t.title}</span>
                {statusBadge(t.statusType)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {t.badges.map((b, i) => (
                  <span key={i} className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">{b}</span>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{t.detail}</p>
              {t.label && <p className="text-[10px] text-gray-400 italic">{t.label}</p>}
              {t.warning && (
                <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 mt-1">
                  <p className="text-[11px] text-red-700 leading-relaxed font-medium flex items-start gap-1.5">
                    <AlertTriangle size={12} className="shrink-0 mt-0.5" /> {t.warning}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 11 — Indexing / Technical SEO Status */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Indexing / Technical SEO Status</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDEXING.map((item) => (
            <div key={item.label} className={`rounded-xl border p-3 flex flex-col gap-1 ${
              item.type === 'warn' ? 'border-amber-100 bg-amber-50/50' :
              item.type === 'good' ? 'border-emerald-100 bg-emerald-50/50' :
              'border-gray-100 bg-gray-50/30'
            }`}>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className={`text-sm font-bold tabular-nums ${
                item.type === 'good' ? 'text-emerald-600' :
                item.type === 'warn' ? 'text-amber-600' :
                'text-gray-800'
              }`}>{item.value}</span>
              {item.trend && <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5"><TrendingUp size={10} /> {item.trend}</span>}
              {item.sub && <span className="text-[10px] text-gray-400">{item.sub}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 13 — Next Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Wrench size={12} className="text-gray-400" /> Teknik Ekip
          </p>
          <div className="flex flex-col gap-2.5">
            {NEXT_ACTIONS_TECH.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Target size={12} className="text-gray-400" /> İçerik / SEO Ekibi
          </p>
          <div className="flex flex-col gap-2.5">
            {NEXT_ACTIONS_CONTENT.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 14 — Management Summary */}
      <div className="rounded-2xl bg-slate-800 p-5">
        <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-2">Yönetim Özeti</p>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          Ekim, yeni happ.health yapısının ilk tam aylık SEO sonucunu gösteriyor. Toplam organik trafik canlı öncesine göre %28 gerilemiş olsa da bu kaybın ana kaynağı Türkçe Nöbetçi Eczane sayfaları. Bu alan hariç tutulduğunda sitenin geri kalanı %18 büyüyor.
        </p>
        <div className="pt-3 border-t border-slate-700">
          <p className="text-xs text-slate-400 leading-relaxed">
            Yeni /tr yapı, Blog, Online Doktor, Check-Up ve yabancı dil sayfalarında pozitif sinyal var. Bu nedenle öncelik tüm siteyi yeniden değiştirmek değil; TR Nöbetçi Eczane template/indexing sorununu izole etmek, noindex/canonical yapısını doğrulamak ve büyüyen kategorileri desteklemek olmalı.
          </p>
        </div>
      </div>
    </div>
  );
}
