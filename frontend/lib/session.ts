export type SessionUser = {
  id: string;
  email: string;
  name: string;
  authProvider?: 'email' | 'apple' | 'google' | 'linkedin';
  preferences: {
    areas: string[];
    ambition: string;
  };
  goals: string[];
};

type SessionState = {
  token: string | null;
  user: SessionUser | null;
};

const session: SessionState = {
  token: null,
  user: null,
};

export function setSession(token: string, user: SessionUser) {
  session.token = token;
  session.user = user;
}

export function clearSession() {
  session.token = null;
  session.user = null;
}

export function getSession() {
  return session;
}
