import { useState } from 'react';
import { TrendingUp, Bot, Apple, Smartphone } from 'lucide-react';
import { DownloadMonth } from '../../types/growth';

const ANDROID_COLOR = '#4472c4';
const IOS_COLOR = '#ed7d31';
const TOTAL_COLOR = '#a5a5a5';

const PAD = { left: 52, right: 24, top: 28, bottom: 44 };
const W = 860;
const H = 280;
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function yMap(v: number, maxVal: number) {
  return PAD.top + PLOT_H - (v / maxVal) * PLOT_H;
}

function xPos(i: number, n: number) {
  return PAD.left + (n <= 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W);
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

function closedPath(pts: [number, number][], bottom: number): string {
  if (pts.length < 2) return '';
  const last = pts[pts.length - 1];
  const first = pts[0];
  return `${smoothPath(pts)} L ${last[0]} ${bottom} L ${first[0]} ${bottom} Z`;
}

function gridVals(maxVal: number, count = 6): number[] {
  const step = Math.ceil(maxVal / count / 100) * 100 || 1;
  return Array.from({ length: count + 1 }, (_, i) => i * step).filter(v => v <= maxVal * 1.05);
}

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function pct(curr: number, prev: number) {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

interface TooltipData {
  x: number;
  idx: number;
}

interface TrendChartProps {
  data: DownloadMonth[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  if (!data || data.length === 0) return null;

  const n = data.length;
  const totals = data.map(d => d.android + d.ios);
  const androidVals = data.map(d => d.android);
  const iosVals = data.map(d => d.ios);
  const allVals = [...totals, ...androidVals, ...iosVals];
  const rawMax = Math.max(...allVals);
  const maxVal = Math.ceil(rawMax / 500) * 500;
  const bottom = PAD.top + PLOT_H;

  const totalPts: [number, number][] = data.map((_, i) => [xPos(i, n), yMap(totals[i], maxVal)]);
  const androidPts: [number, number][] = data.map((_, i) => [xPos(i, n), yMap(androidVals[i], maxVal)]);
  const iosPts: [number, number][] = data.map((_, i) => [xPos(i, n), yMap(iosVals[i], maxVal)]);

  const ticks = gridVals(maxVal);

  const last = data[n - 1];
  const prev = data[n - 2];
  const totalLast = last.android + last.ios;
  const totalPrev = prev ? prev.android + prev.ios : 0;
  const lastIsPartial = !!last.partial;

  const hovIdx = tooltip?.idx ?? null;
  const hovD = hovIdx !== null ? data[hovIdx] : null;
  const hovTotal = hovD ? hovD.android + hovD.ios : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <TrendingUp size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Monthly Acquisition Trend</p>
            <p className="text-xs text-gray-400">App Downloads by Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs font-medium text-gray-500">
          <LegendItem color={ANDROID_COLOR} label="Android" icon={<Bot size={11} />} />
          <LegendItem color={IOS_COLOR} label="iOS" icon={<Apple size={11} />} />
          <LegendItem color={TOTAL_COLOR} label="Toplam" icon={<Smartphone size={11} />} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <MiniStat label="Toplam" value={fmt(totalLast)} mom={!lastIsPartial && prev ? pct(totalLast, totalPrev) : null} color={TOTAL_COLOR} partialLabel={lastIsPartial ? last.partialLabel : undefined} />
        <MiniStat label="Android" value={fmt(last.android)} mom={!lastIsPartial && prev ? pct(last.android, prev.android) : null} color={ANDROID_COLOR} partialLabel={lastIsPartial ? last.partialLabel : undefined} />
        <MiniStat label="iOS" value={fmt(last.ios)} mom={!lastIsPartial && prev ? pct(last.ios, prev.ios) : null} color={IOS_COLOR} partialLabel={lastIsPartial ? last.partialLabel : undefined} />
      </div>
      {lastIsPartial && (
        <div className="mb-3 flex items-center gap-1.5 text-[10px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Eylül 2026 verileri tam ayı kapsamamaktadır — Android 1–19 Sep, iOS 1–28 Sep. MoM karşılaştırması gösterilmemiştir.
        </div>
      )}

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ overflow: 'visible', display: 'block' }}
          onMouseMove={e => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const svgX = ((e.clientX - rect.left) / rect.width) * W;
            const relX = svgX - PAD.left;
            const idx = Math.round((relX / PLOT_W) * (n - 1));
            const clamped = Math.max(0, Math.min(n - 1, idx));
            setTooltip({ x: xPos(clamped, n), idx: clamped });
          }}
          onMouseLeave={() => setTooltip(null)}
        >
          <defs>
            <linearGradient id="trendTotalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={TOTAL_COLOR} stopOpacity="0.12" />
              <stop offset="100%" stopColor={TOTAL_COLOR} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trendAndroidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ANDROID_COLOR} stopOpacity="0.10" />
              <stop offset="100%" stopColor={ANDROID_COLOR} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trendIosGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={IOS_COLOR} stopOpacity="0.10" />
              <stop offset="100%" stopColor={IOS_COLOR} stopOpacity="0" />
            </linearGradient>
          </defs>

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

          <path d={closedPath(totalPts, bottom)} fill="url(#trendTotalGrad)" />
          <path d={closedPath(androidPts, bottom)} fill="url(#trendAndroidGrad)" />
          <path d={closedPath(iosPts, bottom)} fill="url(#trendIosGrad)" />

          <path d={smoothPath(totalPts)} fill="none" stroke={TOTAL_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={smoothPath(androidPts)} fill="none" stroke={ANDROID_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={smoothPath(iosPts)} fill="none" stroke={IOS_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {data.map((d, i) => {
            const x = xPos(i, n);
            const total = d.android + d.ios;
            return (
              <g key={d.month}>
                <text x={x} y={yMap(total, maxVal) - 10} textAnchor="middle" fontSize="10" fill={TOTAL_COLOR} fontWeight="600" fontFamily="inherit">
                  {fmt(total)}
                </text>
                <text x={x} y={yMap(d.android, maxVal) - 10} textAnchor="middle" fontSize="10" fill={ANDROID_COLOR} fontWeight="600" fontFamily="inherit">
                  {fmt(d.android)}
                </text>
                <text x={x} y={yMap(d.ios, maxVal) - 10} textAnchor="middle" fontSize="10" fill={IOS_COLOR} fontWeight="600" fontFamily="inherit">
                  {fmt(d.ios)}
                </text>
                <circle cx={x} cy={yMap(total, maxVal)} r={4} fill={TOTAL_COLOR} stroke="white" strokeWidth={1.5} />
                <circle cx={x} cy={yMap(d.android, maxVal)} r={4} fill={ANDROID_COLOR} stroke="white" strokeWidth={1.5} />
                <circle cx={x} cy={yMap(d.ios, maxVal)} r={4} fill={IOS_COLOR} stroke="white" strokeWidth={1.5} />
                <text x={x} y={bottom + 16} textAnchor="middle" fontSize="11" fill={d.partial ? '#d97706' : '#6b7280'} fontWeight="500" fontFamily="inherit">
                  {d.month}{d.partial ? ' *' : ''}
                </text>
              </g>
            );
          })}

          {tooltip && hovD && hovTotal !== null && (
            <>
              <line
                x1={tooltip.x} x2={tooltip.x}
                y1={PAD.top} y2={bottom}
                stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3"
              />
              <circle cx={tooltip.x} cy={yMap(hovTotal, maxVal)} r={5} fill={TOTAL_COLOR} stroke="white" strokeWidth={2} />
              <circle cx={tooltip.x} cy={yMap(hovD.android, maxVal)} r={5} fill={ANDROID_COLOR} stroke="white" strokeWidth={2} />
              <circle cx={tooltip.x} cy={yMap(hovD.ios, maxVal)} r={5} fill={IOS_COLOR} stroke="white" strokeWidth={2} />
              <foreignObject
                x={Math.min(tooltip.x + 12, W - 160)}
                y={Math.max(PAD.top, yMap(hovTotal, maxVal) - 70)}
                width="150"
                height="90"
              >
                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2.5 shadow-xl pointer-events-none">
                  <p className="font-semibold mb-1.5 text-gray-300">{hovD.month}{hovD.partial ? ' · MTD' : ''}</p>
                  <p className="flex justify-between gap-3">
                    <span style={{ color: ANDROID_COLOR }}>Android</span>
                    <span className="font-bold">{hovD.android.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between gap-3">
                    <span style={{ color: IOS_COLOR }}>iOS</span>
                    <span className="font-bold">{hovD.ios.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between gap-3 border-t border-gray-700 mt-1 pt-1">
                    <span style={{ color: TOTAL_COLOR }}>Toplam</span>
                    <span className="font-bold">{hovTotal.toLocaleString()}</span>
                  </p>
                  {hovD.partial && hovD.partialLabel && (
                    <p className="text-[9px] text-amber-400 mt-1.5 pt-1 border-t border-gray-700">{hovD.partialLabel}</p>
                  )}
                </div>
              </foreignObject>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

function LegendItem({ color, label, icon }: { color: string; label: string; icon: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-5 h-0.5 inline-block rounded-full" style={{ background: color }} />
      <span className="w-2 h-2 rounded-full -ml-3" style={{ background: color }} />
      <span className="ml-1 flex items-center gap-1">{icon}{label}</span>
    </span>
  );
}

function MiniStat({ label, value, mom, color, partialLabel }: { label: string; value: string; mom: number | null; color: string; partialLabel?: string }) {
  return (
    <div className="rounded-xl bg-gray-50 px-3 py-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs text-gray-500 font-semibold">{label}</span>
      </div>
      <span className="text-base font-bold text-gray-800">{value}</span>
      {mom !== null ? (
        <span className={`text-xs font-semibold ${mom >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {mom >= 0 ? '+' : ''}{mom}% MoM
        </span>
      ) : partialLabel ? (
        <span className="text-[10px] font-semibold text-amber-600">MTD · Partial</span>
      ) : null}
    </div>
  );
}
