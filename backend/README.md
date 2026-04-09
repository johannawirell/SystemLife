# Backend

Express + TypeScript backend

## Struktur

```text
src/
  config/
  middlewares/
  modules/
    achievements/
    activities/
    auth/
    events/
    goals/
    integrations/
    notifications/
    progression/
    quests/
    users/
  utils/
```

## Endpoints

Alla endpoints ligger under `/api`.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/oauth`
- `GET /api/auth/me`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `GET /api/goals`
- `POST /api/goals`
- `PATCH /api/goals/:id`
- `DELETE /api/goals/:id`
- `GET /api/quests`
- `POST /api/quests`
- `PATCH /api/quests/:id`
- `POST /api/quests/:id/complete`
- `GET /api/events`
- `POST /api/events`
- `GET /api/progression`
- `GET /api/progression/history`
- `GET /api/achievements`
- `POST /api/activities`
- `GET /api/activities`
- `POST /api/integrations/health/sync`
- `POST /api/integrations/linkedin/connect`
- `POST /api/notifications/send`

## Koer lokalt

```bash
npm install
npm run db:up
npm run dev
```

Kolla sedan `GET /health` for status, databaskoppling och demo-token.

## PostgreSQL

Databasen startas via Docker Compose i [backend/docker-compose.yml](/Users/johannawirell/Desktop/SystemLife/backend/docker-compose.yml) och initieras med schema i [backend/database/init.sql](/Users/johannawirell/Desktop/SystemLife/backend/database/init.sql).

Standardvarden lokalt:

- databas: `systemlife`
- anvandare: `systemlife`
- losenord: `systemlife`
- port: `5432`

Skapa en lokal `.env` utifran [backend/.env.example](/Users/johannawirell/Desktop/SystemLife/backend/.env.example) om du vill andra anslutningen.
