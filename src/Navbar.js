import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="collapse navbar-collapse mr-auto ml-4">
          <Link to="/" className="navbar-brand">
            BookStore App
          </Link>
          <Link
            to="/book/list"
            className="nav-link"
            style={{ marginRight: "10px" }}
          >
            BookList
          </Link>
          <Link
            to="/book/create"
            className="nav-link"
            style={{ marginRight: "10px" }}
          >
            BookCreate
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {isAuthenticated ? (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
