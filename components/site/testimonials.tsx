import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/salon'
import { Reveal } from './reveal'

/** "Notes From Our Clients" — infinite sliding marquee of reviews. */
export function Testimonials() {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section id="reviews" className="overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Reviews
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
                Notes From Our Clients
              </h2>
            </div>
            {/* Verified live rating from the salon's Google Business profile */}
            <a
              href="https://www.google.com/maps?cid=4430934913319300766"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-4 border border-border px-6 py-4 transition-colors hover:border-primary"
            >
              <span className="font-display text-4xl font-semibold text-primary">
                4.9
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex gap-0.5" aria-label="4.9 out of 5 stars on Google">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Rated on Google
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-16 pb-24 md:pb-32">
        <div className="flex w-max animate-marquee gap-px bg-border">
          {loop.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[320px] shrink-0 flex-col justify-between gap-6 bg-background p-8 md:w-[420px] md:p-10"
            >
              <div>
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
              </div>
              <figcaption className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  )
}
