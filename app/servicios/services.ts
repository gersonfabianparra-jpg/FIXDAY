export interface ServicePage {
  slug: string
  title: string
  shortTitle: string
  description: string
  price: string
  priceNote: string
  includes: string[]
  faq: { q: string; a: string }[]
  relatedBlogSlugs: string[]
}

export const SERVICES: ServicePage[] = [
  {
    slug: 'mantencion-pc',
    title: 'Mantención de Computador a Domicilio en Santiago',
    shortTitle: 'Mantención de PC',
    description: 'Servicio de mantención lógica y física de computadores a domicilio en Santiago y Región Metropolitana. Limpieza interna, pasta térmica, drivers y sistema operativo. Desde $25.000.',
    price: '$25.000',
    priceNote: 'La visita + diagnóstico ($10.000 oferta lanzamiento) se aplica al total si realizas la mantención.',
    includes: [
      'Limpieza interna con aire comprimido (polvo del disipador, ventiladores y tarjeta madre)',
      'Reemplazo de pasta térmica del procesador',
      'Diagnóstico completo de hardware (RAM, disco, temperatura)',
      'Actualización de drivers y sistema operativo',
      'Eliminación de programas innecesarios al inicio',
      'Revisión de temperatura antes y después del servicio',
      'Informe de estado del equipo',
    ],
    faq: [
      { q: '¿Con qué frecuencia debo hacer mantención a mi PC?', a: 'Se recomienda mantención física (limpieza + pasta térmica) cada 12 a 18 meses. Si el equipo está en un ambiente con mucho polvo o se usa intensivamente, cada 6 a 12 meses.' },
      { q: '¿Cuánto tiempo tarda la mantención?', a: 'Generalmente entre 1 y 2 horas, dependiendo del estado del equipo y los servicios adicionales que se requieran.' },
      { q: '¿Tienen que llevarse el computador?', a: 'No. El servicio es completamente a domicilio. El técnico va a tu casa con todas las herramientas necesarias.' },
      { q: '¿La mantención mejora el rendimiento?', a: 'Sí, significativamente. Un equipo con polvo acumulado puede llegar a los 95°C y reducir su velocidad a la mitad como mecanismo de protección. Después de la mantención la temperatura baja 20–30°C y el rendimiento se recupera.' },
    ],
    relatedBlogSlugs: ['computador-lento-causas-soluciones', 'senales-disco-duro-fallando'],
  },
  {
    slug: 'instalacion-windows',
    title: 'Instalación de Windows a Domicilio en Santiago',
    shortTitle: 'Instalación de Windows',
    description: 'Instalación limpia de Windows 10 u 11 a domicilio en Santiago y Región Metropolitana. Incluye drivers, antivirus y programas esenciales. Desde $30.000.',
    price: '$30.000',
    priceNote: 'Incluye Windows 10 u 11, todos los drivers, antivirus y programas básicos. Sin costos ocultos.',
    includes: [
      'Instalación limpia de Windows 10 u 11 (según compatibilidad del equipo)',
      'Instalación de todos los drivers: red, sonido, gráfica, chipset',
      'Instalación de antivirus (Windows Defender configurado)',
      'Instalación de programas esenciales: Chrome, Office Viewer, VLC, WinRAR',
      'Activación de Windows (si tienes licencia, la vinculamos)',
      'Configuración de actualizaciones automáticas',
      'Respaldo previo de tus datos personales incluido',
    ],
    faq: [
      { q: '¿Pierdo mis datos al instalar Windows?', a: 'Una instalación limpia formatea el disco. Por eso incluimos el respaldo de tus datos antes de proceder: documentos, fotos, música y archivos importantes quedan guardados y se restauran después.' },
      { q: '¿Qué diferencia hay entre Windows 10 y 11?', a: 'Windows 11 tiene mejor rendimiento, mayor seguridad y soporte más largo de Microsoft. Sin embargo, requiere hardware más reciente (TPM 2.0). El técnico evalúa tu equipo y te recomienda la versión adecuada.' },
      { q: '¿Necesito comprar la licencia de Windows?', a: 'Si tu equipo ya tenía Windows activado, en muchos casos la licencia está vinculada al hardware y se reactiva sola. Si no tienes licencia, puedes usarlo sin activar (con algunas limitaciones de personalización) o comprar una licencia oficial.' },
      { q: '¿Cuánto tarda la instalación?', a: 'Entre 1.5 y 3 horas, dependiendo de la velocidad del disco y el internet para descargar drivers y actualizaciones.' },
    ],
    relatedBlogSlugs: ['como-instalar-windows-11-paso-a-paso', 'computador-lento-causas-soluciones'],
  },
  {
    slug: 'recuperacion-datos',
    title: 'Recuperación de Datos a Domicilio en Santiago',
    shortTitle: 'Recuperación de Datos',
    description: 'Recuperamos archivos, fotos y documentos borrados o perdidos en discos dañados, formateados o con errores. Servicio a domicilio en Santiago y Región Metropolitana. Desde $35.000.',
    price: '$35.000',
    priceNote: 'Diagnóstico gratuito del porcentaje de recuperación posible antes de proceder. Solo pagas si recuperamos tus datos.',
    includes: [
      'Diagnóstico del disco: evaluación del estado físico y lógico',
      'Recuperación de archivos borrados accidentalmente',
      'Recuperación desde discos formateados',
      'Recuperación desde particiones corruptas o dañadas',
      'Recuperación de discos con errores del sistema de archivos',
      'Copia de datos recuperados a disco externo (debes proveerlo)',
      'Informe detallado de los archivos recuperados',
    ],
    faq: [
      { q: '¿Qué porcentaje de datos se puede recuperar?', a: 'Depende del tipo de daño. En discos con daño lógico (formateo, archivos borrados, partición corrupta) la tasa de recuperación es alta, entre 70% y 95%. En discos con daño físico (golpes, ruidos) varía mucho y se evalúa caso a caso.' },
      { q: '¿Puedo recuperar datos de un SSD?', a: 'La recuperación en SSD es más compleja porque activan automáticamente el comando TRIM que borra los datos marcados. La tasa de éxito es menor que en HDD, pero en muchos casos sigue siendo posible, especialmente si actuaste rápido.' },
      { q: '¿Qué debo hacer si borré archivos importantes?', a: 'Lo más importante es dejar de usar el disco inmediatamente. Cada archivo nuevo que guardes puede sobreescribir los datos que intentas recuperar. Llámanos antes de hacer cualquier cosa.' },
      { q: '¿Cobran si no logran recuperar los datos?', a: 'No. Solo cobramos el servicio si logramos recuperar tus datos. Antes de proceder te informamos el porcentaje estimado de recuperación y tú decides si continuar.' },
    ],
    relatedBlogSlugs: ['como-recuperar-archivos-borrados-windows', 'senales-disco-duro-fallando'],
  },
  {
    slug: 'optimizacion-pc',
    title: 'Optimización de PC a Domicilio en Santiago',
    shortTitle: 'Optimización de PC',
    description: 'Hacemos que tu computador vuelva a funcionar como nuevo. Eliminamos malware, programas basura y procesos lentos. Servicio a domicilio en Santiago y Región Metropolitana. Desde $20.000.',
    price: '$20.000',
    priceNote: 'Servicio de software. Si además requiere mantención física, se cotiza por separado.',
    includes: [
      'Eliminación completa de malware, adware y spyware',
      'Desinstalación de programas innecesarios y bloatware',
      'Limpieza de archivos temporales y caché del sistema',
      'Optimización de programas al inicio de Windows',
      'Desfragmentación y optimización del disco (HDD) o TRIM (SSD)',
      'Ajuste de configuración de rendimiento de Windows',
      'Verificación y reparación de archivos del sistema (sfc /scannow)',
    ],
    faq: [
      { q: '¿Cuánto puede mejorar el rendimiento?', a: 'En equipos muy cargados de programas y malware, la mejora puede ser dramática: de 5 minutos de carga a menos de 1 minuto, y programas que tardaban 30 segundos en abrirse a 5 segundos. Todo depende del estado inicial del equipo.' },
      { q: '¿Es lo mismo que formatear?', a: 'No. La optimización trabaja sobre el sistema existente sin borrar tus datos ni programas. Si el sistema está muy deteriorado, puede recomendarse una instalación limpia de Windows como alternativa más efectiva.' },
      { q: '¿El efecto dura?', a: 'Sí, siempre que no instales programas innecesarios o entres a sitios de riesgo. Al terminar el servicio, el técnico te da consejos básicos de mantenimiento para que el equipo se mantenga rápido.' },
      { q: '¿Mi PC lento necesita optimización o mantención?', a: 'Depende de la causa. Si es lento por software (muchos programas, malware, sistema saturado), la optimización lo soluciona. Si es lento por temperatura alta o disco dañado, necesita mantención física o reemplazo de disco.' },
    ],
    relatedBlogSlugs: ['computador-lento-causas-soluciones'],
  },
  {
    slug: 'respaldo-datos',
    title: 'Respaldo de Información a Domicilio en Santiago',
    shortTitle: 'Respaldo de Información',
    description: 'Protegemos tus documentos, fotos y archivos importantes antes de cualquier intervención. Servicio de respaldo profesional a domicilio en Santiago. Desde $15.000.',
    price: '$15.000',
    priceNote: 'Incluye respaldo completo a disco externo o nube. Necesitas proveer el disco externo de destino.',
    includes: [
      'Respaldo completo de documentos, fotos, música y videos',
      'Exportación de contraseñas y marcadores del navegador',
      'Respaldo de correos si usas cliente de escritorio (Outlook, Thunderbird)',
      'Respaldo de configuraciones importantes del sistema',
      'Verificación de integridad de los archivos copiados',
      'Organización de carpetas en el destino para fácil acceso',
      'Orientación sobre cómo mantener el respaldo actualizado',
    ],
    faq: [
      { q: '¿Qué necesito para el respaldo?', a: 'Necesitas un disco duro externo o pendrive con suficiente espacio libre. Si no tienes uno, podemos recomendarte qué comprar según la cantidad de datos que tienes.' },
      { q: '¿También pueden hacer respaldo en la nube?', a: 'Sí. Configuramos Google Drive o OneDrive para que sincronice automáticamente tus carpetas más importantes, así nunca perderás datos nuevamente.' },
      { q: '¿Cuánto tiempo toma el respaldo?', a: 'Depende de la cantidad de datos. Un respaldo típico de 50–100 GB tarda entre 30 minutos y 1 hora.' },
      { q: '¿Es obligatorio hacer respaldo antes de reparar?', a: 'No es obligatorio, pero lo recomendamos siempre. En reparaciones que involucran el disco o una reinstalación de Windows, el respaldo previo es fundamental para no perder nada.' },
    ],
    relatedBlogSlugs: ['como-recuperar-archivos-borrados-windows', 'computador-lento-causas-soluciones'],
  },
  {
    slug: 'wifi-redes',
    title: 'Instalación y Configuración WiFi a Domicilio en Santiago',
    shortTitle: 'WiFi y Redes',
    description: 'Instalamos y configuramos routers, repetidores y sistemas mesh para cobertura WiFi completa en tu hogar u oficina. Servicio a domicilio en Santiago. Desde $30.000.',
    price: '$30.000',
    priceNote: 'Incluye configuración del router principal, análisis de cobertura y configuración de hasta 2 dispositivos adicionales.',
    includes: [
      'Configuración de router principal (cualquier marca y modelo)',
      'Análisis de puntos ciegos de señal en tu hogar',
      'Instalación y configuración de repetidores o access points',
      'Optimización de canales WiFi para evitar interferencias',
      'Configuración de red para 2.4 GHz y 5 GHz',
      'Seguridad de la red: contraseña, cifrado WPA3/WPA2, red de invitados',
      'Configuración de todos tus dispositivos a la nueva red',
    ],
    faq: [
      { q: '¿Pueden mejorar la señal WiFi sin comprar equipo nuevo?', a: 'En muchos casos sí. Reubicando el router, optimizando canales y ajustando la configuración se puede mejorar significativamente la señal sin costo adicional en equipos.' },
      { q: '¿Qué tipo de repetidor recomiendan?', a: 'Depende del tamaño de tu espacio y el número de dispositivos. Para casas pequeñas, un repetidor económico funciona bien. Para espacios grandes o de múltiples pisos, recomendamos sistemas mesh (TP-Link Deco, Eero) que dan cobertura uniforme sin zonas muertas.' },
      { q: '¿Pueden configurar WiFi para una oficina?', a: 'Sí. Para oficinas configuramos redes separadas (empleados y visitantes), acceso controlado y la infraestructura necesaria para múltiples usuarios simultáneos.' },
      { q: '¿El servicio incluye el equipo (router/repetidor)?', a: 'No. El servicio cubre la instalación y configuración. Si necesitas comprar equipo nuevo, el técnico te asesora sobre qué comprar según tus necesidades y presupuesto.' },
    ],
    relatedBlogSlugs: ['como-mejorar-senal-wifi-casa'],
  },
]

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICES.find(s => s.slug === slug)
}
