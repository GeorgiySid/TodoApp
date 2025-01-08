import React from 'react'

import './app.css'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'

export default class App extends React.Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Drink Coffe'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    originalTodoData: [],
    filter: 'all',
  }

  componentDidMount() {
    this.setState({ originalTodoData: [...this.state.todoData] })
    this.timerID = setInterval(() => this.updateTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  deleteItem = (id) => {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData.filter((item) => item.id !== id)
      return { todoData: newTodoData }
    })
  }

  createTodoItem(label, min = 0, sec = 0) {
    const totalSecond = min * 60 + sec
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      created: new Date(),
      timerStarted: null,
      elapsedTime: totalSecond,
      isRunning: false,
    }
  }

  addItem = (text, min = 0, sec = 0) => {
    const newItem = this.createTodoItem(text, min, sec)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]

      return {
        todoData: newArr,
      }
    })
  }

  startTimer = (id) => {
    this.setState((prevState) => {
      const newTodoData = this.toggleProperty(prevState.todoData, id, 'isRunning', true)
      const updatedTodoData = this.toggleProperty(newTodoData, id, 'timerStarted', Date.now())
      return { todoData: updatedTodoData }
    })
  }

  stopTimer = (id) => {
    this.setState((prevState) => {
      const updatedTodoData = prevState.todoData.map((item) => {
        if (item.id === id) {
          return { ...item, isRunning: false, timerStarted: null }
        }
        return item
      })
      return { todoData: updatedTodoData }
    })
  }

  updateTimer = () => {
    this.setState((prevState) => {
      const updatedTodoData = prevState.todoData.map((item) => {
        if (item.isRunning && item.elapsedTime > 0) {
          const newElapsedTime = Math.max(item.elapsedTime - 1, 0)
          return { ...item, elapsedTime: newElapsedTime }
        }
        return item
      })
      return { todoData: updatedTodoData }
    })
  }

  toggleProperty(arr, id, propName, value) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: value !== undefined ? value : !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleImportant = (id) => {
    this.setState((prevState) => {
      const newTodoData = this.toggleProperty(prevState.todoData, id, 'important')
      return { todoData: newTodoData }
    })
  }

  onToggleDone = (id) => {
    this.setState((prevState) => {
      const newTodoData = this.toggleProperty(prevState.todoData, id, 'done')
      return { todoData: newTodoData }
    })
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  allFilter = () => {
    this.setState(() => {
      return { filter: 'all' }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => !el.done),
      }
    })
  }

  render() {
    const { todoData, filter } = this.state
    let filteredItems = [...todoData]

    if (filter === 'active') {
      filteredItems = todoData.filter((el) => !el.done)
    }
    if (filter === 'done') {
      filteredItems = todoData.filter((el) => el.done)
    }

    const doneCount = this.state.todoData.filter((el) => el.done).length
    const todoCount = this.state.todoData.length - doneCount

    return (
      <div className="main">
        <AppHeader />
        <SearchPanel addItem={this.addItem} />
        <TodoList
          todos={filteredItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          dateNow={this.now}
          onStartTimer={this.startTimer}
          onStopTimer={this.stopTimer}
        />
        <ItemStatusFilter
          todos={this.state.todoData}
          toDo={todoCount}
          done={doneCount}
          onAll={this.allFilter}
          onActive={() => this.setFilter('active')}
          onDone={() => this.setFilter('done')}
          filter={filter}
          onClear={this.clearCompleted}
        />
      </div>
    )
  }
}
