import fs from 'fs';
import path from 'path';

const outDir = 'c:/Users/senna/Desktop/allmyorojects/berekepark/public/yapx';
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = 'ePya';

async function checkPya() {
  for (const c of chars) {
    const id = base + c;
    for (const ext of ['.png', '.jpg']) {
      const url = `https://i.yapx.ru/${id}${ext}`;
      try {
        const res = await fetch(url, { method: 'HEAD', headers: { 'Referer': 'https://yapx.ru/' } });
        if (res.ok) {
          const dest = path.join(outDir, `${id}${ext}`);
          if (!fs.existsSync(dest)) {
            console.log(`Downloading: ${id}${ext}`);
            const getRes = await fetch(url, { headers: { 'Referer': 'https://yapx.ru/' } });
            const buf = Buffer.from(await getRes.arrayBuffer());
            fs.writeFileSync(dest, buf);
            console.log(`Saved ${id}${ext}`);
          }
        }
      } catch (e) {}
    }
  }
  console.log('ePya check complete.');
}

checkPya();
