// 图片优化：PNG 插图转 WebP 并限制宽度，适配手机端与 GitHub Pages
// 用法：node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const rules = [
  { dir: 'public/images/quiz', width: 1080, quality: 78 },
  { dir: 'public/images/results', width: 1440, quality: 80 },
];

let before = 0;
let after = 0;
let count = 0;

for (const rule of rules) {
  const files = (await readdir(rule.dir)).filter(
    (f) => extname(f).toLowerCase() === '.png',
  );
  for (const file of files) {
    const src = join(rule.dir, file);
    const dst = src.replace(/\.png$/i, '.webp');
    before += (await stat(src)).size;
    await sharp(src)
      .resize({ width: rule.width, withoutEnlargement: true })
      .webp({ quality: rule.quality, effort: 5 })
      .toFile(dst);
    await unlink(src);
    after += (await stat(dst)).size;
    count += 1;
  }
}

console.log(
  `optimized ${count} files: ${(before / 1048576).toFixed(1)} MB -> ${(
    after / 1048576
  ).toFixed(1)} MB`,
);
