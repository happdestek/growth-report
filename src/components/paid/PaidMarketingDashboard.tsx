import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

const GOOGLE_MONTHLY = [
  { metric: 'Cost',           subat: '₺54.719',  mart: '₺53.043',  nisan: '₺54.127,14', nisanRaw: 54127.14, mayis: '₺46.178,33', mayisRaw: 46178.33, haziran: '₺44.507,07', haziranRaw: 44507.07, temmuz: '₺54.852,49', temmuzRaw: 54852.49, agustos: '₺63.647,81', agustosRaw: 63647.81, lowerBetter: true },
  { metric: 'Click',          subat: '25.371',   mart: '39.817',   nisan: '56.115',     nisanRaw: 56115,    mayis: '29.863',     mayisRaw: 29863,    haziran: '23.126',    haziranRaw: 23126,   temmuz: '22.930',     temmuzRaw: 22930,    agustos: '27.437',    agustosRaw: 27437 },
  { metric: 'Impression',     subat: '496.920',  mart: '824.381',  nisan: '1.158.780',  nisanRaw: 1158780,  mayis: '737.090',    mayisRaw: 737090,   haziran: '462.963',   haziranRaw: 462963,  temmuz: '382.915',   temmuzRaw: 382915,   agustos: '632.051',  agustosRaw: 632051 },
  { metric: 'CTR',            subat: '%5,11',    mart: '%4,83',    nisan: '%4,84',      nisanRaw: 4.84,     mayis: '%4,05',      mayisRaw: 4.05,     haziran: '%5,00',     haziranRaw: 5.00,    temmuz: '%5,99',     temmuzRaw: 5.99,     agustos: '%4,34',    agustosRaw: 4.34 },
  { metric: 'Avg CPC',        subat: '₺2,16',    mart: '₺1,33',    nisan: '₺0,96',      nisanRaw: 0.96,     mayis: '₺1,55',      mayisRaw: 1.55,     haziran: '₺1,92',     haziranRaw: 1.92,    temmuz: '₺2,39',     temmuzRaw: 2.39,     agustos: '₺2,32',    agustosRaw: 2.32,    lowerBetter: true },
];

const META_MONTHLY = [
  { metric: 'Cost',       subat: '₺42.568',  mart: '₺46.313',  nisan: '₺45.013',    nisanRaw: 45013,    mayis: '₺45.123',    mayisRaw: 45123,    haziran: '₺38.451',   haziranRaw: 38451,   temmuz: '₺37.067',   temmuzRaw: 37067,   agustos: '₺42.028',  agustosRaw: 42028,  lowerBetter: true },
  { metric: 'Click',      subat: '5.653',    mart: '6.695',    nisan: '8.415',      nisanRaw: 8415,     mayis: '10.625',     mayisRaw: 10625,    haziran: '10.410',    haziranRaw: 10410,   temmuz: '6.966',     temmuzRaw: 6966,    agustos: '8.002',    agustosRaw: 8002 },
  { metric: 'Impression', subat: '840.515',  mart: '885.729',  nisan: '1.193.335',  nisanRaw: 1193335,  mayis: '1.056.189',  mayisRaw: 1056189,  haziran: '813.089',   haziranRaw: 813089,  temmuz: '933.074',   temmuzRaw: 933074,  agustos: '1.062.570',agustosRaw: 1062570 },
  { metric: 'CTR',        subat: '%0,67',    mart: '%0,76',    nisan: '%0,71',      nisanRaw: 0.71,     mayis: '%1,01',      mayisRaw: 1.01,     haziran: '%1,28',     haziranRaw: 1.28,    temmuz: '%0,75',     temmuzRaw: 0.75,    agustos: '%0,75',    agustosRaw: 0.75 },
  { metric: 'Avg CPC',    subat: '₺7,53',    mart: '₺6,92',    nisan: '₺5,35',      nisanRaw: 5.35,     mayis: '₺4,25',      mayisRaw: 4.25,     haziran: '₺3,69',     haziranRaw: 3.69,    temmuz: '₺5,32',     temmuzRaw: 5.32,    agustos: '₺5,25',    agustosRaw: 5.25,    lowerBetter: true },
];

