import type { Metadata } from 'next'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/site/reveal'
import { ImagePlaceholder } from '@/components/site/image-placeholder'
import { SALON, SERVICES } from '@/lib/salon'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore all Deep Cuts Salon services: men\'s haircuts, beard styling, hair color, treatments, women\'s styling, kids cuts, facials, and bridal/event looks.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="relative flex min-h-[55vh] flex-col justify-end overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <ImagePlaceholder
              src="/images/services/mens-haircut.png"
              label="Premium salon services at Deep Cuts"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/25" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-8 md:pb-20">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                What We Do
              </p>
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[6rem]">
                Every Service.<br />
                <span className="text-primary">One Standard.</span>
              </h1>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                From precision fades to full color transformations — each service is executed with the same attention to detail, every single time.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {SERVICES.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.06}>
                  <div className="group relative flex flex-col bg-background transition-colors hover:bg-secondary">
                    {/* Image panel */}
                    <div className="relative h-64 overflow-hidden md:h-72">
                      <ImagePlaceholder
                        src={service.image}
                        label={`Deep Cuts Salon — ${service.title}`}
                        className="transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                      {/* Service number */}
                      <span className="absolute left-6 top-5 font-mono text-xs text-primary/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4 p-8">
                      <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
                        {service.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <a
                        href={SALON.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-fit items-center gap-3 border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Book This Service
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32">
            <Reveal>
              <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
                Not Sure What You Need?
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed opacity-80">
                Message us on WhatsApp — we&apos;ll help you choose the right service.
              </p>
              <a
                href={SALON.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 bg-primary-foreground px-12 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-opacity hover:opacity-85"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
