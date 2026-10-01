import fs from 'fs';
import path from 'path';

const outDir = 'c:/Users/senna/Desktop/allmyorojects/berekepark/public/yapx_eP4gc';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const urls = [
  'https://i.yapx.ru/eP4gf.jpg',
  'https://i.yapx.ru/eP4gg.jpg',
  'https://i.yapx.ru/eP4gi.jpg',
  'https://i.yapx.ru/eP4gj.jpg',
  'https://i.yapx.ru/eP4gk.jpg',
  'https://i.yapx.ru/eP4gn.jpg',
  'https://i.yapx.ru/eP4go.jpg',
  'https://i.yapx.ru/eP4gq.jpg',
  'https://i.yapx.ru/eP4gr.jpg',
  'https://i.yapx.ru/eP4gu.jpg'
];

async function run() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = `screen_${i + 1}_${path.basename(url)}`;
    const dest = path.join(outDir, filename);
    console.log(`Downloading ${url} -> ${filename}...`);
    try {
      const res = await fetch(url, {
        headers: {
          'Referer': 'https://yapx.ru/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (!res.ok) {
        console.error(`Failed ${url}: status ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      console.log(`Saved ${filename} (${buf.length} bytes)`);
    } catch (e) {
      console.error(`Error for ${url}:`, e);
    }
  }
}

run();
