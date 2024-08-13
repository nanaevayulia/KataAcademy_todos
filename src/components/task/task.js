import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer';

import './task.css';
export default function Task(props) {
  const {
    label,
    completed,
    editing,
    time,
    timerInSec,
    disabled,
    onCheckboxClick,
    onDeleted,
    onPlayTimer,
    onPauseTimer,
  } = props;

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
          <Timer timerInSec={timerInSec} disabled={disabled} onPlayTimer={onPlayTimer} onPauseTimer={onPauseTimer} />
          <span className="description">created {formatDistanceToNow(time)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    </li>
  );
}

Task.defaultProps = {
  label: '',
  completed: false,
  editing: false,
  time: new Date(),
  timerInSec: 0,
  timerStarted: false,
  disabled: false,
  onDeleted: () => {},
  onCheckboxClick: () => {},
  onPlayTimer: () => {},
  onPauseTimer: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  time: PropTypes.instanceOf(Date),
  timerInSec: PropTypes.node,
  timerStarted: PropTypes.bool,
  onDeleted: PropTypes.func,
  onCheckboxClick: PropTypes.func,
  onPlayTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
};
