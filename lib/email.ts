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

/** Todas las direcciones del negocio. EMAIL_TO admite varias separadas por coma. */
export function correosAdmin(): string[] {
  const v = process.env.EMAIL_TO ?? 'fabiansitolaral@gmail.com'
  return v.split(',').map(x => x.trim()).filter(Boolean)
}

/** La principal, para usar como dirección de respuesta. */
export function correoAdmin(): string {
  return correosAdmin()[0]
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
  Promise<{ enviado: boolean; motivo?: string; id?: string }> {
  if (!process.env.RESEND_API_KEY) return { enviado: false, motivo: 'Falta la clave de Resend' }
  if (!to) return { enviado: false, motivo: 'El cliente no dejó correo' }

  if (esCliente && !dominioVerificado()) {
    console.warn(`[email] Correo a cliente omitido (${to}): falta EMAIL_FROM.`)
    return { enviado: false, motivo: 'Falta configurar el remitente (EMAIL_FROM)' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  // De lo que se le manda al cliente queda copia oculta para el negocio
  const destinatarios = to.split(',').map(x => x.trim()).filter(Boolean)
  const carta = {
    from: remitente(), to: destinatarios, subject, html, replyTo,
    ...(esCliente ? { bcc: correosAdmin() } : {}),
  }

  for (let intento = 1; intento <= 2; intento++) {
    try {
      const r = await resend.emails.send(carta)

      // Resend responde 200 con `error` cuando rechaza el envío
      if (r.error) {
        const msg = r.error.message ?? 'Resend rechazó el envío'
        // Resend limita la cadencia de envíos: se reintenta una vez
        if (intento === 1 && /rate|too many/i.test(msg)) {
          await new Promise(res => setTimeout(res, 700))
          continue
        }
        console.error('[email] Resend rechazó el envío:', r.error)
        return { enviado: false, motivo: msg }
      }

      console.log(`[email] Enviado a ${to} · id ${r.data?.id}`)
      return { enviado: true, id: r.data?.id }
    } catch (err) {
      if (intento === 1) {
        await new Promise(res => setTimeout(res, 700))
        continue
      }
      console.error('[email] Error de Resend:', err)
      return { enviado: false, motivo: err instanceof Error ? err.message : 'Error de envío' }
    }
  }
  return { enviado: false, motivo: 'No se pudo enviar tras reintentar' }
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
