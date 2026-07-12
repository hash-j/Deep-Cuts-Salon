import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'Deep Cuts Salon | Premium Grooming in Canal Garden, Lahore',
  description:
    'Deep Cuts Salon — premium haircuts, grooming, and styling for men, women, and kids in Canal Garden Lahore. Open 7 days, 8am–4am. Book on WhatsApp.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Deep Cuts Salon | Premium Grooming in Canal Garden, Lahore',
    description:
      'Premium haircuts, grooming, and styling for men, women, and kids in Canal Garden Lahore. Open 7 days, 8am–4am.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'Deep Cuts Salon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Cuts Salon | Premium Grooming in Canal Garden, Lahore',
    description:
      'Premium haircuts, grooming, and styling for men, women, and kids in Canal Garden Lahore.',
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
    <html lang="en" className={`bg-background ${inter.variable} ${oswald.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
