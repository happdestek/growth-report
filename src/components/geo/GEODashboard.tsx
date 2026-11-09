import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Info,
  ClipboardList,
  Layers,
  Gauge,
} from 'lucide-react';

const STATUS_KPIS = [
  {
    label: 'GEO Hazırlık Skoru',
    value: '63 / 100',
    sub: 'Önceki: 60 / 100',
    note: 'Tahmini hazırlık skoru',
    icon: <Gauge size={16} />,
    accent: 'text-blue-600 bg-blue-50',
  },
  {
    label: 'Tamamlanan Ana Alan',
    value: '/hakkimizda',
    sub: 'TR, EN, RU, AR yapısı tamamlandı',
    note: '',
    icon: <Layers size={16} />,
    accent: 'text-emerald-600 bg-emerald-50',
  },
  {
    label: 'Genel Durum',
    value: 'Site geneli rollout bekliyor',
    sub: 'Bir sayfa tamamlandı, uygulama henüz site geneline yayılmadı',
    note: '',
    icon: <ClipboardList size={16} />,
    accent: 'text-amber-600 bg-amber-50',
  },
];

const COMPLETED_ACTIONS = [
  'AboutPage + Organization + BreadcrumbList + FAQPage schema eklendi',
  'TR / EN / RU / AR olmak üzere dört dilde uygulandı',
  'Sayfa tanım cümlesiyle başlayacak şekilde düzenlendi',
  'Görünür güncelleme tarihi ve dateModified eklendi',
  '8 soruluk FAQ ve FAQPage schema eşleştirildi',
  'İç link sayısı 3’ten 12’ye çıkarıldı',
  'Başlık hiyerarşisi düzenlendi',
  'Organization kimliği ana sayfadaki yapı ile hizalandı',
  'Apple Health entegrasyonu ilgili bilgi alanına eklendi',
];

const SITE_STATUS = [
  { area: '/hakkimizda', done: 10, partial: 0, notStarted: 0, outOfScope: 1, total: 11 },
  { area: 'Teknik Site Geneli', done: 0, partial: 4, notStarted: 21, outOfScope: 0, total: 25 },
  { area: 'İçerik', done: 0, partial: 0, notStarted: 18, outOfScope: 0, total: 18 },
];

const BLOCKERS = [
  {
    priority: 1,
    title: 'Search Console Generative AI ayarı',
    status: 'Kontrol bekliyor',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-100',
    text: "Search Console’da 'Search generative AI' ayarının include durumda olduğu doğrulanmalı.",
  },
  {
    priority: 2,
    title: 'Kanonik marka / tüzel kişi',
    status: 'Yönetim kararı bekliyor',
    statusColor: 'text-blue-600 bg-blue-50 border-blue-100',
    text: 'Organization yapısında kullanılacak kanonik marka ve tüzel kişi adı netleştirilmeli.',
  },
  {
    priority: 3,
    title: 'YouTube OAuth',
    status: 'Yetki bekliyor',
    statusColor: 'text-orange-600 bg-orange-50 border-orange-100',
    text: 'Video içeriklerin GEO içerik planına alınabilmesi için kanal API yetkisi gerekiyor.',
  },
  {
    priority: 4,
    title: 'Bilgi doğrulaması',
    status: 'Operasyon teyidi bekliyor',
    statusColor: 'text-slate-600 bg-slate-100 border-slate-200',
    text: 'Canlıda kullanılan bazı kurumsal ve operasyonel bilgilerin kaynakları doğrulanmalı.',
  },
];

const NEXT_ACTIONS = [
  'Search Console Generative AI ayarını doğrula',
  'Canonical Organization + alternateName + sameAs yapısını ana şablona taşı',
  'datePublished / dateModified altyapısını tüm hizmet ve blog şablonlarına yay',
  'llms.txt dosyasını güncelle',
  'Ana sayfaya kısa marka tanımı + /hakkimizda gövde linki ekle',
  'AI görünürlüğü yüksek içeriklerden başlayarak içerik üretimini ölçekle',
];

const BASELINE_EXAMPLES = [
  { label: 'Açılmış ilaçların kullanım süreleri', prev: 198, curr: 1323 },
  { label: '/tr Ana Sayfa', prev: 501, curr: 1317 },
  { label: 'Renkli reçete sistemi', prev: 137, curr: 908 },
];

const MANAGEMENT_SUMMARY = [
  'GEO çalışmasının ilk fazında /hakkimizda sayfası dört dilde tamamlandı ve teknik olarak doğrulandı. GEO hazırlık skoru tahmini 60’tan 63’e yükseldi.',
  'Şu anki ana ihtiyaç, yapılan yapıyı site geneline yaymak. Teknik şablonlar, tarih altyapısı, marka kimliği ve içerik üretimi sıradaki ana çalışma alanları.',
  '6 Kasım’da canlıya alınan geliştirmelerin ilk anlamlı etkisi Aralık başından itibaren ölçülmeye başlanacak.',
];

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}

function StatusBadge({ count, label, color }: { count: number; label: string; color: string }) {
  if (count === 0) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {count} {label}
    </span>
  );
}

