# EventHub

EventHub is a React and Express event-management application based on the project demo. It includes public event browsing and filtering, JWT registration and login, protected registrations, and an admin dashboard for event CRUD operations.

## Run locally

Install dependencies and start the API:

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

In a second terminal, start the React client:

```bash
cd client
npm install
npm run dev
```

The API runs on `http://localhost:5000` and the Vite client runs on `http://localhost:5173`.

The server uses a seeded in-memory store when `MONGODB_URI` is empty, which makes the demo runnable without external services. To use MongoDB, set `MONGODB_URI`; the Mongoose schemas are in `server/models`.

The seeded administrator is `admin@example.com` with password `admin123`. Change this before using the application outside the demo environment.

## API

- `GET /api/events` and `GET /api/events/:id` are public.
- `POST`, `PUT`, and `DELETE /api/events` require an administrator Bearer token.
- `POST /api/auth/register` and `POST /api/auth/login` return a JWT.
- `GET /api/auth/me` requires authentication.
- `GET /api/registrations/me` and `POST /api/registrations/:eventId` require authentication.
