import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import UserDetailPopUp from '../User/UserDetailPopUp';

export default function InvitationDetail({
  inviteDetail,
  setInviteDetail,
  events,
  setEvents,
}) {
  const [isGoing, setIsGoing] = useState('');
  //console.log(isGoing, 'isGoing', inviteDetail);

  const acceptInvite = (acceptEvent) => {
    axios
      .put(`/api/user_events/${acceptEvent.id}`, acceptEvent)
      .then((response) => {
        const userEvent = response.data;
        // const updated = myUserEvents.map((_userEvent) =>
        //   _userEvent.id === userEvent.id ? userEvent : _userEvent
        // );
        // setUserEvents(updated);
        setIsGoing(userEvent);
        setInviteDetail({ ...inviteDetail, status: 'accepted' });
      });
    axios
      .put(`/api/events/${inviteDetail.eventId}`, {
        name: inviteDetail.name,
        date: inviteDetail.date,
        location: inviteDetail.location,
        description: inviteDetail.description,
        isPublic: false,
        isAccepted: true,
        userId: inviteDetail.userId,
      })
      .then((response) => {
        const returnedE = response.data;
        console.log(returnedE, 'new ');
        const updated = events.map((_event) =>
          _event.id === returnedE.id ? returnedE : _event
        );
        setEvents(updated);
      });
  };

  const declineInvite = (declineEvent) => {
    //console.log(declineEvent, 'declineInvite');

    axios
      .put(`/api/user_events/${declineEvent.id}`, declineEvent)
      .then((response) => {
        const userEvent = response.data;
        // const updated = myUserEvents.map((_userEvent) =>
        //   _userEvent.id === userEvent.id ? userEvent : _userEvent
        // );
        // setUserEvents(updated);
        setIsGoing(userEvent);
        setInviteDetail({ ...inviteDetail, status: 'declined' });
      });
    axios
      .put(`/api/events/${inviteDetail.eventId}`, {
        name: inviteDetail.name,
        date: inviteDetail.date,
        location: inviteDetail.location,
        description: inviteDetail.description,
        isPublic: false,
        isAccepted: false,
        userId: inviteDetail.userId,
      })
      .then((response) => {
        const returnedE = response.data;
        console.log(returnedE, 'new ');
        const updated = events.map((_event) =>
          _event.id === returnedE.id ? returnedE : _event
        );
        setEvents(updated);
      });
  };

  return (
    <div>
      <h5>Invite Detail</h5>

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
            Invited by{' '}
            <Link
              to="/invites"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => console.log('user')}
            >
              {inviteDetail.username}
            </Link>{' '}
          </p>

          {inviteDetail.status === 'accepted' ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                declineInvite({
                  id: inviteDetail.id,
                  joinedUserId: inviteDetail.joinedUserId,
                  eventId: inviteDetail.eventId,
                  status: 'declined',
                });
                //console.log(inviteDetail.id, 'accept invite');
              }}
            >
              decline invite
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                acceptInvite({
                  id: inviteDetail.id,
                  joinedUserId: inviteDetail.joinedUserId,
                  eventId: inviteDetail.eventId,
                  status: 'accepted',
                });
                //console.log(inviteDetail.id, 'accept invite');
              }}
            >
              accept invite
            </button>
          )}
        </div>
      </div>
      <UserDetailPopUp inviteDetail={inviteDetail} />
    </div>
  );
}
