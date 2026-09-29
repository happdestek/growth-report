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

// 28/09/2026 snapshot
const APP_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings', value: 1 },
  { label: 'Top 10 Rankings', value: 7 },
  { label: 'Top 30 Rankings', value: 16 },
  { label: 'Top 100 Rankings', value: 24 },
  { label: 'Ortalama Puan', value: '4.64' },
];

// Çekirdek / Top keyword'ler (28/09/2026)
const APP_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'evde doktor',       prev: 1,  current: 1,  change: 0  },
  { keyword: 'checkup',           prev: 2,  current: 2,  change: 0  },
  { keyword: 'sağlık taraması',   prev: 1,  current: 2,  change: -1 },
  { keyword: 'online muayene',    prev: 3,  current: 3,  change: 0  },
  { keyword: 'check up',          prev: 4,  current: 4,  change: 0  },
  { keyword: 'check-up',          prev: 4,  current: 4,  change: 0  },
  { keyword: 'açık eczaneler',    prev: 3,  current: 5,  change: -2 },
  { keyword: 'serum hizmeti',     prev: 11, current: 11, change: 0  },
  { keyword: 'happ',              prev: 13, current: 13, change: 0  },
  { keyword: 'medical park',      prev: 13, current: 15, change: -2 },
];

// Yükselen keyword'ler (28/09/2026)
const APP_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'hastane randevu',   prev: 218, current: 51,  change: 167 },
  { keyword: 'terapi',            prev: 117, current: 61,  change: 56  },
  { keyword: 'diyetisyen',        prev: 114, current: 63,  change: 51  },
  { keyword: 'neyim var',         prev: 125, current: 106, change: 19  },
  { keyword: 'eczaneler',         prev: 189, current: 173, change: 16  },
  { keyword: 'serum',             prev: 236, current: 230, change: 6   },
  { keyword: 'sağlık hizmetleri', prev: 27,  current: 26,  change: 1   },
  { keyword: 'online psikolog',   prev: 56,  current: 55,  change: 1   },
];

// Yeni görünürlük kazanan keyword'ler (28/09/2026)
const APP_STORE_NEW: KeywordRankRow[] = [
  { keyword: 'ecza',       prev: -1, current: 27,  change: 0 },
  { keyword: 'hizmetleri', prev: -1, current: 248, change: 0 },
];

// Zayıflayan / takip edilecek keyword'ler (28/09/2026)
const APP_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'medical',          prev: 115, current: 241, change: -126 },
  { keyword: 'doktor',           prev: 133, current: 199, change: -66  },
  { keyword: 'nöbetçi',          prev: 155, current: 181, change: -26  },
  { keyword: 'randevu al',       prev: 25,  current: 38,  change: -13  },
  { keyword: 'online diyetisyen', prev: 21, current: 28,  change: -7   },
  { keyword: 'sağlık hizmeti',   prev: 21,  current: 27,  change: -6   },
  { keyword: 'hastane',          prev: 99,  current: 103, change: -4   },
  { keyword: 'medical park',     prev: 13,  current: 15,  change: -2   },
];

// 28/09/2026 snapshot
const PLAY_STORE_KPIS: ASOKpiCard[] = [
  { label: 'Top 1 Rankings',      value: 0    },
  { label: 'Top 10 Rankings',     value: 0    },
  { label: 'Top 30 Rankings',     value: 3    },
  { label: 'Top 100 Rankings',    value: 5    },
  { label: 'Ortalama Puan',       value: '4.80' },
  { label: 'Yeni Değerlendirme',  value: 11   },
];

