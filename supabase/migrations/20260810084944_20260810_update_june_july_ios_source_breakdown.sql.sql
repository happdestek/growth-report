-- Overwrite June 2026 iOS source breakdown with final full-month values.
-- Source breakdown rows use a single date (2026-06-01) as aggregate bucket.
-- iOS: Paid (App+Web) = 975, Search = 149, Browse = 48 → total 1172.

UPDATE growth_source_breakdown
SET count = 975
WHERE date = '2026-06-01' AND platform = 'ios' AND channel = 'paid';

UPDATE growth_source_breakdown
SET count = 149
WHERE date = '2026-06-01' AND platform = 'ios' AND channel = 'search';

UPDATE growth_source_breakdown
SET count = 48
WHERE date = '2026-06-01' AND platform = 'ios' AND channel = 'browse';

-- Add July 2026 iOS source breakdown (single aggregate row dated 2026-07-01).
-- iOS: Paid (App+Web) = 552, Search = 106, Browse = 23 → total 681.

INSERT INTO growth_source_breakdown (date, platform, channel, count) VALUES
  ('2026-07-01', 'ios', 'paid',   552),
  ('2026-07-01', 'ios', 'search', 106),
  ('2026-07-01', 'ios', 'browse', 23)
ON CONFLICT DO NOTHING;
