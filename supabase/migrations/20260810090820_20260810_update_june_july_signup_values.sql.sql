-- 1) Update June 2026 new members: android 233→234, checkup_link 1739→1737 (ios=507, web=344 already correct)
UPDATE growth_new_members_monthly
SET android = 234, checkup_link = 1737
WHERE month_start = '2026-06-01';

-- 2) Insert July 2026 new members
INSERT INTO growth_new_members_monthly (month_start, android, ios, web, checkup_link)
VALUES ('2026-07-01', 202, 241, 380, 1674)
ON CONFLICT (month_start) DO UPDATE
SET android = 202, ios = 241, web = 380, checkup_link = 1674;
