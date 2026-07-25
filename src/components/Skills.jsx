import { skills } from '../data/skills';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const half = Math.ceil(skills.length / 2);
const rowA = skills.slice(0, half);
const rowB = skills.slice(half);

// Repeated enough times that a single copy is always wider than the
// section, so the -50% loop never reveals blank space before it wraps.
const COPIES_PER_HALF = 6;

function MarqueeRow({ items, direction }) {
  const singleCopy = Array.from({ length: COPIES_PER_HALF }, () => items).flat();
  const track = [...singleCopy, ...singleCopy];
  return (
    <div className="group overflow-hidden py-2" data-testid="marquee-row">
      <div
        className={`flex w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } group-hover:[animation-play-state:paused]`}
      >
        {track.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="mr-4 flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-neutral-200"
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
        <div className="flex flex-col gap-4" aria-hidden="true" data-testid="skills-marquee">
          <MarqueeRow items={rowA} direction="left" />
          <MarqueeRow items={rowB} direction="right" />
        </div>
      </Reveal>
    </section>
  );
}
