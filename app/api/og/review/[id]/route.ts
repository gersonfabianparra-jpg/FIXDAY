import { ImageResponse } from 'next/og'
import { getSupabase } from '@/lib/supabase'
import React from 'react'

export const runtime = 'nodejs'

const e = React.createElement

function starPath(cx: number, cy: number, r: number, filled: boolean) {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2
    const radius = i % 2 === 0 ? r : r * 0.42
    pts.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`)
  }
  return e('polygon', {
    key: String(cx),
    points: pts.join(' '),
    fill: filled ? '#FF9F0A' : '#2C2C2E',
    style: { display: 'flex' },
  })
}

function Stars(rating: number, total = 5) {
  const size = 52
  const gap = 8
  const r = size / 2 - 2
  const width = total * size + (total - 1) * gap
  const stars = Array.from({ length: total }, (_, i) =>
    e('svg', {
      key: i,
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: { display: 'flex' },
    },
      starPath(size / 2, size / 2, r, i < rating),
    )
  )
  return e('div', { style: { display: 'flex', gap, width, alignItems: 'center' } }, ...stars)
}

function FDLogo() {
  return e('div', {
    style: {
      width: 56, height: 56, borderRadius: 14,
      background: 'linear-gradient(135deg, #0071E3, #2997FF)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
  },
    e('svg', {
      width: 36, height: 36,
      viewBox: '0 0 42 42',
      style: { display: 'flex' },
    },
      e('path', { d: 'M 4 8 L 20 8 L 20 13 L 10 13 L 10 17 L 17 17 L 17 22 L 10 22 L 10 32 L 4 32 Z', fill: '#ffffff' }),
      e('path', { d: 'M 22 8 L 28 8 Q 40 8 40 20 Q 40 32 28 32 L 22 32 L 22 27 L 28 27 Q 34 27 34 20 Q 34 13 28 13 L 22 13 Z', fill: '#BF5AF2' }),
    )
  )
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const sb = getSupabase()
  if (!sb) return new Response('Error', { status: 500 })

  const { data: r } = await sb.from('reviews').select('*').eq('id', params.id).single()
  if (!r) return new Response('Not found', { status: 404 })

  const text = r.review_text.length > 220 ? r.review_text.slice(0, 220) + '…' : r.review_text
  const initial = (r.client_name as string)[0].toUpperCase()

  return new ImageResponse(
    e('div', {
      style: {
        width: '1080px', height: '1080px', background: '#08090F',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '64px', position: 'relative',
      },
    },
      e('div', { style: { position: 'absolute', top: '-60px', right: '-60px', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(41,151,255,0.18) 0%, transparent 65%)', display: 'flex' } }),
      e('div', { style: { position: 'absolute', bottom: '-60px', left: '-60px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(191,90,242,0.14) 0%, transparent 65%)', display: 'flex' } }),

      e('div', {
        style: {
          background: '#111214', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '28px', padding: '56px',
          width: '100%', display: 'flex', flexDirection: 'column',
        },
      },
        e('div', { style: { marginBottom: 32, display: 'flex' } }, Stars(r.rating as number)),
        e('div', { style: { fontSize: 34, color: '#E5E5EA', lineHeight: 1.55, fontStyle: 'italic', marginBottom: 48, display: 'flex', flexWrap: 'wrap' } }, `"${text}"`),
        e('div', { style: { display: 'flex', alignItems: 'center', gap: 20 } },
          e('div', {
            style: {
              width: 68, height: 68, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0071E3, #2997FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, fontWeight: 700, color: '#fff',
            },
          }, initial),
          e('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            e('div', { style: { fontSize: 26, fontWeight: 700, color: '#F5F5F7', display: 'flex' } }, r.client_name as string),
            r.client_location
              ? e('div', { style: { fontSize: 20, color: '#636366', display: 'flex' } }, r.client_location as string)
              : null,
          ),
        ),
      ),

      e('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 36 } },
        e('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
          FDLogo(),
          e('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
            e('div', { style: { fontSize: 24, fontWeight: 800, color: '#F5F5F7', display: 'flex' } }, 'FIXDAY'),
            e('div', { style: { fontSize: 12, color: '#2997FF', letterSpacing: '3px', display: 'flex' } }, 'TÉCNICO A DOMICILIO'),
          ),
        ),
        e('div', { style: { fontSize: 18, color: '#48484A', display: 'flex' } }, 'fixday.cl'),
      ),
    ),
    { width: 1080, height: 1080 },
  )
}
