import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

const GOOGLE_MONTHLY = [
  { metric: 'Cost',           subat: '₺54.719',  mart: '₺53.043',  nisan: '₺54.127,14', nisanRaw: 54127.14, mayis: '₺46.178,33', mayisRaw: 46178.33, haziran: '₺44.507,07', haziranRaw: 44507.07, temmuz: '₺54.852,49', temmuzRaw: 54852.49, agustos: '₺63.647,81', agustosRaw: 63647.81, eylul: '₺28.260,81', eylulRaw: 28260.81, ekim: '₺28.676,24', ekimRaw: 28676.24, lowerBetter: true },
  { metric: 'Click',          subat: '25.371',   mart: '39.817',   nisan: '56.115',     nisanRaw: 56115,    mayis: '29.863',     mayisRaw: 29863,    haziran: '23.126',    haziranRaw: 23126,   temmuz: '22.930',     temmuzRaw: 22930,    agustos: '27.437',    agustosRaw: 27437,   eylul: '23.008',     eylulRaw: 23008, ekim: '24.088', ekimRaw: 24088 },
  { metric: 'Impression',     subat: '496.920',  mart: '824.381',  nisan: '1.158.780',  nisanRaw: 1158780,  mayis: '737.090',    mayisRaw: 737090,   haziran: '462.963',   haziranRaw: 462963,  temmuz: '382.915',   temmuzRaw: 382915,   agustos: '632.051',  agustosRaw: 632051,  eylul: '447.699',    eylulRaw: 447699, ekim: '333.215', ekimRaw: 333215 },
  { metric: 'CTR',            subat: '%5,11',    mart: '%4,83',    nisan: '%4,84',      nisanRaw: 4.84,     mayis: '%4,05',      mayisRaw: 4.05,     haziran: '%5,00',     haziranRaw: 5.00,    temmuz: '%5,99',     temmuzRaw: 5.99,     agustos: '%4,34',    agustosRaw: 4.34,    eylul: '%5,14',      eylulRaw: 5.14, ekim: '%7,23', ekimRaw: 7.23 },
  { metric: 'Avg CPC',        subat: '₺2,16',    mart: '₺1,33',    nisan: '₺0,96',      nisanRaw: 0.96,     mayis: '₺1,55',      mayisRaw: 1.55,     haziran: '₺1,92',     haziranRaw: 1.92,    temmuz: '₺2,39',     temmuzRaw: 2.39,     agustos: '₺2,32',    agustosRaw: 2.32,    eylul: '₺1,23',      eylulRaw: 1.23, ekim: '₺1,19', ekimRaw: 1.19, lowerBetter: true },
  { metric: 'Conversions',    subat: '—',        mart: '—',        nisan: '—',          nisanRaw: 0,        mayis: '—',          mayisRaw: 0,        haziran: '—',         haziranRaw: 0,       temmuz: '411,76',     temmuzRaw: 411.76,    agustos: '396,10',   agustosRaw: 396.10,  eylul: '101,90',     eylulRaw: 101.90, ekim: '373,24', ekimRaw: 373.24 },
  { metric: 'Cost / Conv.',   subat: '—',        mart: '—',        nisan: '—',          nisanRaw: 0,        mayis: '—',          mayisRaw: 0,        haziran: '—',         haziranRaw: 0,       temmuz: '₺133,21',    temmuzRaw: 133.21,    agustos: '₺160,69',  agustosRaw: 160.69,  eylul: '₺277,35',    eylulRaw: 277.35, ekim: '₺76,83', ekimRaw: 76.83, lowerBetter: true },
  { metric: 'Conv. Rate',     subat: '—',        mart: '—',        nisan: '—',          nisanRaw: 0,        mayis: '—',          mayisRaw: 0,        haziran: '—',         haziranRaw: 0,       temmuz: '%1,79',      temmuzRaw: 1.79,      agustos: '%0,45',    agustosRaw: 0.45,    eylul: '%0,14',      eylulRaw: 0.14, ekim: '%0,67', ekimRaw: 0.67 },
];

