import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import CreatedInviteDetail from './CreatedInviteDetail';
// import AcceptedInvites from './AcceptedInvites';
// import DeclinedInvites from './DeclinedInvites';

export default function UserCreatedInvites({
  headers,
  auth,
  userEvents,
  events,
  setEvents,
  setInvitesCount,
}) {
  const [createdInvites, setCreatedInvites] = useState([]);
  //const [showDetail, setShowDetail] = useState('');
  const [inviteDetail, setInviteDetail] = useState('');

  useEffect(() => {
    //console.log(inviteDetail, 'inviteDetail');
    axios
      .get(`/api/created/invites/${auth.id}`)
      .then((response) => setCreatedInvites(response.data));
  }, [inviteDetail]);
  console.log(createdInvites, 'createdInvites', userEvents);

  const invitations = createdInvites.filter(
    (invite) => invite.status === 'invited'
  );
  //console.log(invitations, 'status invited');

  const acceptedInvites = createdInvites.filter(
    (invite) => invite.status === 'accepted'
  );
  // console.log(acceptedInvites, 'status accepted');

  const declinedInvites = createdInvites.filter(
    (invite) => invite.status === 'declined'
  );
  //console.log(declinedInvites, 'status declined');

  if (inviteDetail) {
    return (
      <div>
        <CreatedInviteDetail
          inviteDetail={inviteDetail}
          setInviteDetail={setInviteDetail}
          events={events}
          setEvents={setEvents}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h5>You have created {invitations.length} invites</h5>
        {invitations.map((invite) => {
          return (
            <div key={invite.id}>
              <div
                className="card border-light mb-3"
                style={{ maxWidth: '18rem' }}
              >
                <div className="card-header">{invite.name}</div>
                <div className="card-body">
                  <h5 className="card-title">Location: {invite.location}</h5>
                  <p className="card-text">
                    {moment(invite.date).format('MMMM Do YYYY, h:mm a')}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setInviteDetail(invite);
                      //setShowDetail(true);
                    }}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div>
        {acceptedInvites ? (
          <AcceptedInvites
          // acceptedInvites={acceptedInvites}
          // setInviteDetail={setInviteDetail}
          />
        ) : (
          <p>You have no accepted invites</p>
        )}
      </div>
      <div>
        {declinedInvites ? (
          <DeclinedInvites
          // declinedInvites={declinedInvites}
          // setInviteDetail={setInviteDetail}
          />
        ) : (
          <p>You have no declined invites</p>
        )}
      </div> */}
      </div>
    );
  }
}
