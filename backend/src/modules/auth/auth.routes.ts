import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { requireAuth, AuthenticatedRequest } from '../../middlewares/auth';
import { createAccessToken, hashPassword, verifyPassword } from '../../utils/auth';
import { verifyGoogleIdToken } from '../../utils/google-auth';
import { HttpError } from '../../utils/http-error';
import { store } from '../../utils/store';

export const authRouter = Router();
const OAUTH_PROVIDERS = ['apple', 'google', 'linkedin'] as const;
type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

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
    authProvider: 'email' as const,
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

authRouter.post('/oauth', async (req, res, next) => {
  const {
    provider,
    idToken,
    platform,
    intent,
  } = req.body as {
    provider?: string;
    idToken?: string;
    platform?: 'android' | 'ios' | 'web';
    intent?: 'login' | 'register';
  };

  const normalizedProvider =
    provider === 'android' ? 'google' : (provider as OAuthProvider | undefined);

  if (!normalizedProvider || !OAUTH_PROVIDERS.includes(normalizedProvider)) {
    next(new HttpError(400, 'provider must be one of apple, google, linkedin or android'));
    return;
  }

  if (normalizedProvider !== 'google') {
    next(new HttpError(400, `${normalizedProvider} OAuth is not configured yet`));
    return;
  }

  if (!idToken) {
    next(new HttpError(400, 'idToken is required for Google OAuth'));
    return;
  }

  if (intent !== 'login' && intent !== 'register') {
    next(new HttpError(400, 'intent must be login or register'));
    return;
  }

  try {
    const identity = await verifyGoogleIdToken(idToken);
    let user = Array.from(store.users.values()).find(
      (item) => item.googleProviderUserId === identity.providerUserId
    );

    const emailUser = Array.from(store.users.values()).find((item) => item.email === identity.email);

    if (intent === 'login') {
      if (!user) {
        next(new HttpError(404, 'Det finns inget SystemLife-konto kopplat till detta Google-konto'));
        return;
      }
    }

    if (intent === 'register' && user) {
      next(new HttpError(409, 'Google-kontot är redan kopplat till ett SystemLife-konto'));
      return;
    }

    if (intent === 'register' && !user && emailUser && !emailUser.googleProviderUserId) {
      next(
        new HttpError(
          409,
          'E-postadressen finns redan i SystemLife men är inte kopplad till Google ännu'
        )
      );
      return;
    }

    if (!user && intent === 'register') {
      user = {
        id: uuid(),
        email: identity.email,
        passwordHash: '',
        name: identity.name,
        authProvider: normalizedProvider,
        googleProviderUserId: identity.providerUserId,
        preferences: {
          areas: ['halsa'],
          ambition: 'medium',
        },
        goals: ['Kom igång med min vardagsrutin'],
      };

      store.users.set(user.id, user);
      store.createEvent('auth.oauth.registered', user.id, {
        provider: normalizedProvider,
        platform: platform ?? 'web',
        providerUserId: identity.providerUserId,
      });
    }

    if (!user) {
      next(new HttpError(500, 'Google OAuth kunde inte slutföras'));
      return;
    }

    const token = createAccessToken(user);

    store.createEvent('auth.oauth', user.id, {
      provider: normalizedProvider,
      platform: platform ?? 'web',
      providerUserId: identity.providerUserId,
      intent,
    });

    res.json({
      token,
      provider: normalizedProvider,
      user,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get('/me', requireAuth, (req, res) => {
  const authReq = req as AuthenticatedRequest;

  res.json({
    user: authReq.user,
    token: authReq.token,
  });
});
