import { Component } from "react";
import Task from "../task";
import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onCheckboxClick, filterData } = this.props;
    const tasks = todos.map((item) => {
      const { id, label, completed, editing } = item;
      let className = "active";
      let checked = false;
      if (completed) {
        className = "completed";
        checked = true;
      }
      if (editing) {
        className = "editing";
      }
      if (filterData === "all") {
        return (
          <li key={id} className={className}>
            <Task
              label={label}
              checked={checked}
              onDeleted={() => onDeleted(id)}
              onCheckboxClick={() => onCheckboxClick(id)}
            />
          </li>
        );
      }
      if (className === filterData || className === "editing") {
        return (
          <li key={id} className={className}>
            <Task
              label={label}
              className={className}
              checked={checked}
              onDeleted={() => onDeleted(id)}
              onCheckboxClick={() => onCheckboxClick(id)}
            />
          </li>
        );
      }
      return null;
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}
