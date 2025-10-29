import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    })
    .then(data => setTasks(data))
    .catch(error => {
      console.error(error);
      setSuccessMessage('Error: Could not load tasks. Is the backend running?');
      setTimeout(() => setSuccessMessage(''), 5000);
    });
   }, []);

  const handleAddTask = () => {
  if (newTask.trim() === '') return;

  fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTask }),
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to create task');
      return response.json();
    })
    .then(() => {
      setTasks([{ id: Date.now(), title: newTask }, ...tasks]);
      setSuccessMessage(`Task '${newTask}' has been created successfully`);
      setNewTask('');
      setTimeout(() => setSuccessMessage(''), 3000);
    })
    .catch(error => {
      console.error(error);
      setSuccessMessage('Error: Could not create task. Check backend connection.');
  //    setTimeout(() => setSuccessMessage(''), 5000);
    });
  };

  const handleRemoveTask = (taskId) => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to delete task');
      return response.json();
    })
    .then(() => {
      setSuccessMessage('Task removed successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch tasks after deletion');
      return response.json();
    })
    .then(data => setTasks(data))
    .catch(error => {
      console.error(error);
      setSuccessMessage('Error: Could not remove task or refresh list.');
//      setTimeout(() => setSuccessMessage(''), 5000);
    });
  };

  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Task Management App</h1>
      <p>
        <strong>Congratulations!</strong> You have successfully deployed the frontend service of the app. Now, check if the
        backend is connected by creating a task and listing the tasks.
      </p>
      <p>
        <u>Follow these steps:</u>
      </p>

      <ol>
        <li>Create a new task by entering the task in the input box below.</li>
        <li>Click the "Add Task" button or press "Enter" to submit the task.</li>
        <li>To remove a task, click the "Remove" button next to the task.</li>
      </ol>

      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}

      <div className="input-group mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="New Task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="mt-4 border p-3">
        <h5><u>List of Tasks</u></h5>
        <ul className="list-group mt-3">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              {task.title}
              <button className="btn btn-danger" onClick={() => handleRemoveTask(task.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


