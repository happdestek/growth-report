import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import {
  DailyMetric,
  SourceBreakdown,
  FunnelData,
  GrowthInsight,
  MonthlyKPIData,
  MonthlyTableRow,
  DownloadMonth,
  GrowthFilters,
  MonthlySourceBreakdown,
  NewMembersMonthly,
} from '../types/growth';

const LATEST_MONTH = new Date(2026, 7, 1);

function pad(n: number) { return String(n).padStart(2, '0'); }

function getMonthBounds(offsetMonths: number = 0): { start: string; end: string; name: string } {
  const y = LATEST_MONTH.getFullYear();
  const m = LATEST_MONTH.getMonth() - offsetMonths;
  const first = new Date(y, m, 1);
  const last  = new Date(y, m + 1, 0);
  const start = `${first.getFullYear()}-${pad(first.getMonth() + 1)}-01`;
  const end   = `${last.getFullYear()}-${pad(last.getMonth() + 1)}-${pad(last.getDate())}`;
  const name  = first.toLocaleString('en-US', { month: 'long' });
  return { start, end, name };
}

function sumRows(rows: DailyMetric[]) {
  return {
    totalAppDownloads: rows.reduce((s, d) => s + d.ios_downloads + d.android_downloads, 0),
    iosDownloads: rows.reduce((s, d) => s + d.ios_downloads, 0),
    androidDownloads: rows.reduce((s, d) => s + d.android_downloads, 0),
    webRegistrations: rows.reduce((s, d) => s + d.web_registrations, 0),
    totalNewUsers: rows.reduce((s, d) => s + d.ios_downloads + d.android_downloads + d.web_registrations, 0),
  };
}

