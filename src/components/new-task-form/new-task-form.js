import { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';
export default function NewTaskForm({ onTaskAdded }) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (e) => {
    const timeInSec = Number(minutes) * 60 + Number(seconds);

    e.preventDefault();
    if (!label || label.replace(/ +/g, ' ') === ' ') {
      setLabel('');
      setMinutes('');
      setSeconds('');
      return;
    }
    if (!minutes && !seconds) {
      return;
    }

    onTaskAdded(label, timeInSec);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={label}
        onChange={onLabelChange}
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        value={seconds}
        onChange={onSecondsChange}
        required
      />
      <button type="submit"></button>
    </form>
  );
}

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};
