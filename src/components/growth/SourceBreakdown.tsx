import { BarChart3, Apple, Bot, CreditCard, Search, Compass, AlertCircle } from 'lucide-react';
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

const PLATFORM_META: Record<string, { label: string; icon: React.ReactNode; paidLabel: string; browseLabel?: string }> = {
  ios: { label: 'iOS', icon: <Apple size={13} />, paidLabel: 'App + Web Referrer', browseLabel: 'App Store Browse' },
  android: { label: 'Android', icon: <Bot size={13} />, paidLabel: 'Ads & Referrals', browseLabel: 'Google Play Explore' },
};

const PLATFORM_INSIGHTS: Record<string, { september: string[]; augustContext: string }> = {
  android: {
    september: [
      'Eylül\'ün ilk 19 gününde Google Play tarafında 1.162 download gerçekleşti. Downloadların %66,7\'si Ads & Referrals, %29,9\'u Google Play Explore ve %3,4\'ü Google Play Search kaynaklı oldu. Ay tamamlanmadığı için hacim Ağustos tam ayıyla doğrudan karşılaştırılmamalıdır.',
      'Store listing tarafında 5.240 Product Page View kaydedildi; erken dönem verisi acquisition mix\'in ağırlıklı olarak Ads & Referrals tarafından taşındığını gösteriyor.',
    ],
    augustContext: 'Ağustos tam ayı: 2.038 downloads · PPV→Download %17,83 → Eylül MTD: %22,18',
  },
  ios: {
    september: [
      'Eylül\'ün ilk 28 gününde App Store tarafında 1.226 download gerçekleşti. Downloadların %74,2\'si App Referrer, %13,3\'ü Web Referrer ve %10,0\'u App Store Search kaynaklı oldu. App + Web Referrer birlikte toplam download hacminin %87,5\'ini oluşturdu.',
      '4.760 Product Page View kaydedilen dönemde download hacmi Ağustos tam ayının üzerine çıktı; ancak Eylül henüz tamamlanmadığı için final değerlendirme ay kapanışında yapılmalıdır.',
    ],
    augustContext: 'Ağustos tam ayı: 639 downloads · PPV→Download %9,42 → Eylül MTD: %25,76',
  },
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
  const partialLabels = data[0]?.partialLabels ?? {};
  const hasPartial = monthNames.some(m => partialLabels[m]);

  const getMonthTotal = (platform: string, monthName: string) => {
    const platformData = data.find(p => p.platform === platform);
    if (!platformData) return 0;
    return platformData.rows.reduce((sum, row) => {
      const monthData = row.months.find(m => m.name === monthName);
      return sum + (monthData?.count ?? 0);
    }, 0);
  };

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

      {hasPartial && (
        <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5">
          <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-[11px] text-amber-700 leading-relaxed">
            Eylül 2026 verileri tam ayı kapsamamaktadır. Android 1–19 Eylül, iOS 1–28 Eylül aralığını içerir. Platformların farklı tarih aralıkları nedeniyle toplam download henüz doğrudan karşılaştırılmamaktadır.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {data.map(platform => {
          const meta = PLATFORM_META[platform.platform];
          const insights = PLATFORM_INSIGHTS[platform.platform];
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
                          <div className="flex flex-col items-end gap-0.5">
                            <span>{m}</span>
                            {partialLabels[m] && (
                              <span className="text-[9px] font-medium text-amber-600 normal-case tracking-normal bg-amber-50 px-1.5 py-0.5 rounded-full">
                                {partialLabels[m]}
                              </span>
                            )}
                          </div>
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
                          {row.months.map(m => {
                            const monthTotal = getMonthTotal(platform.platform, m.name);
                            const pctVal = monthTotal > 0 ? ((m.count / monthTotal) * 100).toFixed(1) : '0.0';
                            return (
                              <td key={m.name} className="px-4 py-2.5 text-right">
                                <div className="flex flex-col items-end">
                                  <span className="font-semibold text-xs" style={{ color: ch?.color }}>
                                    {m.count.toLocaleString()}
                                  </span>
                                  {m.count > 0 && (
                                    <span className="text-[10px] text-gray-400 tabular-nums">
                                      %{pctVal}
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    {/* Total row */}
                    <tr className="border-t-2 border-gray-200 bg-gray-50/40">
                      <td className="px-4 py-2.5">
                        <span className="font-bold text-gray-700 text-xs">Toplam Download</span>
                      </td>
                      {monthNames.map(m => {
                        const total = getMonthTotal(platform.platform, m);
                        return (
                          <td key={m} className="px-4 py-2.5 text-right">
                            <span className="font-bold text-xs text-gray-800 tabular-nums">
                              {total.toLocaleString()}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* August context + September insight */}
              {insights && (
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <AlertCircle size={12} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-700 leading-relaxed">
                      {insights.augustContext}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                    <AlertCircle size={12} className="text-slate-500 mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-1">
                      {insights.september.map((text, i) => (
                        <p key={i} className="text-[11px] text-slate-600 leading-relaxed">
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
