import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage'
import NavBar from "./component/NavBar";
import AuthenticatePage from "./page/AuthenticatePage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/authenticate" element={<AuthenticatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
