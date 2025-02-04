import { useState } from "react"

function AuthenticatePage() {
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const handleSelectedGrade = (event) => {
        setSelectedGrade(event.target.value);
    }
    const handleChange = (event) => {
        setSelectedTeacher(event.target.value);
    }
    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="First name"
                />
                <input
                    type="text"
                    placeholder="Last name"
                />
                <input
                    type="email"
                    placeholder="Email"
                />
                <label>Choose your head teacher</label>
                <select id="options" value={selectedTeacher} onChange={handleChange}>
                    <option value="">Please choose your head teacher</option>
                    <option value="amanda">Amanda</option>
                    <option value="sharon">Sharon</option>
                    <option value="katelyne">Katelyne</option>
                </select>
                <label>Select your grade</label>
                <select id="grades" value={selectedGrade} onChange={handleSelectedGrade}>
                    <option value="">Please select your grade</option>
                    <option value="9a">9 A</option>
                    <option value="9b">9 B</option>
                    <option value="10a">10 A</option>
                    <option value="10b">10 B</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AuthenticatePage