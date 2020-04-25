import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import Login from './Login';
import FileUpload from './components/FileUpload';
import Nav from './Nav';
import CreateNewUser from './components/User/CreateNewUser';
import Header from './components/header/Header';
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
import SearchFilter from './SearchFilter';
import Invitations from './components/Invites/Invitations';
import CreateEventWithInvite from './components/Event/CreateEventWithInvite';

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
  const [userCareer, setUserCareer] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [userToBeInvited, setuserToBeInvited] = useState([]);

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

  // useEffect(() => {
  //   if (auth.id) {
  //     axios.get("/api/getUserProfiles", headers()).then((response) => {
  //       setUserProfiles(response.data);
  //     });
  //   }
  // }, [auth]);

  useEffect(() => {
    if (auth.id) {
      axios.get('/api/getHobbies', headers()).then((response) => {
        setHobbies(response.data);
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
  // console.log(auth, 'auth in app');

  const { view } = params;

  if (!auth.id) {
    return (
      <Router>
        <Header logout={logout} />
        <Switch>
          <Route path="/register" exact>
            <CreateNewUser login={login} />
          </Route>
          <Route path="/login" exact>
            <Login login={login} />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Nav logout={logout} auth={auth} />
        <Switch>
          <Route path="/file/upload" exact>
            <FileUpload auth={auth} logout={logout} />
          </Route>
          <Route path="/FileUpload">
            <FileUpload />
          </Route>
          <Route path="/userprofile" exact>
            <UserProfile logout={logout} auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/userprofile/edit" exact>
            <UserProfileEdit
              auth={auth}
              setAuth={setAuth}
              // userProfile={userProfile}
              // setUserProfile={setUserProfile}
            />
          </Route>
          <Route path="/UserInfo">
            <UserInfo auth={auth} login={login} />
          </Route>
          {/* <Route path="/search/criteria">
            <SearchCriteria auth={auth} />
          </Route> */}
          <Route path="/peeps">
            <SearchResults auth={auth} users={users} />
          </Route>
          <Route path="/search/filter">
            <SearchFilter auth={auth} />
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
            />
          </Route>
          <Route path="/friends">
            <RenderUsers users={users} auth={auth} />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
