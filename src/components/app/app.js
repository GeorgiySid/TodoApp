import React from 'react';

import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffe'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    originalTodoData: [],
    filter: 'all',
  };

  componentDidMount() {
    this.setState({ originalTodoData: [...this.state.todoData] });
  }

  deleteItem = (id) => {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData.filter((item) => item.id !== id);
      return { todoData: newTodoData };
    });
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      created: new Date(),
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState((prevState) => {
      const newTodoData = this.toggleProperty(prevState.todoData, id, 'important');
      return { todoData: newTodoData };
    });
  };

  onToggleDone = (id) => {
    this.setState((prevState) => {
      const newTodoData = this.toggleProperty(prevState.todoData, id, 'done');
      return { todoData: newTodoData };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  allFilter = () => {
    this.setState(() => {
      return { filter: 'all' };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => !el.done),
      };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    let filteredItems = [...todoData];

    if (filter === 'active') {
      filteredItems = todoData.filter((el) => !el.done);
    }
    if (filter === 'done') {
      filteredItems = todoData.filter((el) => el.done);
    }

    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

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
    );
  }
}
