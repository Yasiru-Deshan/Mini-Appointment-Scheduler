import React from "react";
import "../styles/Navbar.css";

export default function Navbar({ userEmail, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <p>Welcome, {userEmail}</p>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}