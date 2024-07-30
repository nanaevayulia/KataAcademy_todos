import { Component } from 'react';
import './timer.css';

let timeWhenMount = null;
let timeWhenUnmount = null;

export default class Timer extends Component {
  componentDidMount() {
    if (this.props.timerStarted) {
      this.onPlayTimer();
      timeWhenMount = Date.now();
    }
  }

  componentDidUpdate() {
    if (this.props.timerInSec < 0) {
      clearInterval(this.timerID);
    }
  }

  componentWillUnmount() {
    if (this.props.timerStarted) {
      clearInterval(this.timerID);
      timeWhenUnmount = Date.now();
    }
  }

  onPauseTimer = () => {
    this.props.onGetTimerStartedFromTimer(false);
    clearInterval(this.timerID);
  };

  onPlayTimer = () => {
    if (this.props.timerStarted) {
      clearInterval(this.timerID);
    }
    this.timerID = setInterval(() => this.tick(), 1000);
    this.props.onGetTimerStartedFromTimer(true);
  };

  tick() {
    let delay = 0;

    if (timeWhenUnmount && timeWhenMount) {
      delay = parseInt((timeWhenMount - timeWhenUnmount) / 1000, 10);
      timeWhenMount = null;
      timeWhenUnmount = null;
    }

    const time = this.props.timerInSec - 1 - delay;
    this.props.onGetTimeFromTimer(time);
  }

  render() {
    const { timerInSec, timerStarted } = this.props;
    const mins = Math.floor(timerInSec / 60);
    const secs = String(timerInSec - mins * 60).padStart(2, '0');
    const timer = timerInSec >= 0 ? `${mins}:${secs}` : 'Time is up!';

    return (
      <span className="description timer">
        <div>
          <button className="icon icon-play" onClick={this.onPlayTimer}></button>
          <button className="icon icon-pause" onClick={this.onPauseTimer}></button>
        </div>
        <div className="timer-time">
          {timer}
          {timerStarted}
        </div>
      </span>
    );
  }
}
