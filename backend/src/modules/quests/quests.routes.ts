import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const questsRouter = Router();

questsRouter.get('/', (req, res) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const items = Array.from(store.quests.values()).filter(
    (quest) => quest.userId === authReq.user.id
  );
  res.json(items);
});

questsRouter.post('/', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const { title, goalId, recurring = false } = req.body as {
    title?: string;
    goalId?: string;
    recurring?: boolean;
  };

  if (!title) {
    next(new HttpError(400, 'title is required'));
    return;
  }

  const quest = {
    id: uuid(),
    userId: authReq.user.id,
    title,
    goalId,
    recurring,
    completed: false,
  };

  store.quests.set(quest.id, quest);
  store.createEvent('quest.created', authReq.user.id, { questId: quest.id, title });

  res.status(201).json(quest);
});

questsRouter.patch('/:id', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const quest = store.quests.get(req.params.id);

  if (!quest || quest.userId !== authReq.user.id) {
    next(new HttpError(404, 'Quest not found'));
    return;
  }

  const { title, recurring, goalId } = req.body as Partial<typeof quest>;
  quest.title = title ?? quest.title;
  quest.recurring = recurring ?? quest.recurring;
  quest.goalId = goalId ?? quest.goalId;

  store.createEvent('quest.updated', authReq.user.id, { questId: quest.id });
  res.json(quest);
});

questsRouter.post('/:id/complete', (req, res, next) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const quest = store.quests.get(req.params.id);

  if (!quest || quest.userId !== authReq.user.id) {
    next(new HttpError(404, 'Quest not found'));
    return;
  }

  quest.completed = true;
  const event = store.createEvent('quest.completed', authReq.user.id, { questId: quest.id });

  res.json({
    quest,
    event,
  });
});
