# Rihlah — Islamic & Halal Tourism Platform (Module 46 Setup)

A full-stack Halal & Islamic heritage travel application built with **Next.js 16 (App Router, TypeScript, Tailwind CSS v4, Base UI)** on the client and **Express 5 + MongoDB Native Driver** on the server.

## Project Structure

```text
b14-wanderlust-resources/
├── package.json             # Root monorepo scripts (dev, check, seed, lint)
├── client/                  # Next.js 16 Frontend (Port 3000)
│   ├── public/images/       # Custom curated Halal tourism imagery
│   └── src/
│       ├── app/
│       │   ├── page.tsx                 # Homepage (Banner, Why Choose Us, Testimonials, CTA)
│       │   ├── destinations/page.tsx    # Fetch & filter Halal destinations (+ loading & error states)
│       │   ├── destinations/[id]/       # Package details + Edit & Delete dialogs (+ SEO metadata)
│       │   └── add-destination/page.tsx # Create a new Halal travel package with live preview
│       ├── components/
│       │   ├── destination/             # Shared form fields, grid, edit/delete dialogs
│       │   ├── home/                    # Banner, WhyChooseUs, Testimonials, CTA
│       │   └── ui/                      # Base UI + Tailwind primitives & SafeImage
│       └── lib/                         # API config, formatters, TypeScript types
└── server/                  # Express 5 + MongoDB Backend (Port 8000)
    ├── data/seedDestinations.js # 6 curated Islamic & Halal destinations
    ├── index.js                 # REST API with regex protection, payload sanitization & auto-seed
    ├── seed.js                  # Manual reset/seed script (`npm run seed`)
    └── .env.example             # Environment variables template
```

## Quick Start

### 1. Configure MongoDB & Start Backend (`server/`)

```bash
cd server

# Linux / macOS / Git Bash:
cp .env.example .env

# Windows PowerShell:
Copy-Item .env.example .env

# Edit server/.env and replace MONGODB_URI with your MongoDB Atlas connection string
npm install
npm run dev
```

- When `MONGODB_URI` is configured and the database is empty on first run, `server/index.js` automatically seeds **6 curated Halal destinations** (Makkah & Madinah, Istanbul, Granada & Cordoba, Sarajevo, Langkawi & Kuala Lumpur, and Marrakech).
- You can manually reset & re-seed the 6 packages anytime with:
  ```bash
  npm run seed
  ```

### 2. Start Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Convenient Root Workspace Scripts

From the repository root:

```bash
npm run dev:client    # Starts Next.js frontend
npm run dev:server    # Starts Express backend
npm run check         # Runs TypeScript, ESLint, and Node syntax checks
npm run seed          # Seeds MongoDB with 6 curated Halal packages
```

## REST API Endpoints (`http://localhost:8000`)

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/` | Health & MongoDB connection status |
| `GET` | `/destinations` | Fetch packages (supports `?category=`, `?search=`, `?maxPrice=`, `?sort=`) |
| `GET` | `/destination/:id` | Fetch a single destination by MongoDB `_id` |
| `POST` | `/add-destination` | Create a new Halal travel package (with input sanitization) |
| `PATCH` | `/destination/:id` | Update an existing package (with field validation & allowlist) |
| `DELETE` | `/destination/:id` | Permanently delete a package |