const META_MONTHLY = [
  { metric: 'Cost',       subat: '₺42.568',  mart: '₺46.313',  nisan: '₺45.013',    nisanRaw: 45013,    mayis: '₺45.123',    mayisRaw: 45123,    haziran: '₺38.451',   haziranRaw: 38451,   temmuz: '₺37.067',   temmuzRaw: 37067,   agustos: '₺42.028',  agustosRaw: 42028,  eylul: '₺38.732',    eylulRaw: 38732,  lowerBetter: true },
  { metric: 'Click',      subat: '5.653',    mart: '6.695',    nisan: '8.415',      nisanRaw: 8415,     mayis: '10.625',     mayisRaw: 10625,    haziran: '10.410',    haziranRaw: 10410,   temmuz: '6.966',     temmuzRaw: 6966,    agustos: '8.002',    agustosRaw: 8002,   eylul: '—',          eylulRaw: 0 },
  { metric: 'Impression', subat: '840.515',  mart: '885.729',  nisan: '1.193.335',  nisanRaw: 1193335,  mayis: '1.056.189',  mayisRaw: 1056189,  haziran: '813.089',   haziranRaw: 813089,  temmuz: '933.074',   temmuzRaw: 933074,  agustos: '1.062.570',agustosRaw: 1062570, eylul: '—',          eylulRaw: 0 },
  { metric: 'CTR',        subat: '%0,67',    mart: '%0,76',    nisan: '%0,71',      nisanRaw: 0.71,     mayis: '%1,01',      mayisRaw: 1.01,     haziran: '%1,28',     haziranRaw: 1.28,    temmuz: '%0,75',     temmuzRaw: 0.75,    agustos: '%0,75',    agustosRaw: 0.75,   eylul: '—',          eylulRaw: 0 },
  { metric: 'Avg CPC',    subat: '₺7,53',    mart: '₺6,92',    nisan: '₺5,35',      nisanRaw: 5.35,     mayis: '₺4,25',      mayisRaw: 4.25,     haziran: '₺3,69',     haziranRaw: 3.69,    temmuz: '₺5,32',     temmuzRaw: 5.32,    agustos: '₺5,25',    agustosRaw: 5.25,   eylul: '—',          eylulRaw: 0,     lowerBetter: true },
];

const GOOGLE_CAMPAIGN_HIGHLIGHTS = [
  {
    color: 'slate',
    title: 'Ana Trafik + Conversion Kaynağı',
    campaign: 'nobetci-eczane-istanbul',
    metrics: [
      { label: 'Clicks', value: '17.550' }, { label: 'Impressions', value: '115.736' }, { label: 'CTR', value: '%15,16' },
      { label: 'Avg CPC', value: '₺0,52' }, { label: 'Spend', value: '₺9.120,21' }, { label: 'Conversions', value: '222,33' },
      { label: 'Cost / Conv', value: '₺41,02' }, { label: 'CVR', value: '%1,27' },
    ],
    comment: 'Nöbetçi Eczane ana kampanyasında trafik hacmi gerilerken CTR ve conversion efficiency çok güçlü iyileşti. Harcama neredeyse sabit kalmasına rağmen conversion 222,33 seviyesine çıktı. Eylül conversion baseline’ı tracking veya campaign structure değişiminden etkilenmiş olabilir.',
  },
  {
    color: 'emerald',
    title: 'Nöbetçi Eczane — Düşüş Yaşayan Lokasyonlar',
    campaign: 'Campaign name unavailable in source',
    badge: 'SEO Support / Location Recovery',
    metrics: [
      { label: 'Clicks', value: '3.931' }, { label: 'Impressions', value: '18.891' }, { label: 'CTR', value: '%20,81' },
      { label: 'Avg CPC', value: '₺0,46' }, { label: 'Spend', value: '₺1.800,81' }, { label: 'Conversions', value: '93,00' },
      { label: 'Cost / Conv', value: '₺19,36' }, { label: 'CVR', value: '%2,37' },
    ],
    comment: 'Ekim ayında organik görünürlükte en fazla düşüş yaşayan Nöbetçi Eczane lokasyonlarını desteklemek amacıyla yeni reklam yapısı devreye alındı. Kampanya 3.931 click ve 93 conversion üretirken CPA ₺19,36 seviyesinde gerçekleşti.',
  },
  {
    color: 'amber',
    title: 'Traffic Growth / Conversion Efficiency Risk',
    campaign: 'Check up - Search- 22.01',
    metrics: [
      { label: 'Clicks', value: '1.496' }, { label: 'Impressions', value: '44.041' }, { label: 'CTR', value: '%3,40' },
      { label: 'Avg CPC', value: '₺7,80' }, { label: 'Spend', value: '₺11.674,17' }, { label: 'Conversions', value: '25,91' },
      { label: 'Cost / Conv', value: '₺450,62' }, { label: 'CVR', value: '%1,73' },
    ],
    comment: 'Check-Up kampanyasında trafik hacmi çok güçlü büyüdü ve CPC belirgin şekilde geriledi; ancak conversion hacmi düştü ve CPA ₺210,94’ten ₺450,62’ye yükseldi.',
  },
  {
    color: 'blue',
    title: 'Stable Efficiency / Lower Volume',
    campaign: 'ios_app_install',
    metrics: [
      { label: 'Clicks', value: '1.111' }, { label: 'Impressions', value: '154.547' }, { label: 'CTR', value: '%0,72' },
      { label: 'Avg CPC', value: '₺5,47' }, { label: 'Spend', value: '₺6.081,06' }, { label: 'Conversions', value: '32' },
      { label: 'Cost / Conv', value: '₺190,03' }, { label: 'CVR', value: '%0,10' },
    ],
    comment: 'iOS App campaign Ekim’de daha düşük bütçe ve trafik hacmiyle çalıştı. Conversion 44’ten 32’ye gerilerken CPA ₺183,93’ten ₺190,03’e sınırlı yükseldi.',
  },
  {
    color: 'rose',
    title: 'POLICY REJECTED / NOT SERVING',
    campaign: 'anindadoktor_search',
    badge: 'Policy review required',
    metrics: [
      { label: 'Clicks', value: '0' }, { label: 'Impressions', value: '0' }, { label: 'Spend', value: '₺0' },
      { label: 'Conversions', value: '0' }, { label: 'September ref', value: '181 clicks' }, { label: 'September conv', value: '18,39' },
    ],
    comment: 'Anında Doktor kampanyası Ekim’de performans nedeniyle değil, landing page’de yer alan ‘e-reçete’ ifadesi nedeniyle Google Ads policy rejection aldığı için yayına çıkamadı. Landing page ve reklam metinlerindeki e-reçete ifadesi politika uyumluluğu açısından revize edilmeli; ardından kampanya yeniden review’a gönderilmeli.',
  },
];

