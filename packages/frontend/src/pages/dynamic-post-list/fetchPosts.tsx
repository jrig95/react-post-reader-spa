import { PostType } from './DynamicPostList';

export const fetchPosts = async (token: string, senderId: string): Promise<PostType[]> => {
  try {
    const response = await fetch(`http://localhost:1338/posts?token=${token}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    // Filter posts based on senderId
    const filteredPosts = data.posts.filter((post: PostType) => post.from.email === senderId);
    return filteredPosts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
