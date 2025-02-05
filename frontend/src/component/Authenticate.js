import { useState } from "react"
import './ComponentStyle.css'
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
        try {

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