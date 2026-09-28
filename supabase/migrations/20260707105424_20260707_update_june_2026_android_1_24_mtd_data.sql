-- Update June 2026 Android MTD from 1–22 to 1–24 Haziran (1607 total downloads)
-- Distribution: days 1–23 = 67, day 24 = 66, days 25–30 = 0
UPDATE growth_daily_metrics
SET android_downloads = CASE
  WHEN EXTRACT(DAY FROM date)::int <= 23 THEN 67
  WHEN EXTRACT(DAY FROM date)::int = 24  THEN 66
  ELSE 0
END
WHERE date >= '2026-06-01' AND date <= '2026-06-30';
