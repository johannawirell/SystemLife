# App
Eventdrivet flöde

Exempel)
1. User klarar quest
`` POST /quests/:id/complete``
2. Backend skapar event
`` event: quest.completed ``
3. Progression service
- +XP
- check level up
4. Achivement service
- check badges
5. Notification Service
- “LEVEL UP!”

```

[ React Native App ]
        |
        | HTTPS / REST API
        v
[ Express API / mobile-api ]
        |
        | 1. Validerar request
        | 2. Sparar data i Postgres
        | 3. Skapar event
        |
        +-----------------------> [ PostgreSQL ]
        |
        +-----------------------> [ Redis ]
        |                         - cache
        |                         - snabba uppslag
        |                         - ev. enkel kö
        |
        v
[ Event / Queue Layer ]
        |
        +-----------------------> [ Progression Worker ]
        |                          - räknar XP
        |                          - level up
        |
        +-----------------------> [ Achievement Worker ]
        |                          - badges
        |                          - milestones
        |
        +-----------------------> [ Notification Worker ]
                                   - pushnotiser
                                   - streak-varningar



==================== KUBERNETES ====================

Kubernetes kör allt detta som containers/pods:

- mobile-api
- progression-worker
- achievement-worker
- notification-worker


Kubernetes ansvarar för:
- att starta tjänsterna
- att hålla dem igång
- att skala upp fler pods vid hög trafik
- att routa trafik till rätt service
```

# Frontend
React Native
```
/src
  /features
    /auth
    /onboarding
    /goals
    /quests
    /progression
    /achievements
    /profile
  /components
  /services (API calls)
  /store (zustand / redux)
  /utils
```
## Auth & onboarding
- [] login/signup
- [] onboarding
	- välj livsområden (hälsa, studier, karriär)
	- sätt mål
	- välj ambitionsnivå
## Home
- [] XP-bar
- [] Level
- [] Dagens quests
- [] streak
- [] senaste achivements

## Goals/Quests
- [] skapa mål
- [] bryta ner i quests
- [] markera som klar
- [] progress bars

## Activity logging
- [] Studietid
- [] Träning
- [] Jobbrelaterade aktiviteter
- [] Socialt
- [] Ekonomi
- [] Quick actions

## Progression view
- [] XP historik
- [] level per kategori
- [] weekly stats

## Achievements
- [] badges 
- [] unlocks
- [] milestones

## Profil
- [] avatar
- [] stats
- [] nivåer
- [] inställningar

# Backend
Express.js
``` 
/src
  /modules
    /auth
    /users
    /goals
    /quests
    /events
    /progression
    /achievements
    /integrations
    /notifications
  /middlewares
  /utils
  /config
```

### Auth Service
- [] Registering
- [] Login
- [] JWT-tokens
- [] Oauth

Endpoints för auth:
```
POST /auth/register
POST /auth/login
POST /auth/oauth
GET /auth/me
```

### User services
- [] profil
- [] preferences
- [] livsområden

Endpoints för user:
```
GET /users/me
PATCH /users/me
```
### Goals Service
- [] mål
- [] struktur
- [] deadlines

Endpoints för goals:
```
GET /goals
POST /goals
PATCH /goals/:id
DELETE /goals/:id
```

### Quest Service
- [] quests
- [] återkommande tasks
- [] completion

Endpoints för quests:
```
GET /quests
POST /quests
PATCH /quests/:id
POST /quests/:id
```

### Event Service
- [] Tar emot alla actions

Exempel events
```
quest.completed
workout.logged
study.logged
goal.completed
```

### Progression Service
- [] räkna XP
- [] levels
- [] streaks
- [] lyssnar på events

Endpoints för progression:
```
GET /progression
GET /progression/history
```

### Achievement Service
- [] badges
- [] unlocks
- [] events + progression

Endpoints för achievements:
```
GET /achievements
```	
### Activity Service
- [] manuell loggning

Enpoints för activities:
``` 
POST /activities
GET /activities
```

### Integration Service
- [] HealthKit/Health Connect
- [] LinkedIn

Enpoints för integrationer:
```
POST /integrations/health/sync
POST /integrations/linkedi/connect
```

### Notification Service
- [] pushnotiser
- [] reminders

Endpoints för notifications:
```
POST /notifications/send
```
### Economy Service
- [] sparmål
- [] logga utgifter
- [] logga inkomster
- [] saldo/översikt
```
GET  /economy
GET  /economy/goals
GET  /economy/goals/:id 
POST /economy/goals

POST /economy/income
POST /economy/expense

GET  /economy/transactions  

```
# Databas
### Users
- [] id
- [] email
- [] password_hash
- [] created_at

### Profile
- [] user_id
- [] level
- [] xp
- [] streak

### Goals
- [] id
- [] user_id
- [] title
- [] category
- [] deadline

### Quests
- [] id
- [] goal_id
- [] title
- [] xp_reward
- [] is_completed

### Events
- [] id
- [] user_id
- [] type
- [] metadata (JSON)
- [] created_at

### Achievements
- [] id
- [] name
- [] description

### User_achievements
- [] user_id
- [] achievement_id
- [] unlocked_at

### Activities
- [] id
- [] user_id
- [] type
- [] value
- [] created_at

### Economy
- Transactions
	- [] id
	- [] user_id
	- [] type
	- [] category
	- [] amount
	- [] title
	- [] created_at
- Savings_goals
	- [] id
	- [] user_id
	- [] title
	- [] target_amount
	- [] current_amount
	- [] deadline
	- [] created_at


