import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

export default class TaskList extends Component {
  static defaultProps = {
    todos: [
      {
        id: 1,
        label: 'Получить данные с сервера',
        completed: false,
        editing: false,
        time: new Date(),
        timerInSec: 0,
        timerStarted: false,
        disabled: false,
      },
    ],
    filterData: 'all',
    onDeleted: () => {},
    onCheckboxClick: () => {},
    onPlayTimer: () => {},
    onPauseTimer: () => {},
  };

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.oneOf(['all', 'active', 'completed']),
    onDeleted: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    onPlayTimer: PropTypes.func,
    onPauseTimer: PropTypes.func,
  };

  render() {
    let { todos, filterData, onDeleted, onCheckboxClick, onPlayTimer, onPauseTimer } = this.props;
    let tasks;

    const taskTemplate = () => {
      tasks = todos.map((el) => {
        const { id, ...itemProps } = el;
        return (
          <Task
            key={id}
            {...itemProps}
            onCheckboxClick={() => onCheckboxClick(id)}
            onDeleted={() => onDeleted(id)}
            onPlayTimer={() => onPlayTimer(id)}
            onPauseTimer={() => onPauseTimer(id)}
          />
        );
      });
    };

    if (filterData === 'all') {
      taskTemplate();
    } else if (filterData === 'active') {
      todos = todos.filter((el) => !el.completed);
      taskTemplate();
    } else if (filterData === 'completed') {
      todos = todos.filter((el) => el.completed);
      taskTemplate();
    }

    return <ul className="todo-list">{tasks}</ul>;
  }
}
