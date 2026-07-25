import { skills } from '../data/skills';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const half = Math.ceil(skills.length / 2);
const rowA = skills.slice(0, half);
const rowB = skills.slice(half);

function MarqueeRow({ items, direction }) {
  const track = [...items, ...items];
  return (
    <div className="group overflow-hidden py-2">
      <div
        className={`flex w-max gap-4 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } group-hover:[animation-play-state:paused]`}
      >
        {track.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-neutral-200"
            >
              <Icon className="h-5 w-5 shrink-0 text-neutral-200" />
              <span>{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl overflow-hidden px-4 py-24">
      <Reveal>
        <SectionHeading>Stack de tecnologías</SectionHeading>
        <ul data-testid="skills-list" className="sr-only">
          {skills.map((skill) => (
            <li key={skill.name}>{skill.name}</li>
          ))}
        </ul>
        <div className="flex flex-col gap-4" aria-hidden="true">
          <MarqueeRow items={rowA} direction="left" />
          <MarqueeRow items={rowB} direction="right" />
        </div>
      </Reveal>
    </section>
  );
}
