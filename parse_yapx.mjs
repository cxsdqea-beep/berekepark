import fs from 'fs';

const path = 'C:/Users/senna/.gemini/antigravity-ide/brain/3492b3ec-88d0-43f8-864f-f390edd8b036/.system_generated/steps/662/content.md';
if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  console.log('Content length:', content.length);
  const regex = /i\.yapx\.[a-z0-9\/_\.\-]+/gi;
  const matches = content.match(regex);
  console.log('Matches count:', matches ? matches.length : 0);
  if (matches) {
    console.log(Array.from(new Set(matches)).slice(0, 30));
  }
} else {
  console.log('File not found');
}
