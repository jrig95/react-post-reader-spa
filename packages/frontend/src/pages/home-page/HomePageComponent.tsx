import React, { useState } from 'react';
import SenderList from '../../components/senders/SenderList';
import PostList from '../../components/posts/PostList';
import { Link } from 'react-router-dom';
import './HomePage.css';

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

const HomePageComponent: React.FC = () => {
  const [selectedSender, setSelectedSender] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

  const handleSenderClick = (sender: string, posts: PostType[]) => {
    const filteredPosts = posts.filter((post) => post.from?.email === sender);
    setFilteredPosts(filteredPosts);
    setSelectedSender(sender);
  };

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <div className='content-container'>
        <div className="sender-section">
          <SenderList onSenderClick={handleSenderClick} />
          <div className='link'>
            {selectedSender && (
              // Use the Link component to navigate to the dynamic route for each sender
              <Link to={`/home/${selectedSender}`}>
                View Posts for {selectedSender}
              </Link>
            )}
          </div>
        </div>

        {selectedSender && (
          <div className="post-section">
            <PostList filteredPosts={filteredPosts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
