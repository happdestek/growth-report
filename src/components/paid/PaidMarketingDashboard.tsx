import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

const GOOGLE_MONTHLY = [
  { metric: 'Cost',           subat: '₺54.719',  mart: '₺53.043',  nisan: '₺54.127,14', nisanRaw: 54127.14, mayis: '₺46.178,33', mayisRaw: 46178.33, haziran: '₺44.507,07', haziranRaw: 44507.07, temmuz: '₺54.852,49', temmuzRaw: 54852.49, agustos: '₺63.647,81', agustosRaw: 63647.81, eylul: '₺28.260,81', eylulRaw: 28260.81, ekim: '₺28.676,24', ekimRaw: 28676.24, lowerBetter: true },
  { metric: 'Click',          subat: '25.371',   mart: '39.817',   nisan: '56.115',     nisanRaw: 56115,    mayis: '29.863',     mayisRaw: 29863,    haziran: '23.126',    haziranRaw: 23126,   temmuz: '22.930',     temmuzRaw: 22930,    agustos: '27.437',    agustosRaw: 27437,   eylul: '23.008',     eylulRaw: 23008, ekim: '24.088', ekimRaw: 24088 },
  { metric: 'Impression',     subat: '496.920',  mart: '824.381',  nisan: '1.158.780',  nisanRaw: 1158780,  mayis: '737.090',    mayisRaw: 737090,   haziran: '462.963',   haziranRaw: 462963,  temmuz: '382.915',   temmuzRaw: 382915,   agustos: '632.051',  agustosRaw: 632051,  eylul: '447.699',    eylulRaw: 447699, ekim: '333.215', ekimRaw: 333215 },
  { metric: 'CTR',            subat: '%5,11',    mart: '%4,83',    nisan: '%4,84',      nisanRaw: 4.84,     mayis: '%4,05',      mayisRaw: 4.05,     haziran: '%5,00',     haziranRaw: 5.00,    temmuz: '%5,99',     temmuzRaw: 5.99,     agustos: '%4,34',    agustosRaw: 4.34,    eylul: '%5,14',      eylulRaw: 5.14, ekim: '%7,23', ekimRaw: 7.23 },
  { metric: 'Avg CPC',        subat: '₺2,16',    mart: '₺1,33',    nisan: '₺0,96',      nisanRaw: 0.96,     mayis: '₺1,55',      mayisRaw: 1.55,     haziran: '₺1,92',     haziranRaw: 1.92,    temmuz: '₺2,39',     temmuzRaw: 2.39,     agustos: '₺2,32',    agustosRaw: 2.32,    eylul: '₺1,23',      eylulRaw: 1.23, ekim: '₺1,19', ekimRaw: 1.19, lowerBetter: true },
];

