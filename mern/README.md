# Ultrabulb IT MERN migration

This directory is the MongoDB/Express/React/Vite deployment target. The existing Next.js app remains at the repository root until the MERN client reaches feature parity.

## Server

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

## Client

```bash
cd client
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:4000/api` for the client when the API is not proxied.
