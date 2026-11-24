import { TrendingUp, TrendingDown, Star, AlertTriangle, Apple, Bot, Minus } from 'lucide-react';

interface KeywordRankRow {
  keyword: string;
  volume?: number;
  prev: number;
  current: number;
  change: number;
}

interface ASOKpiCard {
  label: string;
  value: string | number;
}

function KpiCard({ label, value, highlight = false }: ASOKpiCard & { highlight?: boolean }) {
  return (
    <div className={`rounded-xl px-4 py-3.5 flex flex-col gap-1 ${highlight ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider leading-none">{label}</span>
      <span className={`text-2xl font-bold leading-tight ${highlight ? 'text-blue-700' : 'text-gray-800'}`}>{value}</span>
    </div>
  );
}

function InsightNote({ text, color = 'blue' }: { text: string; color?: 'blue' | 'amber' | 'emerald' }) {
  const styles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  return (
    <p className={`text-xs rounded-lg px-3 py-2.5 border font-medium leading-relaxed ${styles[color]}`}>
      {text}
    </p>
  );
}

function TopKeywordsTable({ title, rows, insight, showVolume = false }: { title: string; rows: KeywordRankRow[]; insight: string; showVolume?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Star size={13} className="text-emerald-500" />
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
      </div>
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Keyword</th>
              {showVolume && <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Volume</th>}
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Önceki</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Güncel</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Değişim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(r => (
              <tr key={r.keyword} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-3 py-2.5 font-medium text-gray-700">{r.keyword}</td>
                {showVolume && <td className="px-3 py-2.5 text-right text-gray-400 tabular-nums">{r.volume ?? '—'}</td>}
                <td className="px-3 py-2.5 text-right text-gray-400 tabular-nums">{r.prev}</td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  <span className={`inline-flex items-center justify-center w-8 h-6 rounded-md font-bold text-xs ${r.current <= 3 ? 'bg-emerald-100 text-emerald-700' : r.current <= 10 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {r.current}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`inline-flex items-center gap-0.5 font-bold tabular-nums ${r.change > 0 ? 'text-emerald-600' : r.change < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {r.change > 0 ? <TrendingUp size={10} /> : r.change < 0 ? <TrendingDown size={10} /> : null}
                    {r.change > 0 ? '+' : ''}{r.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InsightNote text={insight} color="emerald" />
    </div>
  );
}

function RisingKeywordsTable({ title, rows, insight, isWatchlist = false, isStable = false, showVolume = false }: { title: string; rows: KeywordRankRow[]; insight: string; isWatchlist?: boolean; isStable?: boolean; showVolume?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {isWatchlist ? (
          <AlertTriangle size={13} className="text-amber-500" />
        ) : isStable ? (
          <Minus size={13} className="text-blue-400" />
        ) : (
          <TrendingUp size={13} className="text-emerald-500" />
        )}
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
      </div>
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Keyword</th>
              {showVolume && <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Volume</th>}
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Önceki</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Güncel</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Değişim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(r => (
              <tr key={r.keyword} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-3 py-2.5 font-medium text-gray-700">{r.keyword}</td>
                {showVolume && <td className="px-3 py-2.5 text-right text-gray-400 tabular-nums">{r.volume ?? '—'}</td>}
                <td className="px-3 py-2.5 text-right text-gray-400 tabular-nums">{r.prev === -1 ? <span className="text-gray-300">—</span> : r.prev}</td>
                <td className="px-3 py-2.5 text-right font-semibold tabular-nums">
                  {r.current === -1
                    ? <span className="text-[9px] font-bold text-red-400 bg-red-50 px-1.5 py-0.5 rounded-full">unranked</span>
                    : <span className="text-gray-700">{r.current}</span>
                  }
                </td>
                <td className="px-3 py-2.5 text-right">
                  {r.current === -1 ? (
                    <span className="inline-flex items-center gap-0.5 font-bold text-red-400"><TrendingDown size={10} />—</span>
                  ) : r.prev === -1 ? (
                    <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded-full">YENİ</span>
                  ) : (
                    <span className={`inline-flex items-center gap-0.5 font-bold tabular-nums ${r.change > 0 ? 'text-emerald-600' : r.change < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                      {r.change > 0 ? <TrendingUp size={10} /> : r.change < 0 ? <TrendingDown size={10} /> : null}
                      {r.change > 0 ? '+' : ''}{r.change}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InsightNote text={insight} color={isWatchlist ? 'amber' : isStable ? 'emerald' : 'blue'} />
    </div>
  );
}

// App Store keyword snapshot: 17/11/2026 → 23/11/2026
const APP_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings', value: 1 },
  { label: 'Top 10 Rankings', value: 7 },
  { label: 'Top 30 Rankings', value: 10 },
  { label: 'Top 100 Rankings', value: 15 },
  { label: 'Ortalama Puan', value: '4.64' },
];

const APP_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'check up',          volume: 5,  prev: 1,   current: 1,   change: 0 },
  { keyword: 'checkup',           volume: 5,  prev: 2,   current: 2,   change: 0 },
  { keyword: 'evde doktor',       volume: 9,  prev: 3,   current: 3,   change: 0 },
  { keyword: 'online muayene',    volume: 9,  prev: 5,   current: 5,   change: 0 },
  { keyword: 'medical',           volume: 5,  prev: 90,  current: 7,   change: 83 },
  { keyword: 'medical park',      volume: 52, prev: 6,   current: 7,   change: -1 },
  { keyword: 'check-up',          volume: 5,  prev: 10,  current: 9,   change: 1 },
];

