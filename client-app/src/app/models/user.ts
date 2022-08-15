export interface User {
  username?: string;
  displayName?: string;
  token?: string;
  image?: string;
  createdAt?: Date;
}

export interface UserFormValues {
  username?: string;
  password: string;
  displayName?: string;
  email: string;
}
