import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-3xl px-4 py-24">
      <Reveal>
        <SectionHeading>Sobre mí</SectionHeading>
        {/* TODO(usuario): bio generada como punto de partida, ajústala a tu gusto más adelante. */}
        <p data-testid="bio-text" className="text-lg leading-relaxed text-neutral-300">
          Soy desarrollador frontend con experiencia construyendo interfaces con React y
          Angular, y bases sólidas en Java, SQL y Docker que me permiten entender el proyecto
          de punta a punta. Disfruto resolver problemas reales con código limpio y estoy
          ampliando mi perfil hacia el desarrollo full stack.
        </p>
      </Reveal>
    </section>
  );
}
