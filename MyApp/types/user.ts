export interface User {
  id: string;
  name: string;
  level: number; // 1-50
  title: string; // "Starter" default
  balance: number; // 0-100
  class: number; // N/A default
  xpToNextLevel: string; // "N/A" default
  health: number; // 0+
  economy: number; // 0+
  social: number; // 0+
  iq: number; // N/A default
  personality: string; // N/A default
  coins: number; // 0 default
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}