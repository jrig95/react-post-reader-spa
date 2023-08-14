export interface User {
  id: string;
  email: string;
  token: string;
}

export interface IUsersService {
  getUser: (id: string) => User;
  getUserByToken: (token: string) => User;
  getAllUsers: () => User[];
  makeUser: (params: Pick<User, 'email'>) => User;
}
