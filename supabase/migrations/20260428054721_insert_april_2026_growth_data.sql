/*
  # Insert April 2026 (1–23 Nisan) growth data

  1. growth_daily_metrics — one aggregate row for April 1–23 (date: 2026-04-23)
     Android: 1.331, iOS: 1.003

  2. growth_source_breakdown — April channel totals (6 rows, one per platform+channel)
     Android: paid=1145, browse=126, search=37
     iOS:     paid=806,  browse=46,  search=151

  3. growth_new_members_monthly — April new member row
     Android: 224, Check-Up Link: 1385, iOS: 550, Web: 214, Total: 2373
*/

-- growth_daily_metrics (unique on date)
INSERT INTO growth_daily_metrics (date, android_downloads, ios_downloads, web_registrations)
VALUES ('2026-04-23', 1331, 1003, 0)
ON CONFLICT (date) DO UPDATE SET
  android_downloads = EXCLUDED.android_downloads,
  ios_downloads     = EXCLUDED.ios_downloads;

-- growth_source_breakdown: delete any existing April rows first, then insert fresh
DELETE FROM growth_source_breakdown
WHERE date >= '2026-04-01' AND date <= '2026-04-30';

INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-04-23', 'android', 'paid',   1145),
  ('2026-04-23', 'android', 'browse', 126),
  ('2026-04-23', 'android', 'search', 37),
  ('2026-04-23', 'ios',     'paid',   806),
  ('2026-04-23', 'ios',     'browse', 46),
  ('2026-04-23', 'ios',     'search', 151);

-- growth_new_members_monthly (unique on month_start)
INSERT INTO growth_new_members_monthly (month_start, android, checkup_link, ios, web, total)
VALUES ('2026-04-01', 224, 1385, 550, 214, 2373)
ON CONFLICT (month_start) DO UPDATE SET
  android      = EXCLUDED.android,
  checkup_link = EXCLUDED.checkup_link,
  ios          = EXCLUDED.ios,
  web          = EXCLUDED.web,
  total        = EXCLUDED.total;
