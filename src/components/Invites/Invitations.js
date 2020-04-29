import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import InvitationDetail from './InvitationDetail';
import AcceptedInvites from './AcceptedInvites';
import DeclinedInvites from './DeclinedInvites';

export default function Invitations({
  headers,
  auth,
  userEvents,
  events,
  setEvents,
  setInvitesCount,
}) {
  const [invites, setInvites] = useState([]);
  //const [showDetail, setShowDetail] = useState('');
  const [inviteDetail, setInviteDetail] = useState('');

  useEffect(() => {
    axios
      .get(`/api/invites/${auth.id}`)
      .then((response) => setInvites(response.data));
  }, [inviteDetail]);

  const invitations = invites.filter((invite) => invite.status === 'invited');

  useEffect(() => {
    setInvitesCount(invitations.length);
  }, [invitations]);

  const acceptedInvites = invites.filter(
    (invite) => invite.status === 'accepted'
  );

  const declinedInvites = invites.filter(
    (invite) => invite.status === 'declined'
  );

  if (inviteDetail) {
    return (
      <div>
        <InvitationDetail
          inviteDetail={inviteDetail}
          setInviteDetail={setInviteDetail}
          events={events}
          setEvents={setEvents}
        />
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="userName">
            {' '}
            I have been invited to {invitations.length} events
          </h3>
        </div>
        {invitations.map((invite) => {
          return (
            <div key={invite.id} className="row justify-content-center">
              <div className="card profile-card invite-body">
                <div className="card-body invite-body">
                  <div className="card-header invite-head-purple">
                    <h4>{invite.name}</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Location: {invite.location}</h5>
                    <p className="card-text">
                      {moment(invite.date).format('MMMM Do YYYY, h:mm a')}
                    </p>
                    {invite.isAccepted ? <p>I accepted </p> : <p>not going</p>}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setInviteDetail(invite);
                        //setShowDetail(true);
                      }}
                    >
                      view Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          {acceptedInvites ? (
            <AcceptedInvites
              acceptedInvites={acceptedInvites}
              setInviteDetail={setInviteDetail}
            />
          ) : (
            <p>I have no accepted invites</p>
          )}
        </div>
        <div>
          {declinedInvites ? (
            <DeclinedInvites
              declinedInvites={declinedInvites}
              setInviteDetail={setInviteDetail}
            />
          ) : (
            <p>I have no declined invites</p>
          )}
        </div>
      </div>
    );
  }
}
