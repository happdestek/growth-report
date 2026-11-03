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

// 02/11/2026 snapshot
const APP_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings', value: 0 },
  { label: 'Top 10 Rankings', value: 6 },
  { label: 'Top 30 Rankings', value: 11 },
  { label: 'Top 100 Rankings', value: 20 },
  { label: 'Ortalama Puan', value: '4.64' },
];

// Çekirdek / Top keyword'ler (02/11/2026)
const APP_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'checkup',            prev: 2,  current: 2,  change: 0  },
  { keyword: 'evde doktor',        prev: 2,  current: 2,  change: 0  },
  { keyword: 'check up',           prev: 3,  current: 3,  change: 0  },
  { keyword: 'online muayene',     prev: 5,  current: 5,  change: 0  },
  { keyword: 'medical park',       prev: 7,  current: 6,  change: 1  },
  { keyword: 'check-up',           prev: 10, current: 11, change: -1 },
  { keyword: 'happ',               prev: 14, current: 13, change: 1  },
  { keyword: 'sağlık hizmeti',     prev: 20, current: 13, change: 7  },
  { keyword: 'sağlık hizmetleri',  prev: 23, current: 14, change: 9  },
  { keyword: 'online diyetisyen',  prev: 27, current: 15, change: 12 },
  { keyword: 'online terapi',      prev: 65, current: 16, change: 49 },
];

// Yükselen keyword'ler (27/10 → 02/11/2026)
const APP_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'park',              prev: 204, current: 84,  change: 120 },
  { keyword: 'online doktor',     prev: 203, current: 119, change: 84  },
  { keyword: 'terapi',            prev: 110, current: 45,  change: 65  },
  { keyword: 'hemşire',           prev: 135, current: 78,  change: 57  },
  { keyword: 'eczaneler',         prev: 248, current: 194, change: 54  },
  { keyword: 'online terapi',     prev: 65,  current: 16,  change: 49  },
  { keyword: 'diyetisyen',        prev: 98,  current: 65,  change: 33  },
  { keyword: 'sağlık uygulaması', prev: 116, current: 83,  change: 33  },
  { keyword: 'hizmetleri',        prev: 218, current: 192, change: 26  },
  { keyword: 'neyim var',         prev: 94,  current: 69,  change: 25  },
  { keyword: 'doktor',            prev: 122, current: 97,  change: 25  },
  { keyword: 'hizmet',            prev: 223, current: 207, change: 16  },
  { keyword: 'online psikolog',   prev: 55,  current: 40,  change: 15  },
  { keyword: 'online diyetisyen', prev: 27,  current: 15,  change: 12  },
  { keyword: 'kan alma',          prev: 57,  current: 46,  change: 11  },
];

// Yeni görünürlük kazanan keyword'ler (02/11/2026) — bu snapshot'ta yeni giriş yok
const APP_STORE_NEW: KeywordRankRow[] = [];

// Zayıflayan / takip edilecek keyword'ler (27/10 → 02/11/2026)
const APP_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'nöbetçi',        prev: 165, current: 204, change: -39 },
  { keyword: 'nöbetçi eczane', prev: 186, current: 211, change: -25 },
  { keyword: 'check-up',       prev: 10,  current: 11,  change: -1  },
];

// 02/11/2026 snapshot
const PLAY_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings',      value: 1    },
  { label: 'Top 10 Rankings',     value: 3    },
  { label: 'Top 30 Rankings',     value: 4    },
  { label: 'Top 100 Rankings',    value: 5    },
  { label: 'Ortalama Puan',       value: '4.80' },
  { label: 'Yeni Değerlendirme',  value: 11   },
];

// Çekirdek / güçlü keyword'ler (02/11/2026)
const PLAY_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'evde doktor',                 prev: 1,   current: 1,   change: 0   },
  { keyword: 'dijital sağlık',              prev: 4,   current: 4,   change: 0   },
  { keyword: 'happ',                        prev: 8,   current: 8,   change: 0   },
  { keyword: 'evde sağlık',                 prev: 20,  current: 22,  change: -2  },
  { keyword: 'görüntülü doktor görüşmesi',  prev: 69,  current: 48,  change: 21  },
];

// Yükselen keyword'ler (27/10 → 02/11/2026)
const PLAY_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'görüntülü doktor görüşmesi',  prev: 69,  current: 48,  change: 21  },
  { keyword: 'hastane randevu',             prev: 182, current: 162, change: 20  },
  { keyword: 'online muayene',              prev: 124, current: 121, change: 3   },
  { keyword: 'online psikolog',             prev: 178, current: 175, change: 3   },
];

// Yeni görünürlük kazanan keyword'ler (02/11/2026) — bu snapshot'ta yeni giriş yok
const PLAY_STORE_NEW: KeywordRankRow[] = [];

// Stabil keyword'ler (02/11/2026)
const PLAY_STORE_STABLE: KeywordRankRow[] = [
  { keyword: 'evde doktor',     prev: 1,   current: 1,   change: 0 },
  { keyword: 'dijital sağlık',  prev: 4,   current: 4,   change: 0 },
  { keyword: 'happ',            prev: 8,   current: 8,   change: 0 },
  { keyword: 'nöbetçi eczane',  prev: 101, current: 101, change: 0 },
];

