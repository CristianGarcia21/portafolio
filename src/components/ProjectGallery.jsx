import { useState } from 'react';

export default function ProjectGallery({ title, image, images }) {
  const gallery = images && images.length > 0 ? images : image ? [image] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState(() => new Set());

  const hasMultiple = gallery.length > 1;
  const currentSrc = gallery[activeIndex];
  const showPlaceholder = gallery.length === 0 || !currentSrc || failedIndices.has(activeIndex);

  const goTo = (index) => {
    setActiveIndex((index + gallery.length) % gallery.length);
  };

  const markFailed = (index) => {
    setFailedIndices((prev) => new Set(prev).add(index));
  };

  return (
    <div className="relative">
      {showPlaceholder ? (
        <div
          data-testid="image-placeholder"
          className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-white/20 bg-black/40 font-mono text-sm text-neutral-500"
        >
          Capturas próximamente
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={`Captura ${activeIndex + 1} de ${gallery.length} del proyecto ${title}`}
          className="aspect-video w-full rounded-md object-cover transition duration-300 group-hover:scale-[1.02]"
          onError={() => markFailed(activeIndex)}
        />
      )}
      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-2 py-1 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-2 py-1 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {gallery.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir a imagen ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => goTo(index)}
                className={`h-1.5 w-1.5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  index === activeIndex ? 'bg-emerald-400' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
