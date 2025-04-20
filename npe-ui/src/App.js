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
          <Route path="/COSC625-Group4Project/" element={<LandingPage />} />
          <Route path="/COSC625-Group4Project/about" element={<AboutPage />} />
          <Route path="/COSC625-Group4Project/recover" element={<RecoverPage />} />
          <Route path="/COSC625-Group4Project/login" element={<LoginPage />} />
          <Route path="/COSC625-Group4Project/signup" element={<SignupPage />} />
          <Route path="/COSC625-Group4Project/map" element={<MapPage />} />
          <Route
            path="/COSC625-Group4Project/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
          <Route path="/COSC625-Group4Project/parksearch" element={<ParkSearch />} />
          <Route path="/COSC625-Group4Project/parks/:parkCode" element={<ParkDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
