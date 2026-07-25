import { achievements } from '../data/achievements';
import AchievementMedal from './AchievementMedal';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Achievements() {
  return (
    <section id="logros" className="mx-auto max-w-4xl px-4 py-24">
      <Reveal>
        <SectionHeading>Logros</SectionHeading>
        <div role="list" className="grid gap-6 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementMedal key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
