export default function FilterPanel({ meta, platforms, genres, yearRange, onPlatforms, onGenres, onYearRange }) {
  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val])

  const minPct = meta.minYear === meta.maxYear ? 0 : ((yearRange[0] - meta.minYear) / (meta.maxYear - meta.minYear)) * 100
  const maxPct = meta.minYear === meta.maxYear ? 100 : ((yearRange[1] - meta.minYear) / (meta.maxYear - meta.minYear)) * 100

  return (
    <div className="filters-grid">
      {/* Platform */}
      <div className="card">
        <div className="filter-header">
          <span className="section-label">Platform</span>
          <button className="reset-btn" onClick={() => onPlatforms([])}>Reset</button>
        </div>
        <div className="chips">
          {meta.platforms.map(p => (
            <button
              key={p}
              className={`chip${platforms.includes(p) ? ' active' : ''}`}
              onClick={() => toggle(platforms, onPlatforms, p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div className="card">
        <div className="filter-header">
          <span className="section-label">Genre</span>
          <button className="reset-btn" onClick={() => onGenres([])}>Reset</button>
        </div>
        <div className="chips">
          {meta.genres.map(g => (
            <button
              key={g}
              className={`chip${genres.includes(g) ? ' active' : ''}`}
              onClick={() => toggle(genres, onGenres, g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div className="card">
        <div className="filter-header">
          <span className="section-label">Year of Release</span>
          <button className="reset-btn" onClick={() => onYearRange([meta.minYear, meta.maxYear])}>Reset</button>
        </div>
        <div className="year-range">
          <div className="dual-range-wrap">
            <div className="dual-range-track" style={{
              background: `linear-gradient(to right, #e5e7eb ${minPct}%, #22c55e ${minPct}%, #22c55e ${maxPct}%, #e5e7eb ${maxPct}%)`
            }} />
            <input
              type="range"
              min={meta.minYear} max={meta.maxYear} value={yearRange[0]}
              onChange={e => { const v = +e.target.value; if (v <= yearRange[1]) onYearRange([v, yearRange[1]]) }}
            />
            <input
              type="range"
              min={meta.minYear} max={meta.maxYear} value={yearRange[1]}
              onChange={e => { const v = +e.target.value; if (v >= yearRange[0]) onYearRange([yearRange[0], v]) }}
            />
          </div>
          <div className="year-fields">
            <div className="year-field">{yearRange[0]}</div>
            <div className="year-field">{yearRange[1]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