const GOOGLE_CAMPAIGN_HIGHLIGHTS = [
  {
    color: 'slate',
    title: 'Trafik Driver',
    campaign: 'nobetci-eczane-istanbul · Search',
    metrics: [
      { label: 'Clicks', value: '21.454' },
      { label: 'Impressions', value: '149.623' },
      { label: 'CTR', value: '%14,34' },
      { label: 'Avg CPC', value: '₺0,43' },
      { label: 'Cost', value: '₺9.120,47' },
    ],
    comment: 'Nöbetçi Eczane yüksek hacimli üst huni trafik kaynağı olmaya devam etti. %14,34 CTR ile güçlü tıklama performansı korundu, ancak dönüşüm üretilmedi.',
  },
  {
    color: 'slate',
    title: 'iOS App Install',
    campaign: 'ios_app_install_2811 · App',
    metrics: [
      { label: 'Clicks', value: '3.654' },
      { label: 'Impressions', value: '436.492' },
      { label: 'CTR', value: '%0,84' },
      { label: 'Avg CPC', value: '₺3,33' },
      { label: 'Cost', value: '₺12.161,25' },
    ],
    comment: "iOS App Install kampanyasında conversion 57'den 88'e yükselirken CPA ₺213,32'den ₺138,19'a geriledi; iOS acquisition tarafında Google Ads verimliliği güçlendi.",
  },
  {
    color: 'rose',
    title: 'Efficiency Watch',
    campaign: 'Happ_GLP1_Test_Search_TR · Search',
    metrics: [
      { label: 'Clicks', value: '1.290' },
      { label: 'Impressions', value: '24.586' },
      { label: 'CTR', value: '%5,25' },
      { label: 'Avg CPC', value: '₺9,32' },
      { label: 'Cost', value: '₺12.018,84' },
    ],
    comment: 'GLP Search kampanyası 20,25 conversion üretmesine rağmen ₺593,51 CPA ile diğer ana performance kampanyalarının belirgin şekilde üzerinde maliyet üretiyor.',
  },
  {
    color: 'amber',
    title: 'Strongest Improvement',
    campaign: 'anindadoktor_search_17.07 · Search',
    metrics: [
      { label: 'Clicks', value: '577' },
      { label: 'Impressions', value: '13.782' },
      { label: 'CTR', value: '%4,19' },
      { label: 'Avg CPC', value: '₺26,34' },
      { label: 'Cost', value: '₺15.199,58' },
    ],
    comment: "Anında Doktor Temmuz'a kıyasla belirgin toparlandı; conversion 63,12'den 106,44'e yükselirken CPA ₺240,81'den ₺142,79'a geriledi.",
  },
  {
    color: 'emerald',
    title: 'Best Efficiency',
    campaign: 'Check up - Search- 22.01 · Search',
    metrics: [
      { label: 'Clicks', value: '462' },
      { label: 'Impressions', value: '7.568' },
      { label: 'CTR', value: '%6,10' },
      { label: 'Avg CPC', value: '₺32,79' },
      { label: 'Cost', value: '₺15.147,68' },
    ],
    comment: "Check-Up hâlâ en yüksek conversion hacmini sağlayan Search kampanyalarından biri olsa da Temmuz'daki 289,06 conversion'dan 181,40'a geriledi ve CPA ₺52,58'den ₺83,50'ye yükseldi.",
  },
];

