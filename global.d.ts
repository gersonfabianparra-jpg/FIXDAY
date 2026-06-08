declare module '*.css' {}

interface Window {
  fbq: (
    action: 'init' | 'track' | 'trackCustom',
    event: string,
    params?: Record<string, unknown>
  ) => void
  _fbq?: unknown
}
