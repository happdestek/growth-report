-- ============================================================
-- Finalize September 2026 new member sign-ups + add October 2026 MTD
-- Do NOT touch June/July/August rows.
-- ============================================================

-- 1) Update September 2026 to final values
UPDATE growth_new_members_monthly
  SET web = 255,
      ios = 318,
      android = 141,
      checkup_link = 2222,
      total = 2936
  WHERE month_start = '2026-09-01';

-- 2) Insert October 2026 MTD row (if not exists, insert; if exists, update)
INSERT INTO growth_new_members_monthly (month_start, web, ios, android, checkup_link, total)
  VALUES ('2026-10-01', 141, 517, 206, 1576, 2440)
  ON CONFLICT (month_start) DO UPDATE
  SET web = EXCLUDED.web,
      ios = EXCLUDED.ios,
      android = EXCLUDED.android,
      checkup_link = EXCLUDED.checkup_link,
      total = EXCLUDED.total;
