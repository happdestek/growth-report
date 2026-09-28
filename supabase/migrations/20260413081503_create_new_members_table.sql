/*
  # Create New Members Monthly Table

  ## Overview
  Adds a monthly new member (user registration) breakdown table with source channels:
  Android, Check-Up Link, iOS, and Web.

  ## New Tables

  ### growth_new_members_monthly
  Stores monthly new member counts per acquisition source.
  - `month_start` — first day of the month (unique per row)
  - `android` — new members via Android app
  - `checkup_link` — new members via Check-Up Link referral
  - `ios` — new members via iOS app
  - `web` — new members via web
  - `total` — total new members (computed or manual)

  ## Security
  - RLS enabled
  - Anonymous read access allowed (internal dashboard)

  ## Seed Data
  - January, February, March values from provided data
*/

CREATE TABLE IF NOT EXISTS growth_new_members_monthly (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month_start date NOT NULL UNIQUE,
  android int NOT NULL DEFAULT 0,
  checkup_link int NOT NULL DEFAULT 0,
  ios int NOT NULL DEFAULT 0,
  web int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_growth_new_members_month ON growth_new_members_monthly (month_start);

ALTER TABLE growth_new_members_monthly ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to new members"
  ON growth_new_members_monthly FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO growth_new_members_monthly (month_start, android, checkup_link, ios, web, total)
VALUES
  ('2026-01-01', 121, 1138, 226, 79,  1564),
  ('2026-02-01', 178, 1594, 349, 152, 2273),
  ('2026-03-01', 200, 1338, 416, 184, 2138)
ON CONFLICT (month_start) DO UPDATE SET
  android     = EXCLUDED.android,
  checkup_link = EXCLUDED.checkup_link,
  ios         = EXCLUDED.ios,
  web         = EXCLUDED.web,
  total       = EXCLUDED.total;
