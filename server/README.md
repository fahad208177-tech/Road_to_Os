# Optional: deeper AI feedback for writing (free)

The app already marks writing **on the phone, offline, for free** (`js/writing.js`). This folder adds an
*optional* extra: a button that sends the answer to an AI model for more detailed feedback when the
student is online.

It runs on **Cloudflare Workers AI**. Cloudflare's free plan includes a free daily allowance of AI use,
so at small scale this costs nothing, and no secret key is stored inside the app. If the daily allowance
runs out, the button says "try later" and the normal offline marking keeps working.

## Set it up (about 15 minutes)

1. Make a free account at <https://dash.cloudflare.com/sign-up> (no card needed for the free plan).
2. Install Node.js, then in this `server` folder run:
   ```
   npx wrangler login
   npx wrangler deploy
   ```
3. Wrangler prints a URL like `https://r2o-marker.<your-name>.workers.dev`.
4. Open `js/writing.js` and set:
   ```js
   const CONFIG = R2O.WCONFIG = { aiUrl: 'https://r2o-marker.<your-name>.workers.dev' };
   ```
5. The "🤖 Deeper AI feedback" button now appears on every writing task.

## Notes

- Check Cloudflare's current free limits on their Workers AI pricing page before a big pilot.
- Students' writing is sent to Cloudflare only when they press the AI button. Tell pilot NGOs this.
- The model can make mistakes. The app labels its feedback as advice, not a final mark.
- To stop it at any time, delete the Worker in the Cloudflare dashboard, or set `aiUrl: ''`.
