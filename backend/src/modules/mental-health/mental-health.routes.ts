import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

const JOURNAL_PROMPTS = [
  'Vad var tungt idag, och vad hjälpte dig att hantera det?',
  'Vad behöver du just nu för att känna dig lite tryggare?',
  'Vilket litet steg känns möjligt idag?',
];

const COPING_STRATEGIES = [
  'Box breathing i 2 minuter',
  '5-4-3-2-1 grounding',
  'Kort mindfulness-paus',
  'Skriv ner en lugnande tanke',
];

const MINDFULNESS_EXERCISES = [
  '3 minuters andningsankare',
  'Body scan i 5 minuter',
  'Långsam promenad utan mobil',
];

export const mentalHealthRouter = Router();

mentalHealthRouter.get('/overview', (req, res) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const checkIns = store.mentalHealthCheckIns.filter((item) => item.userId === authReq.user.id);
  const journalEntries = store.journalEntries.filter((item) => item.userId === authReq.user.id);
  const goals = store.copingGoals.filter((item) => item.userId === authReq.user.id);

  const latestCheckIn = checkIns[0] ?? null;
  const averageMood =
    checkIns.length > 0
      ? Number((checkIns.reduce((sum, item) => sum + item.mood, 0) / checkIns.length).toFixed(1))
      : null;

  res.json({
    latestCheckIn,
    averageMood,
    journalCount: journalEntries.length,
    activeGoals: goals.filter((goal) => !goal.completed).length,
    prompts: JOURNAL_PROMPTS,
    copingStrategies: COPING_STRATEGIES,
    mindfulnessExercises: MINDFULNESS_EXERCISES,
  });
});

mentalHealthRouter.get('/check-ins', (req, res) => {
  const authReq = req as unknown as AuthenticatedRequest;
  res.json(store.mentalHealthCheckIns.filter((item) => item.userId === authReq.user.id));
});

mentalHealthRouter.post('/check-ins', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const { mood, anxiety, energy, notes } = req.body as {
    mood?: number;
    anxiety?: number;
    energy?: number;
    notes?: string;
  };

  if (typeof mood !== 'number' || typeof anxiety !== 'number') {
    next(new HttpError(400, 'mood and anxiety are required numbers'));
    return;
  }

  const checkIn = {
    id: uuid(),
    userId: authReq.user.id,
    mood,
    anxiety,
    energy,
    notes,
    createdAt: new Date().toISOString(),
  };

  store.mentalHealthCheckIns.unshift(checkIn);
  store.createEvent('mental_health.check_in.logged', authReq.user.id, {
    checkInId: checkIn.id,
    mood,
    anxiety,
  });

  res.status(201).json(checkIn);
});

mentalHealthRouter.get('/journal', (req, res) => {
  const authReq = req as unknown as AuthenticatedRequest;
  res.json({
    prompts: JOURNAL_PROMPTS,
    entries: store.journalEntries.filter((item) => item.userId === authReq.user.id),
  });
});

mentalHealthRouter.post('/journal', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const { prompt, content } = req.body as {
    prompt?: string;
    content?: string;
  };

  if (!prompt || !content) {
    next(new HttpError(400, 'prompt and content are required'));
    return;
  }

  const entry = {
    id: uuid(),
    userId: authReq.user.id,
    prompt,
    content,
    createdAt: new Date().toISOString(),
  };

  store.journalEntries.unshift(entry);
  store.createEvent('mental_health.journal.created', authReq.user.id, {
    entryId: entry.id,
  });

  res.status(201).json(entry);
});

mentalHealthRouter.get('/tools', (_req, res) => {
  res.json({
    copingStrategies: COPING_STRATEGIES,
    mindfulnessExercises: MINDFULNESS_EXERCISES,
  });
});

mentalHealthRouter.get('/goals', (req, res) => {
  const authReq = req as unknown as AuthenticatedRequest;
  res.json(store.copingGoals.filter((item) => item.userId === authReq.user.id));
});

mentalHealthRouter.post('/goals', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const { title, category } = req.body as {
    title?: string;
    category?: 'mindfulness' | 'coping' | 'exposure';
  };

  if (!title || !category) {
    next(new HttpError(400, 'title and category are required'));
    return;
  }

  const goal = {
    id: uuid(),
    userId: authReq.user.id,
    title,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  store.copingGoals.unshift(goal);
  store.createEvent('mental_health.goal.created', authReq.user.id, {
    goalId: goal.id,
    category,
  });

  res.status(201).json(goal);
});

mentalHealthRouter.patch('/goals/:id', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const goal = store.copingGoals.find(
    (item) => item.id === req.params.id && item.userId === authReq.user.id
  );

  if (!goal) {
    next(new HttpError(404, 'Mental health goal not found'));
    return;
  }

  const { completed, title } = req.body as {
    completed?: boolean;
    title?: string;
  };

  if (typeof completed === 'boolean') {
    goal.completed = completed;
  }

  if (title) {
    goal.title = title;
  }

  store.createEvent('mental_health.goal.updated', authReq.user.id, {
    goalId: goal.id,
    completed: goal.completed,
  });

  res.json(goal);
});
