# MERN deployment

Recommended setup: MongoDB Atlas + Render (or Railway) for the Express API and a static host for the Vite client.

## API on Render

1. Create a MongoDB Atlas database and copy its connection string.
2. Create a Render Web Service from `mern/server`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add environment variables:

```text
MONGODB_URI=<MongoDB Atlas connection string>
JWT_SECRET=<long random secret>
CLIENT_ORIGIN=<deployed client URL>
RESEND_API_KEY=<optional email provider key>
RESEND_FROM=<verified sender address>
```

## Client

1. Create a Render Static Site, Netlify site, or Vercel project from `mern/client`.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Add `VITE_API_URL=https://your-api.onrender.com/api`.
5. Configure SPA fallback so all routes serve `index.html`.

## Import existing SQLite data

Copy the existing `db/custom.db` into `mern/server`, set `SQLITE_PATH`, install dependencies, and run:

```bash
npm run migrate:sqlite
```

The importer is intended as a one-time migration. Back up the SQLite database before running it and review duplicate-record errors before switching traffic.