const META_CAMPAIGN_HIGHLIGHTS = [
  {
    color: 'emerald',
    title: 'iOS — Acquisition Efficiency Improved',
    campaign: 'ios_app_26.08',
    metrics: [
      { label: 'Harcama', value: '₺38.732' },
      { label: 'Install', value: '1.803' },
      { label: 'CPI', value: '₺21,48' },
    ],
    comment: 'ios_app_26.08 kampanyası Eylül tam ayında 1.803 install ve ₺21,48 CPI ile güçlü acquisition performansını sürdürdü. Ağustos\'a göre install hacmi %82 artarken CPI yaklaşık %50 iyileşti.',
  },
  {
    color: 'rose',
    title: 'iOS UGC — PAUSED',
    campaign: 'ios_UGC_13.08 · PAUSED',
    metrics: [
      { label: 'Harcama', value: '₺0' },
      { label: 'Install', value: '0' },
      { label: 'Durum', value: 'Durduruldu' },
    ],
    comment: 'iOS UGC kampanyası yüksek frekans ve düşük CTR nedeniyle durduruldu. Yerine ios_app_26.08 kampanyası güçlü performans gösterdi.',
  },
  {
    color: 'slate',
    title: 'Android — Ana Kazanım Motoru',
    campaign: 'android_kampanya_06.11',
    metrics: [
      { label: 'Harcama', value: '—' },
      { label: 'Install', value: '—' },
      { label: 'CPI', value: '—' },
    ],
    comment: 'Android kampanya performansı Eylül döneminde ios_app_26.08\'in güçlü performansının gölgesinde kaldı. Detaylı reklam bazlı veri için Ağustos raporuna bakılabilir.',
  },
  {
    color: 'blue',
    title: 'Instagram Traffic',
    campaign: 'instagram_traffic_24.11',
    metrics: [
      { label: 'Harcama', value: '—' },
      { label: 'CTR', value: '—' },
      { label: 'Install', value: '—' },
    ],
    comment: 'Instagram traffic kampanyası Eylül döneminde aktif olarak takip edilmedi. Detaylı veri için Ağustos raporuna bakılabilir.',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: 'text-emerald-500' },
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    icon: 'text-blue-500' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   icon: 'text-amber-500' },
  rose:    { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    icon: 'text-rose-500' },
  slate:   { bg: 'bg-slate-100',  text: 'text-slate-700',   border: 'border-slate-200',   icon: 'text-slate-500' },
};

