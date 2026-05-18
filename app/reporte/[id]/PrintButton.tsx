'use client'

export default function PrintButton() {
  return (
    <button
      id="print-btn"
      onClick={() => window.print()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'rgba(41,151,255,.12)',
        border: '1px solid rgba(41,151,255,.28)',
        borderRadius: 9,
        padding: '8px 16px',
        color: '#2997FF',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: '-apple-system, sans-serif',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.background = 'rgba(41,151,255,.22)'
        el.style.borderColor = 'rgba(41,151,255,.5)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.background = 'rgba(41,151,255,.12)'
        el.style.borderColor = 'rgba(41,151,255,.28)'
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Descargar PDF
    </button>
  )
}
