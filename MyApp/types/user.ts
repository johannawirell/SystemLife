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


// export const user = {
//   id: '1',
//   name: 'johannawirell',
//   level: 1,
//   title: 'Starter',
//   balance: 0,
//   class: 0,
//   xpToNextLevel: 'N/A',
//   health: 0,
//   economy: 0,
//   social: 0,
//   iq: 0,
//   personality: 'N/A',
//   coins: 0,
//   email: 'johanna@example.com',
//   avatar: '',
// };