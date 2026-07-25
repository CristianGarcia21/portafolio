import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';

const FULL_NAME = 'Cristian García';
const PROFILE_PHOTO = '/images/profile/profile.jpg';
const CV_URL = '/documents/cv-cristian-garcia.pdf';

export default function Hero() {
  const typedName = useTypewriter(FULL_NAME);
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <motion.section
      id="inicio"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
    >
      {!photoFailed && (
        <img
          src={PROFILE_PHOTO}
          alt={`Foto de perfil de ${FULL_NAME}`}
          className="h-32 w-32 rounded-full border-2 border-emerald-400/40 object-cover sm:h-40 sm:w-40"
          onError={() => setPhotoFailed(true)}
        />
      )}
      <p className="font-mono text-sm uppercase tracking-widest text-emerald-400">Hola, soy</p>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
        <span className="sr-only">{FULL_NAME}</span>
        <span aria-hidden="true">
          {typedName}
          <span className="animate-blink text-emerald-400">▍</span>
        </span>
      </h1>
      <h2 className="text-xl text-neutral-300 sm:text-2xl">Frontend Developer</h2>
      <p className="max-w-xl text-neutral-400">
        Construyo interfaces limpias y funcionales, con interés creciente en llevar mis
        proyectos de extremo a extremo (full stack).
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="#proyectos"
          className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
        >
          Ver proyectos
        </a>
        <a
          href="#contacto"
          className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
        >
          Contacto
        </a>
        <a
          href={CV_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
        >
          Descargar CV
        </a>
      </div>
    </motion.section>
  );
}
