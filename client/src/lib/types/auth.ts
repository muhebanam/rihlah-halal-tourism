export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  country?: string;
  bio?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: IUser;
}
