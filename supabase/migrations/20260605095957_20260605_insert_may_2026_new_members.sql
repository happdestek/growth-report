-- Insert May 2026 new members data
INSERT INTO growth_new_members_monthly (month_start, ios, android, checkup_link, web, total)
VALUES ('2026-05-01', 466, 207, 0, 0, 673)
ON CONFLICT (month_start) DO UPDATE SET
  ios = EXCLUDED.ios,
  android = EXCLUDED.android,
  total = EXCLUDED.total;
