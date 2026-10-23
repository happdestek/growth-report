/*
# Finalize September 2026 iOS + Add October 2026 MTD iOS Data

1. Changes
- Updates September 2026 iOS daily metrics to final full-month values (1,446 total over 30 days).
- Replaces September iOS source breakdown with final normalized values.
- Inserts October 2026 MTD iOS daily metrics (1,724 over Oct 1–21).
- Inserts October 2026 MTD iOS source breakdown.

2. September Final iOS
- Total: 1,446 downloads, 30 days
- Ads & Referrals: 1,276 · Search: 138 · Browse: 32

3. October MTD iOS (1–21 Oct 2026)
- Total: 1,724 downloads, 21 days
- Ads & Referrals: 1,544 · Search: 125 · Browse: 55
*/

-- ── September 2026 iOS: set 48 downloads per day for all 30 days, then bump first 6 to 49 ──
-- 48*30 = 1440, 6 extra = 1446 ✓
UPDATE growth_daily_metrics
SET ios_downloads = 48
WHERE date >= '2026-09-01' AND date <= '2026-09-30';

UPDATE growth_daily_metrics
SET ios_downloads = 49
WHERE date IN (
  '2026-09-01','2026-09-02','2026-09-03','2026-09-04','2026-09-05','2026-09-06'
);

-- ── September 2026 iOS source breakdown (final) ──
DELETE FROM growth_source_breakdown
WHERE date = '2026-09-01' AND platform = 'ios';

INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-09-01', 'ios', 'paid',   1276),
  ('2026-09-01', 'ios', 'search',  138),
  ('2026-09-01', 'ios', 'browse',   32);

-- ── October 2026 MTD iOS daily metrics (Oct 1–21, rest = 0) ──
-- 82*21 = 1722, first 2 days = 83 → 83*2 + 82*19 = 166 + 1558 = 1724 ✓
INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT d::date, 0, 0, 0
FROM generate_series('2026-10-01'::date, '2026-10-31'::date, '1 day'::interval) AS d
ON CONFLICT (date) DO NOTHING;

UPDATE growth_daily_metrics
SET ios_downloads = 82
WHERE date >= '2026-10-01' AND date <= '2026-10-21';

UPDATE growth_daily_metrics
SET ios_downloads = 83
WHERE date IN ('2026-10-01', '2026-10-02');

UPDATE growth_daily_metrics
SET ios_downloads = 0
WHERE date >= '2026-10-22' AND date <= '2026-10-31';

-- ── October 2026 MTD iOS source breakdown ──
DELETE FROM growth_source_breakdown
WHERE date = '2026-10-01' AND platform = 'ios';

INSERT INTO growth_source_breakdown (date, platform, channel, count)
VALUES
  ('2026-10-01', 'ios', 'paid',   1544),
  ('2026-10-01', 'ios', 'search',  125),
  ('2026-10-01', 'ios', 'browse',   55);