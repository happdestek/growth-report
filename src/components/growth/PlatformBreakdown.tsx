import { PieChart } from 'lucide-react';
import { KPISummaryData } from '../../types/growth';

interface PlatformBreakdownProps {
  data: KPISummaryData;
}

const COLORS = {
  ios: { stroke: '#0ea5e9', fill: '#e0f2fe', label: 'iOS' },
  android: { stroke: '#22c55e', fill: '#dcfce7', label: 'Android' },
  web: { stroke: '#f97316', fill: '#ffedd5', label: 'Web' },
};

function DonutSlice({
  cx, cy, r, innerR, startAngle, endAngle, color,
}: {
  cx: number; cy: number; r: number; innerR: number;
  startAngle: number; endAngle: number; color: string;
}) {
  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const xi1 = cx + innerR * Math.cos(toRad(endAngle));
  const yi1 = cy + innerR * Math.sin(toRad(endAngle));
  const xi2 = cx + innerR * Math.cos(toRad(startAngle));
  const yi2 = cy + innerR * Math.sin(toRad(startAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${xi1} ${yi1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi2} ${yi2} Z`}
      fill={color}
      opacity="0.9"
      className="transition-opacity hover:opacity-100"
    />
  );
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export default function PlatformBreakdown({ data }: PlatformBreakdownProps) {
  const segments = [
    { key: 'ios' as const, value: data.iosDownloads },
    { key: 'android' as const, value: data.androidDownloads },
    { key: 'web' as const, value: data.webRegistrations },
  ];

  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;

  let cumAngle = 0;
  const slices = segments.map(seg => {
    const start = cumAngle;
    const sweep = (seg.value / total) * 360;
    cumAngle += sweep;
    return { ...seg, start, end: cumAngle, pct: Math.round((seg.value / total) * 100) };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center">
          <PieChart size={16} className="text-teal-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Platform Breakdown</p>
          <p className="text-xs text-gray-400">Distribution across platforms</p>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-1">
        <div className="relative shrink-0">
          <svg viewBox="0 0 200 200" className="w-36 h-36">
            {slices.map(s => (
              <DonutSlice
                key={s.key}
                cx={100}
                cy={100}
                r={90}
                innerR={56}
                startAngle={s.start}
                endAngle={s.end}
                color={COLORS[s.key].stroke}
              />
            ))}
            <text x="100" y="96" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e293b">
              {fmt(total)}
            </text>
            <text x="100" y="114" textAnchor="middle" fontSize="11" fill="#94a3b8">
              total
            </text>
          </svg>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          {slices.map(s => (
            <div key={s.key} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[s.key].stroke }} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-semibold text-gray-700">{COLORS[s.key].label}</span>
                  <span className="text-xs text-gray-500">{s.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, backgroundColor: COLORS[s.key].stroke }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{fmt(s.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
