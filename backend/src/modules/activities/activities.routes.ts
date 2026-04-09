import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const activitiesRouter = Router();

activitiesRouter.post('/', (req, res, next) => {
  const authReq = req as AuthenticatedRequest;
  const { category, durationMinutes, notes } = req.body as {
    category?: string;
    durationMinutes?: number;
    notes?: string;
  };

  if (!category) {
    next(new HttpError(400, 'category is required'));
    return;
  }

  const activity = {
    id: uuid(),
    userId: authReq.user.id,
    category,
    durationMinutes,
    notes,
    createdAt: new Date().toISOString(),
  };

  store.activities.unshift(activity);
  store.createEvent(`${category}.logged`, authReq.user.id, { activityId: activity.id });

  res.status(201).json(activity);
});

activitiesRouter.get('/', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const items = store.activities.filter((activity) => activity.userId === authReq.user.id);
  res.json(items);
});
