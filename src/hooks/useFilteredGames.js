import { useState, useEffect, useMemo } from 'react'

export function useFilteredGames(filters) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/games_clean.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  const meta = useMemo(() => {
    if (!data.length) return { platforms: [], genres: [], minYear: 1992, maxYear: 2010 }
    return {
      platforms: [...new Set(data.map(g => g.Platform))].sort(),
      genres: [...new Set(data.map(g => g.Genre))].sort(),
      minYear: Math.min(...data.map(g => g.Year_of_Release)),
      maxYear: Math.max(...data.map(g => g.Year_of_Release)),
    }
  }, [data])

  const filtered = useMemo(() => {
    let d = data
    if (filters.platforms.length) d = d.filter(g => filters.platforms.includes(g.Platform))
    if (filters.genres.length)    d = d.filter(g => filters.genres.includes(g.Genre))
    d = d.filter(g => g.Year_of_Release >= filters.yearRange[0] && g.Year_of_Release <= filters.yearRange[1])
    return d
  }, [data, filters])

  return { filtered, loading, meta }
}
