import { ArrowUpRight } from 'lucide-react'
import { SALON } from '@/lib/salon'
import { Reveal } from './reveal'

/** Links to the salon's public review profile without reproducing unverified quotes. */
export function Testimonials() {
  return (
    <section id="reviews" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="grid gap-10 border border-border bg-secondary/40 p-8 md:grid-cols-[1fr_auto] md:items-end md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Client Reviews
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                See What Clients Are Saying.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Read feedback directly on the salon&apos;s public Google profile, where the latest reviews and ratings are maintained.
              </p>
            </div>
            <a
              href={SALON.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Read Google Reviews
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
