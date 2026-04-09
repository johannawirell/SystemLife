import { v4 as uuid } from 'uuid';

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  preferences: {
    areas: string[];
    ambition: string;
  };
};

export type Goal = {
  id: string;
  userId: string;
  title: string;
  area: string;
  deadline?: string;
  status: 'active' | 'completed';
};

export type Quest = {
  id: string;
  userId: string;
  goalId?: string;
  title: string;
  recurring: boolean;
  completed: boolean;
};

export type AppEvent = {
  id: string;
  type: string;
  userId: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

export type Activity = {
  id: string;
  userId: string;
  category: string;
  durationMinutes?: number;
  notes?: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
};

const seedUserId = uuid();
const seedToken = 'demo-token';

const users = new Map<string, User>([
  [
    seedUserId,
    {
      id: seedUserId,
      email: 'johanna@example.com',
      password: 'password123',
      name: 'Johanna Wirell',
      preferences: {
        areas: ['halsa', 'studier', 'karriar'],
        ambition: 'medium',
      },
    },
  ],
]);

const tokens = new Map<string, string>([[seedToken, seedUserId]]);

const goals = new Map<string, Goal>();
const quests = new Map<string, Quest>();
const events: AppEvent[] = [];
const activities: Activity[] = [];
const notifications: Notification[] = [];

function createEvent(type: string, userId: string, payload: Record<string, unknown>) {
  const event: AppEvent = {
    id: uuid(),
    type,
    userId,
    payload,
    createdAt: new Date().toISOString(),
  };
  events.unshift(event);
  return event;
}

export const store = {
  users,
  tokens,
  goals,
  quests,
  events,
  activities,
  notifications,
  seedToken,
  createEvent,
};
