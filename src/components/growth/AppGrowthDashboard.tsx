import { Activity, Info, Bot, Apple } from 'lucide-react';
import { GrowthFilters } from '../../types/growth';
import { useGrowthData } from '../../hooks/useGrowthData';
import KPISummary from './KPISummary';
import MonthlyComparisonTable from './MonthlyComparisonTable';
import TrendChart from './TrendChart';
import SourceBreakdownChart from './SourceBreakdown';
import InsightBox from './InsightBox';
import NewMembersChart from './NewMembersChart';
import ConversionRate from './ConversionRate';
import FunnelChart from './FunnelChart';
import ASOSection from './ASOSection';

function SkeletonCard({ className = '' }: { className?: string }) {
  return <div className={`bg-white rounded-2xl border border-gray-100 animate-pulse ${className}`} />;
}

function AnalystNote() {
  return (
    <div className="bg-slate-800 rounded-2xl px-5 py-4 flex gap-3 items-start">
      <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
        <Info size={14} className="text-slate-300" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Eylül–Ekim 2026 — Yeni Üye & Sign-up Final</p>
        <ul className="text-sm text-slate-400 flex flex-col gap-2">
          <li className="flex gap-2">
            <span className="text-slate-500 shrink-0">•</span>
            Ekim ayında toplam sign-up 2.936'dan 3.394'e yükselerek Eylül'e göre %15,6 büyüdü. Büyümenin ana sürücüsü app kanalları oldu; iOS sign-up 318'den 695'e, Android sign-up ise 141'den 307'ye yükseldi.
          </li>
          <li className="flex gap-2">
            <span className="text-slate-500 shrink-0">•</span>
            iOS + Android toplam sign-up hacmi 459'dan 1.002'ye çıkarak yaklaşık %118 büyüdü. App kanallarının toplam üyelik içindeki payı %15,6'dan %29,5'e yükselirken Check-up Link'in payı %64,9 seviyesinde gerçekleşti.
          </li>
          <li className="flex gap-2">
            <span className="text-slate-500 shrink-0">•</span>
            Ekim'de acquisition büyümesi yalnızca download tarafında kalmadı; app kaynaklı kullanıcı kazanımı sign-up'a da güçlü şekilde yansıdı. iOS ve Android birlikte Eylül'e göre iki kattan fazla sign-up üretirken toplam yeni üyelik %15,6 arttı.
          </li>
        </ul>
      </div>
    </div>
  );
}

const DEFAULT_FILTERS: GrowthFilters = { dateRange: '30d', platform: 'all', channel: 'all' };

export default function AppGrowthDashboard({ embedded = false }: { embedded?: boolean }) {
  const { dailyMetrics, monthlySourceBreakdown, newMembers, funnelData, prevFunnelData, insight, monthlyKpis, monthlyTable, downloadMonths, loading, savingInsight, saveInsight, signupAvailable } =
    useGrowthData(DEFAULT_FILTERS);

  const content = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">App Download Performansı</h2>
        <p className="text-sm text-gray-400">Aylık indirme, kaynak ve üye kazanım analizi<br />TR Nöbetçi Eczane hariç sitenin geri kalanı %18 büyüdü</p>
      </div>
      <div className="flex flex-col gap-5">

        {loading ? (
          <SkeletonCard className="h-72" />
        ) : (
          <TrendChart data={downloadMonths} />
        )}

        {loading ? (
          <SkeletonCard className="h-56" />
        ) : (
          <SourceBreakdownChart data={monthlySourceBreakdown} />
        )}

        {loading ? (
          <SkeletonCard className="h-72" />
        ) : (
          <NewMembersChart data={newMembers} />
        )}

        {loading ? (
          <SkeletonCard className="h-48" />
        ) : (
          <FunnelChart data={funnelData} prevData={prevFunnelData} signupAvailable={signupAvailable} />
        )}

        {loading ? (
          <SkeletonCard className="h-48" />
        ) : (
          <ConversionRate newMembers={newMembers} monthlyTable={monthlyTable} />
        )}

        <AnalystNote />
      </div>

      <ASOSection />
    </div>
  );

  if (embedded) return content;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">App &amp; User Growth</h1>
            <p className="text-xs text-gray-400">Mobile &amp; web acquisition analytics</p>
          </div>
        </div>
      </header>
      <main className="max-w-screen-2xl mx-auto px-6 py-6">{content}</main>
    </div>
  );
}
