# Deployment Guide

Recommended host: **Hostinger VPS** (Ubuntu 22.04 / 24.04), or any single VPS / cloud server with persistent disk.

---

## 1. Hostinger Email Setup (`contact@ultrabulbit.com`)

The backend mailer automatically sends new booking alerts and contact messages to `contact@ultrabulbit.com` via Hostinger SMTP.

Set these environment variables in your server's `backend/.env`:

```ini
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@ultrabulbit.com
SMTP_PASS=YourHostingerEmailPassword
NOTIFICATION_EMAIL=contact@ultrabulbit.com
MAIL_FROM="ULTRABULB IT" <contact@ultrabulbit.com>
```

> **Tip**: The password is the email account password created in Hostinger **hPanel -> Emails -> Manage**.

---

## 2. Hostinger VPS Deployment (Recommended)

### Prerequisites on Hostinger VPS
1. SSH into your Hostinger VPS:
   ```bash
   ssh root@<your-vps-ip>
   ```
2. Install Node.js 20+ and PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs git
   npm install -g pm2
   ```

### Clone and Build
```bash
git clone https://github.com/AitijyaSarker/CompanyWeb.git /var/www/ultrabulbit
cd /var/www/ultrabulbit

# 1. Build the frontend into backend/dist
cd frontend
npm ci
npm run build

# 2. Install backend production dependencies
cd ../backend
npm ci --omit=dev
cp .env.example .env
nano .env   # Fill in MONGODB_URI, JWT_SECRET, CLIENT_ORIGIN, and Hostinger SMTP details
```

### Start with PM2
```bash
cd /var/www/ultrabulbit/backend
pm2 start src/index.js --name "ultrabulb-api"
pm2 save
pm2 startup
```

### Configure Caddy / Nginx Reverse Proxy & SSL
If using Caddy (e.g. from the repository's `Caddyfile`):
```caddy
ultrabulbit.com, www.ultrabulbit.com {
    reverse_proxy localhost:4000
}
```
Caddy will automatically provision and renew free SSL certificates for your domain.

---

## 3. Render Deployment

This repository includes `render.yaml` for a single Render Web Service. Create a new Blueprint from the repository, then set these environment variables in Render:

```text
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
CLIENT_ORIGIN=https://<your-render-service>.onrender.com,https://ultrabulbit.com
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@ultrabulbit.com
SMTP_PASS=<your-hostinger-email-password>
NOTIFICATION_EMAIL=contact@ultrabulbit.com
```

Render generates `JWT_SECRET` automatically. The service builds `frontend/`, starts `backend/`, exposes `/api/health`, and sends new admin uploads to Cloudinary.

---

## 4. Updates & Maintenance

To deploy updates:
```bash
cd /var/www/ultrabulbit
git pull
cd frontend && npm ci && npm run build
cd ../backend && npm ci --omit=dev
pm2 restart ultrabulb-api
```
