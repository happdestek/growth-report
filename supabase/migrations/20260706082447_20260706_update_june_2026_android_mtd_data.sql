-- Replace June 2026 data with correct iOS full-month + Android MTD (1–22) values
DELETE FROM growth_daily_metrics WHERE date >= '2026-06-01' AND date <= '2026-06-30';
DELETE FROM growth_source_breakdown WHERE date >= '2026-06-01' AND date <= '2026-06-30';

-- Daily metrics:
--   iOS full-month: 1174 total (days 1–4 = 40, days 5–30 = 39)
--   Android MTD 1–22: 1500 total (days 1–4 = 69, days 5–22 = 68, days 23–30 = 0)
INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT
  ('2026-06-01'::date + (gs.day - 1) * INTERVAL '1 day')::date AS date,
  CASE WHEN gs.day <= 4 THEN 40 ELSE 39 END                          AS ios_downloads,
  CASE WHEN gs.day <= 4 THEN 69 WHEN gs.day <= 22 THEN 68 ELSE 0 END AS android_downloads,
  CASE WHEN gs.day <= 22 THEN 7 ELSE 4 END                           AS web_registrations
FROM generate_series(1, 30) AS gs(day);

-- iOS source breakdown — full June 2026
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-06-01', 'ios', 'paid',   975),
  ('2026-06-01', 'ios', 'search', 151),
  ('2026-06-01', 'ios', 'browse',  48);

-- Android source breakdown — MTD 1–22 Haziran 2026
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-06-01', 'android', 'paid',   1204),
  ('2026-06-01', 'android', 'search',   44),
  ('2026-06-01', 'android', 'browse',  252);

-- June 2026 new members (iOS full-month + Android/Web/CheckupLink MTD)
UPDATE growth_new_members_monthly
SET
  android      = 233,
  web          = 344,
  checkup_link = 1739,
  total        = 507 + 233 + 344 + 1739
WHERE month_start = '2026-06-01';
