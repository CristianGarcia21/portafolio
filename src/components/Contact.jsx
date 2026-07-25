import { contact } from '../data/contact';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section
      id="contacto"
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center"
    >
      <Reveal>
        <h2 className="font-mono text-sm uppercase tracking-widest text-emerald-400">Contacto</h2>
        <p className="mt-6 max-w-md text-neutral-400">
          ¿Quieres hablar sobre una oportunidad o un proyecto? Escríbeme.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            Email
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            LinkedIn
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-emerald-500 px-6 py-3 font-medium text-emerald-400 transition hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