function ProgressBar({ done, partial, total }: { done: number; partial: number; total: number }) {
  const donePct = total > 0 ? (done / total) * 100 : 0;
  const partialPct = total > 0 ? (partial / total) * 100 : 0;
  return (
    <div className="flex h-2 w-full rounded-full bg-gray-100 overflow-hidden">
      <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${donePct}%` }} />
      <div className="bg-amber-400 transition-all duration-500" style={{ width: `${partialPct}%` }} />
    </div>
  );
}

export default function GEODashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">GEO & AI Visibility</h2>
        <p className="text-sm text-gray-400">Proje durum raporu · Kasım 2026</p>
      </div>

      {/* 1 — Şu An Neredeyiz? */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<Sparkles size={16} />} title="Şu An Neredeyiz?" subtitle="Mevcut durum özeti" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUS_KPIS.map(kpi => (
            <div key={kpi.label} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.accent}`}>
                {kpi.icon}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-base font-bold text-gray-900 leading-snug">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-500">{kpi.sub}</p>}
              {kpi.note && <p className="text-[10px] text-gray-400">{kpi.note}</p>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 bg-slate-800 rounded-xl px-4 py-3">
          <Info size={13} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            GEO çalışmasının ilk uygulama alanı /hakkimizda sayfası oldu. Sayfa dört dilde tamamlandı ve teknik olarak doğrulandı; ancak site genelindeki ana GEO geliştirmeleri henüz rollout aşamasına geçmedi.
          </p>
        </div>
      </section>

      {/* 2 — Tamamlanan Aksiyonlar */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<CheckCircle2 size={16} />} title="Tamamlanan Aksiyonlar" subtitle="/hakkimizda sayfası uygulaması" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {COMPLETED_ACTIONS.map((action, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-gray-100 bg-emerald-50/40 px-3 py-2.5">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-xs text-gray-700 leading-relaxed">{action}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <Info size={13} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            İlk sayfa uygulaması tamamlandı ve canlı sitede doğrulandı. Yapılan geliştirmeler hem kullanıcıya görünen içerikte hem de makine-okunur schema katmanında uygulandı.
          </p>
        </div>
      </section>

      {/* 3 — Site Geneli Durum */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<Layers size={16} />} title="Site Geneli Durum" subtitle="İş kalemleri ilerleme özeti" />
        <div className="flex flex-col gap-3">
          {SITE_STATUS.map(row => (
            <div key={row.area} className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-semibold text-gray-800">{row.area}</span>
                <div className="flex items-center gap-1.5">
                  <StatusBadge count={row.done} label="tamamlandı" color="bg-emerald-50 text-emerald-600" />
                  <StatusBadge count={row.partial} label="kısmi" color="bg-amber-50 text-amber-600" />
                  <StatusBadge count={row.notStarted} label="başlamadı" color="bg-gray-100 text-gray-500" />
                  <StatusBadge count={row.outOfScope} label="kapsam dışı" color="bg-slate-100 text-slate-500" />
                </div>
              </div>
              <ProgressBar done={row.done} partial={row.partial} total={row.total} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <Info size={13} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            İlk uygulama tamamlanmış olsa da GEO çalışmasının ana ölçeklenme alanı site geneli teknik yapı ve içerik üretimi. Mevcut skorun sınırlı artmasının temel nedeni de bu.
          </p>
        </div>
      </section>

      {/* 4 — Açık Konular */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<AlertTriangle size={16} />} title="Açık Konular" subtitle="Öncelikli engeller" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BLOCKERS.map(b => (
            <div key={b.priority} className="rounded-xl border border-gray-100 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-500">
                    {b.priority}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">{b.title}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${b.statusColor}`}>
                  {b.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Sonraki Aksiyonlar */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<ArrowRight size={16} />} title="Sonraki Aksiyonlar" subtitle="Sıradaki adımlar" />
        <div className="flex flex-col gap-2">
          {NEXT_ACTIONS.map((action, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 hover:bg-gray-50 transition-colors">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700">{action}</span>
              <ArrowRight size={14} className="text-gray-300 ml-auto shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* 6 — AI Visibility Baseline */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<TrendingUp size={16} />} title="Ölçüm Başlangıç Noktası" subtitle="Generative AI görünürlük baz verisi" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Eylül Generative AI Impressions</p>
            <p className="text-xl font-bold text-gray-900">57,4K</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ekim</p>
            <p className="text-xl font-bold text-gray-900">61,1K</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 flex flex-col gap-1">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Değişim</p>
            <p className="text-xl font-bold text-emerald-600">+6,4%</p>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-slate-800 rounded-xl px-4 py-3 mb-4">
          <Info size={13} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            Ekim verisi GEO çalışmasının sonucu değil, başlangıç ölçümüdür. /hakkimizda değişiklikleri 6 Kasım’da yayına çıktı. Gerçek etki ölçümü Aralık başından itibaren yapılacak.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Yüksek büyüme gösteren içerikler</p>
          {BASELINE_EXAMPLES.map(ex => {
            const growth = ex.prev > 0 ? Math.round(((ex.curr - ex.prev) / ex.prev) * 100) : 0;
            return (
              <div key={ex.label} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-2.5">
                <span className="text-sm text-gray-700">{ex.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 tabular-nums">{ex.prev.toLocaleString('tr-TR')}</span>
                  <ArrowRight size={12} className="text-gray-300" />
                  <span className="text-sm font-bold text-gray-900 tabular-nums">{ex.curr.toLocaleString('tr-TR')}</span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    +{growth.toLocaleString('tr-TR')}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7 — Management Summary */}
      <section className="bg-slate-800 rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center">
            <ClipboardList size={16} className="text-slate-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-tight">Yönetim Özeti</h3>
            <p className="text-xs text-slate-500">Genel değerlendirme</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {MANAGEMENT_SUMMARY.map((text, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <Clock size={12} className="text-slate-500 mt-1 shrink-0" />
              <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
