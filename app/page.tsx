import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Services } from '@/components/site/services'
import { About } from '@/components/site/about'
import { WhyChoose } from '@/components/site/why-choose'
import { Testimonials } from '@/components/site/testimonials'
import { InstagramSection } from '@/components/site/instagram'
import { Gallery } from '@/components/site/gallery'
import { Location } from '@/components/site/location'
import { FinalCta } from '@/components/site/final-cta'
import { Footer } from '@/components/site/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <WhyChoose />
        <Testimonials />
        <InstagramSection />
        <Gallery />
        <Location />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
