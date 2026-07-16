import type { ReactNode } from 'react'

/** Stable content wrapper shared by editorial sections. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={className}>{children}</div>
  )
}
