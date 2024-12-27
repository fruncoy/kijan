export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}