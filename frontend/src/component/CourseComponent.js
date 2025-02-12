import axios from "axios"
import { useEffect, useState } from "react"

function CourseComponent() {
    const [data, setData] = useState([]);
    const [role, setRole] = useState([]);
    const [lesson, setLesson] = useState("");
    const [teacher, setTeacher] = useState("")
    const [grade, setGrade] = useState("")

    const handleLesson = (event) => {
        setLesson(event.target.value)
    }
    const handleTeacher = (event) => {
        setTeacher(event.target.value)
    }
    const handleGrade = (event) => {
        setGrade(event.target.value)
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
            }

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            {
                data.length > 0 ? (
                    data.map((dt) => (
                        <div key={dt._id || dt.id} className="data-container">
                            <p>{dt.lesson}</p>
                            <p>{dt.teacher}</p>
                        </div>
                    ))
                ) : (
                    <p>No course available for you</p>
                )
            }
            {JSON.stringify(role) === JSON.stringify(['ROLE_TEACHER']) ? (
                <form onChange={handleSubmit}>
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
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <p>Students not allowed to create courses</p>
            )}
        </div>
    )
}

export default CourseComponent