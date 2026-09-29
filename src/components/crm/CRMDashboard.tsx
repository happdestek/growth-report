import { useState, useMemo } from 'react';
import {
  Mail, TrendingUp, TrendingDown, Minus, MousePointer,
  Lightbulb, Filter, ChevronDown,
  Send, Eye, CheckCircle, XCircle, AlertTriangle, AlertCircle,
  Award, ShieldAlert, Smartphone, Layers, MessageCircle,
  ChevronRight, Info,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

interface Campaign {
  name: string;
  type: string;
  segment: string;
  period: string;
  sent: number;
  delivered: number;
  opens: number;
  redirects: number;
  errors: number;
  unsubscribes: number;
}

const ALL_CAMPAIGNS: Campaign[] = [
  // Mart
  { name: 'VIP Üye Özel Fırsatı',          type: 'kampanya',        segment: 'VIP',     period: 'Mart',  sent: 3100,  delivered: 3038, opens: 2069, redirects: 609,  errors: 62,  unsubscribes: 6  },
  { name: 'Segment: Diyabet Takip',         type: 'check-up',        segment: 'Kronik',  period: 'Mart',  sent: 4200,  delivered: 4158, opens: 2829, redirects: 832,  errors: 42,  unsubscribes: 9  },
  { name: 'Doğum Günü Tebrik Maili',        type: 'doğum günü',      segment: 'Üyeler',  period: 'Mart',  sent: 6200,  delivered: 6138, opens: 3807, redirects: 552,  errors: 62,  unsubscribes: 11 },
  { name: 'Yaz Check-up Kampanyası',        type: 'check-up',        segment: 'Genel',   period: 'Mart',  sent: 18400, delivered: 18124,opens: 9424, redirects: 1630, errors: 276, unsubscribes: 41 },
  { name: 'Blog: Kalp Sağlığı',             type: 'içerik',          segment: 'Genel',   period: 'Mart',  sent: 14200, delivered: 13916,opens: 8071, redirects: 418,  errors: 284, unsubscribes: 38 },
  { name: 'Evde Sağlık Tanıtım',            type: 'ürün',            segment: 'Genel',   period: 'Mart',  sent: 9800,  delivered: 9604, opens: 3842, redirects: 490,  errors: 196, unsubscribes: 28 },
  { name: 'Blog: Diyabet Rehberi',          type: 'içerik',          segment: 'Genel',   period: 'Mart',  sent: 13800, delivered: 13524,opens: 7803, redirects: 374,  errors: 276, unsubscribes: 35 },
  { name: 'Nöbetçi Eczane Bilgilendirme',   type: 'bilgilendirme',   segment: 'Genel',   period: 'Mart',  sent: 11200, delivered: 10976,opens: 5817, redirects: 308,  errors: 224, unsubscribes: 24 },
  // Şubat
  { name: 'Şubat Check-up Hatırlatma',      type: 'check-up',        segment: 'Genel',   period: 'Şubat', sent: 16500, delivered: 16170,opens: 7762, redirects: 1274, errors: 330, unsubscribes: 36 },
  { name: 'Şubat Blog: Bağışıklık',         type: 'içerik',          segment: 'Genel',   period: 'Şubat', sent: 12400, delivered: 12152,opens: 6926, redirects: 360,  errors: 248, unsubscribes: 28 },
  { name: 'Şubat Kampanya: Aşı Sezonu',     type: 'kampanya',        segment: 'Genel',   period: 'Şubat', sent: 8900,  delivered: 8722, opens: 4450, redirects: 802,  errors: 178, unsubscribes: 19 },
  // Technical outlier (abnormally low delivery)
  { name: 'Eski Liste: Yenileme Denemesi',  type: 'teknik-test',     segment: 'Genel',   period: 'Mart',  sent: 9400,  delivered: 1316, opens: 384,  redirects: 48,   errors: 8084,unsubscribes: 2  },
  { name: 'Import Test Batch',              type: 'teknik-test',     segment: 'Genel',   period: 'Şubat', sent: 5200,  delivered: 624,  opens: 131,  redirects: 18,   errors: 4576,unsubscribes: 0  },
  // Ocak
  { name: 'Ocak Yılbaşı Kampanyası',        type: 'kampanya',        segment: 'Genel',   period: 'Ocak',  sent: 21000, delivered: 20580,opens: 10496,redirects: 1890, errors: 420, unsubscribes: 48 },
  { name: 'Ocak Sağlık Rehberi',            type: 'içerik',          segment: 'Genel',   period: 'Ocak',  sent: 11600, delivered: 11368,opens: 6251, redirects: 338,  errors: 232, unsubscribes: 26 },
];

const CAMPAIGN_TYPES = ['Tümü', 'check-up', 'kampanya', 'içerik', 'ürün', 'doğum günü', 'bilgilendirme', 'teknik-test'];
const SEGMENTS       = ['Tümü', 'Genel', 'VIP', 'Üyeler', 'Kronik'];
const PERIODS        = ['Tümü', 'Mart', 'Şubat', 'Ocak'];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function pct(a: number, b: number) { return b === 0 ? 0 : (a / b) * 100; }
function fmtPct(n: number) { return n.toFixed(1) + '%'; }
function fmtNum(n: number) { return n.toLocaleString('tr-TR'); }
function pctChange(curr: number, prev: number): number | null {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

// Classify campaign: 'outlier' | 'top' | 'improve' | 'normal'
function classify(c: Campaign): 'outlier' | 'top' | 'improve' | 'normal' {
  const dr = pct(c.delivered, c.sent);
  const er = pct(c.errors, c.sent);
  if (dr < 30 || er > 40) return 'outlier';
  const or = pct(c.opens, c.delivered);
  const rr = pct(c.redirects, c.delivered);
  const ur = pct(c.unsubscribes, c.delivered);
  if (dr >= 97 && or >= 50 && rr >= 10 && ur < 0.5) return 'top';
  if (or < 35 || rr < 3 || ur > 0.5 || er > 3) return 'improve';
  return 'normal';
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function DeltaBadge({ val }: { val: number | null }) {
  if (val === null) return <span className="text-gray-300 text-xs">—</span>;
  const pos = val > 0, neg = val < 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${
      pos ? 'bg-emerald-50 text-emerald-600' : neg ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'
    }`}>
      {pos ? <TrendingUp size={9} /> : neg ? <TrendingDown size={9} /> : <Minus size={9} />}
      {val > 0 ? '+' : ''}{val}%
    </span>
  );
}

interface KPI { label: string; curr: number; prev: number; fmt: (n: number) => string; color: string; Icon: React.ComponentType<{size?: number; className?: string}>; }

const colorMap: Record<string, { pill: string; val: string; border: string; iconBg: string; iconText: string }> = {
  blue:    { pill: 'bg-blue-50 text-blue-600',       val: 'text-blue-700',    border: 'border-blue-100',    iconBg: 'bg-blue-50',    iconText: 'text-blue-500'    },
  emerald: { pill: 'bg-emerald-50 text-emerald-600', val: 'text-emerald-700', border: 'border-emerald-100', iconBg: 'bg-emerald-50', iconText: 'text-emerald-500' },
  teal:    { pill: 'bg-teal-50 text-teal-600',       val: 'text-teal-700',    border: 'border-teal-100',    iconBg: 'bg-teal-50',    iconText: 'text-teal-500'    },
  amber:   { pill: 'bg-amber-50 text-amber-600',     val: 'text-amber-700',   border: 'border-amber-100',   iconBg: 'bg-amber-50',   iconText: 'text-amber-500'   },
  rose:    { pill: 'bg-rose-50 text-rose-600',       val: 'text-rose-700',    border: 'border-rose-100',    iconBg: 'bg-rose-50',    iconText: 'text-rose-500'    },
};

function KPICard({ kpi, period }: { kpi: KPI; period: string }) {
  const c = colorMap[kpi.color];
  const change = pctChange(kpi.curr, kpi.prev);
  const prevLabel = period === 'Mart' ? 'Şubat' : period === 'Şubat' ? 'Ocak' : 'Önceki';
  return (
    <div className={`bg-white rounded-2xl border ${c.border} shadow-sm p-4 flex flex-col gap-2.5`}>
      <div className="flex items-center justify-between">
        <div className={`w-7 h-7 rounded-lg ${c.iconBg} flex items-center justify-center`}>
          <kpi.Icon size={13} className={c.iconText} />
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${c.pill}`}>{period === 'Tümü' ? 'Tüm' : period}</span>
      </div>
      <div className={`text-xl font-bold tabular-nums ${c.val}`}>{kpi.fmt(kpi.curr)}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-gray-400 font-medium leading-tight">{kpi.label}</span>
        <DeltaBadge val={change} />
      </div>
      <div className="text-[10px] text-gray-400">{prevLabel}: <span className="text-gray-600 font-medium">{kpi.fmt(kpi.prev)}</span></div>
    </div>
  );
}

function FunnelBar({ label, value, max, color, sublabel }: { label: string; value: number; max: number; color: string; sublabel?: string }) {
  const w = max > 0 ? Math.max((value / max) * 100, 2) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0 text-right">
        <span className="text-[11px] font-semibold text-gray-500">{label}</span>
        {sublabel && <p className="text-[9px] text-gray-300 leading-none">{sublabel}</p>}
      </div>
      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden relative">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${w}%` }} />
        <span className="absolute inset-0 flex items-center justify-start pl-3 text-[10px] font-bold text-white">
          {fmtNum(value)}
        </span>
      </div>
      <span className="w-12 text-[11px] text-gray-400 tabular-nums shrink-0">{fmtPct(w)}</span>
    </div>
  );
}

function ClassBadge({ cls }: { cls: ReturnType<typeof classify> }) {
  if (cls === 'top')     return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700"><CheckCircle size={9} />İyi</span>;
  if (cls === 'improve') return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700"><AlertTriangle size={9} />İyileştir</span>;
  if (cls === 'outlier') return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"><ShieldAlert size={9} />Teknik</span>;
  return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600"><Award size={9} />Normal</span>;
}

