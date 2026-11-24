import type { ReactNode } from 'react';
import { AlertTriangle, ArrowRight, BarChart2, CheckCircle2, ClipboardList, Clock, Info, Layers, Search, Sparkles, Target, TrendingDown, TrendingUp } from 'lucide-react';

const SUMMARY = [
  { label: 'Ekim 2026 · 1–24', value: '47,3K', note: 'Generative AI Impressions', accent: 'gray' },
  { label: 'Kasım 2026 · 1–24', value: '58,8K', note: 'Generative AI Impressions', accent: 'emerald' },
];

const CONTENT_GROWTH = [
  ['Göz rengi değiştirme ameliyatı mümkün mü', '67 → 1.421', '+%2.021'],
  ['Açılmış ilaçların kullanım süreleri', '1.045 → 1.484', '+%42'],
  ['B12, D vitamini ve demir ilişkisi', '415 → 841', '+%103'],
  ['Akciğer tutulması nasıl geçer', '528 → 939', '+%78'],
  ['Zayıflama iğnesi ve alkol', '302 → 645', '+%114'],
  ['Sempatik ne demek', 'yeni → 553', 'yeni'],
  ['Çamaşır suyu zehirlenmesi', '180 → 424', '+%136'],
  ['Ghosting nedir', 'yeni → 335', 'yeni'],
];

const CONTENT_DECLINE = [
  ['/tr Ana Sayfa', '1.091 → 637', '-%42'],
  ['/duty-pharmacy/ar (AR hub)', '1.581 → 1.212', '-%23'],
  ['Kan grubu', '444 → 117', '-%74'],
  ['Zayıflama iğnesi ne zaman etki eder', '542 → 235', '-%57'],
  ['Renkli reçete sistemi', '708 → 456', '-%36'],
  ['/duty-pharmacy/ru/antalya', '457 → 250', '-%45'],
  ['/duty-pharmacy/ar/bursa', '401 → 203', '-%49'],
  ['/duty-pharmacy/en/istanbul', '345 → 151', '-%56'],
];

const CATEGORY_ROWS = [
  ['/tr/blog/ (Türkçe blog)', '12,6K', '19,7K', '+%56', 'AI görünürlüğünün ana motoru; toplamın üçte biri'],
  ['/duty-pharmacy/ (AR/RU/EN)', '16,5K', '12,2K', '-%26', 'Organik düşüşle paralel'],
  ['/nobetci-eczane/ (TR)', '10,9K', '5,7K', '-%47', 'Organik kayıpla aynı oran'],
  ['Ana sayfalar (/tr, /en, /ru, /ar)', '1,2K', '746', '-%36', '/tr 1.091 → 637; /en 60 → 108'],
  ['/hakkimizda (GEO pilot)', '123', '109', '-%11', '6 Kasım canlı; etki Aralık’ta ölçülecek'],
  ['/en/blog/ (anomali hariç)', '511', '~0,7K', '+%40', 'Ham veri tekil anomaliden etkileniyor'],
];

const BLOCKERS = [
  ['Search Console Generative AI ayarı', 'Kontrol bekliyor', "'Search generative AI' ayarının include durumda olduğu doğrulanmalı."],
  ['Kanonik marka / tüzel kişi', 'Yönetim kararı bekliyor', 'Organization yapısında kullanılacak kanonik marka ve tüzel kişi adı netleştirilmeli.'],
  ['YouTube OAuth', 'Yetki bekliyor', 'Video içeriklerin GEO içerik planına alınabilmesi için kanal API yetkisi gerekiyor.'],
  ['Bilgi doğrulaması', 'Operasyon teyidi bekliyor', 'Canlıda kullanılan bazı kurumsal ve operasyonel bilgilerin kaynakları doğrulanmalı.'],
  ['Tekil sorgu anomalisi', 'YENİ · Teknik kontrol', '11 Kasım’daki tek günlük anomali için Güvenlik sorunları ve URL denetimi kontrolleri yapılmalı; KPI hesabında ayrı tutulmalı.'],
  ['Kurumsal sayfaların AI’da gerilemesi', 'YENİ · İzleme', '/tr ana sayfa AI gösterimi 1.091 → 637. Organization şeması ve marka tanımı ana şablona taşınmalı.'],
];