// Çekirdek / güçlü keyword'ler (28/09/2026)
const PLAY_STORE_TOP: KeywordRankRow[] = [
  { keyword: 'happ',                        prev: 13,  current: 11,  change: 2   },
  { keyword: 'dijital sağlık',              prev: 20,  current: 21,  change: -1  },
  { keyword: 'evde sağlık',                 prev: 3,   current: 21,  change: -18 },
  { keyword: 'check-up',                    prev: 37,  current: 37,  change: 0   },
  { keyword: 'görüntülü doktor görüşmesi',  prev: 45,  current: 89,  change: -44 },
  { keyword: 'nöbetçi eczane',              prev: 100, current: 108, change: -8  },
  { keyword: 'evde doktor',                 prev: 1,   current: 115, change: -114 },
  { keyword: 'online muayene',              prev: 167, current: 118, change: 49  },
  { keyword: 'hastane',                     prev: 159, current: 131, change: 28  },
  { keyword: 'hastane randevu',             prev: 154, current: 152, change: 2   },
];

// Yükselen keyword'ler (28/09/2026)
const PLAY_STORE_RISING: KeywordRankRow[] = [
  { keyword: 'online muayene',              prev: 167, current: 118, change: 49  },
  { keyword: 'hastane',                     prev: 159, current: 131, change: 28  },
  { keyword: 'happ',                        prev: 13,  current: 11,  change: 2   },
  { keyword: 'hastane randevu',             prev: 154, current: 152, change: 2   },
];

// Yeni görünürlük kazanan keyword'ler (28/09/2026) — bu snapshot'ta yeni giriş yok
const PLAY_STORE_NEW: KeywordRankRow[] = [];

// Stabil keyword'ler (28/09/2026)
const PLAY_STORE_STABLE: KeywordRankRow[] = [
  { keyword: 'check-up',       prev: 37,  current: 37,  change: 0 },
  { keyword: 'video muayene',  prev: 160, current: 160, change: 0 },
];

