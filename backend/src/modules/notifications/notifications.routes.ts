import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const notificationsRouter = Router();

notificationsRouter.post('/send', (req, res, next) => {
  const authReq = req as AuthenticatedRequest;
  const { title, message } = req.body as { title?: string; message?: string };

  if (!title || !message) {
    next(new HttpError(400, 'title and message are required'));
    return;
  }

  const notification = {
    id: uuid(),
    userId: authReq.user.id,
    title,
    message,
    createdAt: new Date().toISOString(),
  };

  store.notifications.unshift(notification);
  store.createEvent('notification.sent', authReq.user.id, { notificationId: notification.id });

  res.status(201).json(notification);
});
