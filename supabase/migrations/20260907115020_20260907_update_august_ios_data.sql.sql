/*
# Update August 2026 iOS Daily Downloads + Insert iOS Source Breakdown

1. Daily Metrics
   - Updates iOS downloads for August 2026 from 152 total to 639 total
   - Distribution: 21 for 19 days + 20 for 12 days = 399 + 240 = 639
   - Android downloads remain unchanged (2.038 total)
   - Web registrations remain unchanged (361 total)

2. iOS Source Breakdown for August 2026
   - paid (App Referrer 317 + Web Referrer 184 + Unavailable 1) = 502
   - search (App Store Search) = 119
   - browse (App Store Browse) = 18
   - Total = 502 + 119 + 18 = 639

3. Security
   - No RLS changes
*/

-- ── Update iOS daily downloads for August 2026 ──
UPDATE growth_daily_metrics
SET ios_downloads = CASE 
  WHEN date <= '2026-08-19' THEN 21 
  ELSE 20 
END
WHERE date >= '2026-08-01' AND date <= '2026-08-31';

-- ── Insert iOS Source Breakdown for August 2026 ──
-- paid = App Referrer (317) + Web Referrer (184) + Unavailable (1) = 502
-- search = 119, browse = 18
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-08-01', 'ios', 'paid',   502),
  ('2026-08-01', 'ios', 'search', 119),
  ('2026-08-01', 'ios', 'browse',  18)
ON CONFLICT DO NOTHING;
