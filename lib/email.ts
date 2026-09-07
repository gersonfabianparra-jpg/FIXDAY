import { Resend } from 'resend'

/**
 * Envío de correos.
 *
 * Con el remitente de pruebas de Resend (onboarding@resend.dev) solo se puede
 * escribir al dueño de la cuenta. Por eso los correos a CLIENTES quedan
 * bloqueados hasta que exista EMAIL_FROM, que se define recién cuando el
 * dominio fixday.cl está verificado en Resend. Así se activan sin tocar código.
 */

const FROM_PRUEBAS = 'FIXDAY Web <onboarding@resend.dev>'

/** true cuando el dominio propio ya está verificado y se puede escribir a clientes. */
export function dominioVerificado(): boolean {
  return Boolean(process.env.EMAIL_FROM)
}

export function remitente(): string {
  return process.env.EMAIL_FROM ?? FROM_PRUEBAS
}

export function correoAdmin(): string {
  return process.env.EMAIL_TO ?? 'fabiansitolaral@gmail.com'
}

interface EnvioParams {
  to: string
  subject: string
  html: string
  /** true si el destinatario es un cliente (no el dueño del sitio). */
  esCliente?: boolean
  replyTo?: string
}

export async function enviarCorreo({ to, subject, html, esCliente, replyTo }: EnvioParams):
  Promise<{ enviado: boolean; motivo?: string }> {
  if (!process.env.RESEND_API_KEY) return { enviado: false, motivo: 'Sin RESEND_API_KEY' }
  if (!to) return { enviado: false, motivo: 'Sin destinatario' }

  if (esCliente && !dominioVerificado()) {
    console.warn(`[email] Correo a cliente omitido (${to}): falta verificar fixday.cl en Resend y definir EMAIL_FROM.`)
    return { enviado: false, motivo: 'Dominio no verificado' }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({ from: remitente(), to, subject, html, replyTo })
    return { enviado: true }
  } catch (err) {
    console.error('[email] Error de Resend:', err)
    return { enviado: false, motivo: 'Error de envío' }
  }
}

/** Envoltorio visual común de los correos de FIXDAY. */
export function plantilla({ titulo, intro, filas, nota, cta }: {
  titulo: string
  intro: string
  filas: Array<[string, string]>
  nota?: string
  cta?: { texto: string; url: string }
}): string {
  const celdas = filas.map(([k, v]) => `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #EAEAEF;color:#6E6E73;font-size:13px;width:130px;vertical-align:top;">${k}</td>
      <td style="padding:11px 0;border-bottom:1px solid #EAEAEF;color:#1D1D1F;font-size:14px;font-weight:600;">${v}</td>
    </tr>`).join('')

  return `<div style="background:#F5F5F7;padding:28px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E4E4E9;">
      <div style="background:linear-gradient(135deg,#0071E3,#2997FF);padding:22px 26px;">
        <div style="color:#fff;font-size:19px;font-weight:800;letter-spacing:-.02em;">FIXDAY</div>
        <div style="color:rgba(255,255,255,.85);font-size:12px;margin-top:2px;">Técnico de computadores a domicilio</div>
      </div>
      <div style="padding:26px;">
        <h1 style="margin:0 0 8px;font-size:19px;color:#1D1D1F;letter-spacing:-.02em;">${titulo}</h1>
        <p style="margin:0 0 20px;font-size:14px;color:#6E6E73;line-height:1.6;">${intro}</p>
        <table style="width:100%;border-collapse:collapse;">${celdas}</table>
        ${cta ? `<div style="margin-top:24px;text-align:center;">
          <a href="${cta.url}" style="display:inline-block;background:#0071E3;color:#fff;text-decoration:none;padding:13px 26px;border-radius:980px;font-size:14px;font-weight:700;">${cta.texto}</a>
        </div>` : ''}
        ${nota ? `<p style="margin:22px 0 0;padding:14px;background:#F5F5F7;border-radius:10px;font-size:13px;color:#6E6E73;line-height:1.6;">${nota}</p>` : ''}
      </div>
      <div style="padding:16px 26px;border-top:1px solid #EAEAEF;">
        <p style="margin:0;font-size:11px;color:#98989D;">fixday.cl · Región Metropolitana · WhatsApp +56 9 3664 9332</p>
      </div>
    </div>
  </div>`
}
