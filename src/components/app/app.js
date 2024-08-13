import { useState } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

let maxId = 0;
let timerId = [];
export default function App() {
  function createTodoTask(label, time, timerInSec) {
    const trimLabel = label.replace(/ +/g, ' ').trim();

    return {
      id: maxId++,
      label: trimLabel,
      completed: false,
      editing: false,
      time,
      timerInSec,
      timerStarted: false,
      disabled: false,
    };
  }

  const [todoData, setTodoData] = useState([
    createTodoTask('Completed task', new Date(2024, 4, 17), 90),
    createTodoTask('Editing task', new Date(2024, 6, 4), 140),
    createTodoTask('Active task', new Date(2024, 6, 17, 12, 10, 0), 15),
  ]);
  const [filterData, setFilter] = useState('all');

  const deleteTask = (id) => {
    onPauseTimer(id);

    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((item) => item.id === id);
      const newArray = [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];
      return newArray;
    });
  };

  const addTask = (text, timerInSec) => {
    const newTask = createTodoTask(text, new Date(), timerInSec);

    setTodoData((prevTodoData) => {
      const newArray = [...prevTodoData, newTask];
      return newArray;
    });
  };

  const checkboxClick = (id) => {
    onPauseTimer(id);

    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.map((item) => {
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
      return newArray;
    });
  };

  const setFilterData = (e) => {
    setFilter(e.target.innerText.toLowerCase());
  };

  const clearCompleted = () => {
    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.filter((el) => !el.completed);
      return newArray;
    });
  };

  function tick(id) {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id);
      const newItem = {
        ...prevTodoData[index],
        timerStarted: true,
        timerInSec: prevTodoData[index].timerInSec - 1,
      };
      const newArray = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];

      return newArray;
    });
  }

  const onPlayTimer = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];

    if (oldItem.timerStarted) {
      clearInterval(timerId[index]);
    }

    const newTimerId = setInterval(() => tick(id), 1000);
    timerId[index] = newTimerId;

    setTodoData((prevTodoData) => {
      const newItem = { ...oldItem, disabled: true };
      const newArray = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];
      return newArray;
    });
  };

  const onPauseTimer = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const oldItemTodoData = todoData[index];

    if (oldItemTodoData.timerStarted) {
      clearInterval(timerId[index]);

      setTodoData((prevTodoData) => {
        const oldItem = prevTodoData[index];
        const newItem = { ...oldItem, timerStarted: false, disabled: false };
        const newArray = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];
        return newArray;
      });
    }
  };

  const notCompletedTasks = todoData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          filterData={filterData}
          onDeleted={deleteTask}
          onCheckboxClick={checkboxClick}
          onPlayTimer={onPlayTimer}
          onPauseTimer={onPauseTimer}
        />
        <Footer notCompletedTasks={notCompletedTasks} setFilterData={setFilterData} onClearCompleted={clearCompleted} />
      </section>
    </section>
  );
}

App.defaultProps = {
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

App.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  filterData: PropTypes.string,
};
