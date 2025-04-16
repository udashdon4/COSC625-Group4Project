import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RecoverPage from "./pages/RecoverPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ParkSearch from "./pages/ParkSearch";
import ParkDetails from "./pages/ParkDetails";
import PrivateRoute from "./components/PrivateRoute";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recover" element={<RecoverPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
          <Route path="/parksearch" element={<ParkSearch />} />
          <Route path="/parks/:parkCode" element={<ParkDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
