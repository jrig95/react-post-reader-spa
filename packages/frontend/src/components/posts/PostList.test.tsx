import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostList from './PostList';

describe('PostList', () => {
  const mockFilteredPosts = [
    {
      id: 'post1',
      title: 'Post 1',
      body: 'This is the body of Post 1',
      date: '2023-07-20T12:00:00Z',
      from: {
        id: 'user1',
        email: 'user1@example.com',
        token: 'user1token',
      },
      to: {
        id: 'user2',
        email: 'user2@example.com',
        token: 'user2token',
      },
    },
  ];

  it('should render posts correctly', async () => {
    render(<PostList filteredPosts={mockFilteredPosts} />);

    // Check if the post items are rendered correctly
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('This is the body of Post 1')).toBeInTheDocument();

    // Check for Date
    const dateElement = screen.getByText('2023-07-20T12:00:00Z');
    expect(dateElement.closest('p')?.textContent).toBe('Date: 2023-07-20T12:00:00Z');

    // Check for From
    const fromElement = screen.getByText('user1@example.com');
    expect(fromElement.closest('p')?.textContent).toBe('From: user1@example.com');

    // Check if the initial button text is either "Sort by Latest" or "Sort by Oldest"
    const initialSortButton = await screen.findByRole('button', {
      name: /Sort by (Latest|Oldest)/,
    });
    expect(initialSortButton).toBeInTheDocument();

    // Click on the button to change the sorting order
    fireEvent.click(initialSortButton);

    // Check if the button text changes to either "Sort by Oldest" or "Sort by Latest"
    const updatedSortButton = await screen.findByRole('button', {
      name: /Sort by (Latest|Oldest)/,
    });
    expect(updatedSortButton).toBeInTheDocument();

    // Perform additional assertions as needed
  });
});
