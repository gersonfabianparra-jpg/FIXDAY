/**
 * Preguntas frecuentes de la home.
 * Fuente ÚNICA: se usa tanto para renderizar la sección visible
 * como para generar el schema FAQPage (rich snippet en Google).
 * Los iconos viven en un array paralelo dentro de page.tsx (por índice).
 */
export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: '¿Cuánto cuesta la visita a domicilio?',
    a: 'La visita + diagnóstico técnico a domicilio tiene un valor de $20.000. Si realizas la reparación, ese valor se descuenta del total. No hay cargos ocultos.',
  },
  {
    q: '¿En cuánto tiempo llegan?',
    a: 'Atendemos el mismo día o al día siguiente, de lunes a viernes de 8:00 a 19:00 hrs. Respondemos en menos de 1 hora para coordinar la visita.',
  },
  {
    q: '¿En qué comunas atienden?',
    a: 'Cubrimos 38 comunas de la Región Metropolitana: Santiago, Providencia, Las Condes, Ñuñoa, La Florida, Maipú, Puente Alto, Vitacura, La Reina, Peñalolén, Macul y muchas más. Consulta el listado completo en nuestra sección de zonas.',
  },
  {
    q: '¿Qué pasa si no pueden reparar mi equipo?',
    a: 'Si después del diagnóstico no es posible reparar tu equipo o el costo no te conviene, solo pagas la visita ($20.000). Sin presiones ni costos adicionales.',
  },
  {
    q: '¿Qué medios de pago aceptan?',
    a: 'Aceptamos efectivo y transferencia bancaria. El pago se realiza una vez terminado el trabajo, nunca antes.',
  },
  {
    q: '¿Pueden recuperar datos de un disco dañado?',
    a: 'Sí. Ofrecemos recuperación de datos de discos con daño lógico (virus, formateo, partición corrupta) y en muchos casos de daño físico. El diagnóstico inicial determina el porcentaje de recuperación posible.',
  },
]
