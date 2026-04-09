import { createHmac, timingSafeEqual } from 'crypto';

import { env } from '../config/env';
import { HttpError } from './http-error';
import { User } from './store';

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, 'base64').toString('utf8');
}

function sign(input: string) {
  return createHmac('sha256', env.jwtSecret)
    .update(input)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function createAccessToken(user: User) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    } satisfies JwtPayload)
  );
  const signature = sign(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export function verifyAccessToken(token: string) {
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    throw new HttpError(401, 'Invalid token');
  }

  const expectedSignature = sign(`${header}.${payload}`);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    throw new HttpError(401, 'Invalid token signature');
  }

  const decoded = JSON.parse(base64UrlDecode(payload)) as JwtPayload;

  if (decoded.exp * 1000 < Date.now()) {
    throw new HttpError(401, 'Token expired');
  }

  return decoded;
}

export function hashPassword(password: string) {
  return createHmac('sha256', env.jwtSecret).update(password).digest('hex');
}

export function verifyPassword(password: string, passwordHash: string) {
  return hashPassword(password) === passwordHash;
}
