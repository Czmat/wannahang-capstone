import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import Login from './Login';
import FileUpload from './components/FileUpload';
import FileUploadPlain from './components/FileUploadPlain';

import FileUploadBkgd from './components/FileUploadBkgd';
import Nav from './Nav';
import NavTop from './NavTop';
import CreateNewUser from './components/User/CreateNewUser';
//import Header from "./components/header/Header";
import UserInfo from './UserInfo';
import UserHobbies from './UserHobbies';
import UserAccount from './components/User/UserAccount';
import EditUserAccount from './components/User/EditUserAccount';
import ChangeUserPassword from './components/User/ChangeUserPassword';
import SearchCriteria from './SearchCriteria';
import RenderEvents from './components/Event/RenderEvents';
import RenderUsers from './components/User/RenderUsers';
import CreateEvent from './components/Event/CreateEvent';
import RenderUserEvents from './components/Event/RenderUserEvents';
// import UserEvents from './components/Event/UserEvents';
import UserProfile from './UserProfile';
import SearchResults from './SearchResults';
import EventDetail from './components/Event/EventDetatil';
import UserProfileEdit from './UserProfileEdit';
import UserHobbiesEdit from './UserHobbiesEdit';
import SearchFIlter from './SearchFIlter';
import Invitations from './components/Invites/Invitations';
import CreateEventWithInvite from './components/Event/CreateEventWithInvite';
import Home from './Home';
import Chat from './Chat';
import UserCreatedInvites from './components/CreatedInvites/UserCreatedInvites';
import Favorites from './Favorites';
// import UserPhotos from './UserPhotos';

const headers = () => {
  const token = window.localStorage.getItem('token');
  return {
    headers: {
      authorization: token,
    },
  };
};

const App = () => {
  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));
  const [auth, setAuth] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);
  const [userCareer, setUserCareer] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [userToBeInvited, setUserToBeInvited] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [invitesCount, setInvitesCount] = useState(0);

  const login = async (credentials) => {
    const token = (await axios.post('/api/auth', credentials)).data.token;
    window.localStorage.setItem('token', token);
    exchangeTokenForAuth();
  };
  const exchangeTokenForAuth = async () => {
    const response = await axios.get('/api/auth', headers());
    setAuth(response.data);
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  useEffect(() => {
    exchangeTokenForAuth();
  }, []);

  useEffect(() => {
    if (auth.id) {
      axios
        .get('/api/events', headers())
        .then((response) => setEvents(response.data));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios
        .get('/api/user_events', headers())
        .then((response) => setUserEvents(response.data));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios
        .get('/api/users', headers())
        .then((response) => setUsers(response.data));
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get(`/api/invites/${auth.id}`).then((response) => {
        const invites = response.data;
        const invitations = invites.filter(
          (invite) => invite.status === 'invited'
        );
        setInvitesCount(invitations.length);
      });
    }
  }, [auth]);

  // useEffect(() => {
  //   if (auth.id) {
  //     axios.get("/api/getUserProfiles", headers()).then((response) => {
  //       setUserProfiles(response.data);
  //     });
  //   }
  // }, [auth]);

  useEffect(() => {
    axios
      .get('/api/profiles')
      .then((response) => setUserProfiles(response.data));
  }, []);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/hobbies', headers()).then((response) => {
        setHobbies(response.data);
        axios.get('/api/user_hobbies', headers()).then((resp) => {
          setUserHobbies(resp.data);
        });
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/getCareers', headers()).then((response) => {
        setUserCareer(response.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const { view } = params;

  if (!auth.id) {
    return (
      <Router>
        {/* <Header logout={logout} /> */}
        <Switch>
          <Route path="/register" exact>
            <CreateNewUser login={login} />
          </Route>
          <Route path="/login" exact>
            <Login login={login} />
          </Route>
          <Home />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <NavTop logout={logout} auth={auth} />
        <Nav logout={logout} auth={auth} invitesCount={invitesCount} />
        <Switch>
          <Route path="/file/upload" exact>
            <FileUpload auth={auth} logout={logout} />
          </Route>
          <Route path="/file/upload/bkgd" exact>
            <FileUploadBkgd auth={auth} logout={logout} />
          </Route>
          <Route path="/FileUpload">
            <FileUpload />
          </Route>
          <Route path="/FileUpload">
            <FileUploadPlain />
          </Route>
          <Route path="/userprofile" exact>
            <UserProfile
              logout={logout}
              auth={auth}
              setAuth={setAuth}
              hobbies={hobbies}
              setHobbies={setHobbies}
              userHobbies={userHobbies}
              setUserHobbies={setUserHobbies}
            />
          </Route>
          <Route path="/userprofile/edit" exact>
            <UserProfileEdit auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/userhobbies/edit" exact>
            <UserHobbiesEdit
              auth={auth}
              setAuth={setAuth}
              hobbies={hobbies}
              setHobbies={setHobbies}
              userHobbies={userHobbies}
              setUserHobbies={setUserHobbies}
            />
          </Route>
          <Route path="/UserInfo">
            <UserInfo auth={auth} login={login} />
          </Route>
          {/* <Route path="/search/criteria">
            <SearchCriteria auth={auth} />
          </Route> */}
          <Route path="/findfriends">
            <SearchResults
              auth={auth}
              users={users}
              setUserToBeInvited={setUserToBeInvited}
            />
          </Route>
          <Route path="/myfriends">
            <Favorites
              auth={auth}
              users={users}
              setUserToBeInvited={setUserToBeInvited}
            />
          </Route>
          <Route path="/search/filter">
            <SearchFIlter auth={auth} userProfiles={userProfiles} />
          </Route>
          <Route path="/UserHobbies">
            <UserHobbies auth={auth} />
          </Route>
          <Route path="/useraccount/edit" exact>
            <EditUserAccount auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/useraccount" exact>
            <UserAccount logout={logout} auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/useraccount/password" exact>
            <ChangeUserPassword auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/meetups">
            <RenderEvents
              setEvents={setEvents}
              events={events}
              users={users}
              auth={auth}
              userEvents={userEvents}
              setUserEvents={setUserEvents}
            />
          </Route>
          <Route path="/event/details">
            <EventDetail events={events} />
          </Route>
          <Route path="/my/meetups">
            <RenderUserEvents
              setEvents={setEvents}
              events={events}
              users={users}
              auth={auth}
              userEvents={userEvents}
              setUserEvents={setUserEvents}
              headers={headers}
            />
          </Route>
          <Route path="/invites">
            <Invitations
              setEvents={setEvents}
              events={events}
              users={users}
              auth={auth}
              userEvents={userEvents}
              setUserEvents={setUserEvents}
              headers={headers}
              setInvitesCount={setInvitesCount}
            />
          </Route>

          <Route path="/user/created/invites">
            <UserCreatedInvites
              setEvents={setEvents}
              events={events}
              users={users}
              auth={auth}
              userEvents={userEvents}
              setUserEvents={setUserEvents}
              headers={headers}
              setInvitesCount={setInvitesCount}
            />
          </Route>
          <Route path="/create/event">
            <CreateEvent
              auth={auth}
              setAuth={setAuth}
              setEvents={setEvents}
              events={events}
              headers={headers}
            />
          </Route>
          <Route path="/create/invite/event">
            <CreateEventWithInvite
              users={users}
              auth={auth}
              setAuth={setAuth}
              setEvents={setEvents}
              events={events}
              headers={headers}
              userToBeInvited={userToBeInvited}
            />
          </Route>
          <Route path="/friends">
            <RenderUsers users={users} auth={auth} />
          </Route>
          <Route>
            <Chat />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
