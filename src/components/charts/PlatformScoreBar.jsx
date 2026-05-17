import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts'

const COLORS = ['#60A5FA','#FB923C','#F472B6','#38BDF8','#FBBF24','#4ADE80','#A78BFA','#F87171','#E879F9','#86EFAC','#34D399','#FCD34D']

export default function PlatformScoreBar({ data }) {
  const totals = {}
  const counts = {}
  data.forEach(g => {
    totals[g.Platform] = (totals[g.Platform] || 0) + g.User_Score
    counts[g.Platform] = (counts[g.Platform] || 0) + 1
  })
  const chartData = Object.keys(totals)
    .map((p, i) => ({ platform: p, avg: +(totals[p] / counts[p]).toFixed(2), color: COLORS[i % COLORS.length] }))
    .sort((a, b) => b.avg - a.avg)

  return (
    <div className="card" style={{ height: 280 }}>
      <div className="chart-header">
        <span className="section-label">Avg User Score by Platform</span>
        <span className="chart-note">scale 0–10</span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="platform" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            formatter={v => [v, 'Avg User Score']}
            contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
            cursor={{ fill: '#f9fafb' }}
          />
          <Bar dataKey="avg" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
