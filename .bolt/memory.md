# Project memory

## Product intent & audience

- App Growth & ASO analytics dashboard for tracking app store acquisition funnels (Google Play / App Store).
- Audience: internal product/management stakeholders monitoring growth KPIs.
- Focuses on app store funnel: Product Page View → App Download → App Sign-up.
- Separate sections exist for Check-up Link sign-ups, Web sign-ups, source breakdown tables, ASO keyword performance — app funnel excludes Web and Check-up Link.

## Brand personality & voice

- Professional, data-driven analytics tone.
- Turkish language used for UI labels, insights, and data summaries (e.g., "vs Eyl", "Toplam", platform insights).
- Insights are concise, executive-ready, and highlight platform-specific dynamics.

## Visual design & UX direction

- Vite + React + Tailwind CSS + Lucide React icons (no extra UI packages).
- Dashboard layout with tabs: Toplam / Android / iOS.
- Funnel stages display percentage badges on the right (MoM volume growth, labeled "↑ %X vs Eyl" or "+X% MoM") — distinct from funnel conversion-rate labels shown at the bottom.
- Turkish number formatting: comma as decimal separator, dot as thousands separator (e.g., 16.708, %34,7, +14,17 pp).
- One-decimal precision for badges and conversion-rate changes.
- Components: FunnelChart, ProductPageFunnelDashboard, data hooks pulling from DB.
- KPI cards, charts, tables for funnel metrics; platform-aware insight boxes that change per selected tab.

## Decisions, constraints & rationale

- October 2026 is the latest selected month; September 2026 is the comparison baseline.
- MoM volume growth badges ≠ funnel conversion rates — these concepts must not be mixed; distinction made explicit in UI.
- DB is source of truth for funnel values; hardcoded PPV values in hook match DB (iOS 10003/5333, Android 6705/7073).
- September totals: PPV 12.406 / downloads 3.303 / sign-ups 459. October totals: PPV 16.708 / downloads 5.234 / sign-ups 1.002.
- When updating existing sections, never duplicate cards/charts/tabs or create new parallel components — update in place.
- Sign-up in app funnel = Android + iOS only; Web and Check-up Link excluded.

## Open questions & assumptions

- Data is assumed persisted in DB with monthly granularity; future months may require same update pattern.
- PPV values appear hardcoded in hook while downloads/sign-ups come from DB — may need consolidation.
- Unclear whether funnel component is reusable across other product areas or specific to App Growth & ASO only.