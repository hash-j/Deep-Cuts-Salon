'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Scissors, Sparkles, Users, Clock, MessageCircle } from 'lucide-react'
import { Reveal } from './reveal'

const POINTS = [
  {
    icon: Scissors,
    title: 'Experienced Stylists',
    text: 'Trained hands and sharp eyes on every cut, trim, and color.',
  },
  {
    icon: Sparkles,
    title: 'Clean, Modern Space',
    text: 'A spotless, contemporary salon environment you actually enjoy.',
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
    text: 'Book your chair in seconds — no calls, no waiting rooms.',
  },
]

const STATS = [
  { value: 5000, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Expert Services' },
  { value: 7, suffix: '', label: 'Days Open a Week' },
  { value: 20, suffix: 'h', label: 'Open Daily' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-2xl font-semibold text-primary sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

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

        {/* Animated stat counters */}
        <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 bg-background p-8 md:p-10">
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Points — sharp bordered grid, no rounded cards */}
        <div className="mt-px grid gap-px border border-t-0 border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
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
