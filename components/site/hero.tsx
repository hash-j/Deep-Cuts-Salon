'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, MapPin, CalendarDays } from 'lucide-react'
import { SALON } from '@/lib/salon'
import { ImagePlaceholder } from './image-placeholder'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Custom parallax scroll settings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Subtle shift of background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Parallax layered background image — moody barbershop scene */}
      <motion.div style={{ y: backgroundY }} className="hero-parallax absolute inset-0 h-[115%] w-full">
        <ImagePlaceholder
          src="/images/salon/hero-bg.png"
          label="Barber giving a precision haircut at Deep Cuts Salon"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-40 md:px-8 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="hero-motion mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
        >
          Unisex Salon · Canal Garden Lahore
        </motion.p>

        <h1 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground text-balance sm:text-7xl lg:text-[7rem]">
          {['Sharp Cuts.', 'Clean Style.', 'Deep Confidence.'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="hero-motion block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease }}
              >
                {i === 2 ? <span className="text-primary">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="hero-motion mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Premium grooming, styling, and salon services for men, women, and kids
          in Canal Garden Lahore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease }}
          className="hero-motion mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={SALON.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary px-10 py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-foreground hover:text-background hover:shadow-[0_0_20px_rgba(212,163,89,0.35)]"
          >
            Book Appointment
          </a>
          <Link
            href="/services"
            className="border border-foreground/30 px-10 py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:text-primary hover:shadow-[0_0_20px_rgba(212,163,89,0.15)]"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Quick info strip */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="hero-motion mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <li className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            Open 7 Days
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            8am – 4am
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            Canal Garden Lahore
          </li>
        </motion.ul>
      </div>
    </section>
  )
}
