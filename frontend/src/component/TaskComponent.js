import { useEffect, useState } from 'react';
import './ComponentStyle.css'
import axios from 'axios';
function TaskComponent() {
    const [taskName, setTaskName] = useState("");
    const [completed, setCompleted] = useState(false);
    const [date, setDate] = useState("");
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem("token")
            try {
                const task = await axios.get("http://localhost:8080/api/taskGet", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                })
                if (task.status === 200) {
                    setData(Array.isArray(task.data) ? task.data : [task.data]);
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchTask();
    }, [])
    const handleName = (event) => {
        setTaskName(event.target.value);
    }
    const handleCompleted = (event) => {
        setCompleted(event.target.value === "true")
    }
    const handleDate = (event) => {
        setDate(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        try {
            const data = {
                taskName,
                completed,
                deadline: date
            }
            const result = await axios.post("http://localhost:8080/api/taskCreate", data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.put(`http://localhost:8080/api/taskUpdate/${taskId}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="task-container">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Task Name"
                    type="text"
                    value={taskName}
                    onChange={handleName}

                />
                <label>Is your task completed or not?</label>
                <select value={completed.toString()} onChange={handleCompleted}>
                    <option value=""></option>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
                <input
                    onChange={handleDate}
                    type="date"
                    placeholder="Deadline for the task"
                    value={date}
                />
                <button type='submit'>Submit</button>
            </form>
            {
                data.length > 0 ? (
                    data.map((it, index) => (
                        <div key={index} className='data-task'>
                            <p>{it.taskName}</p>
                            <button onChange={handleChange}>Edit</button>
                        </div>
                    ))
                ) : (
                    <p>there is no data</p>
                )
            }
        </div >
    )
}
export default TaskComponent;