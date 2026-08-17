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
<p>En FIXDAY atendemos en toda la Región Metropolitana. La visita a domicilio + diagnóstico tiene un valor de $20.000, que se descuenta si realizas la reparación.</p>
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
<p>En FIXDAY ofrecemos servicio de recuperación de datos a domicilio en toda la Región Metropolitana. El diagnóstico inicial tiene un costo de $20.000 y te informamos el porcentaje de recuperación posible antes de proceder.</p>

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
  {
    slug: 'que-hacer-si-pc-no-enciende',
    title: '¿Qué hacer si tu PC no enciende? Checklist paso a paso',
    description: 'Tu computador no enciende y no sabes por qué. Sigue esta guía para identificar si el problema es la corriente, la fuente de poder, la RAM o la tarjeta madre.',
    date: '2026-05-20',
    readTime: 6,
    category: 'Hardware',
    content: `
<p>Un computador que no enciende puede tener causas muy distintas: desde algo tan simple como un cable desconectado hasta un fallo en la fuente de poder o la tarjeta madre. Esta guía te ayuda a identificar el problema antes de llamar a un técnico.</p>

<h2>Paso 1: Verifica la corriente eléctrica</h2>
<p>Parece obvio, pero es el origen del problema más frecuente. Antes de asumir que el equipo está dañado:</p>
<ul>
<li>Revisa que el enchufe esté bien conectado a la pared y al equipo</li>
<li>Prueba el tomacorriente con otro aparato</li>
<li>Si usas extensión o UPS, prueba conectar directamente a la pared</li>
<li>En laptops, verifica que el cargador esté enchufado y que el LED del cargador encienda</li>
</ul>

<h2>Paso 2: Observa qué pasa al presionar el botón de encendido</h2>
<p>La reacción del equipo al presionar el botón de encendido da pistas importantes:</p>
<ul>
<li><strong>No pasa absolutamente nada:</strong> problema de corriente, fuente de poder o botón de encendido dañado</li>
<li><strong>Ventiladores giran pero no hay imagen:</strong> problema de RAM, tarjeta de video o monitor</li>
<li><strong>Enciende y se apaga solo (en loop):</strong> sobrecalentamiento, RAM defectuosa o problema en tarjeta madre</li>
<li><strong>Pitidos al encender:</strong> código de error BIOS, generalmente RAM o tarjeta de video</li>
<li><strong>Enciende pero se queda en pantalla negra:</strong> problema de disco duro o sistema operativo</li>
</ul>

<h2>Paso 3: Revisa el monitor (para PCs de escritorio)</h2>
<p>Muchas veces el computador está encendido pero parece que no, porque el problema es el monitor:</p>
<ul>
<li>Verifica que el monitor esté enchufado y encendido (busca el LED del monitor)</li>
<li>Asegúrate de que el cable HDMI o DisplayPort esté bien conectado en ambos extremos</li>
<li>Si el monitor tiene varios inputs, verifica que esté en el canal correcto</li>
<li>Prueba con otro cable o con otro monitor si tienes disponible</li>
</ul>

<h2>Paso 4: Prueba con la RAM</h2>
<p>La RAM suelta o defectuosa es una causa frecuente de que el PC no encienda. Para PCs de escritorio:</p>
<ol>
<li>Apaga y desenchufa el equipo completamente</li>
<li>Abre la carcasa y retira los módulos de RAM (presiona las pestañas de los lados)</li>
<li>Límpilos suavemente con una goma de borrar en los contactos dorados</li>
<li>Vuelve a insertarlos firmemente hasta que hagan clic</li>
<li>Si tienes dos módulos, prueba con solo uno a la vez para descartar cuál está dañado</li>
</ol>

<h2>Paso 5: Revisa la fuente de poder</h2>
<p>La fuente de poder (PSU) es la que convierte la corriente de la pared en energía para los componentes. Si falló, el equipo no enciende. Señales de fuente dañada:</p>
<ul>
<li>No hay ninguna reacción al presionar el botón de encendido, ni siquiera un "clic"</li>
<li>Olor a quemado cerca del equipo</li>
<li>El LED de la placa madre no enciende cuando el equipo está enchufado</li>
</ul>
<p>La fuente de poder no se puede reparar en casa de forma segura. Requiere reemplazo por un técnico.</p>

<h2>Paso 6: El disco duro no es detectado</h2>
<p>Si el equipo enciende, los ventiladores corren, pero la pantalla muestra "No bootable device" o "Operating System not found", el disco duro no está siendo detectado:</p>
<ul>
<li>Verifica que el cable SATA esté bien conectado al disco y a la tarjeta madre</li>
<li>Si es un SSD M.2, verifica que esté bien asentado en el slot</li>
<li>Entra al BIOS (F2, Del, F10 según la marca) y verifica si el disco aparece en la lista de dispositivos</li>
</ul>

<h2>¿Cuándo llamar a un técnico?</h2>
<p>Si verificaste todos los puntos anteriores y el equipo sigue sin encender, el problema es de hardware (fuente, tarjeta madre, procesador) y requiere diagnóstico presencial. En FIXDAY hacemos diagnóstico completo a domicilio en toda la Región Metropolitana. Con la visita te decimos exactamente qué falló y cuánto cuesta repararlo, sin compromiso.</p>
`,
  },
  {
    slug: 'diferencia-ssd-hdd',
    title: 'SSD vs HDD: diferencias, ventajas y cuál conviene para tu PC',
    description: 'Descubre la diferencia entre disco SSD y HDD, cuál es más rápido, más duradero y más económico, y cuándo vale la pena cambiar de HDD a SSD en tu computador.',
    date: '2026-05-22',
    readTime: 5,
    category: 'Hardware',
    content: `
<p>Si alguna vez escuchaste que cambiar el disco duro por un SSD hace que el computador "vuela", no es exageración. Es probablemente la mejora de rendimiento más notable que puedes hacer a un PC sin comprar uno nuevo. Acá te explicamos todo.</p>

<h2>¿Qué es un HDD?</h2>
<p>Un HDD (Hard Disk Drive) es el disco duro tradicional, mecánico. Funciona con platos magnéticos que giran a alta velocidad y cabezas de lectura que se mueven para acceder a los datos. Es como un tocadiscos en miniatura dentro de tu equipo.</p>
<p>Velocidades típicas: 80–160 MB/s de lectura. Tiempo de arranque de Windows: 1–3 minutos.</p>

<h2>¿Qué es un SSD?</h2>
<p>Un SSD (Solid State Drive) no tiene partes móviles. Almacena datos en chips de memoria flash, como los de un pendrive pero mucho más rápido y confiable. Al no tener partes mecánicas, accede a los datos en microsegundos.</p>
<p>Velocidades típicas: 500–3500 MB/s de lectura. Tiempo de arranque de Windows: 10–20 segundos.</p>

<h2>Comparativa directa</h2>
<ul>
<li><strong>Velocidad:</strong> SSD gana por amplio margen. Windows arranca en 15 segundos vs 2 minutos con HDD.</li>
<li><strong>Durabilidad:</strong> SSD gana. Sin partes móviles, resiste mejor golpes y caídas.</li>
<li><strong>Silencio:</strong> SSD gana. Los HDD hacen ruido mecánico; los SSD son completamente silenciosos.</li>
<li><strong>Precio por GB:</strong> HDD gana. Un HDD de 1 TB cuesta $25.000. Un SSD de 1 TB cuesta $60.000–$80.000.</li>
<li><strong>Vida útil:</strong> Similar en uso normal. Los SSD tienen un límite de escrituras; los HDD se desgastan mecánicamente.</li>
<li><strong>Recuperación de datos:</strong> HDD gana. Recuperar datos de un HDD dañado es más predecible que de un SSD.</li>
</ul>

<h2>Tipos de SSD</h2>
<p><strong>SSD SATA:</strong> tiene el mismo conector que un HDD. Velocidad: ~500 MB/s. Es el reemplazo directo del HDD en equipos más antiguos. Precio: desde $25.000 (240 GB) hasta $55.000 (1 TB).</p>
<p><strong>SSD NVMe M.2:</strong> conecta directamente a la tarjeta madre. Velocidad: 2000–7000 MB/s. Es 4 a 10 veces más rápido que el SSD SATA. Requiere slot M.2 en la tarjeta madre (la mayoría de los equipos desde 2016 lo tienen).</p>

<h2>¿Vale la pena cambiar de HDD a SSD?</h2>
<p>Si tu equipo tiene más de 3 años y tiene HDD, la respuesta es casi siempre sí. El cambio es tan notable que muchos usuarios creen que compraron un computador nuevo después del reemplazo.</p>
<p>Casos donde más conviene:</p>
<ul>
<li>PC con Windows que tarda más de 2 minutos en arrancar</li>
<li>Programas que tardan 30 segundos o más en abrirse</li>
<li>Guardado de archivos o instalación de programas muy lenta</li>
<li>HDD que ya empieza a hacer ruidos o mostrar errores</li>
</ul>

<h2>¿Se copian todos mis datos al cambiar de disco?</h2>
<p>Sí. El proceso de reemplazo incluye la clonación del disco: todos tus archivos, el sistema operativo, los programas instalados y tu configuración se copian al SSD nuevo. Enciendes el equipo y todo está exactamente como lo dejaste, solo que mucho más rápido.</p>
<p>En FIXDAY hacemos el reemplazo de HDD a SSD a domicilio en toda la Región Metropolitana, incluida la migración completa de datos.</p>
`,
  },
  {
    slug: 'como-limpiar-pc-sin-abrirlo',
    title: 'Cómo limpiar tu PC sin abrirlo (y cuándo sí hay que abrirlo)',
    description: 'Guía para limpiar el polvo de tu computador desde afuera y optimizar el software, más cuándo es necesaria una limpieza interna profesional.',
    date: '2026-05-23',
    readTime: 4,
    category: 'Mantención',
    content: `
<p>Mantener tu PC limpio es clave para que dure más y funcione mejor. Hay cosas que puedes hacer sin abrir el equipo, y otras que requieren intervención interna. Acá te explicamos ambas.</p>

<h2>Lo que puedes hacer sin abrir el equipo</h2>

<h3>1. Limpieza de ventilación externa</h3>
<p>Con una lata de aire comprimido (se consigue en ferreterías o tiendas de computación), puedes soplar por las rejillas de ventilación del equipo para expulsar el polvo superficial. Hazlo en un lugar bien ventilado o al aire libre para no respirar el polvo.</p>
<p>En laptops, las ranuras de ventilación suelen estar en la parte inferior o en los laterales. Sopla en ráfagas cortas para no dañar los ventiladores.</p>

<h3>2. Limpieza del teclado</h3>
<p>Voltea el teclado y sacúdelo suavemente. Luego usa aire comprimido entre las teclas para sacar miguitas y polvo acumulado. Para una limpieza profunda, usa un hisopo con un poco de alcohol isopropílico (70% o superior) para limpiar entre las teclas.</p>

<h3>3. Limpieza de pantalla</h3>
<p>Usa un paño de microfibra seco o levemente húmedo. Nunca uses limpiadores con amoníaco en pantallas LCD/OLED, ya que dañan el recubrimiento antirreflejo. Los limpiadores específicos para pantallas son los más seguros.</p>

<h3>4. Limpieza de software (archivos temporales)</h3>
<p>Presiona <code>Win + R</code>, escribe <code>temp</code> y elimina todos los archivos que aparezcan. Repite con <code>%temp%</code> y luego con <code>prefetch</code>. Estos son archivos temporales que Windows acumula y que pueden liberar varios GB de espacio.</p>

<h3>5. Limpieza del registro y programas</h3>
<p>Desinstala los programas que no uses desde el Panel de Control. Cada programa instalado ocupa espacio y muchos se ejecutan en segundo plano consumiendo memoria.</p>

<h2>Cuándo sí hay que abrir el equipo</h2>
<p>La limpieza externa ayuda, pero el polvo que realmente causa problemas está dentro, directamente en el disipador del procesador y los ventiladores. Esta limpieza interna requiere herramientas y cuidado:</p>
<ul>
<li><strong>PC lento con ventiladores ruidosos:</strong> el disipador está tapado de polvo y el procesador se sobrecalienta</li>
<li><strong>Equipo con más de 2 años sin mantención:</strong> el polvo se acumula en capas que el aire comprimido externo no llega a limpiar</li>
<li><strong>Temperatura mayor a 80°C en reposo:</strong> señal clara de que la limpieza interna es urgente</li>
<li><strong>Pasta térmica seca:</strong> después de 3–4 años la pasta térmica pierde conductividad y necesita reemplazo</li>
</ul>

<h2>¿Con qué frecuencia mantener el PC?</h2>
<p>Como referencia general:</p>
<ul>
<li>Limpieza de software (archivos temporales, programas): cada 3–6 meses</li>
<li>Limpieza externa con aire comprimido: cada 6 meses</li>
<li>Limpieza interna + reemplazo de pasta térmica: cada 12–18 meses</li>
</ul>
<p>En FIXDAY realizamos mantención completa (limpieza interna + pasta térmica + optimización de software) a domicilio en toda la Región Metropolitana.</p>
`,
  },
  {
    slug: 'senales-de-virus-en-computador',
    title: '10 señales de que tu computador tiene un virus (y qué hacer)',
    description: 'Aprende a identificar si tu PC tiene malware, adware o un virus. Síntomas claros y pasos para eliminarlo de forma segura.',
    date: '2026-05-24',
    readTime: 5,
    category: 'Mantención',
    content: `
<p>Los virus y malware modernos ya no muestran pantallas de calavera como en las películas. Muchos operan en silencio, robando datos o usando tu equipo para minar criptomonedas sin que te des cuenta. Estas son las señales más comunes.</p>

<h2>1. PC extremadamente lento sin razón aparente</h2>
<p>Si tu equipo se puso lento de repente y el Administrador de Tareas muestra procesos desconocidos usando el 50–100% de CPU o memoria, puede ser malware. Los mineros de criptomonedas son especialmente agresivos con el procesador.</p>

<h2>2. El navegador hace cosas raras</h2>
<p>Señales claras de adware o secuestrador de navegador:</p>
<ul>
<li>Tu página de inicio cambió sola a un buscador desconocido</li>
<li>Aparecen barras de herramientas que no instalaste</li>
<li>Se abren pestañas con publicidad solas</li>
<li>Las búsquedas te redirigen a otro buscador</li>
</ul>

<h2>3. Programas que se abren solos</h2>
<p>Si ves programas abrirse solos, ventanas que aparecen y desaparecen, o el cursor moviéndose solo (esto último puede indicar acceso remoto no autorizado), es una señal grave.</p>

<h2>4. Antivirus desactivado o que no puede actualizarse</h2>
<p>Algunos malware avanzados desactivan el antivirus del sistema para evitar ser detectados. Si Windows Defender está desactivado y no puedes volver a encenderlo, hay un proceso malicioso que lo está bloqueando.</p>

<h2>5. Espacio en disco que desaparece</h2>
<p>Si el disco se está llenando rápidamente sin que hayas guardado archivos nuevos, puede haber malware generando archivos o un ransomware cifrando tus datos (en ese caso, los archivos se vuelven inaccesibles y aparece una nota de rescate).</p>

<h2>6. Consumo de internet inusualmente alto</h2>
<p>Si tu internet está lento y el uso de datos es alto sin que estés descargando nada, puede haber un programa enviando información o siendo parte de una botnet (red de equipos infectados controlados remotamente).</p>

<h2>7. Mensajes de error frecuentes</h2>
<p>Errores del tipo "Windows Script Host", alertas de seguridad falsas que te piden llamar a un número telefónico, o ventanas que te dicen que tu PC está infectado (y que debes descargar su "antivirus") son señales de malware.</p>

<h2>8. El equipo se sobrecalienta en reposo</h2>
<p>Si el ventilador suena a máxima velocidad incluso cuando no estás usando el equipo, algo está usando el procesador intensivamente en segundo plano. Puede ser un minero de criptomonedas.</p>

<h2>9. Cuentas con acceso no autorizado</h2>
<p>Si recibes alertas de inicio de sesión desde ubicaciones desconocidas en tu correo, redes sociales o cuentas bancarias, puede haber un keylogger (programa que registra lo que escribes) en tu equipo.</p>

<h2>10. El PC tarda mucho en apagarse</h2>
<p>Si Windows tarda varios minutos en apagarse con el mensaje "Esperando a que [proceso desconocido] termine", ese proceso puede ser malware que intenta completar alguna operación antes de que el sistema se cierre.</p>

<h2>Qué hacer si detectas estas señales</h2>
<ol>
<li><strong>No ingreses contraseñas ni datos bancarios</strong> hasta limpiar el equipo</li>
<li>Ejecuta Windows Defender en modo completo: Seguridad de Windows → Protección contra virus → Análisis rápido → Opciones de análisis → Análisis completo</li>
<li>Descarga e instala Malwarebytes Free y haz un análisis completo</li>
<li>Si el problema persiste, considera una instalación limpia de Windows</li>
</ol>
<p>Si no te sientes cómodo haciendo esto o el problema es grave, un técnico puede eliminar el malware completamente y asegurarse de que el sistema quede limpio. En FIXDAY realizamos este servicio de optimización y eliminación de malware a domicilio en toda la Región Metropolitana.</p>
`,
  },
  {
    slug: 'como-hacer-respaldo-datos-windows',
    title: 'Cómo hacer un respaldo de datos en Windows (guía completa)',
    description: 'Aprende a hacer copias de seguridad de tus archivos en Windows con el Historial de archivos, OneDrive y disco externo. Nunca más pierdas tus datos.',
    date: '2026-05-25',
    readTime: 6,
    category: 'Recuperación de datos',
    content: `
<p>La única protección real contra la pérdida de datos es el respaldo. Discos que fallan, virus, formateos accidentales, robos — todos estos eventos son inevitables en algún momento. Esta guía te muestra tres formas de proteger tus archivos en Windows.</p>

<h2>Método 1: Historial de archivos de Windows (recomendado para archivos)</h2>
<p>El Historial de archivos de Windows copia automáticamente tus carpetas personales (Documentos, Imágenes, Música, Videos, Escritorio) a un disco externo cada hora. Si borras un archivo por accidente, puedes recuperar versiones anteriores.</p>

<h3>Cómo configurarlo:</h3>
<ol>
<li>Conecta un disco duro externo o pendrive de al menos 32 GB</li>
<li>Ve a Configuración → Actualización y seguridad → Copia de seguridad</li>
<li>Haz clic en "Agregar una unidad" y selecciona tu disco externo</li>
<li>Activa "Hacer automáticamente una copia de seguridad de mis archivos"</li>
<li>En "Más opciones" puedes configurar la frecuencia (cada 1 hora recomendado) y cuánto tiempo mantener las versiones</li>
</ol>
<p>El respaldo ocurre en segundo plano sin interrumpir tu trabajo.</p>

<h2>Método 2: OneDrive (respaldo en la nube)</h2>
<p>OneDrive es el servicio de almacenamiento en la nube de Microsoft, incluido en Windows 10 y 11. Con 5 GB gratuitos puedes proteger tus documentos más importantes.</p>

<h3>Cómo activarlo:</h3>
<ol>
<li>Busca OneDrive en el menú inicio y ábrelo (ya viene instalado)</li>
<li>Inicia sesión con tu cuenta Microsoft</li>
<li>Ve a Configuración de OneDrive → Copia de seguridad → Administrar copia de seguridad</li>
<li>Activa las carpetas Escritorio, Documentos e Imágenes</li>
</ol>
<p>Una vez activo, cualquier archivo que guardes en esas carpetas se sube automáticamente a la nube y está disponible desde cualquier dispositivo.</p>

<h2>Método 3: Imagen del sistema completo</h2>
<p>Una imagen del sistema es una copia exacta de todo tu disco: sistema operativo, programas y archivos. Si el disco falla completamente o necesitas recuperar todo desde cero, restauras la imagen y el equipo vuelve exactamente al estado en que estaba.</p>

<h3>Cómo crear una imagen en Windows:</h3>
<ol>
<li>Ve a Panel de Control → Sistema y seguridad → Copia de seguridad y restauración (Windows 7)</li>
<li>Selecciona "Crear imagen del sistema"</li>
<li>Elige el disco externo de destino (necesitas al menos tanto espacio como ocupa tu disco C:)</li>
<li>Selecciona las unidades a incluir y haz clic en "Iniciar copia de seguridad"</li>
</ol>
<p>El proceso puede tardar 30 minutos a 2 horas dependiendo del tamaño del disco.</p>

<h2>Regla del 3-2-1 para respaldos</h2>
<p>Los profesionales de TI usan la regla 3-2-1 para proteger datos importantes:</p>
<ul>
<li><strong>3</strong> copias de los datos (el original + 2 respaldos)</li>
<li><strong>2</strong> tipos de almacenamiento diferentes (ej: disco externo + nube)</li>
<li><strong>1</strong> copia fuera del sitio (nube o disco en otro lugar)</li>
</ul>
<p>Para uso doméstico, tener el archivo original + una copia en disco externo + sincronización con OneDrive es suficiente para estar bien protegido.</p>

<h2>Con qué frecuencia hacer respaldo</h2>
<ul>
<li><strong>Documentos de trabajo:</strong> respaldo automático diario mínimo (OneDrive lo hace en tiempo real)</li>
<li><strong>Fotos y videos:</strong> respaldo manual mensual a disco externo</li>
<li><strong>Imagen del sistema:</strong> cada vez que hagas cambios importantes (instalación de programas, actualizaciones mayores)</li>
</ul>

<h2>¿Y si ya perdí los datos y no tenía respaldo?</h2>
<p>Si ya ocurrió la pérdida (formateo accidental, disco dañado, archivos borrados), deja de usar el disco inmediatamente y contacta a un técnico. Cada archivo nuevo que guardes puede sobreescribir los datos que quieres recuperar. En FIXDAY realizamos recuperación de datos a domicilio en toda la Región Metropolitana, con diagnóstico previo sin costo.</p>
`,
  },
  {
    slug: 'cuanto-cuesta-pagina-web-chile',
    title: '¿Cuánto cuesta una página web en Chile en 2026?',
    description: 'Guía real de precios de páginas web en Chile: desde landing pages hasta tiendas online. Qué incluye cada rango, qué evitar y cómo saber si te están cobrando de más.',
    date: '2026-08-05',
    readTime: 7,
    category: 'Diseño Web',
    content: `
<p>Es la primera pregunta que hace todo negocio que quiere tener presencia online: <strong>¿cuánto cuesta una página web?</strong> La respuesta honesta es "depende", pero eso no ayuda a nadie a presupuestar. En esta guía te damos rangos reales del mercado chileno en 2026 y, más importante, qué deberías recibir por cada precio.</p>

<h2>Los rangos de precio en Chile (2026)</h2>
<p>Estos son los tramos habituales para un negocio pequeño o mediano:</p>
<p><strong>Landing page (una sola página): $80.000 – $200.000.</strong> Ideal para un profesional, un servicio o una campaña puntual. Una página larga y bien diseñada con tu propuesta, servicios, testimonios y un botón de contacto o WhatsApp.</p>
<p><strong>Sitio web corporativo (varias páginas): $150.000 – $500.000.</strong> Inicio, servicios, nosotros, blog y contacto. Es lo que necesita la mayoría de los negocios para verse profesionales y aparecer en Google.</p>
<p><strong>Tienda online (e-commerce): $400.000 – $1.500.000+.</strong> Catálogo de productos, carrito, pasarela de pago (Transbank, MercadoPago, Flow) y gestión de pedidos. El precio sube con la cantidad de productos y las integraciones.</p>

<h2>¿Por qué hay tanta diferencia de precio?</h2>
<p>Dos páginas que "se ven parecidas" pueden costar muy distinto. Lo que realmente cambia el precio es:</p>
<p><strong>Diseño a medida vs. plantilla.</strong> Una plantilla genérica es más barata pero se parece a miles de otros sitios. Un diseño pensado para tu marca convierte más visitas en clientes.</p>
<p><strong>Optimización para Google (SEO).</strong> Muchos sitios baratos se ven bien pero son invisibles en las búsquedas. El trabajo de SEO técnico (velocidad, estructura, datos estructurados) es lo que hace que te encuentren.</p>
<p><strong>Velocidad de carga.</strong> Una web lenta pierde clientes y posiciona peor. Optimizar imágenes y código lleva tiempo, y se nota.</p>
<p><strong>Adaptación a celular.</strong> Más del 70% del tráfico en Chile es desde el teléfono. Un sitio que no se ve bien en móvil está perdiendo a la mayoría de sus visitas.</p>

<h2>Lo que casi nadie te dice: los costos que siguen después</h2>
<p>El precio de "hacer" la web no es el único gasto. Pregunta siempre por:</p>
<p><strong>Dominio</strong> (tu dirección .cl o .com): alrededor de $10.000 al año.</p>
<p><strong>Hosting</strong> (el servidor donde vive tu sitio): entre $30.000 y $120.000 al año según la calidad.</p>
<p><strong>Mantención y soporte:</strong> algunos cobran una mensualidad, otros cobran por cambios puntuales. No hay una opción "correcta", pero debes saberlo desde el principio para no llevarte sorpresas.</p>

<h2>Señales de que te están cobrando de más (o de menos)</h2>
<p><strong>De más:</strong> te cobran una mensualidad alta "obligatoria" sin explicar qué incluye, o te amarran a una plataforma de la que no puedes salir con tu dominio y contenido.</p>
<p><strong>De menos:</strong> un precio sospechosamente bajo suele significar plantilla genérica, cero SEO, sin optimización móvil y sin soporte. Terminas pagando dos veces cuando tienes que rehacerlo.</p>

<h2>¿Cuánto cobra FIXDAY?</h2>
<p>En FIXDAY una página web profesional parte en <strong>$200.000</strong>, e incluye diseño moderno a medida, optimización para Google (SEO), adaptación a celular, y <strong>dominio y hosting incluidos el primer año</strong> — sin letra chica ni mensualidades obligatorias. Para tiendas online o proyectos más complejos, cotizamos según lo que necesitas.</p>
<p>Si quieres saber cuánto costaría exactamente tu proyecto, escríbenos por WhatsApp y te damos un valor claro sin compromiso. Atendemos negocios de todo Chile.</p>
`,
  },
  {
    slug: 'por-que-mi-pagina-web-carga-lenta',
    title: 'Por qué tu página web carga lenta (y cómo acelerarla)',
    description: 'Una web lenta pierde clientes y posiciona peor en Google. Descubre las causas más comunes de la lentitud y cómo solucionarlas para mejorar ventas y SEO.',
    date: '2026-08-12',
    readTime: 6,
    category: 'Diseño Web',
    content: `
<p>Si tu página web tarda más de 3 segundos en cargar, es muy probable que estés perdiendo clientes sin darte cuenta. Los estudios son consistentes: cada segundo extra de carga aumenta el porcentaje de visitantes que se van antes de ver tu sitio. Y desde 2021, la velocidad es un factor directo de posicionamiento en Google. Estas son las causas más comunes y cómo resolverlas.</p>

<h2>1. Imágenes pesadas sin optimizar</h2>
<p>Es, de lejos, el problema número uno. Muchas webs suben fotos directamente desde el celular o la cámara, que pueden pesar 3, 5 o hasta 10 MB cada una. El navegador tiene que descargar todo ese peso antes de mostrar la página.</p>
<p><strong>Solución:</strong> redimensionar las imágenes al tamaño real en que se muestran y comprimirlas (formatos modernos como WebP o AVIF, o JPG bien optimizado). Una foto puede pasar de 4 MB a menos de 100 KB sin pérdida visible de calidad. Solo con esto muchas webs cargan el doble de rápido.</p>

<h2>2. Demasiados plugins o scripts</h2>
<p>Especialmente en sitios WordPress, cada plugin agrega código que el navegador debe cargar. Tener 30 plugins activos —muchos que ni usas— hace que la página se arrastre.</p>
<p><strong>Solución:</strong> auditar y eliminar los plugins innecesarios, y reemplazar varios plugins pequeños por soluciones más eficientes. Menos es más rápido.</p>

<h2>3. Hosting de baja calidad</h2>
<p>Un hosting compartido muy barato pone tu sitio en un servidor con cientos de otras webs peleando por los mismos recursos. Cuando otra web del servidor recibe tráfico, la tuya se ralentiza.</p>
<p><strong>Solución:</strong> migrar a un hosting de mejor calidad o con recursos garantizados. La diferencia de precio suele ser pequeña y el impacto en velocidad, enorme.</p>

<h2>4. Falta de caché</h2>
<p>Sin caché, tu servidor reconstruye la página completa cada vez que alguien la visita. Con caché, guarda una versión lista para entregar al instante.</p>
<p><strong>Solución:</strong> activar caché a nivel de servidor o con un plugin de caché bien configurado. Es una de las mejoras más rápidas de implementar.</p>

<h2>5. Código y diseño sobrecargado</h2>
<p>Animaciones excesivas, fuentes que cargan desde muchos lugares, sliders pesados en la portada… todo suma peso. Un diseño elegante no necesita cargar 20 recursos externos.</p>
<p><strong>Solución:</strong> simplificar, cargar solo lo necesario y diferir lo que no es urgente (imágenes que están más abajo se cargan solo al hacer scroll).</p>

<h2>Cómo medir la velocidad de tu web</h2>
<p>Usa <strong>PageSpeed Insights</strong> de Google (es gratis): te da una nota de 0 a 100 en móvil y escritorio, y te dice exactamente qué está frenando tu sitio. Apunta a estar sobre 90 en móvil, que es lo que Google premia.</p>

<h2>Velocidad = más ventas y mejor SEO</h2>
<p>Acelerar tu web no es solo un tema técnico: es una de las inversiones con mejor retorno. Retienes a más visitantes, mejoras tu posición en Google y das una impresión de profesionalismo desde el primer segundo.</p>
<p>En FIXDAY diseñamos páginas rápidas desde el inicio y también optimizamos sitios existentes que van lentos. Si tu web se arrastra, escríbenos por WhatsApp y revisamos qué la está frenando. Trabajamos con negocios de todo Chile.</p>
`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
