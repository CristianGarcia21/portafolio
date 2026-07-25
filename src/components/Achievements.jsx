import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { achievements } from '../data/achievements';
import { getStatusBadge } from './achievementStatus';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Achievements() {
  return (
    <section id="logros" className="mx-auto max-w-4xl px-4 py-24">
      <Reveal>
        <SectionHeading>Logros</SectionHeading>
        <div className="relative flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-4">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-6 hidden h-px bg-white/15 sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-white/15 sm:hidden"
          />
          {achievements.map((achievement, index) => {
            const isCompleted = achievement.status === 'completed';
            const badge = getStatusBadge(achievement.status);
            return (
              <motion.div
                key={achievement.id}
                data-testid={`achievement-node-${achievement.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="relative z-10 flex flex-1 items-start gap-4 sm:flex-col sm:items-center sm:text-center"
              >
                <span
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-[#0a0a0f] ${
                    isCompleted ? 'border-emerald-400 text-emerald-400' : 'border-amber-400 text-amber-400'
                  }`}
                >
                  {!isCompleted && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/30" />
                  )}
                  {isCompleted ? (
                    <FaCheck className="relative h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span className="relative h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
                  )}
                </span>
                <div>
                  <p className="font-medium text-neutral-100">{achievement.title}</p>
                  <p className="text-sm text-neutral-400">{achievement.result}</p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
