import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import { DemoNotice } from '@/components/site/demo-notice'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })
const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export const metadata: Metadata = {
  title: {
    default: 'Deep Cuts Salon | Grooming & Styling in Canal Garden, Lahore',
    template: '%s | Deep Cuts Salon',
  },
  description:
    'Deep Cuts Salon — premium haircuts, grooming, and styling for men, women, and kids in Canal Garden Lahore. Open 7 days, 8am–4am. Book on WhatsApp.',
  applicationName: 'Deep Cuts Salon',
  category: 'Salon & Grooming',
  openGraph: {
    title: 'Deep Cuts Salon | Grooming & Styling in Canal Garden, Lahore',
    description:
      'Haircuts, grooming, and styling for men, women, and kids in Canal Garden Lahore.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'Deep Cuts Salon',
  },
  twitter: {
    card: 'summary',
    title: 'Deep Cuts Salon | Canal Garden, Lahore',
    description: 'Haircuts, grooming, and styling for men, women, and kids.',
  },
}

export const viewport: Viewport = {
  themeColor: '#151310',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${inter.variable} ${oswald.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {demoMode && (
        <head>
          <meta name="robots" content="noindex, nofollow, noarchive" />
          <meta name="googlebot" content="noindex, nofollow, noarchive" />
        </head>
      )}
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="fixed left-4 top-10 z-[70] -translate-y-24 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {demoMode && <DemoNotice />}
        {children}
      </body>
    </html>
  )
}
