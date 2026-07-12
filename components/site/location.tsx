import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react'
import { SALON } from '@/lib/salon'
import { ImagePlaceholder } from './image-placeholder'
import { Reveal } from './reveal'

export function Location() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-20 md:px-16 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Find Us
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
              Visit Us
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
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Phone</p>
                  <a href={`tel:${SALON.phone}`} className="mt-1 block text-sm transition-colors hover:text-primary">
                    {SALON.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 py-5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Email</p>
                  <a href={`mailto:${SALON.email}`} className="mt-1 block text-sm transition-colors hover:text-primary">
                    {SALON.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 py-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Business Hours</p>
                  <p className="mt-1 text-sm">{SALON.hours}</p>
                </div>
              </li>
            </ul>

            <a
              href={SALON.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex w-fit items-center gap-3 bg-primary px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Get Directions
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <ImagePlaceholder
            src="/images/salon/interior.png"
            label="Deep Cuts Salon interior"
            className="absolute inset-0 border-l border-border"
          />
        </div>
      </div>
    </section>
  )
}
