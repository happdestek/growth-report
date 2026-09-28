import { useState } from 'react';
import { Users } from 'lucide-react';
import { NewMembersMonthly } from '../../types/growth';

const COLORS = {
  android:      '#4472c4',
  checkup_link: '#26a69a',
  ios:          '#ed7d31',
  web:          '#f59e0b',
  total:        '#94a3b8',
};

const SERIES: { key: keyof Omit<NewMembersMonthly, 'month_start'>; label: string }[] = [
  { key: 'android',      label: 'Android' },
  { key: 'checkup_link', label: 'Check-Up Link' },
  { key: 'ios',          label: 'iOS' },
  { key: 'web',          label: 'Web' },
];

const PAD = { left: 56, right: 28, top: 32, bottom: 48 };
const W = 860;
const H = 300;
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const BAR_GROUP_W = 0.72;

function yMap(v: number, maxVal: number) {
  return PAD.top + PLOT_H - (v / maxVal) * PLOT_H;
}

function gridVals(maxVal: number, count = 5): number[] {
  const step = Math.ceil(maxVal / count / 50) * 50 || 1;
  return Array.from({ length: count + 1 }, (_, i) => i * step).filter(v => v <= maxVal * 1.1);
}

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function pct(curr: number, prev: number): number | null {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

interface NewMembersChartProps {
  data: NewMembersMonthly[];
}

export default function NewMembersChart({ data }: NewMembersChartProps) {
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const n = data.length;
  const maxVal = Math.ceil(Math.max(...data.map(d => d.total)) / 200) * 200 || 1;
  const bottom = PAD.top + PLOT_H;

  const groupSpacing = PLOT_W / n;
  const groupW = groupSpacing * BAR_GROUP_W;
  const barW = groupW / SERIES.length;

  function groupX(i: number) {
    return PAD.left + groupSpacing * i + groupSpacing * (1 - BAR_GROUP_W) / 2;
  }

  const totalPts: [number, number][] = data.map((d, i) => [
    groupX(i) + groupW / 2,
    yMap(d.total, maxVal),
  ]);

  const ticks = gridVals(maxVal);

  const last = data[n - 1];
  const prev = data[n - 2];

  function getMonthLabel(monthStart: string) {
    const d = new Date(monthStart + 'T00:00:00');
    return d.toLocaleString('en-US', { month: 'short' });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Users size={16} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Yeni Üye Trendi</p>
            <p className="text-xs text-gray-400">Kaynak bazlı aylık yeni üye sayısı</p>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {SERIES.map(s => (
            <span key={s.key} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: COLORS[s.key] }} />
              {s.label}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <span className="w-5 h-0.5 inline-block rounded-full" style={{ background: COLORS.total }} />
            <span className="w-2 h-2 rounded-full -ml-3.5" style={{ background: COLORS.total }} />
            <span className="ml-1">Toplam</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {SERIES.map(s => (
          <MiniStat
            key={s.key}
            label={s.label}
            value={fmt(last[s.key])}
            mom={prev ? pct(last[s.key], prev[s.key]) : null}
            color={COLORS[s.key]}
          />
        ))}
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ overflow: 'visible', display: 'block' }}
          onMouseMove={e => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const svgX = ((e.clientX - rect.left) / rect.width) * W;
            const idx = Math.floor((svgX - PAD.left) / groupSpacing);
            setHovIdx(Math.max(0, Math.min(n - 1, idx)));
          }}
          onMouseLeave={() => setHovIdx(null)}
        >
          {ticks.map(t => {
            const y = yMap(t, maxVal);
            return (
              <g key={t}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD.left - 8} y={y} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="#94a3b8" fontFamily="inherit">
                  {t === 0 ? '0' : fmt(t)}
                </text>
              </g>
            );
          })}

          {data.map((d, i) => {
            const gx = groupX(i);
            const cx = gx + groupW / 2;
            const isHov = hovIdx === i;
            return (
              <g key={d.month_start}>
                {isHov && (
                  <rect x={gx - 4} y={PAD.top} width={groupW + 8} height={PLOT_H} fill="#f8fafc" rx="4" />
                )}
                {SERIES.map((s, si) => {
                  const bx = gx + si * barW;
                  const bh = (d[s.key] / maxVal) * PLOT_H;
                  const by = bottom - bh;
                  return (
                    <rect
                      key={s.key}
                      x={bx}
                      y={by}
                      width={barW - 2}
                      height={bh}
                      fill={COLORS[s.key]}
                      rx="2"
                      opacity={hovIdx !== null && !isHov ? 0.4 : 1}
                      style={{ transition: 'opacity 0.15s' }}
                    />
                  );
                })}
                <text
                  x={cx}
                  y={bottom + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isHov ? '#374151' : '#6b7280'}
                  fontWeight={isHov ? '600' : '500'}
                  fontFamily="inherit"
                >
                  {getMonthLabel(d.month_start)}
                </text>
              </g>
            );
          })}

          <path
            d={smoothPath(totalPts)}
            fill="none"
            stroke={COLORS.total}
            strokeWidth="2.5"
            strokeDasharray="6 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {totalPts.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={hovIdx === i ? 5 : 4} fill={COLORS.total} stroke="white" strokeWidth={1.5} />
          ))}

          {hovIdx !== null && (() => {
            const d = data[hovIdx];
            const [cx] = totalPts[hovIdx];
            const tooltipX = cx + groupW / 2 + 12 > W - 180 ? cx - 180 : cx + groupW / 2 + 12;
            const tooltipY = Math.max(PAD.top, yMap(d.total, maxVal) - 30);
            return (
              <>
                <line x1={cx} x2={cx} y1={PAD.top} y2={bottom} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
                <foreignObject x={tooltipX} y={tooltipY} width="170" height="130">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2.5 shadow-xl pointer-events-none">
                    <p className="font-semibold mb-2 text-gray-300">{getMonthLabel(d.month_start)}</p>
                    {SERIES.map(s => (
                      <p key={s.key} className="flex justify-between gap-3">
                        <span style={{ color: COLORS[s.key] }}>{s.label}</span>
                        <span className="font-bold">{d[s.key].toLocaleString()}</span>
                      </p>
                    ))}
                    <p className="flex justify-between gap-3 border-t border-gray-700 mt-1.5 pt-1.5">
                      <span style={{ color: COLORS.total }}>Toplam</span>
                      <span className="font-bold">{d.total.toLocaleString()}</span>
                    </p>
                  </div>
                </foreignObject>
              </>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}

function MiniStat({ label, value, mom, color }: { label: string; value: string; mom: number | null; color: string }) {
  return (
    <div className="rounded-xl bg-gray-50 px-3 py-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
        <span className="text-xs text-gray-500 font-semibold truncate">{label}</span>
      </div>
      <span className="text-base font-bold text-gray-800">{value}</span>
      {mom !== null && (
        <span className={`text-xs font-semibold ${mom >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {mom >= 0 ? '+' : ''}{mom}% MoM
        </span>
      )}
    </div>
  );
}
