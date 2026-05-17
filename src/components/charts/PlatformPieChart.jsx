import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function PlatformPieChart({ data }) {
  const counts = {}
  data.forEach(g => { counts[g.Platform] = (counts[g.Platform] || 0) + 1 })
  const chartData = Object.entries(counts)
    .map(([platform, value]) => ({ platform, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="card" style={{ height: 360 }}>
      <div className="chart-header">
        <span className="section-label">Platform Distribution</span>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="platform" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={36} />
          <Tooltip
            formatter={v => [v, 'Games']}
            contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
            cursor={{ fill: '#f9fafb' }}
          />
          <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
