import React, { useState } from 'react';
import './search-panel.css';
const SearchPanel = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && inputValue.trim() !== '') {
      addItem(inputValue);
      setInputValue('');
    }
  };
  return (
    <input
      className="new-todo"
      placeholder="What need to be done"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchPanel;
