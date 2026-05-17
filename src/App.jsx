import { useState, useMemo } from 'react'
import { useFilteredGames } from './hooks/useFilteredGames'
import FilterPanel from './components/FilterPanel'
import KpiCards from './components/KpiCards'
import GenreBarChart from './components/charts/GenreBarChart'
import PlatformPieChart from './components/charts/PlatformPieChart'
import ReleasesLineChart from './components/charts/ReleasesLineChart'
import LLMSession from './components/LLMSession'

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [platforms, setPlatforms] = useState([])
  const [genres, setGenres]       = useState([])
  const [yearRange, setYearRange] = useState(null) // null = use meta defaults

  const filters = useMemo(() => ({
    platforms,
    genres,
    yearRange: yearRange || [1992, 2010],
  }), [platforms, genres, yearRange])

  const { filtered, loading, meta } = useFilteredGames(filters)

  // Init year range from meta once loaded
  const effectiveYearRange = yearRange || [meta.minYear, meta.maxYear]

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">G</div>
          Games Dashboard
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab${tab === 'dashboard' ? ' active' : ''}`} onClick={() => setTab('dashboard')}>
            Dashboard
          </button>
          <button className={`nav-tab${tab === 'llm' ? ' active' : ''}`} onClick={() => setTab('llm')}>
            LLM Session
          </button>
        </div>
      </nav>

      <main className="page">
        {tab === 'dashboard' ? (
          <>
            <h1 className="page-title">Games Industry, 1990–2010</h1>
            <p className="page-sub">
              Filter by platform, genre, and year range — all charts update in real time.
              Data cleaned to drop missing values and releases outside 1990–2010.
            </p>

            {loading ? (
              <p style={{ color: '#9ca3af', padding: '40px 0' }}>Loading data…</p>
            ) : (
              <>
                <FilterPanel
                  meta={meta}
                  platforms={platforms}
                  genres={genres}
                  yearRange={effectiveYearRange}
                  onPlatforms={setPlatforms}
                  onGenres={setGenres}
                  onYearRange={setYearRange}
                />
                <KpiCards data={filtered} />
                <div className="charts-row1">
                  <PlatformPieChart data={filtered} />
                  <GenreBarChart data={filtered} />
                </div>
                <div className="charts-row2">
                  <ReleasesLineChart data={filtered} />
                </div>
              </>
            )}
          </>
        ) : (
          <LLMSession />
        )}
      </main>
    </>
  )
}
