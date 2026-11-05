# FoodBridge

**Good food deserves a destination, not a dustbin.**

FoodBridge is a responsive, frontend-first concept for coordinating surplus-food donations between donors, NGOs, community kitchens and volunteers. This repository is a demonstration website; it is not connected to a live donation or logistics service.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Vite prints a local URL (normally `http://localhost:5173`).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Deploy

The project is a standard Vite app and can be deployed to Vercel, Netlify, Render static sites, or another static host.

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

No environment variables are required for the current demo.

## Demo behaviour and data integrity

- The donor, volunteer and NGO forms are local demonstrations. They do not submit, store or transmit personal information.
- Impact figures are illustrative calculations, not measured FoodBridge outcomes. The calculator assumes 0.5 kg per portion and a 60 kg load per pickup; real values depend on food, serving sizes, vehicle capacity and route conditions.
- Community stories are explicitly fictional examples, not real testimonials or partner claims.
- Photographs are externally hosted stock images and are used for illustration.

## Main structure

- `src/components/` — page sections and reusable interactions
- `src/data/content.ts` — navigation, stories, journey steps, feature copy and demo form definitions
- `src/index.css` — design tokens, component styles and motion preferences
- `public/foodbridge-social.svg` — FoodBridge-branded social preview graphic


## Troubleshooting

### `npm` is not recognized on Windows

Install the current Node.js LTS release from <https://nodejs.org/> and keep the option to add Node.js to PATH enabled. Close and reopen PowerShell or VS Code after installation, then verify both commands:

```powershell
node -v
npm -v
```

If both commands print version numbers, open this project folder and run `npm install`, followed by `npm run dev`. For a clean install when the lockfile is unchanged, `npm ci` can be used instead of `npm install`.

The project uses Vite 7 and requires Node.js 20.19+ (or a compatible newer release).
