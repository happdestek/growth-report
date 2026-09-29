/*
  September 2026 — Partial Month Growth Data

  Android: 01.09.2026 – 19.09.2026 (19 days)
    Total Downloads: 1.162
      Ads & Referrals (paid):  775  (66.7%)
      Google Play Explore (browse): 348  (29.9%)
      Google Play Search (search): 39  (3.4%)

  iOS: 01.09.2026 – 28.09.2026 (28 days)
    Total Downloads: 1.226
      App Referrer (paid):  910  (74.2%)
      Web Referrer (paid, merged): 163  (13.3%)
      App Store Search (search): 123  (10.0%)
      App Store Browse (browse): 28  (2.3%)
      Unavailable (paid, merged): 2  (0.2%)

  Web registrations: not provided for September — leave as 0.

  No RLS changes.
*/

-- ── Daily Metrics for September 2026 ──
-- Android: 1162 total over 19 days → 1162/19 = 61.2 → 62*4 + 61*15 = 248 + 915 = 1163 (off by 1)
-- Use 61*19 = 1159, need 3 more → 62*3 + 61*16 = 186 + 976 = 1162 ✓
-- iOS: 1226 total over 28 days → 1226/28 = 43.8 → 44*14 + 43*14 = 616 + 602 = 1218 (off by 8)
-- Use 44*22 + 43*6 = 968 + 258 = 1226 ✓
-- Web: 0 for all September days (no data)

INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT
  d::date AS date,
  CASE
    WHEN d::date <= '2026-09-28' THEN CASE WHEN row_number() OVER (ORDER BY d) <= 22 THEN 44 ELSE 43 END
    ELSE 0
  END AS ios_downloads,
  CASE
    WHEN d::date <= '2026-09-19' THEN CASE WHEN row_number() OVER (ORDER BY d) <= 3 THEN 62 ELSE 61 END
    ELSE 0
  END AS android_downloads,
  0 AS web_registrations
FROM generate_series('2026-09-01'::date, '2026-09-30'::date, '1 day'::interval) AS d
ON CONFLICT (date) DO UPDATE SET
  ios_downloads = EXCLUDED.ios_downloads,
  android_downloads = EXCLUDED.android_downloads,
  web_registrations = EXCLUDED.web_registrations;

-- ── Android Source Breakdown for September 2026 ──
-- paid (Ads & Referrals) = 775, browse (Google Play Explore) = 348, search = 39
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-09-01', 'android', 'paid',   775),
  ('2026-09-01', 'android', 'browse', 348),
  ('2026-09-01', 'android', 'search',  39)
ON CONFLICT DO NOTHING;

-- ── iOS Source Breakdown for September 2026 ──
-- paid (App Referrer 910 + Web Referrer 163 + Unavailable 2) = 1075
-- search (App Store Search) = 123
-- browse (App Store Browse) = 28
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-09-01', 'ios', 'paid',   1075),
  ('2026-09-01', 'ios', 'search',  123),
  ('2026-09-01', 'ios', 'browse',   28)
ON CONFLICT DO NOTHING;