import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilesPage from './pages/ProfilesPage';
import Details from './pages/Details';
import AdminProfilesPage from './admin/AdminProfilesPage';
import './styles/main.css';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/profilespage" element={<ProfilesPage />} />
        <Route path="/profiles/:id" element={<Details />} />
        <Route path="/admin" element={<AdminProfilesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

