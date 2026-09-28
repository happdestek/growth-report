import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { NewMembersMonthly, MonthlyTableRow } from '../../types/growth';

interface ConversionRateProps {
  newMembers: NewMembersMonthly[];
  monthlyTable: MonthlyTableRow[];
}

function pct(v: number, total: number): string {
  if (total === 0) return '—';
  return ((v / total) * 100).toFixed(1) + '%';
}

function delta(curr: number, prev: number): number | null {
  if (prev === 0) return null;
  return parseFloat(((curr - prev)).toFixed(1));
}

const W = 600;
const H = 100;
const PAD = { left: 40, right: 20, top: 18, bottom: 32 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function ConversionSparkline({ values, labels }: { values: number[]; labels: string[] }) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const pts: [number, number][] = values.map((v, i) => [
    PAD.left + (i / (values.length - 1)) * PLOT_W,
    PAD.top + PLOT_H - ((v - min) / range) * PLOT_H,
  ]);

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }

  const areaD = d + ` L ${pts[pts.length - 1][0]} ${PAD.top + PLOT_H} L ${pts[0][0]} ${PAD.top + PLOT_H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="conv-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#conv-grad)" />
      <path d={d} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
          <text x={x} y={PAD.top + PLOT_H + 18} textAnchor="middle" fontSize="12" fill="#9ca3af" fontFamily="inherit">
            {labels[i]}
          </text>
          <text x={x} y={y - 9} textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="700" fontFamily="inherit">
            {values[i].toFixed(1)}%
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ConversionRate({ newMembers, monthlyTable }: ConversionRateProps) {
  if (!newMembers.length || !monthlyTable.length) return null;

  const sortedMembers = [...newMembers].sort((a, b) => a.month_start.localeCompare(b.month_start));

  const matched = monthlyTable.map((row, i) => {
    const offset = sortedMembers.length - monthlyTable.length;
    const nm = sortedMembers[offset + i] ?? null;
    const appDownloads = row.iosDownloads + row.androidDownloads;
    const appSignups = nm ? nm.ios + nm.android : 0;
    const rate = appDownloads > 0 ? (appSignups / appDownloads) * 100 : 0;
    return {
      month: row.monthName,
      monthKey: row.monthKey,
      appDownloads,
      appSignups,
      rate,
    };
  });

  const curr = matched[matched.length - 1];
  const prev = matched[matched.length - 2];
  const rateDelta = prev ? delta(curr.rate, prev.rate) : null;

  const sparkValues = matched.map(m => m.rate);
  const sparkLabels = matched.map(m => m.month.slice(0, 3));

  const isUp = rateDelta !== null && rateDelta > 0;
  const isDown = rateDelta !== null && rateDelta < 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
          <ArrowRight size={15} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">App Download → Sign-up Conversion</p>
          <p className="text-xs text-gray-400">App indirme başına kayıt oranı, aylık</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">Conversion Rate</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-blue-700 tabular-nums">{curr.rate.toFixed(1)}%</span>
            {rateDelta !== null && (
              <span className={`mb-0.5 inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                isUp ? 'bg-emerald-50 text-emerald-600' :
                isDown ? 'bg-red-50 text-red-500' :
                'bg-gray-50 text-gray-400'
              }`}>
                {isUp ? <TrendingUp size={10} /> : isDown ? <TrendingDown size={10} /> : <Minus size={10} />}
                {rateDelta > 0 ? '+' : ''}{rateDelta.toFixed(1)} pp
              </span>
            )}
          </div>
          <span className="text-xs text-blue-400">{curr.month}</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">App Downloads</span>
          <span className="text-2xl font-bold text-gray-800 tabular-nums">{curr.appDownloads.toLocaleString('tr-TR')}</span>
          <span className="text-xs text-gray-400">{curr.month} toplam indirme</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">App Kayıtlar</span>
          <span className="text-2xl font-bold text-gray-800 tabular-nums">{curr.appSignups.toLocaleString('tr-TR')}</span>
          <span className="text-xs text-gray-400">{curr.month} app kayıt</span>
        </div>
      </div>

      <div className="h-28 mb-4">
        <ConversionSparkline values={sparkValues} labels={sparkLabels} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Ay</th>
              <th className="text-right px-4 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">App İndirme</th>
              <th className="text-right px-4 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">App Kayıt</th>
              <th className="text-right px-4 py-2.5 font-semibold text-gray-500 uppercase tracking-wider">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {matched.map((row, i) => {
              const isLast = i === matched.length - 1;
              return (
                <tr key={row.monthKey} className={`border-t border-gray-100 transition-colors ${isLast ? 'bg-blue-50/40' : 'hover:bg-gray-50/60'}`}>
                  <td className="px-4 py-2.5 font-semibold text-gray-700">{row.month}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">{row.appDownloads.toLocaleString('tr-TR')}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">{row.appSignups.toLocaleString('tr-TR')}</td>
                  <td className={`px-4 py-2.5 text-right tabular-nums font-bold ${isLast ? 'text-blue-600' : 'text-gray-700'}`}>
                    {pct(row.appSignups, row.appDownloads)}
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
