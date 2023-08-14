import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';
import type { User } from '../UsersService/UsersService.types';
import { getRandomInteger } from '../Utils/NumberUtils';
import type { Post } from './PostsService.types';

export const createPost = (params: Pick<Post, 'from' | 'to'>): Post => {
  return {
    id: v4(),
    from: params.from,
    to: params.to,
    title: faker.commerce.product(),
    body: faker.commerce.productDescription(),
    date: new Date(Date.now() - Math.ceil(Math.random()) * 1000 * 60 * 60).toISOString(),
  }
}


export const createFakePosts = (users: User[], count: number) => {
  const result: Post[] = [];
  const usersCount = users.length;

  for (let i = 0; i < count; i++) {
    const from = users[getRandomInteger(usersCount - 1)];
    const to = users[getRandomInteger(usersCount - 1)];

    if (!from || !to) {
      continue;
    }

    result.push(createPost({ from: from.id, to: to.id }));
  }

  return result;
}
