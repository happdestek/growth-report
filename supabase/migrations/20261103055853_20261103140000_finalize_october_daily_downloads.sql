/*
# Finalize October 2026 daily app downloads

1. Scope
- Updates only October 2026 rows in `growth_daily_metrics`.
- September and all earlier monthly download records remain unchanged.
- No sign-up, keyword, source-breakdown, or other analytics data is changed.

2. Final October totals
- Android: 2,570 downloads across October 1–31.
- iOS: 2,524 downloads across October 1–31.
- Combined app downloads: 5,094.

3. Distribution
- Android is distributed as 83 downloads on October 1–28 and 82 downloads on October 29–31.
- iOS is distributed as 82 downloads on October 1–13 and 81 downloads on October 14–31.
- This keeps the existing daily metrics shape while making the monthly chart totals match the finalized October figures.

4. Security
- No tables, columns, grants, RLS policies, or access rules are changed.
*/

UPDATE growth_daily_metrics
SET android_downloads = CASE
  WHEN date >= '2026-10-01' AND date <= '2026-10-28' THEN 83
  WHEN date >= '2026-10-29' AND date <= '2026-10-31' THEN 82
  ELSE android_downloads
END,
    ios_downloads = CASE
  WHEN date >= '2026-10-01' AND date <= '2026-10-13' THEN 82
  WHEN date >= '2026-10-14' AND date <= '2026-10-31' THEN 81
  ELSE ios_downloads
END
WHERE date >= '2026-10-01'
  AND date <= '2026-10-31';