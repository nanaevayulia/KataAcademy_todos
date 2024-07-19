import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
export default class Task extends Component {
  static defaulProps = {
    label: '',
    completed: false,
    editing: false,
    time: new Date(),
    onDeleted: () => {},
    onCheckboxClick: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    time: PropTypes.instanceOf(Date),
    onDeleted: PropTypes.func,
    onCheckboxClick: PropTypes.func,
  };

  render() {
    const { label, completed, editing, time, onCheckboxClick, onDeleted } = this.props;
    let className = 'active';

    if (completed) {
      className = 'completed';
    }
    if (editing) {
      className = 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" readOnly onClick={onCheckboxClick} checked={completed} />
          <label>
            <span className="description" onClick={onCheckboxClick}>
              {label}
            </span>
            <span className="created">created {formatDistanceToNow(time)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
