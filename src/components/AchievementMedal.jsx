import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaHourglassHalf, FaTrophy } from 'react-icons/fa';
import { getStatusBadge } from './achievementStatus';

export default function AchievementMedal({ achievement }) {
  const [flipped, setFlipped] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const isCompleted = achievement.status === 'completed';
  const badge = getStatusBadge(achievement.status);
  const frontButtonRef = useRef(null);
  const backButtonRef = useRef(null);

  const flipToBack = () => {
    setFlipped(true);
    backButtonRef.current?.focus();
  };

  const flipToFront = () => {
    setFlipped(false);
    frontButtonRef.current?.focus();
  };

  const hasPendingMessage = !achievement.photo && !achievement.certificateUrl && !achievement.blogUrl;

  return (
    <div
      role="listitem"
      className="[perspective:1200px]"
      data-testid={`achievement-medal-${achievement.id}`}
    >
      <motion.div
        className="relative h-72 w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div aria-hidden={flipped} className="absolute inset-0 [backface-visibility:hidden]">
          <button
            ref={frontButtonRef}
            type="button"
            onClick={flipToBack}
            aria-expanded={flipped}
            aria-label={`Ver más sobre ${achievement.title}`}
            tabIndex={flipped ? -1 : 0}
            className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full border-2 ${
                isCompleted ? 'border-emerald-400 text-emerald-400' : 'border-amber-400 text-amber-400'
              }`}
            >
              {isCompleted ? (
                <FaTrophy className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaHourglassHalf className="h-6 w-6 animate-pulse" aria-hidden="true" />
              )}
            </span>
            <p className="font-medium text-neutral-100">{achievement.title}</p>
            <p className="text-sm text-neutral-400">{achievement.result}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}>
              {badge.label}
            </span>
            <span className="font-mono text-[11px] text-neutral-500">Ver más ↻</span>
          </button>
        </div>

        <div
          aria-hidden={!flipped}
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="flex h-full w-full flex-col gap-2 rounded-lg border border-emerald-400/30 bg-white/5 p-4">
            {achievement.photo &&
              (!photoFailed ? (
                <img
                  src={achievement.photo}
                  alt={`Equipo ganador en ${achievement.title}`}
                  className="h-32 w-full rounded-md object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div
                  data-testid="achievement-photo-placeholder"
                  className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-white/20 bg-black/40 font-mono text-xs text-neutral-500"
                >
                  Foto próximamente
                </div>
              ))}
            {achievement.team && (
              <p className="font-mono text-xs text-neutral-400">Equipo {achievement.team}</p>
            )}
            {achievement.blogUrl && (
              <a
                href={achievement.blogUrl}
                target="_blank"
                rel="noreferrer"
                tabIndex={flipped ? 0 : -1}
                className="text-sm font-medium text-emerald-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                Ver blog →
              </a>
            )}
            {achievement.certificateUrl && (
              <a
                href={achievement.certificateUrl}
                target="_blank"
                rel="noreferrer"
                tabIndex={flipped ? 0 : -1}
                className="flex items-center gap-2 text-sm font-medium text-emerald-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                <FaFilePdf aria-hidden="true" />
                Ver certificado (PDF) →
              </a>
            )}
            {hasPendingMessage && (
              <p className="font-mono text-xs italic text-neutral-400">
                Aún sin certificado — los resultados están en camino.
              </p>
            )}
            <button
              ref={backButtonRef}
              type="button"
              onClick={flipToFront}
              aria-label={`Ocultar detalles de ${achievement.title}`}
              tabIndex={flipped ? 0 : -1}
              className="-ml-3 mt-auto self-start rounded px-3 py-2 text-xs text-neutral-400 transition hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              ← Volver
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
