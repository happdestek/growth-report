import { useState } from 'react';
import { Lightbulb, Apple, Bot, Smartphone, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos'];

type FunnelRow = { ppv: number; dl: number; su: number | null };
type PlatformKey = 'total' | 'android' | 'ios';

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: Record<PlatformKey, FunnelRow[]> = {
  total: [
    { ppv: 36098, dl: 1564, su: 347  },
    { ppv: 40020, dl: 2273, su: 527  },
    { ppv: 38725, dl: 2138, su: 616  },
    { ppv: 34615, dl: 2933, su: 846  },
    { ppv: 32731, dl: 2972, su: 673  },
    { ppv: 38525, dl: 2674, su: 741  },
    { ppv: 28844, dl: 2873, su: 443  },
    { ppv: 18213, dl: 2677, su: 314  },
  ],
  android: [
    { ppv: 15637, dl: 1338, su: 121  },
    { ppv: 16604, dl: 1772, su: 178  },
    { ppv: 16862, dl: 1538, su: 200  },
    { ppv: 11489, dl: 1642, su: 243  },
    { ppv: 13420, dl: 1950, su: 207  },
    { ppv: 17934, dl: 2259, su: 234  },
    { ppv: 15654, dl: 2192, su: 202  },
    { ppv: 11433, dl: 2038, su: 162  },
  ],
  ios: [
    { ppv: 20461, dl: 226,  su: 226  },
    { ppv: 23416, dl: 501,  su: 349  },
    { ppv: 21863, dl: 600,  su: 416  },
    { ppv: 23126, dl: 1291, su: 603  },
    { ppv: 19311, dl: 1022, su: 466  },
    { ppv: 20591, dl: 1172, su: 507  },
    { ppv: 13190, dl: 681,  su: 241  },
    { ppv: 6780,  dl: 639,  su: 152  },
  ],
};

const PLATFORMS = [
  { key: 'total'   as const, label: 'Toplam',  icon: <Smartphone size={13} /> },
  { key: 'android' as const, label: 'Android', icon: <Bot size={13} />        },
  { key: 'ios'     as const, label: 'iOS',      icon: <Apple size={13} />      },
];

const HEX = '#2563EB';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number | null) => n === null ? 'Veri bekleniyor' : n.toLocaleString('tr-TR');
const pct = (a: number | null, b: number) => a !== null && b > 0 ? `%${((a / b) * 100).toFixed(1)}` : '—';
const pctNum = (a: number | null, b: number) => a !== null && b > 0 ? (a / b) * 100 : 0;
const momPct = (curr: number, prev: number | undefined): number | null => {
  if (prev === undefined || prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
};

function DeltaBadge({ val, small = false }: { val: number | null; small?: boolean }) {
  if (val === null) return <span className={`text-gray-300 ${small ? 'text-[9px]' : 'text-[10px]'}`}>—</span>;
  const pos = val > 0, zero = val === 0;
  return (
    <span className={`inline-flex items-center gap-0.5 font-bold rounded-md px-1.5 py-0.5 ${small ? 'text-[9px]' : 'text-[10px]'} ${
      pos ? 'bg-emerald-50 text-emerald-600' : zero ? 'bg-gray-50 text-gray-400' : 'bg-red-50 text-red-500'
    }`}>
      {pos ? <TrendingUp size={8} /> : zero ? <Minus size={8} /> : <TrendingDown size={8} />}
      {val > 0 ? '+' : ''}{val}%
    </span>
  );
}

// ─── Funnel Visual ────────────────────────────────────────────────────────────

function Funnel({
  ppv, dl, su,
  prevPpv, prevDl, prevSu,
}: {
  ppv: number; dl: number; su: number | null;
  prevPpv?: number; prevDl?: number; prevSu?: number | null;
}) {
  const suWidth = su !== null ? Math.max(18, Math.sqrt(su / ppv) * 100) : 25;
  const steps = [
    { label: 'Ürün Sayfası Görüntüleme', value: ppv, width: 100,                                   delta: momPct(ppv, prevPpv) },
    { label: 'İndirme',                  value: dl,  width: Math.max(30, Math.sqrt(dl / ppv) * 100), delta: momPct(dl, prevDl)   },
    { label: 'Üyelik',                   value: su as any,  width: suWidth, delta: su !== null ? momPct(su, prevSu as number | undefined) : null   },
  ];

  const rates = [
    { label: 'PPV → İndirme', value: pct(dl, ppv) },
    { label: 'İndirme → Üyelik', value: pct(su, dl) },
  ];

  const opacities = [1, 0.72, 0.48];

  const cvrRows = [
    { label: 'PPV → İndirme',    value: pct(dl, ppv),   delta: prevPpv && prevDl   ? Math.round((pctNum(dl, ppv)   - pctNum(prevDl, prevPpv))   * 10) / 10 : null },
    { label: 'İndirme → Üyelik', value: pct(su, dl),    delta: su !== null && prevDl  && prevSu   ? Math.round((pctNum(su, dl)    - pctNum(prevSu, prevDl))    * 10) / 10 : null },
    { label: 'PPV → Üyelik',     value: pct(su, ppv),   delta: su !== null && prevPpv && prevSu   ? Math.round((pctNum(su, ppv)   - pctNum(prevSu, prevPpv))   * 10) / 10 : null },
  ];

  return (
    <div className="flex flex-col items-center gap-0 py-2">
      {steps.map((step, i) => (
        <div key={step.label} className="w-full flex flex-col items-center">
          {i > 0 && (
            <div className="flex flex-col items-center my-1.5">
              <div
                className="px-3 py-1 rounded-full text-[11px] font-bold border"
                style={{ color: HEX, borderColor: HEX + '33', backgroundColor: HEX + '10' }}
              >
                {rates[i - 1].label} · {rates[i - 1].value}
              </div>
              <div className="w-0.5 h-2" style={{ backgroundColor: HEX + '40' }} />
            </div>
          )}
          <div
            className="flex items-center justify-between px-5 py-3 rounded-xl transition-all duration-300"
            style={{ width: `${step.width}%`, backgroundColor: HEX, opacity: opacities[i] }}
          >
            <span className="text-white text-xs font-medium">{step.label}</span>
            <div className="flex items-center gap-2">
              <DeltaBadge val={step.delta} />
              <span className="text-white text-sm font-bold tabular-nums">{fmt(step.value)}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom CVR summary */}
      <div className="mt-4 w-full grid grid-cols-3 gap-2">
        {cvrRows.map(r => (
          <div key={r.label} className="text-center bg-gray-50 rounded-xl py-2.5 px-2 border border-gray-100">
            <p className="text-[9px] text-gray-400 font-medium leading-tight">{r.label}</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: HEX }}>{r.value}</p>
            <div className="mt-1 flex justify-center">
              {r.delta !== null ? (
                <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold rounded-md px-1.5 py-0.5 ${
                  r.delta > 0 ? 'bg-emerald-50 text-emerald-600' : r.delta === 0 ? 'bg-gray-50 text-gray-400' : 'bg-red-50 text-red-500'
                }`}>
                  {r.delta > 0 ? <TrendingUp size={8} /> : r.delta === 0 ? <Minus size={8} /> : <TrendingDown size={8} />}
                  {r.delta > 0 ? '+' : ''}{r.delta} pp
                </span>
              ) : (
                <span className="text-[9px] text-gray-300">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total converted users + overall transition rate */}
      <div className="mt-2 w-full grid grid-cols-2 gap-2">
        <div className="text-center bg-blue-50 rounded-xl py-2.5 px-2 border border-blue-100">
          <p className="text-[9px] text-blue-600 font-medium leading-tight">Toplam Happe Geçen Kullanıcı</p>
          <p className="text-sm font-bold mt-0.5 text-blue-700">{fmt(su)}</p>
        </div>
        <div className="text-center bg-emerald-50 rounded-xl py-2.5 px-2 border border-emerald-100">
          <p className="text-[9px] text-emerald-600 font-medium leading-tight">Toplam Geçiş Oranı</p>
          <p className="text-sm font-bold mt-0.5 text-emerald-700">{pct(su, ppv)}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProductPageFunnelDashboard() {
  const [platform, setPlatform] = useState<PlatformKey>('total');
  const [monthIdx, setMonthIdx] = useState(MONTHS.length - 1);

  const d = DATA[platform][monthIdx];
  const prev = monthIdx > 0 ? DATA[platform][monthIdx - 1] : undefined;
  const activePlatform = PLATFORMS.find(p => p.key === platform)!;

  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: HEX + '15' }}>
          <Smartphone size={13} style={{ color: HEX }} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">Happ Health — App İçi Hizmet Funnel</h2>
          <p className="text-xs text-gray-400">Ocak–Ağustos 2026</p>
        </div>
      </div>

      {/* Insight */}
      <div className="flex gap-3 items-start bg-slate-800 rounded-2xl px-4 py-3.5">
        <Lightbulb size={14} className="text-white/60 mt-0.5 shrink-0" />
        <div className="flex flex-col gap-2">
          <p className="text-xs text-white/80 leading-relaxed">
            Ağustos ayında mobil store funnel'ında toplam 18.213 Product Page View'den 2.677 indirme ve 314 sign-up elde edildi. Android %17,83 ile daha güçlü View → Download performansı üretirken, iOS indirme sonrası %23,79 Sign-up dönüşümüyle Android'in üzerinde performans gösterdi.
          </p>
          <p className="text-xs text-white/60 leading-relaxed">
            Android tarafında ana kayıp Download → Sign-up (%7,95) adımında görülürken, iOS tarafında daha düşük store trafiğine rağmen Download → Sign-up dönüşümü %23,79 seviyesinde gerçekleşti.
          </p>
        </div>
      </div>

      {/* Platform tabs */}
      <div className="flex gap-2">
        {PLATFORMS.map(p => {
          const active = platform === p.key;
          return (
            <button
              key={p.key}
              onClick={() => setPlatform(p.key)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 focus:outline-none"
              style={
                active
                  ? { backgroundColor: HEX, color: '#fff' }
                  : { backgroundColor: '#F3F4F6', color: '#6B7280' }
              }
            >
              {p.icon}
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Month tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {MONTHS.map((m, i) => {
          const active = monthIdx === i;
          const isLast = i === MONTHS.length - 1;
          return (
            <button
              key={m}
              onClick={() => setMonthIdx(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none"
              style={
                active
                  ? { backgroundColor: HEX + '18', color: HEX }
                  : { backgroundColor: '#F3F4F6', color: '#9CA3AF' }
              }
            >
              {m}
              {isLast && !active && <span className="ml-1 text-[8px]">●</span>}
            </button>
          );
        })}
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-gray-400">
            {activePlatform.label} · {MONTHS[monthIdx]} 2026
          </p>
          {prev && (
            <p className="text-[10px] text-gray-300 font-medium">
              Önceki ay: {MONTHS[monthIdx - 1]} 2026
            </p>
          )}
        </div>
        <Funnel
          ppv={d.ppv} dl={d.dl} su={d.su}
          prevPpv={prev?.ppv} prevDl={prev?.dl} prevSu={prev?.su}
        />
      </div>
    </div>
  );
}
