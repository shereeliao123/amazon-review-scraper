const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck (optional but handy)
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'amazon-review-scraper-backend', version: 'v1-mock' });
});

// POST /scrape - mock endpoint
app.post('/scrape', (req, res) => {
  const { productUrl } = req.body || {};

  // Basic validation
  if (!productUrl || typeof productUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid input: `productUrl` (string) is required.' });
  }

  // Log the received productUrl
  console.log('Received productUrl:', productUrl);

  // Return mock analysis data
  return res.json({
    fakeScore: 0.72,
    summary: 'High likelihood of manipulated reviews'
  });
});

app.listen(PORT, () => {
  console.log(`Mock backend listening at http://localhost:${PORT}`);
});
