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
    mental-health/
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
- `GET /api/mental-health/overview`
- `GET /api/mental-health/check-ins`
- `POST /api/mental-health/check-ins`
- `GET /api/mental-health/journal`
- `POST /api/mental-health/journal`
- `GET /api/mental-health/tools`
- `GET /api/mental-health/goals`
- `POST /api/mental-health/goals`
- `PATCH /api/mental-health/goals/:id`
- `POST /api/notifications/send`

## OAuth

`POST /api/auth/oauth` accepterar just nu `google` och `android`.

- `android` mappas till Google-inloggning for Android-klienter
- Google `id_token` verifieras i backend mot dina konfigurerade Google client IDs
- Apple och LinkedIn ar inte aktiverade an

## Mental Health Service

Mental health-servicen stottar:

- mood and anxiety tracking
- journaling prompts och journalinlagg
- mindfulness exercises
- coping strategies
- small step goals, till exempel exposure therapy

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
