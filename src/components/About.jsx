import { FaBook, FaGraduationCap, FaRocket, FaRunning } from 'react-icons/fa';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const QUICK_FACTS = [
  { icon: FaGraduationCap, label: 'Ing. de Sistemas y Computación — Universidad de Caldas' },
  { icon: FaRocket, label: 'Autodidacta' },
  { icon: FaBook, label: 'Lectura' },
  { icon: FaRunning, label: 'Deporte' },
];

export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-4xl px-4 py-24">
      <Reveal>
        <SectionHeading>Sobre mí</SectionHeading>
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div data-testid="bio-text" className="space-y-4 text-lg leading-relaxed text-neutral-300">
            <p>
              Soy estudiante de Ingeniería de Sistemas y Computación en la Universidad de Caldas,
              mitad autodidacta y mitad formado en la academia — la combinación que más me ha
              funcionado para aprender rápido. Me atrae el lado creativo de programar: convertir un
              problema abstracto en algo visual y funcional, sin perder de vista la lógica que lo
              sostiene por debajo.
            </p>
            <p>
              Agroinsumos es el proyecto del que más orgulloso estoy: mi primer proyecto freelance
              con un cliente real, con retos genuinos de despliegue y seguridad que me obligaron a
              crecer rápido. Fuera del código, la lectura y el deporte me mantienen con la cabeza
              despejada.
            </p>
            <p className="font-mono text-emerald-400">
              Autodidacta. Disciplinado. En mejora constante.
            </p>
          </div>
          <ul
            data-testid="quick-facts"
            className="flex h-fit flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-5"
          >
            {QUICK_FACTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-neutral-300">
                <Icon className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