const NEXT_ACTIONS = [
  '11 Kasım anomalisini kapat: Güvenlik sorunları ve URL denetimi kontrollerini tamamla, sonucu rapora ekle.',
  'Canonical Organization + alternateName + sameAs yapısını ana şablona taşı.',
  'Ana sayfaya kısa marka tanımı ve /hakkimizda gövde linki ekle.',
  'datePublished / dateModified altyapısını tüm hizmet ve blog şablonlarına yay.',
  'llms.txt dosyasını güncelle.',
  'AI görünürlüğü yüksek blog konularında içerik üretimini ölçekle; tanım cümlesi ve FAQ bloğu ekle.',
  'Search Console Generative AI ayarını doğrula ve Aralık’tan itibaren haftalık takip başlat.',
];

const STATUS_ITEMS = [
  ['GEO Hazırlık Skoru', '63 / 100', 'Önceki: 63 / 100 — Kasım’da yeni uygulama yok, skor değişmedi (tahmini).', 'blue'],
  ['Tamamlanan Ana Alan', '/hakkimizda', 'TR, EN, RU, AR yapısı tamamlandı; 6 Kasım canlı. AI gösterimi 101 (TR) + 8 (EN).', 'emerald'],
  ['Genel Durum', 'Site geneli rollout bekliyor', 'Teknik site geneli: 4 kısmi / 21 başlamadı · İçerik: 18 başlamadı.', 'amber'],
];

const COLORS = {
  blue: 'border-blue-100 bg-blue-50 text-blue-700',
  emerald: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-100 bg-amber-50 text-amber-700',
};

