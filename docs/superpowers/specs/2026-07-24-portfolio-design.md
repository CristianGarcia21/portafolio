# Diseño: Portafolio personal (Frontend Developer)

## Objetivo

Sitio de portafolio personal para postularse a una vacante de Frontend Developer,
con miras a que a futuro sirva también para postulaciones full stack. Debe mostrar
proyectos propios y logros en hackathones de forma clara y profesional.

## Stack y arquitectura

- **React + Vite** como base del proyecto.
- **Tailwind CSS** para estilos.
- Sitio **single-page** con navegación por anclas (scroll a secciones), sin rutas
  múltiples ni backend.
- Sin base de datos ni servidor propio: sitio 100% estático.
- Contacto vía enlaces directos (`mailto:`, LinkedIn, GitHub) — sin formulario
  backend por ahora.
- Repositorio en GitHub conectado a **Netlify** para deploy automático en cada
  push a `main`.
  - Build command: `npm run build`
  - Publish directory: `dist`

## Estructura de secciones (orden de scroll)

1. **Hero / Inicio**
   - Nombre, título "Frontend Developer" (con mención sutil a interés en full stack).
   - Frase corta de impacto.
   - Botones: "Ver proyectos" (ancla a Proyectos) y "Contacto" (ancla a Contacto).
   - Elemento visual acorde al dark mode (foto opcional o gráfico/animación sutil).

2. **Sobre mí**
   - Bio corta (3-4 líneas): quién es, enfoque como developer, motivación.

3. **Stack de tecnologías**
   - Grid de íconos/badges con las tecnologías que domina (lista exacta a definir
     con el usuario antes de implementar: incluye al menos React, Angular, JS).

4. **Proyectos** (2 tarjetas)
   - **Agroinsumos**: capturas de pantalla, descripción, stack usado, enlace a
     repo y enlace a demo en vivo (assets disponibles).
   - **App de envíos (Angular, proyecto universitario)**: descripción, stack
     usado, enlace a repo. Sin capturas ni demo disponibles todavía — usar un
     placeholder visual prolijo (no una imagen rota ni un hueco vacío).

5. **Logros / Hackathones** (línea de tiempo o tarjetas)
   - 🥇 Hackathon Talento Tech — 1er lugar.
   - 🥈 Hackathon Colombia 5.0 — 2do lugar.
   - 🔄 Hackathon Open Data Colombia — estado "En curso / esperando resultados"
     (actualizar manualmente cuando se conozca el resultado final).

6. **Contacto**
   - Enlaces directos y visibles a email, LinkedIn y GitHub.

## Estilo visual

- **Modo**: dark mode tipo "developer".
- **Paleta**: fondo casi negro (`#0a0a0f` aprox.), texto claro (`#e5e5e5` aprox.),
  **acento verde esmeralda** único para links, botones y estados hover/focus.
  No usar más de un color de acento en toda la página.
- **Tipografía**: sans-serif moderna (ej. Inter) para texto general; opcionalmente
  una monoespaciada (ej. JetBrains Mono) para detalles tipo "código" (hero,
  badges de tecnologías).
- **Componentes**: tarjetas con bordes sutiles/sombra suave, animaciones ligeras
  al hacer scroll/hover (fade-in, sin exagerar).
- **Responsive**: diseño mobile-first, ya que parte de los reclutadores revisan
  portafolios desde el celular.

## Fuera de alcance (por ahora)

- Formulario de contacto con backend (se puede agregar después con Formspree
  o similar si se necesita).
- Sección de formación/certificaciones (el usuario decidió no incluirla en esta
  versión).
- Blog o CMS.
- Multi-idioma.

## Contenido pendiente de parte del usuario (antes de implementar)

- Capturas de pantalla y enlace de demo del proyecto Agroinsumos.
- Lista exacta de tecnologías/skills a mostrar en el grid.
- Texto final de la bio "Sobre mí".
- Datos de contacto (email, URL de LinkedIn, URL de GitHub).
