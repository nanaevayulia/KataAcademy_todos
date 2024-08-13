import { useState } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';
export default function TasksFilter({ setFilterData }) {
  const [allButton, setAllButton] = useState(true);
  const [activeButton, setActiveButton] = useState(false);
  const [completedButton, setCompletedButton] = useState(false);

  const onClickFilter = (e) => {
    const buttonClicked = e.target.innerText.toLowerCase();
    if (buttonClicked === 'all') {
      setAllButton(true), setActiveButton(false), setCompletedButton(false);
    } else if (buttonClicked === 'active') {
      setAllButton(false), setActiveButton(true), setCompletedButton(false);
    } else if (buttonClicked === 'completed') {
      setAllButton(false), setActiveButton(false), setCompletedButton(true);
    }
  };

  return (
    <ul className="filters">
      <li>
        <button
          className={allButton ? 'selected' : ''}
          onClick={(e) => {
            setFilterData(e);
            onClickFilter(e);
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={activeButton ? 'selected' : ''}
          onClick={(e) => {
            setFilterData(e);
            onClickFilter(e);
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={completedButton ? 'selected' : ''}
          onClick={(e) => {
            setFilterData(e);
            onClickFilter(e);
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  setFilterData: () => {},
};

TasksFilter.propTypes = {
  setFilterData: PropTypes.func,
};
