import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

export default class TodoListItem extends React.Component {
  formatTime = (timeInSeconds) => {
    const hours = Math.floor(Math.max(0, timeInSeconds) / 3600)
    const minutes = Math.floor((Math.max(0, timeInSeconds) % 3600) / 60)
    const seconds = Math.floor(Math.max(0, timeInSeconds) % 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  render() {
    const { label, id, important, done, created } = this.props

    let className = 'todo-list-label'
    if (done) {
      className += ' done'
    }

    if (important) {
      className += ' important'
    }

    const checkboxId = `todo-item-${id}`

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
          <div className="timerCont">
            {this.props.isRunning ? (
              <button
                type="button"
                className="btn btn-outline-warning btn-sm float-right"
                onClick={this.props.onStopTimer}
              >
                Stop
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-info btn-sm float-right"
                onClick={this.props.onStartTimer}
              >
                Start
              </button>
            )}
            <span className="timer">{this.formatTime(this.props.elapsedTime)}</span>
          </div>
        </div>
      </div>
    )
  }
}
