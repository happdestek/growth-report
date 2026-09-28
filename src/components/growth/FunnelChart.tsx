import { useState } from 'react';
import { Filter, Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { FunnelData, FunnelPlatformData } from '../../types/growth';

interface FunnelChartProps {
  data: FunnelData | null;
  prevData?: FunnelData | null;
  signupAvailable?: boolean;
}

type Tab = 'total' | 'android' | 'ios';

function pct(n: number, total: number): string {
  if (total === 0) return '—';
  return ((n / total) * 100).toFixed(1) + '%';
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString('tr-TR');
  return n.toLocaleString('tr-TR');
}

const STAGES = [
  { key: 'productPageViews' as const, label: 'Product Page View', sublabel: 'Mağaza ürün sayfası görüntüleme', color: '#6366f1', light: '#eef2ff' },
  { key: 'downloads' as const,        label: 'App Download',       sublabel: 'Toplam indirme',                 color: '#3b82f6', light: '#dbeafe' },
  { key: 'signups' as const,          label: 'Sign-up',            sublabel: 'Üyelik kaydı',                   color: '#14b8a6', light: '#ccfbf1' },
];

const TAB_LABELS: Record<Tab, string> = { total: 'Toplam', android: 'Android', ios: 'iOS' };

function MomBadge({ curr, prev }: { curr: number; prev: number | undefined }) {
  if (prev === undefined || prev === 0) return null;
  const delta = Math.round(((curr - prev) / prev) * 100);
  const pos = delta > 0, zero = delta === 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ml-2 shrink-0 ${
      pos  ? 'bg-emerald-100 text-emerald-700' :
      zero ? 'bg-gray-100 text-gray-500' :
             'bg-red-100 text-red-600'
    }`}>
      {pos ? <TrendingUp size={9} /> : zero ? <Minus size={9} /> : <TrendingDown size={9} />}
      {delta > 0 ? '+' : ''}{delta}%
    </span>
  );
}

function FunnelBar({ platform, prev, signupAvailable }: { platform: FunnelPlatformData; prev?: FunnelPlatformData; signupAvailable?: boolean }) {
  const topVal = platform.productPageViews || 1;
  const prevVals: (number | undefined)[] = prev
    ? [prev.productPageViews, prev.downloads, prev.signups]
    : [undefined, undefined, undefined];

  return (
    <div className="flex flex-col items-center gap-0.5 w-full">
      {STAGES.map((s, i) => {
        const value = platform[s.key];
        const globalPct = Math.round((value / topVal) * 100);
        const barWidth = 100 - i * 12;

        return (
          <div key={s.key} className="w-full flex flex-col items-center">
            <div
              className="relative flex items-center justify-between px-5 py-3 rounded-xl"
              style={{ width: `${barWidth}%`, backgroundColor: s.light, borderLeft: `3px solid ${s.color}` }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: s.color }}>{s.label}</p>
                <p className="text-xs text-gray-400">{s.sublabel}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <p className="text-lg font-bold text-gray-900">
                    {s.key === 'signups' && signupAvailable === false ? 'Veri bekleniyor' : fmt(value)}
                  </p>
                  {!(s.key === 'signups' && signupAvailable === false) && <MomBadge curr={value} prev={prevVals[i]} />}
                </div>
                <p className="text-xs text-gray-400">
                  {s.key === 'signups' && signupAvailable === false ? '—' : `${globalPct}% of top`}
                </p>
              </div>
            </div>

            {i < STAGES.length - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="w-px h-3 bg-gray-200" />
                <span className="text-xs font-semibold text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                  {STAGES[i + 1].key === 'signups' && signupAvailable === false
                    ? 'Veri bekleniyor'
                    : `${pct(platform[STAGES[i + 1].key], value)} dönüşüm`}
                </span>
                <div className="w-px h-3 bg-gray-200" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ConversionSummary({ platform, prev, signupAvailable }: { platform: FunnelPlatformData; prev?: FunnelPlatformData; signupAvailable?: boolean }) {
  const rate = (n: number, d: number) => d > 0 ? (n / d) * 100 : 0;

  const ppvToDl = rate(platform.downloads, platform.productPageViews);
  const dlToSu  = rate(platform.signups,   platform.downloads);
  const ppvToSu = rate(platform.signups,   platform.productPageViews);

  const prevPpvToDl = prev ? rate(prev.downloads, prev.productPageViews) : null;
  const prevDlToSu  = prev ? rate(prev.signups,   prev.downloads)        : null;
  const prevPpvToSu = prev ? rate(prev.signups,   prev.productPageViews) : null;

  const steps = [
    { label: 'Page View → Download', curr: ppvToDl, prevRate: prevPpvToDl, color: 'text-indigo-600', available: true },
    { label: 'Download → Sign-up',   curr: dlToSu,  prevRate: prevDlToSu,  color: 'text-blue-600',   available: signupAvailable !== false },
    { label: 'Page View → Sign-up',  curr: ppvToSu, prevRate: prevPpvToSu, color: 'text-teal-600',   available: signupAvailable !== false },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-gray-100">
      {steps.map(s => {
        const ppDelta = s.prevRate !== null && s.prevRate !== undefined
          ? Math.round((s.curr - s.prevRate) * 10) / 10
          : null;
        const pos  = ppDelta !== null && ppDelta > 0;
        const neg  = ppDelta !== null && ppDelta < 0;
        return (
          <div key={s.label} className="text-center">
            <p className="text-[10px] text-gray-400 leading-snug mb-1">{s.label}</p>
            <p className={`text-sm font-bold tabular-nums ${s.color}`}>{s.available ? `%${s.curr.toFixed(1)}` : '—'}</p>
            {s.available && ppDelta !== null && (
              <p className={`text-[9px] font-semibold mt-0.5 ${
                pos ? 'text-emerald-600' : neg ? 'text-red-500' : 'text-gray-400'
              }`}>
                {pos ? '+' : ''}{ppDelta} pp
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FunnelChart({ data, prevData, signupAvailable }: FunnelChartProps) {
  const [activeTab, setActiveTab] = useState<Tab>('total');

  if (!data || !data.total) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-center h-48">
        <p className="text-sm text-gray-400">No funnel data available</p>
      </div>
    );
  }

  const platformData = data[activeTab];
  const prevPlatformData = prevData ? prevData[activeTab] : undefined;
  const showSignupPending = signupAvailable === false;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center">
          <Filter size={16} className="text-teal-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Product Page View → App Download → Sign-up Funnel</p>
          <p className="text-xs text-gray-400">Ağustos 2026 · Platform bazlı dönüşüm analizi · Temmuz ile karşılaştırmalı</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4 ml-10 leading-relaxed">
        Funnel yapısı mağaza ürün sayfası görüntülemeden başlayacak şekilde genişletildi. Böylece store listing trafiği, indirme ve üyelik dönüşümü birlikte izlenebilir hale geldi.
      </p>

      {/* Platform tabs */}
      <div className="flex gap-1.5 mb-5 bg-gray-50 rounded-xl p-1 w-fit">
        {(Object.entries(TAB_LABELS) as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === key
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <FunnelBar platform={platformData} prev={prevPlatformData} signupAvailable={signupAvailable} />
      <ConversionSummary platform={platformData} prev={prevPlatformData} signupAvailable={signupAvailable} />

      {/* Insight box */}
      <div className="mt-5 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Ağustos ayında App Store Product Page View hacmi Temmuz'a göre %48,6 gerilerken download hacmi yalnızca %6,2 azaldı. Buna bağlı olarak Product Page View → Download dönüşümü %5,2'den %9,42'ye yükseldi. Store sayfasına gelen trafik daha düşük olsa da indirme verimliliği belirgin şekilde güçlendi.
          </p>
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Buna karşılık Download → Sign-up dönüşümü %35,4'ten %23,79'a geriledi ve iOS sign-up hacmi %36,9 düştü. Bu nedenle Ağustos'ta iOS tarafındaki temel optimizasyon alanı store conversion'dan çok indirme sonrası kayıt adımıdır.
          </p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Ağustos ayında Android tarafında 11.433 Product Page View ve 2.038 download elde edildi (PPV→Download %17,83, Download→Sign-up %7,95, PPV→Sign-up %1,42). Source breakdown: Ads & Referrals 1.219 (%59,8), Google Play Explore 778 (%38,2), Search 41 (%2,0). Android sign-up 162 olarak gerçekleşti.
          </p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Google Play tarafında store conversion güçlü görünürken, indirme sonrası kayıt dönüşümü %7,95 seviyesinde gerçekleşti. Ağustos'ta temel optimizasyon alanı artık yalnızca store download conversion değil, Download → Sign-up adımıdır.
          </p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Ağustos iOS downloadlarının %78,4'ü App Referrer ve Web Referrer kaynaklarından geldi. App Referrer %19,3 gerilerken Web Referrer %15,7 ve App Store Search %12,3 büyüdü. Search kaynaklı download hacmi artmasına rağmen toplam acquisition hâlâ ağırlıklı olarak referral trafiği tarafından taşınıyor.
          </p>
          {showSignupPending && (
            <p className="text-[10px] text-amber-600 leading-relaxed border-t border-blue-100 pt-1.5">
              Temmuz sign-up verisi bekleniyor — Download → Sign-up ve Page View → Sign-up oranları veri geldikten hesaplanacaktır.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
