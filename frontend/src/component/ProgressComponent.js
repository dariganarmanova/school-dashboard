import axios from 'axios';
import * as d3 from 'd3';
import { useEffect, useState, useRef } from 'react';
import './ComponentStyle.css'
import { format } from "date-fns";

function ProgressComponent() {
    const [grade, setGrade] = useState("");
    const [role, setRole] = useState([]);
    const [data, setData] = useState([])
    const [lesson, setLesson] = useState("");
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("");
    const chartRef = useRef(null);
    const [forced, setForced] = useState(0);
    const handleLesson = (event) => {
        setLesson(event.target.value)
    }
    const handleDate = (event) => {
        setDate(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleGrade = (event) => {
        setGrade(event.target.value)
    }
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
    useEffect(() => {
        const token = localStorage.getItem("token")
        const fetchCourse = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/grades", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                if (result.status === 200) {
                    const newData = Array.isArray(result.data) ? result.data : [result.data];
                    if (newData.length > 0) {
                        setData(newData);
                        console.log(data)
                    } else {
                        console.log("No data received from the API");
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCourse()
    }, [forced])
    const handleCreate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        try {
            const dataPost = {
                date,
                grade_given: grade,
                lesson_name: lesson,
                student_email: email
            }
            const result = await axios.post('http://localhost:8080/api/createGrades', dataPost, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            console.log(result.data)
            if (result.status === 200) {
                setForced(prev => prev + 1);
                alert("Grade has been successfuly created")
                setData([...data, result.data])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (data.length === 0 || !chartRef.current) return;

        d3.select(chartRef.current).selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 50, left: 40 };
        const width = 100 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const parsedData = data.map(d => ({
            date: new Date(d.date),
            grade: Number(d.grade_given)
        }));

        const xScale = d3.scaleBand()
            .domain(parsedData.map(d => d.date.toLocaleDateString()))
            .range([0, width])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(parsedData, d => d.grade)])
            .range([height, 0]);

        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.selectAll(".bar")
            .data(parsedData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.date.toLocaleDateString()))
            .attr("y", d => yScale(d.grade))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.grade))
            .attr("fill", "steelblue");

    }, [data]);

    return (
        <div className="parent-progress">
            <div className="left-side">
                {JSON.stringify(role) === JSON.stringify(['ROLE_TEACHER']) && (
                    <form onSubmit={handleCreate} className="progress-form">
                        <input
                            className="progress-input"
                            value={lesson}
                            placeholder="Lesson Name"
                            type="text"
                            onChange={handleLesson}
                        />
                        <input
                            className="progress-input"
                            value={date}
                            placeholder="Date"
                            type="date"
                            onChange={handleDate}
                        />
                        <input
                            className="progress-input"
                            value={email}
                            placeholder="Student Email"
                            type="text"
                            onChange={handleEmail}
                        />
                        <input
                            className="progress-input"
                            value={grade}
                            placeholder="Grade"
                            type="text"
                            onChange={handleGrade}
                        />
                        <button type="submit" className="progress-button">Submit</button>
                    </form>
                )}
                {data.length > 0 ? (
                    <div className="data-progress">
                        {data.map((dt) => (
                            <div key={dt._id || dt.id}>
                                <p>Grade: {dt.grade_given}</p>
                                <p>Lesson: {dt.lesson_name}</p>
                                <p>Date: {dt.date}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-grade">No grade available</p>
                )}
            </div>

            <div className="right-side">
                <div className="d3-chart-container" ref={chartRef}></div>
            </div>
        </div>
    );

}

export default ProgressComponent;