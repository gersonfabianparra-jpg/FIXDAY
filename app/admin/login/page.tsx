'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Error al iniciar sesión.')
      } else {
        router.push('/admin')
      }
    } catch {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#000', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, sans-serif', padding: 24,
    }}>
      <div style={{
        width: '100%', maxWidth: 380,
        background: '#111', border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 24, padding: '44px 40px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #2997FF, #BF5AF2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 22, color: '#fff', fontFamily: 'inherit',
          }}>F</div>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#F5F5F7', letterSpacing: '-.02em' }}>FIXDAY Admin</div>
          <div style={{ fontSize: 13, color: '#636366', marginTop: 6 }}>Ingresa tus credenciales</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#86868B', marginBottom: 8, letterSpacing: '.04em', textTransform: 'uppercase' }}>
              Usuario
            </label>
            <input
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="admin"
              required
              autoComplete="username"
              style={{
                width: '100%', background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)', borderRadius: 11,
                padding: '13px 16px', color: '#F5F5F7', fontSize: 15,
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color .2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(41,151,255,.6)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,.1)')}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#86868B', marginBottom: 8, letterSpacing: '.04em', textTransform: 'uppercase' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{
                width: '100%', background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)', borderRadius: 11,
                padding: '13px 16px', color: '#F5F5F7', fontSize: 15,
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color .2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(41,151,255,.6)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,.1)')}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255,69,58,.12)', border: '1px solid rgba(255,69,58,.3)',
              borderRadius: 10, padding: '11px 16px', color: '#FF453A',
              fontSize: 13, marginBottom: 20, textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #2997FF, #BF5AF2)',
              border: 'none', borderRadius: 11, padding: '14px',
              color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1, transition: 'opacity .2s, transform .2s',
            }}
            onMouseEnter={e => { if (!loading) (e.target as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.transform = '' }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
