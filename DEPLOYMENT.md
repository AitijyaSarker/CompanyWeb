# Deployment

Recommended host: a single VPS with persistent disk, such as DigitalOcean or Hetzner. This project uses SQLite and local uploads, so `db/` and `public/uploads/` must survive redeploys.

## First deployment

```bash
git clone <repository-url> ultrabulb
cd ultrabulb
npm ci
cp .env.example .env
# edit .env with production values
npx prisma generate
npx prisma migrate deploy
npm run build
npm start
```

Run the server from the project root. Put Caddy or Nginx in front of `localhost:3000` and configure HTTPS. Keep `db/` and `public/uploads/` on persistent storage and back up both directories.

## Updates

```bash
git pull
npm ci
npx prisma migrate deploy
npx prisma generate
npm run build
npm start
```

Set `SESSION_SECRET` to a unique secret and configure `RESEND_API_KEY` plus a verified `RESEND_FROM` address for project access notification emails. Do not run `prisma db push --accept-data-loss` in production.