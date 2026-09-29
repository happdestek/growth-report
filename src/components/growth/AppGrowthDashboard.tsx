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
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Eylül 2026 — Yeni Üye & Sign-up Güncellemesi</p>
        <ul className="text-sm text-slate-400 flex flex-col gap-2">
          <li className="flex gap-2">
            <span className="text-slate-500 shrink-0">•</span>
            Eylül ayında toplam yeni üye hacmi 2.767'ye yükseldi. Check-up Link 2.109 üye ile ana büyüme kaynağı olmaya devam etti. iOS sign-up 291'e yükselerek Ağustos'a göre %91,4 arttı ve Android sign-up 128 olarak gerçekleşti.
          </li>
          <li className="flex gap-2">
            <span className="text-slate-500 shrink-0">•</span>
            Mobil uygulama kaynaklı toplam sign-up 419'a yükselerek Ağustos'taki 314 seviyesine göre %33,4 arttı. App indirme başına kayıt dönüşümü %17,5 seviyesine geriledi (Ağustos: %11,7).
          </li>
          <li className="flex gap-2">
            <span className="text-slate-500 shrink-0">•</span>
            Web sign-up 239 olarak gerçekleşti. Toplam yeni üye içinde Check-up Link %76,2 pay ile baskın kanal konumunu korurken, iOS sign-up'un belirgin toparlanması Eylül'deki en önemli pozitif sinyal oldu.
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
        <p className="text-sm text-gray-400">Aylık indirme, kaynak ve üye kazanım analizi</p>
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

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
              <Info size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Eylül 2026 — Partial Data</p>
              <p className="text-xs text-gray-400">Platform bazlı download özeti (tamamlanmamış ay)</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <Bot size={13} /> Android
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 tabular-nums">1.162</span>
                <span className="text-xs text-gray-400">downloads</span>
              </div>
              <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">MTD · 1–19 Eylül 2026</span>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Ağustos tam ayı: 2.038 downloads. Partial month — direct volume comparison is directional only.
              </p>
            </div>
            <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700 uppercase tracking-wider">
                <Apple size={13} /> iOS
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 tabular-nums">1.226</span>
                <span className="text-xs text-gray-400">downloads</span>
              </div>
              <span className="text-[10px] font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full w-fit">MTD · 1–28 Eylül 2026</span>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Ağustos tam ayı: 639 downloads. MTD / directional comparison — ay henüz kapanmadı.
              </p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-amber-600 leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            Android ve iOS Eylül verileri farklı tarih aralıklarını kapsadığı için platform hacimleri ve toplam download henüz doğrudan karşılaştırılmamaktadır.
          </p>
        </div>

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
