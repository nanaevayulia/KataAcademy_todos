import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

const App = () => {
  const todoData = [
    { label: "Completed task", status: "completed", id: 1 },
    { label: "Editing task", status: "editing", id: 2 },
    { label: "Active task", id: 3 },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};

export default App;
