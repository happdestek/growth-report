/*
  # Update April 2026 Growth Data to Final Values

  Updates all April 2026 data to match final reported numbers:

  1. growth_daily_metrics: iOS 1.291, Android 1.642 (total 2.933)
  2. growth_source_breakdown:
     - iOS: paid 1.035, search 199, browse 56
     - Android: paid 1.425, search 48, browse 169
  3. growth_new_members_monthly:
     - Android 243, Checkup Link 1.588, iOS 603, Web 251, Total 2.685
*/

-- Update daily metrics for April 2026
UPDATE growth_daily_metrics
SET ios_downloads = 1291, android_downloads = 1642
WHERE date = '2026-04-23';

-- Update source breakdown for April 2026
UPDATE growth_source_breakdown
SET count = 1035
WHERE date = '2026-04-23' AND platform = 'ios' AND channel = 'paid';

UPDATE growth_source_breakdown
SET count = 199
WHERE date = '2026-04-23' AND platform = 'ios' AND channel = 'search';

UPDATE growth_source_breakdown
SET count = 56
WHERE date = '2026-04-23' AND platform = 'ios' AND channel = 'browse';

UPDATE growth_source_breakdown
SET count = 1425
WHERE date = '2026-04-23' AND platform = 'android' AND channel = 'paid';

UPDATE growth_source_breakdown
SET count = 48
WHERE date = '2026-04-23' AND platform = 'android' AND channel = 'search';

UPDATE growth_source_breakdown
SET count = 169
WHERE date = '2026-04-23' AND platform = 'android' AND channel = 'browse';

-- Update new members monthly for April 2026
UPDATE growth_new_members_monthly
SET android = 243, checkup_link = 1588, ios = 603, web = 251, total = 2685
WHERE month_start = '2026-04-01';
