/*
  # App & User Growth Dashboard Tables

  ## Overview
  Creates all tables needed to power the App & User Growth dashboard,
  including daily metrics, source breakdown, funnel data, and manual insights.

  ## New Tables

  ### growth_daily_metrics
  Stores aggregated daily download and registration counts per platform.
  - `date` — the calendar date (unique per row)
  - `ios_downloads` — iOS App Store downloads for that day
  - `android_downloads` — Google Play downloads for that day
  - `web_registrations` — new web signups for that day

  ### growth_source_breakdown
  Stores source/channel breakdown per day per platform.
  - `date` — the calendar date
  - `platform` — ios | android | web
  - `channel` — paid | organic | search | browse | direct
  - `count` — number of acquisitions from that source on that day

  ### growth_funnel_data
  Stores daily funnel stage counts (download → registration → activation).

  ### growth_insights
  Stores manually written insights per reporting period.
  Unique on (period_start, period_end).

  ## Security
  - RLS enabled on all tables
  - Anonymous read access allowed (public aggregate metrics)
  - Anonymous insert/update allowed on insights (internal tool, no auth)
*/

-- ─── Tables ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS growth_daily_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  ios_downloads int NOT NULL DEFAULT 0,
  android_downloads int NOT NULL DEFAULT 0,
  web_registrations int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS growth_source_breakdown (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  platform text NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  channel text NOT NULL CHECK (channel IN ('paid', 'organic', 'search', 'browse', 'direct')),
  count int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS growth_funnel_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  downloads int NOT NULL DEFAULT 0,
  registrations int NOT NULL DEFAULT 0,
  activations int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS growth_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start date NOT NULL,
  period_end date NOT NULL,
  growth_driver text NOT NULL DEFAULT '',
  spike_explanation text NOT NULL DEFAULT '',
  paid_vs_organic_notes text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  UNIQUE (period_start, period_end)
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_growth_daily_date ON growth_daily_metrics (date);
CREATE INDEX IF NOT EXISTS idx_growth_source_date ON growth_source_breakdown (date, platform, channel);
CREATE INDEX IF NOT EXISTS idx_growth_funnel_date ON growth_funnel_data (date);

-- ─── RLS ─────────────────────────────────────────────────────────────────────

ALTER TABLE growth_daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_source_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_funnel_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_insights ENABLE ROW LEVEL SECURITY;

-- Public aggregate metrics: allow anon and authenticated reads
CREATE POLICY "Public read access to daily metrics"
  ON growth_daily_metrics FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access to source breakdown"
  ON growth_source_breakdown FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access to funnel data"
  ON growth_funnel_data FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access to insights"
  ON growth_insights FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow insert insights"
  ON growth_insights FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow update insights"
  ON growth_insights FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ─── Seed Data ────────────────────────────────────────────────────────────────

-- 90 days of daily metrics with a gentle upward trend + noise
INSERT INTO growth_daily_metrics (date, ios_downloads, android_downloads, web_registrations)
SELECT
  d::date,
  GREATEST(40, (
    130
    + (extract(epoch from d - (CURRENT_DATE - INTERVAL '90 days')) / 86400) * 1.4
    + sin(extract(epoch from d) / 86400.0 * 1.2) * 35
    + (random() * 50 - 25)
  )::int),
  GREATEST(30, (
    105
    + (extract(epoch from d - (CURRENT_DATE - INTERVAL '90 days')) / 86400) * 1.0
    + cos(extract(epoch from d) / 86400.0 * 0.9) * 28
    + (random() * 40 - 20)
  )::int),
  GREATEST(15, (
    70
    + (extract(epoch from d - (CURRENT_DATE - INTERVAL '90 days')) / 86400) * 0.7
    + sin(extract(epoch from d) / 86400.0 * 0.7) * 20
    + (random() * 30 - 15)
  )::int)
FROM generate_series(CURRENT_DATE - INTERVAL '90 days', CURRENT_DATE, '1 day'::interval) AS d
ON CONFLICT (date) DO NOTHING;

-- Source breakdown seeded proportionally to daily totals
INSERT INTO growth_source_breakdown (date, platform, channel, count)
SELECT
  m.date,
  p.platform,
  p.channel,
  GREATEST(1, (
    CASE p.platform
      WHEN 'ios' THEN m.ios_downloads
      WHEN 'android' THEN m.android_downloads
      ELSE m.web_registrations
    END * p.share + (random() * 5 - 2)
  )::int)
FROM growth_daily_metrics m
CROSS JOIN (
  VALUES
    ('ios',     'paid',    0.30),
    ('ios',     'search',  0.42),
    ('ios',     'browse',  0.28),
    ('android', 'paid',    0.25),
    ('android', 'search',  0.45),
    ('android', 'browse',  0.30),
    ('web',     'paid',    0.22),
    ('web',     'organic', 0.52),
    ('web',     'direct',  0.26)
) AS p(platform, channel, share)
ON CONFLICT DO NOTHING;

-- Funnel data derived from daily metrics
INSERT INTO growth_funnel_data (date, downloads, registrations, activations)
SELECT
  date,
  ios_downloads + android_downloads AS downloads,
  GREATEST(1, ((ios_downloads + android_downloads) * 0.38 + web_registrations)::int) AS registrations,
  GREATEST(1, (((ios_downloads + android_downloads) * 0.38 + web_registrations) * 0.64)::int) AS activations
FROM growth_daily_metrics
ON CONFLICT (date) DO NOTHING;
