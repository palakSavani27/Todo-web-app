import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import TaskList from "./TaskList";


function Todo({ tasks, setTasks, theme }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("Pending");
    const [dueDate, setDueDate] = useState("");

    const today = new Date();
    const selectedDate = new Date(dueDate);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let Errors = {};
        if (!name) {
            Errors.name = "Task name is required!";
        }
        if (!priority) {
            Errors.priority = "Please select a priority!";
        }
        if (selectedDate <= today) {
            Errors.dueDate = "Due date must be in the future!";
        }

        if (Object.keys(Errors).length > 0) {
            setErrors(Errors);
            return;
        }

        // alert(`Name: ${name} \n Des: ${description} \n option:${priority} \n status:${status} \n duedate:${dueDate}`)
        const newTask = { name, description, priority, status, dueDate };
        // setTasks([...tasks, newTask]);
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);

        // Clear field
        setName("");
        setDescription("");
        setPriority("");
        setStatus("Pending");
        setDueDate("");
        setErrors({});

        navigate("/list");
    }

    return (
        <div className={`container mt-4 ${theme}`}>
            <h2>TODO List</h2>
            <Form
                onSubmit={handleSubmit}
                className={`p-4 rounded shadow ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
               
                <Form.Control
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                />
                {errors.name && <span className="error text-danger">{errors.name} <br /></span>}
                <br />

                <Form.Control as="textarea" rows={3}
                    type="text"
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><br />

                <Form.Control as="select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                    <option>Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </Form.Control>
                {errors.priority && <span className="error text-danger">{errors.priority} <br /></span>}

                <br />


                <Form.Control as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </Form.Control><br />

                <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                {errors.dueDate && <span className="error text-danger">{errors.dueDate} <br /></span>}
                <br />

                <Button className="btn btn-primary"
                    type="submit">Add Task</Button>
            </Form>
        </div>
    )
}

export default Todo;