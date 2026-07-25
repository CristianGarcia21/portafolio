import ProjectGallery from './ProjectGallery';

export default function ProjectCard({ project }) {
  const hasLink = Boolean(project.repoUrl || project.demoUrl);

  return (
    <article className="group flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10">
      <ProjectGallery title={project.title} image={project.image} images={project.images} />
      <h3 className="text-xl font-semibold text-neutral-100 transition group-hover:text-emerald-400">
        {project.title}
      </h3>
      <p className="text-neutral-400">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-3">
        {hasLink && (
          <div className="flex gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-neutral-200 underline-offset-4 hover:text-emerald-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                Repositorio
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-emerald-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                Demo en vivo
              </a>
            )}
          </div>
        )}
        {!hasLink && project.note && (
          <p data-testid="project-note" className="font-mono text-xs italic text-neutral-400">
            {project.note}
          </p>
        )}
      </div>
    </article>
  );
}
