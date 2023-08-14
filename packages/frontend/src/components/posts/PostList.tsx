import React, { useState } from 'react';
import SearchBox from '../search-box/SearchBox';
import Button from '../button/Button';
import './PostList.css'

interface PostType {
  id: string;
  title: string;
  body: string;
  date: string;
  from: {
    id: string;
    email: string;
    token: string;
  };
  to: {
    id: string;
    email: string;
    token: string;
  };
}

const PostList: React.FC<{ filteredPosts: PostType[] }> = ({ filteredPosts }) => {
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [searchText, setSearchText] = useState<string>('');

  // Sort the filteredPosts based on date in ascending or descending order
  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return ascendingOrder ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const handleOrderChange = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
  };

  const filteredPostsBySearch = sortedPosts.filter((post) => {
    // Convert both title and body to lowercase for case-insensitive comparison
    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseBody = post.body?.toLowerCase() || ''; // Handle cases where body is not available

    // Check if either title or body includes the search text
    return lowerCaseTitle.includes(searchText.toLowerCase()) || lowerCaseBody.includes(searchText.toLowerCase());
  });

  return (
    <div className='post-list-container'>
      <h2>Posts</h2>
      <SearchBox
        onSearch={(text) => setSearchText(text)}
        placeholder="Search posts..."
      />
      <Button className="button button-posts" onClick={handleOrderChange}>
        {ascendingOrder ? 'Sort by Latest' : 'Sort by Oldest'}
      </Button>
      <ul>
        {filteredPostsBySearch.map((post) => (
          <li key={post.id} data-testid={`post-list-item-${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p><strong>Date:</strong> {post.date}</p>
            <p><strong>From:</strong> {post.from.email}</p>
            <p><strong>To:</strong> {post.to.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
