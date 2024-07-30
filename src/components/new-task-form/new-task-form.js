import { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';
export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  static defaultProps = {
    onTaskAdded: () => {},
  };

  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onMinutesChange = (e) => {
    this.setState({ minutes: e.target.value });
  };

  onSecondsChange = (e) => {
    this.setState({ seconds: e.target.value });
  };

  onSubmit = (e) => {
    const { label, minutes, seconds } = this.state;
    const timeInSec = Number(minutes) * 60 + Number(seconds);

    e.preventDefault();
    if (!label || label.replace(/ +/g, ' ') === ' ') {
      this.setState({ label: '', minutes: '', seconds: '' });
      return;
    }
    if (!minutes && !seconds) {
      return;
    }

    this.props.onTaskAdded(label, timeInSec);
    this.setState({ label: '', minutes: '', seconds: '' });
  };

  render() {
    const { label, minutes, seconds } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={label}
          onChange={this.onLabelChange}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          value={minutes}
          onChange={this.onMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          value={seconds}
          onChange={this.onSecondsChange}
        />
        <button type="submit"></button>
      </form>
    );
  }
}
