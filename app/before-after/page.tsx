'use client'

import { useState } from 'react'
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/site/reveal'
import { SALON } from '@/lib/salon'

/**
 * Before/After page — requires these images inside public/images/before-after/:
 *
 * before-1.jpg — Haircut: messy / long before shot
 * after-1.jpg  — Haircut: clean skin fade or taper result
 * before-2.jpg — Beard: overgrown / unshaved beard
 * after-2.jpg  — Beard: sharp lined and trimmed beard
 * before-3.jpg — Color: natural / undyed hair
 * after-3.jpg  — Color: highlighted or fashion-colored result
 * before-4.jpg — Women's: unstyled / flat hair
 * after-4.jpg  — Women's: blowout or styled result
 * before-5.jpg — Kids: messy kid hair
 * after-5.jpg  — Kids: neat kids cut
 * before-6.jpg — Full grooming: before full groom package
 * after-6.jpg  — Full grooming: after full groom package
 */

const TRANSFORMATIONS = [
  {
    id: 1,
    category: "Men's Haircut",
    label: 'Skin Fade Transformation',
    before: '/images/before-after/before-1.jpg',
    after: '/images/before-after/after-1.jpg',
    beforeLabel: 'Before — Overgrown',
    afterLabel: 'After — Skin Fade',
  },
  {
    id: 2,
    category: 'Beard Styling',
    label: 'Beard Shape-Up',
    before: '/images/before-after/before-2.jpg',
    after: '/images/before-after/after-2.jpg',
    beforeLabel: 'Before — Unshaved',
    afterLabel: 'After — Sharp Lines',
  },
  {
    id: 3,
    category: 'Hair Color',
    label: 'Color Transformation',
    before: '/images/before-after/before-3.jpg',
    after: '/images/before-after/after-3.jpg',
    beforeLabel: 'Before — Natural',
    afterLabel: 'After — Color Applied',
  },
  {
    id: 4,
    category: "Women's Styling",
    label: 'Full Styling Session',
    before: '/images/before-after/before-4.jpg',
    after: '/images/before-after/after-4.jpg',
    beforeLabel: 'Before — Unstyled',
    afterLabel: 'After — Blowout Finish',
  },
  {
    id: 5,
    category: 'Kids Haircut',
    label: "Little One's First Cut",
    before: '/images/before-after/before-5.jpg',
    after: '/images/before-after/after-5.jpg',
    beforeLabel: 'Before — Messy',
    afterLabel: 'After — Neat & Clean',
  },
  {
    id: 6,
    category: 'Full Grooming Package',
    label: 'Complete Groom',
    before: '/images/before-after/before-6.jpg',
    after: '/images/before-after/after-6.jpg',
    beforeLabel: 'Before — Package Start',
    afterLabel: 'After — Full Groom',
  },
]

/** Placeholder box used when real images are absent */
function SlotPlaceholder({ label, side }: { label: string; side: 'before' | 'after' }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 ${
        side === 'before' ? 'bg-secondary' : 'bg-secondary/60'
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
        {side === 'before' ? '← Before' : 'After →'}
      </span>
      <span className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/40">
        {label}
      </span>
    </div>
  )
}

/** Split-panel before/after card with draggable divider */
function BeforeAfterCard({
  item,
}: {
  item: (typeof TRANSFORMATIONS)[0]
}) {
  const [sliderX, setSliderX] = useState(50) // percentage

  return (
    <div className="flex flex-col border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            {item.category}
          </p>
          <p className="mt-0.5 font-display text-lg font-medium uppercase tracking-wide">
            {item.label}
          </p>
        </div>
        <span className="font-mono text-xs text-muted-foreground/50">
          #{String(item.id).padStart(2, '0')}
        </span>
      </div>

      {/* Split Panel */}
      <div
        className="relative h-80 cursor-col-resize select-none overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const pct = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 5), 95)
          setSliderX(pct)
        }}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const touch = e.touches[0]
          const pct = Math.min(Math.max(((touch.clientX - rect.left) / rect.width) * 100, 5), 95)
          setSliderX(pct)
        }}
        role="img"
        aria-label={`Before and after comparison: ${item.label}`}
      >
        {/* After panel (full width background) */}
        <div className="absolute inset-0">
          <SlotPlaceholder label={item.afterLabel} side="after" />
        </div>

        {/* Before panel (clips to slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderX}%` }}
        >
          <div className="h-full w-full" style={{ width: `${100 / (sliderX / 100)}%`, maxWidth: 'none' }}>
            <SlotPlaceholder label={item.beforeLabel} side="before" />
          </div>
        </div>

        {/* Divider line */}
        <motion.div
          className="absolute inset-y-0 z-10 flex items-center"
          style={{ left: `${sliderX}%` }}
        >
          <div className="h-full w-px bg-primary/60" />
          {/* Drag handle */}
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-primary bg-background shadow-lg">
            <ChevronLeft className="h-3 w-3 text-primary" />
            <ChevronRight className="h-3 w-3 text-primary" />
          </div>
        </motion.div>

        {/* Labels */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20">
          <span className="bg-background/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
            Before
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 z-20">
          <span className="bg-primary px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-primary-foreground">
            After
          </span>
        </div>
      </div>

      {/* Footer hint */}
      <div className="border-t border-border px-6 py-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
          Drag the divider to compare
        </p>
      </div>
    </div>
  )
}

export default function BeforeAfterPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-36 md:px-8 md:pt-44 md:pb-24">
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Transformations
              </p>
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[6rem]">
                Before &amp; After.<br />
                <span className="text-primary">Every Chair.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Real results from real clients at Deep Cuts Salon. Drag the divider on each card to compare the before and after.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Comparison Grid ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {TRANSFORMATIONS.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.07}>
                  <BeforeAfterCard item={item} />
                </Reveal>
              ))}
            </div>

            {/* Image requirements note — remove after adding real images */}
            <Reveal delay={0.3}>
              <div className="mt-16 border border-border bg-secondary/40 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  📸 Image Requirements
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Add 12 photos to <code className="text-primary">public/images/before-after/</code>:
                  {' '}before-1.jpg through before-6.jpg and after-1.jpg through after-6.jpg.
                  Each pair corresponds to one transformation card above.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32">
            <Reveal>
              <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
                Ready for Your Transformation?
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed opacity-80">
                Book your appointment on WhatsApp — we&apos;re open 7 days, 8am to 4am.
              </p>
              <a
                href={SALON.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 bg-primary-foreground px-12 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-opacity hover:opacity-85"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Book on WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
