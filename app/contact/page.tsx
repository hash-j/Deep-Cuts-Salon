import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageCircle } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/site/reveal'
import { InstagramIcon, FacebookIcon } from '@/components/site/social-icons'
import { SALON } from '@/lib/salon'

export const metadata: Metadata = {
  title: 'Contact | Deep Cuts Salon — Visit Us in Canal Garden, Lahore',
  description:
    'Contact Deep Cuts Salon in Canal Garden Lahore. Call, WhatsApp, or get directions. Open Monday to Sunday, 8am to 4am.',
}

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: 'Address',
    value: SALON.address,
    href: SALON.mapsUrl,
    action: 'Get Directions',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: SALON.phone,
    href: `tel:${SALON.phone}`,
    action: 'Call Now',
  },
  {
    icon: Mail,
    label: 'Email',
    value: SALON.email,
    href: `mailto:${SALON.email}`,
    action: 'Send Email',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: SALON.hours,
    href: SALON.whatsapp,
    action: 'Book on WhatsApp',
  },
]

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    handle: '@deepcutssalon',
    href: SALON.instagram,
    Icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    handle: 'Deep Cuts Salon',
    href: SALON.facebook,
    Icon: FacebookIcon,
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-36 md:px-8 md:pt-44 md:pb-24">
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Find Us
              </p>
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[6rem]">
                Come In.<br />
                <span className="text-primary">We&apos;re Open.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Canal Garden, Lahore — seven days a week, 8am to 4am. Walk in, or book ahead on WhatsApp in seconds.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={SALON.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Book on WhatsApp
                </a>
                <a
                  href={`tel:${SALON.phone}`}
                  className="inline-flex items-center gap-3 border border-foreground/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact Info Cards ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Contact Info
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                Get in Touch
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
              {CONTACT_CARDS.map((card, i) => (
                <Reveal key={card.label} delay={i * 0.08}>
                  <div className="group flex h-full flex-col justify-between gap-6 bg-background p-8 transition-colors hover:bg-secondary md:p-10">
                    <div className="flex flex-col gap-4">
                      <card.icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        {card.label}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground">
                        {card.value}
                      </p>
                    </div>
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex w-fit items-center gap-2 border-b border-border pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {card.action}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Map & Location ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            {/* Info side */}
            <div className="flex flex-col justify-center px-4 py-20 md:px-16 md:py-28">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  Location
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                  Visit the Salon
                </h2>

                <ul className="mt-10 flex flex-col divide-y divide-border border-y border-border">
                  <li className="flex items-start gap-4 py-5">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Address</p>
                      <p className="mt-1 text-sm leading-relaxed">{SALON.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 py-5">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Hours</p>
                      <p className="mt-1 text-sm">{SALON.hours}</p>
                      <p className="mt-1 text-sm font-medium text-primary">{SALON.hoursShort}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 py-5">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Phone</p>
                      <a href={`tel:${SALON.phone}`} className="mt-1 block text-sm transition-colors hover:text-primary">
                        {SALON.phone}
                      </a>
                    </div>
                  </li>
                </ul>

                <a
                  href={SALON.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-3 bg-primary px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Get Directions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            {/* Google Maps embed */}
            <div className="relative min-h-[400px] lg:min-h-[600px]">
              <iframe
                src="https://maps.google.com/maps?q=Canal+Garden+Lahore+Pakistan&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Deep Cuts Salon location — Canal Garden, Lahore"
                className="absolute inset-0 h-full w-full border-l border-border"
              />
            </div>
          </div>
        </section>

        {/* ── Social Media ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Stay Connected
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                    Follow Us
                  </h2>
                </div>
                <a
                  href={SALON.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Book on WhatsApp
                </a>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
              {SOCIAL_LINKS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-6 bg-background p-8 transition-colors hover:bg-secondary md:p-10"
                    aria-label={`Follow Deep Cuts Salon on ${s.label}`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                      <s.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="mt-1 font-display text-xl font-medium uppercase tracking-wide">
                        {s.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground/40 transition-colors group-hover:text-primary" aria-hidden="true" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WhatsApp CTA ── */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32">
            <Reveal>
              <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
                Ready to Book?
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed opacity-80">
                Message us on WhatsApp — instant booking, no phone calls needed.
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
