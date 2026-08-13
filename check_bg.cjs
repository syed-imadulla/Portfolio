const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('public/illustrations/developer/wave/wave1.png');
const png = PNG.sync.read(data);

const idx = 0; // (0,0) top-left pixel
const r = png.data[idx];
const g = png.data[idx+1];
const b = png.data[idx+2];
const a = png.data[idx+3];

console.log(`Top-left pixel: rgba(${r}, ${g}, ${b}, ${a})`);
