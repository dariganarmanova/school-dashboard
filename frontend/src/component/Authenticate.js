import { useState } from "react"
import './ComponentStyle.css'
import axios from "axios"
function Authenticate() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        try {
            const response = await axios.post('http://localhost:8080/api/authenticate', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                console.log(token)
                alert("authenticated")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="authenticate-container">
            <form onSubmit={handleSubmit} className="authenticate-form">
                <h2>Authenticate</h2>

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
                <button type="submit">Submit</button>
            </form>
        </div >
    )
}
export default Authenticate;