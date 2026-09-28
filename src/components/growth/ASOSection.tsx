import { TrendingUp, TrendingDown, Star, AlertTriangle, Apple, Bot, Minus } from 'lucide-react';

interface KeywordRankRow {
  keyword: string;
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

function TopKeywordsTable({ title, rows, insight }: { title: string; rows: KeywordRankRow[]; insight: string }) {
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
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Önceki</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Güncel</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Değişim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(r => (
              <tr key={r.keyword} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-3 py-2.5 font-medium text-gray-700">{r.keyword}</td>
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

function RisingKeywordsTable({ title, rows, insight, isWatchlist = false, isStable = false }: { title: string; rows: KeywordRankRow[]; insight: string; isWatchlist?: boolean; isStable?: boolean }) {
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
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Önceki</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Güncel</th>
              <th className="text-right px-3 py-2.5 font-semibold text-gray-400 uppercase tracking-wider">Değişim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map(r => (
              <tr key={r.keyword} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-3 py-2.5 font-medium text-gray-700">{r.keyword}</td>
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

// 14/09/2026 snapshot
const APP_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings', value: 2 },
  { label: 'Top 10 Rankings', value: 11 },
  { label: 'Top 30 Rankings', value: 16 },
  { label: 'Top 100 Rankings', value: 24 },
  { label: 'Ortalama Puan', value: '4.64' },
];

// Çekirdek / Top keyword'ler (14/09/2026)
const APP_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'sağlık taraması',   prev: 1,  current: 1,  change: 0  },
  { keyword: 'evde doktor',       prev: 1,  current: 1,  change: 0  },
  { keyword: 'check-up',          prev: 3,  current: 2,  change: 1  },
  { keyword: 'checkup',           prev: 2,  current: 2,  change: 0  },
  { keyword: 'check up',          prev: 3,  current: 3,  change: 0  },
  { keyword: 'online muayene',    prev: 4,  current: 4,  change: 0  },
  { keyword: 'sağlık hizmetleri', prev: 4,  current: 6,  change: -2 },
  { keyword: 'evde sağlık',       prev: 6,  current: 6,  change: 0  },
  { keyword: 'sağlık hizmeti',    prev: 7,  current: 7,  change: 0  },
  { keyword: 'açık eczaneler',    prev: 7,  current: 7,  change: 0  },
  { keyword: 'happ',              prev: 13, current: 10, change: 3  },
];

// Yükselen keyword'ler (14/09/2026)
const APP_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'randevu al',        prev: 183, current: 106, change: 77 },
  { keyword: 'doktor',            prev: 197, current: 133, change: 64 },
  { keyword: 'sağlık uygulaması', prev: 73,  current: 27,  change: 46 },
  { keyword: 'terapi',            prev: 145, current: 105, change: 40 },
  { keyword: 'hemşire',           prev: 175, current: 156, change: 19 },
  { keyword: 'hastane randevu',   prev: 33,  current: 18,  change: 15 },
  { keyword: 'online terapi',     prev: 55,  current: 45,  change: 10 },
  { keyword: 'serum hizmeti',     prev: 17,  current: 11,  change: 6  },
  { keyword: 'happ',              prev: 13,  current: 10,  change: 3  },
  { keyword: 'online psikolog',   prev: 57,  current: 55,  change: 2  },
];

// Yeni görünürlük kazanan keyword'ler (14/09/2026)
const APP_STORE_NEW: KeywordRankRow[] = [
  { keyword: 'hastane', prev: -1, current: 182, change: 0 },
];

// Zayıflayan / takip edilecek keyword'ler (14/09/2026)
const APP_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'eczaneler',        prev: 211, current: 235, change: -24 },
  { keyword: 'diyetisyen',       prev: 104, current: 123, change: -19 },
  { keyword: 'neyim var',        prev: 130, current: 147, change: -17 },
  { keyword: 'nöbetçi eczane',   prev: 178, current: 188, change: -10 },
  { keyword: 'sağlık hizmetleri', prev: 4,  current: 6,   change: -2  },
  { keyword: 'evde',             prev: 11,  current: 13,  change: -2  },
  { keyword: 'sağlık bakanlığı', prev: 32,  current: 34,  change: -2  },
  { keyword: 'kan alma',         prev: 63,  current: 65,  change: -2  },
];

