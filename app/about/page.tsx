import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Scissors, Sparkles, Users, Clock, MapPin } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Reveal } from '@/components/site/reveal'
import { ImagePlaceholder } from '@/components/site/image-placeholder'
import { FinalCta } from '@/components/site/final-cta'
import { SALON } from '@/lib/salon'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn the story behind Deep Cuts Salon — a modern unisex salon in Canal Garden Lahore built on precision cuts, expert grooming, and a standard for every client.',
}

const VALUES = [
  {
    number: '01',
    title: 'Precision Over Speed',
    text: 'Every cut is deliberate. We take the time to understand what you want before we pick up the scissors.',
  },
  {
    number: '02',
    title: 'Clean Space, Every Time',
    text: 'A spotless station, sanitised tools, and a fresh environment — that\'s the baseline, not a bonus.',
  },
  {
    number: '03',
    title: 'Honest Advice',
    text: 'We tell you what works for your face, hair type, and lifestyle — not just what you want to hear.',
  },
  {
    number: '04',
    title: 'Open When You Need Us',
    text: 'Seven days a week until 4am. Because looking sharp doesn\'t follow a nine-to-five schedule.',
  },
]

const TEAM_SERVICES = [
  { label: "Men's Cuts & Fades", icon: Scissors },
  { label: 'Beard Trim & Styling', icon: Sparkles },
  { label: "Women's Hair Styling", icon: Users },
  { label: 'Kids Haircuts', icon: Users },
  { label: 'Hair Color & Treatments', icon: Sparkles },
  { label: 'Facials & Grooming', icon: Scissors },
]

const FEATURES = [
  { value: 'Open 7 Days', label: '8am to 4am Schedule' },
  { value: 'WhatsApp', label: 'Easy Instant Booking' },
  { value: 'Unisex', label: 'Men, Women & Kids' },
  { value: 'Canal Garden', label: 'Premium Location' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="relative h-[50vh] min-h-[400px] w-full lg:h-[60vh]">
            <ImagePlaceholder
              src="/images/about/hero-bg.png"
              label="Deep Cuts Salon interior wide shot"
              className="absolute inset-0"
              priority
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/80" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-8 md:pb-24">
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Our Story
              </p>
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[6rem]">
                Built on a Standard.<br />
                <span className="text-primary">Not Just a Cut.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Deep Cuts Salon is where Canal Garden, Lahore comes to look its sharpest. Premium grooming for men, women, and kids — open seven days until 4am.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Business Strengths Strip ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
              {FEATURES.map((feature) => (
                <div key={feature.label} className="flex flex-col justify-center gap-3 bg-background p-8 text-center md:p-10">
                  <span className="font-display text-2xl font-semibold uppercase text-primary md:text-3xl">
                    {feature.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Brand Story ── */}
        <section className="border-b border-border">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[380px] lg:min-h-[600px]">
              <ImagePlaceholder
                src="/images/about/interior-2.png"
                label="Deep Cuts Salon styling stations"
                className="absolute inset-0 border-r border-border"
              />
            </div>

            <div className="flex flex-col justify-center px-4 py-20 md:px-16 md:py-28">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  The Beginning
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                  More Than a Haircut.<br />A Standard.
                </h2>
                <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Deep Cuts Salon started with a simple idea: that everyone in Canal Garden deserves a genuinely great grooming experience. Not a quick trim. Not an average shave. Something that makes you walk out feeling sharper than when you walked in.
                </p>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  We built a space that takes pride in every detail — the cut, the tools, the atmosphere, and the people behind the chair. That standard hasn&apos;t changed.
                </p>
                <a
                  href={SALON.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-3 bg-primary px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Book on WhatsApp
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── What We Stand For ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                What We Believe
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
                What Deep Cuts Stands For
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <Reveal key={v.number} delay={i * 0.08}>
                  <div className="group flex h-full flex-col gap-5 bg-background p-8 transition-colors hover:bg-secondary md:p-10">
                    <span className="font-mono text-xs text-primary">{v.number}</span>
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-wide">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Salon Experience — image right ── */}
        <section className="border-b border-border bg-secondary/40">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center px-4 py-20 md:px-16 md:py-28">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  The Experience
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
                  A Modern Salon Built for Everyone
                </h2>
                <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Walk into a clean, contemporary space where every station is ready, every stylist is focused, and every appointment is taken seriously. Whether it&apos;s your first visit or your hundredth, the experience is consistently excellent.
                </p>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Men, women, and kids are all welcome here. Different services, same standard.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 border border-border px-4 py-2">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Open 7 Days · 8am–4am
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-border px-4 py-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Canal Garden, Lahore
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative min-h-[380px] lg:min-h-[600px]">
              <ImagePlaceholder
                src="/images/about/team.png"
                label="Deep Cuts Salon team at work"
                className="absolute inset-0 border-l border-border"
              />
            </div>
          </div>
        </section>

        {/* ── Services Overview ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                What We Offer
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
                Services for Every Chair
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {TEAM_SERVICES.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div className="group flex items-center gap-5 bg-background p-8 transition-colors hover:bg-secondary">
                    <s.icon
                      className="h-6 w-6 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-display text-lg font-medium uppercase tracking-wide">
                      {s.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/services"
                  className="border border-foreground/30 px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  View All Services →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
