import { Component } from 'react';
import PropTypes from 'prop-types';
import './timer.css';
export default class Timer extends Component {
  static defaulProps = {
    timerInSec: 0,
    disabled: false,
    onPlayTimer: () => {},
    onPauseTimer: () => {},
  };

  static propTypes = {
    timerInSec: PropTypes.node,
    disabled: PropTypes.bool,
    onPlayTimer: PropTypes.func,
    onPauseTimer: PropTypes.func,
  };

  render() {
    const { timerInSec, disabled, onPlayTimer, onPauseTimer } = this.props;

    const mins = Math.floor(timerInSec / 60);
    const secs = String(timerInSec - mins * 60).padStart(2, '0');
    const timer = timerInSec > 0 ? `${mins}:${secs} ` : 'Time is up!';

    return (
      <span className="description timer">
        <div>
          <button className="icon icon-play" onClick={onPlayTimer} disabled={disabled}></button>
          <button className="icon icon-pause" onClick={onPauseTimer}></button>
        </div>
        <div className="timer-time">{timer}</div>
      </span>
    );
  }
}
