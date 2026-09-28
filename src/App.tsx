import { useState } from 'react';
import { Activity, Search, Mail, Megaphone, Instagram, GitCompareArrows } from 'lucide-react';
import AppGrowthDashboard from './components/growth/AppGrowthDashboard';
import SEODashboard from './components/seo/SEODashboard';
import CRMDashboard from './components/crm/CRMDashboard';
import PaidMarketingDashboard from './components/paid/PaidMarketingDashboard';
import SocialMediaDashboard from './components/social/SocialMediaDashboard';
import ProductPageFunnelDashboard from './components/growth/ProductPageFunnelDashboard';

const TABS = [
  { id: 'growth',  label: 'App Growth & ASO',         icon: <Activity size={14} /> },
  { id: 'funnel',  label: 'Product Page View Funnel', icon: <GitCompareArrows size={14} /> },
  { id: 'seo',     label: 'SEO Performance',           icon: <Search size={14} /> },
  { id: 'crm',     label: 'CRM Performance',           icon: <Mail size={14} /> },
  { id: 'paid',    label: 'Paid Marketing',            icon: <Megaphone size={14} /> },
  { id: 'social',  label: 'Social Media Performance', icon: <Instagram size={14} /> },
] as const;

type TabId = typeof TABS[number]['id'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('growth');

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center gap-4 h-14">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <Activity size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 leading-tight">Growth Report</h1>
                <p className="text-[10px] text-gray-400 leading-none">Mobile, web & SEO</p>
              </div>
            </div>

            <nav className="flex items-center bg-gray-100 rounded-xl p-1 gap-1 overflow-x-auto flex-1 scrollbar-none">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6">
        {activeTab === 'growth'  && <AppGrowthDashboard embedded />}
        {activeTab === 'funnel'  && <ProductPageFunnelDashboard />}
        {activeTab === 'seo'     && <SEODashboard />}
        {activeTab === 'crm'     && <CRMDashboard />}
        {activeTab === 'paid'    && <PaidMarketingDashboard />}
        {activeTab === 'social'  && <SocialMediaDashboard />}
      </main>
    </div>
  );
}
