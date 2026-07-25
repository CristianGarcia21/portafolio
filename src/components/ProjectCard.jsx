import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasLink = Boolean(project.repoUrl || project.demoUrl);

  return (
    <article className="group flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10">
      {project.image && !imageFailed ? (
        <img
          src={project.image}
          alt={`Captura del proyecto ${project.title}`}
          className="aspect-video w-full rounded-md object-cover transition duration-300 group-hover:scale-[1.02]"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          data-testid="image-placeholder"
          className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-white/20 bg-black/40 font-mono text-sm text-neutral-500"
        >
          Capturas próximamente
        </div>
      )}
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
