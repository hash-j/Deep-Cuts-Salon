'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SALON } from '@/lib/salon'
import { Logo } from './logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 z-50 transition-all duration-500',
        demoMode ? 'top-8' : 'top-0',
        scrolled
          ? 'border-b border-white/5 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8"
      >
        <Link href="/" aria-label="Deep Cuts Salon — Home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'relative py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-primary after:transition-transform',
                  pathname === link.href
                    ? 'text-foreground after:scale-x-100'
                    : 'text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={SALON.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-[0_0_15px_rgba(var(--primary-glow),0.4)] sm:inline-block"
            style={{
              boxShadow: '0 0 0px rgba(0,0,0,0)',
            }}
          >
            Book Now
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <ul className="flex flex-col px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={cn(
                      'block border-b border-border py-4 text-sm font-medium uppercase tracking-[0.2em] transition-colors',
                      pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SALON.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block bg-primary px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Book Now on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
