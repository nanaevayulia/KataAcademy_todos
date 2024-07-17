import "./new-task-form.css";
import { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  state = {
    label: "",
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

  onSubmit = (e) => {
    const { label } = this.state;

    e.preventDefault();
    if (!label || label.replace(/ +/g, " ") === " ") {
      this.setState({ label: "" });
      return;
    }

    this.props.onTaskAdded(label);
    this.setState({ label: "" });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}
