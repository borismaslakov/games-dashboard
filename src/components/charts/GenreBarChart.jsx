import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const ACCENT = '#22c55e'

export default function GenreBarChart({ data }) {
  const counts = {}
  data.forEach(g => { counts[g.Genre] = (counts[g.Genre] || 0) + 1 })
  const chartData = Object.entries(counts)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="card" style={{ height: 360 }}>
      <div className="chart-header">
        <span className="section-label">Games by Genre</span>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16, top: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="genre" width={90} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={v => [v, 'Games']}
            contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
            cursor={{ fill: '#f9fafb' }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {chartData.map((_, i) => <Cell key={i} fill={ACCENT} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
