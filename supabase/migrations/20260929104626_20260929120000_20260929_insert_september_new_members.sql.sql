/*
# Insert September 2026 New Members (Partial MTD)

1. Data
- September 2026 new members row for growth_new_members_monthly.
- iOS sign-ups: 174 (MTD through partial month)
- Android sign-ups: 95 (MTD through partial month)
- Check-up Link: 0 (no data yet for September)
- Web: 0 (no data yet for September)
- Total: 269
2. Notes
- September is a partial month. iOS covers 1–28 Sep, Android covers 1–19 Sep.
- Sign-up values are MTD and should not be compared directly to full-month totals.
- No RLS changes.
*/

INSERT INTO growth_new_members_monthly (month_start, ios, android, checkup_link, web, total)
VALUES ('2026-09-01', 174, 95, 0, 0, 269)
ON CONFLICT (month_start) DO UPDATE SET
  ios = EXCLUDED.ios,
  android = EXCLUDED.android,
  checkup_link = EXCLUDED.checkup_link,
  web = EXCLUDED.web,
  total = EXCLUDED.total;
