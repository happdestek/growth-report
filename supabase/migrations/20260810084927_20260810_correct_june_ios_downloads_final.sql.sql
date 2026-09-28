-- Correct June 2026 iOS downloads to final full-month total of 1172.
-- Previous values (40×4 + 39×26 = 1174) were based on incomplete data.
-- Final: 40×2 + 39×28 = 1172.

UPDATE growth_daily_metrics
SET ios_downloads = 39
WHERE date IN ('2026-06-03', '2026-06-04')
  AND ios_downloads = 40;
