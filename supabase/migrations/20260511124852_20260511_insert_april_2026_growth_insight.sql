/*
  # Insert April 2026 Growth Insight

  Adds the monthly insight record for April 2026 with Turkish summary text.
*/

INSERT INTO growth_insights (period_start, period_end, growth_driver, platform_insight, paid_vs_organic_notes, anomaly, updated_at)
VALUES (
  '2026-04-01',
  '2026-04-30',
  'Nisan ayında toplam 2.933 app indirme elde edildi. Her iki platformda da büyümenin ana kaynağı paid trafik olmaya devam etti.',
  'iOS tarafında search katkısı anlamlı seviyede kalırken, Android tarafında indirmelerin büyük bölümü Ads & Referrals üzerinden geldi.',
  'App büyümesi ağırlıklı olarak paid ve yönlendirme kaynaklarıyla ilerlerken, organik search katkısının özellikle iOS tarafında daha anlamlı olduğu görülmektedir.',
  'Nisan ayında toplam yeni kullanıcı sayısı 2.685''e ulaştı. En büyük katkı Checkup Link kanalından gelmeye devam ederken, iOS, Android ve Web tarafında da önceki aylara kıyasla artış görüldü.',
  now()
)
ON CONFLICT (period_start, period_end) DO UPDATE
  SET growth_driver = EXCLUDED.growth_driver,
      platform_insight = EXCLUDED.platform_insight,
      paid_vs_organic_notes = EXCLUDED.paid_vs_organic_notes,
      anomaly = EXCLUDED.anomaly,
      updated_at = now();