// Zayıflayan / takip edilecek keyword'ler (28/09/2026)
const PLAY_STORE_WATCHLIST: KeywordRankRow[] = [
  { keyword: 'doktor randevusu',            prev: 63,  current: 200, change: -137 },
  { keyword: 'online doktor',               prev: 41,  current: 166, change: -125 },
  { keyword: 'evde doktor',                 prev: 1,   current: 115, change: -114 },
  { keyword: 'evde uyku testi',             prev: 94,  current: 174, change: -80  },
  { keyword: 'görüntülü doktor görüşmesi',  prev: 45,  current: 89,  change: -44  },
  { keyword: 'doktor randevusu al',         prev: 113, current: 157, change: -44  },
  { keyword: 'check up',                    prev: 1,   current: -1,  change: 0    },
  { keyword: 'sağlık',                      prev: 39,  current: -1,  change: 0    },
  { keyword: 'online terapi',               prev: 186, current: -1,  change: 0    },
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
        note="28 Eylül itibarıyla App Store'da core hizmet görünürlüğü güçlü ve stabil kalmaya devam ediyor. 'evde doktor' #1, 'checkup' #2, 'online muayene' #3 ve Check-Up varyasyonları #4 bandında yer alıyor. Marka kelimesi 'happ' #13'te konumunu koruyor. App Store tarafında ana hizmet ve Check-Up keyword'leri güçlü konumlarını korurken, generic sorgularda önemli yeniden sıralanmalar görülüyor. Hastane randevu, terapi ve diyetisyen tarafındaki kazanımlar yeni organik keşif fırsatları yaratırken; doktor, medical ve randevu al kelimelerindeki gerilemeler takip edilmesi gereken ana alanlar."
        topRows={APP_STORE_TOP}
        topInsight="Core hizmet keyword'lerinde görünürlük güçlü ve büyük ölçüde stabil. 'evde doktor' #1, 'checkup' #2, 'online muayene' #3 ve Check-Up varyasyonları #4 seviyesinde kalırken marka kelimesi 'happ' #13'te stabil."
        risingRows={APP_STORE_RISING}
        risingInsight="Generic sorgularda haftanın en güçlü kazanımlı 'hastane randevu' kelimesinde gerçekleşti; 218. sıradan 51. sıraya çıkarak +167 sıra kazandı. 'terapi' +56 ve 'diyetisyen' +51 ile güçlü yükseliş gösterirken, 'medical' -126 ve 'doktor' -66 ile en önemli gerileme alanları oldu."
        newRows={APP_STORE_NEW}
        newInsight="28/09/2026 snapshotunda 'ecza' (unranked → #27) ve 'hizmetleri' (unranked → #248) yeniden sıralamaya girerek pozitif sinyal verdi."
        watchlistRows={APP_STORE_WATCHLIST}
        watchlistInsight="En büyük gerilemeler 'medical' (-126), 'doktor' (-66), 'nöbetçi' (-26) ve 'randevu al' (-13) kelimelerinde görüldü. 'online diyetisyen' (-7) ve 'sağlık hizmeti' (-6) de takip edilmeli. Bu kümeler sonraki optimizasyon döneminde izlenmeli."
        risingTitle="Yükselen Keyword'ler (22/09 → 28/09/2026)"
        dateLabel="28/09/2026"
      />

      <StoreSection
        store="playstore"
        kpis={PLAY_STORE_KPIS}
        note="28 Eylül itibarıyla Android ASO tarafında keyword görünürlüğü haftalık bazda oldukça volatil seyretti. Marka kelimesi 'happ' 13'ten 11. sıraya yükselirken, 'online muayene' +49 ve 'hastane' +28 sıra ile haftanın en güçlü kazanımlarını üretti. Buna karşılık doktor ve sağlık hizmeti odaklı bazı kritik sorgularda sert kayıplar görüldü. 'doktor randevusu' -137, 'online doktor' -125 ve 'evde doktor' -114 sıra gerilerken; 'check up', 'sağlık' ve 'online terapi' sıralama dışına çıktı. Bu keyword seti bir sonraki ASO optimizasyonunda öncelikli takip alanı olmalı. Keyword sıralamaları kısa dönemlerde yüksek volatilite gösterebilir. Büyük hareketler sonraki snapshot'larda doğrulanarak kalıcı trend olarak değerlendirilmelidir."
        topRows={PLAY_STORE_TOP}
        topInsight="Google Play tarafında bu hafta marka görünürlüğü iyileşirken generic hizmet keyword'lerinde karışık bir tablo oluştu. Online muayene ve hastane sorguları güçlenirken doktor, randevu ve bazı sağlık hizmeti sorgularında önemli kayıplar görüldü. Öncelik; sıralama dışına çıkan 'check up' ve 'sağlık' ile sert düşen 'evde doktor', 'online doktor' ve 'doktor randevusu' kelimelerinin sonraki ölçümlerde doğrulanması ve metadata / keyword targeting açısından incelenmesi."
        risingRows={PLAY_STORE_RISING}
        risingInsight="Haftanın en güçlü kazanımları: 'online muayene' +49, 'hastane' +28, 'happ' +2 ve 'hastane randevu' +2 sıra yükseldi."
        stableRows={PLAY_STORE_STABLE}
        stableInsight="Stabil kalan keyword'ler: 'check-up' #37'de ve 'video muayene' #160'da konumunu korudu."
        newRows={PLAY_STORE_NEW}
        newInsight=""
        watchlistRows={PLAY_STORE_WATCHLIST}
        watchlistInsight="En büyük gerilemeler: 'doktor randevusu' -137, 'online doktor' -125, 'evde doktor' -114 ve 'evde uyku testi' -80. 'check up', 'sağlık' ve 'online terapi' sıralama dışına çıktı. Bu keyword seti bir sonraki ASO optimizasyonunda öncelikli takip alanı olmalı."
        risingTitle="Yükselen Keyword'ler (22/09 → 28/09/2026)"
        dateLabel="28/09/2026"
      />

      <ASOInsightBox />
    </div>
  );
}
