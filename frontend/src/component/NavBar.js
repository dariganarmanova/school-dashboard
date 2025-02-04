import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/authenticate">Authenticate</Link>
                    </li>
                    <li>
                        <Link to="/tasks">Tasks</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/progress">Progress</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;