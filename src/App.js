import logo from './logo.svg';
import './App.css';
import Todo from './Component/Todo';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from './Component/TaskList';
import EditTodo from './Component/EditTodo';
import { Button } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);


  return (
    <BrowserRouter>


     {/* Theme Toggle Button  */}
      <div className={`app-container ${theme}`}>
        <Button variant={theme === "light" ? "dark" : "light"} onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </Button>

        <Routes>
          <Route path='/' element={<Todo tasks={tasks} setTasks={setTasks} theme={theme} />} />
          <Route path='/list' element={<TaskList tasks={tasks} theme={theme} />} />
          <Route path="/edit/:id" element={<EditTodo tasks={tasks} setTasks={setTasks} theme={theme} />} />

        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
