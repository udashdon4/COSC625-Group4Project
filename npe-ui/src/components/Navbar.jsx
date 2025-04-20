import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userId, logout } = useAuth();
  const isLoggedIn = !!userId;
  const navigate = useNavigate();

  return (
    <nav className="bg-green-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">
          <Link to="/COSC625-Group4Project/" className="hover:text-green-200 transition">
            National Park Explorer
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/COSC625-Group4Project/"
            className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/COSC625-Group4Project/about"
            className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition"
          >
            About Us
          </Link>
          <Link
            to="/COSC625-Group4Project/parksearch"
            className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition"
          >
            Park Search
          </Link>
          <Link
            to="/COSC625-Group4Project/map"
            className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition"
          >
            View National Parks Map
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/COSC625-Group4Project/login"
                className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
              >
                Login
              </Link>
              <Link
                to="/COSC625-Group4Project/signup"
                className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link
                to="/COSC625-Group4Project/account"
                className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
              >
                Account Settings
              </Link>
              <button
                onClick={() => {
                  logout(); // clear context + localStorage
                  navigate("/COSC625-Group4Project/login"); // redirect
                }}
                className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
