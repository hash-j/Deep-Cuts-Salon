import { Scissors, Sparkles, Users, Clock, MessageCircle } from 'lucide-react'
import { Reveal } from './reveal'

const POINTS = [
  {
    icon: Scissors,
    title: 'Detail-Focused Service',
    text: 'Careful consultation and attention to the finish on every service.',
  },
  {
    icon: Sparkles,
    title: 'Modern Salon Setting',
    text: 'A contemporary space designed for a comfortable salon experience.',
  },
  {
    icon: Users,
    title: 'For Everyone',
    text: 'Dedicated services for men, women, and kids — one salon, all styles.',
  },
  {
    icon: Clock,
    title: 'Open Late, Every Day',
    text: 'Seven days a week, 8am to 4am. Your schedule, not ours.',
  },
  {
    icon: MessageCircle,
    title: 'Easy WhatsApp Booking',
    text: 'Book your chair directly with the salon in just a few taps.',
  },
]

export function WhyChoose() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            The Deep Cuts Difference
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
            Why Choose Deep Cuts
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-secondary">
                <point.icon
                  className="h-6 w-6 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-medium uppercase tracking-wide">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
