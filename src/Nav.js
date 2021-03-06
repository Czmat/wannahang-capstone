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
import SearchFIlter from "./SearchFIlter";
import FileUpload from "./components/FileUpload";
import Login from "./Login";
import Home from "./Home";

import UserPhoto from "./UserPhoto";

const Nav = ({ params, logout, auth, login, invitesCount }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <Link className="navbar-brand nav-link" to="/findfriends">
        <h2 className="logo-word">WannaHang</h2>
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
          {/* <li className="nav-item dropdown">
            <Link
              to="/userinfo"
              className="nav-link dropdown-toggle links-nav"

              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              My Hangouts
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown"> */}
          {/* <div className="nav-item">
                <Link className="nav-link" to="/meetups">
                  Public Meetups
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/friends">
                  Meet Friends
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/my/meetups">
                  My Created Meetups
                </Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/invites">
                  Private Invites
                </Link>
              </div> */}
          <div className="nav-item  col-xs-12">
            <Link className="nav-link links-nav" to="/user/created/invites">
              My Hangouts
            </Link>
          </div>
          {/* </div> */}
          {/* </li> */}

          {/* 2nd dropdown */}

          <li className="nav-item dropdown  col-xs-12">
            <Link
              to="/userinfo"
              className="nav-link dropdown-toggle links-nav"
              // href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              My User Settings
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {/* <div className="nav-item">
                <Link className="nav-link" to="/useraccount">
                  Account Settings
                </Link>
              </div> */}
              <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/UserProfile"
                  label="UserProfile"
                >
                  My Profile
                </Link>
              </div>
              {/* <div className="nav-item">
                <Link className="nav-link" to="/UserInfo" label="UserInfo">
                  Setup My Profile
                </Link>
              </div> */}
              {/* <div className="nav-item">
                <Link className="nav-link" to="/UserInfo" label="UserInfo">
                  Setup My Profile
                </Link>
              </div> */}
              <div className="nav-item">
                <Link className="nav-link" to="/myfriends" label="Favorites">
                  My Friends
                </Link>
              </div>

              <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/findfriends"
                  label="FindFriends"
                >
                  Find New Friends
                </Link>
              </div>

              {/* <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/user/created/invites"
                  label="/user/created/invites"
                >
                  My Invitations
                </Link>
              </div> */}

              {/* <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/search/results"
                  label="SearchResults"
                >
                  Search Results
                </Link>
              </div> */}

              {/* <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/search/filter"
                  label="SearchFIlter"
                >
                  Search Filter
                </Link>
              </div> */}

              {/* <div className="nav-item">
                <Link className="nav-link" to="/file/upload" label="FileUpload">
                  Upload My Photo
                </Link>
              </div> */}
              {/* <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/create/event"
                  label="CreateEvent"
                >
                  Create Event
                </Link>
              </div>
              <div className="nav-item">
                <Link
                  className="nav-link"
                  to="/create/invite/event"
                  label="CreateEventWithInvite"
                >
                  Create Event With Invite
                </Link>
              </div> */}

              {/* <div className="dropdown-divider"></div> */}

              {/* <div className="nav-item">
                <Link className="nav-link" to="/UserEvents" label="UserEvents">
                  User Schedule
                </Link>
              </div> */}
              {/* incoming ends here */}
            </div>
          </li>
        </ul>
        <div className="user-area-nav col-md-4 col-xs-12">
          <Link to="/invites">
            <i
              title="Invitations"
              className="fas fa-envelope-open-text fa-lg invites"
            >
              <span title="invitations" className="invitesNum">
                {invitesCount}
              </span>
            </i>
          </Link>
          <div className="mr-2">
            <UserPhoto auth={auth} />
          </div>
          <form className="form-inline my-2 my-lg-0">
            <Link
              to="/login"
              className="btn btn-primary btn-sm"
              type="button"
              onClick={logout}
            >
              <span className="btn-nav smaller">Logout {auth.firstname}</span>
            </Link>
          </form>
        </div>
      </div>
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
