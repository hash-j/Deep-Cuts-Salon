import { test, expect, type Page } from '@playwright/test';

// ─── Helper: collect console errors during a test ───
function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    errors.push(err.message);
  });
  return errors;
}

// ─── Helper: collect failed network requests ───
function collectFailedRequests(page: Page) {
  const failed: { url: string; status: number }[] = [];
  page.on('response', (response) => {
    const url = response.url();
    const status = response.status();
    // Ignore external requests and data URIs
    if (url.startsWith('data:')) return;
    if (status >= 400) {
      failed.push({ url, status });
    }
  });
  return failed;
}

// ═══════════════════════════════════════════════════════════
// 1. PAGE LOAD & SEO
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Page Load & SEO', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Deep Cuts Salon/);
  });

  test('meta description exists', async ({ page }) => {
    await page.goto('/');
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /Deep Cuts Salon/);
  });

  test('only one h1 exists', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('html lang attribute is set', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

// ═══════════════════════════════════════════════════════════
// 2. SECTIONS VISIBLE
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — All Sections Render', () => {
  test('hero section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();
  });

  test('services section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#services')).toBeVisible();
  });

  test('about section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#about')).toBeVisible();
  });

  test('reviews section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#reviews')).toBeVisible();
  });

  test('gallery section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#gallery')).toBeVisible();
  });

  test('contact section is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('footer is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });
});

// ═══════════════════════════════════════════════════════════
// 3. NAVIGATION LINKS (Desktop)
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Desktop Navigation', () => {
  test('navbar is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  });

  test('desktop nav links point to the live pages', async ({ page }) => {
    await page.goto('/');
    // Desktop nav links (hidden on mobile with lg:flex)
    const navLinks = page.locator('nav[aria-label="Main navigation"] ul.lg\\:flex a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);

    const hrefs = await navLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    );
    expect(hrefs).toEqual(['/', '/about', '/services', '/gallery', '/contact']);
  });

  test('Book Now button in navbar exists and links to WhatsApp', async ({ page }) => {
    await page.goto('/');
    const bookBtn = page.locator('nav[aria-label="Main navigation"]').locator('a', { hasText: 'Book Now' });
    await expect(bookBtn.first()).toBeVisible();
    const href = await bookBtn.first().getAttribute('href');
    expect(href).toContain('whatsapp');
  });
});

// ═══════════════════════════════════════════════════════════
// 4. MOBILE MENU
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Mobile Menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('mobile menu button is visible on small viewport', async ({ page }) => {
    await page.goto('/');
    const menuBtn = page.locator('button[aria-label="Open menu"]');
    await expect(menuBtn).toBeVisible();
  });

  test('mobile menu opens and shows navigation links', async ({ page }) => {
    await page.goto('/');
    const menuBtn = page.locator('button[aria-label="Open menu"]');
    await menuBtn.click();

    // Wait for menu to animate open
    await page.waitForTimeout(500);

    // Close button should now be visible
    const closeBtn = page.locator('button[aria-label="Close menu"]');
    await expect(closeBtn).toBeVisible();

    // Navigation links should be visible inside the mobile menu
    const mobileNavLinks = page.locator('header .lg\\:hidden ul a');
    const count = await mobileNavLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('mobile menu closes when a link is clicked', async ({ page }) => {
    await page.goto('/');
    const menuBtn = page.locator('button[aria-label="Open menu"]');
    await menuBtn.click();
    await page.waitForTimeout(500);

    // Click the first nav link in the mobile menu
    const firstLink = page.locator('header .lg\\:hidden ul a').first();
    await firstLink.click();
    await page.waitForTimeout(500);

    // Menu should close — the open menu button should reappear
    const openBtn = page.locator('button[aria-label="Open menu"]');
    await expect(openBtn).toBeVisible();
  });
});

