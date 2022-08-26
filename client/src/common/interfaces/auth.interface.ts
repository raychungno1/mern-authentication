export interface User {
  name: string;
  email: string;
  picture?: string;
  role?: string;
}

export interface AuthState {
  user: User;
  token: string;
}
