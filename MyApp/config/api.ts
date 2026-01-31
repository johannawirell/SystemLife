import axios from 'axios';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export async function saveUserToBackend(email: string, name?: string) {
  await axios.put(`${BACKEND_URL}/profile/${encodeURIComponent(email)}`, { email, name });
}

export async function getJwtFromBackend(email: string): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return data.token;
}

export async function getUserProfile(email: string) {
  const res = await fetch(`${BACKEND_URL}/profile/${encodeURIComponent(email)}`);
  const data = await res.json();
  return data;
}

export async function getUserFromBackend(token: string) {
  // Testsyfte, när det inte fungerar att logga in med Apple
  if (!token) {
    return {
      name: 'Test User',
      title: 'Starter',
      level: 1,
      xpToNextLevel: 100,
      health: 50,
      economy: 30,
      social: 20,
      iq: 0,
      personality: 15,
      class: 0,
      coins: 500,
      email: 'testuser@systemlife.com',
      balance: 75,
    };
  } else {
  const res = await fetch(`${BACKEND_URL}/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  }
  
}

export async function getGoogleUserInfo(accessToken: string) {
  const url = process.env.EXPO_PUBLIC_GOOGLE_USERINFO_URL;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Failed to fetch Google user info');
  return await res.json();
}