export function useGrowthData(filters: GrowthFilters) {
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
  const [sourceData, setSourceData] = useState<SourceBreakdown[]>([]);
  const [monthlySourceBreakdown, setMonthlySourceBreakdown] = useState<MonthlySourceBreakdown[]>([]);
  const [newMembers, setNewMembers] = useState<NewMembersMonthly[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [prevFunnelData, setPrevFunnelData] = useState<FunnelData | null>(null);
  const [insight, setInsight] = useState<GrowthInsight | null>(null);
  const [monthlyKpis, setMonthlyKpis] = useState<MonthlyKPIData | null>(null);
  const [monthlyTable, setMonthlyTable] = useState<MonthlyTableRow[]>([]);
  const [downloadMonths, setDownloadMonths] = useState<DownloadMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingInsight, setSavingInsight] = useState(false);
  const [signupAvailable, setSignupAvailable] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const curr = getMonthBounds(0);
    const prev = getMonthBounds(1);
    const twoAgo = getMonthBounds(2);
    const threeAgo = getMonthBounds(3);

    const latestEnd = new Date(2026, 7, 31);
    const last30Start = new Date(latestEnd.getTime() - 30 * 86400000).toISOString().split('T')[0];
    const todayStr = latestEnd.toISOString().split('T')[0];

    const sepStart = '2026-09-01';
    const sepEnd = '2026-09-30';

    const [
      { data: currMonthData },
      { data: prevMonthData },
      { data: twoAgoData },
      { data: threeAgoData },
      { data: sepMonthData },
      { data: dailyData },
      { data: sources },
      { data: sourcesPrev },
      { data: sourcesTwoAgo },
      { data: sourcesThreeAgo },
      { data: sourcesSep },
      { data: insightRow },
      { data: newMembersData },
    ] = await Promise.all([
      supabase.from('growth_daily_metrics').select('*').gte('date', curr.start).lte('date', curr.end).order('date'),
      supabase.from('growth_daily_metrics').select('*').gte('date', prev.start).lte('date', prev.end).order('date'),
      supabase.from('growth_daily_metrics').select('*').gte('date', twoAgo.start).lte('date', twoAgo.end).order('date'),
      supabase.from('growth_daily_metrics').select('*').gte('date', threeAgo.start).lte('date', threeAgo.end).order('date'),
      supabase.from('growth_daily_metrics').select('*').gte('date', sepStart).lte('date', sepEnd).order('date'),
      supabase.from('growth_daily_metrics').select('*').gte('date', last30Start).lte('date', todayStr).order('date'),
      supabase.from('growth_source_breakdown').select('platform, channel, count').gte('date', curr.start).lte('date', curr.end),
      supabase.from('growth_source_breakdown').select('platform, channel, count').gte('date', prev.start).lte('date', prev.end),
      supabase.from('growth_source_breakdown').select('platform, channel, count').gte('date', twoAgo.start).lte('date', twoAgo.end),
      supabase.from('growth_source_breakdown').select('platform, channel, count').gte('date', threeAgo.start).lte('date', threeAgo.end),
      supabase.from('growth_source_breakdown').select('platform, channel, count').gte('date', sepStart).lte('date', sepEnd),
      supabase.from('growth_insights').select('*').eq('period_start', curr.start).maybeSingle(),
      supabase.from('growth_new_members_monthly').select('*').order('month_start'),
    ]);

    const currRows = currMonthData ?? [];
    const prevRows = prevMonthData ?? [];
    const twoAgoRows = twoAgoData ?? [];
    const threeAgoRows = threeAgoData ?? [];
    const sepRows = sepMonthData ?? [];

    setMonthlyKpis({
      currentMonth: sumRows(currRows),
      prevMonth: sumRows(prevRows),
      currentMonthName: curr.name,
      prevMonthName: prev.name,
    });

    const toTableRow = (rows: DailyMetric[], monthName: string, monthKey: string): MonthlyTableRow => {
      const s = sumRows(rows);
      return { monthName, monthKey, totalDownloads: s.totalAppDownloads, iosDownloads: s.iosDownloads, androidDownloads: s.androidDownloads, webRegistrations: s.webRegistrations };
    };
    setMonthlyTable([
      toTableRow(threeAgoRows, threeAgo.name, threeAgo.start),
      toTableRow(twoAgoRows, twoAgo.name, twoAgo.start),
      toTableRow(prevRows, prev.name, prev.start),
      toTableRow(currRows, curr.name, curr.start),
    ]);

    const toDownloadMonth = (rows: DailyMetric[], name: string): DownloadMonth => ({
      month: name,
      android: rows.reduce((s, d) => s + d.android_downloads, 0),
      ios: rows.reduce((s, d) => s + d.ios_downloads, 0),
    });
    setDownloadMonths([
      toDownloadMonth(threeAgoRows, threeAgo.name),
      toDownloadMonth(twoAgoRows, twoAgo.name),
      toDownloadMonth(prevRows, prev.name),
      toDownloadMonth(currRows, curr.name),
      { ...toDownloadMonth(sepRows, 'September'), partial: true, partialLabel: 'MTD · 1–19 Sep (Android) / 1–28 Sep (iOS)' },
    ]);

    let filtered = dailyData ?? [];
    if (filters.platform !== 'all') {
      filtered = filtered.map(d => ({
        ...d,
        ios_downloads: filters.platform === 'ios' ? d.ios_downloads : 0,
        android_downloads: filters.platform === 'android' ? d.android_downloads : 0,
        web_registrations: filters.platform === 'web' ? d.web_registrations : 0,
      }));
    }
    setDailyMetrics(filtered);

    const sourceMap = new Map<string, number>();
    (sources ?? []).forEach(s => {
      const okPlatform = filters.platform === 'all' || s.platform === filters.platform;
      const okChannel = filters.channel === 'all' ||
        (filters.channel === 'paid' && s.channel === 'paid') ||
        (filters.channel === 'organic' && ['organic', 'search', 'browse', 'direct'].includes(s.channel));
      if (okPlatform && okChannel) {
        const key = `${s.platform}|${s.channel}`;
        sourceMap.set(key, (sourceMap.get(key) ?? 0) + s.count);
      }
    });
    setSourceData(
      Array.from(sourceMap.entries()).map(([key, count]) => {
        const [platform, channel] = key.split('|');
        return { platform: platform as SourceBreakdown['platform'], channel: channel as SourceBreakdown['channel'], count };
      })
    );

    const monthlySourceMonths = [
      { name: threeAgo.name, data: sourcesThreeAgo ?? [] },
      { name: twoAgo.name, data: sourcesTwoAgo ?? [] },
      { name: prev.name, data: sourcesPrev ?? [] },
      { name: curr.name, data: sources ?? [] },
      { name: 'September', data: sourcesSep ?? [] },
    ];
    const monthNames = monthlySourceMonths.map(m => m.name);

    const partialLabels: Record<string, string> = {
      September: 'Partial · Android 1–19 Sep / iOS 1–28 Sep',
    };

    const buildBreakdown = (platform: 'ios' | 'android'): MonthlySourceBreakdown => {
      const channels = platform === 'ios' ? ['paid', 'search', 'browse'] : ['paid', 'search', 'browse'];
      const rows = channels.map(channel => ({
        channel,
        months: monthlySourceMonths.map(m => ({
          name: m.name,
          count: m.data.filter(r => r.platform === platform && r.channel === channel).reduce((s, r) => s + r.count, 0),
        })),
      }));
      return { platform, rows, monthNames, partialLabels };
    };

    setMonthlySourceBreakdown([buildBreakdown('ios'), buildBreakdown('android')]);
    const newMembersRows = newMembersData ?? [];
    setNewMembers(newMembersRows);

    if (currRows.length > 0) {
      const iosDownloads = currRows.reduce((s, d) => s + d.ios_downloads, 0);
      const androidDownloads = currRows.reduce((s, d) => s + d.android_downloads, 0);
      const totalAppDL = iosDownloads + androidDownloads;
      const currMonth = curr.start;
      const currMemberRow = newMembersRows.find(r => r.month_start === currMonth);
      const iosSignups = currMemberRow ? currMemberRow.ios : 0;
      const androidSignups = currMemberRow ? currMemberRow.android : 0;
      const totalSignups = iosSignups + androidSignups;
      const appSignups = totalSignups;
      const activations = Math.round(appSignups * 0.64);
      const currSignupAvailable = !!currMemberRow;

      // August 2026 product page views (store listing data)
      const iosPPV = 6780;
      const androidPPV = 11433;

      setFunnelData({
        downloads: totalAppDL,
        registrations: appSignups,
        activations,
        total: { productPageViews: iosPPV + androidPPV, downloads: totalAppDL,   signups: totalSignups   },
        ios:   { productPageViews: iosPPV,              downloads: iosDownloads,  signups: iosSignups     },
        android: { productPageViews: androidPPV,        downloads: androidDownloads, signups: androidSignups },
      });
      setSignupAvailable(currSignupAvailable);
    }

    if (prevRows.length > 0) {
      const prevIosDownloads     = prevRows.reduce((s, d) => s + d.ios_downloads,     0);
      const prevAndroidDownloads = prevRows.reduce((s, d) => s + d.android_downloads, 0);
      const prevTotalDL          = prevIosDownloads + prevAndroidDownloads;
      const prevMemberRow        = newMembersRows.find(r => r.month_start === prev.start);
      const prevIosSignups       = prevMemberRow ? prevMemberRow.ios     : 0;
      const prevAndroidSignups   = prevMemberRow ? prevMemberRow.android : 0;
      const prevTotalSignups     = prevIosSignups + prevAndroidSignups;
      // July 2026 product page views (store listing data) — full month
      const prevIosPPV     = 13190;
      const prevAndroidPPV = 15654;
      setPrevFunnelData({
        downloads: prevTotalDL,
        registrations: prevTotalSignups,
        activations: Math.round(prevTotalSignups * 0.64),
        total:   { productPageViews: prevIosPPV + prevAndroidPPV, downloads: prevTotalDL,          signups: prevTotalSignups   },
        ios:     { productPageViews: prevIosPPV,                  downloads: prevIosDownloads,     signups: prevIosSignups     },
        android: { productPageViews: prevAndroidPPV,              downloads: prevAndroidDownloads, signups: prevAndroidSignups },
      });
    }

    setInsight(
      insightRow ?? {
        period_start: curr.start,
        period_end: curr.end,
        growth_driver: '',
        platform_insight: '',
        paid_vs_organic_notes: '',
        anomaly: '',
      }
    );
    setLoading(false);
  }, [filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const saveInsight = async (data: GrowthInsight) => {
    setSavingInsight(true);
    const { data: result } = await supabase
      .from('growth_insights')
      .upsert({ ...data, updated_at: new Date().toISOString() }, { onConflict: 'period_start,period_end' })
      .select()
      .maybeSingle();
    if (result) setInsight(result);
    setSavingInsight(false);
  };

  return { dailyMetrics, sourceData, monthlySourceBreakdown, newMembers, funnelData, prevFunnelData, insight, monthlyKpis, monthlyTable, downloadMonths, loading, savingInsight, saveInsight, signupAvailable };
}
