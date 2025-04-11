import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">
          <Link to="/" className="hover:text-green-200 transition">
            National Park Explorer
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition"
          >
            About Us
          </Link>
          <Link
            to="/login"
            className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/account"
            className="bg-white text-green-900 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
          >
            Account Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
