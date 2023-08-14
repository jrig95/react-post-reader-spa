import type { IUsersService, User } from './UsersService.types';
import { createUser, createFakeUsers } from './UsersService.utils';

export class UsersService implements IUsersService {
  protected users: Record<User['id'], User>;

  constructor() {
    this.users = createFakeUsers();
  }

  public getUser = (id: string): User => {
    const user = this.users[id];

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  public getAllUsers = (): User[] => {
    return Object.values(this.users);
  }

  public makeUser = (params: Pick<User, 'email'>): User => {
    const newUser = createUser(params);

    this.users[newUser.id] = newUser;

    return newUser;
  }

  public getUserByToken = (token: string): User => {
    for (const id in this.users) {
      const user = this.users[id];

      if (!user) {
        continue;
      }

      if (user.token === token) {
        return user;
      }
    }

    throw new Error('User not found');
  }
}
