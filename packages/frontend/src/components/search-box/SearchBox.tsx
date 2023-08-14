import React, { useState } from 'react';
import Input from '../input/Input';
import './SearchBox.css'

interface SearchBoxProps {
  onSearch: (searchText: string) => void;
  placeholder: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, placeholder }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearchText = e.target.value;
    setSearchText(updatedSearchText);
    onSearch(updatedSearchText);
  };

  return (
    <Input
      type="text"
      id="search-input"
      className="search-input"
      placeholder={placeholder}
      value={searchText}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