// 14/09/2026 snapshot
const PLAY_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings',      value: 4    },
  { label: 'Top 10 Rankings',     value: 6    },
  { label: 'Top 30 Rankings',     value: 9    },
  { label: 'Top 100 Rankings',    value: 16   },
  { label: 'Ortalama Puan',       value: '4.80' },
  { label: 'Yeni Değerlendirme',  value: 11   },
];

// Çekirdek / güçlü keyword'ler (14/09/2026)
const PLAY_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'check up',                    prev: 2,   current: 1,   change: 1   },
  { keyword: 'check-up',                    prev: 2,   current: 1,   change: 1   },
  { keyword: 'evde sağlık',                 prev: 1,   current: 1,   change: 0   },
  { keyword: 'evde doktor',                 prev: 1,   current: 1,   change: 0   },
  { keyword: 'happ',                        prev: 2,   current: 2,   change: 0   },
  { keyword: 'dijital sağlık',              prev: 3,   current: 3,   change: 0   },
  { keyword: 'görüntülü doktor görüşmesi',  prev: 31,  current: 37,  change: -4  },
  { keyword: 'sağlık',                      prev: 44,  current: 39,  change: 5   },
  { keyword: 'doktor randevusu al',         prev: 51,  current: 54,  change: -7  },
  { keyword: 'doktor randevusu',            prev: 63,  current: 63,  change: 0   },
  { keyword: 'hastane randevu',             prev: 70,  current: 68,  change: 2   },
  { keyword: 'evde uyku testi',             prev: 118, current: 95,  change: 23  },
  { keyword: 'nöbetçi eczane',              prev: 120, current: 100, change: 20  },
  { keyword: 'randevu',                     prev: 139, current: 138, change: 1   },
];

// Yükselen keyword'ler (14/09/2026)
const PLAY_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'evde uyku testi',             prev: 118, current: 95,  change: 23  },
  { keyword: 'diyetisyen',                  prev: 167, current: 145, change: 22  },
  { keyword: 'nöbetçi eczane',              prev: 120, current: 100, change: 20  },
  { keyword: 'online muayene',              prev: 164, current: 148, change: 16  },
  { keyword: 'sağlık',                      prev: 44,  current: 39,  change: 5   },
  { keyword: 'hastane randevu',             prev: 70,  current: 68,  change: 2   },
  { keyword: 'check up',                    prev: 2,   current: 1,   change: 1   },
  { keyword: 'check-up',                    prev: 2,   current: 1,   change: 1   },
  { keyword: 'randevu',                     prev: 139, current: 138, change: 1   },
  { keyword: 'online psikolog',             prev: 181, current: 180, change: 1   },
];

// Yeni görünürlük kazanan keyword'ler (14/09/2026)
const PLAY_STORE_NEW: KeywordRankRow[] = [
  { keyword: 'hastane',       prev: -1, current: 159, change: 0 },
  { keyword: 'online terapi', prev: -1, current: 186, change: 0 },
];

// Stabil keyword'ler (14/09/2026)
const PLAY_STORE_STABLE: KeywordRankRow[] = [
  { keyword: 'evde sağlık',    prev: 1, current: 1, change: 0 },
  { keyword: 'evde doktor',    prev: 1, current: 1, change: 0 },
  { keyword: 'happ',           prev: 2, current: 2, change: 0 },
  { keyword: 'dijital sağlık', prev: 3, current: 3, change: 0 },
  { keyword: 'doktor randevusu', prev: 63, current: 63, change: 0 },
];

