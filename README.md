# Exzy Dashboard

Real-time Exzy infographic dashboard for installation and workplace impact data.

Figma source: https://www.figma.com/design/od7fh8S0W00SSgdQJ7Snyx/Dashboard?node-id=0-1&t=Un4QZHSmXwvrwnzF-1

## Files

- `index.html` - live UI, Google Sheet reader, KPI calculations, and map plotting.
- `config.js` - Google Maps API key, sheet ID, and refresh interval.
- `DASHBOARD_SPEC.md` - lightweight information architecture and data logic.
- `FIGMA_REFERENCE.md` - Figma workflow and approval rules.
- `assets/` - local visual assets.

## Display Target

- Fixed `1080 x 1920` portrait digital screen.
- The poster scales proportionally and stays centered without rearranging.

## Live Data Setup

1. Share the Google Sheet as **Anyone with the link — Viewer**, or publish the tab as CSV.
2. In Google Cloud, enable **Maps JavaScript API** and **Geocoding API**.
3. Add the restricted browser API key to `config.js`.
4. Run `start-dashboard.ps1` and open `http://localhost:8080`.

The dashboard refreshes every five minutes. It recognizes `Building`, common organization/customer headings, and common date headings. Geocoded coordinates are cached in the browser to reduce API usage.

## GitHub Setup

Git is not currently available from this machine's command line. After Git is installed or added to PATH, run:

```powershell
git init
git add .
git commit -m "Initial Exzy dashboard project"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

## Figma API Setup

Create `.env.local` from `.env.example` and add a new Figma token with `file_content:read` access.

```powershell
Copy-Item .env.example .env.local
node scripts/fetch-figma.mjs
node scripts/figma-to-spec.mjs
```

Do not commit `.env.local` or `figma-cache/`.
