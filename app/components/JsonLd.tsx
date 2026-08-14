/**
 * Inyecta un bloque JSON-LD (schema.org) en el <head>/DOM.
 * Funciona igual en Server y Client Components.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
