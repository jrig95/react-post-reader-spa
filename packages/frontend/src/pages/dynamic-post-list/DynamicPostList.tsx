import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './DynamicPostList.css'
import { fetchPosts } from './fetchPosts';
import Button from '../../components/button/Button';

export interface PostType {
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

const DynamicPostList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { senderId } = useParams<{ senderId: string }>();
  const { token } = useAuth(); // Get the token from the AuthContext
  const [error, setError] = useState<string>('');

  // Add useNavigate hook to get access to navigation
  const navigate = useNavigate();

  // Function to handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    // Fetch data only if the senderId exists
    if (senderId && token) {
      fetchPosts(token, senderId).then((data) => setPosts(data)).catch(
        (error: Error) => setError(error.message)
      );
    }
  }, [senderId, token]);
  if (error !== "") return <div data-testid="dynamic-post-list-error">{error}</div>
  return (
    <div data-testid="dynamic-post-list" className='dynamic-list-container'>
      <div className='header'>
        <Button onClick={handleBackClick} type="button" className="button button-back">Back</Button>
        <h2>Posts for Sender: {senderId}</h2>
      </div>
      <div className='posts'>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p><strong>Date:</strong> {post.date}</p>
              <p><strong>From:</strong> {post.from.email}</p>
              <p><strong>To:</strong> {post.to.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicPostList;
