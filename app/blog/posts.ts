export interface Post {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  category: string
  content: string
}

export const POSTS: Post[] = [
  {
    slug: 'computador-lento-causas-soluciones',
    title: '¿Por qué mi computador está lento? 7 causas y soluciones',
    description: 'Un PC lento tiene solución. Descubre las 7 causas más comunes: exceso de programas al inicio, poco RAM, disco duro lleno, malware, temperatura alta y más.',
    date: '2026-04-10',
    readTime: 6,
    category: 'Mantención',
    content: `
<p>Un computador lento es frustrante, pero antes de pensar en comprar uno nuevo, vale la pena entender por qué ocurre. En la mayoría de los casos tiene solución con una mantención técnica o algunos ajustes de configuración.</p>

<h2>1. Demasiados programas ejecutándose al inicio</h2>
<p>Cada vez que instalas un programa, muchos se configuran para iniciarse automáticamente con Windows. Con el tiempo, docenas de aplicaciones compiten por la memoria RAM desde que enciendes el equipo.</p>
<p><strong>Cómo identificarlo:</strong> Si tu PC tarda más de 2 minutos en arrancar y responder, este suele ser el problema principal.</p>
<p><strong>Solución:</strong> Presiona <code>Ctrl + Shift + Esc</code> para abrir el Administrador de Tareas, ve a la pestaña "Inicio" y deshabilita los programas que no necesitas al encender.</p>

<h2>2. Poca memoria RAM disponible</h2>
<p>Si tienes 4 GB de RAM o menos, Windows 10 y 11 pueden quedarse sin recursos con el navegador y un par de pestañas abiertas. El sistema empieza a usar el disco duro como memoria temporal, lo que es hasta 10 veces más lento.</p>
<p><strong>Cómo identificarlo:</strong> En el Administrador de Tareas, pestaña "Rendimiento", revisa si el uso de memoria supera el 80% en reposo.</p>
<p><strong>Solución:</strong> Ampliar a 8 GB de RAM es la mejora más costo-efectiva. En muchos equipos se puede hacer por menos de $30.000.</p>

<h2>3. Disco duro mecánico (HDD) en mal estado o casi lleno</h2>
<p>Los discos duros mecánicos se degradan con el tiempo. Un disco con sectores dañados hace que Windows tarde mucho más en leer y escribir archivos. Si el disco está lleno al 90% o más, el rendimiento cae notablemente.</p>
<p><strong>Cómo identificarlo:</strong> Escucha si el disco hace ruidos de clic o raspado. También puedes usar CrystalDiskInfo (gratuito) para revisar su salud.</p>
<p><strong>Solución:</strong> Liberar espacio eliminando archivos temporales y, si el disco tiene errores, reemplazarlo por un SSD que es hasta 5 veces más rápido.</p>

<h2>4. Virus, malware o adware</h2>
<p>Los programas maliciosos consumen CPU y memoria en segundo plano sin que te des cuenta. Algunos mineros de criptomonedas pueden usar el 100% de tu procesador de forma invisible.</p>
<p><strong>Cómo identificarlo:</strong> El ventilador suena a máxima potencia incluso cuando no estás haciendo nada, o el Administrador de Tareas muestra procesos desconocidos al 50–100%.</p>
<p><strong>Solución:</strong> Ejecuta Windows Defender o instala Malwarebytes Free para un análisis completo.</p>

<h2>5. Sistema operativo desactualizado o corrupto</h2>
<p>Windows acumula archivos temporales, registros corruptos y fragmentación con el tiempo. Una instalación de más de 3 años sin formatear suele tener miles de archivos innecesarios que ralentizan todo.</p>
<p><strong>Solución:</strong> Ejecuta el comando <code>sfc /scannow</code> en el Símbolo del Sistema para reparar archivos del sistema, o considera hacer una instalación limpia de Windows.</p>

<h2>6. Sobrecalentamiento (temperatura alta)</h2>
<p>Cuando un procesador supera los 90°C, Windows lo obliga a reducir su velocidad automáticamente para protegerse. Esto puede hacer que tareas simples tarden el doble del tiempo.</p>
<p><strong>Cómo identificarlo:</strong> El equipo se pone muy caliente, el ventilador suena constantemente a máxima potencia, o el PC se apaga solo sin aviso.</p>
<p><strong>Causa:</strong> Acumulación de polvo en el disipador y ventiladores, o pasta térmica del procesador seca (ocurre después de 3–5 años de uso).</p>
<p><strong>Solución:</strong> Limpieza interna con aire comprimido y reemplazo de pasta térmica. Es una de las mantenciones más efectivas para recuperar rendimiento.</p>

<h2>7. Tienes HDD cuando podrías tener SSD</h2>
<p>Si tu equipo tiene más de 5 años, probablemente usa un disco duro mecánico (HDD). Migrar a un SSD es la mejora de rendimiento más dramática que puedes hacer: el sistema arranca en 15 segundos en vez de 2 minutos, y los programas se abren al instante.</p>
<p>Un SSD de 240 GB cuesta aproximadamente $25.000–$35.000, y la instalación incluye la migración de tu sistema operativo y todos tus datos.</p>

<h2>¿Cuándo llamar a un técnico?</h2>
<p>Si identificaste el problema pero no te sientes cómodo interviniendo el equipo, o si el PC sigue lento después de los ajustes básicos, lo mejor es una revisión profesional en casa. Un diagnóstico completo puede determinar si el problema es software (más económico) o hardware (requiere cambio de componentes).</p>
<p>En FIXDAY atendemos en toda la Región Metropolitana. La visita a domicilio + diagnóstico tiene un valor especial de $10.000 en nuestra oferta de lanzamiento, que se descuenta si realizas la reparación.</p>
`,
  },
  {
    slug: 'como-instalar-windows-11-paso-a-paso',
    title: 'Cómo instalar Windows 11 desde cero en tu PC (paso a paso)',
    description: 'Guía completa para instalar Windows 11 limpio: requisitos mínimos, cómo crear el pendrive de instalación, particiones y configuración inicial.',
    date: '2026-04-18',
    readTime: 8,
    category: 'Windows',
    content: `
<p>Instalar Windows 11 desde cero es la mejor manera de tener un sistema rápido, sin archivos basura ni programas acumulados. Esta guía te explica todo el proceso de principio a fin.</p>

<h2>Requisitos mínimos para Windows 11</h2>
<p>Antes de empezar, verifica que tu equipo cumple los requisitos:</p>
<ul>
<li><strong>Procesador:</strong> 1 GHz o más rápido, con 2 o más núcleos, compatible con 64 bits</li>
<li><strong>RAM:</strong> 4 GB mínimo (se recomienda 8 GB)</li>
<li><strong>Almacenamiento:</strong> 64 GB libres mínimo</li>
<li><strong>TPM:</strong> versión 2.0 (la mayoría de los equipos desde 2017 lo tienen)</li>
<li><strong>Firmware:</strong> UEFI con Secure Boot habilitado</li>
</ul>
<p>Si tu equipo no cumple los requisitos de TPM, existen métodos alternativos, pero no los recomendamos ya que comprometen la seguridad del sistema.</p>

<h2>Paso 1: Respalda tus datos</h2>
<p>Una instalación limpia borra todo lo que hay en el disco. Antes de continuar, guarda en un disco externo o en la nube (Google Drive, OneDrive):</p>
<ul>
<li>Documentos, fotos y videos importantes</li>
<li>Contraseñas guardadas en el navegador (expórtalas primero)</li>
<li>Correos importantes si usas cliente de escritorio</li>
<li>Licencias de software que puedan necesitar reactivación</li>
</ul>

<h2>Paso 2: Descarga la imagen oficial de Windows 11</h2>
<p>Ve al sitio oficial de Microsoft y descarga la "Herramienta de creación de medios" (Media Creation Tool). Esta herramienta crea automáticamente el pendrive de instalación con la versión más reciente de Windows 11.</p>
<p>Necesitas un pendrive de al menos 8 GB que se formateará completamente durante el proceso.</p>

<h2>Paso 3: Crea el pendrive booteable</h2>
<ol>
<li>Ejecuta la herramienta de creación de medios</li>
<li>Selecciona "Crear medios de instalación para otro PC"</li>
<li>Elige idioma (Español de Chile), edición (Windows 11) y arquitectura (64 bits)</li>
<li>Selecciona "Unidad flash USB" y tu pendrive</li>
<li>Espera a que descargue e instale (puede tomar 20–40 minutos según tu internet)</li>
</ol>

<h2>Paso 4: Configura el arranque desde USB</h2>
<p>Reinicia el equipo y entra al BIOS/UEFI presionando la tecla correspondiente al arrancar (generalmente F2, F12, Del o Supr dependiendo de la marca):</p>
<ul>
<li>ASUS: F2 o Del</li>
<li>HP: F10 o Esc</li>
<li>Dell: F2 o F12</li>
<li>Lenovo: F1, F2 o Fn+F2</li>
</ul>
<p>En el BIOS, busca la opción "Boot Order" o "Boot Priority" y coloca el USB como primera opción de arranque.</p>

<h2>Paso 5: Instala Windows 11</h2>
<ol>
<li>El equipo arrancará desde el pendrive y aparecerá el instalador de Windows</li>
<li>Selecciona idioma y región: Español (Chile) / Chile</li>
<li>Haz clic en "Instalar ahora"</li>
<li>Ingresa la clave de producto si la tienes, o selecciona "No tengo clave" para activar después</li>
<li>En el tipo de instalación, elige <strong>"Personalizada: instalar solo Windows"</strong></li>
<li>Selecciona la partición donde instalar (si quieres instalación limpia, elimina todas las particiones del disco principal y crea una nueva)</li>
<li>Espera entre 15 y 30 minutos</li>
</ol>

<h2>Paso 6: Configuración inicial</h2>
<p>Una vez instalado, Windows te guiará por la configuración inicial. Recomendaciones:</p>
<ul>
<li>Crea una cuenta local (no obligatoriamente con Microsoft) para mayor privacidad</li>
<li>Desactiva las opciones de telemetría y diagnóstico innecesario</li>
<li>Conéctate a WiFi para que Windows Update descargue los drivers necesarios</li>
</ul>

<h2>Paso 7: Instala drivers y actualizaciones</h2>
<p>Después de la instalación, Windows Update descargará la mayoría de los drivers. Para drivers específicos (tarjeta de video, sonido), ve al sitio del fabricante de tu equipo.</p>
<p>También instala el software esencial: navegador, antivirus, Office o LibreOffice, y los programas que usas habitualmente.</p>

<h2>¿Prefieres que lo haga un técnico?</h2>
<p>Si el proceso te parece complicado o no quieres arriesgarte a perder datos, un técnico certificado puede hacer la instalación completa en tu casa. En FIXDAY incluimos en el servicio: instalación de Windows 11, todos los drivers, antivirus y programas esenciales. El valor es de $30.000, con visita a domicilio en toda la Región Metropolitana.</p>
`,
  },
  {
    slug: 'como-recuperar-archivos-borrados-windows',
    title: 'Cómo recuperar archivos borrados o perdidos en Windows',
    description: 'Guía para recuperar fotos, documentos y videos borrados accidentalmente en Windows. Aprende qué herramientas usar y cuándo llamar a un especialista.',
    date: '2026-04-25',
    readTime: 5,
    category: 'Recuperación de datos',
    content: `
<p>Borrar archivos importantes por accidente es más común de lo que parece. La buena noticia es que en muchos casos es posible recuperarlos, siempre y cuando actúes rápido y no sigas usando el disco.</p>

<h2>Lo más importante: deja de usar el disco inmediatamente</h2>
<p>Cuando borras un archivo, Windows no lo elimina físicamente. Solo marca ese espacio como "disponible" para ser sobreescrito. Mientras no guardes archivos nuevos en ese disco, la información sigue ahí y puede recuperarse.</p>
<p>Si el archivo está en el disco C:, apaga el equipo lo antes posible para evitar que Windows sobreescriba el espacio.</p>

<h2>Paso 1: Revisa la Papelera de Reciclaje</h2>
<p>Suena obvio, pero es el primer lugar donde buscar. Los archivos eliminados con la tecla Delete o clic derecho van a la Papelera. Para restaurarlos, haz clic derecho sobre el archivo y selecciona "Restaurar".</p>
<p>Si vaciaste la papelera, el archivo sigue en el disco pero necesitas herramientas especiales para recuperarlo.</p>

<h2>Paso 2: Usa el Historial de Versiones de Windows</h2>
<p>Si tienes activada la protección del sistema, Windows guarda versiones anteriores de carpetas. Para acceder:</p>
<ol>
<li>Navega a la carpeta donde estaba el archivo</li>
<li>Clic derecho → "Propiedades" → pestaña "Versiones anteriores"</li>
<li>Selecciona una versión de fecha anterior al borrado</li>
<li>Haz clic en "Restaurar"</li>
</ol>
<p>Esto funciona si tienes habilitada la función "Puntos de restauración" o "Historial de archivos".</p>

<h2>Paso 3: Recuperación con software especializado</h2>
<p>Si los métodos anteriores no funcionan, existen programas gratuitos que pueden recuperar archivos directamente del disco:</p>
<ul>
<li><strong>Recuva</strong> (gratuito): es la opción más accesible para usuarios sin experiencia técnica. Disponible en español.</li>
<li><strong>TestDisk / PhotoRec</strong>: herramienta técnica más potente, especialmente para recuperar fotos.</li>
<li><strong>Disk Drill</strong>: versión gratuita permite recuperar hasta 500 MB.</li>
</ul>
<p><strong>Importante:</strong> Instala el software en un disco diferente al que quieres recuperar. Si instalas en el mismo disco, puedes sobreescribir los archivos que intentas recuperar.</p>

<h2>Situaciones donde se dificulta la recuperación</h2>
<ul>
<li><strong>SSD con TRIM activado:</strong> Los SSD eliminan el espacio marcado como libre automáticamente. La recuperación en SSD tiene menor tasa de éxito.</li>
<li><strong>Disco formateado:</strong> Aun así es posible recuperar datos con herramientas avanzadas, pero el porcentaje de éxito varía.</li>
<li><strong>Disco dañado físicamente:</strong> Si el disco hace ruidos o no es reconocido, no intentes nada por tu cuenta. Cada intento puede empeorar la situación.</li>
</ul>

<h2>Recuperación de datos de disco dañado</h2>
<p>Si tu disco duro tiene daño físico (caída, humedad, golpe) o daño lógico severo (virus, formateo múltiple), la recuperación requiere equipos especializados. En estos casos, un técnico puede usar herramientas de clonación de disco para recuperar los datos antes de intentar cualquier reparación.</p>
<p>En FIXDAY ofrecemos servicio de recuperación de datos a domicilio en toda la Región Metropolitana. El diagnóstico inicial tiene un costo de $10.000 y te informamos el porcentaje de recuperación posible antes de proceder.</p>

<h2>Cómo evitar perder datos en el futuro</h2>
<p>La única protección real contra la pérdida de datos es el respaldo regular:</p>
<ul>
<li>Activa el Historial de archivos de Windows en un disco externo</li>
<li>Usa Google Drive o OneDrive para documentos importantes</li>
<li>Haz un respaldo completo antes de cualquier reparación o formateo</li>
</ul>
`,
  },
  {
    slug: 'senales-disco-duro-fallando',
    title: 'Señales de que tu disco duro está fallando (y qué hacer)',
    description: 'Aprende a identificar las señales de advertencia de un disco duro en mal estado antes de que falle completamente y pierdas todos tus datos.',
    date: '2026-05-05',
    readTime: 5,
    category: 'Hardware',
    content: `
<p>El disco duro es uno de los componentes más vulnerables de un computador. A diferencia del procesador o la RAM, tiene partes mecánicas que se desgastan con el tiempo. Conocer las señales de advertencia puede salvarte de perder todos tus archivos sin aviso.</p>

<h2>Señal 1: Ruidos inusuales</h2>
<p>Un disco duro sano hace un leve zumbido. Si escuchas alguno de estos sonidos, es señal de alarma:</p>
<ul>
<li><strong>Clic repetitivo</strong> (click of death): las cabezas de lectura no encuentran la pista correcta</li>
<li><strong>Raspado o rechinido</strong>: daño en los platos o cabezas de lectura</li>
<li><strong>Beep o pitido</strong>: falla en el motor del disco</li>
</ul>
<p>Si escuchas cualquiera de estos sonidos, haz un respaldo inmediato de tus datos. No esperes.</p>

<h2>Señal 2: PC extremadamente lento al abrir archivos</h2>
<p>Si tu computador tarda varios segundos en abrir un documento, carpeta o programa, y esto empeoró progresivamente, puede indicar sectores dañados en el disco. Windows intenta leer el sector defectuoso múltiples veces antes de reportar el error, lo que causa las esperas.</p>

<h2>Señal 3: Errores de archivo frecuentes</h2>
<p>Mensajes como "El archivo está dañado y no se puede abrir", "Error al copiar", o archivos que se corrompen solos son señales de sectores en mal estado. Si esto ocurre con múltiples archivos distintos, el problema está en el disco, no en los archivos.</p>

<h2>Señal 4: Pantallazos azules (BSOD) frecuentes</h2>
<p>Si tu PC presenta pantallazos azules con errores como <code>CRITICAL_PROCESS_DIED</code>, <code>NTFS_FILE_SYSTEM</code> o <code>BAD_SYSTEM_CONFIG_INFO</code>, el disco puede ser el responsable. Estos errores indican que Windows no pudo leer archivos críticos del sistema.</p>

<h2>Señal 5: El disco no aparece en "Este equipo"</h2>
<p>Si el disco externo o una partición del disco interno simplemente no aparece, puede haber un problema de conexión, de tabla de particiones, o daño físico. No intentes formatear ni "reparar" hasta saber la causa real.</p>

<h2>Señal 6: Temperatura anormalmente alta</h2>
<p>Los discos duros operan normalmente entre 30°C y 50°C. Temperaturas sobre 55°C continuamente aceleran el desgaste. Puedes revisar la temperatura con CrystalDiskInfo (gratuito).</p>

<h2>Cómo verificar la salud del disco duro</h2>
<p>La herramienta más confiable y gratuita es <strong>CrystalDiskInfo</strong>. Muestra el estado S.M.A.R.T. del disco, que incluye indicadores de sectores defectuosos, errores de lectura y temperatura. Si muestra estado "Precaución" o "Malo", actúa de inmediato.</p>

<h2>Qué hacer si detectas estas señales</h2>
<ol>
<li><strong>Respaldo inmediato:</strong> Copia todos tus archivos importantes a otro disco o a la nube antes de hacer cualquier otra cosa</li>
<li><strong>No apagues y enciendas repetidamente:</strong> Los ciclos de encendido estresan el disco</li>
<li><strong>No desfragmentes:</strong> La desfragmentación no sirve en discos dañados y puede empeorar el problema</li>
<li><strong>Diagnóstico profesional:</strong> Un técnico puede clonar el disco para preservar los datos antes de reemplazarlo</li>
</ol>

<h2>¿Cuánto dura un disco duro?</h2>
<p>Los discos duros mecánicos (HDD) tienen una vida útil promedio de 3 a 5 años con uso continuo. Los SSD duran más (5–10 años) y al fallar generalmente lo hacen de forma más predecible. Si tu equipo tiene más de 4 años con el mismo disco, es un buen momento para hacer un diagnóstico preventivo.</p>
<p>En FIXDAY realizamos diagnóstico de disco duro a domicilio en toda la Región Metropolitana. Si necesitas reemplazar el disco, incluimos la migración completa de tus datos al disco nuevo.</p>
`,
  },
  {
    slug: 'como-mejorar-senal-wifi-casa',
    title: 'Cómo mejorar la señal WiFi en casa (sin gastar mucho)',
    description: 'Mejora la cobertura WiFi en tu hogar con estos consejos prácticos: ubicación del router, canales, repetidores y cuándo llamar a un técnico.',
    date: '2026-05-15',
    readTime: 5,
    category: 'Redes WiFi',
    content: `
<p>Una señal WiFi débil o inestable arruina el trabajo desde casa, el streaming y los videojuegos. Antes de llamar a tu proveedor de internet o comprar equipo nuevo, prueba estos ajustes que pueden hacer una diferencia enorme.</p>

<h2>1. Ubica mejor el router</h2>
<p>La posición del router es el factor que más afecta la cobertura y que más gente ignora. Para una señal óptima:</p>
<ul>
<li>Colócalo en el centro de tu casa o departamento</li>
<li>Ponlo en alto (sobre una mesa o repisa) — las señales se propagan hacia abajo</li>
<li>Aléjalo de paredes gruesas de hormigón o ladrillo</li>
<li>Mantenerlo alejado de microondas, teléfonos inalámbricos y monitores de bebé (usan la misma frecuencia)</li>
<li>No lo pongas en cajones ni dentro de muebles cerrados</li>
</ul>

<h2>2. Cambia el canal WiFi</h2>
<p>Si vives en un edificio o cerca de vecinos, tu router probablemente está usando el mismo canal que varios otros. Esto causa interferencia y reduce la velocidad.</p>
<p><strong>Para 2.4 GHz:</strong> Usa los canales 1, 6 o 11, que no se superponen entre sí. Usa una app como WiFi Analyzer (Android) para ver qué canales usan tus vecinos.</p>
<p><strong>Para 5 GHz:</strong> Tiene más canales disponibles y menos interferencia, pero menor alcance. Ideal para dispositivos cercanos al router.</p>
<p>Puedes cambiar el canal en la configuración del router, accediendo a <code>192.168.1.1</code> o <code>192.168.0.1</code> desde el navegador.</p>

<h2>3. Actualiza el firmware del router</h2>
<p>Los fabricantes publican actualizaciones de firmware que mejoran el rendimiento y la seguridad. Entra a la configuración de tu router y busca la opción "Actualización de firmware" o "Firmware Update".</p>

<h2>4. Usa la banda de 5 GHz cuando sea posible</h2>
<p>La mayoría de los routers modernos son "dual band": transmiten en 2.4 GHz y 5 GHz simultáneamente. La banda de 5 GHz es más rápida pero tiene menos alcance. Si estás cerca del router, conéctate a la red de 5 GHz para mayor velocidad.</p>

<h2>5. Agrega un repetidor WiFi o Access Point</h2>
<p>Si tu casa tiene más de 80 m² o paredes gruesas que cortan la señal, un repetidor WiFi es la solución más económica. Funcionan enchufándose a un tomacorriente y amplificando la señal existente.</p>
<p><strong>Importante:</strong> Un repetidor divide el ancho de banda a la mitad. Para una solución mejor, un Access Point conectado por cable es más eficiente.</p>

<h2>6. Sistema Mesh: la solución completa</h2>
<p>Para casas grandes o con múltiples pisos, los sistemas mesh (como TP-Link Deco, Eero o Google Wifi) ofrecen cobertura completa sin puntos ciegos. Varios nodos se comunican entre sí para crear una red unificada de alta velocidad.</p>
<p>El costo de entrada es mayor (desde $80.000–$150.000 para un kit de 2 nodos), pero la diferencia en cobertura y estabilidad es notable.</p>

<h2>7. Revisa cuántos dispositivos están conectados</h2>
<p>Cada dispositivo conectado usa parte del ancho de banda. Si tienes 20+ dispositivos en tu red (teléfonos, tablets, TVs, consolas, cámaras), incluso un internet rápido puede sentirse lento.</p>
<p>En la configuración del router puedes ver todos los dispositivos conectados y bloquear los que no reconoces.</p>

<h2>Cuándo el problema no es el WiFi sino el internet</h2>
<p>Si la señal WiFi tiene buenas barras pero la velocidad sigue siendo lenta, el problema puede estar en la velocidad contratada con tu proveedor o en el cable desde el punto de entrada hasta el router. Mide la velocidad en fast.com directamente desde el router con un cable de red para comparar.</p>

<h2>¿Necesitas ayuda con tu WiFi en Santiago?</h2>
<p>Si probaste todo y la señal sigue siendo un problema, un técnico puede hacer una evaluación completa de tu red, identificar puntos ciegos, configurar canales óptimos y recomendar el equipo adecuado para tu espacio. En FIXDAY atendemos instalación y configuración de WiFi a domicilio en toda la Región Metropolitana.</p>
`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
