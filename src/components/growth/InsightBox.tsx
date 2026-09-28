import { useState, useEffect } from 'react';
import { Lightbulb, Save, CheckCircle } from 'lucide-react';
import { GrowthInsight } from '../../types/growth';

interface InsightBoxProps {
  insight: GrowthInsight | null;
  saving: boolean;
  onSave: (data: GrowthInsight) => void;
}

type FormState = Pick<GrowthInsight, 'growth_driver' | 'platform_insight' | 'paid_vs_organic_notes' | 'anomaly'>;

const EMPTY: FormState = { growth_driver: '', platform_insight: '', paid_vs_organic_notes: '', anomaly: '' };

export default function InsightBox({ insight, saving, onSave }: InsightBoxProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (insight) {
      setForm({
        growth_driver: insight.growth_driver ?? '',
        platform_insight: insight.platform_insight ?? '',
        paid_vs_organic_notes: insight.paid_vs_organic_notes ?? '',
        anomaly: insight.anomaly ?? '',
      });
    }
  }, [insight]);

  const handleSave = () => {
    if (!insight) return;
    onSave({ ...insight, ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (label: string, key: keyof FormState, placeholder: string) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <textarea
        rows={3}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-300 transition"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
          <Lightbulb size={16} className="text-amber-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Monthly Insights</p>
          <p className="text-xs text-gray-400">Manual notes for this month</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 px-5 py-4 overflow-y-auto">
        {field('Main Growth Driver', 'growth_driver', 'e.g. Paid UA campaign on iOS drove 40% of downloads…')}
        {field('Platform Insight', 'platform_insight', 'e.g. iOS outperformed Android by 15%, Web share declined…')}
        {field('Organic vs Paid Balance', 'paid_vs_organic_notes', 'e.g. Organic share improved from 55% to 62% this month…')}
        {field('Anomaly / Spike / Drop', 'anomaly', 'e.g. Web spike on Mar 15 due to Product Hunt launch…')}
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={handleSave}
          disabled={saving || !insight}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saved ? (
            <><CheckCircle size={15} />Saved</>
          ) : (
            <><Save size={15} />{saving ? 'Saving…' : 'Save Insights'}</>
          )}
        </button>
      </div>
    </div>
  );
}
