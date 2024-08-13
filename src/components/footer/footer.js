import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

export default function Footer({ notCompletedTasks, setFilterData, onClearCompleted }) {
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

Footer.defaultProps = {
  notCompletedTasks: 0,
  onClearCompleted: () => {},
  setFilterData: () => {},
};

Footer.propTypes = {
  notCompletedTasks: PropTypes.number,
  onClearCompleted: PropTypes.func,
  setFilterData: PropTypes.func,
};
