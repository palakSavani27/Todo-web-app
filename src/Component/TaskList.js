import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Todo from './Todo';
import { Badge, Card, Button } from 'react-bootstrap';


function TaskList({ tasks ,theme}) {
    const navigate = useNavigate();

    //task status color
    const getbadges = (status) => {
        switch (status) {
            case "Pending":
                return "danger";
            case "In Progress":
                return "warning";
            case "Completed":
                return "success";
            default:
                return "secondary";
        }
    }

    return (
        <div className={`container ${theme}`}>
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p className="text-center">No tasks added yet.</p>
            ) : (
                <div className="row">
                    {tasks.map((task, index) => (
                        <div key={index} >
                            <Card className={`mb-3 p-3 shadow ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
                
                                    <Card.Title >
                                        {task.name}
                                        <Badge bg={getbadges(task.status)}>{task.status}</Badge>
                                    </Card.Title>

                                    <Card.Text>
                                        <strong>Priority:</strong> {task.priority} <br />
                                        <strong>Due Date:</strong> {task.dueDate || "N/A"} <br />
                                        <strong>Description:</strong> {task.description || "N/A"}
                                    </Card.Text>

                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => navigate(`/edit/${index}`)}
                                    >
                                        Edit
                                    </Button>
                               
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            <Link to="/">Add More Tasks</Link>
        </div>
    );
}
export default TaskList;
