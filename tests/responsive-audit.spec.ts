import { test, expect, type Page } from '@playwright/test'
import path from 'path'
import fs from 'fs'

// ─── Screenshot output directory ───
const SHOTS = path.resolve(__dirname, '..', 'test-results', 'responsive-shots')
const BASE_URL = 'http://localhost:3000'

type Size = { w: number; h: number; label: string }

const VIEWPORTS: Size[] = [
  { w: 1440, h: 900, label: 'desktop-1440' },
  { w: 1024, h: 768, label: 'tablet-landscape-1024' },
  { w: 768, h: 1024, label: 'tablet-portrait-768' },
  { w: 390, h: 844, label: 'mobile-390' },
]

// Sections on the homepage
const SECTIONS = [
  { id: '#home', name: 'hero' },
  { id: '#services', name: 'services' },
  { id: '#about', name: 'about' },
  { id: '#contact', name: 'contact' },
  { id: 'footer', name: 'footer' },
]

// ─── Helpers ───

/** Take a full-page screenshot for a given viewport */
async function captureFullPage(page: Page, size: Size, name: string) {
  const dir = path.join(SHOTS, `${size.label}`)
  fs.mkdirSync(dir, { recursive: true })
  await page.screenshot({
    path: path.join(dir, `${name}.png`),
    fullPage: true,
  })
}

/** Check for horizontal overflow — returns true if overflow exists */
async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth
  })
}

/** Collect all text-node overflow warnings from an element */
async function getTextOverflowWarnings(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const els = document.querySelectorAll(sel)
    const issues: { tag: string; id: string; class: string; text: string }[] = []
    els.forEach((el) => {
      const { scrollWidth, clientWidth, scrollHeight, clientHeight } = el
      if (scrollWidth > clientWidth + 1) {
        issues.push({
          tag: el.tagName,
          id: el.id || '(none)',
          class: el.className?.toString().slice(0, 80) || '(none)',
          text: (el.textContent || '').slice(0, 60),
        })
      }
    })
    return issues
  }, selector)
}

/** Check for elements that extend beyond their parent bounds */
async function getOverflowingChildren(page: Page, parentSelector: string) {
  return page.evaluate((sel) => {
    const parents = document.querySelectorAll(sel)
    const issues: { parent: string; child: string; diff: string }[] = []
    parents.forEach((p) => {
      const pr = p.getBoundingClientRect()
      p.querySelectorAll('*').forEach((c) => {
        const cr = c.getBoundingClientRect()
        // Only check if the child is inside the parent's context
        if (cr.width > pr.width + 2 && pr.width > 0) {
          issues.push({
            parent: `${p.tagName}#${p.id || ''}.${(p.className || '').toString().slice(0, 30)}`.slice(0, 80),
            child: `${c.tagName}.${(c.className || '').toString().slice(0, 30)}`.slice(0, 80),
            diff: `${(cr.width - pr.width).toFixed(0)}px wider`,
          })
        }
      })
    })
    return issues.slice(0, 30) // limit
  }, parentSelector)
}

// ═══════════════════════════════════════════════════════════
// Responsive Visual Audit
// ═══════════════════════════════════════════════════════════

