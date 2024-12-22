import React from 'react'
import PropTypes from 'prop-types'
import './item-status-filter.css'

export default class ItemStatusFilter extends React.Component {
  render() {
    const { toDo, done, filter } = this.props

    return (
      <div className="footer">
        <span className="todo-count">
          {toDo} more to do, {done} completed
        </span>
        <div className="btn-group">
          <ul className="filters">
            <li>
              <button type="button" className={`btn ${filter === 'all' ? 'selected' : ''}`} onClick={this.props.onAll}>
                All
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn ${filter === 'active' ? 'selected' : ''}`}
                onClick={this.props.onActive}
              >
                Active
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`btn ${filter === 'done' ? 'selected' : ''}`}
                onClick={this.props.onDone}
              >
                Completed
              </button>
            </li>
            <li>
              <button type="button" className="btn clear-completed" onClick={this.props.onClear}>
                Clear completed
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
ItemStatusFilter.defaultProps = {
  toDo: 0,
  done: 0,
  filter: 'all',
  onAll: () => {},
  onActive: () => {},
  onDone: () => {},
  onClear: () => {},
}

ItemStatusFilter.propTypes = {
  toDo: PropTypes.number,
  done: PropTypes.number,
  filter: PropTypes.oneOf(['all', 'active', 'done']),
  onAll: PropTypes.func,
  onActive: PropTypes.func,
  onDone: PropTypes.func,
  onClear: PropTypes.func,
}
