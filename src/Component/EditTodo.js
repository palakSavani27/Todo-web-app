import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function EditTodo({ tasks, setTasks, theme }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const taskIndex = parseInt(id);

    // Load the task details for editing
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate] = useState("");

    const today = new Date();
    const selectedDate = new Date(dueDate);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (tasks[taskIndex]) {
            const task = tasks[taskIndex];
            setName(task.name);
            setDescription(task.description);
            setPriority(task.priority);
            setStatus(task.status);
            setDueDate(task.dueDate);
        }
    }, [taskIndex, tasks]);

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


        const updatedTask = { name, description, priority, status, dueDate };
        const updatedTasks = [...tasks];

        updatedTasks[taskIndex] = updatedTask;
        setTasks(updatedTasks);

        navigate("/list");
    };

    return (
        <div className={`container mt-4 ${theme}`}>
            <h2>Edit Task</h2>
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

                <Button type="submit" className="btn btn-primary">Update Task</Button>
            </Form>
        </div>
    );
}

export default EditTodo;