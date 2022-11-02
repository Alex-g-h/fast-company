import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
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
        <li className="nav-item" role="presentation">
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
        </li>
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
      </ul>

      <div className="tab-content">
        <div
          className="tab-pane"
          id="main"
          role="tabpanel"
          aria-labelledby="main-tab"
        >
          123
        </div>
        <div
          className="tab-pane"
          id="login"
          role="tabpanel"
          aria-labelledby="login-tab"
        >
          456
        </div>
        <div
          className="tab-pane"
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
        >
          789
        </div>
      </div>
    </>
  );
};

export default NavBar;
