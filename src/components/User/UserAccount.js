import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import DeleteAccountPopUp from './DeleteAccountPopUp';

const UserAccount = ({ logout, auth, params }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [myEvents, setMyEvent] = useState([]);

  const deleteAccount = () => {
    axios.delete(`/api/users/${auth.id}`);
  };

  const deleteEvent = (eventToDelete) => {
    const userEventsForSelectedEvents = userEvents.filter(
      (ue) => ue.eventId === eventDetail.id
    );

    //user events
    axios.delete(`/api/user_events/${isGoing.id}`).then(() => {
      setUserEvents(
        myUserEvents.filter((_userEvent) => _userEvent.id !== isGoing.id)
      );
    });
    // console.log(
    //   { userEventsForSelectedEvent },
    //   'userEventsForSelectedEvent',
    //   eventToDelete
    // );
    if (userEventsForSelectedEvents.length) {
      axios
        .post(`/api/userEvents/array/delete`, userEventsForSelectedEvents)
        .then(() => {
          const updated = userEvents.filter(
            (userEvent) => userEvent.eventId !== eventToDelete.id
          );
          setUserEvents(updated);
          axios
            .delete(`/api/events/${eventToDelete.id}`)
            .then(() =>
              setEvents(events.filter((e) => e.id !== eventToDelete.id))
            );
        });
    } else {
      axios
        .delete(`/api/events/${eventToDelete.id}`)
        .then(() => setEvents(events.filter((e) => e.id !== eventToDelete.id)));
    }
  };

  return (
    <div className="account-container">
      <h1>{auth.username}'s Account</h1>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Personal Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {auth.firstname} {auth.lastname}
            </li>
            <li className="list-group-item">{auth.username}</li>
            <li className="list-group-item">{auth.email}</li>
            <li className="list-group-item">{auth.phone}</li>
            {/* <li className="list-group-item">{auth.zipcode}</li>
            <li className="list-group-item">
              {moment(auth.birthday).format('MM/DD/YYYY')}
            </li>
            <li className="list-group-item">{auth.gender}</li> */}
          </ul>
          <Link to="/useraccount/edit" className="card-link">
            Edit
          </Link>
        </div>
      </div>
      <h5 className="card-title">If you want new password!</h5>
      <Link to="/useraccount/password" className="card-link">
        Change password
      </Link>
      <div className="form-group">
        <h5 className="card-title">else logout</h5>
        <Link to="/" className="btn btn-primary" onClick={logout}>
          Logout {auth.username}
        </Link>
      </div>
      <div className="form-group">
        <h5 className="card-title">
          If not happy, you can delete account, we dont even like you.{' '}
        </h5>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >
          Delete account {auth.username}
        </button>
      </div>
      <DeleteAccountPopUp
        auth={auth}
        deleteAccount={deleteAccount}
        logout={logout}
      />
    </div>
  );
};

export default UserAccount;
