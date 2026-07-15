import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/site/reveal'
import { ImagePlaceholder } from '@/components/site/image-placeholder'
import { InstagramIcon } from '@/components/site/social-icons'
import { SALON } from '@/lib/salon'

export const metadata: Metadata = {
  title: 'Gallery | Deep Cuts Salon — Salon Interior, Haircuts & Grooming Photos',
  description:
    'Browse the Deep Cuts Salon photo gallery — salon interior, precision haircuts, beard styling, and grooming results from Canal Garden, Lahore.',
}

// ── Gallery data ──────────────────────────────────────────
// IMAGES NEEDED: public/images/gallery/gallery-1.png through gallery-5.png (homepage already uses these)
// For the interior section add: public/images/gallery/interior-1.png, interior-2.png, interior-3.png
// For the grooming section add: public/images/gallery/grooming-1.png through grooming-4.png

const INTERIOR_ITEMS = [
  { src: '/images/gallery/interior-1.png', label: 'Salon front entrance', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/gallery/interior-2.png', label: 'Styling stations row' },
  { src: '/images/gallery/interior-3.png', label: 'Barber chair close-up' },
]

const HAIRCUT_ITEMS = [
  { src: '/images/gallery/gallery-1.png', label: 'Skin fade result' },
  { src: '/images/gallery/gallery-2.png', label: 'Classic taper cut' },
  { src: '/images/gallery/gallery-3.png', label: 'Hair color transformation', span: 'md:col-span-2' },
  { src: '/images/gallery/gallery-4.png', label: 'Beard line-up' },
  { src: '/images/gallery/gallery-5.png', label: "Women's blowout" },
]

const GROOMING_ITEMS = [
  { src: '/images/gallery/grooming-1.png', label: 'Hot towel shave' },
  { src: '/images/gallery/grooming-2.png', label: 'Facial treatment' },
  { src: '/images/gallery/grooming-3.png', label: 'Hair treatment application', span: 'md:row-span-2' },
  { src: '/images/gallery/grooming-4.png', label: 'Bridal styling result' },
]

const INSTAGRAM_POSTS = [
  { src: '/images/instagram/post-1.jpg', url: 'https://www.instagram.com/p/Dakz7ABsIp3/' },
  { src: '/images/instagram/post-2.jpg', url: 'https://www.instagram.com/p/DYAv9zdub_k/' },
  { src: '/images/instagram/post-3.jpg', url: 'https://www.instagram.com/p/DZxViF5CX0O/' },
  { src: '/images/instagram/post-4.jpg', url: 'https://www.instagram.com/p/DafysvCsTa_/' },
  { src: '/images/instagram/post-5.jpg', url: 'https://www.instagram.com/p/DWFLFkQDJSj/' },
  { src: '/images/instagram/post-6.jpg', url: 'https://www.instagram.com/p/DZ4g8GFOR8F/' },
]

interface GalleryItem {
  src: string
  label: string
  span?: string
}

function GalleryGrid({ items, rows = '220px' }: { items: GalleryItem[]; rows?: string }) {
  return (
    <div
      className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3"
      style={{ gridAutoRows: rows }}
    >
      {items.map((item, i) => (
        <div
          key={`${item.src}-${i}`}
          className={`group relative overflow-hidden bg-background ${item.span ?? ''}`}
        >
          <ImagePlaceholder
            src={item.src}
            label={item.label}
            className="border-0 transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Hover vignette */}
          <div className="pointer-events-none absolute inset-0 border border-primary/0 bg-black/0 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-black/25" />
          <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="border border-white/10 bg-background/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur-md">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative flex min-h-[55vh] flex-col justify-end overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <ImagePlaceholder
              src="/images/gallery/gallery-1.png"
              label="Deep Cuts Salon gallery"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-8 md:pb-20">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                The Work
              </p>
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[6rem]">
                The Salon.<br />
                <span className="text-primary">The Results.</span>
              </h1>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                A look inside Deep Cuts Salon — the space, the process, and the finishes that keep clients coming back.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Salon Interior ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    The Space
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                    Salon Interior
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  A clean, modern environment purpose-built for premium grooming — no clutter, no compromise.
                </p>
              </div>
            </Reveal>
            <GalleryGrid items={INTERIOR_ITEMS} rows="260px" />
          </div>
        </section>

        {/* ── Haircut / Styling ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Hair &amp; Style
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                    Haircuts &amp; Styling
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Fades, tapers, color work, and women&apos;s styling — every finish photographed straight from the chair.
                </p>
              </div>
            </Reveal>
            <GalleryGrid items={HAIRCUT_ITEMS} rows="240px" />
          </div>
        </section>

        {/* ── Grooming ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Grooming
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                    Facials &amp; Grooming
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  From hot-towel shaves to full grooming packages — detailed work captured in full.
                </p>
              </div>
            </Reveal>
            <GalleryGrid items={GROOMING_ITEMS} rows="240px" />
          </div>
        </section>

        {/* ── Instagram CTA ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    @deepcutssalon
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                    Follow The Style
                  </h2>
                </div>
                <a
                  href={SALON.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  <InstagramIcon className="h-4 w-4" aria-hidden="true" />
                  Follow Us
                </a>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {INSTAGRAM_POSTS.map((post, i) => (
                <a
                  key={post.src}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden bg-background"
                  aria-label={`View Instagram post ${i + 1}`}
                >
                  <ImagePlaceholder
                    src={post.src}
                    label={`Instagram post ${i + 1} from @deepcutssalon`}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors duration-300 group-hover:bg-primary/80">
                    <InstagramIcon className="h-6 w-6 text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
