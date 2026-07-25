export const projects = [
  {
    id: 'agroinsumos',
    title: 'Agroinsumos',
    // TODO(usuario): ajusta esta descripción con el detalle real del proyecto.
    description:
      'Plataforma para la gestión y venta de insumos agrícolas, con catálogo de productos y seguimiento de pedidos.',
    stack: ['React', 'Node.js'],
    // Repo privado por decisión del usuario: no se muestra enlace al código.
    repoUrl: null,
    demoUrl: 'https://centro-agricola-campo.vercel.app/',
    image: '/images/projects/agroinsumos/01-dashboard.png',
  },
  {
    id: 'envios-angular',
    title: 'App de envíos (Angular)',
    description:
      'Aplicación de seguimiento de envíos desarrollada como proyecto universitario.',
    stack: ['Angular', 'TypeScript'],
    repoUrl: 'https://github.com/CristianGarcia21/ms-frontend',
    demoUrl: null,
    image: null,
  },
  {
    id: 'pattern-design-detector',
    title: 'Pattern Design Detector',
    description:
      'Extensión de Visual Studio Code que detecta antipatrones de diseño en proyectos Java. Combina análisis estático con Java Tree-sitter y un pipeline de agentes de IA que sugieren el refactor correspondiente.',
    stack: ['Extensión VS Code', 'TypeScript', 'Python', 'Java Tree-sitter', 'IA'],
    // Repo privado dentro de la organización de la universidad (proyecto de semillero en desarrollo).
    repoUrl: null,
    demoUrl: null,
    // TODO(usuario): sube un mockup a public/images/projects/pattern-design-detector/ y actualiza esta ruta.
    image: null,
    note: 'Proyecto de investigación universitario (repositorio privado) · Presentado en el Encuentro de Semilleros de Caldas, Manizales.',
  },
];
