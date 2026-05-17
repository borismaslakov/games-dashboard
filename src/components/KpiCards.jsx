export default function KpiCards({ data }) {
  const total = data.length

  const avgCritic = total
    ? (data.reduce((s, g) => s + g.Critic_Score, 0) / total).toFixed(1)
    : '—'

  const avgUser = total
    ? (data.reduce((s, g) => s + g.User_Score, 0) / total).toFixed(1)
    : '—'

  const years = total ? [...new Set(data.map(g => g.Year_of_Release))] : []
  const avgPerYear = years.length
    ? (total / years.length).toFixed(1)
    : '—'

  const kpis = [
    { label: 'Total Games',          value: total.toLocaleString(), sub: 'in filtered dataset' },
    { label: 'Avg User Score',       value: avgUser,                sub: 'scale 0–10' },
    { label: 'Avg Critic Score',     value: avgCritic,              sub: 'scale 0–100' },
    { label: 'Avg Releases / Year',  value: avgPerYear,             sub: 'across filtered years' },
  ]

  return (
    <div className="kpi-grid">
      {kpis.map(k => (
        <div key={k.label} className="card">
          <span className="section-label">{k.label}</span>
          <div className="kpi-value">{k.value}</div>
          <div className="kpi-sub">{k.sub}</div>
        </div>
      ))}
    </div>
  )
}
