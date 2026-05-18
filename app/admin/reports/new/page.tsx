'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface FormData {
  client_name: string
  client_phone: string
  client_email: string
  equipment_type: string
  brand_model: string
  serial_number: string
  problem_reported: string
  diagnosis: string
  work_done: string
  parts_used: string
  total_cost: string
  warranty_days: string
  status: string
  notes: string
}

const inp = {
  width: '100%', background: '#1A1A1A', border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 10, padding: '12px 16px', color: '#F5F5F7',
  fontFamily: '-apple-system, sans-serif', fontSize: 14, outline: 'none',
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, color: '#636366',
  marginBottom: 7, letterSpacing: '.1em', textTransform: 'uppercase',
}
const card: React.CSSProperties = {
  background: '#161616', border: '1px solid rgba(255,255,255,.08)',
  borderRadius: 16, padding: '28px 28px', marginBottom: 16,
}
const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }
const fg: React.CSSProperties = { marginBottom: 16 }

export default function NewReportPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormData>({
    client_name: '', client_phone: '', client_email: '',
    equipment_type: '', brand_model: '', serial_number: '',
    problem_reported: '', diagnosis: '', work_done: '',
    parts_used: '', total_cost: '', warranty_days: '7',
    status: 'completado', notes: '',
  })

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload: Record<string, unknown> = {
        ...form,
        total_cost: form.total_cost ? parseInt(form.total_cost) : null,
        warranty_days: parseInt(form.warranty_days) || 7,
      }
      // Replace empty strings with null
      for (const k in payload) {
        if (payload[k] === '') payload[k] = null
      }
      const res = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/admin/reports')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }, [form, router])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F7', fontFamily: '-apple-system, sans-serif', padding: '0 0 80px' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.1)', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#0071E3,#2997FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>F</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em' }}>FIXDAY <span style={{ color: '#636366', fontWeight: 400, fontSize: 14 }}>/ Nuevo informe</span></span>
        </div>
        <Link href="/admin/reports" style={{ color: '#636366', fontSize: 14, textDecoration: 'none' }}>← Cancelar</Link>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 0' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 32, letterSpacing: '-.02em' }}>Nuevo informe técnico</h1>

        {/* Client */}
        <div style={card}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#636366', marginBottom: 20 }}>Datos del cliente</h3>
          <div style={row}>
            <div style={fg}>
              <label style={lbl}>Nombre *</label>
              <input style={inp} required value={form.client_name} onChange={set('client_name')} placeholder="Nombre completo" />
            </div>
            <div style={fg}>
              <label style={lbl}>Teléfono *</label>
              <input style={inp} required value={form.client_phone} onChange={set('client_phone')} placeholder="+56 9 XXXX XXXX" />
            </div>
          </div>
          <div style={fg}>
            <label style={lbl}>Correo electrónico</label>
            <input style={inp} type="email" value={form.client_email} onChange={set('client_email')} placeholder="cliente@ejemplo.com (opcional)" />
          </div>
        </div>

        {/* Equipment */}
        <div style={card}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#636366', marginBottom: 20 }}>Equipo</h3>
          <div style={row}>
            <div style={fg}>
              <label style={lbl}>Tipo de equipo *</label>
              <select style={{ ...inp, appearance: 'none' } as React.CSSProperties} required value={form.equipment_type} onChange={set('equipment_type')}>
                <option value="" disabled>Seleccionar…</option>
                <option>Notebook</option>
                <option>PC de escritorio</option>
                <option>iMac</option>
                <option>MacBook</option>
                <option>All-in-One</option>
                <option>Servidor</option>
                <option>Otro</option>
              </select>
            </div>
            <div style={fg}>
              <label style={lbl}>Marca / Modelo</label>
              <input style={inp} value={form.brand_model} onChange={set('brand_model')} placeholder="Ej: HP Pavilion 15" />
            </div>
          </div>
          <div style={fg}>
            <label style={lbl}>Número de serie</label>
            <input style={inp} value={form.serial_number} onChange={set('serial_number')} placeholder="S/N del equipo (opcional)" />
          </div>
        </div>

        {/* Technical */}
        <div style={card}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#636366', marginBottom: 20 }}>Informe técnico</h3>
          <div style={fg}>
            <label style={lbl}>Problema reportado por el cliente *</label>
            <textarea style={{ ...inp, minHeight: 80, resize: 'vertical' } as React.CSSProperties} required value={form.problem_reported} onChange={set('problem_reported')} placeholder="Describe el problema que reportó el cliente" />
          </div>
          <div style={fg}>
            <label style={lbl}>Diagnóstico técnico</label>
            <textarea style={{ ...inp, minHeight: 80, resize: 'vertical' } as React.CSSProperties} value={form.diagnosis} onChange={set('diagnosis')} placeholder="Resultado del diagnóstico técnico (opcional)" />
          </div>
          <div style={fg}>
            <label style={lbl}>Trabajo realizado *</label>
            <textarea style={{ ...inp, minHeight: 120, resize: 'vertical' } as React.CSSProperties} required value={form.work_done} onChange={set('work_done')} placeholder="Describe detalladamente el trabajo realizado" />
          </div>
          <div style={fg}>
            <label style={lbl}>Repuestos / partes utilizadas</label>
            <textarea style={{ ...inp, minHeight: 60, resize: 'vertical' } as React.CSSProperties} value={form.parts_used} onChange={set('parts_used')} placeholder="Lista de repuestos o materiales utilizados (opcional)" />
          </div>
        </div>

        {/* Cost + warranty */}
        <div style={card}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#636366', marginBottom: 20 }}>Valor y garantía</h3>
          <div style={row}>
            <div style={fg}>
              <label style={lbl}>Costo total (CLP)</label>
              <input style={inp} type="number" min="0" value={form.total_cost} onChange={set('total_cost')} placeholder="Ej: 35000" />
            </div>
            <div style={fg}>
              <label style={lbl}>Días de garantía</label>
              <input style={inp} type="number" min="0" value={form.warranty_days} onChange={set('warranty_days')} />
            </div>
          </div>
          <div style={{ ...row, gridTemplateColumns: '1fr 1fr' } as React.CSSProperties}>
            <div style={fg}>
              <label style={lbl}>Estado</label>
              <select style={{ ...inp, appearance: 'none' } as React.CSSProperties} value={form.status} onChange={set('status')}>
                <option value="completado">Completado</option>
                <option value="en_proceso">En proceso</option>
                <option value="pendiente">Pendiente</option>
                <option value="sin_reparacion">Sin reparación</option>
              </select>
            </div>
          </div>
          <div style={fg}>
            <label style={lbl}>Notas internas</label>
            <textarea style={{ ...inp, minHeight: 60, resize: 'vertical' } as React.CSSProperties} value={form.notes} onChange={set('notes')} placeholder="Notas internas (no se muestran al cliente)" />
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,69,58,.1)', border: '1px solid rgba(255,69,58,.3)', borderRadius: 10, padding: '14px 18px', color: '#FF453A', marginBottom: 20, fontSize: 14 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{ background: saving ? '#333' : '#2997FF', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 40px', fontSize: 16, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', width: '100%' }}
        >
          {saving ? 'Guardando…' : '✓ Guardar informe'}
        </button>
      </form>
    </div>
  )
}
