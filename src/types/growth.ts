export interface DailyMetric {
  date: string;
  ios_downloads: number;
  android_downloads: number;
  web_registrations: number;
}

export interface SourceBreakdown {
  platform: 'ios' | 'android' | 'web';
  channel: 'paid' | 'organic' | 'search' | 'browse' | 'direct';
  count: number;
}

export interface MonthlySourceRow {
  channel: string;
  months: { name: string; count: number }[];
}

export interface MonthlySourceBreakdown {
  platform: 'ios' | 'android';
  rows: MonthlySourceRow[];
  monthNames: string[];
  partialLabels?: Record<string, string>;
}

export interface DownloadMonth {
  month: string;
  android: number;
  ios: number;
  partial?: boolean;
  partialLabel?: string;
}

export interface FunnelPlatformData {
  productPageViews: number;
  downloads: number;
  signups: number;
}

export interface FunnelData {
  downloads: number;
  registrations: number;
  activations: number;
  // Extended funnel fields
  total: FunnelPlatformData;
  ios: FunnelPlatformData;
  android: FunnelPlatformData;
}

export interface GrowthInsight {
  id?: string;
  period_start: string;
  period_end: string;
  growth_driver: string;
  platform_insight: string;
  paid_vs_organic_notes: string;
  anomaly: string;
}

export interface MonthlyMetrics {
  totalAppDownloads: number;
  iosDownloads: number;
  androidDownloads: number;
  webRegistrations: number;
  totalNewUsers: number;
}

export interface MonthlyKPIData {
  currentMonth: MonthlyMetrics;
  prevMonth: MonthlyMetrics;
  currentMonthName: string;
  prevMonthName: string;
}

export interface MonthlyTableRow {
  monthName: string;
  monthKey: string;
  totalDownloads: number;
  iosDownloads: number;
  androidDownloads: number;
  webRegistrations: number;
  partial?: boolean;
  partialLabel?: string;
}

export interface KPISummaryData {
  totalAppDownloads: number;
  iosDownloads: number;
  androidDownloads: number;
  webRegistrations: number;
  totalNewUsers: number;
  prevTotalAppDownloads: number;
  prevIosDownloads: number;
  prevAndroidDownloads: number;
  prevWebRegistrations: number;
  prevTotalNewUsers: number;
}

export interface NewMembersMonthly {
  month_start: string;
  android: number;
  checkup_link: number;
  ios: number;
  web: number;
  total: number;
}

export type DateRange = '7d' | '30d' | '90d';
export type Platform = 'all' | 'ios' | 'android' | 'web';
export type Channel = 'all' | 'paid' | 'organic';

export interface GrowthFilters {
  dateRange: DateRange;
  platform: Platform;
  channel: Channel;
}
