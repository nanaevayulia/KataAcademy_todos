import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends Component {
  static defaultProps = {
    notCompletedTasks: 0,
    onClearCompleted: () => {},
    setFilterData: () => {},
  };

  static propTypes = {
    notCompletedTasks: PropTypes.number,
    onClearCompleted: PropTypes.func,
    setFilterData: PropTypes.func,
  };

  render() {
    const { notCompletedTasks, setFilterData, onClearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{notCompletedTasks} items left</span>
        <TasksFilter setFilterData={setFilterData} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

let arrow;
