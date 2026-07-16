import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Renders a responsive cover image inside its parent container, optimized for grid layouts.
 */
export function ImagePlaceholder({
  src,
  label,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  src: string
  label: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-secondary', className)}>
      <Image
        src={src || '/placeholder.svg'}
        alt={label}
        fill
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover"
      />
    </div>
  )
}
