import { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 0;

  state = {
    todoData: [
      this.createTodoTask('Completed task', new Date(2024, 4, 17)),
      this.createTodoTask('Editing task', new Date(2024, 6, 4)),
      this.createTodoTask('Active task', new Date(2024, 6, 17, 12, 10, 0)),
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
      },
    ],
    filterData: 'all',
  };

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    filterData: PropTypes.string,
  };

  createTodoTask(label, time) {
    const trimLabel = label.replace(/ +/g, ' ').trim();

    return {
      id: this.maxId++,
      label: trimLabel,
      completed: false,
      editing: false,
      time,
    };
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addTask = (text) => {
    const newTask = this.createTodoTask(text, new Date());

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newTask];
      return {
        todoData: newArray,
      };
    });
  };

  checkboxClick = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
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
            onDeleted={this.deleteTask}
            onCheckboxClick={this.checkboxClick}
            filterData={filterData}
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
