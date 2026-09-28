-- Fix July 2026 total (was 0) and correct June 2026 total (was 2823, should be 2822).
UPDATE growth_new_members_monthly SET total = 2497 WHERE month_start = '2026-07-01';
UPDATE growth_new_members_monthly SET total = 2822 WHERE month_start = '2026-06-01';
