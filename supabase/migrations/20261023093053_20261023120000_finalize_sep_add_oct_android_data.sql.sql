-- ============================================================
-- Finalize September 2026 Android (full month) + add October 2026 Android MTD (1-19 Oct)
-- Do NOT touch iOS data or historical months.
-- ============================================================

-- 1) September Android daily downloads: update to full-month total of 1,857 across 30 days
--    Currently 1,162 across 30 days. Set all to 62, then bump 3 days down to 61.
--    27*62 + 3*61 = 1674 + 183 = 1857
UPDATE growth_daily_metrics
  SET android_downloads = 62
  WHERE date >= '2026-09-01' AND date <= '2026-09-30';

UPDATE growth_daily_metrics
  SET android_downloads = 61
  WHERE date IN ('2026-09-04','2026-09-05','2026-09-06');

-- 2) October Android daily downloads: 1,785 across Oct 1-19 (MTD)
--    Oct 20-31 stays android_downloads = 0 (not yet reported)
--    18*94 + 1*93 = 1692 + 93 = 1785
UPDATE growth_daily_metrics
  SET android_downloads = 94
  WHERE date >= '2026-10-01' AND date <= '2026-10-19';

UPDATE growth_daily_metrics
  SET android_downloads = 93
  WHERE date = '2026-10-01';

-- 3) Replace September Android source breakdown with final normalized values
--    Ads & Referrals (paid) = 1,590  (Paid and direct 1,320 + Not attributed 270)
--    Search                 = 0
--    Browse / Explore       = 267
DELETE FROM growth_source_breakdown
  WHERE platform = 'android' AND date >= '2026-09-01' AND date <= '2026-09-30';

INSERT INTO growth_source_breakdown (date, platform, channel, count) VALUES
  ('2026-09-01', 'android', 'paid',   1590),
  ('2026-09-01', 'android', 'search',    0),
  ('2026-09-01', 'android', 'browse',  267);

-- 4) Insert October Android source breakdown (MTD 1-19 Oct)
--    Ads & Referrals (paid) = 1,712  (Paid and direct 1,436 + Not attributed 276)
--    Search                 = 0
--    Browse / Explore       = 73
DELETE FROM growth_source_breakdown
  WHERE platform = 'android' AND date >= '2026-10-01' AND date <= '2026-10-31';

INSERT INTO growth_source_breakdown (date, platform, channel, count) VALUES
  ('2026-10-01', 'android', 'paid',   1712),
  ('2026-10-01', 'android', 'search',    0),
  ('2026-10-01', 'android', 'browse',   73);
