import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // 1200x630 for OG image
  await page.setViewport({ width: 1200, height: 630 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  // Wait a bit for animations to complete
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'public/og-image.png' });
  
  await browser.close();
  console.log("Screenshot taken: public/og-image.png");
})();
