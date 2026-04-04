# StreamPot

A movie streaming web app where users can browse popular movies, search, stream, and manage personal watchlists.

**Live demo:** [streampot-frontend.onrender.com](https://streampot-frontend.onrender.com)

**Backend repo:** [Kenny-204/streampot-backend-mongo](https://github.com/Kenny-204/streampot-backend-mongo)

---

## Features

- Browse popular movies on the home page
- Search movies via the TMDB API
- View detailed movie info and stream directly in the app
- Create, edit, and manage multiple watchlists
- Watch history tracking
- User authentication — signup, login, protected routes
- Responsive design across desktop, tablet, and mobile

## Tech Stack

- **React 18 + TypeScript** — UI and component logic
- **Vite** — build tool and dev server
- **React Router v6** — client-side routing and protected routes
- **Radix UI** — accessible dropdown components
- **TMDB API** — movie data (titles, posters, descriptions, ratings)
- **Custom streaming API** — handles in-app movie playback

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API](https://www.themoviedb.org/settings/api) account for the auth bearer token
- The backend running locally or a deployed backend URL

### Installation

```sh
# Clone the repo
git clone https://github.com/Kenny-204/StreamPot-frontend.git
cd StreamPot-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=your_backend_url
VITE_AUTH_BEARER=your_tmdb_bearer_token
```

### Running the App

```sh
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```
