# FitLog

FitLog is a dark, responsive workout library and daily workout planner built from the provided Figma design and FitLog API.

## Technologies

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React
- FitLog REST API
- localStorage
- Vercel

## Features

- Responsive workout library with all API workouts
- Workout detail pages with specifications and instructions
- Today's Plan with a five-workout cap
- Saved workouts
- Add, save, remove and mark-as-done actions with toast notifications
- Live plan counters and metrics
- localStorage persistence across reloads
- Duration, calories and rating sorting
- Search by workout name or muscle group
- Custom loading, error and 404 states

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Deployment

The project is configured for Vercel. Import the repository, keep the framework as Next.js, and deploy.
