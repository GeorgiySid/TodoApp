import React, { useState } from 'react'
import './search-panel.css'
const SearchPanel = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('')
  const [inputValueMin, setInputValueMin] = useState('')
  const [inputValueSec, setInputValueSec] = useState('')

  const handleInputChange = (evt, setter) => {
    setter(evt.target.value)
  }

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && inputValue.trim() !== '') {
      addItem(inputValue, parseInt(inputValueMin) || 0, parseInt(inputValueSec) || 0)
      setInputValue('')
      setInputValueMin('')
      setInputValueSec('')
    }
  }

  return (
    <div className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What need to be done"
        value={inputValue}
        onChange={(evt) => handleInputChange(evt, setInputValue)}
        onKeyDown={handleKeyDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={inputValueMin}
        onChange={(evt) => handleInputChange(evt, setInputValueMin)}
        onKeyDown={handleKeyDown}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={inputValueSec}
        onChange={(evt) => handleInputChange(evt, setInputValueSec)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchPanel
