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
	- välj ambitionsnivå

### Home
- [] XP-bar
- [] level
- [] dagens quests
- [] streak
- [] senaste achivements

### Goals/Quests
- [] skapa mål
- [] bryta ner i quests
- [] markera som klar
- [] progress bars

### Activity logging
- [] studietid
- [] träning
- [] jobbrelaterade aktiviteter
- [] socialt
- [] ekonomi
- [] quick actions

### Progression view
- [] XP historik
- [] level per kategori
- [] weekly stats

### Achievements
- [] badges 
- [] unlocks
- [] milestones

### Profil
- [] avatar
- [] stats
- [] nivåer
- [] inställningar

### Mental health
- [] mood and anxiety tracking
- [] journaling prompts
- [] mindfulness exercises  
- [] coping strategies
- [] small step goals (e.g. exposure therapy for social anxiety)

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
    /mental-health
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

OAuth providers:
- [] Apple ID
- [] Google
- [] Android via Google
- [] LinkedIn

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
POST /integrations/linkedin/connect
```

### Notification Service
- [] pushnotiser
- [] reminders

Endpoints för notifications:
```
POST /notifications/send
```

### Mental Health Service
- [] mood and anxiety tracking
- [] journaling prompts
- [] mindfulness exercises
- [] coping strategies
- [] small step goals (e.g. exposure therapy for social anxiety)

Endpoints för mental health:
```
GET /mental-health/overview
GET /mental-health/check-ins
POST /mental-health/check-ins
GET /mental-health/journal
POST /mental-health/journal
GET /mental-health/tools
GET /mental-health/goals
POST /mental-health/goals
PATCH /mental-health/goals/:id
```

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
PostgreSQL

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
