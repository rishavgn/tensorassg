// App.js
import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  Landing, Login, Signup, FeedbackForm } from "./screens";
const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/"
  element={user?.email ? <Navigate to="/feedbackForm" /> : <Landing />}
  />
  
<Route
    path="/signup"
    element={user?.email ? <Navigate to="/feedbackForm" /> : <Signup />}
  />
  <Route
    path="/login"
    element={user?.email ? <Navigate to="/feedbackForm" /> : <Login />}
  />
  <Route
    path="/feedbackForm"
    element={user?.email ? <FeedbackForm user={user} /> : <Navigate to="/" />}
  />
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;