const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck (optional but handy)
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'amazon-review-scraper-backend', version: 'v1-mock' });
});

// POST /scrape - Playwright-powered (temporary simple scrape)
app.post('/scrape', async (req, res) => {
  const { productUrl } = req.body;
  console.log('Scraping:', productUrl);

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

    // Example scraping logic: get all review texts
    const reviews = await page.$$eval('.review-text-content', (els) =>
      els.map((el) => el.innerText.trim())
    );

    await browser.close();

    // Mock scoring logic (replace later with AI model or heuristics)
    const fakeScore = Math.random(); // placeholder
    const summary =
      fakeScore > 0.5
        ? 'High likelihood of manipulated reviews'
        : 'Reviews seem authentic';

    res.json({ fakeScore, summary, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Mock backend listening at http://localhost:${PORT}`);
});
