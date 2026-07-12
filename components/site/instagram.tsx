import { SALON } from '@/lib/salon'
import { InstagramIcon } from './social-icons'
import { ImagePlaceholder } from './image-placeholder'
import { Reveal } from './reveal'

/**
 * "Follow The Style" — real thumbnails pulled from @deepcutssalon,
 * sorted by highest engagement. Each tile links to the actual post.
 */
const POSTS = [
  { src: '/images/instagram/post-1.jpg', url: 'https://www.instagram.com/p/Dakz7ABsIp3/' },
  { src: '/images/instagram/post-2.jpg', url: 'https://www.instagram.com/p/DYAv9zdub_k/' },
  { src: '/images/instagram/post-3.jpg', url: 'https://www.instagram.com/p/DZxViF5CX0O/' },
  { src: '/images/instagram/post-4.jpg', url: 'https://www.instagram.com/p/DafysvCsTa_/' },
  { src: '/images/instagram/post-5.jpg', url: 'https://www.instagram.com/p/DWFLFkQDJSj/' },
  { src: '/images/instagram/post-6.jpg', url: 'https://www.instagram.com/p/DZ4g8GFOR8F/' },
]

export function InstagramSection() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                @deepcutssalon
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-balance md:text-6xl">
                Follow The Style
              </h2>
            </div>
            <a
              href={SALON.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <InstagramIcon className="h-4 w-4" aria-hidden="true" />
              Follow Us on Instagram
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {POSTS.map((post, i) => (
            <a
              key={post.src}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-background"
              aria-label={`View Instagram post ${i + 1}`}
            >
              <ImagePlaceholder
                src={post.src}
                label={`Instagram post ${i + 1} from @deepcutssalon`}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors duration-300 group-hover:bg-primary/80">
                <InstagramIcon className="h-6 w-6 text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
