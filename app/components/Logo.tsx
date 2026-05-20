export default function Logo({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 34, height: 34 }}>
      <defs>
        <linearGradient id={`${id}bg`} x1="1" y1="1" x2="41" y2="41" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A0D18" />
          <stop offset="100%" stopColor="#060608" />
        </linearGradient>
        <linearGradient id={id} x1="4" y1="21" x2="38" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#2997FF" />
          <stop offset="100%" stopColor="#BF5AF2" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="40" height="40" rx="8" fill={`url(#${id}bg)`} stroke={`url(#${id})`} strokeWidth="1.5" />
      <path d="M 4 12 L 21 12 L 21 16 L 10 16 L 10 19 L 17 19 L 17 23 L 10 23 L 10 30 L 4 30 Z" fill={`url(#${id})`} />
      <path d="M 21 12 L 26 12 Q 38 12 38 21 Q 38 30 26 30 L 21 30 L 21 26 L 26 26 Q 32 26 32 21 Q 32 16 26 16 L 21 16 Z" fill={`url(#${id})`} />
      <line x1="21" y1="12" x2="21" y2="30" stroke="#08090F" strokeWidth="1.5" />
    </svg>
  )
}
