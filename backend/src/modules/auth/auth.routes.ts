import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { requireAuth, AuthenticatedRequest } from '../../middlewares/auth';
import { createAccessToken, hashPassword, verifyPassword } from '../../utils/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const authRouter = Router();

authRouter.post('/register', (req, res, next) => {
  const { email, password, name, areas, ambition, goals } = req.body as {
    email?: string;
    password?: string;
    name?: string;
    areas?: string[];
    ambition?: string;
    goals?: string[];
  };

  if (!email || !password || !name) {
    next(new HttpError(400, 'email, password and name are required'));
    return;
  }

  if (!Array.isArray(areas) || areas.length === 0) {
    next(new HttpError(400, 'At least one life area is required'));
    return;
  }

  if (!Array.isArray(goals) || goals.length === 0) {
    next(new HttpError(400, 'At least one goal is required'));
    return;
  }

  const emailTaken = Array.from(store.users.values()).some((user) => user.email === email);

  if (emailTaken) {
    next(new HttpError(409, 'Email already registered'));
    return;
  }

  const user = {
    id: uuid(),
    email,
    passwordHash: hashPassword(password),
    name,
    preferences: {
      areas,
      ambition: ambition ?? 'medium',
    },
    goals,
  };

  const token = createAccessToken(user);
  store.users.set(user.id, user);
  store.createEvent('auth.registered', user.id, {
    email: user.email,
    areas,
    ambition: user.preferences.ambition,
  });

  res.status(201).json({
    token,
    user,
  });
});

authRouter.post('/login', (req, res, next) => {
  const { email, password } = req.body as { email?: string; password?: string };

  const user = Array.from(store.users.values()).find(
    (item) => item.email === email
  );

  if (!user || !password || !verifyPassword(password, user.passwordHash)) {
    next(new HttpError(401, 'Invalid email or password'));
    return;
  }

  const token = createAccessToken(user);
  store.createEvent('auth.logged_in', user.id, { email: user.email });

  res.json({
    token,
    user,
  });
});

authRouter.post('/oauth', (req, res) => {
  const { provider = 'google' } = req.body as { provider?: string };
  const user = Array.from(store.users.values())[0];
  const token = createAccessToken(user);

  store.createEvent('auth.oauth', user.id, { provider });

  res.json({
    token,
    provider,
    user,
  });
});

authRouter.get('/me', requireAuth, (req, res) => {
  const authReq = req as AuthenticatedRequest;

  res.json({
    user: authReq.user,
    token: authReq.token,
  });
});
