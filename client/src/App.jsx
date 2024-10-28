import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login"; 
import Signup from "./Signup"; 
import Home from "./Home";
import ContextProvider from './context/Context';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
      <ContextProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
        </ContextProvider>
    );
};

export default App;
