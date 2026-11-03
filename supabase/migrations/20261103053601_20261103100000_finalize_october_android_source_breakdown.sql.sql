/*
# Finalize October 2026 Android source breakdown

1. Data scope
- Replaces only the October 2026 Android source breakdown.
- September Android source data and all historical months remain unchanged.

2. Normalized source values
- Ads & Referrals: 2,384, including the one unmatched/unattributed download.
- Search: 22.
- Browse / Explore: 164.
- Total: 2,570.

3. Security
- No tables, columns, grants, or RLS policies are created or changed.

4. Important notes
- The raw Google Play source total is 2,569; the one-download difference is normalized into Ads & Referrals using the existing report logic.
- No separate Not attributed row is added.
*/

DELETE FROM growth_source_breakdown
WHERE platform = 'android'
  AND date >= '2026-10-01'
  AND date <= '2026-10-31';

INSERT INTO growth_source_breakdown (date, platform, channel, count) VALUES
  ('2026-10-01', 'android', 'paid', 2384),
  ('2026-10-01', 'android', 'search', 22),
  ('2026-10-01', 'android', 'browse', 164);