const APP_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'medical',           volume: 5,  prev: 90,  current: 7,   change: 83 },
  { keyword: 'park',              volume: 30, prev: 183, current: 133, change: 50 },
  { keyword: 'neyim var',         volume: 11, prev: 110, current: 92,  change: 18 },
  { keyword: 'kan alma',          volume: 8,  prev: 74,  current: 62,  change: 12 },
  { keyword: 'doktor',            volume: 23, prev: 127, current: 118, change: 9 },
  { keyword: 'online psikolog',   volume: 5,  prev: 61,  current: 55,  change: 6 },
  { keyword: 'sağlık hizmetleri', volume: 5,  prev: 27,  current: 23,  change: 4 },
  { keyword: 'check-up',          volume: 5,  prev: 10,  current: 9,   change: 1 },
];

const APP_STORE_NEW: KeywordRankRow[] = [
  { keyword: 'check',             volume: 5,  prev: -1,  current: 231, change: 0 },
  { keyword: 'hizmetleri',        volume: 11, prev: -1,  current: 236, change: 0 },
  { keyword: 'sağlık',            volume: 5,  prev: -1,  current: 244, change: 0 },
];

const APP_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'nöbetçi eczane',    volume: 5,  prev: 162, current: 243, change: -81 },
  { keyword: 'hemşire',           volume: 12, prev: 146, current: 208, change: -62 },
  { keyword: 'online terapi',     volume: 15, prev: 21,  current: 57,  change: -36 },
  { keyword: 'nöbetçi',           volume: 5,  prev: 208, current: 236, change: -28 },
  { keyword: 'diyetisyen',        volume: 15, prev: 132, current: 149, change: -17 },
  { keyword: 'happ',              volume: 39, prev: 18,  current: 28,  change: -10 },
  { keyword: 'online diyetisyen', volume: 5,  prev: 26,  current: 31,  change: -5 },
  { keyword: 'sağlık uygulaması', volume: 5,  prev: 111, current: 116, change: -5 },
  { keyword: 'sağlık hizmeti',    volume: 5,  prev: 23,  current: 26,  change: -3 },
];

// Google Play keyword snapshot: 17/11/2026 → 23/11/2026
const PLAY_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings',      value: 1    },
  { label: 'Top 10 Rankings',     value: 1    },
  { label: 'Top 30 Rankings',     value: 1    },
  { label: 'Top 100 Rankings',    value: 2    },
  { label: 'Ortalama Puan',       value: '4.80' },
  { label: 'Yeni Değerlendirme',  value: 11   },
];

const PLAY_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'evde doktor',     volume: 9,  prev: 1,   current: 1,   change: 0  },
  { keyword: 'evde sağlık',     volume: 5,  prev: 29,  current: 18,  change: 11 },
  { keyword: 'happ',            volume: 39, prev: 20,  current: 19,  change: 1  },
  { keyword: 'nöbetçi eczane',  volume: 5,  prev: 109, current: 107, change: 2  },
  { keyword: 'görüntülü doktor görüşmesi', volume: 8, prev: 138, current: 129, change: 9 },
  { keyword: 'online muayene',  volume: 9,  prev: 136, current: 132, change: 4  },
];

const PLAY_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'doktor randevusu al', volume: 8,  prev: 199, current: 170, change: 29 },
  { keyword: 'online doktor',       volume: 5,  prev: 168, current: 155, change: 13 },
  { keyword: 'randevu',             volume: 24, prev: 193, current: 180, change: 13 },
  { keyword: 'evde sağlık',         volume: 5,  prev: 29,  current: 18,  change: 11 },
  { keyword: 'görüntülü doktor görüşmesi', volume: 8, prev: 138, current: 129, change: 9 },
  { keyword: 'online muayene',      volume: 9,  prev: 136, current: 132, change: 4  },
  { keyword: 'nöbetçi eczane',      volume: 5,  prev: 109, current: 107, change: 2  },
  { keyword: 'happ',                volume: 39, prev: 20,  current: 19,  change: 1  },
  { keyword: 'hastane',             volume: 22, prev: 140, current: 139, change: 1  },
];

