import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: 36,
        background: '#0A0D18',
        border: '7px solid #2997FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Letra F */}
      <div style={{
        position: 'absolute',
        left: 22,
        top: 36,
        width: 62,
        height: 108,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Barra top F */}
        <div style={{ width: 62, height: 16, background: '#2997FF', borderRadius: 4 }} />
        {/* Barra media F */}
        <div style={{ width: 40, height: 14, background: '#2997FF', borderRadius: 4, marginTop: 12 }} />
        {/* Palo F */}
        <div style={{ width: 16, height: 46, background: '#2997FF', borderRadius: 4, marginTop: 6 }} />
      </div>

      {/* Divisor */}
      <div style={{ position: 'absolute', left: 88, top: 36, width: 6, height: 108, background: '#08090F' }} />

      {/* Letra D */}
      <div style={{
        position: 'absolute',
        left: 94,
        top: 36,
        width: 66,
        height: 108,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          width: 16,
          height: 108,
          background: '#BF5AF2',
          borderRadius: 4,
          flexShrink: 0,
        }} />
        <div style={{
          width: 50,
          height: 80,
          borderRadius: '0 32px 32px 0',
          background: 'transparent',
          border: '16px solid #BF5AF2',
          borderLeft: 'none',
          marginLeft: 0,
        }} />
      </div>
    </div>,
    { ...size },
  )
}
