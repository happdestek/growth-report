/*
# Add Google Play Not attributed channel

1. Modified Tables
- `public.growth_source_breakdown`
- Extends the existing channel validation to accept `not_attributed`.
- No rows, existing columns, or existing platform data are deleted or renamed.

2. Security
- No RLS, grants, or policy changes are made.
- Existing access controls remain unchanged.

3. Important Notes
- `not_attributed` stores Google Play Console acquisitions that cannot be assigned to a specific traffic source.
- The application will keep this channel separate from Ads & Referrals.
*/

ALTER TABLE public.growth_source_breakdown
  DROP CONSTRAINT IF EXISTS growth_source_breakdown_channel_check;

ALTER TABLE public.growth_source_breakdown
  ADD CONSTRAINT growth_source_breakdown_channel_check
  CHECK (channel = ANY (ARRAY['paid'::text, 'organic'::text, 'search'::text, 'browse'::text, 'direct'::text, 'not_attributed'::text]));