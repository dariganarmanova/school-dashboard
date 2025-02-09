import { useState } from "react"
import axios from 'axios'
import './ComponentStyle.css'

function Register() {
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('')
    const handleRole = (event) => {
        setSelectedRole(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleName = (event) => {
        setFirstName(event.target.value)
    }
    const handleLast = (event) => {
        setLastName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleSelectedGrade = (event) => {
        setSelectedGrade(event.target.value);
    }
    const handleChange = (event) => {
        setSelectedTeacher(event.target.value);
    }
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            email,
            password,
            head_teacher: selectedTeacher,
            grade: selectedGrade,
            role: selectedRole
        }
        try {
            const result = await axios.post("http://localhost:8080/api/register", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (result.status === 200) {
                const token = result.data.token;
                localStorage.setItem("token", token);
                alert("Successfully signed in")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="register-container">
            <form onSubmit={handleSubmitRegister} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleName}
                />
                <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleLast}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                />
                <label>Choose your head teacher:</label>
                <select id="options" value={selectedTeacher} onChange={handleChange}>
                    <option value="">Please choose your head teacher(if you are a teacher, select your name)</option>
                    <option value="amanda">Amanda</option>
                    <option value="sharon">Sharon</option>
                    <option value="katelyne">Katelyne</option>
                </select>
                <label>Select your grade</label>
                <select id="grades" value={selectedGrade} onChange={handleSelectedGrade}>
                    <option value="">Please select your grade:</option>
                    <option value="9a">9 A</option>
                    <option value="9b">9 B</option>
                    <option value="10a">10 A</option>
                    <option value="10b">10 B</option>
                </select>
                <label>Select your role</label>
                <select id="role" value={selectedRole} onChange={handleRole}>
                    <option value="">Please select your role:</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register