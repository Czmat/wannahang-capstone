import React from "react";
import qs from "qs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import UserInfo from "./UserInfo";
import UserHobbies from "./UserHobbies";
import SearchCriteria from "./SearchCriteria";
import SearchResults from "./SearchResults";
import SearchFilter from "./SearchFilter";
import FileUpload from "./components/FileUpload";
import Login from "./Login";
import Home from "./Home";

const Nav = ({ params, logout, auth, login }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light  top-nav-bkgd">
      <Link className="navbar-brand nav-link" to="/home">
        <img
          src="/images/WannaHang.png"
          alt="WannaHang Logo"
          className="logo-nav"
        />
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
      <div className="collapse navbar-collapse" id="navbarText"></div>
    </nav>
  );
};
// function NavBarLinks({ label, to, activeOnlyWhenExact }) {
//   let match = useRouteMatch({
//     path: to,
//     exact: activeOnlyWhenExact,
//   });

// return (
//   <div className={match ? "active" : ""}>
//     {match && ""}
//     <Link to={to}>{label}</Link>
//   </div>
// );
// }

export default Nav;
