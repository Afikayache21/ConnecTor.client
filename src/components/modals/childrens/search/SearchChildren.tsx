// SearchChildren.tsx
import React, { useState } from 'react';
import './searchChildren.scss'
type SearchChildrenProps = {
  onSearch: (query: string) => void; // Function to handle search
};

const SearchChildren: React.FC<SearchChildrenProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery); // Pass the search query to the parent component
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update state with the current input value
  };

  return (
    <div className="search-children">
      <button onClick={handleSearch}>חפש</button>
      <input
      dir='rtl'
        type="text"
        placeholder="חפש..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchChildren;
