import { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 0;
  timerId = [];

  state = {
    todoData: [
      this.createTodoTask('Completed task', new Date(2024, 4, 17), 90),
      this.createTodoTask('Editing task', new Date(2024, 6, 4), 140),
      this.createTodoTask('Active task', new Date(2024, 6, 17, 12, 10, 0), 15),
    ],
    filterData: 'all',
  };

  static defaultProps = {
    todoData: [
      {
        id: 1,
        label: 'Получить данные с сервера',
        completed: false,
        editing: false,
        time: Date.now(),
        timerInSec: 0,
        timerStarted: false,
        disabled: false,
      },
    ],
    filterData: 'all',
  };

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.string,
  };

  createTodoTask(label, time, timerInSec) {
    const trimLabel = label.replace(/ +/g, ' ').trim();

    return {
      id: this.maxId++,
      label: trimLabel,
      completed: false,
      editing: false,
      time,
      timerInSec,
      timerStarted: false,
      disabled: false,
    };
  }

  deleteTask = (id) => {
    this.onPauseTimer(id);

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addTask = (text, timerInSec) => {
    const newTask = this.createTodoTask(text, new Date(), timerInSec);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newTask];
      return {
        todoData: newArray,
      };
    });
  };

  checkboxClick = (id) => {
    this.onPauseTimer(id);

    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) {
          item = {
            ...item,
            completed: !item.completed,
          };
        }
        if (item.id === id && item.completed) {
          item = {
            ...item,
            disabled: true,
          };
        } else if (item.id === id && !item.completed) {
          item = {
            ...item,
            disabled: false,
          };
        }
        return item;
      });
      return {
        todoData: newArray,
      };
    });
  };

  setFilterData = (e) => {
    this.setState({ filterData: e.target.innerText.toLowerCase() });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed);
      return {
        todoData: newArray,
      };
    });
  };

  tick(id) {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newItem = {
        ...todoData[index],
        timerStarted: true,
        timerInSec: todoData[index].timerInSec - 1,
      };
      const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return {
        todoData: newArr,
      };
    });
  }

  onPlayTimer = (id) => {
    const { todoData } = this.state;
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];

    if (oldItem.timerStarted) {
      clearInterval(this.timerId[index]);
    }

    const newTimerId = setInterval(() => this.tick(id), 1000);
    this.timerId[index] = newTimerId;

    this.setState(({ todoData }) => {
      const newItem = { ...oldItem, disabled: true };
      const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  onPauseTimer = (id) => {
    const { todoData } = this.state;
    const index = todoData.findIndex((el) => el.id === id);
    const oldItemTodoData = todoData[index];

    if (oldItemTodoData.timerStarted) {
      clearInterval(this.timerId[index]);

      this.setState(({ todoData }) => {
        const oldItem = todoData[index];
        const newItem = { ...oldItem, timerStarted: false, disabled: false };
        const newArr = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

        return {
          todoData: newArr,
        };
      });
      this.setState({ disabled: false });
    }
  };

  render() {
    const { todoData, filterData } = this.state;
    const notCompletedTasks = todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            filterData={filterData}
            onDeleted={this.deleteTask}
            onCheckboxClick={this.checkboxClick}
            onPlayTimer={this.onPlayTimer}
            onPauseTimer={this.onPauseTimer}
          />
          <Footer
            notCompletedTasks={notCompletedTasks}
            setFilterData={this.setFilterData}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
