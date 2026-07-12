import Image from 'next/image'
import { BRANDS } from '@/lib/salon'
import { Reveal } from './reveal'

/** "Brands We Carry" — trusted product brand logos. */
export function Brands() {
  return (
    <section id="brands" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-28">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Trusted Products
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-5xl">
              Brands We Carry
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-5">
            {BRANDS.map((brand) => (
              <div
                key={brand.image}
                className="flex h-28 items-center justify-center bg-background px-6 py-4 transition-colors hover:bg-secondary"
              >
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  width={200}
                  height={80}
                  className="max-h-16 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
