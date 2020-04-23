import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import qs from 'qs';

const Header = ({ login }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/#">
        <h1>WannaHang</h1>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Create New Account
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/profile">
              profile
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" to="/search/criteria">
              Search
            </Link>
          </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <Link
            to="/login"
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
          >
            Log In
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Header;
