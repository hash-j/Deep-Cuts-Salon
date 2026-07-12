'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SALON, SERVICES } from '@/lib/salon'
import { ImagePlaceholder } from './image-placeholder'
import { Reveal } from './reveal'

/**
 * Editorial index list of services: numbered rows that highlight on hover,
 * with a sticky preview panel showing the service image on desktop.
 */
export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                What We Do
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
                Services
              </h2>
            </div>
            <a
              href={SALON.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 transition-colors hover:text-primary hover:underline"
            >
              Book a service →
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Numbered index list */}
          <Reveal>
            <ul>
              {SERVICES.map((service, i) => (
                <li key={service.title}>
                  <a
                    href={SALON.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      'group flex items-baseline gap-6 border-b border-border py-5 transition-colors md:py-6',
                      active === i && 'border-primary/40',
                    )}
                  >
                    <span
                      className={cn(
                        'font-mono text-xs transition-colors',
                        active === i ? 'text-primary' : 'text-muted-foreground/50',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          'font-display text-xl font-medium uppercase tracking-wide transition-all duration-300 md:text-2xl',
                          active === i
                            ? 'translate-x-2 text-primary'
                            : 'text-foreground',
                        )}
                        style={{ display: 'inline-block' }}
                      >
                        {service.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{
                          height: active === i ? 'auto' : 0,
                          opacity: active === i ? 1 : 0,
                          marginTop: active === i ? 6 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="block overflow-hidden text-sm leading-relaxed text-muted-foreground"
                      >
                        {service.description}
                      </motion.span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        'h-5 w-5 shrink-0 transition-all duration-300',
                        active === i
                          ? 'translate-x-0 text-primary opacity-100'
                          : '-translate-x-2 text-muted-foreground opacity-0',
                      )}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sticky image preview (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/5]">
              <ImagePlaceholder
                src={SERVICES[active].image}
                label={`Photo — ${SERVICES[active].title}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
