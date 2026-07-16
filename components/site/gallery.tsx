import Link from 'next/link'
import { ImagePlaceholder } from './image-placeholder'
import { Reveal } from './reveal'

/** Gallery preview — asymmetric editorial grid of client-provided photos. */
const ITEMS = [
  { src: '/images/gallery/gallery-1.png', label: 'Haircut result', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/gallery/gallery-2.png', label: 'Salon work', span: '' },
  { src: '/images/gallery/gallery-3.png', label: 'Salon interior', span: '' },
  { src: '/images/gallery/gallery-4.png', label: 'Styling result', span: '' },
  { src: '/images/gallery/gallery-5.png', label: 'Grooming session', span: '' },
]

export function Gallery() {
  return (
    <section id="gallery" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                The Work
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
                Gallery
              </h2>
            </div>
            <Link
              href="/gallery"
              className="w-fit border border-foreground/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Full Gallery
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-px border border-border bg-border md:grid-cols-4 md:auto-rows-[260px]">
          {ITEMS.map((item, i) => (
            <div
              key={item.src}
              className={`group relative overflow-hidden bg-background ${item.span} ${i === 0 ? 'col-span-2' : ''}`}
            >
              <ImagePlaceholder
                src={item.src}
                label={`Photo — ${item.label}`}
                className="border-0 transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Subtle hover vignette overlay and elegant gold border border */}
              <div className="pointer-events-none absolute inset-0 border border-primary/0 bg-black/0 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-black/30" />
              <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="bg-background/90 border border-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
