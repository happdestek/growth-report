import { BarChart3, Apple, Bot, CreditCard, Search, Compass } from 'lucide-react';
import { MonthlySourceBreakdown } from '../../types/growth';

const CHANNEL_META: Record<string, {
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}> = {
  paid: {
    label: 'Paid',
    description: 'Reklam ve yönlendirme kaynaklı indirmeler',
    color: '#4472c4',
    icon: <CreditCard size={12} />,
  },
  search: {
    label: 'Search',
    description: 'Arama sonucu gelen indirmeler',
    color: '#ed7d31',
    icon: <Search size={12} />,
  },
  browse: {
    label: 'Browse',
    description: 'Mağaza içi keşif ile gelen indirmeler',
    color: '#a5a5a5',
    icon: <Compass size={12} />,
  },
};

const PLATFORM_META: Record<string, { label: string; icon: React.ReactNode; paidLabel: string }> = {
  ios: { label: 'iOS', icon: <Apple size={13} />, paidLabel: 'Paid (App + Web)', browseLabel: 'Browse' },
  android: { label: 'Android', icon: <Bot size={13} />, paidLabel: 'Paid and direct', browseLabel: 'Google Play explore' },
};

interface SourceBreakdownProps {
  data: MonthlySourceBreakdown[];
}

export default function SourceBreakdownChart({ data }: SourceBreakdownProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-center h-48">
        <p className="text-sm text-gray-400">No source data available</p>
      </div>
    );
  }

  const monthNames = data[0]?.monthNames ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 col-span-full">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
          <BarChart3 size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Source Download Breakdown</p>
          <p className="text-xs text-gray-400">Acquisition channel by platform, monthly</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {data.map(platform => {
          const meta = PLATFORM_META[platform.platform];
          return (
            <div key={platform.platform}>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {meta.icon}
                  {meta.label} Source Download Breakdown
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wider w-44">
                        Kanal Türü
                      </th>
                      {monthNames.map(m => (
                        <th key={m} className="text-right px-4 py-2.5 text-xs font-bold text-gray-600 uppercase tracking-wider">
                          {m}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platform.rows.map((row, ri) => {
                      const ch = CHANNEL_META[row.channel];
                      const isLast = ri === platform.rows.length - 1;
                      const channelLabel = row.channel === 'paid'
                        ? meta.paidLabel
                        : row.channel === 'browse' && meta.browseLabel
                          ? meta.browseLabel
                          : ch?.label ?? row.channel;
                      return (
                        <tr key={row.channel} className={`border-t border-gray-100 ${isLast ? '' : ''} hover:bg-gray-50/60 transition-colors`}>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <span style={{ color: ch?.color }} className="flex items-center">
                                {ch?.icon}
                              </span>
                              <span className="font-semibold text-gray-800 text-xs">{channelLabel}</span>
                            </div>
                          </td>
                          {row.months.map(m => (
                            <td key={m.name} className="px-4 py-2.5 text-right">
                              <span className="font-semibold text-xs" style={{ color: ch?.color }}>
                                {m.count.toLocaleString()}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Kanal Tanımları</p>
        <div className="flex flex-col gap-1.5">
          {Object.entries(CHANNEL_META).map(([key, ch]) => (
            <div key={key} className="flex items-start gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1 font-semibold min-w-[60px]" style={{ color: ch.color }}>
                {ch.icon}
                {ch.label}:
              </span>
              <span>{ch.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
