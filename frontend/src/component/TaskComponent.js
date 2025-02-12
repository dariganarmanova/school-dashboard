import { useEffect, useState } from 'react';
import './ComponentStyle.css';
import axios from 'axios';

function TaskComponent() {
    const [taskName, setTaskName] = useState("");
    const [completed, setCompleted] = useState(false);
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [displayTask, setDisplayTask] = useState([])
    const [sortOrder, setSortOrder] = useState("default");
    const [force, setForce] = useState(0)
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
                    setDisplayTask(Array.isArray(response.data) ? response.data : [response.data])
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetchTask();
    }, [force]);

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
            setDisplayTask([...data, result.data])
            setData([...data, result.data]);
            setTaskName("");
            setCompleted(false);
            setDate("");
            setForce(prev => prev + 1)
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

    const handleFilter = () => {
        let sortedData = [...data]
        if (sortOrder === "default") {
            sortedData.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
            setSortOrder("asc")
        }
        else if (sortOrder === "asc") {
            sortedData.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
            //console.log(a.deadline)
            setSortOrder("desc")
        }
        else {
            sortedData.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
            setSortOrder("default")
        }
        setDisplayTask(sortedData)
    }

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
            setData((prevData) => prevData.map((task) => task._id === editingTask ? result.data : task))
            setDisplayTask((prevTasks) => prevTasks.map((task) => task._id === editingTask ? result.data : task))
            setEditingTask(null);
            setTaskName("");
            setCompleted(false);
            setDate("");
            setForce(prev => prev + 1)
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (id) => {
        //e.preventDefault();
        const token = localStorage.getItem("token")
        try {
            await axios.delete(`http://localhost:8080/api/taskDelete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            console.log("i am here")
            setDisplayTask((prevData) => {
                const newData = prevData.filter(task => task._id !== id)
                console.log("i am here upd delete data")
                return newData;
            })
            setData((prevTasks) => prevTasks.filter(task => task._id !== id))
            setForce(prev => prev + 1)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="task-container">
            <form className='task-form' onSubmit={editingTask ? handleUpdate : handleSubmit}>
                <input placeholder="To Do" type="text" value={taskName} onChange={handleName} required />
                <label>Is your task completed?</label>
                <select value={completed.toString()} onChange={handleCompleted} required>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
                <input type="date" onChange={handleDate} value={date} required />
                <button className="button-Submit" type="submit">{editingTask ? "Update Task" : "Create Task"}</button>
            </form>
            <button className="filter" onClick={handleFilter}>{
                sortOrder === "default" ? "Sort Ascending" : sortOrder === "asc" ? "Sort descending" : "Reset sorting"
            }</button>
            {displayTask.length > 0 ? (
                displayTask.map((task) => (
                    <div key={task._id || task.id} className='data-task'>
                        <p>To-do: {task.taskName}</p>
                        <p>Deadline: {task.deadline}</p>
                        {task.completed === 'Completed' ? (
                            <p className='completed'>Task is completed</p>
                        ) : (
                            <p className='not-completed'>Task is not completed</p>
                        )}
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )
            }
        </div >
    );
}

export default TaskComponent;