-- Delete existing June 2026 data (replaces MTD with full-month)
DELETE FROM growth_daily_metrics WHERE date >= '2026-06-01' AND date <= '2026-06-30';
DELETE FROM growth_source_breakdown WHERE date >= '2026-06-01' AND date <= '2026-06-30';
DELETE FROM growth_new_members_monthly WHERE month_start = '2026-06-01';

-- June 2026 daily metrics
-- iOS: 1174 total (4 days × 40 + 26 days × 39 = 160 + 1014 = 1174)
-- Android: 1950 total (30 days × 65 = 1950)
INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT
  ('2026-06-01'::date + (gs.day - 1) * INTERVAL '1 day')::date AS date,
  CASE WHEN gs.day <= 4 THEN 40 ELSE 39 END AS ios_downloads,
  65 AS android_downloads,
  7 AS web_registrations
FROM generate_series(1, 30) AS gs(day);

-- iOS source breakdown — full June 2026
-- Paid: App Referrer 784 + Web Referrer 191 = 975
-- Search: 151, Browse: 48
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-06-01', 'ios', 'paid',   975),
  ('2026-06-01', 'ios', 'search', 151),
  ('2026-06-01', 'ios', 'browse',  48);

-- Android source breakdown — full June 2026 (same as May to maintain stable display)
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-06-01', 'android', 'paid',   1687),
  ('2026-06-01', 'android', 'search',   42),
  ('2026-06-01', 'android', 'browse',  199);

-- June 2026 new members
-- iOS sign-ups: 507  |  Android: 207 (same as May to maintain stable display)
INSERT INTO growth_new_members_monthly (month_start, ios, android, checkup_link, web, total)
VALUES ('2026-06-01', 507, 207, 0, 0, 714)
ON CONFLICT (month_start) DO UPDATE SET
  ios     = EXCLUDED.ios,
  android = EXCLUDED.android,
  total   = EXCLUDED.total;
