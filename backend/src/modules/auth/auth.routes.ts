import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { requireAuth, AuthenticatedRequest } from '../../middlewares/auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const authRouter = Router();

authRouter.post('/register', (req, res, next) => {
  const { email, password, name } = req.body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password || !name) {
    next(new HttpError(400, 'email, password and name are required'));
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
    password,
    name,
    preferences: {
      areas: [],
      ambition: 'medium',
    },
  };

  const token = uuid();
  store.users.set(user.id, user);
  store.tokens.set(token, user.id);
  store.createEvent('auth.registered', user.id, { email: user.email });

  res.status(201).json({
    token,
    user,
  });
});

authRouter.post('/login', (req, res, next) => {
  const { email, password } = req.body as { email?: string; password?: string };

  const user = Array.from(store.users.values()).find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    next(new HttpError(401, 'Invalid email or password'));
    return;
  }

  const token = uuid();
  store.tokens.set(token, user.id);
  store.createEvent('auth.logged_in', user.id, { email: user.email });

  res.json({
    token,
    user,
  });
});

authRouter.post('/oauth', (req, res) => {
  const { provider = 'google' } = req.body as { provider?: string };
  const user = Array.from(store.users.values())[0];
  const token = uuid();

  store.tokens.set(token, user.id);
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
