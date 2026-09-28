-- 1) Correct June 2026 Android source breakdown to final full-month values.
--    Remove partial/MTD data. Final: Paid=1,785 (79.0%), Explore=474 (21.0%), total=2,259.
--    Delete the old search channel row (Android source has only Paid + Explore).

DELETE FROM growth_source_breakdown
WHERE date = '2026-06-01' AND platform = 'android' AND channel = 'search';

UPDATE growth_source_breakdown
SET count = 1785
WHERE date = '2026-06-01' AND platform = 'android' AND channel = 'paid';

UPDATE growth_source_breakdown
SET count = 474
WHERE date = '2026-06-01' AND platform = 'android' AND channel = 'browse';

-- 2) Update July 2026 Android source breakdown to final values.
--    Paid=1,581 (72.1%), Explore=611 (27.9%), total=2,192.

UPDATE growth_source_breakdown
SET count = 1581
WHERE date = '2026-07-01' AND platform = 'android' AND channel = 'paid';

UPDATE growth_source_breakdown
SET count = 611
WHERE date = '2026-07-01' AND platform = 'android' AND channel = 'browse';
