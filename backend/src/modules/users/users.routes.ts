import { Router } from 'express';

import { AuthenticatedRequest } from '../../middlewares/auth';

export const usersRouter = Router();

usersRouter.get('/me', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  res.json(authReq.user);
});

usersRouter.patch('/me', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const { name, preferences } = req.body as {
    name?: string;
    preferences?: AuthenticatedRequest['user']['preferences'];
  };

  authReq.user.name = name ?? authReq.user.name;
  authReq.user.preferences = preferences ?? authReq.user.preferences;

  res.json(authReq.user);
});
