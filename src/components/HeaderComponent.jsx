import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../App.css";
import "../HeaderComponent.css";

const HeaderComponent = () => {
  const [authMessage, setAuthMessage] = useState(""); // State to store the authentication message
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    setAuthMessage("Google authentication was successful. Please proceed."); // Set the success message
    setIsLoggedIn(true); // Set the user as logged in

    // Clear the message after 7 seconds
    setTimeout(() => {
      setAuthMessage("");
    }, 7000);
  };

  const handleLoginFailure = () => {
    console.error("Google Login Failed");
    setAuthMessage("Google authentication failed. Please try again."); // Set the failure message

    // Clear the message after 7 seconds
    setTimeout(() => {
      setAuthMessage("");
    }, 7000);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false); // Set the user as logged out
    setAuthMessage(""); // Clear any existing messages
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar shadow-lg p-3">
        <div className="container-fluid">
          {/* Logo / Brand */}
          <a href="/" className="navbar-brand fs-4 fw-bold text-light d-flex align-items-center">
            <img 
              src="/img/ig.png" 
              alt="Logo" 
              className="me-2" 
              style={{ width: "50px", height: "60px" }} 
            />
            INTERNAL MANAGEMENT SYSTEM
            <img 
              src="/img/logo.png" 
              alt="Secondary Logo" 
              className="ms-2" 
              style={{ width: "100px", height: "50px" }} 
            />
          </a>

          {/* Navbar toggler for responsiveness */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {/* Conditionally Render Google Login or Logout Button */}
                {isLoggedIn ? (
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                ) : (
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Authentication Message */}
      {authMessage && (
        <div className="alert alert-success text-center mt-3" role="alert">
          {authMessage}
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;