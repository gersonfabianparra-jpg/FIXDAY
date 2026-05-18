import { getSupabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import PrintButton from './PrintButton'

export const dynamic = 'force-dynamic'

interface Report {
  id: string
  report_number: number
  created_at: string
  client_name: string
  client_phone: string
  client_email?: string
  equipment_type: string
  brand_model?: string
  serial_number?: string
  problem_reported: string
  diagnosis?: string
  work_done: string
  parts_used?: string
  total_cost?: number
  warranty_days: number
  status: string
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  completado:     { label: 'Completado',    color: '#30D158' },
  en_proceso:     { label: 'En proceso',    color: '#FF9F0A' },
  pendiente:      { label: 'Pendiente',     color: '#636366' },
  sin_reparacion: { label: 'Sin reparación',color: '#FF453A' },
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#48484A', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 15, color: '#E5E5EA', lineHeight: 1.6 }}>{value}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#48484A', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  const sb = getSupabase()
  if (!sb) notFound()

  const { data: report, error } = await sb
    .from('reports')
    .select('*')
    .eq('id', params.id)
    .single<Report>()

  if (error || !report) notFound()

  const status = STATUS_MAP[report.status] ?? { label: report.status, color: '#636366' }
  const waMsg = `Hola, revisé mi informe técnico FIXDAY N°${String(report.report_number).padStart(3, '0')} y tengo una consulta.`
  const waUrl = `https://wa.me/56936649332?text=${encodeURIComponent(waMsg)}`

  return (
    <div style={{ minHeight: '100vh', background: '#08090F', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', color: '#F5F5F7' }}>
      <style>{`
        @media print {
          #no-print-nav, #no-print-cta, #no-print-footer, #print-btn { display: none !important; }
          #print-top-bar { display: block !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          @page { margin: 12mm 15mm; size: A4 portrait; }
          body { background: #08090F !important; }
        }
        #print-top-bar { display: none; }
      `}</style>

      {/* Rainbow top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #0071E3, #2997FF, #BF5AF2, #2997FF, #0071E3)' }} />

      {/* Nav (hidden on print) */}
      <div id="no-print-nav" style={{ borderBottom: '1px solid rgba(255,255,255,.07)', padding: '18px 0' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: '#fff' }}>F</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.02em', lineHeight: 1 }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, marginTop: 1 }}>Técnico a domicilio</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PrintButton />
            <span style={{ background: `${status.color}18`, color: status.color, border: `1px solid ${status.color}38`, borderRadius: 980, padding: '5px 14px', fontSize: 11, fontWeight: 700, letterSpacing: '.02em' }}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* Print-only compact header */}
      <div id="print-top-bar" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff' }}>F</div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.02em' }}>FIXDAY</span>
          <span style={{ fontSize: 10, color: '#2997FF', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600 }}>· Técnico a domicilio</span>
        </div>
        <span style={{ fontSize: 11, color: '#636366' }}>fixday.cl</span>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '44px 24px 80px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#48484A', marginBottom: 14 }}>
            Informe técnico oficial
          </div>
          <div style={{ fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 64, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #2997FF 0%, #BF5AF2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-.02em' }}>
            #{String(report.report_number).padStart(3, '0')}
          </div>
          <div style={{ fontSize: 13, color: '#636366', marginTop: 12 }}>
            Emitido el {fmtDate(report.created_at)}
          </div>
        </div>

        {/* Main card */}
        <div style={{ background: '#111214', border: '1px solid rgba(255,255,255,.08)', borderRadius: 24, padding: '36px', boxShadow: '0 24px 80px rgba(0,0,0,.45)' }}>

          {/* Client */}
          <Section title="Cliente">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Nombre" value={report.client_name} />
              <Field label="Teléfono" value={report.client_phone} />
              {report.client_email && (
                <div style={{ gridColumn: '1/-1' }}>
                  <Field label="Correo" value={report.client_email} />
                </div>
              )}
            </div>
          </Section>

          {/* Equipment */}
          <Section title="Equipo">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Tipo" value={report.equipment_type} />
              {report.brand_model && <Field label="Marca / Modelo" value={report.brand_model} />}
              {report.serial_number && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#48484A', marginBottom: 5 }}>N° de serie</div>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#636366' }}>{report.serial_number}</div>
                </div>
              )}
            </div>
          </Section>

          {/* Problem */}
          <Section title="Problema reportado">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0 }}>{report.problem_reported}</p>
          </Section>

          {/* Diagnosis */}
          {report.diagnosis && (
            <Section title="Diagnóstico técnico">
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0 }}>{report.diagnosis}</p>
            </Section>
          )}

          {/* Work done */}
          <Section title="Trabajo realizado">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0, whiteSpace: 'pre-wrap' }}>{report.work_done}</p>
          </Section>

          {/* Parts */}
          {report.parts_used && (
            <Section title="Repuestos / materiales utilizados">
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0 }}>{report.parts_used}</p>
            </Section>
          )}

          {/* Cost + Warranty */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ background: 'rgba(48,209,88,.06)', border: '1px solid rgba(48,209,88,.18)', borderRadius: 18, padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#30D158', marginBottom: 10 }}>Total cobrado</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#30D158', lineHeight: 1 }}>
                {report.total_cost ? `$${report.total_cost.toLocaleString('es-CL')}` : 'Sin costo'}
              </div>
              {report.total_cost ? <div style={{ fontSize: 11, color: 'rgba(48,209,88,.5)', marginTop: 5 }}>CLP</div> : null}
            </div>
            <div style={{ background: 'rgba(41,151,255,.06)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 18, padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#2997FF', marginBottom: 10 }}>🛡️ Garantía</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#2997FF', lineHeight: 1 }}>
                {report.warranty_days}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(41,151,255,.5)', marginTop: 5 }}>días</div>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA (hidden on print) */}
        <div id="no-print-cta" style={{ marginTop: 36, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#48484A', marginBottom: 18 }}>¿Tienes alguna duda sobre tu informe?</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '14px 30px', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,.3)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
            Contáctanos por WhatsApp
          </a>
        </div>

        {/* Footer (hidden on print) */}
        <div id="no-print-footer" style={{ marginTop: 60, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.05)', paddingTop: 28 }}>
          <div style={{ fontSize: 11, color: '#3A3A3C' }}>
            © {new Date().getFullYear()} FIXDAY · Servicio técnico a domicilio · Región Metropolitana, Chile
          </div>
          <a href="https://fixday.cl" style={{ display: 'inline-block', marginTop: 6, fontSize: 12, color: '#2997FF', textDecoration: 'none' }}>
            fixday.cl
          </a>
        </div>
      </div>
    </div>
  )
}
