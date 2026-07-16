import { Info } from 'lucide-react'

/**
 * DEVELOPMENT NOTICE:
 * This component must be removed after official client approval.
 * To remove: Set NEXT_PUBLIC_DEMO_MODE=false in .env
 * OR delete this file and its import in app/layout.tsx.
 */
export function DemoNotice() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center gap-2 bg-primary px-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground sm:text-xs sm:tracking-wide">
      <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>Private concept — not the official website</span>
    </div>
  )
}