VIEWPORTS.forEach((size) => {
  test.describe(`Responsive — ${size.label} (${size.w}x${size.h})`, () => {
    test.use({ viewport: { width: size.w, height: size.h }, baseURL: BASE_URL })

    test('no horizontal overflow on full page', async ({ page }) => {
      await page.goto('/')
      // Scroll to bottom to trigger lazy loads
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1500)
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(500)

      const overflow = await hasHorizontalOverflow(page)
      expect(overflow, `Horizontal overflow detected at ${size.label} ${size.w}x${size.h}`).toBe(false)
    })

    test('capture full-page screenshot', async ({ page }) => {
      await page.goto('/')
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1500)
      await captureFullPage(page, size, 'full-page')
    })

    test('navbar is fully visible at top', async ({ page }) => {
      await page.goto('/')
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(500)

      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Check that the logo and nav links are visible within header bounds
      const headerBox = await header.boundingBox()
      if (headerBox) {
        const logo = page.locator('header img').first()
        await expect(logo).toBeVisible()
        const logoBox = await logo.boundingBox()
        if (logoBox) {
          expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(headerBox.x + headerBox.width + 1)
        }
      }
    })

    SECTIONS.forEach((section) => {
      const sel = section.id.startsWith('#') ? section.id : `#${section.id}`
      test(`section "${section.name}" is fully visible without overflow`, async ({ page }) => {
        await page.goto('/')
        // If it's a section ID, scroll to it
        if (section.id.startsWith('#')) {
          await page.locator(section.id).scrollIntoViewIfNeeded()
        } else {
          await page.locator(section.id).first().scrollIntoViewIfNeeded()
        }
        await page.waitForTimeout(500)

        // Capture the section
        await captureFullPage(page, size, `section-${section.name}`)

        // Check for overflow within main or the section
        const el = section.id.startsWith('#')
          ? page.locator(sel)
          : page.locator(section.id).first()
        await expect(el).toBeVisible()

        // Check for child overflow
        const overflowChildren = await getOverflowingChildren(page, sel)
        expect(overflowChildren, `Overflowing children in ${sel} at ${size.label}: ${JSON.stringify(overflowChildren.slice(0, 3))}`).toHaveLength(0)
      })
    })

    test('no text clipping in headings and paragraphs', async ({ page }) => {
      await page.goto('/')
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1500)

      const textIssues = await getTextOverflowWarnings(page, 'h1, h2, h3, h4, p, span, a, li')
      expect(textIssues, `Text overflow at ${size.label}: ${JSON.stringify(textIssues.slice(0, 5))}`).toHaveLength(0)
    })

    test('all images have natural dimensions and are not zero-size', async ({ page }) => {
      await page.goto('/')
      // Scroll through each section to trigger Next.js lazy image loading
      const anchors = ['#home', '#services', '#about', '#gallery', '#brands', '#reviews', '#contact']
      for (const anchor of anchors) {
        try {
          await page.locator(anchor).scrollIntoViewIfNeeded()
          await page.waitForTimeout(500)
        } catch {
          // Section may not exist, skip
        }
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(500)

      // Only check visible images — hidden images (inside display:none containers) are expected to have zero dimensions
      const badImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'))
        return imgs
          .filter((img) => {
            if (img.naturalWidth > 0 && img.naturalHeight > 0) return false
            // Skip images inside hidden containers
            const el = img.closest('.hidden, [hidden], [aria-hidden="true"]')
            return !el
          })
          .map((img) => img.alt || img.src)
      })
      expect(badImages, `Zero-size images at ${size.label}: ${badImages.slice(0, 10).join(', ')}`).toHaveLength(0)
    })
  })
})

// ═══════════════════════════════════════════════════════════
// Mobile-specific checks
// ═══════════════════════════════════════════════════════════

test.describe('Mobile Menu — 390x844', () => {
  test.use({ viewport: { width: 390, height: 844 }, baseURL: BASE_URL })

  test('mobile menu opens and all links are clickable', async ({ page }) => {
    await page.goto('/')
    const menuBtn = page.locator('button[aria-label="Open menu"]')
    await expect(menuBtn).toBeVisible()
    await menuBtn.click()
    await page.waitForTimeout(600)

    // Close button should appear
    await expect(page.locator('button[aria-label="Close menu"]')).toBeVisible()

    // Mobile menu links are inside header > div (not inside <nav>)
    const mobileLinks = page.locator('header .lg\\:hidden ul a')
    const count = await mobileLinks.count()
    expect(count).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < count; i++) {
      await expect(mobileLinks.nth(i)).toBeVisible()
    }

    // Menu should not cause overflow when open
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(overflow, 'Mobile menu causes horizontal overflow').toBe(false)

    await captureFullPage(page, { w: 390, h: 844, label: 'mobile-390' }, 'mobile-menu-open')
  })

  test('menu closes on link click and does not break layout', async ({ page }) => {
    await page.goto('/')
    await page.locator('button[aria-label="Open menu"]').click()
    await page.waitForTimeout(600)

    // Click services link in the mobile menu
    const servicesLink = page.locator('header .lg\\:hidden ul a[href="#services"]')
    await servicesLink.click()
    await page.waitForTimeout(800)

    // Menu should close — open button visible again
    await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible()

    // Should scroll to services section
    await expect(page.locator('#services')).toBeVisible()

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(overflow, 'Layout broken after menu close').toBe(false)
  })

  test('Book Now button in mobile menu is visible and links to WhatsApp', async ({ page }) => {
    await page.goto('/')
    await page.locator('button[aria-label="Open menu"]').click()
    await page.waitForTimeout(600)

    const bookBtn = page.locator('header .lg\\:hidden ul a', { hasText: 'Book Now on WhatsApp' })
    await expect(bookBtn).toBeVisible()
    const href = await bookBtn.getAttribute('href')
    expect(href).toContain('whatsapp')
  })
})

