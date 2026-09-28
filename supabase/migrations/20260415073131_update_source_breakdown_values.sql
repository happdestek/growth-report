/*
  # Update Source Download Breakdown Values

  Scales all daily rows for each platform/channel/month combination so that
  monthly totals match the values provided in the new reference table:

  iOS:
    - Paid (App + Web): Jan=944, Feb=862, Mar=944
    - Search:            Jan=195, Feb=116, Mar=164
    - Browse:            Jan=49,  Feb=35,  Mar=50

  Android:
    - Paid (Ads & Referrals): Jan=909, Feb=1264, Mar=1228
    - Search:                  Jan=31,  Feb=26,   Mar=49
    - Browse (Explore):        Jan=338, Feb=556,  Mar=614
*/

DO $$
DECLARE
  targets RECORD;
  current_sum BIGINT;
  scale_factor NUMERIC;
BEGIN
  FOR targets IN (
    SELECT *
    FROM (VALUES
      ('ios',     'paid',   '2026-01-01'::date, '2026-01-31'::date,  944),
      ('ios',     'paid',   '2026-02-01'::date, '2026-02-28'::date,  862),
      ('ios',     'paid',   '2026-03-01'::date, '2026-03-31'::date,  944),
      ('ios',     'search', '2026-01-01'::date, '2026-01-31'::date,  195),
      ('ios',     'search', '2026-02-01'::date, '2026-02-28'::date,  116),
      ('ios',     'search', '2026-03-01'::date, '2026-03-31'::date,  164),
      ('ios',     'browse', '2026-01-01'::date, '2026-01-31'::date,   49),
      ('ios',     'browse', '2026-02-01'::date, '2026-02-28'::date,   35),
      ('ios',     'browse', '2026-03-01'::date, '2026-03-31'::date,   50),
      ('android', 'paid',   '2026-01-01'::date, '2026-01-31'::date,  909),
      ('android', 'paid',   '2026-02-01'::date, '2026-02-28'::date, 1264),
      ('android', 'paid',   '2026-03-01'::date, '2026-03-31'::date, 1228),
      ('android', 'search', '2026-01-01'::date, '2026-01-31'::date,   31),
      ('android', 'search', '2026-02-01'::date, '2026-02-28'::date,   26),
      ('android', 'search', '2026-03-01'::date, '2026-03-31'::date,   49),
      ('android', 'browse', '2026-01-01'::date, '2026-01-31'::date,  338),
      ('android', 'browse', '2026-02-01'::date, '2026-02-28'::date,  556),
      ('android', 'browse', '2026-03-01'::date, '2026-03-31'::date,  614)
    ) AS t(platform, channel, period_start, period_end, target_count)
  ) LOOP
    SELECT COALESCE(SUM(count), 0)
    INTO current_sum
    FROM growth_source_breakdown
    WHERE platform = targets.platform
      AND channel  = targets.channel
      AND date    >= targets.period_start
      AND date    <= targets.period_end;

    IF current_sum > 0 THEN
      scale_factor := targets.target_count::NUMERIC / current_sum::NUMERIC;

      UPDATE growth_source_breakdown
      SET count = GREATEST(1, ROUND(count * scale_factor)::INTEGER)
      WHERE platform = targets.platform
        AND channel  = targets.channel
        AND date    >= targets.period_start
        AND date    <= targets.period_end;
    END IF;
  END LOOP;
END $$;
