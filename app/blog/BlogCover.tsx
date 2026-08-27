import type { ReactNode } from 'react'

/** Estilo visual por categoría: color de acento + ícono. Fuente única. */
export const CATEGORY_META: Record<string, { color: string; grad: string; icon: ReactNode }> = {
  'Mantención': {
    color: '#2997FF', grad: 'linear-gradient(135deg,#0A2540,#0A1830)',
    icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
  'Windows': {
    color: '#30D158', grad: 'linear-gradient(135deg,#0A2A16,#08160E)',
    icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  'Recuperación de datos': {
    color: '#BF5AF2', grad: 'linear-gradient(135deg,#23103A,#150A22)',
    icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>,
  },
  'Hardware': {
    color: '#FF9F0A', grad: 'linear-gradient(135deg,#3A2708,#1E1405)',
    icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>,
  },
  'Redes WiFi': {
    color: '#64D2FF', grad: 'linear-gradient(135deg,#0A2836,#08161E)',
    icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  },
  'Diseño Web': {
    color: '#5E5CE6', grad: 'linear-gradient(135deg,#161546,#0C0B26)',
    icon: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3M13 11h4"/></svg>,
  },
}

export function getCategoryMeta(category: string) {
  return CATEGORY_META[category] || CATEGORY_META['Mantención']
}

/** Portada generada por categoría (sin fotos): gradiente + ícono grande + patrón. */
export default function BlogCover({ category, height = 200, rounded = 0 }: { category: string; height?: number | string; rounded?: number }) {
  const m = getCategoryMeta(category)
  return (
    <div style={{ position: 'relative', height, borderRadius: rounded, overflow: 'hidden', background: m.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* halo de color */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '120%', height: '160%', background: `radial-gradient(ellipse at center, ${m.color}26 0%, transparent 60%)` }} />
      {/* rejilla sutil */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${m.color}0d 1px, transparent 1px), linear-gradient(90deg, ${m.color}0d 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: .5 }} />
      {/* ícono */}
      <div style={{ position: 'relative', width: 64, height: 64, color: m.color, filter: `drop-shadow(0 4px 16px ${m.color}55)` }}>
        <div style={{ width: '100%', height: '100%' }}>{m.icon}</div>
      </div>
    </div>
  )
}
