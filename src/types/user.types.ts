export type UserRole = "customer";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
};

export type AuthSession = {
  user: User;
  token: string;
};
