// SenderList.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SearchBox from '../search-box/SearchBox';
import './SenderList.css';

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

interface Sender {
  sender: string;
  postCount: number;
}

interface Props {
  onSenderClick: (sender: string, posts: PostType[]) => void;
}

const SenderList: React.FC<Props> = ({ onSenderClick }) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedSender, setSelectedSender] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      if (!token) {
        console.error('Token is null');
        return;
      }

      try {
        const response = await fetch(`http://localhost:1338/posts?token=${token}`);
        if (!response.ok) {
          throw new Error('Request Failed');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  useEffect(() => {
    const generateSendersList = () => {
      const sendersMap = posts.reduce((map, post) => {
        const senderEmail = post.from?.email;
        if (senderEmail) {
          map[senderEmail] = (map[senderEmail] || 0) + 1;
        }
        return map;
      }, {} as Record<string, number>);

      const sendersList = Object.entries(sendersMap)
        .sort((entryA, entryB) => entryA[0].localeCompare(entryB[0]))
        .map(([sender, postCount]) => ({ sender, postCount }));

      setSenders(sendersList);
    };

    generateSendersList();
  }, [posts]);

  const handleSenderClick = (sender: string) => {
    setSelectedSender(sender);
    const selectedSenderPosts = posts.filter((post) => post.from?.email === sender);
    onSenderClick(sender, selectedSenderPosts);
  };

  const filteredSenders = senders.filter((sender) =>
    sender.sender.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sender-list-container">
      <SearchBox onSearch={(text) => setSearchText(text)} placeholder="Search senders..." />
      <ul>
        {filteredSenders.map(({ sender, postCount }, index) => (
          <li
            key={index}
            data-testid={`sender-list-item-${index}`}
            onClick={() => handleSenderClick(sender)}
            className={selectedSender === sender ? 'selected' : ''}
          >
            {sender} - {postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SenderList;