const META_MONTHLY = [
  { metric: 'Cost',                  subat: '₺42.568', mart: '₺46.313', nisan: '₺45.013', nisanRaw: 45013, mayis: '₺45.123', mayisRaw: 45123, haziran: '₺38.451', haziranRaw: 38451, temmuz: '₺37.067', temmuzRaw: 37067, agustos: '₺42.028', agustosRaw: 42028, eylul: '₺41.087', eylulRaw: 41087, ekim: '₺43.184', ekimRaw: 43184, lowerBetter: true },
  { metric: 'Total App Installs',     subat: '—', mart: '—', nisan: '—', mayis: '—', haziran: '—', temmuz: '—', agustos: '—', eylul: '1.842', eylulRaw: 1842, ekim: '2.296', ekimRaw: 2296 },
  { metric: 'iOS Avg CPI',            subat: '—', mart: '—', nisan: '—', mayis: '—', haziran: '—', temmuz: '—', agustos: '—', eylul: '₺13,28', eylulRaw: 13.28, ekim: '₺14,74', ekimRaw: 14.74, lowerBetter: true },
  { metric: 'Android Avg CPI',        subat: '—', mart: '—', nisan: '—', mayis: '—', haziran: '—', temmuz: '—', agustos: '—', eylul: '₺30,39', eylulRaw: 30.39, ekim: '₺17,81', ekimRaw: 17.81, lowerBetter: true },
  { metric: 'Total Clicks',            subat: '5.653', mart: '6.695', nisan: '8.415', nisanRaw: 8415, mayis: '10.625', mayisRaw: 10625, haziran: '10.410', haziranRaw: 10410, temmuz: '6.966', temmuzRaw: 6966, agustos: '8.002', agustosRaw: 8002, eylul: '7.317', eylulRaw: 7317, ekim: '10.986', ekimRaw: 10986 },
  { metric: 'Total Impressions',      subat: '840.515', mart: '885.729', nisan: '1.193.335', nisanRaw: 1193335, mayis: '1.056.189', mayisRaw: 1056189, haziran: '813.089', haziranRaw: 813089, temmuz: '933.074', temmuzRaw: 933074, agustos: '1.062.570', agustosRaw: 1062570, eylul: '885.787', eylulRaw: 885787, ekim: '747.273', ekimRaw: 747273 },
  { metric: 'Instagram Traffic CTR', subat: '%0,67', mart: '%0,76', nisan: '%0,71', nisanRaw: 0.71, mayis: '%1,01', mayisRaw: 1.01, haziran: '%1,28', haziranRaw: 1.28, temmuz: '%0,75', temmuzRaw: 0.75, agustos: '%0,75', agustosRaw: 0.75, eylul: '%4,64', eylulRaw: 4.64, ekim: '%5,54', ekimRaw: 5.54 },
  { metric: 'Avg CPC',    subat: '₺7,53',    mart: '₺6,92',    nisan: '₺5,35',      nisanRaw: 5.35,     mayis: '₺4,25',      mayisRaw: 4.25,     haziran: '₺3,69',     haziranRaw: 3.69,    temmuz: '₺5,32',     temmuzRaw: 5.32,    agustos: '₺5,25',    agustosRaw: 5.25,   eylul: '—',          eylulRaw: 0, ekim: '—', ekimRaw: 0,     lowerBetter: true },
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
    title: 'Android — Ayın Reklamı',
    campaign: 'android_nobetcieczane_v2_08.10',
    badge: 'Best Android Acquisition',
    metrics: [
      { label: 'Harcama', value: '₺11.539' }, { label: 'Install', value: '754' }, { label: 'CPI', value: '₺15,30' }, { label: 'CTR', value: '%1,59' }, { label: 'Status', value: 'ACTIVE' },
    ],
    comment: 'Nöbetçi Eczane V2 videosu 754 install ve ₺15,30 CPI ile Ekim’in en güçlü Android acquisition kreatifi oldu. Hangidiyet temelli eski Android reklama kıyasla CPI belirgin şekilde iyileşti.',
  },
  {
    color: 'blue',
    title: 'iOS — Nöbetçi Eczane Yeni',
    campaign: 'ios_nobetcieczane_v2_06.10',
    badge: 'Strong New iOS Creative',
    metrics: [
      { label: 'Harcama', value: '₺8.138' }, { label: 'Install', value: '606' }, { label: 'CPI', value: '₺13,43' }, { label: 'CTR', value: '%1,59' }, { label: 'Status', value: 'ACTIVE' },
    ],
    comment: 'Yeni iOS Nöbetçi Eczane V2 kreatifi 606 install ve ₺13,43 CPI ile güçlü bir başlangıç yaptı. Yeni video formatı hem CTR hem acquisition efficiency tarafında pozitif sinyal verdi.',
  },
  {
    color: 'amber',
    title: 'Instagram Traffic — Yeni & Güçlü',
    campaign: 'instagram_traffic_idrar_23.10',
    badge: 'Highest Traffic CTR',
    metrics: [
      { label: 'Harcama', value: '₺1.639' }, { label: 'Clicks', value: '1.893' }, { label: 'CTR', value: '%7,87' }, { label: 'Status', value: 'ACTIVE' },
    ],
    comment: 'İdrar yolu odaklı traffic kampanyası %7,87 CTR ile güçlü click engagement üretti. Düşük harcama ile 1.893 click elde edilmesi konu-kitle uyumunun güçlü olduğunu gösteriyor.',
  },
  {
    color: 'rose',
    title: 'iOS — Uzun Soluklu',
    campaign: 'ios_Nhangidiyet_19.06',
    badge: 'Creative Fatigue Watch',
    metrics: [
      { label: 'Harcama', value: '₺9.717' }, { label: 'Install', value: '617' }, { label: 'CPI', value: '₺15,75' }, { label: 'Önceki CPI', value: '₺12,92' }, { label: 'Status', value: 'ACTIVE' },
    ],
    comment: 'Uzun süredir çalışan Hangidiyet kreatifi Ekim’de 617 install üretmeye devam etti ancak CPI ₺12,92’den ₺15,75’e yükseldi. Yeni Nöbetçi Eczane kreatiflerinin gerisinde kalması creative fatigue sinyali oluşturuyor.',
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
          <KPICard label="Toplam Ads Harcama"     value="₺71.860,24"   sub="Ekim 2026"   color="violet"  change="↑ %6,6"  />
          <KPICard label="Google Ads Harcama"    value="₺28.676,24"   sub="Ekim 2026"   color="blue"    change="↓ %15,6" />
          <KPICard label="Meta Ads Harcama"      value="₺43.184"      sub="Ekim 2026"   color="rose"    change="↑ %5"  />
          <KPICard label="Google Ads Click"      value="24.088"       sub="Ekim 2026"   color="emerald" change="↑ %4,7" />
          <KPICard label="Google Ads Impression" value="333.215"      sub="Ekim 2026"   color="amber"   change="↓ %25,6" />
          <KPICard label="Google Ads Avg CPC"    value="₺1,19"        sub="Ekim 2026"   color="slate"   change="↓ %3,3" lowerBetter />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Ekim ayında Google Ads harcaması Eylül'e göre yalnızca %1,5 artarak ₺28.676,24 seviyesinde gerçekleşti. Conversion hacmi 101,9'dan 373,2'ye yükselirken Cost / Conv. ₺277,35'ten ₺76,83'e gerileyerek yaklaşık %72 iyileşti. Meta Ads tarafında Ekim install hacmi 2.296’ya ulaştı ve Android CPI %41 iyileşti.
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
                    <th className="text-right px-4 py-3 text-xs font-semibold text-blue-700 uppercase tracking-wider">Ekim</th>
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
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        <span className={`font-semibold ${row.ekim === '—' ? 'text-gray-300' : 'text-gray-900'}`}>{row.ekim}</span>
                        {row.ekimRaw > 0 && row.eylulRaw > 0 && <ChangeBadge curr={row.ekimRaw} prev={row.eylulRaw} lowerBetter={row.lowerBetter} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InsightNote text="Ekim ayında Meta Ads harcaması %5 artarken toplam app install %25 büyüyerek 2.296’ya ulaştı. En belirgin efficiency kazanımı Android tarafında gerçekleşti; ortalama CPI ₺30,39’dan ₺17,81’e gerileyerek %41 iyileşti." />

          {/* Önemli Sinyaller */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-emerald-700 mb-1">Install hacmi %25 arttı</p>
              <p className="text-xs text-emerald-600 leading-relaxed">Ekim’de toplam app install hacmi 1.842’den 2.296’ya yükseldi.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-blue-700 mb-1">Android efficiency güçlendi</p>
              <p className="text-xs text-blue-600 leading-relaxed">Android ortalama CPI ₺30,39’dan ₺17,81’e gerileyerek %41 iyileşti.</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-rose-700 mb-1">iOS CPI takipte</p>
              <p className="text-xs text-rose-600 leading-relaxed">iOS ortalama CPI %11 yükselerek ₺14,74’e çıktı; acquisition halen güçlü seviyede.</p>
            </div>
          </div>

          {/* Ağustos → Eylül Karşılaştırma Notu */}
          <div className="mt-3 flex gap-2 items-start">
            <div className="w-1 rounded-full bg-blue-200 self-stretch mt-0.5 shrink-0" style={{ minHeight: 16 }} />
            <div>
              <p className="text-xs text-gray-500 leading-relaxed">Eylül Featured Install Campaigns: iOS Hangidiyet 1.198 ve Android Hangidiyet 490 olmak üzere toplam 1.688 install; Eylül Meta toplamının 1.842 install değeri içinde yaklaşık %91,6 katkı. Diğer kampanyalar 154 install ile yaklaşık %8,4 katkı sağladı.</p>
            </div>
          </div>

          {/* Kısa Yönetici Özeti */}
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex gap-2.5 items-center">
            <TrendingUp size={14} className="text-slate-500 shrink-0" />
            <p className="text-xs font-medium text-slate-700">Ekim’de Meta Ads toplam app install hacmi 1.842’den 2.296’ya yükselerek %25 büyüdü. Büyümenin ana sürücüsü Android efficiency artışı oldu; Android ortalama CPI %41 iyileşerek ₺17,81’e geriledi.</p>
          </div>

          <div className="mt-3 flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              iOS ortalama CPI %11 yükselerek ₺14,74’e çıkmasına rağmen iOS acquisition halen güçlü seviyede kaldı. Impression %16 azalırken click %50 ve Instagram Traffic CTR %19 arttı; bu da Ekim’de daha yüksek engagement üretildiğini gösteriyor. Öne çıkan üç acquisition kampanyası toplam 1.977 install üreterek Meta Ads toplam install hacminin %86,1’ini oluşturdu.
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
      </section>

      {/* Section 5 — Meta Ads Highlights */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <KPICard label="Toplam Yükleme" value="2.296" sub="Eyl 1.842 → Eki 2.296" color="emerald" change="↑ %25" />
          <KPICard label="iOS Ort. CPI" value="₺14,74" sub="Eyl ₺13,28 → Eki ₺14,74" color="rose" change="↑ %11" lowerBetter />
          <KPICard label="Android Ort. CPI" value="₺17,81" sub="Eyl ₺30,39 → Eki ₺17,81" color="blue" change="↓ %41" lowerBetter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <KPICard label="Toplam Harcama" value="₺43.184" sub="Eylül → Ekim" color="slate" change="↑ %5" />
          <KPICard label="Toplam Tık" value="10.986" sub="Eylül → Ekim" color="emerald" change="↑ %50" />
          <KPICard label="Instagram Traffic CTR" value="%5,54" sub="Eylül → Ekim" color="amber" change="↑ %19" />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs font-bold text-slate-700 mb-2">Öne Çıkan Kampanyaların Install Katkısı</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-sm font-bold text-slate-800">1.977 install</p><p className="text-[10px] text-emerald-700 font-semibold">%86,1</p><p className="text-[10px] text-gray-500">Öne Çıkan Kampanyalar</p></div>
            <div><p className="text-sm font-bold text-slate-800">319 install</p><p className="text-[10px] text-gray-500 font-semibold">%13,9</p><p className="text-[10px] text-gray-500">Diğer Kampanyalar</p></div>
            <div><p className="text-sm font-bold text-slate-800">2.296 install</p><p className="text-[10px] text-slate-600 font-semibold">%100</p><p className="text-[10px] text-gray-500">Toplam Meta Ads</p></div>
          </div>
        </div>
        <SectionHeader title="Meta Ads" subtitle="Öne Çıkan Kampanyalar · Ekim 2026" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {META_CAMPAIGN_HIGHLIGHTS.map(c => (
            <MetaCampaignCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-4 flex gap-2 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <TrendingUp size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Öne çıkan üç acquisition kampanyası toplam 1.977 install üreterek Meta Ads toplam install hacminin %86,1’ini oluşturdu. Kalan 319 install diğer kampanyalardan geldi.
          </p>
        </div>
        <div className="mt-3 flex gap-3 items-start bg-rose-50 border border-rose-200 rounded-xl px-4 py-3.5">
          <AlertCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />
          <p className="text-xs text-rose-700 leading-relaxed">
            Yeni Nöbetçi Eczane kreatifleri hem iOS hem Android’de güçlü acquisition performansı gösterirken uzun süredir çalışan iOS Hangidiyet kreatifinde CPI artışı creative fatigue sinyali oluşturdu.
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
              'Android Nöbetçi Eczane V2 kampanyasını kontrollü bütçe artışıyla ölçekle.',
              'iOS Nöbetçi Eczane V2 kampanyasının ₺13,43 CPI performansını daha yüksek bütçede doğrula.',
              'iOS Hangidiyet kampanyasında creative refresh / budget reduction test et.',
              'instagram_traffic_idrar_23.10 kampanyası için App Install objective varyasyonu test et.',
              'Android ortalama CPI’daki %41 iyileşmenin Kasım ayında sürdürülebilir olup olmadığını takip et.',
              'Featured campaign install contribution oranını aylık olarak takip et: October baseline = %86,1.',
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
