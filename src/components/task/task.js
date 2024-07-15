import { Component } from "react";
import "./task.css";

export default class Task extends Component {
  render() {
    const { label, checked, onDeleted, onCheckboxClick } = this.props;

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          readOnly
          onClick={onCheckboxClick}
          checked={checked}
        />
        <label>
          <span className="description" onClick={onCheckboxClick}>
            {label}
          </span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
