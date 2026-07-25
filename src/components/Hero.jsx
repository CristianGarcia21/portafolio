export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <p className="font-mono text-sm uppercase tracking-widest text-emerald-400">Hola, soy</p>
      <h1 className="text-4xl font-bold text-white sm:text-6xl">Cristian García</h1>
      <h2 className="text-xl text-neutral-300 sm:text-2xl">Frontend Developer</h2>
      <p className="max-w-xl text-neutral-400">
        Construyo interfaces limpias y funcionales, con interés creciente en llevar mis
        proyectos de extremo a extremo (full stack).
      </p>
      <div className="flex gap-4">
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
      </div>
    </section>
  );
}
