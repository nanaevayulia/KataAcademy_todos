import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer';

import './task.css';
export default class Task extends Component {
  static defaulProps = {
    label: '',
    completed: false,
    editing: false,
    time: new Date(),
    timerInSec: 0,
    timerStarted: false,
    onDeleted: () => {},
    onCheckboxClick: () => {},
    onGetTimeFromTimer: () => {},
    onGetTimerStartedFromTimer: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    time: PropTypes.instanceOf(Date),
    timerInSec: PropTypes.node,
    timerStarted: PropTypes.bool,
    onDeleted: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    onGetTimeFromTimer: PropTypes.func,
    onGetTimerStartedFromTimer: PropTypes.func,
  };

  render() {
    const {
      id,
      label,
      completed,
      editing,
      time,
      timerInSec,
      timerStarted,
      onCheckboxClick,
      onDeleted,
      onGetTimeFromTimer,
      onGetTimerStartedFromTimer,
    } = this.props;

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
            <span className="title" onClick={onCheckboxClick}>
              {label}
            </span>
            <Timer
              id={id}
              timerInSec={timerInSec}
              timerStarted={timerStarted}
              onGetTimeFromTimer={onGetTimeFromTimer}
              onGetTimerStartedFromTimer={onGetTimerStartedFromTimer}
            />
            <span className="description">created {formatDistanceToNow(time)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
