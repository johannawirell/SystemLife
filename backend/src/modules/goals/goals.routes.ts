import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const goalsRouter = Router();

goalsRouter.get('/', (req, res) => {
  const authReq = req as unknown as AuthenticatedRequest;
  const items = Array.from(store.goals.values()).filter((goal) => goal.userId === authReq.user.id);
  res.json(items);
});

goalsRouter.post('/', (req, res, next) => {
  const authReq = req as AuthenticatedRequest;
  const { title, area, deadline } = req.body as {
    title?: string;
    area?: string;
    deadline?: string;
  };

  if (!title || !area) {
    next(new HttpError(400, 'title and area are required'));
    return;
  }

  const goal = {
    id: uuid(),
    userId: authReq.user.id,
    title,
    area,
    deadline,
    status: 'active' as const,
  };

  store.goals.set(goal.id, goal);
  store.createEvent('goal.created', authReq.user.id, { goalId: goal.id, title });

  res.status(201).json(goal);
});

goalsRouter.patch('/:id', (req, res, next) => {
  const authReq = req as AuthenticatedRequest;
  const goal = store.goals.get(req.params.id);

  if (!goal || goal.userId !== authReq.user.id) {
    next(new HttpError(404, 'Goal not found'));
    return;
  }

  const { title, area, deadline, status } = req.body as Partial<typeof goal>;
  goal.title = title ?? goal.title;
  goal.area = area ?? goal.area;
  goal.deadline = deadline ?? goal.deadline;
  goal.status = status ?? goal.status;

  store.createEvent('goal.updated', authReq.user.id, { goalId: goal.id, status: goal.status });
  res.json(goal);
});

goalsRouter.delete('/:id', (req, res, next) => {
  const authReq = req as AuthenticatedRequest;
  const goal = store.goals.get(req.params.id);

  if (!goal || goal.userId !== authReq.user.id) {
    next(new HttpError(404, 'Goal not found'));
    return;
  }

  store.goals.delete(goal.id);
  store.createEvent('goal.deleted', authReq.user.id, { goalId: goal.id });
  res.status(204).send();
});
