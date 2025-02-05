import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage'
import NavBar from "./component/NavBar";
import AuthPage from "./page/AuthPage";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/authenticate" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
