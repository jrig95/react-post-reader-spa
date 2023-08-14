import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SenderList from './SenderList';
import * as AuthContextModule from '../../contexts/AuthContext';
import { act } from 'react-dom/test-utils';

describe('SenderList', () => {
  beforeEach(() => {
    // Mock the useAuth hook to return a mock token value
    jest.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      token: 'test-token',
      setToken: () => { },
    });

    // Mock the posts data that will be fetched by SenderList
    const postsData = [
      {
        id: '1',
        title: 'Test Post 1',
        body: 'This is the body of Test Post 1',
        date: '2023-07-21',
        from: {
          id: 'sender1',
          email: 'sender1@example.com',
          token: 'sender1-token',
        },
        to: {
          id: 'recipient1',
          email: 'recipient1@example.com',
          token: 'recipient1-token',
        },
      },
    ];

    // Mock the fetch function to return the test data
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ posts: postsData }),
    });
  });

  it('should render senders list correctly', async () => {
    // Define a mock function for onSenderClick
    const onSenderClick = jest.fn();

    await act(async () => {
      render(<SenderList onSenderClick={onSenderClick} />);
    });

    // Wait for the data to be loaded and the sender list to be rendered
    await waitFor(
      () => {
        expect(
          screen.getByText('sender1@example.com - 1 posts')
        ).toBeInTheDocument();
      },
      { timeout: 3000 } // wait for up to 3 seconds for the data to load
    );
  });

  it('should filter senders correctly when searching', async () => {
    // Define a mock function for onSenderClick
    const onSenderClick = jest.fn();

    await act(async () => {
      render(<SenderList onSenderClick={onSenderClick} />);
    });

    // Simulate user input in the search box
    fireEvent.change(screen.getByPlaceholderText('Search senders...'), {
      target: { value: 'sender1' },
    });

    // Wait for the filtered senders to be displayed
    await waitFor(() => {
      expect(screen.getByText('sender1@example.com - 1 posts')).toBeInTheDocument();
    });

    // Check that other senders are not displayed
    expect(screen.queryByText('recipient1@example.com - 1 posts')).not.toBeInTheDocument();
  });
});
