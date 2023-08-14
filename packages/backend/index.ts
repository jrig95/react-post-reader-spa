import fastify from 'fastify'
import cors from '@fastify/cors';

import { PORT } from './env';
import { UsersService } from './src/UsersService/UsersService';
import { PostsService } from './src/PostsService/PostsService';

const main = async () => {
  const server = fastify()
  await server.register(cors)

  const Users = new UsersService();
  const Posts = new PostsService(Users.getAllUsers());

  server.get('/ping', (_request, reply) => reply.status(200).send({ message: 'pong'}))

  server.get('/register', (request, reply) => {
    const { email } = request.query as { email?: string };

    if (!email || email.trim().length === 0) {
      return reply.status(400).send({ errors: ['No EMail provided'] })
    }

    try {
      const user = Users.makeUser({ email });
      return reply.status(200).send({ user })
    } catch (e: unknown) {
      return reply.status(500).send({ errors: [String(e)] })
    }
  })

  server.get('/posts', (request, reply) => {
    const { page, per_page, token } = request.query as { token?: string, page?: string, per_page?: string };
    const params = {
      token: String(token),
      page: Number(page) || 0,
      perPage: Number(per_page) || 100
    }

    if (!Number.isSafeInteger(params.page) || params.page < 0 || !Number.isSafeInteger(params.perPage) || params.perPage < 0) {
      return reply.status(400).send({ errors: ['Incorrect params' ]})
    }

    try {
      void Users.getUserByToken(params.token);
    } catch (e: unknown) {
      return reply.status(401).send({ errors: ['Incorrect params' ]})
    }

    try {
      const posts = Posts.getPosts(params.page, params.perPage).map(post => ({
        ...post,
        from: Users.getUser(post.from),
        to: Users.getUser(post.to),
      }));
      const pages = Posts.getPageCount(params.perPage);

      return reply.status(200).send({ posts, page: params.page, pages, })
    } catch (e: unknown) {
      return reply.status(500).send({ errors: ['Incorrect params' ]})
    }
  })

  server.listen({ port: PORT }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(`Server listening at ${address}`)
  })
}

void main();
