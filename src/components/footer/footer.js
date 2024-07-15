import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = ({ notCompletedTasks, onClearCompleted, setFilterData }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{notCompletedTasks} items left</span>
      <TasksFilter setFilterData={setFilterData} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
