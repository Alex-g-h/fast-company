import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav nav-pills" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              to="/"
              id="main-tab"
              data-bs-toggle="pills"
              data-bs-target="#main"
              type="button"
              role="tab"
              aria-controls="main"
              aria-selected="true"
            >
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item" role="presentation">
              <Link
                className="nav-link"
                to="/users"
                id="users-tab"
                data-bs-toggle="pills"
                data-bs-target="#users"
                type="button"
                role="tab"
                aria-controls="users"
                aria-selected="false"
              >
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link
              className="nav-link"
              to="/login"
              id="login-tab"
              data-bs-toggle="pills"
              data-bs-target="#login"
              type="button"
              role="tab"
              aria-controls="login"
              aria-selected="false"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="tab-content">
        <div
          className="tab-pane"
          id="main"
          role="tabpanel"
          aria-labelledby="main-tab"
        ></div>
        <div
          className="tab-pane"
          id="login"
          role="tabpanel"
          aria-labelledby="login-tab"
        ></div>
        <div
          className="tab-pane"
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
        ></div>
      </div>
    </nav>
  );
};

export default NavBar;
