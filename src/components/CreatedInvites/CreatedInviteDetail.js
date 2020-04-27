import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import UserDetailPopUp from '../User/UserDetailPopUp';

export default function CreatedInviteDetail({
  inviteDetail,
  setInviteDetail,
  events,
  setEvents,
}) {
  const [isGoing, setIsGoing] = useState('');
  //console.log(isGoing, 'isGoing', inviteDetail);
  const deleteInvite = (userEventId) => {
    axios.delete(`/api/user_events/${userEventId}`).then(() => {
      // setUserEvents(
      //   myUserEvents.filter((_userEvent) => _userEvent.id !== isGoing.id)
      // );
      axios
        .delete(`/api/events/${inviteDetail.eventId}`)
        .then(() => setInviteDetail(''));
    });
  };

  return (
    <div>
      <h5>Created Invite Detail</h5>

      <div className="card border-light mb-3" style={{ maxWidth: '20rem' }}>
        <div className="card-header">
          {inviteDetail.name}{' '}
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => setInviteDetail('')}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="card-body">
          <h5 className="card-title">Location: {inviteDetail.location}</h5>
          <p className="card-text">
            Date: {moment(inviteDetail.date).format('MMMM Do YYYY, h:mm a')}
          </p>
          <p className="card-text">Detail: {inviteDetail.description}</p>
          <p className="card-text">
            You invited{' '}
            <Link
              to="/invites"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => console.log('user')}
            >
              {inviteDetail.username}
            </Link>{' '}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => {
              deleteInvite(inviteDetail.id);
            }}
          >
            delete event
          </button>
        </div>
      </div>
      <UserDetailPopUp inviteDetail={inviteDetail} />
      <DeleteCreatedInvitePopUp deleteInvite={deleteInvite} />
    </div>
  );
}
