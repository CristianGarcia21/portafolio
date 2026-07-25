import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-4xl px-4 py-24">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400">
        Proyectos
      </h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
