import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 7,
        background: 'linear-gradient(135deg, #0071E3 0%, #2997FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 900,
        color: 'white',
        letterSpacing: '-0.5px',
        fontFamily: 'sans-serif',
      }}
    >
      FD
    </div>,
    { ...size },
  )
}
