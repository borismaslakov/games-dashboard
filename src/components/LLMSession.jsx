import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function LLMSession() {
  const [content, setContent] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/llm-session.md')
      .then(r => { if (!r.ok) throw new Error(); return r.text() })
      .then(setContent)
      .catch(() => setError(true))
  }, [])

  if (error) return (
    <div className="llm-session">
      <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
        LLM session log not found. Place <code>llm-session.md</code> in the <code>public/</code> folder.
      </p>
    </div>
  )

  if (!content) return (
    <div className="llm-session">
      <p style={{ color: '#9ca3af' }}>Loading session log…</p>
    </div>
  )

  return (
    <div className="llm-session">
      <a
        href="/llm-session.jsonl"
        download="llm-session.jsonl"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 13, fontWeight: 600, color: '#fff',
          background: '#22c55e', borderRadius: 8,
          padding: '10px 20px', marginBottom: 28, textDecoration: 'none',
        }}
      >
        ↓ Download llm-session.jsonl
      </a>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
