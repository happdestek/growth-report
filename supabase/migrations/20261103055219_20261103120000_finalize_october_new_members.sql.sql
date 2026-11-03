/*
# Finalize October 2026 new members / sign-up data

1. Data scope
- Updates only the October 2026 row in growth_new_members_monthly.
- September 2026 and all historical months remain unchanged.

2. Final October values
- Web: 190
- iOS: 695
- Check-up Link: 2,202
- Android: 307
- Total: 3,394

3. Security
- No tables, columns, grants, or RLS policies are changed.
*/

UPDATE growth_new_members_monthly
SET web = 190,
    ios = 695,
    checkup_link = 2202,
    android = 307,
    total = 3394
WHERE month_start = '2026-10-01';
