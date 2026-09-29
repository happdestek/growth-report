/*
# Update September 2026 New Members — Final Values

1. Data
- September 2026 new members row for growth_new_members_monthly.
- Check-up Link: 2109
- Android: 128
- iOS: 291
- Web: 239
- Total: 2767
2. Notes
- Replaces the previous partial September values (ios=174, android=95, checkup_link=0, web=0, total=269).
- September is still a partial month for downloads (iOS 1–28 Sep, Android 1–19 Sep) but signup values are now complete.
- No RLS changes.
*/

INSERT INTO growth_new_members_monthly (month_start, ios, android, checkup_link, web, total)
VALUES ('2026-09-01', 291, 128, 2109, 239, 2767)
ON CONFLICT (month_start) DO UPDATE SET
  ios = EXCLUDED.ios,
  android = EXCLUDED.android,
  checkup_link = EXCLUDED.checkup_link,
  web = EXCLUDED.web,
  total = EXCLUDED.total;