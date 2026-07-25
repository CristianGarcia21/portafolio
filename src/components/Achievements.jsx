import { achievements } from '../data/achievements';
import { getStatusBadge } from './achievementStatus';
import Reveal from './Reveal';

export default function Achievements() {
  return (
    <section id="logros" className="mx-auto max-w-3xl px-4 py-24">
      <Reveal>
        <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-emerald-400">
          Logros
        </h2>
        <ul className="flex flex-col gap-4">
          {achievements.map((achievement) => {
            const badge = getStatusBadge(achievement.status);
            return (
              <li
                key={achievement.id}
                className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-neutral-100">{achievement.title}</p>
                  <p className="text-sm text-neutral-400">{achievement.result}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}>
                  {badge.label}
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
