import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: number;
  prev: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  currentPeriodLabel?: string;
  prevPeriodLabel?: string;
}

function pct(curr: number, prev: number): number {
  if (prev === 0) return 0;
  return Math.round(((curr - prev) / prev) * 100);
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export default function KPICard({ label, value, prev, icon, color, bgColor, currentPeriodLabel, prevPeriodLabel }: KPICardProps) {
  const change = pct(value, prev);
  const isUp = change > 0;
  const isFlat = change === 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bgColor}`}>
          <span className={color}>{icon}</span>
        </div>
      </div>

      {currentPeriodLabel && (
        <p className="text-xs font-medium text-gray-400 -mb-1">{currentPeriodLabel}</p>
      )}

      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{fmt(value)}</span>
        <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${isFlat ? 'text-gray-500 bg-gray-50' : isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
          {isFlat ? <Minus size={14} /> : isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{isFlat ? '—' : `${isUp ? '+' : ''}${change}%`}</span>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        vs. {prevPeriodLabel ?? 'previous period'} <span className="font-medium text-gray-500">({fmt(prev)})</span>
      </p>
    </div>
  );
}
