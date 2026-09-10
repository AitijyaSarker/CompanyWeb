# Deployment

Recommended host: a single VPS with persistent disk, such as DigitalOcean or Hetzner. The MERN deployment uses MongoDB and local uploads.

## Render deployment

This repository includes `render.yaml` for a single Render Web Service. Create a new Blueprint from the repository, then set these environment variables in Render:

```text
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
CLIENT_ORIGIN=https://<your-render-service>.onrender.com
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

Render generates `JWT_SECRET` automatically. The service builds `frontend/`, starts `backend/`, exposes `/api/health`, and sends new admin uploads to Cloudinary. Add the Render outbound IP policy required by your Atlas plan, or temporarily allow access during the first migration and then restrict it.

After the first deploy, migrate the existing SQLite data from a machine that has `db/custom.db`:

```bash
cd backend
$env:MONGODB_URI="your-atlas-uri"; npm run migrate:sqlite
```

On Linux/macOS use `MONGODB_URI="your-atlas-uri" npm run migrate:sqlite`. Run this once only, unless you intentionally clear the Atlas database.

## First deployment

```bash
git clone <repository-url> ultrabulb
cd ultrabulb
cd frontend
npm ci
npm run build
cd ../backend
npm ci
cp .env.example .env
# edit .env with production values
npm start
```

Run the backend from `backend/`; it serves `frontend/dist` and listens on port `4000`. Put Caddy or Nginx in front of `localhost:4000` and configure HTTPS. MongoDB stores application data and Cloudinary stores uploaded images.

## Updates

```bash
git pull
cd frontend
npm ci
npm run build
cd ../backend
npm ci
npm start
```

Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, and `UPLOAD_DIR` in the backend environment. `JWT_SECRET` must be a unique production secret. Set `PORT=4000` unless the reverse proxy is configured differently.

Before migration, add the deployment server's public IP to MongoDB Atlas Network Access. Then run `npm run migrate:sqlite` once from `backend/` to import the existing SQLite content. Never commit `backend/.env`; rotate the Atlas database password if it has been shared publicly.