const PLAY_STORE_NEW: KeywordRankRow[] = [
  { keyword: 'online psikolog', volume: 5,  prev: -1,  current: 160, change: 0  },
];

const PLAY_STORE_STABLE: KeywordRankRow[] = [
  { keyword: 'evde doktor',     volume: 9,  prev: 1,   current: 1,   change: 0 },
];

const PLAY_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'dijital sağlık',  volume: 9,  prev: 96,  current: 139, change: -43 },
  { keyword: 'hastane randevu', volume: 32, prev: 179, current: 184, change: -5  },
];

function StoreSection({
  store,
  kpis,
  note,
  topRows,
  topInsight,
  risingRows,
  risingInsight,
  stableRows,
  stableInsight,
  newRows,
  newInsight,
  watchlistRows,
  watchlistInsight,
  risingTitle,
  dateLabel,
}: {
  store: 'appstore' | 'playstore';
  kpis: ASOKpiCard[];
  note: string;
  topRows: KeywordRankRow[];
  topInsight: string;
  risingRows: KeywordRankRow[];
  risingInsight: string;
  stableRows?: KeywordRankRow[];
  stableInsight?: string;
  newRows?: KeywordRankRow[];
  newInsight?: string;
  watchlistRows: KeywordRankRow[];
  watchlistInsight: string;
  risingTitle: string;
  dateLabel?: string;
}) {
  const isApp = store === 'appstore';
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
      <div className="flex items-center gap-3 pb-1 border-b border-gray-100">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isApp ? 'bg-slate-800' : 'bg-emerald-600'}`}>
          {isApp ? <Apple size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{isApp ? 'App Store' : 'Play Store'} Keyword Performance</h3>
          <p className="text-[11px] text-gray-400">
            {isApp ? (
              <span className="inline-flex items-center gap-1.5">
                ASO görünürlük analizi
                <span className="bg-amber-100 text-amber-700 font-semibold px-1.5 py-0.5 rounded text-[10px]">{dateLabel ?? '10 Ağustos 2026'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                ASO görünürlük analizi
                <span className="bg-amber-100 text-amber-700 font-semibold px-1.5 py-0.5 rounded text-[10px]">{dateLabel ?? '10 Ağustos 2026'}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      <div className={`grid gap-3 ${isApp ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'}`}>
        {kpis.map(k => (
          <KpiCard key={k.label} label={k.label} value={k.value} highlight={k.label.includes('Rating') || k.label.includes('Puan')} />
        ))}
      </div>

      <InsightNote text={note} color="blue" />

      <div className={`grid gap-5 ${isApp ? 'grid-cols-1 lg:grid-cols-[220px_1fr]' : 'grid-cols-1 lg:grid-cols-[240px_1fr]'}`}>
        <TopKeywordsTable
          title="En Güçlü Keyword'ler"
          rows={topRows}
          insight={topInsight}
        />
        <div className="flex flex-col gap-5">
          <RisingKeywordsTable
            title={risingTitle}
            rows={risingRows}
            insight={risingInsight}
            showVolume
          />
          {stableRows && stableRows.length > 0 && (
            <RisingKeywordsTable
              title="Stabil / Güçlü Keyword'ler"
              rows={stableRows}
              insight={stableInsight ?? ''}
              isStable
              showVolume
            />
          )}
          {newRows && newRows.length > 0 && (
            <RisingKeywordsTable
              title="Yeni Görünürlük Kazanımları"
              rows={newRows}
              insight={newInsight ?? ''}
              showVolume
            />
          )}
          <RisingKeywordsTable
            title="Yakından Takip Edilmesi Gereken Keyword'ler"
            rows={watchlistRows}
            insight={watchlistInsight}
            isWatchlist
            showVolume
          />
        </div>
      </div>
    </div>
  );
}

function ASOInsightBox() {
  return null;
}

