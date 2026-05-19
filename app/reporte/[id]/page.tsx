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
  completado:     { label: 'Completado',     color: '#30D158' },
  en_proceso:     { label: 'En proceso',     color: '#FF9F0A' },
  pendiente:      { label: 'Pendiente',      color: '#636366' },
  sin_reparacion: { label: 'Sin reparación', color: '#FF453A' },
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
}

function LogoSVG() {
  return (
    <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32, flexShrink: 0 }}>
      <defs>
        <linearGradient id="rbg" x1="1" y1="1" x2="41" y2="41" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A0D18" />
          <stop offset="100%" stopColor="#060608" />
        </linearGradient>
        <linearGradient id="rgd" x1="4" y1="21" x2="38" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2997FF" />
          <stop offset="100%" stopColor="#BF5AF2" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="40" height="40" rx="8" fill="url(#rbg)" stroke="url(#rgd)" strokeWidth="1.5" />
      <path d="M 4 12 L 21 12 L 21 16 L 10 16 L 10 19 L 17 19 L 17 23 L 10 23 L 10 30 L 4 30 Z" fill="url(#rgd)" />
      <path d="M 21 12 L 26 12 Q 38 12 38 21 Q 38 30 26 30 L 21 30 L 21 26 L 26 26 Q 32 26 32 21 Q 32 16 26 16 L 21 16 Z" fill="url(#rgd)" />
      <line x1="21" y1="12" x2="21" y2="30" stroke="#08090F" strokeWidth="1.5" />
    </svg>
  )
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rfield">
      <div className="rlabel">{label}</div>
      <div className="rvalue" style={mono ? { fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#636366' } : undefined}>{value}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rsection">
      <div className="rsection-title">{title}</div>
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
  const reportNum = `#${String(report.report_number).padStart(3, '0')}`

  return (
    <div style={{ minHeight: '100vh', background: '#08090F', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', color: '#F5F5F7' }}>
      <style>{`
        .rlabel { font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #48484A; margin-bottom: 5px; }
        .rvalue { font-size: 15px; color: #E5E5EA; line-height: 1.6; }
        .rsection { margin-bottom: 28px; }
        .rsection-title { font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #48484A; margin-bottom: 12px; padding-bottom: 9px; border-bottom: 1px solid rgba(255,255,255,.06); }
        .rgrid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .rfield {}

        @media print {
          #no-print-nav, #no-print-cta, #no-print-footer, #print-btn { display: none !important; }
          #print-top-bar { display: flex !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          @page { margin: 8mm 12mm; size: A4 portrait; }
          body { background: #08090F !important; margin: 0 !important; }

          #print-body { padding: 12px 0 0 !important; }
          #print-hero { margin-bottom: 16px !important; }
          #print-hero-num { font-size: 38px !important; }
          #print-hero-label { font-size: 9px !important; margin-bottom: 8px !important; }
          #print-hero-date { font-size: 11px !important; margin-top: 6px !important; }
          #print-card { padding: 20px 24px !important; border-radius: 14px !important; box-shadow: none !important; }

          .rsection { margin-bottom: 14px !important; }
          .rsection-title { font-size: 8px !important; margin-bottom: 7px !important; padding-bottom: 5px !important; }
          .rlabel { font-size: 8px !important; margin-bottom: 3px !important; }
          .rvalue { font-size: 12px !important; }
          .rgrid2 { gap: 14px !important; }

          #print-billing { margin-top: 8px !important; padding-top: 16px !important; gap: 10px !important; }
          .bill-card { padding: 14px !important; border-radius: 12px !important; }
          .bill-label { font-size: 8px !important; margin-bottom: 6px !important; }
          .bill-value { font-size: 22px !important; }
          .bill-sub { font-size: 9px !important; margin-top: 3px !important; }

          p.rtext { font-size: 12px !important; line-height: 1.65 !important; }

          #print-rainbow { height: 2px !important; }
          #print-topbar-border { padding: 10px 16px !important; }
        }
      `}</style>

      {/* Rainbow bar */}
      <div id="print-rainbow" style={{ height: 3, background: 'linear-gradient(90deg, #0071E3, #2997FF, #BF5AF2, #2997FF, #0071E3)' }} />

      {/* Screen nav */}
      <div id="no-print-nav" style={{ borderBottom: '1px solid rgba(255,255,255,.07)', padding: '18px 0' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoSVG />
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

      {/* Print-only header */}
      <div id="print-top-bar" style={{ display: 'none' }}>
        <div id="print-topbar-border" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,.1)', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogoSVG />
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.02em', lineHeight: 1 }}>FIXDAY</div>
              <div style={{ fontSize: 9, color: '#2997FF', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, marginTop: 2 }}>Técnico a domicilio</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ background: `${status.color}18`, color: status.color, border: `1px solid ${status.color}38`, borderRadius: 980, padding: '4px 12px', fontSize: 10, fontWeight: 700 }}>
              {status.label}
            </span>
            <span style={{ fontSize: 11, color: '#636366' }}>fixday.cl</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div id="print-body" style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hero */}
        <div id="print-hero" style={{ textAlign: 'center', marginBottom: 44 }}>
          <div id="print-hero-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#48484A', marginBottom: 12 }}>
            Informe técnico oficial
          </div>
          <div id="print-hero-num" style={{ fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 60, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #2997FF 0%, #BF5AF2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-.02em' }}>
            {reportNum}
          </div>
          <div id="print-hero-date" style={{ fontSize: 13, color: '#636366', marginTop: 10 }}>
            Emitido el {fmtDate(report.created_at)}
          </div>
        </div>

        {/* Main card */}
        <div id="print-card" style={{ background: '#111214', border: '1px solid rgba(255,255,255,.08)', borderRadius: 22, padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,.45)' }}>

          <Section title="Cliente">
            <div className="rgrid2">
              <Field label="Nombre" value={report.client_name} />
              <Field label="Teléfono" value={report.client_phone} />
              {report.client_email && (
                <div style={{ gridColumn: '1/-1' }}>
                  <Field label="Correo" value={report.client_email} />
                </div>
              )}
            </div>
          </Section>

          <Section title="Equipo">
            <div className="rgrid2">
              <Field label="Tipo" value={report.equipment_type} />
              {report.brand_model && <Field label="Marca / Modelo" value={report.brand_model} />}
              {report.serial_number && <Field label="N° de serie" value={report.serial_number} mono />}
            </div>
          </Section>

          <Section title="Problema reportado">
            <p className="rtext" style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0 }}>{report.problem_reported}</p>
          </Section>

          {report.diagnosis && (
            <Section title="Diagnóstico técnico">
              <p className="rtext" style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0 }}>{report.diagnosis}</p>
            </Section>
          )}

          <Section title="Trabajo realizado">
            <p className="rtext" style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0, whiteSpace: 'pre-wrap' }}>{report.work_done}</p>
          </Section>

          {report.parts_used && (
            <Section title="Repuestos / materiales">
              <p className="rtext" style={{ fontSize: 14, lineHeight: 1.8, color: '#AEAEB2', margin: 0 }}>{report.parts_used}</p>
            </Section>
          )}

          {/* Cost + Warranty */}
          <div id="print-billing" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.07)' }}>
            <div className="bill-card" style={{ background: 'rgba(48,209,88,.06)', border: '1px solid rgba(48,209,88,.18)', borderRadius: 16, padding: '22px', textAlign: 'center' }}>
              <div className="bill-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#30D158', marginBottom: 8 }}>Total cobrado</div>
              <div className="bill-value" style={{ fontSize: 28, fontWeight: 800, color: '#30D158', lineHeight: 1 }}>
                {report.total_cost ? `$${report.total_cost.toLocaleString('es-CL')}` : 'Sin costo'}
              </div>
              {report.total_cost ? <div className="bill-sub" style={{ fontSize: 11, color: 'rgba(48,209,88,.5)', marginTop: 4 }}>CLP</div> : null}
            </div>
            <div className="bill-card" style={{ background: 'rgba(41,151,255,.06)', border: '1px solid rgba(41,151,255,.18)', borderRadius: 16, padding: '22px', textAlign: 'center' }}>
              <div className="bill-label" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#2997FF', marginBottom: 8 }}>Garantia</div>
              <div className="bill-value" style={{ fontSize: 28, fontWeight: 800, color: '#2997FF', lineHeight: 1 }}>
                {report.warranty_days}
              </div>
              <div className="bill-sub" style={{ fontSize: 11, color: 'rgba(41,151,255,.5)', marginTop: 4 }}>días</div>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div id="no-print-cta" style={{ marginTop: 36, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#48484A', marginBottom: 18 }}>¿Tienes alguna duda sobre tu informe?</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', borderRadius: 980, padding: '14px 30px', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,.3)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.855L.057 23.886a.5.5 0 0 0 .613.613l6.012-1.47A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.001-1.366l-.358-.214-3.712.908.935-3.613-.233-.37A9.808 9.808 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
            Contáctanos por WhatsApp
          </a>
        </div>

        {/* Footer */}
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
