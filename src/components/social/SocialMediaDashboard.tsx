import { useState } from 'react';
import { Eye, Play, Users, Clock, ThumbsUp, MessageCircle, Share2, TrendingUp, TrendingDown, Lightbulb, Instagram, Youtube, Linkedin, Bookmark, Send } from 'lucide-react';

type MonthKey = 'june' | 'july' | 'august' | 'september' | 'october';

const MONTHS: { key: MonthKey; label: string }[] = [
  { key: 'june', label: 'Haziran 2026' },
  { key: 'july', label: 'Temmuz 2026' },
  { key: 'august', label: 'Ağustos 2026' },
  { key: 'september', label: 'Eylül 2026' },
  { key: 'october', label: 'Ekim 2026' },
];

interface KPICardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function KPICard({ label, value, change, changeType, icon, iconBg, iconColor }: KPICardProps) {
  const changeBg = changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : changeType === 'down' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500';
  const ChangeIcon = changeType === 'up' ? TrendingUp : changeType === 'down' ? TrendingDown : null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-tight">{label}</p>
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
        {change && (
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${changeBg}`}>
            {ChangeIcon && <ChangeIcon size={9} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

function StatRow({ label, value, change, changeType, icon }: StatRowProps) {
  const changeBg = changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : changeType === 'down' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500';
  const ChangeIcon = changeType === 'up' ? TrendingUp : changeType === 'down' ? TrendingDown : null;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-semibold text-gray-800">{value}</span>
        {change && (
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${changeBg}`}>
            {ChangeIcon && <ChangeIcon size={9} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

interface PlatformBlockProps {
  title: string;
  platformIcon: React.ReactNode;
  headerBg: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  stats: StatRowProps[];
  insight: React.ReactNode;
  insightColor?: string;
}

function PlatformBlock({ title, platformIcon, headerBg, headerText, badgeBg, badgeText, stats, insight }: PlatformBlockProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className={`px-5 py-4 flex items-center gap-3 ${headerBg}`}>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${badgeBg}`}>
          <span className={badgeText}>{platformIcon}</span>
        </div>
        <h3 className={`font-bold text-base ${headerText}`}>{title}</h3>
      </div>
      <div className="px-5 pt-1 pb-2 flex-1">
        {stats.map((s, i) => (
          <StatRow key={i} {...s} />
        ))}
      </div>
      <div className="mx-5 mb-5 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
        <div className="flex flex-col gap-1.5">
          {typeof insight === 'string' ? <p className="text-[11px] text-blue-700 leading-relaxed">{insight}</p> : insight}
        </div>
      </div>
    </div>
  );
}

function FollowerSummaryCard({ rows, summary, previousLabel = 'Tem', currentLabel = 'Ağustos' }: { rows: { platform: string; icon: React.ReactNode; iconBg: string; iconColor: string; previous: string; current: string; change: string; changeType: 'up' | 'down' | 'neutral' }[]; summary: string; previousLabel?: string; currentLabel?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-3 bg-slate-50 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-200">
          <span className="text-slate-700"><Users size={17} /></span>
        </div>
        <h3 className="font-bold text-base text-slate-800">Takipçi Özeti</h3>
        <span className="ml-auto text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{currentLabel} 2026</span>
      </div>
      <div className="divide-y divide-gray-50">
        {rows.map(r => (
          <div key={r.platform} className="flex items-center justify-between px-5 py-3 gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${r.iconBg}`}>
                <span className={r.iconColor}>{r.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{r.platform}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-gray-400 tabular-nums">{previousLabel}: {r.previous}</span>
              <span className="text-sm font-bold text-gray-900 tabular-nums">{r.current}</span>
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                r.changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : r.changeType === 'down' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
              }`}>
                {r.changeType === 'up' && <TrendingUp size={9} />}
                {r.changeType === 'down' && <TrendingDown size={9} />}
                {r.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-5 mb-5 mt-3 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-blue-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}

function TopContentTable({ title, items }: { title: string; items: { title: string; metric?: string; value: string }[] }) {
  return (
    <div className="mx-5 mb-3 rounded-xl border border-rose-100 overflow-hidden">
      <div className="bg-rose-50 px-3 py-2">
        <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">{title}</p>
      </div>
      <div className="px-3 py-2.5 flex flex-col gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[9px] font-bold text-rose-400 w-3 shrink-0 mt-0.5">{i + 1}</span>
            <span className="text-[11px] text-gray-600 leading-snug flex-1 truncate">{item.title}</span>
            <span className="text-[11px] font-semibold text-gray-800 tabular-nums shrink-0">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightBox({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'dark' }) {
  if (variant === 'dark') {
    return (
      <div className="flex gap-3 items-start bg-slate-800 rounded-2xl px-5 py-4">
        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb size={15} className="text-white" />
        </div>
        <div>{children}</div>
      </div>
    );
  }
  return (
    <div className="mx-5 mb-5 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
      <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function StrategyCard({ platform, icon, iconBg, iconColor, sections }: {
  platform: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  sections: { title: string; items: string[] }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-2.5 border-b border-gray-50">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <h4 className="text-sm font-bold text-gray-800">{platform}</h4>
      </div>
      <div className="px-4 py-3 flex flex-col gap-3">
        {sections.map((s, i) => (
          <div key={i}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{s.title}</p>
            <ul className="flex flex-col gap-1">
              {s.items.map((item, j) => (
                <li key={j} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-1.5">
                  <span className="text-gray-300 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthTabs({ active, onSelect }: { active: MonthKey; onSelect: (m: MonthKey) => void }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {MONTHS.map(m => (
        <button
          key={m.key}
          onClick={() => onSelect(m.key)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            active === m.key
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

// ============ AUGUST 2026 DATA ============

const AUGUST_FOLLOWERS = [
  { platform: 'Instagram',  icon: <Instagram size={14} />, iconBg: 'bg-rose-100', iconColor: 'text-rose-600', previous: '18.156', current: '18.935', change: '+504 / +%4,3',  changeType: 'up' as const },
  { platform: 'YouTube',    icon: <Youtube size={14} />,   iconBg: 'bg-red-100',   iconColor: 'text-red-600',   previous: '33.344', current: '33.260', change: '-84 / -%0,3',   changeType: 'down' as const },
  { platform: 'LinkedIn',   icon: <Linkedin size={14} />,  iconBg: 'bg-blue-100',  iconColor: 'text-blue-700',  previous: '1.700',  current: '1.704',  change: '+4 / +%0,2',    changeType: 'up' as const },
  { platform: 'TikTok',     icon: <Play size={14} />,      iconBg: 'bg-gray-200',  iconColor: 'text-gray-700',  previous: '1.731',  current: '1.815',  change: '+84 / +%4,9',   changeType: 'up' as const },
  { platform: 'X / Twitter',icon: <Send size={14} />,      iconBg: 'bg-gray-200',  iconColor: 'text-gray-700',  previous: '22',     current: '22',     change: '0',             changeType: 'neutral' as const },
];

const AUGUST_IG_TOP_VIEWS = [
  { title: 'Prostat hakkında sosyal medyada...', value: '45.706' },
  { title: 'Miyomların takibi ve tedavi süreci...', value: '44.666' },
  { title: 'Sağlığınız için ilk adım, bulunduğunuz yerde...', value: '12.770' },
  { title: 'İnme belirtilerini biliyor musun?', value: '7.158' },
  { title: 'Yaz geldi, hareket arttı?', value: '3.700' },
];

const AUGUST_IG_TOP_LIKES = [
  { title: 'Miyomların takibi ve tedavi süreci...', value: '136' },
  { title: 'İnme belirtilerini biliyor musun?', value: '92' },
  { title: 'Prostat hakkında sosyal medyada...', value: '38' },
  { title: 'Yaz geldi, hareket arttı?', value: '27' },
  { title: 'Lösemi ve lenfomalar...', value: '25' },
];

const AUGUST_IG_TOP_SAVES = [
  { title: 'Miyomların takibi ve tedavi süreci...', value: '29' },
  { title: 'İnme belirtilerini biliyor musun?', value: '20' },
  { title: 'Lösemi ve lenfomalar...', value: '7' },
  { title: 'Diğer öne çıkan içerikler', value: '4' },
  { title: 'Diğer öne çıkan içerikler', value: '4' },
];

const AUGUST_YT_TOP = [
  { title: 'Şah Damarı Ultrasonu: İnme/Felç Riskini Gösterir...', value: '111.316' },
  { title: 'MS ve Bağırsak İlişkisi: Yeni Bulgular ve Araştırmalar...', value: '32.141' },
  { title: 'Doğum Korkusunu Azaltan Yöntem: Suda Doğum', value: '25.336' },
  { title: 'Happ Health Online Sağlık Platformu', value: '20.571' },
  { title: 'Kalp İçin 5 Saniyelik Alışkanlıklar', value: '5.702' },
];

const AUGUST_YT_TRAFFIC = [
  { source: 'YouTube Ads',       views: '192.787', share: '93,1%' },
  { source: 'YouTube Search',    views: '7.497',   share: '3,6%' },
  { source: 'Shorts Feed',       views: '4.095',   share: '2,0%' },
  { source: 'External',          views: '1.094',   share: '0,5%' },
  { source: 'Browse Features',   views: '914',     share: '0,4%' },
  { source: 'Suggested Videos',  views: '388',     share: '0,2%' },
  { source: 'Other',             views: '473',     share: '0,2%' },
];

// ============ JUNE DATA (placeholder — same as original July rendering) ============
// The June tab shows the original data that was previously rendered as the only view.
// Since the original component only had July data, June shows the same baseline.

function JuneContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-0.5">Social Media Performance</h2>
        <p className="text-xs text-gray-400">Haziran 2026 — Platform bazlı görünürlük, etkileşim ve büyüme · Önceki dönemle karşılaştırmalı</p>
      </div>
      <p className="text-sm text-gray-400">Haziran 2026 verileri önceki rapor döneminden alınmıştır. Detaylı kırılım için Temmuz veya Ağustos sekmesini inceleyebilirsiniz.</p>
    </div>
  );
}

// ============ JULY CONTENT (original data preserved) ============

function JulyContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-0.5">Social Media Performance</h2>
        <p className="text-xs text-gray-400">Temmuz 2026 — Platform bazlı görünürlük, etkileşim ve büyüme · Önceki dönemle karşılaştırmalı</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard label="Instagram Görüntüleme" value="407,8 B" change="-%27,5" changeType="down" icon={<Instagram size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="Instagram Takipçi" value="18.156" change="+82 yeni" changeType="up" icon={<Users size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="TikTok Gönderi İzlenme" value="36,7K" change="-%72,5" changeType="down" icon={<Play size={17} />} iconBg="bg-gray-100" iconColor="text-gray-700" />
        <KPICard label="TikTok Net Takipçi" value="+16" change="-%83,7" changeType="down" icon={<TrendingUp size={17} />} iconBg="bg-emerald-50" iconColor="text-emerald-500" />
        <KPICard label="YouTube Views" value="166,9B" change="↓ önceki döneme göre" changeType="down" icon={<Youtube size={17} />} iconBg="bg-red-50" iconColor="text-red-500" />
        <KPICard label="YouTube Watch Time" value="788,5 sa" icon={<Clock size={17} />} iconBg="bg-orange-50" iconColor="text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Instagram */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 bg-rose-50/60">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-100">
              <span className="text-rose-600"><Instagram size={17} /></span>
            </div>
            <h3 className="font-bold text-base text-rose-700">Instagram</h3>
          </div>
          <div className="px-5 pt-1 pb-2 flex-1">
            <StatRow label="Görüntülemeler" value="407.803" change="-%27,5" changeType="down" icon={<Eye size={13} />} />
            <StatRow label="Erişim" value="243.700" change="-%21,9" changeType="down" icon={<Users size={13} />} />
            <StatRow label="İçerik etkileşimleri" value="1,1K" changeType="down" change="-%30,2" icon={<ThumbsUp size={13} />} />
            <StatRow label="Yeni Takipçi" value="+82" changeType="up" icon={<TrendingUp size={13} />} />
            <StatRow label="Toplam Takipçi" value="18.156" icon={<Users size={13} />} />
            <StatRow label="İçerik" value="5 Post / 23 Story / 6 Reels" icon={<Eye size={13} />} />
          </div>
          <div className="mx-5 mb-3 rounded-xl border border-rose-100 overflow-hidden">
            <div className="bg-rose-50 px-3 py-2">
              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Görüntüleme Kırılımı · 1 Temmuz – 1 Ağustos 2026</p>
            </div>
            <div className="divide-y divide-gray-50">
              <div className="flex items-center justify-between px-3 py-2.5 gap-3">
                <span className="text-xs text-gray-500">Toplam</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-gray-800">407.803</span>
                  <span className="text-[9px] font-semibold text-red-500">-%27,5</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 gap-3">
                <span className="text-xs text-gray-500">Organikten</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-gray-800">35.126</span>
                  <span className="text-[9px] font-semibold text-red-500">-%54,9</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 gap-3">
                <span className="text-xs text-gray-500">Reklamlardan</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-gray-800">372.677</span>
                  <span className="text-[9px] font-semibold text-red-500">-%23,1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5 mb-3 rounded-xl border border-rose-100 overflow-hidden">
            <div className="bg-rose-50 px-3 py-2">
              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Temmuz Top İçerikler</p>
            </div>
            <div className="px-3 py-2.5 flex flex-col gap-1.5">
              <p className="text-[9px] font-bold text-rose-400 uppercase tracking-wider mb-0.5">En Yüksek Erişim</p>
              {[
                'Gözlerimiz, yaşam kalitemizi doğrudan...',
                'Gün içinde ruh halimizi ve enerjim...',
                'Evde Sağlık Hizmetleri kapınıza...',
                'Happ Health\'te tamamladığınız...',
                'Yarının iş dünyasına hazır mısınız?',
              ].map((title, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[9px] font-bold text-rose-400 w-3 shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-[11px] text-gray-600 leading-snug">{title}</span>
                </div>
              ))}
              <p className="text-[10px] text-gray-400 leading-relaxed pt-1 border-t border-rose-50 mt-1">
                Temmuz'da sağlık farkındalığı ve eğitici Reels içerikleri performansta öne çıktı. Özellikle göz sağlığı ve inme belirtileri içerikleri görüntüleme, beğeni ve kaydetme tarafında ayın en güçlü içerikleri oldu.
              </p>
            </div>
          </div>
          <div className="mx-5 mb-5 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] text-blue-700 leading-relaxed">Instagram tarafında Temmuz ayında 243,7K erişim ve 407.803 görüntüleme elde edildi. Toplam takipçi sayısı 18.156'ya yükselirken, ay boyunca 5 post, 23 story ve 6 reels paylaşıldı.</p>
              <p className="text-[11px] text-blue-600 leading-relaxed">Instagram detay verilerinde toplam görüntüleme 407.803 seviyesinde gerçekleşti. Görüntülemelerin 35.126'sı organik, 372.677'si reklam kaynaklıdır. Profil ziyaretleri 4.590 olurken biyografi bağlantısına dokunmalar 31 olarak gerçekleşmiştir. Temmuz ayında Instagram etkileşimlerinin ana kaynağı Reels oldu; 406 etkileşimle Reels formatı post ve story performansının belirgin şekilde üzerinde kaldı.</p>
            </div>
          </div>
        </div>

        <PlatformBlock
          title="TikTok"
          platformIcon={<Play size={17} />}
          headerBg="bg-gray-50"
          headerText="text-gray-700"
          badgeBg="bg-gray-200"
          badgeText="text-gray-700"
          stats={[
            { label: 'Gönderi izlenme sayısı', value: '36,7K',  changeType: 'down', change: '-%72,5', icon: <Play size={13} /> },
            { label: 'Profil görüntülemeleri', value: '104',    changeType: 'down', change: '-%66,0', icon: <Eye size={13} /> },
            { label: 'Beğeniler',              value: '204',    changeType: 'down', change: '-%82,0', icon: <ThumbsUp size={13} /> },
            { label: 'Yorumlar',               value: '16',     changeType: 'up',   change: '+%128,6', icon: <MessageCircle size={13} /> },
            { label: 'Paylaşımlar',            value: '50',     changeType: 'down', change: '-%90,5', icon: <Share2 size={13} /> },
            { label: 'Toplam izleyici',        value: '25,9K',  changeType: 'down', change: '-%84,3', icon: <Eye size={13} /> },
            { label: 'Yeni izleyiciler',       value: '16,7K',  changeType: 'down', change: '-%88,7', icon: <TrendingUp size={13} /> },
            { label: 'Toplam takipçi',         value: '1.731',  icon: <Users size={13} /> },
            { label: 'Net takipçi',            value: '+16',    changeType: 'down', change: '-%83,7', icon: <TrendingUp size={13} /> },
          ]}
          insight="Temmuz döneminde TikTok'ta görünürlük ve etkileşim hacmi Haziran'daki güçlü sıçramanın ardından belirgin şekilde normalleşti. Video görüntülemeleri %72,5 ve yeni izleyici hacmi %88,7 gerilerken, yorum sayısının %128,6 artması daha küçük ancak etkileşime açık bir kullanıcı kitlesine işaret etti."
        />

        {/* YouTube */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 bg-red-50/60">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-100">
              <span className="text-red-600"><Youtube size={17} /></span>
            </div>
            <h3 className="font-bold text-base text-red-700">YouTube</h3>
          </div>
          <div className="px-5 pt-1 pb-2">
            <StatRow label="Görüntülemeler" value="166.900" changeType="down" change="↓ önceki döneme göre" icon={<Eye size={13} />} />
            <StatRow label="İzlenme süresi" value="788,5 saat" icon={<Clock size={13} />} />
            <StatRow label="Aboneler" value="−80" changeType="down" icon={<TrendingDown size={13} />} />
            <StatRow label="Toplam abone" value="33.344" icon={<Users size={13} />} />
          </div>
          <div className="mx-5 mb-3 rounded-xl border border-red-100 overflow-hidden">
            <div className="bg-red-50 px-3 py-2">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Temmuz Ayı Top Content</p>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { title: 'Şah Damarı Ultrasonu: İnme/Felç Riskini Gösterir mi?', duration: '0:40', views: '53.973' },
                { title: 'Happ Health Online Sağlık Platformu', duration: '1:04', views: '27.362' },
                { title: 'Evde Sağlık Hizmetleri! Happ Sağlık nedir?', duration: '0:23', views: '23.649' },
                { title: 'Doğum Korkusunu Azaltan Yöntem: Suda Doğum', duration: '0:39', views: '17.191' },
                { title: 'Happ Sağlık Evde Doktor Hizmeti ile Sizlerle!', duration: '0:56', views: '11.396' },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between px-3 py-2 gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="text-[9px] font-bold text-red-400 w-3 shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-[11px] text-gray-600 leading-snug truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-gray-400 tabular-nums">{item.duration}</span>
                    <span className="text-[11px] font-semibold text-gray-800 tabular-nums">{item.views}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 bg-gray-50 border-t border-red-50">
              <p className="text-[10px] text-gray-400 leading-relaxed">Temmuz ayında YouTube'da en güçlü performans sağlık odaklı evergreen içeriklerden geldi. Görüntülenmelerin %92,1'i YouTube Ads (136.610), %3,9'u YouTube Search (5.850), %2,7'si Shorts Feed (3.958) kaynaklıdır. Trafiğin büyük bölümü reklam destekli olduğu için içerik görünürlüğü paid katkıyla birlikte okunmalıdır.</p>
            </div>
          </div>
          <div className="mx-5 mb-5 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] text-blue-700 leading-relaxed">YouTube tarafında Temmuz ayında 166,9 bin görüntüleme ve 788,5 saat izlenme süresi elde edildi. Abone tarafında ise -80 net değişim görüldü.</p>
              <p className="text-[11px] text-blue-600 leading-relaxed font-medium">Trafiğin %92,1'i YouTube reklamlarından gelmiştir. Reklam destekli görüntülenme oranı yüksektir; bu nedenle performans yalnızca organik görünürlük olarak değerştirilmemelidir.</p>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3 bg-blue-50/60 border-b border-blue-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-100">
            <span className="text-blue-700"><Linkedin size={17} /></span>
          </div>
          <h3 className="font-bold text-base text-blue-700">LinkedIn</h3>
          <span className="ml-auto text-[10px] font-semibold text-blue-500 bg-blue-100 px-2.5 py-0.5 rounded-full">Temmuz 2026</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-50">
          {[
            { label: 'Görüntüleme',    value: '710',   icon: <Eye size={13} /> },
            { label: 'Reaksiyonlar',   value: '17',    icon: <ThumbsUp size={13} /> },
            { label: 'Yeni Takipçi',   value: '+6',    icon: <TrendingUp size={13} /> },
            { label: 'Toplam Takipçi', value: '1.700', icon: <Users size={13} /> },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-4">
              <span className="text-blue-400">{stat.icon}</span>
              <p className="text-lg font-bold text-gray-800 tabular-nums">{stat.value}</p>
              <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mx-5 mb-5 mt-3 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] text-blue-700 leading-relaxed">LinkedIn tarafında Temmuz döneminde 710 görüntüleme ve 17 reaksiyon elde edildi. İçerik hacmi 4 gönderide kalırken toplam takipçi sayısı yaklaşık 1,7K seviyesinde korundu. Görüntüleme ve reaksiyon tarafında önceki döneme göre gerileme görüldü.</p>
        </div>
      </div>

      <div className="flex gap-3 items-start bg-slate-800 rounded-2xl px-5 py-4">
        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb size={15} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Ana İçgörü</p>
          <p className="text-sm text-white/90 leading-relaxed">
            Temmuz ayında sosyal medya performansında Haziran'daki güçlü hacmin ardından normalleşme görüldü. Instagram'da 407,8 bin görüntüleme ve +82 net takipçi elde edilirken, Reels ana etkileşim formatı olmaya devam etti. TikTok'ta görüntüleme ve yeni izleyici hacmi belirgin şekilde gerilerken belirli sağlık içerikleri güçlü performans üretmeye devam etti. YouTube'da 166,9 bin görüntüleme elde edildi ancak trafiğin %92,1'i reklam kaynaklıydı. LinkedIn tarafında ise hacim sınırlı kaldı.
          </p>
          <p className="text-xs text-white/60 leading-relaxed mt-1.5">
            Temmuz'un içerik performansında özellikle inme, göz sağlığı ve diğer eğitici sağlık konuları öne çıktı; bu durum sağlık farkındalığı odaklı kısa video formatlarının kanal bazında çalışmaya devam ettiğini gösteriyor.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ AUGUST CONTENT ============

function AugustContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-0.5">Social Media Performance</h2>
        <p className="text-xs text-gray-400">Ağustos 2026 — Platform bazlı görünürlük, etkileşim ve büyüme · Temmuz ile karşılaştırmalı</p>
      </div>

      {/* Follower Summary */}
      <FollowerSummaryCard
        rows={AUGUST_FOLLOWERS}
        summary="Ağustos ayında takipçi büyümesinde Instagram ve TikTok öne çıktı. Instagram ay sonu takipçi sayısı %4,3 artarak 18.935'e, TikTok ise %4,9 artarak 1.815'e ulaştı. YouTube abone sayısı sınırlı gerilerken LinkedIn ve X büyük ölçüde stabil kaldı."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard label="Instagram Görüntüleme" value="604,6 B" change="+%48,3" changeType="up" icon={<Instagram size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="Instagram Net Takipçi" value="+504" change="+%4,3" changeType="up" icon={<Users size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="TikTok Gönderi İzlenme" value="135,7K" change="+%269,8" changeType="up" icon={<Play size={17} />} iconBg="bg-gray-100" iconColor="text-gray-700" />
        <KPICard label="TikTok Net Takipçi" value="+98" change="+%512,5" changeType="up" icon={<TrendingUp size={17} />} iconBg="bg-emerald-50" iconColor="text-emerald-500" />
        <KPICard label="YouTube Views" value="207,2B" change="+%24,1" changeType="up" icon={<Youtube size={17} />} iconBg="bg-red-50" iconColor="text-red-500" />
        <KPICard label="YouTube Watch Time" value="878,8 sa" change="+%11,5" changeType="up" icon={<Clock size={17} />} iconBg="bg-orange-50" iconColor="text-orange-500" />
      </div>

      {/* Platform Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Instagram — custom block */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 bg-rose-50/60">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-100">
              <span className="text-rose-600"><Instagram size={17} /></span>
            </div>
            <h3 className="font-bold text-base text-rose-700">Instagram</h3>
            <span className="ml-auto text-[10px] font-semibold text-rose-500 bg-rose-100 px-2.5 py-0.5 rounded-full">1–31 Ağustos</span>
          </div>
          <div className="px-5 pt-1 pb-2 flex-1">
            <StatRow label="Görüntülemeler" value="604.620" change="+%48,3" changeType="up" icon={<Eye size={13} />} />
            <StatRow label="Erişim" value="~249K" change="+%2,2" changeType="up" icon={<Users size={13} />} />
            <StatRow label="İçerik etkileşimleri" value="~1,6K" change="+%45,5" changeType="up" icon={<ThumbsUp size={13} />} />
            <StatRow label="Profil ziyaretleri" value="4.221" change="-%8,0" changeType="down" icon={<Users size={13} />} />
            <StatRow label="Bio link tıklamaları" value="64" change="+%106,5" changeType="up" icon={<TrendingUp size={13} />} />
            <StatRow label="Net Takipçi" value="+504" changeType="up" icon={<TrendingUp size={13} />} />
            <StatRow label="Toplam Takipçi" value="18.935" icon={<Users size={13} />} />
            <StatRow label="İçerik" value="12 Post / 46 Story / 8 Reels" icon={<Eye size={13} />} />
          </div>

          {/* Top Content */}
          <TopContentTable title="Ağustos · En Yüksek Görüntülenme" items={AUGUST_IG_TOP_VIEWS} />
          <TopContentTable title="Ağustos · En Yüksek Beğeni" items={AUGUST_IG_TOP_LIKES} />
          <TopContentTable title="Ağustos · En Yüksek Kaydetme" items={AUGUST_IG_TOP_SAVES} />

          <InsightBox>
            <p className="text-[11px] text-blue-700 leading-relaxed">Ağustos'ta Instagram görüntüleme hacmi Temmuz'a göre %48,3 büyürken içerik etkileşimleri de yaklaşık %45 arttı. İçerik üretim hacmindeki artış büyümeyi destekledi; özellikle Reels ve spesifik sağlık konuları öne çıktı. Miyom, prostat ve inme belirtileri içerikleri görüntüleme, beğeni ve kaydetme performansında güçlü sonuçlar üretti.</p>
            <p className="text-[11px] text-blue-600 leading-relaxed">Profil ziyaretleri %8 gerilemesine rağmen bio link tıklamalarının 31'den 64'e çıkması, profil sonrası aksiyon kalitesinde olumlu bir sinyal oluşturdu.</p>
          </InsightBox>
        </div>

        {/* TikTok */}
        <PlatformBlock
          title="TikTok"
          platformIcon={<Play size={17} />}
          headerBg="bg-gray-50"
          headerText="text-gray-700"
          badgeBg="bg-gray-200"
          badgeText="text-gray-700"
          stats={[
            { label: 'Gönderi izlenme sayısı', value: '135,7K',  changeType: 'up',   change: '+%269,8', icon: <Play size={13} /> },
            { label: 'Profil görüntülemeleri', value: '335',     changeType: 'up',   change: '+%222,1', icon: <Eye size={13} /> },
            { label: 'Beğeniler',              value: '696',     changeType: 'up',   change: '+%241,2', icon: <ThumbsUp size={13} /> },
            { label: 'Yorumlar',               value: '26',      changeType: 'up',   change: '+%62,5',  icon: <MessageCircle size={13} /> },
            { label: 'Paylaşımlar',            value: '102',     changeType: 'up',   change: '+%104',   icon: <Share2 size={13} /> },
            { label: 'Toplam izleyici',        value: '101,1K',  changeType: 'up',   change: '+%290,3', icon: <Eye size={13} /> },
            { label: 'Yeni izleyiciler',       value: '89,7K',   changeType: 'up',   change: '+%437,1', icon: <TrendingUp size={13} /> },
            { label: 'Toplam takipçi',         value: '1.815',   icon: <Users size={13} /> },
            { label: 'Net takipçi',            value: '+98',     changeType: 'up',   change: '+%512,5', icon: <TrendingUp size={13} /> },
          ]}
          insight={
            <>
              <p className="text-[11px] text-blue-700 leading-relaxed">TikTok Ağustos'ta Temmuz'daki düşüşün ardından güçlü şekilde toparlandı. Video görüntülemeleri yaklaşık 3,7 katına çıkarken total viewer ve new viewer hacmi de belirgin şekilde büyüdü. Miyom ve inme belirtileri gibi net sağlık konuları en yüksek görüntüleme üreten içerikler arasında yer aldı.</p>
              <p className="text-[11px] text-blue-600 leading-relaxed">Bu sonuç, TikTok'ta genel sağlık iletişiminden çok tek bir belirti / hastalık / merak konusu etrafında kurulan güçlü hook'lu videoların daha iyi çalıştığını gösteriyor.</p>
            </>
          }
        />

        {/* YouTube — custom block */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 bg-red-50/60">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-100">
              <span className="text-red-600"><Youtube size={17} /></span>
            </div>
            <h3 className="font-bold text-base text-red-700">YouTube</h3>
            <span className="ml-auto text-[10px] font-semibold text-red-500 bg-red-100 px-2.5 py-0.5 rounded-full">Ağustos 2026</span>
          </div>
          <div className="px-5 pt-1 pb-2">
            <StatRow label="Görüntülemeler" value="207.161" changeType="up" change="+%24,1" icon={<Eye size={13} />} />
            <StatRow label="İzlenme süresi" value="878,8 saat" change="+%11,5" changeType="up" icon={<Clock size={13} />} />
            <StatRow label="Abone değişimi" value="−72" changeType="down" icon={<TrendingDown size={13} />} />
            <StatRow label="Toplam abone" value="33.260" icon={<Users size={13} />} />
          </div>

          {/* Traffic Sources */}
          <div className="mx-5 mb-3 rounded-xl border border-red-100 overflow-hidden">
            <div className="bg-red-50 px-3 py-2">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Trafik Kaynakları · Ağustos 2026</p>
            </div>
            <div className="divide-y divide-gray-50">
              {AUGUST_YT_TRAFFIC.map(t => (
                <div key={t.source} className="flex items-center justify-between px-3 py-2.5 gap-3">
                  <span className="text-xs text-gray-500">{t.source}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-gray-800 tabular-nums">{t.views}</span>
                    <span className="text-[9px] font-semibold text-gray-400 tabular-nums">{t.share}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 bg-gray-50 border-t border-red-50">
              <p className="text-[10px] text-gray-400 leading-relaxed">YouTube görüntülemelerinin %93,1'i reklam kaynaklı. Toplam view artışı bu nedenle organik büyüme olarak yorumlanmamalıdır.</p>
            </div>
          </div>

          {/* Top Content */}
          <div className="mx-5 mb-3 rounded-xl border border-red-100 overflow-hidden">
            <div className="bg-red-50 px-3 py-2">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Ağustos Ayı Top Content</p>
            </div>
            <div className="divide-y divide-gray-50">
              {AUGUST_YT_TOP.map((item, i) => (
                <div key={i} className="flex items-start justify-between px-3 py-2 gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="text-[9px] font-bold text-red-400 w-3 shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-[11px] text-gray-600 leading-snug truncate">{item.title}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-800 tabular-nums shrink-0">{item.views}</span>
                </div>
              ))}
            </div>
          </div>

          <InsightBox>
            <p className="text-[11px] text-blue-700 leading-relaxed">YouTube'da görüntüleme %24 ve watch time %11,5 artmasına rağmen trafik yapısı yüksek oranda reklam bağımlı kalmaya devam etti. Ağustos görüntülemelerinin %93,1'i YouTube Ads kaynaklıydı. Search ve returning-viewer odaklı organik formatların geliştirilmesi ana büyüme fırsatı olarak öne çıkıyor.</p>
          </InsightBox>
        </div>
      </div>

      {/* LinkedIn + X row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3 bg-blue-50/60 border-b border-blue-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-100">
              <span className="text-blue-700"><Linkedin size={17} /></span>
            </div>
            <h3 className="font-bold text-base text-blue-700">LinkedIn</h3>
            <span className="ml-auto text-[10px] font-semibold text-blue-500 bg-blue-100 px-2.5 py-0.5 rounded-full">03.08 – 01.09</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-50">
            {[
              { label: 'Görüntüleme',    value: '399',   icon: <Eye size={13} />,       change: '-%43,8', changeType: 'down' as const },
              { label: 'Reaksiyonlar',   value: '9',     icon: <ThumbsUp size={13} />,  change: '-%47,1', changeType: 'down' as const },
              { label: 'Yeni Takipçi',   value: '+4',    icon: <TrendingUp size={13} />,change: '-%33,3', changeType: 'down' as const },
              { label: 'Toplam Takipçi', value: '1.704', icon: <Users size={13} />,     change: '+%0,2',  changeType: 'up' as const },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-4">
                <span className="text-blue-400">{stat.icon}</span>
                <p className="text-lg font-bold text-gray-800 tabular-nums">{stat.value}</p>
                <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
                <span className={`inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                  stat.changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                }`}>
                  {stat.changeType === 'up' && <TrendingUp size={8} />}
                  {stat.changeType === 'down' && <TrendingDown size={8} />}
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
          <div className="mx-5 mb-5 mt-3 flex gap-2.5 items-start bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <Lightbulb size={13} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-blue-700 leading-relaxed">LinkedIn'de takipçi tabanı stabil kalırken içerik görüntüleme ve reaksiyon hacmi Temmuz'a göre geriledi. Kanalın yalnızca sağlık bilgilendirme içerikleriyle değil; iş hayatı, çalışan deneyimi, yöneticilik, stres ve iş-yaşam ilişkisi gibi profesyonel yaşam konularıyla yeniden konumlandırılması öneriliyor.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3 bg-gray-50 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-200">
              <span className="text-gray-700"><Send size={17} /></span>
            </div>
            <h3 className="font-bold text-base text-gray-700">X / Twitter</h3>
            <span className="ml-auto text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">Ağustos 2026</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-50">
            {[
              { label: 'Takipçi', value: '22', icon: <Users size={13} /> },
              { label: 'Değişim', value: '0',  icon: <TrendingUp size={13} /> },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-6">
                <span className="text-gray-400">{stat.icon}</span>
                <p className="text-lg font-bold text-gray-800 tabular-nums">{stat.value}</p>
                <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mx-5 mb-5 mt-3 flex gap-2.5 items-start bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <Lightbulb size={13} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-[11px] text-gray-500 leading-relaxed">X / Twitter kanalında Ağustos döneminde takipçi sayısı 22 seviyesinde stabil kaldı. Etkileşim metriği kaynak raporda yer almamaktadır.</p>
          </div>
        </div>
      </div>

      {/* Cross-Channel Summary */}
      <div className="flex gap-3 items-start bg-slate-800 rounded-2xl px-5 py-4">
        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb size={15} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Yönetim Özeti</p>
          <p className="text-sm text-white/90 leading-relaxed">
            Ağustos ayında sosyal medya performansında Instagram ve TikTok büyümenin ana sürücüleri oldu. Instagram görüntülemeleri %48 artarken TikTok video görüntülemeleri yaklaşık %270 yükseldi. Spesifik sağlık konuları — özellikle miyom, prostat ve inme belirtileri — platformlar arasında en güçlü içerik temaları olarak öne çıktı. YouTube görüntüleme hacmi yükselse de performansın %93,1'i reklam kaynaklı kalırken, LinkedIn'de içerik etkileşimi geriledi.
          </p>
          <p className="text-xs text-white/60 leading-relaxed mt-1.5">
            Ağustos verisi, kısa ve tek konuya odaklanan Reels / TikTok formatlarının, kaydedilebilir sağlık içeriklerinin ve search-intent taşıyan YouTube içeriklerinin sonraki dönemde önceliklendirilmesi gerektiğini gösteriyor.
          </p>
        </div>
      </div>

      {/* August Learnings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={15} className="text-amber-500" />
          <h3 className="text-sm font-bold text-gray-800">Ağustos Öğrenimleri</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Spesifik sağlık konuları daha güçlü çalışıyor', desc: 'Miyom, prostat ve inme belirtileri gibi net başlıklar kullanıcıların ilgisini genel sağlık konularından daha fazla çekiyor.' },
            { title: 'Reels / kısa video büyümenin ana formatlarından biri', desc: 'Kısa, hızlı tüketilen ve tek bir sağlık sorusuna odaklanan içerikler performansta öne çıkıyor.' },
            { title: 'Kaydedilebilir içerik değer yaratıyor', desc: 'Kullanıcı yalnızca izlemek değil, ihtiyaç duyduğunda geri dönmek isteyeceği pratik sağlık içeriklerini tercih ediyor.' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <p className="text-xs font-bold text-gray-700 leading-tight">{item.title}</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Period Strategy */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Sonraki Dönem İçerik Stratejisi</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StrategyCard
            platform="Instagram"
            icon={<Instagram size={15} />}
            iconBg="bg-rose-100"
            iconColor="text-rose-600"
            sections={[
              { title: 'Pozisyonlama', items: ['Bilgi veren değil, kaydettiren sağlık içeriği.'] },
              { title: 'İçerik Serileri', items: [
                'Bu belirtiyi hafife alma...',
                'Normal sandığımız ama...',
                'X hakkında doğru bildiğimiz yanlışlar',
                'Ne zaman doktora gitmelisin?',
                '30 saniyede sağlık bilgisi',
              ]},
              { title: 'Ana KPI\'lar', items: ['Save', 'Share'] },
            ]}
          />
          <StrategyCard
            platform="TikTok"
            icon={<Play size={15} />}
            iconBg="bg-gray-200"
            iconColor="text-gray-700"
            sections={[
              { title: 'Pozisyonlama', items: ['Sağlık konuşulur hale gelmeli.'] },
              { title: 'Format', items: [
                'İlk 2 saniyede güçlü hook',
                'Tek videoda tek ana mesaj',
                'Yorumlardan yeni içerik üretme',
                'Trendleri sağlık iletişimine uyarlama',
              ]},
              { title: 'İçerik Serileri', items: [
                'Bunu yaşıyorsan normal sanma',
                'Çoğu kişinin bildiği bu bilgi aslında yanlış',
                'Bu belirtiyi çoğu kişi stres sanıyor',
                'Google\'a yazmadan önce bunu bil',
              ]},
              { title: 'Odak', items: ['Discovery', 'Comments / conversation'] },
            ]}
          />
          <StrategyCard
            platform="YouTube"
            icon={<Youtube size={15} />}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            sections={[
              { title: 'A — Search', items: ['"X nedir?"', '"X nasıl yapılır?"', '"X belirtileri"'] },
              { title: 'B — Discovery', items: ['Curiosity-driven topic + thumbnail kombinasyonları'] },
              { title: 'C — Series / Returning', items: ['Geri dönüş yaratan tekrarlanan formatlar'] },
              { title: 'Ölçüm', items: ['4–8 hafta sonunda views, subscriber growth ve returning viewer karşılaştırması'] },
            ]}
          />
          <StrategyCard
            platform="LinkedIn"
            icon={<Linkedin size={15} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-700"
            sections={[
              { title: 'Pozisyonlama', items: ['Profesyonel hayat ve çalışan deneyimi.'] },
              { title: 'Odak Konular', items: [
                'İş hayatı, çalışan deneyimi, yöneticilik',
                'Tükenmişlik, stres, performans',
                'İş-yaşam ilişkisi, kurum kültürü',
              ]},
              { title: 'Formatlar', items: ['LinkedIn Poll', 'Carousel', 'Monthly Insight Post'] },
            ]}
          />
        </div>
      </div>

      {/* Methodology Note */}
      <div className="flex gap-2.5 items-start bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mt-0.5">Yöntem</span>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Platformların raporlama periyotları kaynak panellerine göre farklılık gösterebilir. Instagram verileri 1–31 Ağustos dönemini, TikTok ve YouTube bazı metriklerde son 28 günlük platform görünümünü, LinkedIn ise 03.08–01.09 dönemini yansıtmaktadır. MoM karşılaştırmalar bu dönem farklılıkları dikkate alınarak yön gösterici olarak değerlendirilmelidir.
        </p>
      </div>
    </div>
  );
}


const SEPTEMBER_FOLLOWERS = [
  { platform: 'Instagram', icon: <Instagram size={14} />, iconBg: 'bg-rose-100', iconColor: 'text-rose-600', previous: '18.935', current: '19.653', change: '+718 / +%3,8', changeType: 'up' as const },
  { platform: 'YouTube', icon: <Youtube size={14} />, iconBg: 'bg-red-100', iconColor: 'text-red-600', previous: '33.260', current: '33.225', change: '-35 / -%0,1', changeType: 'down' as const },
  { platform: 'LinkedIn', icon: <Linkedin size={14} />, iconBg: 'bg-blue-100', iconColor: 'text-blue-700', previous: '1.704', current: '1.715', change: '+11 / +%0,6', changeType: 'up' as const },
  { platform: 'TikTok', icon: <Play size={14} />, iconBg: 'bg-gray-200', iconColor: 'text-gray-700', previous: '1.815', current: '1.852', change: '+37 / +%2,0', changeType: 'up' as const },
  { platform: 'X / Twitter', icon: <Send size={14} />, iconBg: 'bg-gray-200', iconColor: 'text-gray-700', previous: '—', current: '—', change: '—', changeType: 'neutral' as const },
];

const OCTOBER_FOLLOWERS = [
  { platform: 'Instagram', icon: <Instagram size={14} />, iconBg: 'bg-rose-100', iconColor: 'text-rose-600', previous: '19.653', current: '21.056', change: '+1.403 / +%7,1', changeType: 'up' as const },
  { platform: 'YouTube', icon: <Youtube size={14} />, iconBg: 'bg-red-100', iconColor: 'text-red-600', previous: '33.225', current: '33.198', change: '-27 / -%0,1', changeType: 'down' as const },
  { platform: 'LinkedIn', icon: <Linkedin size={14} />, iconBg: 'bg-blue-100', iconColor: 'text-blue-700', previous: '1.715', current: '1.732', change: '+17 / +%1,0', changeType: 'up' as const },
  { platform: 'TikTok', icon: <Play size={14} />, iconBg: 'bg-gray-200', iconColor: 'text-gray-700', previous: '1.852', current: '1.906', change: '+54 / +%2,9', changeType: 'up' as const },
  { platform: 'X / Twitter', icon: <Send size={14} />, iconBg: 'bg-gray-200', iconColor: 'text-gray-700', previous: '—', current: '—', change: '—', changeType: 'neutral' as const },
];

function SeptemberInstagramBlock() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="px-5 py-4 flex items-center gap-3 bg-rose-50/60">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-100"><span className="text-rose-600"><Instagram size={17} /></span></div>
        <h3 className="font-bold text-base text-rose-700">Instagram</h3>
        <span className="ml-auto text-[10px] font-semibold text-rose-500 bg-rose-100 px-2.5 py-0.5 rounded-full">1–30 Eylül</span>
      </div>
      <div className="px-5 pt-1 pb-2">
        <StatRow label="Meta Total Views" value="877.028" icon={<Eye size={13} />} />
        <StatRow label="Instagram Views" value="861.344" icon={<Instagram size={13} />} />
        <StatRow label="Facebook Views" value="15.685" icon={<Eye size={13} />} />
        <StatRow label="Reach" value="348,1K" change="+%54,4" changeType="up" icon={<Users size={13} />} />
        <StatRow label="Content Interactions" value="3K" change="+%109" changeType="up" icon={<ThumbsUp size={13} />} />
        <StatRow label="Insights Net Followers" value="+833" changeType="up" icon={<TrendingUp size={13} />} />
        <StatRow label="Profile Visits" value="3.534" icon={<Users size={13} />} />
        <StatRow label="Bio Link Taps" value="71" icon={<TrendingUp size={13} />} />
        <StatRow label="Content" value="7 Posts / 43 Stories / 9 Reels" icon={<Eye size={13} />} />
      </div>
      <div className="mx-5 mb-3 rounded-xl border border-rose-100 overflow-hidden">
        <div className="bg-rose-50 px-3 py-2"><p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Views · Organic / Paid</p></div>
        <div className="px-3 py-2.5 flex flex-col gap-1.5">
          <StatRow label="Toplam Instagram Views" value="861.344" />
          <StatRow label="Organic Views" value="86.262" change="-%18,6" changeType="down" />
          <StatRow label="Paid / Ad Views" value="775.082" change="+%80,8" changeType="up" />
        </div>
      </div>
      <TopContentTable title="Eylül Top Content · Reach / Views / Engagement" items={[
        { title: 'Yeni bir yayın dönemi başlıyor...', value: 'Reach 6.381 · Views 35.241 · Likes 286' },
        { title: 'Son dönemde kilo verme sürecin...', value: 'Views 17.887 · Likes 123 · Saves 89 (strongest save)' },
        { title: 'Rahim sarkması utanılacak bir durum...', value: 'Reach 469 · Views 9.290 · Likes 155 · Saves 7' },
        { title: 'Sonbahar, cildimizi yeniden değerlendirmenin...', value: 'Reach 278 · Views 8.165 · Likes 111' },
        { title: 'Okulların açılmasıyla birlikte...', value: 'Views 6.207 · Likes 108' },
      ]} />
      <InsightBox>
        <p className="text-[11px] text-blue-700 leading-relaxed">Eylül Instagram görünürlüğü ağırlıklı olarak reklam destekli büyüdü. Paid views 775K seviyesine ulaşırken organic views 86K seviyesinde kaldı; toplam performansı organik büyüme olarak okumamak gerekir.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Reels Eylül ayında da açık ara en güçlü engagement formatı oldu. Reels 1,4K, Posts 147, Stories 35, Live 0 interaction üretti. Format sıralaması: 1. Reels · 2. Posts · 3. Stories.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Eylül’de en yüksek hacmi yayın dönemi / gündem odaklı içerik üretirken, sağlık bilgi içeriklerinde özellikle kilo verme ve rahim sarkması konuları güçlü engagement sinyali verdi. ‘Son dönemde kilo verme sürecin...’ içeriğinin 89 save üretmesi, pratik ve yeniden başvurulabilir sağlık bilgisinin kaydetme davranışında güçlü çalıştığını gösteriyor.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Content production detail: 1 Podcast Video · 2 AI Videos · 7 Production Videos.</p>
      </InsightBox>
    </div>
  );
}

function SeptemberContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-0.5">Social Media Performance</h2>
        <p className="text-xs text-gray-400">Eylül 2026 — Platform bazlı görünürlük, etkileşim ve büyüme · Ağustos ile karşılaştırmalı</p>
      </div>

      <FollowerSummaryCard
        rows={SEPTEMBER_FOLLOWERS}
        previousLabel="Ağu"
        currentLabel="Eyl"
        summary="Eylül ayında takipçi büyümesinin ana sürücüsü Instagram oldu. Instagram takipçi tabanı 18.935’ten 19.653’e yükselerek yaklaşık %3,8 büyüdü. TikTok %2,0 ve LinkedIn %0,6 büyürken YouTube takipçi sayısı büyük ölçüde yatay kaldı."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard label="Instagram Reach" value="348,1K" change="+%54,4" changeType="up" icon={<Instagram size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="Instagram Interactions" value="3K" change="+%109" changeType="up" icon={<ThumbsUp size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="TikTok Views" value="95,8K" change="-%7,9" changeType="down" icon={<Play size={17} />} iconBg="bg-gray-100" iconColor="text-gray-700" />
        <KPICard label="YouTube Views" value="193,6K" icon={<Youtube size={17} />} iconBg="bg-red-50" iconColor="text-red-500" />
        <KPICard label="LinkedIn Impressions" value="1.146" change="+%162,8" changeType="up" icon={<Linkedin size={17} />} iconBg="bg-blue-50" iconColor="text-blue-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SeptemberInstagramBlock />
        <PlatformBlock
          title="TikTok"
          platformIcon={<Play size={17} />}
          headerBg="bg-gray-50"
          headerText="text-gray-700"
          badgeBg="bg-gray-200"
          badgeText="text-gray-700"
          stats={[
            { label: 'Video Views', value: '95,8K', change: '-%7,9', changeType: 'down', icon: <Play size={13} /> },
            { label: 'Profile Views', value: '179', change: '-%20,8', changeType: 'down', icon: <Eye size={13} /> },
            { label: 'Likes', value: '428', change: '-%8,0', changeType: 'down', icon: <ThumbsUp size={13} /> },
            { label: 'Comments', value: '12', change: '+%9,1', changeType: 'up', icon: <MessageCircle size={13} /> },
            { label: 'Shares', value: '59', change: '-%6,3', changeType: 'down', icon: <Share2 size={13} /> },
            { label: 'Total Followers', value: '1.852', icon: <Users size={13} /> },
            { label: 'Net Followers', value: '+37', change: '-7 / -%15,9', changeType: 'down', icon: <TrendingUp size={13} /> },
          ]}
          insight={<>
            <p className="text-[11px] text-blue-700 leading-relaxed">TikTok’ta Eylül ayının iki ana içerik kazananı Tansiyon ve Rahim Sarkması oldu. Tansiyon ~25K view, 171 like ve 25 yeni follower; Rahim Sarkması ~23K view, 106 like ve 27 yeni follower üretti. İçerikler hem view hem like hem de follower acquisition tarafında öne çıktı.</p>
            <p className="text-[11px] text-blue-600 leading-relaxed">Top views: 1. Tansiyon ~25K · 2. Rahim Sarkması ~23K · 3. Rota virüsü 2.518 · 4. Erken farkındalık 1.001 · 5. Miyomların takibi 659. Aktiflik: Pzt 00:00–01:00 · Sal 00:00–01:00 · Çar 21:00–22:00 · Per 00:00–01:00 · Cum 00:00–01:00 · Cmt 22:00–23:00 · Paz 20:00–21:00.</p>
          </>}
        />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 bg-red-50/60">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-100"><span className="text-red-600"><Youtube size={17} /></span></div>
            <h3 className="font-bold text-base text-red-700">YouTube</h3>
            <span className="ml-auto text-[10px] font-semibold text-red-500 bg-red-100 px-2.5 py-0.5 rounded-full">Eylül 2026</span>
          </div>
          <div className="px-5 pt-1 pb-2">
            <StatRow label="Views" value="193.551" icon={<Eye size={13} />} />
            <StatRow label="Watch Time" value="959,4 saat" icon={<Clock size={13} />} />
            <StatRow label="YouTube Analytics Subscriber Change" value="-42" changeType="down" icon={<TrendingDown size={13} />} />
            <StatRow label="Total Subscribers" value="33.225" icon={<Users size={13} />} />
            <StatRow label="Month-end difference" value="-35" changeType="down" icon={<TrendingDown size={13} />} />
          </div>
          <TopContentTable title="Eylül Top Videos" items={[
            { title: 'Doğurganlık, Gebelik ve Tüp Bebek', value: '15.214' },
            { title: 'Çocuğunuz Okula Hazır mı? Okul Öncesinde Bilme...', value: '13.591' },
            { title: 'Rahim Sarkması Sadece İleri Yaşlarda mı Görülür?', value: '4.244' },
            { title: 'Tip 1 Diyabette Pankreas Yeniden İnsülin Üretebilir...', value: '4.188' },
            { title: 'Şuruplar Ne Kadar Saklanır? Açılan İlacı Atmalı mı?', value: '1.935' },
          ]} />
          <InsightBox><p className="text-[11px] text-blue-700 leading-relaxed">YouTube’da Eylül ayında kadın sağlığı, çocuk sağlığı ve diyabet gibi uzmanlık / sağlık eğitimi odaklı uzun format içerikler öne çıktı. YouTube Analytics -42 subscriber ile ay sonu toplam farkı -35 birbirinden ayrı raporlama sinyalleridir.</p></InsightBox>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3 bg-blue-50/60 border-b border-blue-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-100"><span className="text-blue-700"><Linkedin size={17} /></span></div>
          <h3 className="font-bold text-base text-blue-700">LinkedIn</h3>
          <span className="ml-auto text-[10px] font-semibold text-blue-500 bg-blue-100 px-2.5 py-0.5 rounded-full">Son 30 gün</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-50">
          {[
            { label: 'Total Followers', value: '1.715', icon: <Users size={13} /> },
            { label: 'New Followers', value: '+14', change: '+%366,7', icon: <TrendingUp size={13} /> },
            { label: 'Impressions', value: '1.146', change: '+%162,8', icon: <Eye size={13} /> },
            { label: 'Reactions', value: '23', change: '+%109,1', icon: <ThumbsUp size={13} /> },
          ].map(stat => <div key={stat.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-4"><span className="text-blue-400">{stat.icon}</span><p className="text-lg font-bold text-gray-800 tabular-nums">{stat.value}</p><p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>{stat.change && <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>}</div>)}
        </div>
        <InsightBox>
          <p className="text-[11px] text-blue-700 leading-relaxed">Eylül LinkedIn iletişiminde yönetici / iş hayatı, menopoz ve sağlık farkındalığı içerikleri öne çıktı. İçerik temaları: yönetici olmak / güçlü görünmek, menopoz döneminde bilgi kirliliği, işhayatında eleştiri ve geri bildirim, sağlık hizmetlerinde geçmişten bugüne değişim ve beyinden beyine iletişim. Comments 0, Reposts 3.</p>
        </InsightBox>
      </div>

      <PlatformBlock title="X / Twitter" platformIcon={<Send size={17} />} headerBg="bg-gray-50" headerText="text-gray-700" badgeBg="bg-gray-200" badgeText="text-gray-700" stats={[{ label: 'Followers', value: '—', icon: <Users size={13} /> }, { label: 'Change', value: '—', icon: <TrendingUp size={13} /> }]} insight="Twitter / X için Eylül verisi sağlanmadı; değerler uydurulmadı." />

      <div className="flex gap-3 items-start bg-slate-800 rounded-2xl px-5 py-4">
        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"><Lightbulb size={15} className="text-white" /></div>
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Yönetim Özeti</p>
          <p className="text-sm text-white/90 leading-relaxed">Eylül’de sosyal medya büyümesinin ana sürücüsü Instagram oldu. Instagram takipçi tabanı yaklaşık %3,8 büyürken 877K toplam view ve +833 net follower elde edildi.</p>
          <p className="text-xs text-white/60 leading-relaxed mt-1.5">Instagram görünürlüğü ağırlıklı olarak paid dağıtımdan gelirken Reels engagement’ın ana formatı olmaya devam etti. Kilo verme içeriğinin 89 save üretmesi, pratik sağlık bilgisinin yüksek değerli engagement yarattığını gösterdi. TikTok’ta view, profil ziyareti ve like hacmi gerilerken Tansiyon ve Rahim Sarkması içerikleri güçlü içerik sinyalleri verdi. YouTube 193,6K view ve 959 saat watch time üretmesine rağmen subscriber tarafında kayıp yaşandı. LinkedIn ise düşük hacimde olsa da follower ve reaction tarafında büyüme gösterdi.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><Lightbulb size={15} className="text-amber-500" /><h3 className="text-sm font-bold text-gray-800">Eylülde Ne Çalıştı?</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {[
            ['1. REELS', 'Instagram engagement’ın açık ara ana formatı.'],
            ['2. PRACTICAL HEALTH INFORMATION', 'Kilo verme içeriği save davranışında güçlü.'],
            ["3. WOMEN'S HEALTH", 'Rahim Sarkması hem Instagram hem TikTok’ta çalıştı.'],
            ['4. BLOOD PRESSURE CONTENT', 'Tansiyon içeriği TikTok’ta view + like + follower acquisition üretti.'],
            ['5. EXPERT / EDUCATIONAL YOUTUBE', 'Kadın sağlığı, çocuk sağlığı ve diyabet içerikleri YouTube’da öne çıktı.'],
          ].map(([title, desc]) => <div key={title} className="rounded-xl border border-gray-100 p-3"><p className="text-[10px] font-bold text-gray-700 leading-tight">{title}</p><p className="text-[11px] text-gray-500 leading-relaxed mt-1.5">{desc}</p></div>)}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><TrendingUp size={15} className="text-blue-500" /><h3 className="text-sm font-bold text-gray-800">Sonraki Aksiyonlar</h3></div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[
            'Rahim Sarkması ve Tansiyon gibi platformlar arası çalışan sağlık bilgi konularını seri hale getir.',
            'Instagram’da save üreten pratik sağlık içeriklerini artır.',
            'Reels formatını ana engagement formatı olarak koru.',
            'Paid Instagram visibility yüksek olduğu için organic reach / views gelişimini ayrıca takip et.',
            'TikTok’ta follower acquisition üreten içeriklerin hook ve görsel dilini yeni sağlık konularına uygula.',
            'YouTube’da subscriber kaybını azaltmak için series structure, subscribe CTA ve related-video chaining test et.',
            'LinkedIn’de kurumsal sağlık + yönetici wellbeing + uzman görüşü içeriklerini artır.',
          ].map((action, i) => <li key={i} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span><span>{action}</span></li>)}
        </ol>
      </div>

      <div className="flex gap-2.5 items-start bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mt-0.5">Yöntem</span><p className="text-[10px] text-gray-400 leading-relaxed">Instagram: 1–30 Eylül. TikTok, YouTube ve LinkedIn platform raporlama dönemlerine göre farklılık gösterebilir. Follower-base change ile Instagram Insights net followers ve YouTube Analytics subscriber change ile ay sonu farkı ayrı sinyallerdir.</p></div>
    </div>
  );
}

function OctoberInstagramBlock() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="px-5 py-4 flex items-center gap-3 bg-rose-50/60">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-100"><span className="text-rose-600"><Instagram size={17} /></span></div>
        <h3 className="font-bold text-base text-rose-700">Instagram</h3>
        <span className="ml-auto text-[10px] font-semibold text-rose-500 bg-rose-100 px-2.5 py-0.5 rounded-full">1–31 Ekim</span>
      </div>
      <div className="px-5 pt-1 pb-2">
        <StatRow label="Total Meta Views" value="987.914" icon={<Eye size={13} />} />
        <StatRow label="Instagram Views" value="891.982" icon={<Instagram size={13} />} />
        <StatRow label="Facebook Views" value="95.933" icon={<Eye size={13} />} />
        <StatRow label="Reach" value="476,2K" change="+%34,5" changeType="up" icon={<Users size={13} />} />
        <StatRow label="Content Interactions" value="4,3K" change="+%42,4" changeType="up" icon={<ThumbsUp size={13} />} />
        <StatRow label="Insights Net Followers" value="+1.272" changeType="up" icon={<TrendingUp size={13} />} />
        <StatRow label="Profile Visits" value="5.762" icon={<Users size={13} />} />
        <StatRow label="Bio Link Taps" value="81" icon={<TrendingUp size={13} />} />
        <StatRow label="Content" value="5 Posts / 108 Stories / 11 Reels" icon={<Eye size={13} />} />
      </div>
      <div className="mx-5 mb-3 rounded-xl border border-rose-100 overflow-hidden">
        <div className="bg-rose-50 px-3 py-2"><p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Views · Organic / Paid</p></div>
        <div className="px-3 py-2.5 flex flex-col gap-1.5">
          <StatRow label="Toplam Instagram Views" value="891.982" />
          <StatRow label="Organik" value="343.982" change="+%292,4" changeType="up" />
          <StatRow label="From Ads" value="548.000" change="-%31,4" changeType="down" />
        </div>
      </div>
      <TopContentTable title="October Top Content · Hero + High Reach" items={[
        { title: 'October Hero Content · Böbrek sağlığını korumak için belirtileri doğru yorumlamak...', value: 'Reach 70.196 · Views 245.715 · Likes 843 · Saves 225' },
        { title: 'Meme kanseri yalnızca kadınları etkilemiyor...', value: 'Reach 22.026 · Views 24.376' },
        { title: '@drburakhazine ile Meme Sağlığı üzerine...', value: 'Reach 21.062 · Views 22.911' },
        { title: 'Gebelikte Meme Kanseri görülür mü?', value: 'Reach 20.176 · Views 22.678' },
        { title: 'Tansiyon ölçümünüzde çıkan tek bir değer...', value: 'Views 9.494 · Likes 240 · Saves 24' },
      ]} />
      <InsightBox>
        <p className="text-[11px] text-blue-700 leading-relaxed">Ekim’de Instagram görünürlüğünün yapısı belirgin biçimde değişti. Reklam kaynaklı görüntülemeler azalırken organik görüntülemeler güçlü şekilde arttı. Organic views +292,4% büyürken paid views -31,4% geriledi; bu değişim paid media’nın organik büyümeye neden olduğunu kanıtlamaz.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Reels açık ara en güçlü interaction formatı olmaya devam ediyor. Reels 2,3K, Stories 190, Posts 109, Live 0 interaction üretti. Format sıralaması: 1. Reels · 2. Stories · 3. Posts.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Böbrek sağlığı içeriği reach, views, likes and saves metriklerinin tamamında ayın açık ara en güçlü içeriği oldu. Medikal bilgi içeren kısa video içerikleri açık şekilde öne çıktı; içerik tek başına 245,7K görüntüleme, 843 reaksiyon ve 225 kaydetme üretti.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Meme sağlığı içeriklerinin birden fazla formatta 20K+ reach üretmesi, konu serisi yaklaşımının çalıştığını gösteriyor. Tansiyon içeriğinin 240 reaksiyon ve 24 save üretmesi, pratik sağlık bilgisinin kaydetme davranışı da ürettiğini gösteriyor.</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">Content production detail: 1 Motion Video · 3 AI Videos · 7 Production Videos. Follower base change: +1.403. Instagram Insights net followers: +1.272.</p>
      </InsightBox>
    </div>
  );
}

function OctoberContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-0.5">Social Media Performance</h2>
        <p className="text-xs text-gray-400">Ekim 2026 — Platform bazlı görünürlük, etkileşim ve büyüme · Raporlama dönemleri platforma göre farklıdır</p>
      </div>

      <FollowerSummaryCard
        rows={OCTOBER_FOLLOWERS}
        previousLabel="Eyl"
        currentLabel="Eki"
        summary="Ekim ayında takipçi büyümesinin ana sürücüsü Instagram oldu. Instagram takipçi tabanı 19.653’ten 21.056’ya yükselerek yaklaşık %7,1 büyüdü. TikTok %2,9, LinkedIn yaklaşık %1 büyürken YouTube takipçi sayısı yatay seyretti. Follower base change: +1.403. Instagram Insights net followers: +1.272."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard label="Instagram Reach" value="476,2K" change="+%34,5" changeType="up" icon={<Instagram size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="Instagram Interactions" value="4,3K" change="+%42,4" changeType="up" icon={<ThumbsUp size={17} />} iconBg="bg-rose-50" iconColor="text-rose-500" />
        <KPICard label="TikTok Views" value="112,8K" change="+%17,7" changeType="up" icon={<Play size={17} />} iconBg="bg-gray-100" iconColor="text-gray-700" />
        <KPICard label="YouTube Views" value="125.543" change="-%35,2" changeType="down" icon={<Youtube size={17} />} iconBg="bg-red-50" iconColor="text-red-500" />
        <KPICard label="LinkedIn Impressions" value="8.335" change="+%624,8" changeType="up" icon={<Linkedin size={17} />} iconBg="bg-blue-50" iconColor="text-blue-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <OctoberInstagramBlock />
        <PlatformBlock
          title="TikTok"
          platformIcon={<Play size={17} />}
          headerBg="bg-gray-50"
          headerText="text-gray-700"
          badgeBg="bg-gray-200"
          badgeText="text-gray-700"
          stats={[
            { label: 'Video Views', value: '112,8K', change: '+%17,7', changeType: 'up', icon: <Play size={13} /> },
            { label: 'Profile Views', value: '172', change: '-%3,9', changeType: 'down', icon: <Eye size={13} /> },
            { label: 'Likes', value: '446', change: '+%4,2', changeType: 'up', icon: <ThumbsUp size={13} /> },
            { label: 'Comments', value: '4', change: '-%66,7', changeType: 'down', icon: <MessageCircle size={13} /> },
            { label: 'Shares', value: '83', change: '+%40,7', changeType: 'up', icon: <Share2 size={13} /> },
            { label: 'Total Followers', value: '1.906', icon: <Users size={13} /> },
            { label: 'Net Followers', value: '+55', change: '+18 / +%48,6', changeType: 'up', icon: <TrendingUp size={13} /> },
          ]}
          insight={<> <p className="text-[11px] text-blue-700 leading-relaxed">Platform reporting period: 7 Oct – 3 Nov. TikTok’ta da Instagram ile aynı Böbrek Sağlığı içeriği açık ara en güçlü sonuçları üretti; yaklaşık 64K view, 311 like ve 66 yeni follower elde etti.</p><p className="text-[11px] text-blue-600 leading-relaxed">İkinci güçlü içerik “Tansiyon ölçümünüzde çıkan tek bir değer...” oldu: 6.142 view, 46 like ve 6 yeni follower. Aktiflik: Pzt 00:00–01:00 · Sal 00:00–01:00 · Çar 21:00–22:00 · Per 00:00–01:00 · Cum 00:00–01:00 · Cmt 22:00–23:00 · Paz 20:00–21:00.</p></>}
        />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 bg-red-50/60">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-100"><span className="text-red-600"><Youtube size={17} /></span></div>
            <h3 className="font-bold text-base text-red-700">YouTube</h3>
            <span className="ml-auto text-[10px] font-semibold text-red-500 bg-red-100 px-2.5 py-0.5 rounded-full">Ekim 2026</span>
          </div>
          <div className="px-5 pt-1 pb-2">
            <StatRow label="Views" value="125.543" icon={<Eye size={13} />} />
            <StatRow label="Watch Time" value="823,4 saat" icon={<Clock size={13} />} />
            <StatRow label="YouTube Analytics Subscriber Change" value="-32" changeType="down" icon={<TrendingDown size={13} />} />
            <StatRow label="Total Subscribers" value="33.198" icon={<Users size={13} />} />
            <StatRow label="Month-end difference" value="-27" changeType="down" icon={<TrendingDown size={13} />} />
          </div>
          <TopContentTable title="October Top Videos" items={[
            { title: 'Şah Damarı Ultrasonu: İnme/Felç Riskini Gösterir...', value: '34.401 · 0:48 · 66,0 sa' },
            { title: 'Doğum Korkusunu Azaltan Yöntem: Suda Doğum', value: '33.391 · 0:52 · 71,2 sa' },
            { title: 'MS ve Bağırsak İlişkisi: Yeni Bulgular ve Araştırmalar...', value: '8.797 · 1:00 · 28,8 sa' },
            { title: 'İdrarınız Size Ne Anlatıyor?', value: '3.375 · 0:48 · 25,4 sa' },
            { title: 'Ayşe Tolga ile Sağlıklı Yaşam hakkında konuştuk', value: '2.749 · 0:19 · 7,0 sa' },
          ]} />
          <InsightBox><p className="text-[11px] text-blue-700 leading-relaxed">YouTube’da Ekim trafiğinin büyük bölümü sağlık eğitimi / uzman bilgi içeriklerinden geldi. Şah Damarı Ultrasonu ve Suda Doğum videoları birlikte ayın en yüksek view hacmini oluşturdu. YouTube Analytics -32 subscriber ile ay sonu toplam farkı -27 birbirinden ayrı raporlama sinyalleridir.</p></InsightBox>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3 bg-blue-50/60 border-b border-blue-100">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-100"><span className="text-blue-700"><Linkedin size={17} /></span></div>
          <h3 className="font-bold text-base text-blue-700">LinkedIn</h3>
          <span className="ml-auto text-[10px] font-semibold text-blue-500 bg-blue-100 px-2.5 py-0.5 rounded-full">Son 30 gün</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-50">
          {[
            { label: 'Total Followers', value: '1.732', icon: <Users size={13} /> },
            { label: 'New Followers', value: '+18', change: '+%20', icon: <TrendingUp size={13} /> },
            { label: 'Impressions', value: '8.335', change: '+%624,8', icon: <Eye size={13} /> },
            { label: 'Reactions', value: '95', change: '+%313', icon: <ThumbsUp size={13} /> },
          ].map(stat => <div key={stat.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-4"><span className="text-blue-400">{stat.icon}</span><p className="text-lg font-bold text-gray-800 tabular-nums">{stat.value}</p><p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>{stat.change && <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>}</div>)}
        </div>
        <InsightBox><p className="text-[11px] text-blue-700 leading-relaxed">LinkedIn takipçi büyümesi sınırlı kalmasına rağmen Ekim’de içerik görünürlüğü ve reaksiyon hacmi güçlü arttı. MLPCARE çalışanlarına özel Meme Sağlığı Farkındalık Semineri, Liv Talks / kadın sağlığı etkinlikleri ve sağlıklı yaşam içerikleri ana içerik kümelerini oluşturdu.</p></InsightBox>
      </div>

      <PlatformBlock title="X / Twitter" platformIcon={<Send size={17} />} headerBg="bg-gray-50" headerText="text-gray-700" badgeBg="bg-gray-200" badgeText="text-gray-700" stats={[{ label: 'Followers', value: '—', icon: <Users size={13} /> }, { label: 'Change', value: '—', icon: <TrendingUp size={13} /> }]} insight="Twitter / X için Ekim verisi sağlanmadı; değerler uydurulmadı." />

      <div className="flex gap-3 items-start bg-slate-800 rounded-2xl px-5 py-4">
        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"><Lightbulb size={15} className="text-white" /></div>
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Yönetim Özeti</p>
          <p className="text-sm text-white/90 leading-relaxed">Ekim’de sosyal medya performansının ana büyüme motoru Instagram oldu. Takipçi tabanı yaklaşık %7 büyürken reach +%34,5 ve content interactions +%42,4 arttı. Organik Instagram görüntülemelerindeki +%292 artış, ayın en güçlü pozitif sinyallerinden biri oldu.</p>
          <p className="text-xs text-white/60 leading-relaxed mt-1.5">TikTok view hacmi +%17,7 ve share hacmi +%40,7 büyürken Böbrek Sağlığı içeriği hem Instagram hem TikTok’ta ayın açık ara en güçlü içerik formatı oldu. YouTube 125,5K view ve 823 saat watch time üretirken subscriber tarafında sınırlı kayıp devam etti. LinkedIn’de follower büyümesi düşük olmasına rağmen görünürlük ve reaksiyonlar güçlü arttı.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><Lightbulb size={15} className="text-amber-500" /><h3 className="text-sm font-bold text-gray-800">Ekimde Ne Çalıştı?</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {[
            ['1. HEALTH EDUCATION REELS', 'Böbrek Sağlığı ve Tansiyon içerikleri güçlü view + save + follower acquisition üretti.'],
            ['2. BREAST HEALTH CONTENT SERIES', 'Meme sağlığı içerikleri birden fazla story / video formatında 20K+ reach seviyesine çıktı.'],
            ['3. ORGANIC INSTAGRAM', 'Organic views +292,4%.'],
            ['4. TIKTOK SHAREABILITY', 'Shares +40,7%.'],
            ['5. LINKEDIN CORPORATE HEALTH CONTENT', 'Visibility and reactions strongly increased.'],
          ].map(([title, desc]) => <div key={title} className="rounded-xl border border-gray-100 p-3"><p className="text-[10px] font-bold text-gray-700 leading-tight">{title}</p><p className="text-[11px] text-gray-500 leading-relaxed mt-1.5">{desc}</p></div>)}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><TrendingUp size={15} className="text-blue-500" /><h3 className="text-sm font-bold text-gray-800">Sonraki Aksiyonlar</h3></div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[
            'Böbrek Sağlığı formatını böbrek, tansiyon, idrar, kalp ve diyabet gibi yüksek merak alanlarında seri haline getir.',
            'Pratik sağlık bilgisini save-oriented Reels formatında artır.',
            'Meme Sağlığı içerik serisinin story + Reels + expert video kombinasyonunu diğer farkındalık konularına uygula.',
            'Instagram organic growth momentumunu korumak için yüksek performanslı Reels formatını ölçekle.',
            'TikTok’ta follower acquisition üreten sağlık bilgi videolarına öncelik ver.',
            'YouTube’da yüksek view alan sağlık eğitimi videolarından Shorts ve sosyal medya cut-down’ları üret.',
            'YouTube subscriber kaybını azaltmak için stronger subscribe CTA, series structure, end screen ve related-video chaining test et.',
            'LinkedIn’de çalışan sağlığı, kurumsal wellbeing, etkinlik ve uzman içeriklerini artır.',
          ].map((action, i) => <li key={i} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span><span>{action}</span></li>)}
        </ol>
      </div>

      <div className="flex gap-2.5 items-start bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mt-0.5">Yöntem</span><p className="text-[10px] text-gray-400 leading-relaxed">Instagram: 1–31 Ekim. TikTok: 7 Ekim–3 Kasım. LinkedIn: raporda sunulan son 30 gün. YouTube: Ekim dashboard verisi. Platform dönemleri birebir aynı olmadığı için karşılaştırmalar yön göstericidir.</p></div>
    </div>
  );
}

export default function SocialMediaDashboard() {
  const [activeMonth, setActiveMonth] = useState<MonthKey>('october');

  return (
    <div className="flex flex-col gap-6">
      <MonthTabs active={activeMonth} onSelect={setActiveMonth} />
      {activeMonth === 'june' && <JuneContent />}
      {activeMonth === 'july' && <JulyContent />}
      {activeMonth === 'august' && <AugustContent />}
      {activeMonth === 'september' && <SeptemberContent />}
      {activeMonth === 'october' && <OctoberContent />}
    </div>
  );
}
