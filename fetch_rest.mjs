import fs from 'fs';
import path from 'path';

const outDir = 'c:/Users/senna/Desktop/allmyorojects/berekepark/public/yapx';

// Test all letters
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = 'ePvS';

async function checkRest() {
  for (const c of chars) {
    const id = base + c;
    for (const ext of ['.png', '.jpg']) {
      const url = `https://i.yapx.ru/${id}${ext}`;
      try {
        const res = await fetch(url, { method: 'HEAD', headers: { 'Referer': 'https://yapx.ru/' } });
        if (res.ok) {
          console.log(`Found: ${url}`);
          const dest = path.join(outDir, `${id}${ext}`);
          if (!fs.existsSync(dest)) {
            const getRes = await fetch(url, { headers: { 'Referer': 'https://yapx.ru/' } });
            const buf = Buffer.from(await getRes.arrayBuffer());
            fs.writeFileSync(dest, buf);
            console.log(`Downloaded ${id}${ext} (${buf.length} bytes)`);
          }
        }
      } catch (e) {}
    }
  }
}

checkRest();