// Zayıflayan / takip edilecek keyword'ler (27/10 → 02/11/2026)
const PLAY_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'doktor randevusu al', prev: 155, current: 189, change: -34 },
  { keyword: 'randevu',             prev: 192, current: 200, change: -8  },
  { keyword: 'psikolog',            prev: 193, current: 199, change: -6  },
  { keyword: 'evde sağlık',         prev: 20,  current: 22,  change: -2  },
  { keyword: 'hastane',             prev: 131, current: 132, change: -1  },
  { keyword: 'online doktor',       prev: 145, current: 146, change: -1  },
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
        note="2 Kasım itibarıyla App Store keyword performansında geniş tabanlı bir iyileşme görülüyor. Core keyword'ler güçlü konumlarını korurken generic sağlık ve hizmet sorgularında belirgin yükselişler yaşandı. Haftanın en güçlü hareketleri 'park' +120, 'online doktor' +84, 'terapi' +65, 'hemşire' +57, 'eczaneler' +54 ve 'online terapi' +49 oldu. Buna karşılık 'nöbetçi' -39 ve 'nöbetçi eczane' -25 ile ana takip alanları olarak öne çıktı. App Store ASO tarafında Kasım başlangıcında olumlu bir momentum oluştu. Ana marka ve hizmet keyword'leri Top 20 görünürlüğünü korurken doktor, terapi, diyetisyen, sağlık uygulaması ve eczane ilişkili generic sorguların önemli bölümünde sıralama kazanımları görüldü. Bir sonraki takipte özellikle bu yükselişlerin kalıcı olup olmadığı ve Nöbetçi Eczane keyword setindeki gerilemenin devam edip etmediği izlenmeli."
        topRows={APP_STORE_TOP}
        topInsight="App Store'da ana hizmet ve marka keyword'leri güçlü görünürlüğünü koruyor. Check-Up varyasyonları Top 3–11 bandında kalırken 'medical park' #6, 'happ' #13 seviyesinde yer alıyor."
        risingRows={APP_STORE_RISING}
        risingInsight="Haftanın en güçlü hareketleri 'park' +120, 'online doktor' +84, 'terapi' +65, 'hemşire' +57, 'eczaneler' +54 ve 'online terapi' +49 oldu. 'diyetisyen' +33, 'sağlık uygulaması' +33, 'hizmetleri' +26, 'neyim var' +25 ve 'doktor' +25 ile geniş tabanlı yükseliş görüldü."
        newRows={APP_STORE_NEW}
        newInsight=""
        watchlistRows={APP_STORE_WATCHLIST}
        watchlistInsight="Bu snapshot'ta yalnızca üç keyword gerileme gösterdi: 'nöbetçi' -39, 'nöbetçi eczane' -25 ve 'check-up' -1. Nöbetçi Eczane keyword seti bir sonraki takipte öncelikli izleme alanı."
        risingTitle="Yükselen Keyword'ler (27/10 → 02/11/2026)"
        dateLabel="02/11/2026"
      />

      <StoreSection
        store="playstore"
        kpis={PLAY_STORE_KPIS}
        note="2 Kasım itibarıyla Google Play keyword performansında core görünürlük stabil kaldı. 'evde doktor' #1, 'dijital sağlık' #4 ve 'happ' #8 seviyesini korurken, 'görüntülü doktor görüşmesi' +21 ve 'hastane randevu' +20 sıra ile haftanın en güçlü yükselişlerini üretti. Gerileme tarafında 'doktor randevusu al' -34 sıra ile en dikkat çekici kaybı yaşadı. 'randevu' -8 ve 'psikolog' -6 sıra gerilerken, 'evde sağlık' sınırlı şekilde #20'den #22'ye düştü. Google Play tarafında Kasım başlangıcında ana marka ve core hizmet keyword'leri korunurken, doktor görüşmesi ve hastane randevu sorgularında iyileşme görüldü. Buna karşılık randevu ve psikolog odaklı generic keyword'ler zayıf kalmaya devam ediyor. Sonraki ölçümde özellikle 'doktor randevusu al' ve 'randevu' sorgularındaki düşüşün kalıcı olup olmadığı takip edilmeli."
        topRows={PLAY_STORE_TOP}
        topInsight="Android ASO tarafında core keyword görünürlüğü büyük ölçüde stabil. 'evde doktor' #1, 'dijital sağlık' #4 ve 'happ' #8 seviyesini koruyor."
        risingRows={PLAY_STORE_RISING}
        risingInsight="Haftanın en güçlü yükselişleri: 'görüntülü doktor görüşmesi' +21 ve 'hastane randevu' +20 sıra. 'online muayene' +3 ve 'online psikolog' +3 ile sınırlı kazanımlar görüldü."
        stableRows={PLAY_STORE_STABLE}
        stableInsight="Stabil kalan keyword'ler: 'evde doktor' #1, 'dijital sağlık' #4, 'happ' #8 ve 'nöbetçi eczane' #101 seviyesini korudu."
        newRows={PLAY_STORE_NEW}
        newInsight=""
        watchlistRows={PLAY_STORE_WATCHLIST}
        watchlistInsight="En dikkat çekici gerileme 'doktor randevusu al' -34 sıra oldu. 'randevu' -8, 'psikolog' -6 ve 'evde sağlık' -2 sıra gerilerken 'hastane' ve 'online doktor' -1'er sıra küçük kayıp verdi."
        risingTitle="Yükselen Keyword'ler (27/10 → 02/11/2026)"
        dateLabel="02/11/2026"
      />

      <ASOInsightBox />
    </div>
  );
}
