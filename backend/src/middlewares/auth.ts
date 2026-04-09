import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../utils/http-error';
import { store, User } from '../utils/store';

export type AuthenticatedRequest = Request & {
  user: User;
  token: string;
};

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    next(new HttpError(401, 'Missing bearer token'));
    return;
  }

  const token = header.replace('Bearer ', '').trim();
  const userId = store.tokens.get(token);

  if (!userId) {
    next(new HttpError(401, 'Invalid token'));
    return;
  }

  const user = store.users.get(userId);

  if (!user) {
    next(new HttpError(401, 'User not found for token'));
    return;
  }

  (req as AuthenticatedRequest).user = user;
  (req as AuthenticatedRequest).token = token;
  next();
}
