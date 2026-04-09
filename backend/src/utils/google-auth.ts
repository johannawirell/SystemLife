import { OAuth2Client } from 'google-auth-library';

import { env } from '../config/env';
import { HttpError } from './http-error';

const googleClient = new OAuth2Client();

export type GoogleIdentity = {
  email: string;
  name: string;
  providerUserId: string;
};

export async function verifyGoogleIdToken(idToken: string) {
  const audiences = [
    env.googleWebClientId,
    env.googleAndroidClientId,
    env.googleIosClientId,
  ].filter(Boolean);

  if (audiences.length === 0) {
    throw new HttpError(500, 'Google OAuth is not configured');
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: audiences,
  });

  const payload = ticket.getPayload();

  if (!payload?.sub || !payload.email || payload.email_verified !== true) {
    throw new HttpError(401, 'Invalid Google token payload');
  }

  return {
    email: payload.email.toLowerCase(),
    name: payload.name ?? payload.email,
    providerUserId: payload.sub,
  } satisfies GoogleIdentity;
}
