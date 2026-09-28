-- Add July 2026 daily metrics (iOS total = 681, distributed across 31 days).
-- Android and web values set to 0 (July Android data not part of this update).
-- 30 days × 22 + 1 day × 21 = 660 + 21 = 681.

INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT
  d::date,
  CASE
    WHEN d::date = '2026-07-01' THEN 21
    ELSE 22
  END,
  0,
  0
FROM generate_series('2026-07-01'::date, '2026-07-31'::date, '1 day'::interval) AS d
ON CONFLICT (date) DO UPDATE
SET ios_downloads = EXCLUDED.ios_downloads,
    android_downloads = EXCLUDED.android_downloads,
    web_registrations = EXCLUDED.web_registrations;