// ═══════════════════════════════════════════════════════════
// Fixed-element overlap check
// ═══════════════════════════════════════════════════════════

VIEWPORTS.forEach((size) => {
  test.describe(`Fixed element overlap — ${size.label}`, () => {
    test.use({ viewport: { width: size.w, height: size.h }, baseURL: BASE_URL })

    test('navbar does not cover section heading when navigating via nav links', async ({ page }) => {
      await page.goto('/')

      // Test each section independently by navigating directly to its hash
      // Page DOM order: home, services, reviews, brands, gallery, contact
      const sections = ['#services', '#reviews', '#brands', '#gallery', '#contact']

      for (const href of sections) {
        // Navigate directly to the hash (simulates nav link click)
        await page.evaluate((h) => { window.location.hash = h }, href)
        await page.waitForTimeout(500)

        // The section's top-of-viewport position should be >= 0 (not hidden above viewport)
        const sectionTop = await page.evaluate((sel) => {
          const el = document.querySelector(sel)
          return el ? el.getBoundingClientRect().top : -1
        }, href)

        expect(sectionTop, `Section ${href} top (${sectionTop}px) is above viewport (covered by navbar) at ${size.label}`)
          .toBeGreaterThanOrEqual(0)

        // Capture screenshot
        await page.screenshot({
          path: path.join(SHOTS, `${size.label}`, `overlap-${href.replace('#', '')}.png`),
        })
      }
    })
  })
})

// ═══════════════════════════════════════════════════════════
// Tablet-specific content visibility checks
// ═══════════════════════════════════════════════════════════

test.describe('Tablet Layout — 768x1024', () => {
  test.use({ viewport: { width: 768, height: 1024 }, baseURL: BASE_URL })

  test('services grid does not overflow container', async ({ page }) => {
    await page.goto('/')
    await page.locator('#services').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const overflow = await page.evaluate(() => {
      const section = document.querySelector('#services')
      if (!section) return false
      const rect = section.getBoundingClientRect()
      return rect.right > window.innerWidth + 2
    })
    expect(overflow, 'Services section overflows viewport on tablet').toBe(false)
  })

  test('gallery grid does not have broken aspect ratios', async ({ page }) => {
    await page.goto('/')
    await page.locator('#gallery').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500)

    // Check gallery images are visible
    const galleryImages = page.locator('#gallery img')
    const count = await galleryImages.count()
    expect(count, 'No gallery images found').toBeGreaterThan(0)

    // Wait for each image to finish loading
    for (let i = 0; i < count; i++) {
      await galleryImages.nth(i).evaluate((img: HTMLImageElement) => {
        if (!img.complete) {
          return new Promise((resolve) => {
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
          })
        }
        return true
      })
    }

    // Each image should have non-zero natural dimensions
    for (let i = 0; i < count; i++) {
      const valid = await galleryImages.nth(i).evaluate((img: HTMLImageElement) => {
        return img.naturalWidth > 0 && img.naturalHeight > 0
      })
      expect(valid, `Gallery image at index ${i} has zero dimensions`).toBe(true)
    }
  })
})
