import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { NAV_LINKS, SALON } from '@/lib/salon'
import { Logo } from './logo'
import { InstagramIcon, FacebookIcon } from './social-icons'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A modern unisex salon in Canal Garden Lahore — premium cuts,
            grooming, and styling for men, women, and kids.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SALON.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Deep Cuts Salon on Instagram"
              className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SALON.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Deep Cuts Salon on Facebook"
              className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={SALON.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Deep Cuts Salon on WhatsApp"
              className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Quick Links
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Contact
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li className="leading-relaxed text-muted-foreground">{SALON.address}</li>
            <li>
              <a href={`tel:${SALON.phoneLink}`} className="transition-colors hover:text-primary">
                {SALON.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SALON.email}`} className="transition-colors hover:text-primary">
                {SALON.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Business Hours
          </h3>
          <p className="mt-5 text-sm text-muted-foreground">{SALON.hours}</p>
          <p className="mt-2 text-sm font-medium text-primary">{SALON.hoursShort}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Deep Cuts Salon. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em]">Canal Garden · Lahore</p>
        </div>
      </div>
    </footer>
  )
}