export default function ASOSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 pt-1">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">App Store Optimizasyonu</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <StoreSection
        store="appstore"
        kpis={APP_STORE_KPIS}
        note="23 Kasım itibarıyla iOS ASO tarafında core keyword görünürlüğü korunuyor. Check-Up varyasyonları Top 10 içerisinde kalırken 'medical' keyword'ü #90'dan #7'ye yükseldi. Haftanın en güçlü kazanımları medical +83, park +50, neyim var +18, kan alma +12 ve doktor +9 oldu. En büyük kayıplar nöbetçi eczane -81, hemşire -62, online terapi -36 ve nöbetçi -28 keyword'lerinde görüldü. App Store görünürlüğünde ana hizmet keyword'leri güçlü konumunu korurken generic sağlık sorgularında dalgalanma devam ediyor. Brand ilişkili 'medical' keyword'ünün #7'ye yükselmesi güçlü bir pozitif sinyal. Buna karşılık Nöbetçi Eczane ve online terapi kümelerindeki sert düşüşler bir sonraki ölçümde yakından takip edilmeli."
        topRows={APP_STORE_TOP}
        topInsight="App Store tarafında core hizmet ve marka görünürlüğü güçlü kalmaya devam ediyor. 'check up' #1, 'checkup' #2, 'evde doktor' #3 ve 'online muayene' #5 seviyesini korudu. 'medical' keyword'ü #90'dan #7'ye yükselerek haftanın en güçlü görünürlük kazanımını üretti."
        risingRows={APP_STORE_RISING}
        risingInsight="Haftanın en güçlü kazanımları medical +83, park +50, neyim var +18, kan alma +12 ve doktor +9 oldu. Üç yeni keyword sıralamaya girdi: 'check' (#231), 'hizmetleri' (#236) ve 'sağlık' (#244)."
        newRows={APP_STORE_NEW}
        newInsight="'check' Unranked'ten #231'e, 'hizmetleri' Unranked'ten #236'ya ve 'sağlık' Unranked'ten #244'e yükselerek yeni sıralamaya girdi."
        watchlistRows={APP_STORE_WATCHLIST}
        watchlistInsight="En büyük kayıplar nöbetçi eczane -81, hemşire -62, online terapi -36 ve nöbetçi -28 keyword'lerinde görüldü. Bu kayıpların kalıcı olup olmadığı bir sonraki takipte öncelikli izleme alanı."
        risingTitle="Yükselen Keyword'ler (17/11 → 23/11/2026)"
        dateLabel="23/11/2026"
      />

      <StoreSection
        store="playstore"
        kpis={PLAY_STORE_KPIS}
        note="23 Kasım itibarıyla Android ASO tarafında genel görünüm pozitif. 'evde doktor' #1 pozisyonunu korurken randevu ve online doktor odaklı generic sorgularda belirgin iyileşme görüldü. Haftanın en güçlü yükselişleri 'doktor randevusu al' +29, 'online doktor' +13, 'randevu' +13 ve 'evde sağlık' +11 oldu. 'online psikolog' yeniden sıralamaya girerek #160 seviyesine ulaştı. En belirgin negatif hareket 'dijital sağlık' keyword'ünde görüldü; #96'dan #139'a gerileyerek 43 sıra kaybetti. Google Play keyword görünürlüğünde bu hafta doktor, randevu ve Evde Sağlık kümelerinde iyileşme var. 'evde doktor' #1 seviyesini korurken 'doktor randevusu al', 'online doktor' ve 'randevu' sorgularında güçlü sıra kazanımları görüldü. Risk tarafında 'dijital sağlık' -43 sıra ile ana watchlist keyword'ü. 'hastane randevu' ise sınırlı şekilde geriledi."
        topRows={PLAY_STORE_TOP}
        topInsight="Google Play tarafında 'evde doktor' #1 pozisyonunu koruyor. 'evde sağlık' #29'dan #18'e yükselirken Happ marka keyword'ü #20'den #19'a çıktı. 'nöbetçi eczane' #107, 'görüntülü doktor görüşmesi' #129 ve 'online muayene' #132 seviyesinde."
        risingRows={PLAY_STORE_RISING}
        risingInsight="Haftanın en güçlü yükselişleri: 'doktor randevusu al' +29, 'online doktor' +13, 'randevu' +13 ve 'evde sağlık' +11 oldu."
        stableRows={PLAY_STORE_STABLE}
        stableInsight="Stabil kalan keyword: 'evde doktor' #1 seviyesini korudu."
        newRows={PLAY_STORE_NEW}
        newInsight="'online psikolog' Unranked'ten #160'a yükselerek yeniden sıralamaya girdi."
        watchlistRows={PLAY_STORE_WATCHLIST}
        watchlistInsight="En belirgin negatif hareket 'dijital sağlık' keyword'ünde görüldü; #96'dan #139'a gerileyerek 43 sıra kaybetti. 'hastane randevu' #179'dan #184'e sınırlı şekilde geriledi."
        risingTitle="Yükselen Keyword'ler (17/11 → 23/11/2026)"
        dateLabel="23/11/2026"
      />

      <ASOInsightBox />
    </div>
  );
}
