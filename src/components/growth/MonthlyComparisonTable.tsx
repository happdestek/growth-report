import { TableProperties, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MonthlyTableRow } from '../../types/growth';

interface MonthlyComparisonTableProps {
  rows: MonthlyTableRow[];
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

function pct(curr: number, prev: number): number | null {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

function ChangeChip({ curr, prev }: { curr: number; prev: number }) {
  const change = pct(curr, prev);
  if (change === null) return <span className="text-gray-300 text-xs">—</span>;
  const isUp = change > 0;
  const isFlat = change === 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${isFlat ? 'text-gray-400 bg-gray-50' : isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
      {isFlat ? <Minus size={10} /> : isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {isFlat ? '—' : `${isUp ? '+' : ''}${change}%`}
    </span>
  );
}

interface SectionRow {
  label: string;
  color: string;
  isHeader?: boolean;
  getValues: (dlRows: MonthlyTableRow[], nmRows: NewMembersMonthly[]) => number[];
}

const SECTION_ROWS: SectionRow[] = [
  {
    label: 'App Downloads (Total)',
    color: 'text-blue-600',
    isHeader: true,
    getValues: (dl) => dl.map(r => r.totalDownloads),
  },
  {
    label: 'iOS Downloads',
    color: 'text-sky-500',
    getValues: (dl) => dl.map(r => r.iosDownloads),
  },
  {
    label: 'Android Downloads',
    color: 'text-green-600',
    getValues: (dl) => dl.map(r => r.androidDownloads),
  },
];

export default function MonthlyComparisonTable({ rows }: MonthlyComparisonTableProps) {
  if (rows.length === 0) return null;

  const colCount = rows.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center">
          <TableProperties size={16} className="text-slate-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Monthly Comparison</p>
          <p className="text-xs text-gray-400">App downloads & yeni üye — Mayıs vs Ağustos</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2.5 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">Metric</th>
              {rows.map((r, i) => (
                <th
                  key={r.monthKey}
                  className={`text-right py-2.5 px-4 text-xs font-semibold uppercase tracking-wider ${i === colCount - 1 ? 'text-blue-600' : 'text-gray-500'}`}
                >
                  {r.monthName}
                  {i === colCount - 1 && (
                    <span className="ml-1.5 text-[10px] font-medium bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-full normal-case tracking-normal">son</span>
                  )}
                </th>
              ))}
              <th className="text-right py-2.5 pl-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">MoM</th>
            </tr>
          </thead>
          <tbody>
            {SECTION_ROWS.map((row, idx) => {
              const values = row.getValues(rows, []);
              const prev = values[values.length - 2] ?? 0;
              const curr = values[values.length - 1] ?? 0;

              const isAppHeader = row.label === 'App Downloads (Total)';
              const isNmHeader = row.label === 'Yeni Üye (Toplam)';

              return (
                <tr
                  key={idx}
                  className={`
                    hover:bg-gray-50/60 transition-colors
                    ${isAppHeader ? 'border-t-2 border-gray-100' : ''}
                    ${isNmHeader ? 'border-t-2 border-gray-200 mt-2' : 'border-b border-gray-50'}
                    ${row.isHeader ? 'bg-gray-50/40' : ''}
                  `}
                >
                  <td className={`py-3 pr-4 font-medium ${row.color} ${row.isHeader ? 'font-semibold' : ''}`}>
                    {!row.isHeader && <span className="mr-1.5 text-gray-300">└</span>}
                    {row.label}
                  </td>
                  {values.map((v, i) => (
                    <td
                      key={i}
                      className={`py-3 px-4 text-right tabular-nums ${i === colCount - 1 ? 'text-gray-900 font-semibold' : 'text-gray-500'} ${row.isHeader ? 'font-bold' : ''}`}
                    >
                      {fmt(v)}
                    </td>
                  ))}
                  <td className="py-3 pl-4 text-right">
                    <ChangeChip curr={curr} prev={prev} />
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
