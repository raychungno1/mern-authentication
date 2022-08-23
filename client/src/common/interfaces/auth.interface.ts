export interface User {
  name: String;
  email: String;
  picture?: String;
  role?: String;
}

export interface AuthState {
  user: User;
  token: String;
}
