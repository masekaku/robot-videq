# Doodstream Video Feed

## Setup
1. Copy `.env.example` -> `.env.local` and set `DOOD_API_KEY`.
2. `npm install`
3. `npm run dev` (requires vercel CLI) or deploy to Vercel (add env var on dashboard).

## Notes
- `/api/videos` proxies to Doodstream and normalizes the response.
- If iframe is blocked, use "Open in new tab" in modal.