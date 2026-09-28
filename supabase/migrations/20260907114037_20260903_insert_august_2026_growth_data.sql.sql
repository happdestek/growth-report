/*
# Insert August 2026 Growth Data

1. Daily Metrics
   - Inserts 31 daily rows for August 2026 (2026-08-01 to 2026-08-31)
   - Android downloads total: 2.038 (66/day for 2 days, 65/day for 29 days = 132 + 1885 = 2017... adjusted)
   - iOS downloads total: 152 (~5/day)
   - Web registrations total: 361 (~12/day)
   - Uses ON CONFLICT (date) DO UPDATE to be idempotent

2. Source Breakdown
   - Android: paid (Ads & Referrals) = 1.219, browse (Google Play Explore) = 778, search = 41
   - iOS source data not provided for August — left unchanged

3. New Members Monthly
   - August 2026: android=162, ios=152, web=361, checkup_link=2062, total=2737
   - Uses ON CONFLICT (month_start) DO UPDATE

4. Security
   - No RLS changes — existing policies remain unchanged
*/

-- ── Daily Metrics for August 2026 ──
-- Android total: 2038, iOS total: 152, Web total: 361
-- Distribution: android ~65.7/day, ios ~4.9/day, web ~11.6/day
-- We use 66 android for 2 days + 65 for 2 days + 65 for 27 days = 132 + 130 + 1755 = 2017... 
-- Simpler: 2038 / 31 = 65.74 → use 66 for 28 days and 65 for 3 days = 1848 + 195 = 2043 (too much)
-- Use 66 for 2 days (132) + 65 for 29 days (1885) = 2017... need 2038
-- 2038 = 66*2 + 65*27 + 64*2 = 132 + 1755 + 128 = 2015... 
-- Let's just do: 66 for 26 days (1716) + 65 for 5 days (325) = 2041... 
-- Simplest correct: 66*8 + 65*23 = 528 + 1495 = 2023... 
-- Use exact: 65 for 31 days = 2015, need 23 more → add 1 to 23 days → 66*23 + 65*8 = 1518 + 520 = 2038 ✓

INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT
  d::date AS date,
  -- iOS: 152 total → 5 for 2 days + 4 for 29 days = 10 + 116 = 126... 
  -- 5*4 + 4*27 = 20 + 108 = 128... 152/31 = 4.9 → 5*28 + 4*3 = 140+12=152 ✓
  CASE WHEN row_number() OVER (ORDER BY d) <= 28 THEN 5 ELSE 4 END AS ios_downloads,
  -- Android: 2038 total → 66*23 + 65*8 = 1518 + 520 = 2038 ✓
  CASE WHEN row_number() OVER (ORDER BY d) <= 23 THEN 66 ELSE 65 END AS android_downloads,
  -- Web: 361 total → 12*10 + 11*21 = 120 + 231 = 351... 12*19 + 11*12 = 228+132=360... 
  -- 12*20 + 11*11 = 240 + 121 = 361 ✓
  CASE WHEN row_number() OVER (ORDER BY d) <= 20 THEN 12 ELSE 11 END AS web_registrations
FROM generate_series('2026-08-01'::date, '2026-08-31'::date, '1 day'::interval) AS d
ON CONFLICT (date) DO UPDATE SET
  ios_downloads = EXCLUDED.ios_downloads,
  android_downloads = EXCLUDED.android_downloads,
  web_registrations = EXCLUDED.web_registrations;

-- ── Source Breakdown for August 2026 ──
-- Android: Ads & Referrals (paid) = 1219, Google Play Explore (browse) = 778, Search = 41
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-08-01', 'android', 'paid',   1219),
  ('2026-08-01', 'android', 'browse',  778),
  ('2026-08-01', 'android', 'search',   41)
ON CONFLICT DO NOTHING;

-- ── New Members Monthly for August 2026 ──
INSERT INTO growth_new_members_monthly (month_start, android, ios, web, checkup_link, total)
VALUES ('2026-08-01', 162, 152, 361, 2062, 2737)
ON CONFLICT (month_start) DO UPDATE SET
  android = EXCLUDED.android,
  ios = EXCLUDED.ios,
  web = EXCLUDED.web,
  checkup_link = EXCLUDED.checkup_link,
  total = EXCLUDED.total;
