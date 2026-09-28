import { Smartphone, Bot, Apple } from 'lucide-react';

interface DownloadMonth {
  month: string;
  android: number;
  ios: number;
}

interface AppDownloadsChartProps {
  data: DownloadMonth[];
}

const ANDROID_COLOR = '#4472c4';
const IOS_COLOR = '#ed7d31';
const TOTAL_COLOR = '#a5a5a5';

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function pct(curr: number, prev: number) {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

const W = 560;
const H = 260;
const PAD = { top: 24, right: 32, bottom: 40, left: 52 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

function lerp(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * CH;
}

export default function AppDownloadsChart({ data }: AppDownloadsChartProps) {
  if (!data || data.length === 0) return null;

  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const totalLast = last.android + last.ios;
  const totalPrev = prev ? prev.android + prev.ios : 0;
  const momTotal = pct(totalLast, totalPrev);
  const momAndroid = prev ? pct(last.android, prev.android) : null;
  const momIos = prev ? pct(last.ios, prev.ios) : null;

  const allValues = data.flatMap(d => [d.android, d.ios, d.android + d.ios]);
  const minVal = 0;
  const rawMax = Math.max(...allValues);
  const maxVal = Math.ceil(rawMax / 500) * 500;

  const xStep = CW / (data.length - 1);

  const xOf = (i: number) => PAD.left + i * xStep;
  const yOf = (v: number) => PAD.top + CH - lerp(v, minVal, maxVal);

  const polyline = (vals: number[]) =>
    vals.map((v, i) => `${xOf(i)},${yOf(v)}`).join(' ');

  const totals = data.map(d => d.android + d.ios);
  const androidVals = data.map(d => d.android);
  const iosVals = data.map(d => d.ios);

  const gridCount = 7;
  const gridVals = Array.from({ length: gridCount }, (_, i) =>
    Math.round((maxVal / (gridCount - 1)) * i)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Smartphone size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">App Downloads</p>
            <p className="text-xs text-gray-400">Monthly trend by platform</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatChip label="Total" value={fmt(totalLast)} mom={momTotal} icon={<Smartphone size={13} />} dotColor={TOTAL_COLOR} />
        <StatChip label="Android" value={fmt(last.android)} mom={momAndroid} icon={<Bot size={13} />} dotColor={ANDROID_COLOR} />
        <StatChip label="iOS" value={fmt(last.ios)} mom={momIos} icon={<Apple size={13} />} dotColor={IOS_COLOR} />
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: 320, display: 'block' }}
        >
          {gridVals.map(v => {
            const y = yOf(v);
            return (
              <g key={v}>
                <line
                  x1={PAD.left} y1={y}
                  x2={W - PAD.right} y2={y}
                  stroke="#e5e7eb" strokeWidth={1}
                />
                <text
                  x={PAD.left - 6} y={y + 4}
                  textAnchor="end"
                  fontSize={10}
                  fill="#9ca3af"
                  fontFamily="inherit"
                >
                  {v === 0 ? '0' : fmt(v)}
                </text>
              </g>
            );
          })}

          <polyline
            points={polyline(totals)}
            fill="none"
            stroke={TOTAL_COLOR}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points={polyline(androidVals)}
            fill="none"
            stroke={ANDROID_COLOR}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points={polyline(iosVals)}
            fill="none"
            stroke={IOS_COLOR}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {data.map((d, i) => {
            const total = d.android + d.ios;
            const x = xOf(i);
            return (
              <g key={d.month}>
                <circle cx={x} cy={yOf(total)} r={4} fill={TOTAL_COLOR} stroke="white" strokeWidth={1.5} />
                <text x={x} y={yOf(total) - 9} textAnchor="middle" fontSize={10} fontWeight="600" fill={TOTAL_COLOR} fontFamily="inherit">
                  {total.toLocaleString()}
                </text>

                <circle cx={x} cy={yOf(d.android)} r={4} fill={ANDROID_COLOR} stroke="white" strokeWidth={1.5} />
                <text
                  x={x + (i === data.length - 1 ? -4 : 0)}
                  y={yOf(d.android) - 9}
                  textAnchor={i === data.length - 1 ? 'end' : 'middle'}
                  fontSize={10}
                  fontWeight="600"
                  fill={ANDROID_COLOR}
                  fontFamily="inherit"
                >
                  {d.android.toLocaleString()}
                </text>

                <circle cx={x} cy={yOf(d.ios)} r={4} fill={IOS_COLOR} stroke="white" strokeWidth={1.5} />
                <text
                  x={x + (i === data.length - 1 ? 4 : 0)}
                  y={yOf(d.ios) + 16}
                  textAnchor={i === data.length - 1 ? 'start' : 'middle'}
                  fontSize={10}
                  fontWeight="600"
                  fill={IOS_COLOR}
                  fontFamily="inherit"
                >
                  {d.ios.toLocaleString()}
                </text>

                <text
                  x={x}
                  y={PAD.top + CH + 22}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#6b7280"
                  fontWeight="500"
                  fontFamily="inherit"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-6">
        <Legend color={ANDROID_COLOR} label="Android" icon={<Bot size={11} />} />
        <Legend color={IOS_COLOR} label="iOS" icon={<Apple size={11} />} />
        <Legend color={TOTAL_COLOR} label="Toplam" icon={<Smartphone size={11} />} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 pr-3 text-gray-400 font-semibold uppercase tracking-wider">Month</th>
              <th className="text-right py-2 px-3 font-semibold" style={{ color: ANDROID_COLOR }}>Android</th>
              <th className="text-right py-2 px-3 font-semibold" style={{ color: IOS_COLOR }}>iOS</th>
              <th className="text-right py-2 pl-3 text-gray-600 font-semibold">Total</th>
              <th className="text-right py-2 pl-3 text-gray-400 font-semibold">MoM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((d, i) => {
              const total = d.android + d.ios;
              const prevD = i > 0 ? data[i - 1] : null;
              const prevTotal = prevD ? prevD.android + prevD.ios : null;
              const growth = prevTotal !== null ? pct(total, prevTotal) : null;
              return (
                <tr key={d.month} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-2.5 pr-3 font-semibold text-gray-700">{d.month}</td>
                  <td className="py-2.5 px-3 text-right font-semibold tabular-nums" style={{ color: ANDROID_COLOR }}>{d.android.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-semibold tabular-nums" style={{ color: IOS_COLOR }}>{d.ios.toLocaleString()}</td>
                  <td className="py-2.5 pl-3 text-right font-bold tabular-nums text-gray-800">{total.toLocaleString()}</td>
                  <td className="py-2.5 pl-3 text-right">
                    {growth !== null ? (
                      <span className={`font-semibold ${growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {growth >= 0 ? '+' : ''}{growth}%
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatChip({ label, value, mom, icon, dotColor }: { label: string; value: string; mom: number | null; icon: React.ReactNode; dotColor: string }) {
  return (
    <div className="rounded-xl px-3 py-3 flex flex-col gap-1.5 bg-gray-50">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor }} />
        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">{icon}{label}</span>
      </div>
      <span className="text-lg font-bold text-gray-800">{value}</span>
      {mom !== null && (
        <span className={`text-xs font-semibold ${mom >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {mom >= 0 ? '+' : ''}{mom}% MoM
        </span>
      )}
    </div>
  );
}

function Legend({ color, label, icon }: { color: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-6 h-0.5 rounded-full inline-block" style={{ background: color }} />
      <span className="w-2 h-2 rounded-full flex-shrink-0 -ml-3.5" style={{ background: color }} />
      <span className="text-xs text-gray-500 font-medium flex items-center gap-1 ml-1">{icon}{label}</span>
    </div>
  );
}
