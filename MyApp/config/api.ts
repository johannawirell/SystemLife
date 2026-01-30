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
  console.log("Fetching user with token:", token);
  const res = await fetch(`${BACKEND_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  console.log("Response status:", res.status);
  if (!res.ok) throw new Error('Failed to fetch user');
  return await res.json();
}