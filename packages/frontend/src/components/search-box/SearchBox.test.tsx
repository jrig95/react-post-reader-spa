import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('should call onSearch callback with the updated search text', () => {
    // Create a mock function for the onSearch callback
    const mockOnSearch = jest.fn();

    // Render the SearchBox with the mock onSearch callback
    render(
      <SearchBox
        onSearch={mockOnSearch}
        placeholder="Search posts..."
      />
    );

    // Find the search input element
    const searchInput = screen.getByPlaceholderText('Search posts...');

    // Type a search text into the input
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    // Check if the onSearch callback is called with the updated search text
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('should update the search input value', () => {
    // Create a mock function for the onSearch callback
    const mockOnSearch = jest.fn();

    // Render the SearchBox with the mock onSearch callback
    render(
      <SearchBox
        onSearch={mockOnSearch}
        placeholder="Search posts..."
      />
    );

    // Find the search input element
    const searchInput = screen.getByPlaceholderText('Search posts...');

    // Type a search text into the input
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    // Check if the search input value is updated correctly
    expect(searchInput).toHaveValue('test search');
  });
});
