import { faker } from '@faker-js/faker';
import type { User } from './UsersService.types';
import { v4 } from 'uuid';

export const createUser = (params: Pick<User, 'email'>): User => {
  return {
    id: v4(),
    email: params.email,
    token: v4(),
  }
}

export const createFakeUsers = (count: number = 10) => {
  const result: Record<User['id'], User> = {};

  for (let i = 0; i < count; i++) {
    const email = faker.internet.email();
    const user = createUser({ email });

    result[user.id] = user;
  }

  return result;
}
