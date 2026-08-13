const fs = require('fs');
const { PNG } = require('pngjs');

const files = [
  'public/illustrations/developer/wave/wave1.png',
];

for (const file of files) {
  const data = fs.readFileSync(file);
  const png = PNG.sync.read(data);
  let minX = 9999, minY = 9999, maxX = 0, maxY = 0;
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;
      const a = png.data[idx + 3];
      if (a > 250) { // check for almost fully opaque pixels
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(file, {minX, minY, maxX, maxY});
}
