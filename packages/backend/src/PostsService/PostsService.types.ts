import type { User } from '../UsersService/UsersService.types';

export interface Post {
  id: string;
  from: User['id'];
  to: User['id'];
  title: string;
  body: string;
  date: string;
}

export interface IPostsService {
  getPageCount: (perPage: number) => number;
  getPosts: (page: number, perPage: number) => Post[]
}
