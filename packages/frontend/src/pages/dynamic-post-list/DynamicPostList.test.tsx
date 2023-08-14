import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import DynamicPostList from './DynamicPostList';
import { fetchPosts } from './fetchPosts';


const mockPosts = [{
  id: '1',
  title: 'Test Post 1',
  body: 'This is a test post 1',
  date: '2023-07-24',
  from: {
    id: '1',
    email: 'test1@example.com',
    token: '1234',
  },
  to: {
    id: '2',
    email: 'test2@example.com',
    token: '5678',
  },
}];

jest.mock('./fetchPosts', () => ({
  fetchPosts: jest.fn(),
}));



describe('DynamicPostList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the posts correctly', () => {
    (fetchPosts as jest.Mock).mockResolvedValue(mockPosts);
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/posts/1']}>
          <DynamicPostList />
        </MemoryRouter>
      </AuthProvider>
    );

    // Wait for the posts to be displayed
    waitFor(() => expect(screen.getByTestId('dynamic-post-list')).toBeInTheDocument());

    // Check that the post title and body are displayed
    waitFor(() => expect(screen.getByText('Test Post 1')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('This is a test post 1')).toBeInTheDocument());
  });

  it('displays an error message if fetching posts fails', () => {
    // Mock the fetchPosts function to throw an error
    jest.requireMock('./fetchPosts').fetchPosts.mockRejectedValue(new Error('Failed to fetch posts'));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/posts/1']}>
          <Routes>
            <Route path="/posts/:senderId" element={<DynamicPostList />}>
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Wait for the error message to be displayed
    waitFor(() => expect(screen.getByTestId('dynamic-post-list-error')).toBeInTheDocument());

  });
});