const META_CAMPAIGN_HIGHLIGHTS = [
  {
    color: 'emerald',
    title: 'Android — Ana Kazanım Motoru',
    campaign: 'android_kampanya_06.11',
    metrics: [
      { label: 'Harcama', value: '₺18.801' },
      { label: 'Erişim', value: '170.485' },
      { label: 'CTR', value: '%0,73' },
      { label: 'Install', value: '670' },
      { label: 'CPI', value: '₺28,06' },
      { label: 'Frekans', value: '2,43' },
    ],
    comment: 'Android tarafında ana kullanıcı kazanım motoru olmayı sürdürdü. android_hangidiyet2_19.06 kreatifi tek başına 492 install üretti. CPI ₺28,06 seviyesinde gerçekleşti. Lookalike ve yeni kreatif varyasyonlarıyla CPI optimizasyonu test edilmeli.',
  },
  {
    color: 'rose',
    title: 'iOS UGC — Fatigue',
    campaign: 'ios_UGC_13.08 · PAUSED',
    metrics: [
      { label: 'Harcama', value: '₺12.844' },
      { label: 'Erişim', value: '19.437' },
      { label: 'Frekans', value: '18,74' },
      { label: 'CTR', value: '%0,13' },
      { label: 'Trackable Install', value: '0' },
    ],
    comment: "Frekans Temmuz'daki 14,82 seviyesinden 18,74'e yükseldi. Yüksek frekans ve %0,13 CTR ciddi creative / audience fatigue sinyali verirken izlenebilir install üretilemedi.",
  },
  {
    color: 'blue',
    title: 'iOS New App Campaign',
    campaign: 'ios_app_26.08 · 6 gün aktif',
    metrics: [
      { label: 'Harcama', value: '₺2.901' },
      { label: 'Erişim', value: '32.734' },
      { label: 'CTR', value: '%0,96' },
      { label: 'Install', value: '288' },
      { label: 'CPI', value: '₺10,07' },
    ],
    comment: 'Yeni iOS App campaign ilk 6 günde 288 install ve ₺10,07 CPI üreterek güçlü bir erken acquisition sinyali verdi. Eylül tam ay performansında ölçeklenebilirlik takip edilmeli.',
  },
  {
    color: 'slate',
    title: 'Instagram Traffic',
    campaign: 'instagram_traffic_24.11',
    metrics: [
      { label: 'Harcama', value: '₺6.227' },
      { label: 'Erişim', value: '138.224' },
      { label: 'CTR', value: '%1,72' },
      { label: 'Clicks', value: '3.703' },
      { label: 'CPC', value: '₺1,68' },
      { label: 'Install', value: '4' },
    ],
    comment: 'Trafik hedefli kampanya düşük CPC ile trafik üretirken direkt install katkısı sınırlı kaldı.',
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
          <KPICard label="Toplam Ads Harcama"     value="₺105.675,81"  sub="Ağustos 2026" color="violet"  change="↑ %15,0"  />
          <KPICard label="Google Ads Harcama"    value="₺63.647,81"    sub="Ağustos 2026" color="blue"    change="↑ %16,0" />
          <KPICard label="Meta Ads Harcama"      value="₺42.028"       sub="Ağustos 2026" color="rose"    change="↑ %13,4" />
          <KPICard label="Google Ads Click"      value="27.437"        sub="Ağustos 2026" color="emerald" change="↑ %19,7" />
          <KPICard label="Google Ads Impression" value="632.051"       sub="Ağustos 2026" color="amber"   change="↑ %65,1" />
          <KPICard label="Google Ads Avg CPC"    value="₺2,32"         sub="Ağustos 2026" color="slate"   change="↓ %2,9" />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Ağustos ayında toplam reklam yatırımı Temmuz'a göre %15 artarak ₺105,7 bin seviyesine çıktı. Meta tarafında click ve impression hacmi yeniden büyürken maliyetler stabil kaldı. Google Ads'te ise click %19,7 ve impression %65,1 artmasına rağmen conversion %3,2 geriledi ve CPA %19,9 yükseldi.
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
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Ağustos</th>
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
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        <span className={`font-semibold ${row.agustos === '—' ? 'text-gray-300' : 'text-gray-900'}`}>{row.agustos}</span>
                        {row.agustosRaw > 0 && row.temmuzRaw > 0 && <ChangeBadge curr={row.agustosRaw} prev={row.temmuzRaw} lowerBetter={row.lowerBetter} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InsightNote text="Google Ads'te Ağustos ayında trafik hacmi güçlü büyüdü; click %19,7 ve impression %65,1 artarken Avg CPC %2,9 geriledi. Buna karşın conversion hacmi %3,2 azalırken CPA %19,9 yükseldi. Bu nedenle Ağustos'taki temel sorun trafik maliyetinden çok conversion efficiency oldu." />
          <div className="mt-2 flex gap-2 items-start">
            <div className="w-1 rounded-full bg-slate-200 self-stretch mt-0.5 shrink-0" style={{ minHeight: 16 }} />
            <p className="text-xs text-gray-400 leading-relaxed">Anında Doktor Temmuz'a kıyasla belirgin toparlandı; conversion 63,12'den 106,44'e yükselirken CPA ₺240,81'den ₺142,79'a geriledi. Check-Up hâlâ en yüksek conversion hacmini sağlayan Search kampanyalarından biri olsa da Temmuz'daki 289,06 conversion'dan 181,40'a geriledi ve CPA ₺52,58'den ₺83,50'ye yükseldi. iOS App Install kampanyasında conversion 57'den 88'e yükselirken CPA ₺213,32'den ₺138,19'a geriledi. GLP Search kampanyası 20,25 conversion üretmesine rağmen ₺593,51 CPA ile diğer ana performance kampanyalarının belirgin şekilde üzerinde maliyet üretiyor.</p>
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
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">Ağustos</th>
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
                      <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                        <span className={`font-semibold ${row.agustos === '—' ? 'text-gray-300' : 'text-gray-900'}`}>{row.agustos}</span>
                        {row.agustosRaw > 0 && row.temmuzRaw > 0 && <ChangeBadge curr={row.agustosRaw} prev={row.temmuzRaw} lowerBetter={row.lowerBetter} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <InsightNote text="Ağustos 2026 döneminde Meta Ads tarafında ₺42.028 harcama ile 8.002 tıklama ve 1.062.570 gösterim elde edildi. CTR %0,75 seviyesinde sabit kaldı, ortalama tıklama maliyeti ₺5,25 olarak gerçekleşti." />

          {/* Önemli Sinyaller */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-emerald-700 mb-1">Click & impression büyüdü</p>
              <p className="text-xs text-emerald-600 leading-relaxed">Ağustos'ta click +%14,9 (6.966 → 8.002) ve impression +%13,9 (933.074 → 1.062.570) arttı.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-blue-700 mb-1">Maliyetler stabil</p>
              <p className="text-xs text-blue-600 leading-relaxed">Avg CPC ₺5,32'den ₺5,25'e geriledi (-%1,3). CPM ₺39,72'den ₺39,55'e düştü (-%0,4). Harcama +%13,4 arttı.</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3.5">
              <p className="text-xs font-bold text-rose-700 mb-1">iOS UGC fatigue kritik</p>
              <p className="text-xs text-rose-600 leading-relaxed">iOS UGC kampanyası ₺12.844 harcadı, frekans 18,74'e çıktı, izlenebilir install sıfır. PAUSED durumuna alındı.</p>
            </div>
          </div>

          {/* Temmuz → Ağustos Karşılaştırma Notu */}
          <div className="mt-3 flex gap-2 items-start">
            <div className="w-1 rounded-full bg-blue-200 self-stretch mt-0.5 shrink-0" style={{ minHeight: 16 }} />
            <div>
              <p className="text-xs text-gray-500 leading-relaxed">Ağustos'ta Meta Ads tarafında click +%14,9 ve impression +%13,9 artarken CTR %0,75 seviyesinde sabit kaldı. CPC ve CPM çok küçük değişimlerle stabil kaldı.</p>
              <p className="text-xs text-gray-400 leading-relaxed mt-1">Yeni iOS App kampanyası (ios_app_26.08) 6 günde 288 install ve ₺10,07 CPI ile güçlü başlangıç yaparken, eski iOS UGC kampanyası yüksek frekans nedeniyle durduruldu.</p>
            </div>
          </div>

          {/* Kısa Yönetici Özeti */}
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex gap-2.5 items-center">
            <TrendingUp size={14} className="text-slate-500 shrink-0" />
            <p className="text-xs font-medium text-slate-700">Ağustos ayında Meta Ads tarafında click ve impression hacmi yeniden büyürken maliyetler stabil kaldı. Android ana kazanım motoru ₺28,06 CPI ile performansını sürdürürken, yeni iOS App kampanyası ₺10,07 CPI ile güçlü erken sinyal verdi. Eski iOS UGC yapısındaki yüksek frekans ana risk alanı olmaya devam etti.</p>
          </div>

          <div className="mt-3 flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Kanal bazında en önemli pozitif sinyaller yeni iOS acquisition kampanyalarından geldi. Meta'da ios_app_26.08 ₺10,07 CPI ile güçlü bir başlangıç yaparken, Google iOS App Install kampanyasında CPA ₺138,19'a geriledi. Buna karşılık eski iOS UGC yapısındaki yüksek frekans ve GLP Search kampanyasındaki yüksek CPA ana optimizasyon alanları olarak öne çıktı.
            </p>
          </div>
        </section>
      </div>

      {/* Section 4 — Google Highlights */}
      <section>
        <SectionHeader title="Google Ads" subtitle="Öne Çıkan Kampanyalar · Ağustos 2026" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {GOOGLE_CAMPAIGN_HIGHLIGHTS.map(c => (
            <MetaCampaignCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-3 flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
          <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Ağustos'ta trafik hacmi güçlü büyümesine rağmen conversion efficiency ana sorun alanı oldu. Check-Up ve Anında Doktor en yüksek conversion hacmini üreten kampanyalar olarak öne çıkarken, GLP Search ₺593,51 CPA ile optimizasyon ihtiyacı taşıyor.
          </p>
        </div>
        <div className="mt-3 flex gap-2 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <TrendingUp size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Google Ads'te Ağustos ayında trafik hacmi güçlü büyüdü; click %19,7 ve impression %65,1 artarken Avg CPC %2,9 geriledi. Buna karşın conversion hacmi %3,2 azalırken CPA %19,9 yükseldi. Bu nedenle Ağustos'taki temel sorun trafik maliyetinden çok conversion efficiency oldu. Anında Doktor toparlanma trendini sürdürürken, iOS App Install kampanyasında verimlilik güçlendi.
          </p>
        </div>

        {/* Campaign Priority */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
          {[
            { label: 'Best Efficiency',    campaign: 'Check-Up',         value: '181,40 conv · ₺83,50 CPA',   color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
            { label: 'Strongest Improvement', campaign: 'Anında Doktor', value: '106,44 conv · ₺142,79 CPA',  color: 'bg-amber-50 border-amber-200 text-amber-700' },
            { label: 'App Acquisition',    campaign: 'iOS App Install',  value: '88 conv · ₺138,19 CPA',      color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { label: 'Efficiency Watch',   campaign: 'GLP',              value: '20,25 conv · ₺593,51 CPA',   color: 'bg-rose-50 border-rose-200 text-rose-700' },
            { label: 'Traffic Driver',     campaign: 'Nöbetçi Eczane',   value: '21.454 clicks · %14,34 CTR', color: 'bg-slate-100 border-slate-200 text-slate-700' },
          ].map(item => (
            <div key={item.label} className={`rounded-xl border px-4 py-3 ${item.color}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">{item.label}</p>
              <p className="text-xs font-bold mb-0.5">{item.campaign}</p>
              <p className="text-[11px] tabular-nums opacity-80">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — Meta Ads Highlights */}
      <section>
        <SectionHeader title="Meta Ads" subtitle="Öne Çıkan Kampanyalar · Ağustos 2026" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {META_CAMPAIGN_HIGHLIGHTS.map(c => (
            <MetaCampaignCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-4 flex gap-2 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <TrendingUp size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Ağustos 2026'da android_kampanya_06.11 670 install ve ₺28,06 CPI ile ana performans motorunu sürdürdü. android_hangidiyet2_19.06 kreatifi tek başına 492 install üretti. Yeni iOS App kampanyası (ios_app_26.08) 6 günde 288 install ve ₺10,07 CPI ile güçlü başlangıç yaptı.
          </p>
        </div>
        <div className="mt-3 flex gap-3 items-start bg-rose-50 border border-rose-200 rounded-xl px-4 py-3.5">
          <AlertCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />
          <p className="text-xs text-rose-700 leading-relaxed">
            iOS UGC kampanyasında frekans 18,74'e yükseldi ve %0,13 CTR ile izlenebilir install üretilemedi. Kampanya PAUSED durumuna alındı. Yeni kreatif ve kitlelerle değiştirilmesi gerekiyor.
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
        <SectionHeader title="Sonraki Aksiyonlar" subtitle="Ağustos 2026" />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <ol className="flex flex-col gap-2.5">
            {[
              'Yeni iOS App kampanyasının Eylül tam ay ölçeklenebilirliğini takip et.',
              'Yüksek frekanslı ios_UGC_13.08 yapısını yeni kreatif ve kitlelerle değiştir.',
              'Android Meta CPI için lookalike + creative varyasyon testleri yap.',
              'Google Anında Doktor\'daki Ağustos recovery trendini koru.',
              'Check-Up Google CPA artışının search term / CPC / conversion tarafındaki nedenlerini analiz et.',
              'GLP Search kampanyasında ₺593,51 CPA nedeniyle keyword, landing page ve conversion quality optimizasyonu yap.',
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

function KPICard({ label, value, sub, color, change }: { label: string; value: string; sub: string; color: string; change?: string }) {
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
  const changeBg   = isUp ? 'bg-emerald-400/30' : 'bg-red-400/30';
  const changeText = isUp ? 'text-emerald-100'  : 'text-red-100';
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


function MetaCampaignCard({ color, title, campaign, metrics, comment }: {
  color: string;
  title: string;
  campaign: string;
  metrics: { label: string; value: string }[];
  comment: string;
}) {
  const c = colorMap[color] ?? colorMap.slate;
  return (
    <div className={`bg-white rounded-2xl border ${c.border} shadow-sm p-5 flex flex-col gap-4`}>
      <div>
        <p className={`text-[10px] font-semibold uppercase tracking-wider ${c.text} mb-1`}>{title}</p>
        <p className="text-xs font-mono text-gray-500 truncate">{campaign}</p>
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