// Colour a metric value cell
function metricColor(val: number, thresholds: [number, number], reverse = false): string {
  const [good, bad] = thresholds;
  if (!reverse) {
    if (val >= good) return 'text-emerald-600 font-semibold';
    if (val >= bad)  return 'text-amber-600 font-semibold';
    return 'text-red-500 font-semibold';
  } else {
    if (val <= good) return 'text-emerald-600 font-semibold';
    if (val <= bad)  return 'text-amber-600 font-semibold';
    return 'text-red-500 font-semibold';
  }
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type SortKey = 'redirectRate' | 'openRate' | 'deliveryRate' | 'unsubRate';

export default function CRMDashboard() {
  const [typeFilter, setTypeFilter]       = useState('Tümü');
  const [segmentFilter, setSegmentFilter] = useState('Tümü');
  const [periodFilter, setPeriodFilter]   = useState('Mart');
  const [sortKey, setSortKey]             = useState<SortKey>('redirectRate');
  const [emailMonthFilter, setEmailMonthFilter] = useState('Eylül');
  const [smsExpanded, setSmsExpanded]     = useState(false);
  const [mpMonth, setMpMonth]             = useState<'temmuz' | 'agustos'>('agustos');
  const [livMonth, setLivMonth]           = useState<'temmuz' | 'agustos'>('agustos');
  const [storyMonth, setStoryMonth]       = useState<'temmuz' | 'agustos'>('agustos');

  const filtered = useMemo(() =>
    ALL_CAMPAIGNS.filter(c =>
      (typeFilter    === 'Tümü' || c.type    === typeFilter)    &&
      (segmentFilter === 'Tümü' || c.segment === segmentFilter) &&
      (periodFilter  === 'Tümü' || c.period  === periodFilter)
    ), [typeFilter, segmentFilter, periodFilter]);

  const nonOutlier = useMemo(() => filtered.filter(c => classify(c) !== 'outlier'), [filtered]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    if (sortKey === 'redirectRate') return pct(b.redirects, b.delivered) - pct(a.redirects, a.delivered);
    if (sortKey === 'openRate')     return pct(b.opens, b.delivered)     - pct(a.opens, a.delivered);
    if (sortKey === 'deliveryRate') return pct(b.delivered, b.sent)      - pct(a.delivered, a.sent);
    return pct(a.unsubscribes, a.delivered) - pct(b.unsubscribes, b.delivered);
  }), [filtered, sortKey]);

  // KPI aggregations — current vs previous period
  const curr = useMemo(() => {
    const base = periodFilter === 'Tümü' ? filtered : filtered;
    return base.reduce((acc, c) => ({
      sent:        acc.sent        + c.sent,
      delivered:   acc.delivered   + c.delivered,
      opens:       acc.opens       + c.opens,
      redirects:   acc.redirects   + c.redirects,
      unsubscribes:acc.unsubscribes+ c.unsubscribes,
      errors:      acc.errors      + c.errors,
    }), { sent: 0, delivered: 0, opens: 0, redirects: 0, unsubscribes: 0, errors: 0 });
  }, [filtered]);

  const prevPeriod = periodFilter === 'Mart' ? 'Şubat' : periodFilter === 'Şubat' ? 'Ocak' : null;
  const prev = useMemo(() => {
    const base = prevPeriod ? ALL_CAMPAIGNS.filter(c => c.period === prevPeriod) : filtered;
    return base.reduce((acc, c) => ({
      sent:        acc.sent        + c.sent,
      delivered:   acc.delivered   + c.delivered,
      opens:       acc.opens       + c.opens,
      redirects:   acc.redirects   + c.redirects,
      unsubscribes:acc.unsubscribes+ c.unsubscribes,
      errors:      acc.errors      + c.errors,
    }), { sent: 0, delivered: 0, opens: 0, redirects: 0, unsubscribes: 0, errors: 0 });
  }, [prevPeriod, filtered]);

  const kpis: KPI[] = [
    { label: 'Toplam Gönderim',   curr: curr.sent,                                  prev: prev.sent,                                  fmt: fmtNum,    color: 'blue',    Icon: Send          },
    { label: 'Delivery Rate',     curr: pct(curr.delivered, curr.sent),              prev: pct(prev.delivered, prev.sent),              fmt: fmtPct,    color: 'emerald', Icon: CheckCircle   },
    { label: 'Open Rate',         curr: pct(curr.opens, curr.delivered),             prev: pct(prev.opens, prev.delivered),             fmt: fmtPct,    color: 'teal',    Icon: Eye           },
    { label: 'Redirect Rate',     curr: pct(curr.redirects, curr.delivered),         prev: pct(prev.redirects, prev.delivered),         fmt: fmtPct,    color: 'amber',   Icon: MousePointer  },
    { label: 'Unsubscribe Rate',  curr: pct(curr.unsubscribes, curr.delivered),      prev: pct(prev.unsubscribes, prev.delivered),      fmt: fmtPct,    color: 'rose',    Icon: XCircle       },
  ];

  // Classified groups
  const topCampaigns = useMemo(() => nonOutlier.filter(c => classify(c) === 'top'), [nonOutlier]);

  // Funnel (non-outlier only)
  const funnel = useMemo(() => nonOutlier.reduce((acc, c) => ({
    sent:      acc.sent      + c.sent,
    delivered: acc.delivered + c.delivered,
    opens:     acc.opens     + c.opens,
    redirects: acc.redirects + c.redirects,
  }), { sent: 0, delivered: 0, opens: 0, redirects: 0 }), [nonOutlier]);

  const periodLabel = periodFilter === 'Tümü' ? 'Tüm Dönemler' : periodFilter;

  return (
    <div className="flex flex-col gap-5">

      {/* ── EMAIL PERFORMANCE ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Mail size={15} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Email Performance</p>
            <p className="text-xs text-gray-400">Aylık özet ve kampanya bazlı email analizi</p>
          </div>
        </div>

        {/* Top: Monthly summary + Insight side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Monthly Summary Table */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Bölüm 1</p>
              <p className="text-base font-bold text-white">Aylık Email Özeti</p>
              <p className="text-xs text-blue-200 mt-0.5">Ay bazında gönderim ve engagement metrikleri</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ay</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kampanya Sayısı</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Toplam Gönderim</th>
                    <th className="text-right px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ort. Open Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { ay: 'Eylül 2026', kampanya: 3,  gonderim: '16.04K', openRate: '%10,3', avgCtr: '%0,1', note: 'MTD · 1–20 Eylül' },
                    { ay: 'Ağustos 2026', kampanya: 8,  gonderim: '40.785', openRate: '%10,7', avgCtr: '%0,1',  note: null },
                    { ay: 'Temmuz 2026',  kampanya: 7,  gonderim: '33.681', openRate: '%11,6', avgCtr: '%0,2',  note: null },
                    { ay: 'Haziran 2026', kampanya: 6,  gonderim: '26.942', openRate: '%10,1', avgCtr: '%0,18', note: null },
                    { ay: 'Mayıs 2026',   kampanya: 4,  gonderim: '11.531', openRate: '~%7,9–10,4', avgCtr: null, note: null },
                    { ay: 'Nisan 2026',   kampanya: 6,  gonderim: '22.43K', openRate: '%11,8',       avgCtr: null, note: null },
                    { ay: 'Mart 2026',    kampanya: 2,  gonderim: '6.347',  openRate: '~%12',        avgCtr: null, note: null },
                    { ay: 'Şubat 2026',   kampanya: 4,  gonderim: '12.818', openRate: '~%10–12',     avgCtr: null, note: null },
                    { ay: 'Ocak 2026',    kampanya: 1,  gonderim: '2.91K',  openRate: '—',           avgCtr: null, note: null },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-gray-700">{row.ay}</p>
                        {row.note && (
                          <p className="text-[10px] text-blue-600 mt-0.5 flex items-center gap-1">
                            <Info size={9} />{row.note}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-gray-600">{row.kampanya ?? '—'}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-gray-700 font-semibold">{row.gonderim}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={`font-semibold tabular-nums ${row.openRate === '—' ? 'text-gray-300' : 'text-blue-600'}`}>{row.openRate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                <Lightbulb size={15} className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">İçgörü</p>
                <p className="text-[10px] text-gray-400">Bölüm 3</p>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                'Eylül’ün ilk 20 gününde 3 mailing kampanyasında 16,04 bin teslimat ve yaklaşık 1,65 bin açılma elde edildi. Open rate %10,3 seviyesinde gerçekleşerek Ağustos tam ayındaki %10,7 seviyesine yakın seyretti.',
                'Kampanya bazında en güçlü aksiyon “Prostat kontrolü ne zaman başlamalı?” mailinginden geldi; %10,6 open rate ve 11 click ile Eylül döneminin en yüksek click hacmini üretti.',
                'Sonbahar beslenme içeriği %9,8 open rate ve 2 click ile diğer iki mailingin gerisinde kaldı.',
                'Eylül MTD verisinde mailing engagement seviyesi Ağustos’a yakın seyrediyor. Open rate yalnızca 0,4 puan gerilerken click rate %0,1 seviyesinde sabit kaldı.',
                'Sağlık ihtiyacını doğrudan ifade eden konu başlığı — Prostat kontrolü — genel bülten ve yaşam tarzı içeriğine kıyasla daha yüksek click üretmiş görünüyor.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                  <CheckCircle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="bg-amber-50 rounded-xl px-3 py-2.5 border border-amber-100 mt-auto">
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Eylül’ün ilk 20 gününde 3 mailing kampanyasında 16,04 bin teslimat ve yaklaşık 1,65 bin açılma elde edildi. Open rate %10,3 seviyesinde gerçekleşerek Ağustos tam ayındaki %10,7 seviyesine yakın seyretti. Kampanya bazında en güçlü aksiyon ‘Prostat kontrolü ne zaman başlamalı?’ mailinginden geldi; %10,6 open rate ve 11 click ile Eylül döneminin en yüksek click hacmini üretti.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl px-3 py-2 border border-blue-100">
              <p className="text-[10px] text-blue-700 leading-relaxed flex items-start gap-1.5">
                <Info size={11} className="shrink-0 mt-0.5" />
                Eylül 2026 mailing verileri 1–20 Eylül dönemini kapsamaktadır. Ay henüz tamamlanmadığı için Ağustos hacim karşılaştırmaları yön göstericidir; final MoM değerlendirmesi ay kapanışında yapılmalıdır.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Campaign detail table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bölüm 2</p>
            <p className="text-base font-bold text-white">Kampanya Bazlı Detay</p>
            <p className="text-xs text-slate-400 mt-0.5">Tüm kampanyaların gönderim ve açılma verileri</p>
          </div>
          {/* Month filter */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-semibold text-gray-400 mr-1">Ay:</span>
            {['Tüm Aylar', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül'].map(m => (
              <button
                key={m}
                onClick={() => setEmailMonthFilter(m)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  emailMonthFilter === m
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kampanya Adı</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dönem</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">İletilen</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Açılan</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Open Rate</th>
                  <th className="text-right px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {([
                  { name: 'Sonbahara geçerken beslenmen hazır mı? 🍂',                       period: 'Eylül 2026', ay: 'Eylül', date: '20 Eyl 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5338, opens: 521, openRate: 9.8, ctr: 0.0, outlier: false },
                  { name: 'Prostat kontrolü ne zaman başlamalı?',                              period: 'Eylül 2026', ay: 'Eylül', date: '06 Eyl 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5348, opens: 567, openRate: 10.6, ctr: 0.2, outlier: false },
                  { name: 'Happ Bülten: Ağustos\u2019ta Öne Çıkanlar',                              period: 'Eylül 2026', ay: 'Eylül', date: '04 Eyl 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5359, opens: 567, openRate: 10.6, ctr: 0.1, outlier: false },
                  { name: 'Okula Dönüş Sadece Çocuklar İçin mi Zor?',                     period: 'Ağustos 2026', ay: 'Ağustos', date: '30 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5365, opens: 571, openRate: 10.6, ctr: 0.1, outlier: false },
                  { name: 'Dermokozmetik uygulamalarda %20 Happ ayrıcalığı',                 period: 'Ağustos 2026', ay: 'Ağustos', date: '28 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5365, opens: 558, openRate: 10.4, ctr: 0.1, outlier: false },
                  { name: 'Hangi Doktora Gitmeliyim?',                                       period: 'Ağustos 2026', ay: 'Ağustos', date: '23 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5003, opens: 524, openRate: 10.5, ctr: 0.1, outlier: false },
                  { name: 'Çocuk Check-Up Paketlerinde %25 Ayrıcalık',                      period: 'Ağustos 2026', ay: 'Ağustos', date: '21 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5024, opens: 535, openRate: 10.6, ctr: 0.1, outlier: false },
                  { name: 'Sürekli yorgun hissediyor musun?',                                period: 'Ağustos 2026', ay: 'Ağustos', date: '16 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4997, opens: 535, openRate: 10.7, ctr: 0.1, outlier: false },
                  { name: 'İngilizce Konuşma Pratiğinde %50 Ayrıcalık',                     period: 'Ağustos 2026', ay: 'Ağustos', date: '14 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5018, opens: 529, openRate: 10.5, ctr: 0.1, outlier: false },
                  { name: 'Sıcak havalarda bunlara dikkat 🌞',                               period: 'Ağustos 2026', ay: 'Ağustos', date: '09 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5043, opens: 575, openRate: 11.4, ctr: 0.1, outlier: false },
                  { name: 'Yaz geceleri uykunu etkiliyor mu?',                               period: 'Ağustos 2026', ay: 'Ağustos', date: '02 Ağu 2026', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4970, opens: 542, openRate: 10.9, ctr: 0.0, outlier: false },
                  { name: 'Happ Bülten: Temmuz’dan sana iyi gelecek yenilikler',          period: 'Temmuz 2026',  ay: 'Temmuz',  date: '31 Tem 2026 19:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 5070, opens: 563, openRate: 11.1, ctr: 0.1, outlier: false },
                  { name: '2 ay ücretsiz dijital tiyatro keyfi',                           period: 'Temmuz 2026',  ay: 'Temmuz',  date: '19 Tem 2026 18:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4725, opens: 528, openRate: 11.2, ctr: 0.1, outlier: false },
                  { name: 'Arkadaşını Davet Et, Check-Up’a Yaklaş',                       period: 'Temmuz 2026',  ay: 'Temmuz',  date: '17 Tem 2026 15:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4761, opens: 534, openRate: 11.2, ctr: 0.1, outlier: false },
                  { name: 'Kärcher Ev&Bahçe ürünlerinde %20 ayrıcalık – Happ Health’e özel', period: 'Temmuz 2026',  ay: 'Temmuz',  date: '12 Tem 2026 17:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4762, opens: 543, openRate: 11.4, ctr: 0.3, outlier: false },
                  { name: 'Klima sonrası boğaz ağrısı mı başladı?',                       period: 'Temmuz 2026',  ay: 'Temmuz',  date: '10 Tem 2026 11:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4772, opens: 548, openRate: 11.5, ctr: 0.3, outlier: false },
                  { name: 'Sigorta İhtiyaçlarında Happ Health ayrıcalığı',                 period: 'Temmuz 2026',  ay: 'Temmuz',  date: '5 Tem 2026 10:00',  segment: 'Login_2025and26.06.2026 (5066)', delivered: 4793, opens: 566, openRate: 11.8, ctr: 0.4, outlier: false },
                  { name: 'Happ Bülten: Sağlığına küçük notlar',                           period: 'Temmuz 2026',  ay: 'Temmuz',  date: '3 Tem 2026 19:00',  segment: 'Login_2025and26.06.2026 (5066)', delivered: 4798, opens: 624, openRate: 13.0, ctr: 0.1, outlier: false },
                  { name: 'Happ\'te kaç kalbin birikti?',                              period: 'Haziran 2026', ay: 'Haziran', date: '28 Haz 2026 19:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4799, opens: 561, openRate: 11.7, ctr: 0.2, outlier: false },
                  { name: 'Horlama ve sabah yorgunluğu sana ne anlatıyor olabilir?',   period: 'Haziran 2026', ay: 'Haziran', date: '21 Haz 2026 15:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4408, opens: 470, openRate: 10.7, ctr: 0.1, outlier: false },
                  { name: 'Babalar Günü Hediyen Hazır mı?',                            period: 'Haziran 2026', ay: 'Haziran', date: '17 Haz 2026 18:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4418, opens: 406, openRate: 9.2,  ctr: 0.2, outlier: false },
                  { name: 'Aracın için Happ Health\'e özel 250 TL ayrıcalık',         period: 'Haziran 2026', ay: 'Haziran', date: '12 Haz 2026 17:00', segment: 'Login_2025and26.06.2026 (5066)', delivered: 4434, opens: 371, openRate: 8.4,  ctr: 0.1, outlier: false },
                  { name: 'Babalar Günü\'ne özel Check-Up ayrıcalığı',                period: 'Haziran 2026', ay: 'Haziran', date: '9 Haz 2026 15:00',  segment: 'Login_2025and26.06.2026 (5066)', delivered: 4435, opens: 454, openRate: 10.2, ctr: 0.3, outlier: false },
                  { name: 'Anında Doktor\'da kalpler 2\'ye katlanıyor',                period: 'Haziran 2026', ay: 'Haziran', date: '5 Haz 2026 11:00',  segment: 'Login_2025and26.06.2026 (5066)', delivered: 4448, opens: 452, openRate: 10.2, ctr: 0.2, outlier: false },
                  { name: 'Cildini en son ne zaman kontrol ettirdin?',                period: 'Mayıs 2026',  ay: 'Mayıs',   date: '—', segment: '—', delivered: 3628, opens: 288, openRate: 7.94, ctr: null, outlier: false },
                  { name: 'Sağlık Kartım\'da ilerlemeni gör',                         period: 'Mayıs 2026',  ay: 'Mayıs',   date: '—', segment: '—', delivered: 3621, opens: 313, openRate: 8.64, ctr: null, outlier: false },
                  { name: 'Anneler Günü\'ne özel %25 ayrıcalık',                      period: 'Mayıs 2026',  ay: 'Mayıs',   date: '—', segment: '—', delivered: 3629, opens: 377, openRate: 10.39,ctr: null, outlier: false },
                  { name: 'Happ Health\'te sana özel %20 ayrıcalık 💙',               period: 'Mayıs 2026',  ay: 'Mayıs',   date: '—', segment: '—', delivered: 637,  opens: 61,  openRate: 9.58, ctr: null, outlier: false },
                  { name: '23 Nisan\'a özel çocuk Check-Up\'larında %30 ayrıcalık',   period: 'Nisan 2026',  ay: 'Nisan',   date: '—', segment: '—', delivered: 3580, opens: 360, openRate: 10.06,ctr: null, outlier: false },
                  { name: 'Sağlık Kartında kaç kalp birikti?',                        period: 'Nisan 2026',  ay: 'Nisan',   date: '—', segment: '—', delivered: 3601, opens: 397, openRate: 11.02,ctr: null, outlier: false },
                  { name: 'Huawei akıllı saatte 1.000 TL ayrıcalık',                 period: 'Nisan 2026',  ay: 'Nisan',   date: '—', segment: '—', delivered: 3630, opens: 265, openRate: 7.30, ctr: null, outlier: false },
                  { name: 'Sağlık Kartım',                                            period: 'Nisan 2026',  ay: 'Nisan',   date: '—', segment: '—', delivered: 3605, opens: 403, openRate: 11.18,ctr: null, outlier: false },
                  { name: 'Check-up neden kişiye özel olmalı?',                       period: 'Nisan 2026',  ay: 'Nisan',   date: '—', segment: '—', delivered: 3674, opens: 423, openRate: 11.51,ctr: null, outlier: false },
                  { name: 'Bu kontrolü en son ne zaman yaptırdın?',                   period: 'Nisan 2026',  ay: 'Nisan',   date: '—', segment: '—', delivered: 3628, opens: 422, openRate: 11.63,ctr: null, outlier: false },
                  { name: 'İstanbul\'da Ücretsiz Diş Taşı Temizliği',                period: 'Mart 2026',   ay: 'Mart',    date: '—', segment: '—', delivered: 3102, opens: 389, openRate: 12.54,ctr: null, outlier: false },
                  { name: 'Kadınlar Günü Check-up',                                   period: 'Mart 2026',   ay: 'Mart',    date: '—', segment: '—', delivered: 3104, opens: 372, openRate: 11.98,ctr: null, outlier: false },
                  { name: 'Psikolog Paketleri',                                       period: 'Şubat 2026',  ay: 'Şubat',   date: '—', segment: '—', delivered: 3146, opens: 386, openRate: 12.27,ctr: null, outlier: false },
                  { name: 'Evde Çift Check-up',                                      period: 'Şubat 2026',  ay: 'Şubat',   date: '—', segment: '—', delivered: 3151, opens: 380, openRate: 12.06,ctr: null, outlier: false },
                  { name: 'Sevgililer Günü Çark',                                     period: 'Şubat 2026',  ay: 'Şubat',   date: '—', segment: '—', delivered: 3037, opens: 318, openRate: 10.47,ctr: null, outlier: false },
                  { name: 'Kanser Farkındalık Check-up',                              period: 'Şubat 2026',  ay: 'Şubat',   date: '—', segment: '—', delivered: 3169, opens: 359, openRate: 11.33,ctr: null, outlier: false },
                  { name: 'HPV Bilgilendirme',                                        period: 'Ocak 2026',   ay: 'Ocak',    date: '—', segment: '—', delivered: 100,  opens: 33,  openRate: 33.00,ctr: null, outlier: true  },
                ] as const)
                  .filter(row => emailMonthFilter === 'Tüm Aylar' || row.ay === emailMonthFilter)
                  .map((row, i) => {
                  const periodColorMap: Record<string, string> = {
                    'Eylül 2026':  'bg-blue-50 text-blue-700',
                    'Ağustos 2026': 'bg-orange-50 text-orange-700',
                    'Temmuz 2026':  'bg-cyan-50 text-cyan-700',
                    'Haziran 2026': 'bg-violet-50 text-violet-700',
                    'Mayıs 2026': 'bg-rose-50 text-rose-700',
                    'Nisan 2026': 'bg-blue-50 text-blue-700',
                    'Mart 2026':  'bg-teal-50 text-teal-700',
                    'Şubat 2026': 'bg-emerald-50 text-emerald-700',
                    'Ocak 2026':  'bg-amber-50 text-amber-700',
                  };
                  const openRateColor = row.outlier ? 'text-gray-400' : row.openRate >= 12 ? 'text-emerald-600 font-bold' : row.openRate >= 10 ? 'text-blue-600 font-semibold' : 'text-amber-600 font-semibold';
                  return (
                    <tr key={i} className={`hover:bg-gray-50/60 transition-colors ${row.outlier ? 'bg-gray-50/60 opacity-60' : ''}`}>
                      <td className="px-5 py-3.5">
                        <p className={`font-medium ${row.outlier ? 'text-gray-400' : 'text-gray-700'}`}>{row.name}</p>
                        {row.date !== '—' && <p className="text-[10px] text-gray-400 mt-0.5">{row.date}</p>}
                        {row.outlier && (
                          <p className="text-[10px] text-amber-600 mt-0.5 flex items-center gap-1">
                            <AlertTriangle size={9} />Delivery sorunu — analiz dışı
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${periodColorMap[row.period]}`}>{row.period}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-gray-600 font-medium">{row.delivered.toLocaleString('tr-TR')}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-gray-600">{row.opens.toLocaleString('tr-TR')}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums">
                        <span className={openRateColor}>%{row.openRate.toFixed(1)}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right tabular-nums">
                        {row.ctr !== null
                          ? <span className="text-gray-600 font-semibold">%{row.ctr.toFixed(1)}</span>
                          : <span className="text-gray-300">—</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-rose-100 bg-rose-50 px-5 py-4 flex flex-col gap-2">
            <p className="text-[11px] text-rose-800 leading-relaxed">
              Eylül MTD verisinde mailing engagement seviyesi Ağustos’a yakın seyrediyor. Open rate yalnızca 0,4 puan gerilerken click rate %0,1 seviyesinde sabit kaldı. Sağlık ihtiyacını doğrudan ifade eden konu başlığı — Prostat kontrolü — genel bülten ve yaşam tarzı içeriğine kıyasla daha yüksek click üretmiş görünüyor.
            </p>
            <p className="text-[10px] text-rose-600 leading-relaxed flex items-start gap-1.5">
              <Info size={11} className="shrink-0 mt-0.5" />
              Directional comparison — September data through 20 Sep. Eylül 2026 mailing verileri 1–20 Eylül dönemini kapsamaktadır. Ay henüz tamamlanmadığı için Ağustos hacim karşılaştırmaları yön göstericidir; final MoM değerlendirmesi ay kapanışında yapılmalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* ── FİLTRELER ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <Filter size={13} /> Filtrele
          </div>
          {([
            { label: 'Dönem',          value: periodFilter,  setter: setPeriodFilter,  options: PERIODS        },
            { label: 'Kampanya Tipi',  value: typeFilter,    setter: setTypeFilter,    options: CAMPAIGN_TYPES },
            { label: 'Segment',        value: segmentFilter, setter: setSegmentFilter, options: SEGMENTS       },
          ] as const).map(f => (
            <div key={f.label} className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-400 font-medium">{f.label}:</span>
              <div className="relative">
                <select value={f.value} onChange={e => f.setter(e.target.value as never)}
                  className="appearance-none text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-blue-400 cursor-pointer">
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[10px] text-gray-400 font-medium">Sırala:</span>
            <div className="relative">
              <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)}
                className="appearance-none text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-blue-400 cursor-pointer">
                <option value="redirectRate">Redirect Rate</option>
                <option value="openRate">Open Rate</option>
                <option value="deliveryRate">Delivery Rate</option>
                <option value="unsubRate">Unsub Rate</option>
              </select>
              <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── MEDICAL PARK & LIV HOSPITAL APP İÇİ PERFORMANS ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center">
            <ChevronRight size={15} className="text-rose-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Medical Park &amp; Liv Hospital App İçi Performans</p>
            <p className="text-xs text-gray-400">Story ve Happ geçiş performansı — aylık karşılaştırma</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">

          {/* ── C) App İçi Tanıtım Performansı ── */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">App İçi Tanıtım Performansı</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Medical Park &amp; LIV Hospital story placement’larının Happ’e trafik katkısı</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {([
                      { key: 'temmuz' as const,  label: 'Temmuz 2026'  },
                      { key: 'agustos' as const, label: 'Ağustos 2026' },
                    ]).map(t => (
                      <button
                        key={t.key}
                        onClick={() => setStoryMonth(t.key)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 focus:outline-none"
                        style={
                          storyMonth === t.key
                            ? { backgroundColor: '#1e293b', color: '#fff' }
                            : { backgroundColor: '#f1f5f9', color: '#94a3b8' }
                        }
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

              {storyMonth === 'temmuz' && (
                <div className="px-5 py-4 flex flex-col gap-5">
                  {[
                    {
                      group: 'Medical Park',
                      accent: 'text-slate-700',
                      badge: 'bg-slate-700 text-white',
                      rows: [
                        { hizmet: 'Anında Doktor', goruntuleme: '7.464', tiklama: '1.423', session: '917',  ctr: '%19,1', clickToSession: '%64,4' },
                        { hizmet: 'Check-Up',      goruntuleme: '9.632', tiklama: '1.942', session: '-',    ctr: '%20,2', clickToSession: '-' },
                        { hizmet: 'Sağlık Kartım', goruntuleme: '6.596', tiklama: '687',   session: '316',  ctr: '%10,4', clickToSession: '%46,0' },
                      ],
                    },
                    {
                      group: 'Liv Hospital',
                      accent: 'text-slate-700',
                      badge: 'bg-rose-600 text-white',
                      rows: [
                        { hizmet: 'Anında Doktor', goruntuleme: '864',   tiklama: '143',   session: '90', ctr: '%16,6', clickToSession: '%62,9' },
                        { hizmet: 'Check-Up',      goruntuleme: '1.774', tiklama: '288',   session: '55', ctr: '%16,2', clickToSession: '%19,1' },
                        { hizmet: 'Sağlık Kartım', goruntuleme: '1.651', tiklama: '121',   session: '58', ctr: '%7,3',  clickToSession: '%47,9' },
                      ],
                    },
                  ].map((grp, gi) => (
                    <div key={gi} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${grp.badge}`}>{grp.group}</span>
                        <span className="text-[9px] text-slate-400">Story → Happ Web Session funnel</span>
                      </div>
                      <div className="rounded-xl border border-slate-100 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Görüntüleme</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tıklama</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Happ Web Session</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Story CTR</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Click → Session</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {grp.rows.map((row, ri) => (
                              <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                                <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">{row.goruntuleme}</td>
                                <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">
                                  <span className="text-slate-300 mr-1">→</span>{row.tiklama}
                                </td>
                                <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-slate-700">
                                  <span className="text-slate-300 mr-1">→</span>{row.session}
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <span className="text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{row.ctr}</span>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <span className={`text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-full ${row.clickToSession === '-' ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 text-teal-700'}`}>{row.clickToSession}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {'note' in grp && grp.note && (
                        <p className="text-[9px] text-slate-400 leading-relaxed mt-1.5">{grp.note}</p>
                      )}
                    </div>
                  ))}

                  {/* MP vs Liv comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Anında Doktor · Click → Session</p>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Medical Park <strong className="text-slate-700 tabular-nums">%64,4</strong></span>
                        <span className="text-slate-300">vs</span>
                        <span className="text-slate-500">Liv <strong className="text-slate-700 tabular-nums">%62,9</strong></span>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sağlık Kartım · Click → Session</p>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Medical Park <strong className="text-slate-700 tabular-nums">%46,0</strong></span>
                        <span className="text-slate-300">vs</span>
                        <span className="text-slate-500">Liv <strong className="text-slate-700 tabular-nums">%47,9</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {storyMonth === 'agustos' && (
                <div className="px-5 py-4 flex flex-col gap-5">

                  {/* ── MEDICAL PARK — August Story Funnels ── */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-700 text-white">Medical Park</span>
                      <span className="text-[9px] text-slate-400">Story → Click → Happ funnel</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { name: 'Check-Up',         viewUsers: '7.645', viewEvents: '9.786', ctr: '%24,8', clickUsers: '1.897', clickEvents: '2.358', clickToHapp: '%5,9',  happUsers: '111', happSessions: '263' },
                        { name: 'Evde Uyku Testi',   viewUsers: '8.183', viewEvents: '9.325', ctr: '%15,5', clickUsers: '1.266', clickEvents: '1.366', clickToHapp: '%33,7', happUsers: '427', happSessions: '806' },
                        { name: 'Anında Doktor',    viewUsers: '6.930', viewEvents: '7.883', ctr: '%15,4', clickUsers: '1.064', clickEvents: '1.151', clickToHapp: '%39,8', happUsers: '423', happSessions: '779' },
                        { name: 'Sağlık Kartım',    viewUsers: '3.930', viewEvents: '4.454', ctr: '%11,4', clickUsers: '448',   clickEvents: '468',   clickToHapp: '%24,8', happUsers: '111', happSessions: '208' },
                        { name: 'Meme Farkındalık',  viewUsers: '2.148', viewEvents: '2.401', ctr: '%7,2',  clickUsers: '154',   clickEvents: '176',   clickToHapp: '%16,2', happUsers: '25',  happSessions: '57'  },
                      ].map((s, si) => (
                        <div key={si} className="rounded-xl border border-slate-100 bg-slate-50/40 px-3.5 py-2.5">
                          <p className="text-[10px] font-bold text-slate-700 mb-1.5">{s.name}</p>
                          <div className="flex flex-col gap-0">
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[10px] font-medium text-slate-500">View</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{s.viewUsers} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">· {s.viewEvents} event</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 my-1 pl-3">
                              <div className="w-0.5 h-3 bg-slate-300" />
                              <span className="text-[10px] font-bold tabular-nums text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">Story CTR {s.ctr}</span>
                              <div className="w-0.5 h-3 bg-slate-300" />
                            </div>
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[10px] font-medium text-slate-500">Click</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{s.clickUsers} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">· {s.clickEvents} event</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 my-1 pl-3">
                              <div className="w-0.5 h-3 bg-slate-300" />
                              <span className="text-[10px] font-bold tabular-nums text-teal-600 bg-white px-2 py-0.5 rounded-full border border-teal-100">Click → Happ {s.clickToHapp}</span>
                              <div className="w-0.5 h-3 bg-slate-300" />
                            </div>
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[10px] font-medium text-slate-500">Happ</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{s.happUsers} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">· {s.happSessions} session</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* MP insight */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Medical Park’ta Ağustos ayında en yüksek story etkileşimi Check-Up’ta %24,8 CTR ile gerçekleşti. Happ’e geçiş tarafında Anında Doktor %39,8 ile en güçlü dönüşümü üretirken, Evde Uyku Testi %33,7 ile ikinci sırada yer aldı. Check-Up yüksek story etkileşimine rağmen %5,9 click-to-Happ oranıyla yönlendirme sonrası en fazla kaybın görüldüğü alan oldu.
                      </p>
                    </div>
                  </div>

                  {/* ── LIV HOSPITAL — August Story Funnels ── */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-rose-600 text-white">Liv Hospital</span>
                      <span className="text-[9px] text-slate-400">Story → Click → Happ funnel · Session medium = story</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { name: 'Check-Up',      viewUsers: '1.124', viewEvents: '1.371', ctr: '%24,6', clickUsers: '277', clickEvents: '335', clickToHapp: '%5,1',  happUsers: '14', happSessions: '25'  },
                        { name: 'Anında Doktor', viewUsers: '1.040', viewEvents: '1.217', ctr: '%14,2', clickUsers: '148', clickEvents: '165', clickToHapp: '%54,7', happUsers: '81', happSessions: '147' },
                        { name: 'Sağlık Kartım', viewUsers: '751',   viewEvents: '836',   ctr: '%7,5',  clickUsers: '56',  clickEvents: '62',  clickToHapp: '%39,3', happUsers: '22', happSessions: '43'  },
                        { name: 'Evde Sağlık',   viewUsers: '312',   viewEvents: '344',   ctr: '%8,3',  clickUsers: '26',  clickEvents: '31',  clickToHapp: null,     happUsers: null, happSessions: null },
                      ].map((s, si) => (
                        <div key={si} className="rounded-xl border border-slate-100 bg-slate-50/40 px-3.5 py-2.5">
                          <p className="text-[10px] font-bold text-slate-700 mb-1.5">{s.name}</p>
                          <div className="flex flex-col gap-0">
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[10px] font-medium text-slate-500">View</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{s.viewUsers} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">· {s.viewEvents} event</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 my-1 pl-3">
                              <div className="w-0.5 h-3 bg-slate-300" />
                              <span className="text-[10px] font-bold tabular-nums text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">Story CTR {s.ctr}</span>
                              <div className="w-0.5 h-3 bg-slate-300" />
                            </div>
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[10px] font-medium text-slate-500">Click</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{s.clickUsers} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">· {s.clickEvents} event</span>
                              </div>
                            </div>
                            {s.clickToHapp !== null ? (
                              <>
                                <div className="flex items-center gap-2 my-1 pl-3">
                                  <div className="w-0.5 h-3 bg-slate-300" />
                                  <span className="text-[10px] font-bold tabular-nums text-teal-600 bg-white px-2 py-0.5 rounded-full border border-teal-100">Click → Happ {s.clickToHapp}</span>
                                  <div className="w-0.5 h-3 bg-slate-300" />
                                </div>
                                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200">
                                  <span className="text-[10px] font-medium text-slate-500">Happ</span>
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-extrabold tabular-nums text-slate-800">{s.happUsers} kullanıcı</span>
                                    <span className="text-[9px] font-medium tabular-nums text-slate-400">· {s.happSessions} session</span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-slate-200 mt-1">
                                <span className="text-[10px] font-medium text-slate-500">Happ</span>
                                <span className="text-[11px] font-medium text-slate-400">—</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Liv insight */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Liv Hospital’da Ağustos ayında Check-Up %24,6 ile en yüksek story CTR’ını üretirken, yönlendirme sonrası en güçlü Happ geçişi Anında Doktor’da gerçekleşti. Anında Doktor story’sine tıklayan kullanıcıların %54,7’si Happ tarafında ölçülürken, Sağlık Kartım’da bu oran %39,3 oldu. Check-Up yüksek story etkileşimine rağmen %5,1 click-to-Happ oranıyla yönlendirme sonrası geliştirme fırsatı taşıyor.
                      </p>
                    </div>
                  </div>

                  {/* Shared methodology note */}
                  <div className="flex gap-1.5 items-start">
                    <Info size={10} className="text-slate-300 mt-0.5 shrink-0" />
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Story funnel oranları benzersiz kullanıcı (Total Users) üzerinden hesaplanır. Event Count toplam etkileşim hacmini, Happ Session yönlendirme sonrasında oluşan oturumları gösterir. Aynı kullanıcı birden fazla event veya session oluşturabilir. Liv Hospital Story Performance için Happ tarafında yalnızca Session medium = story trafiği kullanılır.
                    </p>
                  </div>
                </div>
              )}
            </div>

              {/* Story performance insight */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3" style={{ display: storyMonth === 'temmuz' ? 'block' : 'none' }}>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Temmuz ayında Anında Doktor story akışı her iki uygulamada da güçlü ve tutarlı bir funnel performansı gösterdi. Story tıklamasından Happ web session’a geçiş Medical Park’ta %64,4, Liv Hospital’da %62,9 seviyesinde gerçekleşti. Check-Up story’leri en yüksek görüntüleme ve tıklama hacmini üretirken, Sağlık Kartım’da MP ve Liv tarafında click-to-session oranları sırasıyla %46,0 ve %47,9 oldu.
                </p>
              </div>

              {/* ── Medical Park App-Button Funnel — Monthly Tabs ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Medical Park — App İçi Hizmet Funnel</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Medical Park kullanıcısından Happ’e geçiş performansı</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {([
                      { key: 'temmuz' as const,  label: 'Temmuz 2026'  },
                      { key: 'agustos' as const, label: 'Ağustos 2026' },
                    ]).map(t => (
                      <button
                        key={t.key}
                        onClick={() => setMpMonth(t.key)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 focus:outline-none"
                        style={
                          mpMonth === t.key
                            ? { backgroundColor: '#1e293b', color: '#fff' }
                            : { backgroundColor: '#f1f5f9', color: '#94a3b8' }
                        }
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {mpMonth === 'temmuz' && (
                <div className="px-5 py-4 flex flex-col gap-5">
                  {[
                    {
                      label: 'Ana Sayfa Yönlendirmeleri',
                      rows: [
                        { hizmet: 'Check-Up',      mpUser: '5.354', happUser: '75', rate: '%1,4' },
                        { hizmet: 'Evde Sağlık',   mpUser: '3.459', happUser: '30', rate: '%0,9' },
                      ],
                    },
                    {
                      label: 'Happ Hizmet Alanı',
                      rows: [
                        { hizmet: 'Check-Up',      mpUser: '657', happUser: '206', rate: '%31,4' },
                        { hizmet: 'Psikolog',      mpUser: '327', happUser: '82',  rate: '%25,1' },
                        { hizmet: 'Anında Doktor', mpUser: '238', happUser: '57',  rate: '%23,9' },
                        { hizmet: 'Diyetisyen',    mpUser: '374', happUser: '60',  rate: '%16,0' },
                        { hizmet: 'Online Doktor', mpUser: '442', happUser: '66',  rate: '%14,9' },
                        { hizmet: 'Evde Sağlık',   mpUser: '178', happUser: '24',  rate: '%13,5' },
                      ],
                    },
                  ].map((grp, gi) => (
                    <div key={gi} className="flex flex-col gap-2">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{grp.label}</p>
                      <div className="rounded-xl border border-slate-100 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">MP Kullanıcısı</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Happ’e Geçen</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Geçiş Oranı</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {grp.rows.map((row, ri) => (
                              <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                                <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">{row.mpUser}</td>
                                <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">
                                  <span className="text-slate-300 mr-1">→</span>{row.happUser}
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <span className="text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                                    <span className="text-slate-300 mr-1">→</span>{row.rate}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {'note' in grp && grp.note && (
                        <p className="text-[9px] text-slate-400 leading-relaxed mt-1.5">{grp.note}</p>
                      )}
                    </div>
                  ))}

                  {/* Grand Total — all groups combined */}
                  <div className="rounded-xl border-2 border-slate-700 overflow-hidden">
                    <table className="w-full text-xs">
                      <tbody>
                        <tr className="bg-slate-800">
                          <td className="px-3 py-3 font-extrabold text-white uppercase text-[11px] tracking-wider">Genel Toplam</td>
                          <td className="px-3 py-3 text-right tabular-nums font-extrabold text-white text-sm">11.029</td>
                          <td className="px-3 py-3 text-right tabular-nums font-extrabold text-white text-sm">
                            <span className="text-slate-400 mr-1">→</span>600
                          </td>
                          <td className="px-3 py-3 text-right">
                            <span className="text-[12px] font-extrabold tabular-nums px-2.5 py-1 rounded-full bg-white text-slate-800">
                              <span className="text-slate-400 mr-1">→</span>%5,4
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Insight + methodology */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Temmuz ayında Happ hizmet alanında en güçlü geçiş Check-Up’ta gerçekleşti (%31,4). Psikolog (%25,1) ve Anında Doktor (%23,9) diğer yüksek dönüşümlü hizmetler olarak öne çıktı.
                    </p>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Happ’e Geçen Kullanıcı, yeni uygulama indirmesi anlamına gelmez. Yönlendirme linki uygulama yüklüyse Happ’i açar, yüklü değilse uygulama mağazasına yönlendirir.
                    </p>
                  </div>
                </div>
                )}

                {mpMonth === 'agustos' && (
                <div className="px-5 py-4 flex flex-col gap-5">

                  {/* 1 — Happ Alanına Giriş */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Happ Alanına Giriş</p>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">Happ Alanını Açan Kullanıcı</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Medical Park içindeki Happ bölümünü açan toplam kullanıcı</p>
                      </div>
                      <p className="text-2xl font-extrabold tabular-nums text-slate-800">13.337</p>
                    </div>
                  </div>

                  {/* 2 — Happ Hizmet Alanı */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Happ Hizmet Alanı</p>
                    <div className="rounded-xl border border-slate-100 overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                            <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Toplam Kullanıcı</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { hizmet: 'Check-Up',      users: '419' },
                            { hizmet: 'Online Doktor', users: '256' },
                            { hizmet: 'Psikolog',      users: '182' },
                            { hizmet: 'Diyetisyen',    users: '174' },
                            { hizmet: 'Anında Doktor', users: '132' },
                            { hizmet: 'Evde Sağlık',   users: '78'  },
                          ].map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-slate-700">{row.users}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Hizmetler birbirini dışlamaz; aynı kullanıcı birden fazla hizmetle etkileşim kurabilir.
                    </p>
                  </div>

                  {/* 3 — Ana Sayfa Hizmet Etkileşimleri */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Ana Sayfa Hizmet Etkileşimleri</p>
                    <div className="rounded-xl border border-slate-100 overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                            <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Toplam Kullanıcı</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { hizmet: 'Check-Up',    users: '325' },
                            { hizmet: 'Evde Sağlık', users: '193' },
                          ].map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-slate-700">{row.users}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 4 — Yeni Check-Up Akışı */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Yeni Check-Up Akışı</p>
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Erken Dönem Sinyali</span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/40 px-4 py-3">
                      <div className="flex flex-col gap-0">
                        {[
                          { label: 'Ana Sayfa',         users: 11, events: 46, conv: null     },
                          { label: 'Bilgilendirme',     users: 9,  events: 34, conv: '%81,8'  },
                          { label: 'Devam Et',          users: 8,  events: 25, conv: '%88,9'  },
                          { label: 'Teklif',            users: 8,  events: 25, conv: '%100'   },
                          { label: 'Paketleri İncele',  users: 7,  events: 21, conv: '%87,5'  },
                        ].map((step, si, arr) => (
                          <div key={si} className="flex flex-col items-center">
                            {si > 0 && (
                              <div className="flex items-center gap-2 my-1">
                                <div className="w-0.5 h-3 bg-slate-300" />
                                <span className="text-[10px] font-bold tabular-nums text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                                  {arr[si].conv}
                                </span>
                                <div className="w-0.5 h-3 bg-slate-300" />
                              </div>
                            )}
                            <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-200">
                              <span className="text-[11px] font-medium text-slate-600">{step.label}</span>
                              <div className="flex flex-col items-end leading-tight">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{step.users} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">{step.events} event</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">Uçtan Uca Kullanıcı Dönüşümü</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-300 tabular-nums">11 → 7</span>
                          <span className="text-sm font-extrabold tabular-nums text-white bg-slate-600 px-2 py-0.5 rounded-full">%63,6</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Yeni event yapısı ay içerisinde devreye alındığı için bu oran erken dönem sinyali olarak değerştirilmelidir.
                    </p>
                  </div>

                  {/* 5 — August Event Migration Note */}
                  <div className="flex gap-2 items-start bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                    <Info size={12} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-[9px] text-slate-500 leading-relaxed">
                      Ölçüm Notu: Ağustos ayı içinde Medical Park Check-Up ana sayfa event yapısı güncellendi. Ayın ilk bölümünde <span className="font-mono text-slate-600">homepage_happ_check_up</span> kullanılırken, yeni uygulama versiyonuyla birlikte <span className="font-mono text-slate-600">happ_homepage_checkup_click</span> ve detaylı Check-Up funnel eventleri devreye alındı. Ağustos bu nedenle geçiş dönemi olarak değerştirilmelidir. İki event birbirine eklenmemektedir. Eylül 2026 itibarıyla ana Check-Up tıklama metriği yalnızca <span className="font-mono text-slate-600">happ_homepage_checkup_click</span> üzerinden takip edilecektir.
                    </p>
                  </div>

                  {/* 6 — August Insight */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Ağustos ayında Medical Park içindeki Happ alanı 13.337 kullanıcı tarafından açıldı. Hizmet bazında Check-Up 419 kullanıcıyla en yüksek etkileşimi üretirken, yeni Check-Up akışında ilk ölçümlerde 11 kullanıcıdan 7'si Paketleri İncele adımına ulaşarak %63,6 uçtan uca ilerleme gösterdi. Yeni event yapısı ay içerisinde devreye alındığı için bu oran erken dönem sinyali olarak değerlendirilmelidir.
                    </p>
                    <div className="flex gap-1.5 items-start">
                      <Info size={10} className="text-slate-300 mt-0.5 shrink-0" />
                      <p className="text-[9px] text-slate-400 leading-relaxed">
                        Funnel dönüşüm oranları benzersiz kullanıcı (Total Users) üzerinden hesaplanır. Event Count aynı kullanıcıların oluşturduğu toplam etkileşim hacmini gösterir ve dönüşüm oranı hesaplamasında kullanılmaz.
                      </p>
                    </div>
                  </div>
                </div>
                )}
              </div>

              {/* ── Liv Hospital App-Button Funnel — Monthly Tabs ── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Liv Hospital — App İçi Hizmet Funnel</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Liv kullanıcısından Happ’e geçiş performansı</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {([
                      { key: 'temmuz' as const,  label: 'Temmuz 2026'  },
                      { key: 'agustos' as const, label: 'Ağustos 2026' },
                    ]).map(t => (
                      <button
                        key={t.key}
                        onClick={() => setLivMonth(t.key)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 focus:outline-none"
                        style={
                          livMonth === t.key
                            ? { backgroundColor: '#be123c', color: '#fff' }
                            : { backgroundColor: '#f1f5f9', color: '#94a3b8' }
                        }
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {livMonth === 'temmuz' && (
                <div className="px-5 py-4 flex flex-col gap-5">
                  {[
                    {
                      label: 'Ana Sayfa Yönlendirmeleri',
                      rows: [
                        { hizmet: 'Check-Up',      livUser: '4.069', happUser: '25', rate: '%0,6' },
                        { hizmet: 'Evde Sağlık',   livUser: '2.416', happUser: '2',  rate: '%0,1' },
                      ],
                    },
                    {
                      label: 'Happ Hizmet Alanı',
                      rows: [
                        { hizmet: 'Check-Up',      livUser: '361', happUser: '7', rate: '%1,9' },
                        { hizmet: 'Online Doktor', livUser: '260', happUser: '3', rate: '%1,2' },
                        { hizmet: 'Psikolog',      livUser: '176', happUser: '2', rate: '%1,1' },
                        { hizmet: 'Evde Sağlık',   livUser: '101', happUser: '1', rate: '%1,0' },
                        { hizmet: 'Anında Doktor', livUser: '120', happUser: '1', rate: '%0,8' },
                        { hizmet: 'Diyetisyen',    livUser: '148', happUser: '-', rate: '-' },
                      ],
                    },
                  ].map((grp, gi) => (
                    <div key={gi} className="flex flex-col gap-2">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{grp.label}</p>
                      <div className="rounded-xl border border-slate-100 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Liv Kullanıcısı</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Happ’e Geçen</th>
                              <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Geçiş Oranı</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {grp.rows.map((row, ri) => (
                              <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                                <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">{row.livUser}</td>
                                <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">
                                  <span className="text-slate-300 mr-1">→</span>{row.happUser}
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  <span className={`text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-full ${row.rate === '-' ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 text-teal-700'}`}>
                                    <span className="text-slate-300 mr-1">→</span>{row.rate}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {'note' in grp && grp.note && (
                        <p className="text-[9px] text-slate-400 leading-relaxed mt-1.5">{grp.note}</p>
                      )}
                    </div>
                  ))}

                  {/* Grand Total — all groups combined */}
                  <div className="rounded-xl border-2 border-rose-600 overflow-hidden">
                    <table className="w-full text-xs">
                      <tbody>
                        <tr className="bg-rose-700">
                          <td className="px-3 py-3 font-extrabold text-white uppercase text-[11px] tracking-wider">Ölçülebilir Genel Toplam</td>
                          <td className="px-3 py-3 text-right tabular-nums font-extrabold text-white text-sm">7.503</td>
                          <td className="px-3 py-3 text-right tabular-nums font-extrabold text-white text-sm">
                            <span className="text-rose-300 mr-1">→</span>41
                          </td>
                          <td className="px-3 py-3 text-right">
                            <span className="text-[12px] font-extrabold tabular-nums px-2.5 py-1 rounded-full bg-white text-rose-700">
                              <span className="text-rose-300 mr-1">→</span>%0,5
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-relaxed -mt-3">
                    Toplam etkileşim hacmi 7.651 kullanıcıdır. Diyetisyen yönlendirmesinin Happ tarafındaki karşılığı henüz doğrulanmadığı için genel dönüşüm oranına dahil edilmemiştir.
                  </p>

                  {/* Insight + methodology */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Temmuz ayında Liv Hospital içi yönlendirmelerde en yüksek ölçülen geçiş Check-Up hizmetinde %1,9 seviyesinde gerçekleşti. Online Doktor %1,2 ve Psikolog %1,1 ile sonraki en yüksek oranları oluşturdu.
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Liv kaynaklı Happ tarafında ölçülen kullanıcı hacmi düşük göründüğü için sonuçlar attribution / deep-link ölçüm yapısıyla birlikte değerlendirilmelidir.
                    </p>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Happ’e Geçen Kullanıcı yeni uygulama indirmesi değildir. Yönlendirme linki uygulama yüklüyse Happ’i açar, yüklü değilse uygulama mağazasına yönlendirir.
                    </p>
                  </div>
                </div>
                )}

                {livMonth === 'agustos' && (
                <div className="px-5 py-4 flex flex-col gap-5">

                  {/* 1 — Happ Alanına Giriş */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Happ Alanına Giriş</p>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">Happ Alanını Açan Kullanıcı</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Liv Hospital içindeki Happ bölümünü açan toplam kullanıcı</p>
                      </div>
                      <div className="flex flex-col items-end leading-tight">
                        <p className="text-2xl font-extrabold tabular-nums text-slate-800">2.951 kullanıcı</p>
                        <p className="text-[10px] font-medium tabular-nums text-slate-400 mt-0.5">4.471 event</p>
                      </div>
                    </div>
                  </div>

                  {/* 2 — Happ Hizmet Alanı */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Happ Hizmet Alanı</p>
                    <div className="rounded-xl border border-slate-100 overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                            <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Kullanıcı</th>
                            <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Event</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { hizmet: 'Check-Up',      users: '107', events: '123' },
                            { hizmet: 'Online Doktor', users: '60',  events: '73'  },
                            { hizmet: 'Diyetisyen',    users: '48',  events: '54'  },
                            { hizmet: 'Psikolog',      users: '44',  events: '59'  },
                            { hizmet: 'Anında Doktor', users: '34',  events: '37'  },
                            { hizmet: 'Evde Sağlık',   users: '21',  events: '22'  },
                          ].map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-slate-700">{row.users}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums text-slate-400">{row.events}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Hizmetler birbirini dışlamaz; aynı kullanıcı birden fazla hizmetle etkileşim kurabilir.
                    </p>
                  </div>

                  {/* 3 — Ana Sayfa Hizmet Etkileşimleri */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Ana Sayfa Hizmet Etkileşimleri</p>
                    <div className="rounded-xl border border-slate-100 overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hizmet</th>
                            <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Kullanıcı</th>
                            <th className="text-right px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Event</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { hizmet: 'Check-Up',    users: '261', events: '338' },
                            { hizmet: 'Evde Sağlık', users: '148', events: '163' },
                          ].map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3 py-2.5 font-medium text-slate-700">{row.hizmet}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-slate-700">{row.users}</td>
                              <td className="px-3 py-2.5 text-right tabular-nums text-slate-400">{row.events}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Ayın ilk bölümünde kullanılan eski event yapısı değerleridir.
                    </p>
                  </div>

                  {/* 4 — Yeni Check-Up Akışı */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Yeni Check-Up Akışı</p>
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Erken Dönem Sinyali</span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/40 px-4 py-3">
                      <div className="flex flex-col gap-0">
                        {[
                          { label: 'Ana Sayfa',          users: 5, events: 7, conv: null    },
                          { label: 'Bilgilendirme',      users: 4, events: 6, conv: '%80'   },
                          { label: 'Devam Et',           users: 4, events: 4, conv: '%100'  },
                          { label: 'Teklif',             users: 4, events: 4, conv: '%100'  },
                          { label: 'Paketleri İncele',   users: 4, events: 4, conv: '%100'  },
                          { label: 'Yönlendirme',        users: 4, events: 4, conv: '%100'  },
                          { label: 'Download CTA',       users: 4, events: 4, conv: null    },
                          { label: 'App Open Attempt',   users: 4, events: 4, conv: null    },
                        ].map((step, si, arr) => (
                          <div key={si} className="flex flex-col items-center">
                            {si > 0 && arr[si].conv !== null && (
                              <div className="flex items-center gap-2 my-1">
                                <div className="w-0.5 h-3 bg-rose-200" />
                                <span className="text-[10px] font-bold tabular-nums text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-100">
                                  {arr[si].conv}
                                </span>
                                <div className="w-0.5 h-3 bg-rose-200" />
                              </div>
                            )}
                            {si > 0 && arr[si].conv === null && (
                              <div className="w-0.5 h-3 bg-rose-200 my-1" />
                            )}
                            <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-200">
                              <span className="text-[11px] font-medium text-slate-600">{step.label}</span>
                              <div className="flex flex-col items-end leading-tight">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{step.users} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">{step.events} event</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-lg bg-rose-700">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">Uçtan Uca Kullanıcı İlerlemesi</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-rose-200 tabular-nums">5 → 4</span>
                          <span className="text-sm font-extrabold tabular-nums text-white bg-rose-600 px-2 py-0.5 rounded-full">%80</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Download CTA tıklamaları indirme anlamına gelmez; kullanıcıyı uygulama mağazasına yönlendiren CTA etkileşimidir. App Open Attempt ise uygulamanın başarıyla açıldığı anlamına gelmez.
                    </p>
                  </div>

                  {/* 5 — Evde Sağlık Akışı */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Evde Sağlık Akışı</p>
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Erken Dönem Sinyali</span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/40 px-4 py-3">
                      <div className="flex flex-col gap-0">
                        {[
                          { label: 'Ana Sayfa',     users: 3, events: 4, conv: null     },
                          { label: 'Bilgilendirme', users: 2, events: 2, conv: '%66,7'  },
                        ].map((step, si, arr) => (
                          <div key={si} className="flex flex-col items-center">
                            {si > 0 && (
                              <div className="flex items-center gap-2 my-1">
                                <div className="w-0.5 h-3 bg-rose-200" />
                                <span className="text-[10px] font-bold tabular-nums text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-100">
                                  {arr[si].conv}
                                </span>
                                <div className="w-0.5 h-3 bg-rose-200" />
                              </div>
                            )}
                            <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-slate-200">
                              <span className="text-[11px] font-medium text-slate-600">{step.label}</span>
                              <div className="flex flex-col items-end leading-tight">
                                <span className="text-sm font-extrabold tabular-nums text-slate-800">{step.users} kullanıcı</span>
                                <span className="text-[9px] font-medium tabular-nums text-slate-400">{step.events} event</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Sonraki adımlar için veri henüz mevcut değildir.
                    </p>
                  </div>

                  {/* 6 — Story Özeti */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Story Özeti</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Check-Up Story */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/40 px-3 py-3">
                        <p className="text-[10px] font-bold text-slate-600 mb-2">Check-Up Story</p>
                        <div className="flex flex-col gap-0">
                          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white border border-slate-200">
                            <span className="text-[11px] font-medium text-slate-600">View</span>
                            <div className="flex flex-col items-end leading-tight">
                              <span className="text-sm font-extrabold tabular-nums text-slate-800">1.124 kullanıcı</span>
                              <span className="text-[9px] font-medium tabular-nums text-slate-400">1.371 event</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 my-1">
                            <div className="w-0.5 h-3 bg-rose-200" />
                            <span className="text-[10px] font-bold tabular-nums text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-100">%24,6</span>
                            <div className="w-0.5 h-3 bg-rose-200" />
                          </div>
                          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white border border-slate-200">
                            <span className="text-[11px] font-medium text-slate-600">Click</span>
                            <div className="flex flex-col items-end leading-tight">
                              <span className="text-sm font-extrabold tabular-nums text-slate-800">277 kullanıcı</span>
                              <span className="text-[9px] font-medium tabular-nums text-slate-400">335 event</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-rose-700">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Story User CTR</span>
                          <span className="text-sm font-extrabold tabular-nums text-white bg-rose-600 px-2 py-0.5 rounded-full">%24,6</span>
                        </div>
                      </div>

                      {/* Evde Sağlık Story */}
                      <div className="rounded-xl border border-slate-100 bg-slate-50/40 px-3 py-3">
                        <p className="text-[10px] font-bold text-slate-600 mb-2">Evde Sağlık Story</p>
                        <div className="flex flex-col gap-0">
                          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white border border-slate-200">
                            <span className="text-[11px] font-medium text-slate-600">View</span>
                            <div className="flex flex-col items-end leading-tight">
                              <span className="text-sm font-extrabold tabular-nums text-slate-800">312 kullanıcı</span>
                              <span className="text-[9px] font-medium tabular-nums text-slate-400">344 event</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 my-1">
                            <div className="w-0.5 h-3 bg-rose-200" />
                            <span className="text-[10px] font-bold tabular-nums text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-100">%8,3</span>
                            <div className="w-0.5 h-3 bg-rose-200" />
                          </div>
                          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white border border-slate-200">
                            <span className="text-[11px] font-medium text-slate-600">Click</span>
                            <div className="flex flex-col items-end leading-tight">
                              <span className="text-sm font-extrabold tabular-nums text-slate-800">26 kullanıcı</span>
                              <span className="text-[9px] font-medium tabular-nums text-slate-400">31 event</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-rose-700">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Story User CTR</span>
                          <span className="text-sm font-extrabold tabular-nums text-white bg-rose-600 px-2 py-0.5 rounded-full">%8,3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 7 — August Event Migration Note */}
                  <div className="flex gap-2 items-start bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                    <Info size={12} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-[9px] text-slate-500 leading-relaxed">
                      Ölçüm Notu: Ağustos ayı içerisinde Liv Hospital uygulamasında Check-Up ve Evde Sağlık ana sayfa event yapısı yeni uygulama versiyonuyla güncellendi. Ayın ilk bölümünde <span className="font-mono text-slate-600">homepage_happ_check_up</span> / <span className="font-mono text-slate-600">homepage_happ_home_health</span> eventleri kullanılırken, güncelleme sonrasında <span className="font-mono text-slate-600">happ_homepage_checkup_click</span> / <span className="font-mono text-slate-600">happ_homepage_home_health_click</span> ve detaylı funnel eventleri devreye alındı. Eski ve yeni event değerleri birbirine eklenmemektedir. Ağustos geçiş dönemi olarak değerlendirilmelidir. Eylül 2026 itibarıyla yalnızca yeni event yapısı raporlama standardı olarak kullanılacaktır.
                    </p>
                  </div>

                  {/* 8 — Metric Explanation */}
                  <div className="flex gap-1.5 items-start">
                    <Info size={10} className="text-slate-300 mt-0.5 shrink-0" />
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Funnel dönüşüm oranları benzersiz kullanıcı (Total Users) üzerinden hesaplanır. Event Count aynı kullanıcıların oluşturduğu toplam etkileşim hacmini gösterir ve dönüşüm hesabında kullanılmaz.
                    </p>
                  </div>

                  {/* 9 — August Management Insight */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Ağustos ayında Liv Hospital içindeki Happ alanı 2.951 kullanıcı tarafından açıldı. Hizmet bazında Check-Up 107 kullanıcıyla en yüksek etkileşimi üretirken, yeni Check-Up akışında ilk ölçümlerde 5 kullanıcıdan 4'ü son yönlendirme adımlarına ilerledi. Event yapısının ay içerisinde güncellenmesi nedeniyle yeni funnel sonuçları erken dönem sinyali olarak değerlendirilmelidir.
                    </p>
                  </div>
                </div>
                )}
              </div>
            </div>

          </div>
      </div>

      {/* ── WHATSAPP PERFORMANCE ── */}
      <div className="flex flex-col gap-4">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
            <MessageCircle size={15} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">WhatsApp Performance</p>
            <p className="text-xs text-gray-400">Kampanya ve otomasyon mesaj analizi</p>
          </div>
        </div>

        {/* SECTION 1 — Kampanya Mesajları */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest mb-1">Section 1</p>
              <p className="text-base font-bold text-white">Kampanya Mesajları</p>
              <p className="text-xs text-emerald-200 mt-0.5">WhatsApp kanalı üzerinden gönderilen kampanya mesajlarının performansı</p>
            </div>
            <span className="text-[9px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-md shrink-0 mt-0.5">WhatsApp</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kampanya Adı</th>
                  <th className="text-left px-3 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="text-right px-3 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Gönderilen Mesajlar</th>
                  <th className="text-right px-3 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Teslim Edilen Mesajlar</th>
                  <th className="text-right px-3 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Open / Read Rate</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Click Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Diş Taşı Kampanyası',    sent: '4.210', delivered: '4.102', openRate: '72.4%', clickRate: '8.1%',  clickHigh: true  },
                  { name: 'Check-up Kampanyası',     sent: '6.870', delivered: '6.654', openRate: '68.9%', clickRate: '6.3%',  clickHigh: false },
                  { name: 'Diyet Kampanyası',        sent: '3.540', delivered: '3.388', openRate: '65.2%', clickRate: '5.7%',  clickHigh: false },
                  { name: 'Farkındalık Kampanyası',  sent: '5.120', delivered: '4.930', openRate: '61.8%', clickRate: '4.2%',  clickHigh: false },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-gray-700">{row.name}</td>
                    <td className="px-3 py-3.5 text-gray-400">—</td>
                    <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">{row.sent}</td>
                    <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">{row.delivered}</td>
                    <td className="px-3 py-3.5 text-right">
                      <span className="font-semibold text-emerald-600 tabular-nums">{row.openRate}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className={`font-bold tabular-nums px-2 py-0.5 rounded-full text-[11px] ${row.clickHigh ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {row.clickRate}
                      </span>
                    </td>
                  </tr>
                ))}
                {/* campaign_evde_uyku_testi */}
                <tr className="hover:bg-gray-50 transition-colors border-t-2 border-emerald-100 bg-emerald-50/30">
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-700">Evde uyku testi</span>
                      <p className="text-[10px] text-gray-400 font-mono">campaign_evde_uyku_testi</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5 max-w-xs">
                        389 mesaj gönderilmiş, 376 teslimat sağlanmış ve 245 okuma ile %65 okunma oranı elde edilmiştir. Kampanya 1 benzersiz yanıt üretmiştir.
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-gray-600 text-[11px] whitespace-nowrap">19 Haziran 2026</td>
                  <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">389</td>
                  <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">376</td>
                  <td className="px-3 py-3.5 text-right">
                    <span className="font-semibold text-emerald-600 tabular-nums">%65</span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-gray-400">—</td>
                </tr>
                {/* campaign_instant_health */}
                <tr className="hover:bg-gray-50 transition-colors border-t border-emerald-100 bg-emerald-50/20">
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-700">Anında Sağlık</span>
                      <p className="text-[10px] text-gray-400 font-mono">campaign_instant_health</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5 max-w-xs">
                        Anında Sağlık kampanyasında 450 mesaj gönderilmiş, 436 teslimat sağlanmış ve 251 okuma ile %58 okunma oranı elde edilmiştir. Tıklama oranı %6,65 seviyesinde gerçekleşmiştir.
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-gray-600 text-[11px] whitespace-nowrap">Haziran 2026</td>
                  <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">450</td>
                  <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">436</td>
                  <td className="px-3 py-3.5 text-right">
                    <span className="font-semibold text-emerald-600 tabular-nums">%58</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-bold tabular-nums px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700">%6,65</span>
                  </td>
                </tr>
                {/* Anında Doktor – Temmuz 2026 */}
                <tr className="hover:bg-gray-50 transition-colors border-t border-emerald-100 bg-emerald-50/20">
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-700">Anında Doktor</span>
                      <p className="text-[10px] text-gray-400 font-mono">hot_weather_discount_doctor</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5 max-w-xs">
                        Temmuz ayında gönderilen Anında Doktor WhatsApp kampanyasında 372 mesajın 365’i teslim edildi. Mesaj %65 open/read rate ve %3,29 click rate ile güçlü etkileşim üretti.
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-gray-600 text-[11px] whitespace-nowrap">Temmuz 2026</td>
                  <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">372</td>
                  <td className="px-3 py-3.5 text-right text-gray-600 tabular-nums">365</td>
                  <td className="px-3 py-3.5 text-right">
                    <span className="font-semibold text-emerald-600 tabular-nums">%65</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-bold tabular-nums px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700">%3,29</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 bg-emerald-50 px-5 py-3">
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Temmuz ayında gönderilen Anında Doktor WhatsApp kampanyasında 372 mesajın 365’i teslim edildi. Mesaj %65 open/read rate ve %3,29 click rate ile güçlü etkileşim üretti.
            </p>
          </div>
        </div>

        {/* SECTION 2 — Otomasyon Mesajları */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-teal-200 uppercase tracking-widest mb-1">Section 2</p>
              <p className="text-base font-bold text-white">Otomasyon Mesajları</p>
              <p className="text-xs text-teal-200 mt-0.5">Tetikleme bazlı otomatik WhatsApp mesajlarının performansı</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Otomasyon Adı</th>
                  <th className="text-right px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Open Rate</th>
                  <th className="text-right px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Click Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Birthday Campaign', openRate: '84.2%', clickRate: '14.7%' },
                  { name: 'Birthday Last Day',  openRate: '81.6%', clickRate: '13.1%' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-700">{row.name}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-semibold text-teal-600 tabular-nums">{row.openRate}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-bold tabular-nums bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-[11px]">{row.clickRate}</span>
                    </td>
                  </tr>
                ))}
                {/* Anında Doktor otomasyon satırı */}
                <tr className="hover:bg-gray-50 transition-colors border-t-2 border-teal-100">
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-800">Anında Doktor – Terk Edilen Ödeme Hatırlatma</span>
                      <p className="text-[10px] text-gray-400">Ödeme adımında kaybedilen kullanıcıları yeniden akışa dahil etmeye yönelik WhatsApp otomasyonu.</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-semibold text-teal-600 tabular-nums">%100</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-bold tabular-nums bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-[11px]">%16,67</span>
                  </td>
                </tr>
                {/* welcome_discount */}
                <tr className="hover:bg-gray-50 transition-colors border-t border-gray-100">
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-800">Hoş Geldin Kampanyası</span>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">welcome_discount</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5">Yeni kayıt olan kullanıcıya hoş geldin kampanya kodunun WhatsApp üzerinden otomatik gönderimi.</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-semibold text-teal-600 tabular-nums">%68</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-bold tabular-nums bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-[11px]">%8,93</span>
                  </td>
                </tr>
                {/* welcome_discount_week */}
                <tr className="hover:bg-gray-50 transition-colors border-t border-gray-100">
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-800">Hoş Geldin Kampanyası Bitmeden 1 Hafta Önce Hatırlatma</span>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">welcome_discount_week</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5">Hoş geldin kampanyasının bitmesine 7 gün kala kullanıcıya otomatik WhatsApp hatırlatma mesajı gönderilir.</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-semibold text-teal-600 tabular-nums">%72</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-bold tabular-nums bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-[11px]">%3,08</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Otomasyon genel notu */}
          <div className="mx-5 mt-4 bg-teal-50 border border-teal-200 rounded-2xl px-5 py-3 flex items-start gap-2">
            <AlertCircle size={12} className="text-teal-700 shrink-0 mt-0.5" />
            <p className="text-[11px] text-teal-900 leading-relaxed">
              Hoş Geldin Kampanyası hatırlatma otomasyonu %72 okunma oranıyla güçlü erişim sağlarken, %3,08 click rate ile kullanıcıları kampanya sona ermeden yeniden harekete geçiriyor.
            </p>
          </div>

          {/* Anında Doktor otomasyon kuralları */}
          <div className="mx-5 my-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle size={12} className="text-slate-700" />
              </div>
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Anında Doktor – Otomasyon Kuralları</p>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Anında Doktor satın alma akışında, kullanıcı 'Satın Al' butonuna tıklayıp ödeme adımına geldikten sonra ödemeyi tamamlamazsa otomatik WhatsApp hatırlatma mesajı gönderilmektedir.
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Kullanıcı satın alma butonuna tıkladıktan 5–7 dakika sonra ödeme hâlâ tamamlanmadıysa mesaj tetiklenir.",
                "Ödeme tamamlandıysa mesaj gönderilmez.",
                "Aynı kullanıcıya bu mesaj 24 saat içinde tekrar gönderilmez.",
                "'Ödemeyi Tamamla' butonu mümkünse eski ödeme linki yerine Anında Doktor hizmet sayfasına / yeniden başlatma akışına yönlendirilmelidir. Böylece link süresi dolduğunda kullanıcı hata sayfasına düşmez.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                  <span className="text-[11px] text-slate-700 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* welcome_discount_week – bilgi kutusu */}
          <div className="mx-5 mb-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle size={12} className="text-slate-700" />
              </div>
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">welcome_discount_week – Otomasyon Kuralları</p>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              welcome_discount_week otomasyonu, hoş geldin kampanyasının bitmesine 7 gün kala kullanıcıya otomatik WhatsApp hatırlatma mesajı gönderilir. Amaç, kampanya süresi dolmadan önce kullanıcıyı yeniden hatırlatma mesajıyla aksiyona yönlendirmektir.
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Hoş geldin kampanyası bitmesine 7 gün kala otomatik tetiklenir.",
                "Yalnızca kampanyası aktif olan ve süresi dolmamış kullanıcılar için çalışır.",
                "Kullanıcıya kampanya bitmeden önce son bir hatırlatma iletişimi gönderilir.",
                "Amaç, kampanya kullanım oranını artırmak ve kullanım süresi dolmadan dönüşüm almaktır.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                  <span className="text-[11px] text-slate-700 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-100 bg-teal-50 px-5 py-3">
            <p className="text-[11px] text-teal-800 leading-relaxed">
              Otomasyon mesajları tarafında Anında Doktor akışı güçlü performans göstermektedir. Ayrıca tüm hizmetler için terk edilen ödeme akışına yönelik otomatik mesaj kurgusu hazırlanmıştır. Hoş geldin ve Anında Doktor otomasyonları artık aktif kurgu olarak değerlendirilmekte, yeni eklenen etiketleri kaldırılmıştır.
            </p>
          </div>
        </div>

      </div>

      {/* ── SMS İLETİMLERİ (collapsible) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setSmsExpanded(prev => !prev)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <Smartphone size={15} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">SMS İletimleri</p>
              <p className="text-xs text-gray-400">Nisan ayı segment bazlı SMS kampanya analizi</p>
            </div>
          </div>
          <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${smsExpanded ? 'rotate-180' : ''}`} />
        </button>

        {smsExpanded && (
          <>
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Nisan 2026</p>
              <p className="text-base font-bold text-white">SMS Kampanyaları</p>
              <p className="text-xs text-blue-200 mt-0.5">Nisan ayında gönderilen SMS kampanyaları aşağıda segment, tarih, gönderim hacmi ve download dönüşümü ile listelenmiştir.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kampanya</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Segment</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tarih</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Gönderilen</th>
                    <th className="text-right px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Download</th>
                    <th className="text-right px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dönüşüm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    {
                      name: 'saglik_kartim',
                      segment: '18–60 yaş arası Happ\'e üye olmuş kişiler',
                      date: '10.04.2026',
                      sent: 2964,
                      download: 102,
                      cr: '%3,44',
                      crVal: 3.44,
                      metin: 'Sağlık Kartım ile sağlık yolculuğunuzdaki adımlar artık birikiyor. Her hizmet sonrası 1 kalp sağlık kartınıza yüklenir, 20 kalp sonunda Check-Up hakkınız tanımlanır.',
                    },
                    {
                      name: 'dis_temizligi',
                      segment: 'Eksik üyelere SMS',
                      date: '17.04.2026',
                      sent: 242,
                      download: 6,
                      cr: '%2,48',
                      crVal: 2.48,
                      metin: 'Happ üyelerine özel, İstinye Dental\'de geçerli diş taşı temizliği seni bekliyor. Üyeliğini birkaç adımda tamamla, hemen uygulamayı indir ve üye ol.',
                    },
                    {
                      name: 'campaign_yeniden_20',
                      segment: 'Üyeliği 1 ay+ geçmiş, HEPHOSGELDIN kullanmamış / app indirmemiş / login olmamış',
                      date: '27.04.2026',
                      sent: 198,
                      download: 6,
                      cr: '%3,03',
                      crVal: 3.03,
                      metin: 'Happ üyelerine özel %20 ayrıcalığın yeniden aktif. YENIDEN20 kodunu 1 ay boyunca tüm hizmetlerde kullanabilirsin.',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-700 font-mono text-[11px]">{row.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed max-w-xs">{row.metin}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-[10px] text-gray-500 leading-relaxed max-w-[180px]">{row.segment}</p>
                      </td>
                      <td className="px-4 py-4 text-right tabular-nums text-gray-500 whitespace-nowrap">{row.date}</td>
                      <td className="px-4 py-4 text-right tabular-nums font-semibold text-gray-700">{row.sent.toLocaleString('tr-TR')}</td>
                      <td className="px-4 py-4 text-right tabular-nums font-semibold text-blue-600">{row.download}</td>
                      <td className="px-5 py-4 text-right">
                        <span className={`font-bold tabular-nums px-2 py-0.5 rounded-full text-[11px] ${row.crVal >= 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {row.cr}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-blue-100 bg-blue-50 px-5 py-4 flex flex-col gap-2">
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Nisan ayında SMS kampanyaları içinde en yüksek hacim ve en güçlü download katkısı Sağlık Kartım iletişiminde görülmüştür. Diş taşı temizliği ve yeniden aktif edilen kampanya SMS'leri daha düşük hacimde gönderilmiş olsa da dönüşüm oranları %2,5–3,0 bandında gerçekleşmiştir.
              </p>
              <p className="text-[11px] text-blue-700 font-medium">
                SMS kanalı özellikle segment bazlı kısa vadeli aksiyon üretiminde destekleyici rol oynamaktadır.
              </p>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
