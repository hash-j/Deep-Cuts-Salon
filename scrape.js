const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

(async () => {
  console.log('Starting scraper...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const outDir = path.join(__dirname, 'public', 'images', 'downloaded');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    console.log('Navigating to Google Maps...');
    await page.goto('https://maps.app.goo.gl/iGAsgScY5Qay11cU6', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);
    
    // Look for image elements
    const images = await page.evaluate(() => {
      // Find elements that have background images or are img tags
      const results = [];
      const divs = document.querySelectorAll('div[style*="background-image"]');
      divs.forEach(d => {
        const match = d.style.backgroundImage.match(/url\("?([^"]+)"?\)/);
        if (match && match[1]) {
           let url = match[1];
           // try to get higher res by modifying the URL if it's a googleusercontent url
           if (url.includes('googleusercontent.com')) {
               url = url.replace(/=w\d+-h\d+-k-no/, '=s1200');
           }
           results.push(url);
        }
      });
      const imgs = document.querySelectorAll('button img');
      imgs.forEach(i => {
         let url = i.src;
         if (url.includes('googleusercontent.com')) {
             url = url.replace(/=w\d+-h\d+-p-k-no-mo/, '=s1200');
         }
         results.push(url);
      });
      return [...new Set(results)].filter(u => u.startsWith('http'));
    });

    console.log(`Found ${images.length} potential images on Maps.`);
    
    for (let i = 0; i < Math.min(images.length, 10); i++) {
      const url = images[i];
      if (url.includes('googleusercontent')) {
          console.log(`Downloading Maps Image ${i+1}: ${url}`);
          try {
            await downloadImage(url, path.join(outDir, `maps_${i+1}.jpg`));
          } catch(e) {
            console.error(`Failed to download ${url}`);
          }
      }
    }

  } catch (err) {
    console.error('Error scraping Maps:', err);
  }

  try {
    console.log('Navigating to Instagram (Picuki as proxy)...');
    // Using picuki to bypass instagram login walls
    await page.goto('https://www.picuki.com/profile/deepcutssalon', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const instaImages = await page.evaluate(() => {
       const imgs = document.querySelectorAll('.post-image');
       return Array.from(imgs).map(img => img.src).filter(src => src);
    });

    console.log(`Found ${instaImages.length} images on Instagram (Picuki).`);
    
    for (let i = 0; i < Math.min(instaImages.length, 20); i++) {
      console.log(`Downloading Insta Image ${i+1}: ${instaImages[i]}`);
      try {
        await downloadImage(instaImages[i], path.join(outDir, `insta_${i+1}.jpg`));
      } catch(e) {
        console.error(`Failed to download ${instaImages[i]}`);
      }
    }
  } catch(err) {
    console.error('Error scraping Instagram:', err);
  }

  await browser.close();
  console.log('Done.');
})();
