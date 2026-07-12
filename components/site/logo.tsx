import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Deep Cuts Salon logo (client-provided, at /public/images/logo/logo.png).
 * The artwork is black, so it's inverted to white for the dark theme.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo/logo.png"
      alt="Deep Cuts Salon"
      width={140}
      height={100}
      className={cn('h-12 w-auto invert', className)}
    />
  )
}
