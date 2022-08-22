export interface IUser {
  name: String;
  email: String;
  picture?: String;
  role?: String;
}

export interface IAuthStore {
  user: IUser;
  token: String;
}
