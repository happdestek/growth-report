-- Replace June source breakdown with Haziran MTD (1–16 Haziran 2026) values
DELETE FROM growth_source_breakdown WHERE date >= '2026-06-01' AND date <= '2026-06-30';

-- iOS source breakdown — Haziran MTD 1–16
-- Paid: App Referrer 536 + Web Referrer 14 = 550
-- Search: 5, Browse: 30
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-06-01', 'ios', 'paid',   550),
  ('2026-06-01', 'ios', 'search',   5),
  ('2026-06-01', 'ios', 'browse',  30);

-- Android source breakdown — Haziran MTD 1–16
-- Paid (Ads & Referrals): 796, Browse (Google Play explore): 148, Search: 24
INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-06-01', 'android', 'paid',   796),
  ('2026-06-01', 'android', 'search',  24),
  ('2026-06-01', 'android', 'browse', 148);
