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

  const acceptInvite = (acceptEvent) => {
    axios
      .put(`/api/user_events/${acceptEvent.id}`, acceptEvent)
      .then((response) => {
        const userEvent = response.data;
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
        const updated = events.map((_event) =>
          _event.id === returnedE.id ? returnedE : _event
        );
        setEvents(updated);
      });
  };

  const declineInvite = (declineEvent) => {
    axios
      .put(`/api/user_events/${declineEvent.id}`, declineEvent)
      .then((response) => {
        const userEvent = response.data;
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
        const updated = events.map((_event) =>
          _event.id === returnedE.id ? returnedE : _event
        );
        setEvents(updated);
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="userName">The Wheres and Whens</h3>
        </div>

        <div className="row justify-content-center  col-md-3">
          <div className="card profile-card invite-body">
            <div className="card-body invite-body">
              <h4 className="card-header invite-head-purple">
                {inviteDetail.name}
                <div className=" theX">
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setInviteDetail('')}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </h4>
              <div className="card-body">
                <h5 className="card-title">
                  Location: {inviteDetail.location}
                </h5>
                <p className="card-text">
                  Date:{' '}
                  {moment(inviteDetail.date).format('MMMM Do YYYY, h:mm a')}
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
                    }}
                  >
                    accept invite
                  </button>
                )}
              </div>
            </div>
            <UserDetailPopUp inviteDetail={inviteDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
