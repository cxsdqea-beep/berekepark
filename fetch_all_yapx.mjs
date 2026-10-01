import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = 'c:/Users/senna/Desktop/allmyorojects/berekepark/public/yapx';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function scrapeAlbum(url, albumName) {
  console.log(`Starting scraper for ${url}...`);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }
  });
  const page = await context.newPage();

  const imageUrls = new Set();

  page.on('response', async (response) => {
    const resUrl = response.url();
    if (resUrl.includes('i.yapx.ru/') && (resUrl.endsWith('.png') || resUrl.endsWith('.jpg') || resUrl.endsWith('.jpeg'))) {
      // Ignore thumbnails ending with 'b.jpg' or 's.jpg'
      const clean = resUrl.replace(/([a-zA-Z0-9]+)[bst]\.(jpg|png|webp)$/, '$1.png');
      imageUrls.add(resUrl);
    }
  });

  await page.goto(url, { waitUntil: 'networkidle' });

  // Scroll repeatedly to trigger infinite scroll or lazy load
  for (let i = 0; i < 15; i++) {
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(600);
  }

  // Also collect all image elements in DOM
  const domImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img, a[href*="i.yapx.ru"]'));
    return imgs.map(el => el.src || el.href || el.getAttribute('data-src')).filter(Boolean);
  });

  domImages.forEach(u => imageUrls.add(u));

  console.log(`Found ${imageUrls.size} image URLs for ${albumName}`);

  // Download all
  for (const imgUrl of imageUrls) {
    if (!imgUrl.includes('i.yapx.ru/')) continue;
    // get clean full-res name
    const filename = path.basename(imgUrl);
    const dest = path.join(outDir, filename);
    if (!fs.existsSync(dest)) {
      try {
        const resp = await context.request.get(imgUrl);
        if (resp.ok()) {
          fs.writeFileSync(dest, await resp.body());
          console.log(`Downloaded: ${filename}`);
        }
      } catch (err) {
        console.error(`Failed ${imgUrl}:`, err.message);
      }
    }
  }

  await browser.close();
}

async function main() {
  await scrapeAlbum('https://yapx.ru/album/ePvSU', 'Album 1');
  await scrapeAlbum('https://yapx.ru/album/ePyaM', 'Album 2');
  console.log('All albums processed!');
}

main().catch(console.error);
