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

const PLATFORM_META: Record<string, { label: string; icon: React.ReactNode }> = {
  ios: { label: 'iOS', icon: <Apple size={13} /> },
  android: { label: 'Android', icon: <Bot size={13} /> },
};

const CHANNEL_LABELS: Record<string, string> = {
  paid: 'Ads & Referrals',
  search: 'Search',
  browse: 'Browse / Explore',
};

const PLATFORM_INSIGHTS: Record<string, { september: string[]; augustContext: string }> = {
  android: {
    september: [
      'Eylül ayı Android tarafında 7.073 Product Page View ve 1.857 download ile tamamlandı; PPV → Download dönüşümü %26,25 oldu. Ads & Referrals 1.590 download ile toplam hacmin %85,6\'sını oluştururken Browse / Explore %14,4 ve Search %0,0 pay aldı.',
      'Ekim ayında Android tarafında 2.710 download gerçekleşti. Ads & Referrals 2.578 download ile toplam hacmin %95,1\'ini oluştururken Browse / Explore 132 download ile %4,9, Search ise %0,0 pay aldı.',
      'Ekim’de Android acquisition mix daha da paid/referral ağırlıklı hale geldi. Ads & Referrals payı %85,6\'dan %95,1\'e yükselirken Browse / Explore payı %14,4\'ten %4,9\'a geriledi. Search %0,0 ile stabil kaldı.',
    ],
    augustContext: 'Android Ekim performansı güçlü kapandı: 6.705 Product Page View’den 2.710 download elde edildi. PPV → Download dönüşümü %26,25’ten %40,42’ye yükselerek +14,17 puan iyileşti. Downloadların %95,1’i Ads & Referrals kaynaklı gerçekleşirken Browse / Explore payı %4,9’a geriledi.',
  },
  ios: {
    september: [
      'Eylül ayı 1.446 download ve 5.333 Product Page View ile tamamlandı; PPV → Download oranı %27,11 oldu. Ads & Referrals 1.276 download ile toplam hacmin %88,2\'sini oluştururken Search %9,5, Browse / Explore ise %2,2 pay aldı.',
      'Ekim ayında iOS tarafında 10.003 Product Page View ve 2.524 download elde edildi. Product Page View hacmi Eylül\'e göre %87,6, download hacmi ise %74,6 arttı.',
      'PPV → Download dönüşümü %27,11\'den %25,23\'e sınırlı gerilese de Ekim iOS acquisition hacmi belirgin şekilde büyüdü.',
    ],
    augustContext: 'iOS Ekim performansı güçlü hacim büyümesiyle kapandı. Product Page View yaklaşık %88 artarken download %75 büyüyerek 2.524\'e ulaştı. Store conversion %25,23 ile Eylül\'ün 1,88 puan altında kalsa da artan trafik güçlü biçimde download hacmine yansıdı.',
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
  const sharedPartialLabels = data[0]?.partialLabels ?? {};
  const hasPartial = monthNames.some(m => sharedPartialLabels[m]);

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
            Eylül ve Ekim 2026 verileri final tam ay verileridir.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {data.map(platform => {
          const meta = PLATFORM_META[platform.platform];
          const insights = PLATFORM_INSIGHTS[platform.platform];
          const platPartialLabels = platform.partialLabels ?? {};
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
                            {platPartialLabels[m] && (
                              <span className="text-[9px] font-medium text-amber-600 normal-case tracking-normal bg-amber-50 px-1.5 py-0.5 rounded-full">
                                {platPartialLabels[m]}
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
                      const channelLabel = CHANNEL_LABELS[row.channel] ?? ch?.label ?? row.channel;
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
              <span className="flex items-center gap-1 font-semibold min-w-[120px]" style={{ color: ch.color }}>
                {ch.icon}
                {CHANNEL_LABELS[key] ?? ch.label}:
              </span>
              <span>{ch.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
