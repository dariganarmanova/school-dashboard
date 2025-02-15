import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage'
import NavBar from "./component/NavBar";
import AuthPage from "./page/AuthPage";
import TaskComponent from "./component/TaskComponent";
import CourseComponent from "./component/CourseComponent"
import ProgressComponent from "./component/ProgressComponent";
import Registration from "./page/Registration"
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/authenticate" element={<AuthPage />} />
        <Route path="/registrate" element={<Registration />} />
        <Route path="/tasks" element={<TaskComponent />} />
        <Route path="/courses" element={<CourseComponent />} />
        <Route path="/progress" element={<ProgressComponent />} />
      </Routes>
    </Router >
  );
}

export default App;