function pctChange(curr: number, prev: number) {
  if (prev === 0) return null;
  return ((curr - prev) / prev) * 100;
}

function ChangeBadge({ curr, prev, lowerBetter }: { curr: number; prev: number; lowerBetter?: boolean }) {
  const change = pctChange(curr, prev);
  if (change === null) return null;
  const isGood = lowerBetter ? change < 0 : change > 0;
  const isBad  = lowerBetter ? change > 0 : change < 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ml-1 ${
      isGood ? 'bg-emerald-50 text-emerald-600' :
      isBad  ? 'bg-red-50 text-red-500' :
               'bg-gray-50 text-gray-400'
    }`}>
      {change > 0 ? <TrendingUp size={9} /> : change < 0 ? <TrendingDown size={9} /> : <Minus size={9} />}
      {change > 0 ? '+' : ''}{change.toFixed(1)}%
    </span>
  );
}

export default function PaidMarketingDashboard() {
  return (
    <div className="space-y-8">

      {/* Section 1 — KPI Cards */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
          <KPICard label="Toplam Ads Harcama"     value="₺67.408,24"   sub="Ekim 2026"   color="violet"  change="↓ %7,3"  />
          <KPICard label="Google Ads Harcama"    value="₺28.676,24"   sub="Ekim 2026"   color="blue"    change="↓ %15,6" />
          <KPICard label="Meta Ads Harcama"      value="₺38.732"      sub="Eylül 2026"   color="rose"    change="—"  />
          <KPICard label="Google Ads Click"      value="24.088"       sub="Ekim 2026"   color="emerald" change="↑ %4,7" />
          <KPICard label="Google Ads Impression" value="333.215"      sub="Ekim 2026"   color="amber"   change="↓ %25,6" />
          <KPICard label="Google Ads Avg CPC"    value="₺1,19"        sub="Ekim 2026"   color="slate"   change="↓ %3,3" lowerBetter />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Ekim ayında Google Ads harcaması Eylül'e göre yalnızca %1,5 artarak ₺28.676,24 seviyesinde gerçekleşti. Conversion hacmi 101,9'dan 373,2'ye yükselirken Cost / Conv. ₺277,35'ten ₺76,83'e gerileyerek yaklaşık %72 iyileşti. Meta Ads tarafında Ekim verileri ayrıca güncellenecektir; mevcut KPI'lar Eylül baz alınarak gösterilmektedir.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
            Ekim'de kanal bazında en önemli pozitif sinyal Google Ads tarafından geldi. Impression hacmi %25,6 azalmasına rağmen click hacmi %4,7 arttı ve CTR %5,14'ten %7,23'e yükseldi.
          </p>
        </div>
      </section>

      {/* Section 2 & 3 — Monthly Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Google Ads */}
        <section>
          <SectionHeader title="Google Ads" subtitle="Aylık Özet" />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Metrik</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Şubat</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Mart</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nisan</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Mayıs</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Haziran</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Temmuz</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ağustos</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Eylül</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-blue-700 uppercase tracking-wider">Ekim</th>
                  </tr>
                </thead>
                <tbody>
                  {GOOGLE_MONTHLY.map((row, i) => (
                    <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{row.metric}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.subat}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.mart}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.nisan}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.mayis}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.haziran}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.temmuz}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.agustos}</td>
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        <span className={`font-semibold ${row.eylul === '—' ? 'text-gray-300' : 'text-gray-900'}`}>{row.eylul}</span>
                        {row.eylulRaw > 0 && row.agustosRaw > 0 && <ChangeBadge curr={row.eylulRaw} prev={row.agustosRaw} lowerBetter={row.lowerBetter} />}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        <span className="font-semibold text-gray-900">{row.ekim}</span>
                        {row.ekimRaw > 0 && row.eylulRaw > 0 && <ChangeBadge curr={row.ekimRaw} prev={row.eylulRaw} lowerBetter={row.lowerBetter} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InsightNote text="Ekim ayında Google Ads harcaması Eylül'e göre yalnızca %1,5 artarken conversion hacmi 101,9'dan 373,2'ye yükseldi. Cost / Conv. ₺277,35'ten ₺76,83'e gerileyerek yaklaşık %72 iyileşti." />
          <div className="mt-2 flex gap-2 items-start">
            <div className="w-1 rounded-full bg-emerald-200 self-stretch mt-0.5 shrink-0" style={{ minHeight: 16 }} />
            <p className="text-xs text-gray-500 leading-relaxed">Impression hacmi %25,6 azalmasına rağmen click hacmi %4,7 arttı ve CTR %5,14'ten %7,23'e yükseldi. Bu durum Ekim'de daha düşük gösterim hacminden daha yüksek trafik ve conversion verimliliği elde edildiğini gösteriyor.</p>
          </div>
        </section>

        {/* Meta Ads */}
        <section>
          <SectionHeader title="Meta Ads" subtitle="Aylık Özet" />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Metrik</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Şubat</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Mart</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nisan</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Mayıs</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Haziran</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Temmuz</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ağustos</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Eylül</th>
                  </tr>
                </thead>
                <tbody>
                  {META_MONTHLY.map((row, i) => (
                    <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{row.metric}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.subat}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.mart}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.nisan}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.mayis}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.haziran}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.temmuz}</td>
                      <td className="px-4 py-3 text-right text-gray-400 tabular-nums">{row.agustos}</td>
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        <span className={`font-semibold ${row.eylul === '—' ? 'text-gray-300' : 'text-gray-900'}`}>{row.eylul}</span>
                        {row.eylulRaw > 0 && row.agustosRaw > 0 && <ChangeBadge curr={row.eylulRaw} prev={row.agustosRaw} lowerBetter={row.lowerBetter} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InsightNote text="Eylül 2026 döneminde Meta Ads tarafında ₺38.732 harcama ile 1.803 install elde edildi ve CPI ₺21,48 seviyesine geriledi. Acquisition efficiency Ağustos'a göre belirgin şekilde güçlendi." />

          {/* Önemli Sinyaller */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-emerald-700 mb-1">Install hacmi %82 arttı</p>
              <p className="text-xs text-emerald-600 leading-relaxed">Eylül'de ios_app_26.08 tam ay çalışarak install hacmini belirgin şekilde artırdı ve CPI yaklaşık %50 iyileşti.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-blue-700 mb-1">Harcama kontrollü azaldı</p>
              <p className="text-xs text-blue-600 leading-relaxed">Meta harcaması ₺42.028'den ₺38.732'ye gerileyerek %7,8 azaldı; buna karşın acquisition verimliliği güçlendi.</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-rose-700 mb-1">iOS UGC durduruldu</p>
              <p className="text-xs text-rose-600 leading-relaxed">Eski iOS UGC kampanyası fatigue nedeniyle PAUSED konumunda; yeni ios_app_26.08 kampanyası güçlü CPI performansını sürdürüyor.</p>
            </div>
          </div>

          {/* Ağustos → Eylül Karşılaştırma Notu */}
          <div className="mt-3 flex gap-2 items-start">
            <div className="w-1 rounded-full bg-blue-200 self-stretch mt-0.5 shrink-0" style={{ minHeight: 16 }} />
            <div>
              <p className="text-xs text-gray-500 leading-relaxed">Eylül'de Meta Ads tarafında harcama %7,8 azalmasına rağmen install hacmi %82 arttı ve CPI yaklaşık %50 iyileşti. ios_app_26.08 kampanyası tam ay aktif olarak çalıştı.</p>
            </div>
          </div>

          {/* Kısa Yönetici Özeti */}
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex gap-2.5 items-center">
            <TrendingUp size={14} className="text-slate-500 shrink-0" />
            <p className="text-xs font-medium text-slate-700">Eylül ayında Meta Ads tarafında acquisition efficiency belirgin şekilde güçlendi. Harcama azalmasına rağmen install hacmi artarken CPI ₺21,48 seviyesine geriledi. ios_app_26.08 kampanyası ölçeklenebilirlik açısından takip edilmeye devam etmeli.</p>
          </div>

          <div className="mt-3 flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Ekim'de kanal bazında en önemli pozitif sinyal Google Ads tarafından geldi. Conversion hacmi 101,9'dan 373,2'ye yükselirken CPA ₺277,35'ten ₺76,83'e gerileyerek yaklaşık %72 iyileşti. Meta Ads tarafında Eylül verileri baz alınmıştır; Ekim Meta verileri ayrıca güncellenecektir.
            </p>
          </div>
        </section>
      </div>

      {/* Section 4 — Google Highlights */}
      <section>
        <SectionHeader title="Google Ads" subtitle="Öne Çıkan Kampanyalar · Ekim 2026" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {GOOGLE_CAMPAIGN_HIGHLIGHTS.map(c => (
            <MetaCampaignCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-3 flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
          <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Google Ads Ekim performansında üç farklı hikâye öne çıktı: Nöbetçi Eczane tarafında conversion efficiency belirgin şekilde güçlendi ve SEO kayıplarını desteklemek için yeni lokasyon kampanyaları devreye alındı. Check-Up tarafında trafik hacmi güçlü büyürken conversion efficiency zayıfladı. Anında Doktor ise Google Ads policy rejection nedeniyle yayına çıkamadı.
          </p>
        </div>
        <div className="mt-3 flex gap-2 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <TrendingUp size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Ekim’de SEO tarafında Nöbetçi Eczane lokasyonlarında yaşanan görünürlük kayıplarını desteklemek amacıyla paid search genişletildi. En fazla düşüş yaşayan lokasyonlara özel reklam yapısı devreye alındı. Yeni lokasyon kampanyası %20,81 CTR, 93 conversion ve ₺19,36 CPA ile güçlü bir erken performans üretti.
          </p>
        </div>

        {/* Campaign Priority */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
          {[
            { label: 'Nöbetçi Eczane', campaign: 'Conversion efficiency', value: '222,33 conv · ₺41,02 CPA', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
            { label: 'Location Recovery', campaign: 'Nöbetçi Eczane', value: '93 conv · ₺19,36 CPA', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { label: 'Traffic Growth', campaign: 'Check-Up', value: '1.496 clicks · %1,73 CVR', color: 'bg-amber-50 border-amber-200 text-amber-700' },
            { label: 'Policy Rejected', campaign: 'Anında Doktor', value: 'Not serving · review required', color: 'bg-rose-50 border-rose-200 text-rose-700' },
            { label: 'App Acquisition', campaign: 'iOS App Install', value: '32 conv · ₺190,03 CPA', color: 'bg-slate-100 border-slate-200 text-slate-700' },
          ].map(item => (
            <div key={item.label} className={`rounded-xl border px-4 py-3 ${item.color}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">{item.label}</p>
              <p className="text-xs font-bold mb-0.5">{item.campaign}</p>
              <p className="text-[11px] tabular-nums opacity-80">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Ekim Kanal Karşılaştırması */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
            <p className="text-xs font-bold text-blue-700 mb-1">Google Ads · Ekim 2026</p>
            <p className="text-xs text-blue-600 leading-relaxed">Spend: ₺28.676,24 · Conversions: 373,24 · CPA: ₺76,83</p>
            <p className="text-[11px] text-blue-500 leading-relaxed mt-1">Primary signal: Conversion efficiency improved ~72% vs Eylül</p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3.5">
            <p className="text-xs font-bold text-rose-700 mb-1">Meta Ads · Eylül 2026</p>
            <p className="text-xs text-rose-600 leading-relaxed">Spend: ₺38.732 · Install: 1.803 · CPI: ₺21,48</p>
            <p className="text-[11px] text-rose-500 leading-relaxed mt-1">Primary signal: Acquisition efficiency improved (Ekim verileri bekleniyor)</p>
          </div>
        </div>
      </section>

      {/* Section 5 — Meta Ads Highlights */}
      <section>
        <SectionHeader title="Meta Ads" subtitle="Öne Çıkan Kampanyalar · Eylül 2026" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {META_CAMPAIGN_HIGHLIGHTS.map(c => (
            <MetaCampaignCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-4 flex gap-2 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <TrendingUp size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Eylül 2026'da ios_app_26.08 kampanyası 1.803 install ve ₺21,48 CPI ile güçlü acquisition performansını sürdürdü. Ağustos'a göre install hacmi %82 artarken CPI yaklaşık %50 iyileşti. Harcama ₺38.732 seviyesinde gerçekleşti.
          </p>
        </div>
        <div className="mt-3 flex gap-3 items-start bg-rose-50 border border-rose-200 rounded-xl px-4 py-3.5">
          <AlertCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />
          <p className="text-xs text-rose-700 leading-relaxed">
            iOS UGC kampanyası fatigue nedeniyle durduruldu. ios_app_26.08 kampanyası güçlü CPI performansını sürdürüyor; ölçeklenebilirlik kontrollü şekilde takip edilmeli.
          </p>
        </div>

        {/* Reklam Bazlı Performans — android_kampanya */}
        <div className="mt-6">
          <SectionHeader title="Reklam Bazlı Performans" subtitle="android_kampanya · Haziran 2026" />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reklam</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Harcama</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Install</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">CPI</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'android_hangidiyet2_19.06', spend: '₺5.382', install: 304, cpi: '₺17,70', ctr: '%1,13', badge: 'En Düşük CPI', badgeColor: 'bg-emerald-100 text-emerald-800', rowBg: 'bg-emerald-50/50' },
                  { name: 'android_hangidiyet_16.01',  spend: '₺6.995', install: 278, cpi: '₺25,16', ctr: '%1,00', badge: 'En Yüksek Hacim', badgeColor: 'bg-blue-100 text-blue-700',    rowBg: '' },
                  { name: 'android_tanıtımAI_09.06 – Test3', spend: '₺793', install: 20, cpi: '₺39,65', ctr: '%3,48', badge: null, badgeColor: '', rowBg: '' },
                  { name: 'android_tanıtımAI_09.06 – Test1', spend: '₺499', install: 14, cpi: '₺35,66', ctr: '%3,47', badge: null, badgeColor: '', rowBg: '' },
                  { name: 'android_tanıtımAI_09.06 – Test2', spend: '₺509', install: 11, cpi: '₺46,29', ctr: '%3,71', badge: null, badgeColor: '', rowBg: '' },
                  { name: 'android_kantahlili_02.04 – Kopya', spend: '₺789', install: 13, cpi: '₺60,66', ctr: '%2,10', badge: 'Pahalı', badgeColor: 'bg-amber-100 text-amber-800', rowBg: 'bg-amber-50/40' },
                  { name: 'android_hangidstatik_13.03',      spend: '₺301', install: 6,  cpi: '₺50,24', ctr: '%1,58', badge: null, badgeColor: '', rowBg: '' },
                  { name: 'android_tanıtımAI_09.06 – Test4', spend: '₺270', install: 3,  cpi: '₺90,00', ctr: '%4,62', badge: 'En Yüksek CPI', badgeColor: 'bg-rose-100 text-rose-800', rowBg: 'bg-rose-50/40' },
                ].map((row, i) => (
                  <tr key={i} className={`hover:bg-gray-50/60 transition-colors ${row.rowBg}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11px] text-gray-700">{row.name}</span>
                        {row.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${row.badgeColor}`}>{row.badge}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-gray-600 font-medium">{row.spend}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-bold text-gray-800">{row.install}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-gray-600">{row.cpi}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-gray-500">{row.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action signals */}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex gap-2.5 items-start bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <TrendingUp size={13} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-emerald-800 leading-relaxed"><span className="font-bold">hangidiyet2 ayın yıldızı.</span> ₺17,70 CPI ile tüm reklamlar içinde en verimli. Bütçe artırımına hazır.</p>
            </div>
            <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed"><span className="font-bold">kantahlili + statik + AI Test4 durdurulmalı.</span> Üçü birlikte ₺1.360 harcamayla yalnızca 22 install.</p>
            </div>
          </div>
        </div>

      </section>

      {/* Section 6 — Next Actions */}
      <section>
        <SectionHeader title="Sonraki Aksiyonlar" subtitle="Ekim 2026" />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <ol className="flex flex-col gap-2.5">
            {[
              'Nöbetçi Eczane lokasyon kampanyalarının SEO kaybı yaşayan ilçelerdeki incremental katkısını takip et.',
              'Ana Nöbetçi Eczane kampanyasında Eylül → Ekim conversion artışının tracking / conversion definition değişiminden etkilenip etkilenmediğini doğrula.',
              'Check-Up kampanyasında artan trafik hacmine rağmen düşen CVR’nin nedenini search term, landing page ve conversion funnel bazında incele.',
              'Anında Doktor landing page’deki e-reçete ifadesini Google Ads politika uyumluluğuna göre revize et ve reklamı yeniden review’a gönder.',
              'iOS App campaign’de hacim düşüşüne karşı CPA’nın büyük ölçüde korunup korunmadığını Kasım’da takip et.',
            ].map((action, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-xs text-gray-600 leading-relaxed">{action}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      <span className="text-xs text-gray-400 font-medium">{subtitle}</span>
    </div>
  );
}

function KPICard({ label, value, sub, color, change, lowerBetter }: { label: string; value: string; sub: string; color: string; change?: string; lowerBetter?: boolean }) {
  const colors: Record<string, { bg: string; text: string; badge: string; badgeText: string }> = {
    violet:  { bg: 'bg-slate-900',   text: 'text-white',   badge: 'bg-slate-700',   badgeText: 'text-slate-300' },
    blue:    { bg: 'bg-blue-600',    text: 'text-white',   badge: 'bg-blue-500',    badgeText: 'text-blue-100' },
    rose:    { bg: 'bg-rose-500',    text: 'text-white',   badge: 'bg-rose-400',    badgeText: 'text-rose-100' },
    emerald: { bg: 'bg-emerald-500', text: 'text-white',   badge: 'bg-emerald-400', badgeText: 'text-emerald-100' },
    amber:   { bg: 'bg-amber-500',   text: 'text-white',   badge: 'bg-amber-400',   badgeText: 'text-amber-100' },
    slate:   { bg: 'bg-slate-700',   text: 'text-white',   badge: 'bg-slate-600',   badgeText: 'text-slate-300' },
  };
  const c = colors[color] ?? colors.slate;

  const isDown = change?.startsWith('↓');
  const isUp   = change?.startsWith('↑');
  const isGoodDown = lowerBetter && isDown;
  const isBadUp    = lowerBetter && isUp;
  const changeBg   = (isGoodDown || (!lowerBetter && isUp)) ? 'bg-emerald-400/30' : 'bg-red-400/30';
  const changeText = (isGoodDown || (!lowerBetter && isUp)) ? 'text-emerald-100'  : 'text-red-100';
  const changeLabel = change ? change.replace('↓ ', '').replace('↑ ', '') : '';

  return (
    <div className={`${c.bg} rounded-2xl p-5 flex flex-col gap-2 shadow-sm relative`}>
      {change && (
        <span className={`absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${changeBg} ${changeText}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {changeLabel}
        </span>
      )}
      <span className={`text-[10px] font-semibold uppercase tracking-wider opacity-80 ${c.text}`}>{label}</span>
      <span className={`text-2xl font-bold tabular-nums ${c.text}`}>{value}</span>
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full self-start ${c.badge} ${c.badgeText}`}>{sub}</span>
    </div>
  );
}

function InsightNote({ text }: { text: string }) {
  return (
    <div className="mt-3 flex gap-2 items-start">
      <div className="w-1 rounded-full bg-blue-200 self-stretch mt-0.5 shrink-0" style={{ minHeight: 16 }} />
      <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}


function MetaCampaignCard({ color, title, campaign, metrics, comment, badge }: {
  color: string;
  title: string;
  campaign: string;
  metrics: { label: string; value: string }[];
  comment: string;
  badge?: string;
}) {
  const c = colorMap[color] ?? colorMap.slate;
  return (
    <div className={`bg-white rounded-2xl border ${c.border} shadow-sm p-5 flex flex-col gap-4`}>
      <div>
        <p className={`text-[10px] font-semibold uppercase tracking-wider ${c.text} mb-1`}>{title}</p>
        <p className="text-xs font-mono text-gray-500 truncate">{campaign}</p>
        {badge && <span className={`inline-flex mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${c.bg} ${c.text}`}>{badge}</span>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {metrics.map(m => (
          <div key={m.label} className={`${c.bg} rounded-xl px-2 py-2 flex flex-col gap-0.5`}>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider font-medium leading-tight">{m.label}</span>
            <span className={`text-sm font-bold tabular-nums ${c.text}`}>{m.value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{comment}</p>
    </div>
  );
}
