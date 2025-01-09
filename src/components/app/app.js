import React, { useState, useEffect, useRef } from 'react'

import './app.css'
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'

const App = () => {
  const maxId = useRef(100)
  const timerID = useRef(null)

  const createTodoItem = (label, min = 0, sec = 0) => {
    const totalSeconds = min * 60 + sec
    return {
      label,
      important: false,
      done: false,
      id: maxId.current++,
      created: new Date(),
      timerStarted: null,
      elapsedTime: totalSeconds,
      isRunning: false,
    }
  }
  const initialTodoData = [
    createTodoItem('Drink Coffe'),
    createTodoItem('Make Awesome App'),
    createTodoItem('Have a lunch'),
  ]
  const [todoData, setTodoData] = useState(initialTodoData)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    timerID.current = setInterval(() => updateTimer(), 1000)
    return () => clearInterval(timerID.current)
  }, [todoData])

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => item.id !== id))
  }

  const addItem = (text, min = 0, sec = 0) => {
    const newItem = createTodoItem(text, min, sec)
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }

  const startTimer = (id) => {
    setTodoData((prevTodoData) =>
      toggleProperty(toggleProperty(prevTodoData, id, 'isRunning', true), id, 'timerStarted', Date.now())
    )
  }

  const stopTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => (item.id === id ? { ...item, isRunning: false, timerStarted: null } : item))
    )
  }

  const updateTimer = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.isRunning && item.elapsedTime > 0 ? { ...item, elapsedTime: Math.max(item.elapsedTime - 1, 0) } : item
      )
    )
  }

  const toggleProperty = (arr, id, propName, value) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: value !== undefined ? value : !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleImportant = (id) => {
    setTodoData((prevTodoData) => toggleProperty(prevTodoData, id, 'important'))
  }

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => toggleProperty(prevTodoData, id, 'done'))
  }

  const allFilter = () => {
    setFilter('all')
  }
  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.done))
  }

  const filteredItems = () => {
    if (filter === 'active') {
      return todoData.filter((el) => !el.done)
    }
    if (filter === 'done') {
      return todoData.filter((el) => el.done)
    }
    return todoData
  }

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount

  return (
    <div className="main">
      <AppHeader />
      <SearchPanel addItem={addItem} />
      <TodoList
        todos={filteredItems()}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        onStartTimer={startTimer}
        onStopTimer={stopTimer}
      />
      <ItemStatusFilter
        todos={todoData}
        toDo={todoCount}
        done={doneCount}
        onAll={allFilter}
        onActive={() => setFilter('active')}
        onDone={() => setFilter('done')}
        filter={filter}
        onClear={clearCompleted}
      />
    </div>
  )
}

export default App
