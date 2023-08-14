import type { IPostsService, Post } from './PostsService.types';
import { createFakePosts } from './PostsService.utils';
import type { User } from '../UsersService/UsersService.types';

export class PostsService implements IPostsService {
  protected posts: Post[];

  constructor(users: User[]) {
    this.posts = createFakePosts(users, users.length * 100);
  }

  public getPageCount = (perPage: number) => {
    return Math.ceil(this.posts.length / perPage);
  }

  public getPosts = (page: number, perPage: number = 10): Post[] => {
    const start = page * perPage;

    if (Number.isNaN(start)) {
      throw new Error('Incorrect params');
    }

    if (start < 0 || start >= this.posts.length) {
      throw new Error('Incorrect params');
    }

    return this.posts.slice(start, perPage);
  }
}
