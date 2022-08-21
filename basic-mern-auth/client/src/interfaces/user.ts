export interface IUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface IAuthStore {
  profile: IUser;
  token: string;
}
