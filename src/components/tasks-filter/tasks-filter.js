import "./tasks-filter.css";
import { Component } from "react";
import PropTypes from "prop-types";

export default class TasksFilter extends Component {
  state = {
    allButton: true,
    activeButton: false,
    completedButton: false,
  };

  static defaultProps = {
    setFilterData: () => {},
  };

  static propTypes = {
    setFilterData: PropTypes.func,
  };

  onClickFilter = (e) => {
    const buttonClicked = e.target.innerText.toLowerCase();
    if (buttonClicked === "all") {
      this.setState({
        allButton: true,
        activeButton: false,
        completedButton: false,
      });
    } else if (buttonClicked === "active") {
      this.setState({
        allButton: false,
        activeButton: true,
        completedButton: false,
      });
    } else if (buttonClicked === "completed") {
      this.setState({
        allButton: false,
        activeButton: false,
        completedButton: true,
      });
    }
  };

  render() {
    const { setFilterData } = this.props;
    const { allButton, activeButton, completedButton } = this.state;
    return (
      <ul className="filters">
        <li>
          <button
            className={allButton ? "selected" : ""}
            onClick={(e) => {
              setFilterData(e);
              this.onClickFilter(e);
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeButton ? "selected" : ""}
            onClick={(e) => {
              setFilterData(e);
              this.onClickFilter(e);
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={completedButton ? "selected" : ""}
            onClick={(e) => {
              setFilterData(e);
              this.onClickFilter(e);
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
