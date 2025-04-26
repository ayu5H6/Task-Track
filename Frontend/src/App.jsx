import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/project/:projectId"
          element={isAuthenticated ? <Project /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
