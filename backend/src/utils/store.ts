import { v4 as uuid } from 'uuid';
import { createHmac } from 'crypto';

import { env } from '../config/env';

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  authProvider?: 'email' | 'apple' | 'google' | 'linkedin';
  preferences: {
    areas: string[];
    ambition: string;
  };
  goals: string[];
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

export type MentalHealthCheckIn = {
  id: string;
  userId: string;
  mood: number;
  anxiety: number;
  energy?: number;
  notes?: string;
  createdAt: string;
};

export type JournalEntry = {
  id: string;
  userId: string;
  prompt: string;
  content: string;
  createdAt: string;
};

export type CopingGoal = {
  id: string;
  userId: string;
  title: string;
  category: 'mindfulness' | 'coping' | 'exposure';
  completed: boolean;
  createdAt: string;
};

const seedUserId = uuid();
const seedToken = 'demo-token';
const seedPasswordHash = createHmac('sha256', env.jwtSecret).update('password123').digest('hex');

const users = new Map<string, User>([
  [
    seedUserId,
    {
      id: seedUserId,
      email: 'johanna@example.com',
      passwordHash: seedPasswordHash,
      name: 'Johanna Wirell',
      authProvider: 'email',
      preferences: {
        areas: ['halsa', 'studier', 'karriar'],
        ambition: 'medium',
      },
      goals: ['Bygga SystemLife', 'Halla en jamn studierutin'],
    },
  ],
]);

const goals = new Map<string, Goal>();
const quests = new Map<string, Quest>();
const events: AppEvent[] = [];
const activities: Activity[] = [];
const notifications: Notification[] = [];
const mentalHealthCheckIns: MentalHealthCheckIn[] = [];
const journalEntries: JournalEntry[] = [];
const copingGoals: CopingGoal[] = [];

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
  goals,
  quests,
  events,
  activities,
  notifications,
  mentalHealthCheckIns,
  journalEntries,
  copingGoals,
  seedToken,
  createEvent,
};
