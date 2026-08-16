import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import http from 'http';

// Helper to check if server is up
const checkServer = (url) => new Promise((resolve) => {
  http.get(url, (res) => resolve(res.statusCode === 200)).on('error', () => resolve(false));
});

async function runTest() {
  console.log('Starting preview server...');
  const server = spawn('npm', ['run', 'preview'], { cwd: process.cwd(), stdio: 'pipe' });
  
  let isUp = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    isUp = await checkServer('http://localhost:4173');
    if (isUp) break;
  }

  if (!isUp) {
    console.error('Server failed to start');
    server.kill();
    process.exit(1);
  }

  console.log('Server is up. Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Setup SW registration logging
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  console.log('Navigating to page (Online)...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  
  console.log('Waiting for Service Worker to activate...');
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    console.log('SW Registration ready:', registration.scope);
  });

  // Give it a moment to cache everything
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Reloading (Online)...');
  await page.reload({ waitUntil: 'networkidle0' });
  
  console.log('Switching to Offline Mode...');
  await page.setOfflineMode(true);
  
  try {
    console.log('Reloading (Offline)...');
    await page.reload({ waitUntil: 'networkidle0' });
    
    // Verification
    console.log('Waiting for elements...');
    try {
      await page.waitForSelector('h1', { timeout: 10000 });
    } catch (e) {
      console.log('Timed out waiting for h1. Checking what is on the page...');
      const bodyHTML = await page.evaluate(() => document.body.innerHTML);
      console.log('Body HTML snippet:', bodyHTML.substring(0, 300));
    }
    
    const title = await page.title();
    console.log('Offline Title:', title);
    
    const h1Text = await page.evaluate(() => document.querySelector('h1')?.innerText);
    console.log('Offline H1:', h1Text);
    
    const hasCanvas = await page.evaluate(() => document.querySelector('canvas.developer-animation-canvas') !== null);
    console.log('Has Developer Animation Canvas:', hasCanvas);
    
    if (h1Text && hasCanvas) {
      console.log('OFFLINE TEST PASSED!');
    } else {
      console.error('OFFLINE TEST FAILED: Elements missing.');
    }
  } catch (err) {
    console.error('Offline navigation failed!', err);
  } finally {
    await browser.close();
    server.kill();
  }
}

runTest().catch(err => {
  console.error(err);
  process.exit(1);
});
