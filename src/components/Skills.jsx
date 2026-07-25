import { skills } from '../data/skills';
import Reveal from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-4 py-24">
      <Reveal>
        <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400">
          Stack de tecnologías
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <li
                key={skill.name}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-neutral-200"
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-neutral-200" />
                <span>{skill.name}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
