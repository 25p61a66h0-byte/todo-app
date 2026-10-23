import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');

  // Load saved tasks from Local Storage when the app starts
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('todo-tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  // Save tasks whenever the task list changes
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (task.trim() === '') return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false
      }
    ]);

    setTask('');
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id));
  }

  return (
    <div className="app">
      <div className="todo-card">
        <h1>My To-Do List 📝</h1>
        <p>Plan your day, one task at a time.</p>

        <div className="input-area">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <ul>
          {tasks.map(item => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />

                <span className={item.completed ? 'completed' : ''}>
                  {item.text}
                </span>
              </label>

              <button
                className="delete-btn"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="empty-message">
            No tasks yet. Add your first task!
          </p>
        )}

        <p className="task-count">
          Completed: {tasks.filter(item => item.completed).length} / {tasks.length}
        </p>
      </div>
    </div>
  );
}

export default App;