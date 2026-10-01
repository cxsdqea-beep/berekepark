import fs from 'fs';
import path from 'path';

const outDir = 'c:/Users/senna/Desktop/allmyorojects/berekepark/public/yapx';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = [
  'C:/Users/senna/.gemini/antigravity-ide/brain/3492b3ec-88d0-43f8-864f-f390edd8b036/.system_generated/steps/662/content.md',
  'C:/Users/senna/.gemini/antigravity-ide/brain/3492b3ec-88d0-43f8-864f-f390edd8b036/.system_generated/steps/684/content.md'
];

const allUrls = new Set();

for (const file of files) {
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    // Extract yapx image URLs: full image is without the trailing 'b.jpg' (or whatever full resolution extension)
    // In Yapx, e.g. i.yapx.ru/ePvSV.png is full image, ePvSVb.jpg is thumbnail
    const regex = /https?:\/\/i\.yapx\.ru\/[a-zA-Z0-9]+\.(png|jpg|jpeg|webp)/gi;
    const matches = text.match(regex);
    if (matches) {
      matches.forEach(m => {
        // Exclude thumbnails ending with b.jpg if full image exists
        allUrls.add(m);
      });
    }
  }
}

console.log('Total unique URLs found:', allUrls.size);
const urlList = Array.from(allUrls).filter(u => !u.match(/[a-zA-Z0-9]+b\.(jpg|png|webp)$/));
console.log('Full-res URLs:', urlList);

// Download them sequentially
async function downloadAll() {
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    const filename = path.basename(url);
    const dest = path.join(outDir, filename);
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${filename}`);
      continue;
    }
    try {
      console.log(`Downloading (${i + 1}/${urlList.length}): ${url}`);
      const res = await fetch(url, {
        headers: {
          'Referer': 'https://yapx.ru/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (!res.ok) {
        console.error(`Failed ${url}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${filename} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${url}:`, err.message);
    }
  }
  console.log('Download finished.');
}

downloadAll();
