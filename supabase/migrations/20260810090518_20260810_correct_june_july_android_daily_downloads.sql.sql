-- Correct June 2026 Android daily downloads to final full-month total of 2,259.
-- Previous values were based on partial period (1,607 total).
-- Distribute across 30 days: 20 days × 76 + 10 days × 75 = 1,520 + 750 = 2,270... need exact.
-- 2,259 ÷ 30 = 75.3 → 9 days × 76 + 21 days × 75 = 684 + 1,575 = 2,259.

UPDATE growth_daily_metrics
SET android_downloads = CASE
  WHEN date <= '2026-06-09' THEN 76
  ELSE 75
END
WHERE date >= '2026-06-01' AND date <= '2026-06-30';

-- Correct July 2026 Android daily downloads to total 2,192 (was 2,259).
-- 2,192 ÷ 31 = 70.7 → 22 days × 71 + 9 days × 70 = 1,562 + 630 = 2,192.

UPDATE growth_daily_metrics
SET android_downloads = CASE
  WHEN date <= '2026-07-22' THEN 71
  ELSE 70
END
WHERE date >= '2026-07-01' AND date <= '2026-07-31';
