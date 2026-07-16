import Link from 'next/link'
import { ImagePlaceholder } from './image-placeholder'
import { Reveal } from './reveal'

/** Split editorial layout: full-bleed image left, story right. */
export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <ImagePlaceholder
            src="/images/salon/about-salon.png"
            label="Inside Deep Cuts Salon"
            className="absolute inset-0 border-r border-border"
          />
        </div>

        <div className="flex flex-col justify-center px-4 py-20 md:px-16 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Our Story
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
              More Than a Haircut. A Standard.
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Deep Cuts Salon is a modern unisex salon in the heart of Canal
              Garden, Lahore — built on clean cuts, precise grooming, and styling
              that makes you walk out sharper than you walked in.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Whether it&apos;s a skin fade, a full color transformation, or a
              first haircut for your kid, our stylists treat every chair like a
              craft station. Open every single day until late, because confidence
              doesn&apos;t keep office hours.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-block w-fit border border-foreground/30 px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Visit The Salon
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
