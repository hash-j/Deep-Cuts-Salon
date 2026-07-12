import { MessageCircle } from 'lucide-react'
import { SALON } from '@/lib/salon'
import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-balance md:text-8xl">
            Ready for your next look?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed opacity-80">
            Book your appointment with Deep Cuts Salon today.
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
  )
}
