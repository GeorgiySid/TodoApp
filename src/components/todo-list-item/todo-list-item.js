import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './todo-list-item.css';

export default class TodoListItem extends React.Component {
  render() {
    const { label, id, important, done, created } = this.props;

    let className = 'todo-list-label';
    if (done) {
      className += ' done';
    }

    if (important) {
      className += ' important';
    }

    const checkboxId = `todo-item-${id}`;

    return (
      <div className="todo-list-item">
        <input className="toggle" type="checkbox" id={checkboxId} checked={done} onChange={this.props.onToggleDone} />

        <label htmlFor={checkboxId}>
          <span className={className}>{label}</span>
        </label>
        <span className="date-time">created {formatDistanceToNow(created, { addSuffix: true })}</span>
        <div className="btn-todo-list-cont">
          <button type="button" className="btn btn-outline-success" onClick={this.props.onToggleImportant}>
            <i className="fa fa-exclamation" />
          </button>

          <button type="button" className="btn btn-outline-danger" onClick={this.props.onDeleted}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}
