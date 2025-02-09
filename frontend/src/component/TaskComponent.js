import { useEffect, useState } from 'react';
import './ComponentStyle.css';
import axios from 'axios';

function TaskComponent() {
    const [taskName, setTaskName] = useState("");
    const [completed, setCompleted] = useState(false);
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8080/api/taskGet", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    setData(Array.isArray(response.data) ? response.data : [response.data]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTask();
    }, [data]);

    const handleName = (event) => {
        setTaskName(event.target.value);
    };

    const handleCompleted = (event) => {
        setCompleted(event.target.value === "true");
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const newTask = {
                taskName,
                completed,
                deadline: date,
            };
            const result = await axios.post("http://localhost:8080/api/taskCreate", newTask, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setData([...data, result.data]);
            setTaskName("");
            setCompleted(false);
            setDate("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task._id || task.id);
        setTaskName(task.taskName || "");
        setDate(task.deadline || "");
        setCompleted(task.completed || false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const updatedData = {
                taskName,
                deadline: date,
                completed,
                _id: editingTask,
            };
            const result = await axios.put(`http://localhost:8080/api/taskUpdate/${editingTask}`, updatedData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setData((prevData) => prevData.map((task) => task._id === editingTask ? result.data : task));
            setEditingTask(null);
            setTaskName("");
            setCompleted(false);
            setDate("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="task-container">
            <form onSubmit={editingTask ? handleUpdate : handleSubmit}>
                <input placeholder="Task Name" type="text" value={taskName} onChange={handleName} required />
                <label>Is your task completed?</label>
                <select value={completed.toString()} onChange={handleCompleted} required>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
                <input type="date" onChange={handleDate} value={date} required />
                <button type="submit">{editingTask ? "Update Task" : "Create Task"}</button>
            </form>

            {data.length > 0 ? (
                data.map((task) => (
                    <div key={task._id || task.id} className="data-task">
                        <p>{task.taskName}</p>
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
}

export default TaskComponent;
