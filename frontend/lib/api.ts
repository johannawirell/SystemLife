import { getSession, SessionUser, setSession } from './session';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001/api';

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  auth?: boolean;
};

type AuthResponse = {
  token: string;
  user: SessionUser;
};

type OAuthProvider = 'google' | 'android';

async function request<T>(path: string, options: ApiOptions = {}) {
  const { token } = getSession();
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.auth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data ? String(data.error) : 'API error';
    throw new Error(message);
  }

  return data as T;
}

export async function login(email: string, password: string) {
  const result = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  setSession(result.token, result.user);
  return result;
}

export async function oauthLogin(
  provider: OAuthProvider,
  payload?: {
    idToken?: string;
    platform?: 'android' | 'ios' | 'web';
    intent?: 'login' | 'register';
  }
) {
  const result = await request<AuthResponse>('/auth/oauth', {
    method: 'POST',
    body: {
      provider,
      ...payload,
    },
  });
  setSession(result.token, result.user);
  return result;
}

export async function register(name: string, email: string, password: string) {
  const result = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
  setSession(result.token, result.user);
  return result;
}

export async function registerWithOnboarding(
  name: string,
  email: string,
  password: string,
  areas: string[],
  ambition: string,
  goals: string[]
) {
  const result = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: { name, email, password, areas, ambition, goals },
  });
  setSession(result.token, result.user);
  return result;
}

export async function fetchCurrentUser() {
  const result = await request<{ user: SessionUser; token: string }>('/auth/me', {
    auth: true,
  });
  setSession(result.token, result.user);
  return result.user;
}

export async function fetchProgression() {
  return request<{ xp: number; level: number; streak: number; completedQuests: number }>(
    '/progression',
    { auth: true }
  );
}
