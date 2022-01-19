import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Experiences from "./components/experiences/experiences";
import Navbar from "./components/navbar";
import AddExperience from "./components/experiences/add-experiece";
import EditExperience from "./components/experiences/edit-experience";
import Profile from "./components/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <Navbar>
              <Experiences />
            </Navbar>
          }
        />
        <Route
          path="/my-experiences"
          element={
            <Navbar>
              <Experiences isMyExperiencePage={true} />
            </Navbar>
          }
        />
        <Route
          path="/add-experience"
          element={
            <Navbar>
              <AddExperience />
            </Navbar>
          }
        />
        <Route
          path="/my-experiences/:id"
          element={
            <Navbar>
              <EditExperience />
            </Navbar>
          }
        />
        <Route
          path="/profile"
          element={
            <Navbar>
              <Profile />
            </Navbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
