import Task from "../task";
import "./task-list.css";

const TaskList = ({ todos }) => {
  const tasks = todos.map((item) => {
    const { id, status, ...itemProps } = item;

    return (
      <li key={id} className={status}>
        <Task {...itemProps} />
      </li>
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

export default TaskList;
