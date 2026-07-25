import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <SectionHeading>Proyectos</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
