export const projects = [
  {
    id: 'agroinsumos',
    title: 'Agroinsumos',
    description:
      'Catálogo agrícola construido con Next.js, elegido por su velocidad de renderizado y su impacto en SEO y posicionamiento del negocio. Organiza los productos por cultivo (por ejemplo, mora) mostrando las enfermedades más comunes y los productos recomendados, para que el agricultor se informe antes de comprar.',
    stack: ['Next.js', 'React'],
    // Repo privado por decisión del usuario: no se muestra enlace al código.
    repoUrl: null,
    demoUrl: 'https://centro-agricola-campo.vercel.app/',
    image: '/images/projects/agroinsumos/01-dashboard.png',
  },
  {
    id: 'envios-angular',
    title: 'App de envíos (Angular)',
    description:
      'Frontend en Angular conectado a una arquitectura de 3 microservicios: seguridad en Java con manejo de roles y cifrado de datos en MongoDB, lógica de negocio con AdonisJS y MySQL, y notificaciones (correo y SMS) para autenticación de doble factor mediante servicios de Azure y Google. Incluye renderización de mapas en tiempo real con geolocalización para el seguimiento de pedidos.',
    stack: ['Angular', 'Java', 'AdonisJS', 'MongoDB', 'MySQL', 'Geolocalización en tiempo real'],
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
    images: [
      '/images/projects/pattern-design-detector/01-deteccion-antipatrones.png',
      '/images/projects/pattern-design-detector/02-sugerencia-refactor-ia.png',
      '/images/projects/pattern-design-detector/03-arquitectura-pipeline.png',
    ],
    note: 'Proyecto de investigación universitario (repositorio privado) · Presentado en el Encuentro de Semilleros de Caldas, Manizales.',
  },
];
