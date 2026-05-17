import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

const RATING_COLORS = {
  E:     '#22c55e',
  'E10+':'#60A5FA',
  T:     '#FBBF24',
  M:     '#F87171',
  'K-A': '#A78BFA',
  AO:    '#F472B6',
}

export default function ReleasesLineChart({ data }) {
  const ratings = [...new Set(data.map(g => g.Rating))].sort()
  const years   = [...new Set(data.map(g => g.Year_of_Release))].sort()

  const chartData = years.map(year => {
    const row = { year }
    const yearGames = data.filter(g => g.Year_of_Release === year)
    ratings.forEach(rating => {
      row[rating] = yearGames.filter(g => g.Rating === rating).length
    })
    return row
  })

  return (
    <div className="card" style={{ height: 360 }}>
      <div className="chart-header">
        <span className="section-label">Releases Over Time by Age Rating</span>
        <span className="chart-note">stacked</span>
      </div>
      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={chartData} margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
          <CartesianGrid stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={28} />
          <Tooltip contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
          <Legend
            iconType="circle"
            iconSize={7}
            wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
            formatter={v => <span style={{ color: '#6b7280' }}>{v}</span>}
          />
          {ratings.map((rating, i) => (
            <Bar
              key={rating}
              dataKey={rating}
              stackId="a"
              fill={RATING_COLORS[rating] || '#9ca3af'}
              radius={i === ratings.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
