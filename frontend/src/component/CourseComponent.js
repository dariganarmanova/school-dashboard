import axios from "axios"
import { useEffect, useState } from "react"

function CourseComponent() {
    const [data, setData] = useState([]);
    const [role, setRole] = useState([]);
    const [lesson, setLesson] = useState("");
    const [teacher, setTeacher] = useState("")
    const [grade, setGrade] = useState("")
    const [time, setTime] = useState("")

    const handleLesson = (event) => {
        setLesson(event.target.value)
    }
    const handleTeacher = (event) => {
        setTeacher(event.target.value)
    }
    const handleGrade = (event) => {
        setGrade(event.target.value)
    }
    const handleTime = (event) => {
        setTime(event.target.value)
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        const fetchCourses = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/courses", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                })
                if (result.status === 200) {
                    setData(Array.isArray(result.data) ? result.data : [result.data])
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchCourses()
    }, [])
    useEffect(() => {
        const getUserRole = async () => {
            try {
                const token = localStorage.getItem("token")
                const result = await axios.get("http://localhost:8080/api/getRole", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (result.status === 200) {
                    setRole(result.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUserRole();
    }, [])
    console.log(role)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        try {
            const data = {
                lesson,
                teacher,
                grade
            }
            const result = await axios.post("http://localhost:8080/api/coursesCreate", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (result.status === 200) {
                setData([...data, result.data])
                alert("Course successfuly created")
            }

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="course-section">
            {JSON.stringify(role) === JSON.stringify(['ROLE_TEACHER']) && (
                <form onSubmit={handleSubmit} className="course-form">
                    <input
                        value={lesson}
                        onChange={handleLesson}
                        placeholder="lesson name"
                        type="text"
                    />
                    <input
                        value={teacher}
                        onChange={handleTeacher}
                        placeholder="teacher name"
                        type="text"
                    />
                    <label>Please input in this format "9 A" "9 B"</label>
                    <input
                        value={grade}
                        onChange={handleGrade}
                        placeholder="grade"
                        type="text"
                    />
                    <input
                        value={time}
                        onChange={handleTime}
                        placeholder="time"
                        type="text"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}

            <div className="course-wrapper">
                {data.length > 0 ? (
                    data.map((dt) => (
                        <div key={dt._id || dt.id} className="course-container">
                            <div className="course-data">
                                <p>Subject name: {dt.lesson}</p>
                                <p>Teacher name: {dt.teacher}</p>
                                <p>Time: {dt.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No courses available</p>
                )}
            </div>
        </div>
    );

}

export default CourseComponent;