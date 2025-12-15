# Amazon Review Scraper Backend (v1 – Mock)

Minimal Node.js + Express backend to accept requests from a Chrome extension and return mock analysis data. No scraping logic yet.

## Features

- **POST `/scrape`** accepts JSON: `{ "productUrl": "https://www.amazon.com.au/dp/XXXX" }`
- **Returns mock JSON**:
  ```json
  { "fakeScore": 0.72, "summary": "High likelihood of manipulated reviews" }
  ```
- **CORS enabled** for Chrome extension calls
- **Logs** received `productUrl`
- Healthcheck: **GET `/`** returns basic service info

## Tech

- Node.js
- Express
- No database, no auth, no Playwright (yet)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   - Production-like:
     ```bash
     npm start
     ```
   - Development (auto-restart on changes):
     ```bash
     npm run dev
     ```

Server runs on: `http://localhost:3001`

## Test

- Healthcheck:
  ```bash
  curl http://localhost:3001/
  ```

- Mock scrape:
  ```bash
  curl -X POST http://localhost:3001/scrape \
    -H "Content-Type: application/json" \
    -d '{"productUrl": "https://www.amazon.com.au/dp/XXXX"}'
  ```

You should see the mock response and the server logs printing the received `productUrl`.

## Notes

- This is a mock backend for local development only.
- Future versions will add Playwright and deploy to Railway.
