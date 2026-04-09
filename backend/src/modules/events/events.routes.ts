import { Router } from 'express';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const eventsRouter = Router();

eventsRouter.get('/', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const items = store.events.filter((event) => event.userId === authReq.user.id);
  res.json(items);
});

eventsRouter.post('/', (req, res, next) => {
  const authReq = req as AuthenticatedRequest;
  const { type, payload = {} } = req.body as {
    type?: string;
    payload?: Record<string, unknown>;
  };

  if (!type) {
    next(new HttpError(400, 'type is required'));
    return;
  }

  const event = store.createEvent(type, authReq.user.id, payload);
  res.status(201).json(event);
});
