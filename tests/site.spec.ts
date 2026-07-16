import { expect, test } from '@playwright/test'

const routes = ['/', '/about', '/services', '/gallery', '/contact']

test.describe('client presentation', () => {
  for (const route of routes) {
    test(`${route} loads successfully`, async ({ page }) => {
      const response = await page.goto(route)

      expect(response?.status()).toBe(200)
      await expect(page.locator('main#main-content')).toBeVisible()
      await expect(page.locator('footer')).toBeVisible()
    })
  }

  test('navigation contains only the live routes', async ({ page }) => {
    await page.goto('/')

    const desktopNav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(desktopNav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(desktopNav.getByText('Before & After')).toHaveCount(0)
  })

  test('contact actions use the international phone link', async ({ page }) => {
    await page.goto('/contact')

    const phoneLinks = page.locator('a[href="tel:+923288787587"]')
    await expect(phoneLinks.first()).toBeVisible()
    expect(await phoneLinks.count()).toBeGreaterThanOrEqual(2)
  })

  test('mobile menu opens and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'Open menu' })
    await menuButton.click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
  })

  test('homepage remains visible with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /Sharp Cuts/i })).toBeVisible()
    await page.evaluate(async () => {
      for (let top = 0; top < document.body.scrollHeight; top += window.innerHeight) {
        window.scrollTo(0, top)
        await new Promise((resolve) => window.setTimeout(resolve, 80))
      }
      window.scrollTo(0, 0)
    })
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await expect.poll(async () => page.locator('img').evaluateAll((images) => (
      images.every((image) => image.complete && image.naturalWidth > 0)
    ))).toBe(true)
    await page.screenshot({ path: 'test-results/final-home-desktop.png', fullPage: true })
  })
})