function SectionHeader({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return <div className="flex items-center gap-2.5 mb-4"><div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">{icon}</div><div><h3 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h3><p className="text-xs text-gray-400">{subtitle}</p></div></div>;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto rounded-xl border border-gray-100"><table className="w-full text-xs border-collapse"><thead><tr className="bg-gray-50">{headers.map(header => <th key={header} className="text-left px-3 py-2.5 font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">{row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`} className={`px-3 py-2.5 ${cellIndex === 0 ? 'font-semibold text-gray-700' : 'text-gray-600'} ${cellIndex > 0 ? 'text-right tabular-nums' : ''}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function StatusCard({ label, value, note, color }: { label: string; value: string; note: string; color: string }) {
  return <div className={`rounded-xl border p-4 flex flex-col gap-2 ${COLORS[color as keyof typeof COLORS]}`}><p className="text-[10px] font-semibold uppercase tracking-wider opacity-75">{label}</p><p className="text-xl font-bold leading-snug">{value}</p><p className="text-xs leading-relaxed opacity-80">{note}</p></div>;
}

export default function GEODashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1"><h2 className="text-xl font-bold text-gray-900 tracking-tight">GEO & AI Visibility</h2><p className="text-sm text-gray-400">Proje durum raporu · Kasım 2026 (1–24 Kasım vs 1–24 Ekim)</p></div>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<Target size={16} />} title="Ölçüm · Kasım" subtitle={'Generative AI görünürlüğü · Search Console “Generative AI features” raporu · 1–24 Ekim vs 1–24 Kasım 2026'} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{SUMMARY.map((item, index) => <div key={item.label} className={`rounded-2xl border-2 p-5 ${index === 1 ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}><p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p><p className="text-[10px] text-gray-400 mt-1">{item.note}</p><p className={`text-3xl font-bold tracking-tight mt-3 ${index === 1 ? 'text-emerald-700' : 'text-gray-700'}`}>{item.value}</p></div>)}</div>
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4 mb-4 flex items-center justify-between gap-4"><div className="flex items-center gap-2.5"><TrendingUp size={18} className="text-white" /><div><p className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">Ekim → Kasım değişim · ham</p><p className="text-xs text-white/70">Generative AI Impressions</p></div></div><div className="text-right"><p className="text-[10px] text-white/70">47,3K → 58,8K · +11,5K</p><p className="text-2xl font-bold text-white">+%24,3</p></div></div>
        <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 mb-4"><div className="flex items-start gap-2"><TrendingDown size={14} className="text-amber-600 mt-0.5 shrink-0" /><p className="text-xs text-amber-700 leading-relaxed"><span className="font-semibold">Anomali hariç gerçek görünürlük:</span> 47,3K → 44,9K · -2,4K · -%5,0. Ham artışın tamamı 11 Kasım’daki tek günlük anomali kaynaklı; /hakkimizda GEO değişiklikleri 6 Kasım’da yayına çıktı ve ölçülebilir etki Aralık’ta bekleniyor.</p></div></div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<AlertTriangle size={16} />} title="11 Kasım Zirvesi — Neden?" subtitle="Günlük Generative AI gösterimi · 27 Ekim – 23 Kasım" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">{[['1 Kas', '2.521'], ['5 Kas', '1.552'], ['7 Kas', '2.590'], ['10 Kas', '1.739'], ['11 Kas', '15.714'], ['12 Kas', '1.803'], ['14 Kas', '2.310'], ['18 Kas', '1.960'], ['21 Kas', '2.333'], ['23 Kas', '1.358']].map(([day, value]) => <div key={day} className={`rounded-lg border px-2.5 py-2 ${day === '11 Kas' ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}><p className="text-[10px] text-gray-400">{day}</p><p className={`text-sm font-bold ${day === '11 Kas' ? 'text-red-600' : 'text-gray-700'}`}>{value}</p></div>)}</div>
        <Table headers={['11 Kasım kırılımı', 'Gösterim', 'Pay']} rows={[['/en/blog/…', '13.759', '%88'], ['Tekil sorgu anomalisi', '13.745', '%87'], ['Türkiye', '15.068', '%96'], ['Mobil', '15.335', '%98'], ['Tıklama', '1', 'CTR %0'], ['Ortalama konum', '5,2', '—']]} />
        <div className="mt-4 rounded-xl bg-slate-800 px-4 py-3"><p className="text-xs text-slate-200 leading-relaxed"><span className="font-semibold text-white">Teşhis:</span> Zirve GEO çalışmasıyla ilgili değil. İngilizce bir blog yazısı, Google’ın generative AI özelliklerinde tek bir spam sorgusu için kaynak olarak gösterildi. Sayfa içeriği temiz; ilişki Google tarafında kuruldu. Sayfa 12 Kasım’dan itibaren günde 10–40 gösterime döndü.</p><p className="text-xs text-slate-400 leading-relaxed mt-2"><span className="font-semibold text-slate-200">Yapılacak:</span> Search Console Güvenlik sorunları ve Manuel işlemler kontrolü, URL denetimi ile Googlebot HTML kontrolü, bu sayfanın GEO KPI’ından hariç tutulması ve tekrar ederse Google spam raporu.</p></div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<TrendingUp size={16} />} title="Yüksek Büyüme Gösteren İçerikler" subtitle="Generative AI gösterimi · 1–24 Ekim → 1–24 Kasım" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><div><p className="text-xs font-bold text-emerald-700 mb-2">Yükselenler</p><div className="flex flex-col gap-2">{CONTENT_GROWTH.map(row => <div key={row[0]} className="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-2"><span className="text-xs text-gray-700">{row[0]}</span><span className="text-[11px] font-semibold text-emerald-700 whitespace-nowrap">{row[1]} · {row[2]}</span></div>)}</div></div><div><p className="text-xs font-bold text-red-600 mb-2">Gerileyenler</p><div className="flex flex-col gap-2">{CONTENT_DECLINE.map(row => <div key={row[0]} className="flex items-center justify-between gap-3 rounded-lg border border-red-100 bg-red-50/40 px-3 py-2"><span className="text-xs text-gray-700">{row[0]}</span><span className="text-[11px] font-semibold text-red-600 whitespace-nowrap">{row[1]} · {row[2]}</span></div>)}</div></div></div>
        <p className="text-[11px] text-gray-500 leading-relaxed mt-4">AI görünürlüğü sağlık-bilgi blog yazılarına kayıyor; kurumsal ve nöbetçi eczane sayfalarından çekiliyor. “Açılmış ilaçlar” büyümeye devam ederken “/tr Ana Sayfa” ve “Renkli reçete sistemi” geri verdi.</p>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"><SectionHeader icon={<Layers size={16} />} title="Kategori Bazında AI Görünürlüğü" subtitle="Generative AI gösterimi · sayfa grubu · 1–24 Ekim → 1–24 Kasım" /><Table headers={['Sayfa grubu', 'Ekim', 'Kasım', 'Değişim', 'Yorum']} rows={CATEGORY_ROWS} /></section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <SectionHeader icon={<Sparkles size={16} />} title="Şu An Neredeyiz?" subtitle="Mevcut durum özeti · Kasım" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{STATUS_ITEMS.map(item => <StatusCard key={item[0]} label={item[0]} value={item[1]} note={item[2]} color={item[3]} />)}</div>
        <div className="mt-4 rounded-xl bg-slate-800 px-4 py-3"><p className="text-xs text-slate-300 leading-relaxed">AI görünürlüğü artışı GEO uygulamasından değil, blog içerik hacminden geliyor. Site geneli rollout başlamadan GEO skorunun ve /hakkimizda dışındaki kurumsal sayfaların AI görünürlüğünün artması beklenmemeli.</p></div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"><SectionHeader icon={<AlertTriangle size={16} />} title="Açık Konular" subtitle="Öncelikli engeller" /><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{BLOCKERS.map((item, index) => <div key={item[0]} className="rounded-xl border border-gray-100 p-4 flex flex-col gap-2"><div className="flex items-start gap-2"><span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-500 shrink-0">{index + 1}</span><div><p className="text-sm font-semibold text-gray-800">{item[0]}</p><span className="inline-flex text-[10px] font-semibold px-2 py-0.5 mt-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">{item[1]}</span></div></div><p className="text-xs text-gray-500 leading-relaxed">{item[2]}</p></div>)}</div></section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"><SectionHeader icon={<ArrowRight size={16} />} title="Sonraki Aksiyonlar" subtitle="Sıradaki adımlar · Aralık" /><div className="flex flex-col gap-2">{NEXT_ACTIONS.map((action, index) => <div key={action} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 hover:bg-gray-50 transition-colors"><span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{index + 1}</span><span className="text-sm text-gray-700">{action}</span><ArrowRight size={14} className="text-gray-300 ml-auto shrink-0" /></div>)}</div></section>

      <section className="bg-slate-800 rounded-2xl p-5 flex flex-col gap-3"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center"><ClipboardList size={16} className="text-slate-300" /></div><div><h3 className="text-sm font-bold text-slate-100 tracking-tight">Yönetim Özeti · Kasım 2026</h3><p className="text-xs text-slate-500">Genel değerlendirme</p></div></div><div className="flex flex-col gap-2.5"><p className="text-sm text-slate-300 leading-relaxed">Generative AI gösterimi 1–24 Kasım’da 58,8K; Ekim’in aynı dönemine göre +%24. Artışın tamamı 11 Kasım’daki tek günlük anomaliden geliyor; anomali hariç görünürlük %5 geride.</p><p className="text-sm text-slate-300 leading-relaxed">AI görünürlüğü Türkçe blog yazılarına kaydı (+%56); nöbetçi eczane, kurumsal ve ana sayfalar geriledi. Bu, organik tarafta görülen TR nöbetçi eczane kaybının AI özelliklerine yansıması.</p><p className="text-sm text-slate-300 leading-relaxed">/hakkimizda GEO uygulaması 6 Kasım’da canlıya alındı; ölçülebilir etki yok. Aralık önceliği Organization şeması ve marka tanımının ana şablona taşınması.</p></div></section>

      <div className="rounded-2xl bg-slate-100 border border-gray-200 px-5 py-4 flex items-start gap-3"><Info size={14} className="text-gray-500 shrink-0 mt-0.5" /><p className="text-[10px] text-gray-500 leading-relaxed">Kaynaklar: Google Search Console › Performance on Search generative AI features, www.happ.health, 1–24 Kasım 2026 vs 1–24 Ekim 2026; 24 Kasım verisi henüz işlenmedi. Sayfa içeriği canlı HTML kontrolü ve Semrush backlink incelemesiyle doğrulandı.</p></div>
    </div>
  );
}
