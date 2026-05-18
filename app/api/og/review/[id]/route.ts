import { ImageResponse } from 'next/og'
import { getSupabase } from '@/lib/supabase'
import React from 'react'

export const runtime = 'nodejs'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const sb = getSupabase()
  if (!sb) return new Response('Error', { status: 500 })

  const { data: r } = await sb.from('reviews').select('*').eq('id', params.id).single()
  if (!r) return new Response('Not found', { status: 404 })

  const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)
  const text = r.review_text.length > 200 ? r.review_text.slice(0, 200) + '…' : r.review_text
  const initial = (r.client_name as string)[0].toUpperCase()

  const e = React.createElement

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
        e('div', { style: { fontSize: 44, color: '#FF9F0A', letterSpacing: '4px', marginBottom: 32, display: 'flex' } }, stars),
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
          e('div', {
            style: {
              width: 48, height: 48, borderRadius: '13px',
              background: 'linear-gradient(135deg, #0071E3, #2997FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 900, color: '#fff',
            },
          }, 'F'),
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
