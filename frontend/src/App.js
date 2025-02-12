import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage'
import NavBar from "./component/NavBar";
import AuthPage from "./page/AuthPage";
import TaskComponent from "./component/TaskComponent";
import CourseComponent from "./component/CourseComponent"
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/authenticate" element={<AuthPage />} />
        <Route path="/tasks" element={<TaskComponent />} />
        <Route path="/courses" element={<CourseComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