// ═══════════════════════════════════════════════════════════
// 5. IMAGES
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Images', () => {
  test('logo image loads successfully', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('img[alt="Deep Cuts Salon"]').first();
    await expect(logo).toBeVisible();
    // Check the image has actually loaded (naturalWidth > 0)
    const naturalWidth = await logo.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('all images on the page have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image at index ${i} is missing alt text`).toBeTruthy();
    }
  });

  test('no images return 404', async ({ page }) => {
    const failedImages: string[] = [];
    page.on('response', (response) => {
      const url = response.url();
      if (/\.(png|jpg|jpeg|svg|webp|gif|avif)(\?|$)/i.test(url) && response.status() >= 400) {
        failedImages.push(`${url} → ${response.status()}`);
      }
    });
    await page.goto('/');
    // Scroll the full page to trigger lazy-loaded images
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    expect(failedImages, `Broken images: ${failedImages.join(', ')}`).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════════════════════
// 6. CONSOLE ERRORS & NETWORK FAILURES
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Console Errors & Network', () => {
  test('no JavaScript console errors on load', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Filter out known noisy warnings from browser extensions or non-critical sources
    const realErrors = errors.filter((e) => !e.includes('favicon'));
    expect(realErrors, `Console errors: ${realErrors.join('\n')}`).toHaveLength(0);
  });

  test('no failed network requests for local resources', async ({ page }) => {
    const failed = collectFailedRequests(page);
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    // Only check localhost requests
    const localFailed = failed.filter((f) => f.url.includes('localhost'));
    expect(localFailed, `Failed requests: ${localFailed.map(f => `${f.url} → ${f.status}`).join('\n')}`).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════════════════════
// 7. VIEWPORT OVERFLOW (Desktop 1440px)
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Viewport Overflow (Desktop 1440px)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('no horizontal overflow on desktop', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow, 'Page has horizontal overflow at 1440px').toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// 8. VIEWPORT OVERFLOW (Mobile 390px)
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Viewport Overflow (Mobile 390px)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow, 'Page has horizontal overflow at 390px').toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// 9. 404 PAGE
// ═══════════════════════════════════════════════════════════

test.describe('404 — Non-existent page', () => {
  test('visiting a non-existent route returns a 404 status or shows error page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');
    // Next.js should return 404
    expect(response?.status()).toBe(404);
  });
});

// ═══════════════════════════════════════════════════════════
// 10. FOOTER LINKS
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Footer', () => {
  test('footer Quick Links point to the live pages', async ({ page }) => {
    await page.goto('/');
    const footerNav = page.locator('nav[aria-label="Footer navigation"]');
    await expect(footerNav).toBeVisible();
    const links = footerNav.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(5);

    const hrefs = await links.evaluateAll((items) =>
      items.map((item) => item.getAttribute('href')),
    );
    expect(hrefs).toEqual(['/', '/about', '/services', '/gallery', '/contact']);
  });

  test('footer social links are present', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    const instagramLink = footer.locator('a[aria-label*="Instagram"]');
    const facebookLink = footer.locator('a[aria-label*="Facebook"]');
    const whatsappLink = footer.locator('a[aria-label*="WhatsApp"]');
    await expect(instagramLink).toBeVisible();
    await expect(facebookLink).toBeVisible();
    await expect(whatsappLink).toBeVisible();
  });

  test('footer copyright includes current year', async ({ page }) => {
    await page.goto('/');
    const year = new Date().getFullYear().toString();
    const copyright = page.locator('footer').locator(`text=© ${year}`);
    await expect(copyright).toBeVisible();
  });
});

// ═══════════════════════════════════════════════════════════
// 11. HERO SECTION — KEY ELEMENTS
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Hero Section', () => {
  test('hero heading contains expected text', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Sharp Cuts');
    await expect(h1).toContainText('Deep Confidence');
  });

  test('hero Book Appointment button links to WhatsApp', async ({ page }) => {
    await page.goto('/');
    const bookBtn = page.locator('#home a', { hasText: 'Book Appointment' });
    await expect(bookBtn).toBeVisible();
    const href = await bookBtn.getAttribute('href');
    expect(href).toContain('whatsapp');
  });

  test('hero Explore Services button links to the services page', async ({ page }) => {
    await page.goto('/');
    const exploreBtn = page.locator('#home a', { hasText: 'Explore Services' });
    await expect(exploreBtn).toBeVisible();
    const href = await exploreBtn.getAttribute('href');
    expect(href).toBe('/services');
  });
});

// ═══════════════════════════════════════════════════════════
// 12. SERVICES SECTION
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Services Section', () => {
  test('services section has at least 6 service items', async ({ page }) => {
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    const items = page.locator('#services ul li');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

// ═══════════════════════════════════════════════════════════
// 13. CONTACT SECTION
// ═══════════════════════════════════════════════════════════

test.describe('Homepage — Contact Section', () => {
  test('contact section shows phone number', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toContainText('03288787587');
  });

  test('contact section shows email', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toContainText('deepcutssalon@gmail.com');
  });

  test('Get Directions button links to Google Maps', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const directionsBtn = page.locator('#contact a', { hasText: 'Get Directions' });
    await expect(directionsBtn).toBeVisible();
    const href = await directionsBtn.getAttribute('href');
    expect(href).toContain('maps.app.goo.gl');
  });
});