// Zayıflayan / takip edilecek keyword'ler (14/09/2026)
const PLAY_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'doktor randevusu al',       prev: 51,  current: 54,  change: -7 },
  { keyword: 'görüntülü doktor görüşmesi', prev: 31, current: 37, change: -4 },
  { keyword: 'psikolog',                 prev: 171, current: 175, change: -4 },
  { keyword: 'online diyetisyen',        prev: 181, current: 184, change: -3 },
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
          />
          {stableRows && stableRows.length > 0 && (
            <RisingKeywordsTable
              title="Stabil / Güçlü Keyword'ler"
              rows={stableRows}
              insight={stableInsight ?? ''}
              isStable
            />
          )}
          {newRows && newRows.length > 0 && (
            <RisingKeywordsTable
              title="Yeni Görünürlük Kazanımları"
              rows={newRows}
              insight={newInsight ?? ''}
            />
          )}
          <RisingKeywordsTable
            title="Yakından Takip Edilmesi Gereken Keyword'ler"
            rows={watchlistRows}
            insight={watchlistInsight}
            isWatchlist
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
        note="App Store ASO tarafında core sağlık hizmeti ve Check-Up keyword'lerinde güçlü Top 10 görünürlüğü korunurken, generic sağlık ve randevu sorgularında genişleme sürüyor. Özellikle sağlık uygulaması ve hastane randevu Top 30'a taşınırken, randevu al ve doktor kelimelerindeki yüksek sıra kazanımları orta vadede ek organik görünürlük fırsatı yaratıyor."
        topRows={APP_STORE_TOP}
        topInsight="14 Eylül itibarıyla App Store'da core hizmet görünürlüğü güçlü seviyede. 'sağlık taraması' ve 'evde doktor' 1. sırada yer alırken, Check-Up keyword seti #2–#3 bandındaki güçlü görünürlüğünü koruyor. 'online muayene' #4, 'evde sağlık' #6 ve marka kelimesi 'happ' #10 seviyesinde."
        risingRows={APP_STORE_RISING}
        risingInsight="Generic sorgularda güçlü yükselişler devam ediyor. 'randevu al' +77, 'doktor' +64, 'sağlık uygulaması' +46 ve 'terapi' +40 sıra yükseldi. Buna karşılık 'eczaneler' -24, 'diyetisyen' -19 ve 'neyim var' -17 ile ana takip alanları olarak öne çıkıyor."
        newRows={APP_STORE_NEW}
        newInsight="14/09/2026 snapshotunda 'hastane' (unranked → 182) yeniden sıralamaya girerek pozitif sinyal verdi."
        watchlistRows={APP_STORE_WATCHLIST}
        watchlistInsight="En büyük gerilemeler 'eczaneler' (-24), 'diyetisyen' (-19), 'neyim var' (-17) ve 'nöbetçi eczane' (-10) kelimelerinde görüldü. Bu kümeler sonraki optimizasyon döneminde izlenmeli."
        risingTitle="Yükselen Keyword'ler (14/09/2026)"
        dateLabel="14/09/2026"
      />

      <StoreSection
        store="playstore"
        kpis={PLAY_STORE_KPIS}
        note="Android ASO tarafında ana hizmet keyword'leri Top 3 görünürlüğünü güçlü şekilde koruyor. Özellikle Check-Up ve Evde Sağlık kategorilerindeki #1 pozisyonlar devam ederken, Evde Uyku Testi, Diyetisyen ve Nöbetçi Eczane sorgularında yükseliş görülmesi organik görünürlüğün daha geniş hizmet kategorilerine yayıldığını gösteriyor."
        topRows={PLAY_STORE_TOP}
        topInsight="14 Eylül itibarıyla Google Play'de core keyword görünürlüğü çok güçlü seviyede. 'check up', 'check-up', 'evde sağlık' ve 'evde doktor' kelimeleri 1. sırada yer alırken, 'happ' 2. ve 'dijital sağlık' 3. sıradaki görünürlüğünü koruyor."
        risingRows={PLAY_STORE_RISING}
        risingInsight="Generic hizmet sorgularında da olumlu hareket devam ediyor. 'evde uyku testi' +23, 'diyetisyen' +22, 'nöbetçi eczane' +20 ve 'online muayene' +16 sıra yükseldi. Buna karşılık 'doktor randevusu al', 'görüntülü doktor görüşmesi' ve 'psikolog' tarafında sınırlı gerileme görüldü."
        stableRows={PLAY_STORE_STABLE}
        stableInsight="Core keyword'ler stabil kalıyor: 'evde sağlık' 1. sırada, 'evde doktor' 1. sırada, 'happ' 2. sırada, 'dijital sağlık' 3. sırada ve 'doktor randevusu' 63. sırada konumunu korudu."
        newRows={PLAY_STORE_NEW}
        newInsight="14/09/2026 snapshotunda 'hastane' (unranked → 159) ve 'online terapi' (unranked → 186) yeniden sıralamaya girerek pozitif sinyal verdi."
        watchlistRows={PLAY_STORE_WATCHLIST}
        watchlistInsight="Bu dönemde sınırlı gerilemeler görüldü. 'doktor randevusu al' (-7), 'görüntülü doktor görüşmesi' (-4), 'psikolog' (-4) ve 'online diyetisyen' (-3) kelimeleri takip edilmeli."
        risingTitle="Yükselen Keyword'ler (14/09/2026)"
        dateLabel="14/09/2026"
      />

      <ASOInsightBox />
    </div>
  );
}
