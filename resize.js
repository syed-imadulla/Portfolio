import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const baseDir = path.join(process.cwd(), 'public/illustrations/developer');

async function processImages() {
  const categories = ['wave', 'return', 'look', 'work'];
  for (const cat of categories) {
    const catDir = path.join(baseDir, cat);
    if (!fs.existsSync(catDir)) continue;
    
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.png'));
    for (const file of files) {
      const filePath = path.join(catDir, file);
      const outPath = path.join(catDir, file.replace('.png', '.webp'));
      
      console.log(`Processing ${filePath} -> ${outPath}`);
      await sharp(filePath)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 90 }) // Keep quality high to maintain crisp black strokes
        .toFile(outPath);
        
      console.log(`Finished ${outPath}`);
    }
  }
}

processImages().catch(console.error);
